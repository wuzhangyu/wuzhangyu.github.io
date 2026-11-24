import { json, sha, visitor, isAdmin, allow, clean } from "../../../lib/util.js";

// Passkey (WebAuthn) sign-in for the admin panel. Registering a passkey needs the admin key (or an existing passkey session);
// signing in with one returns a "pk_…" session token that isAdmin() accepts in place of ADMIN_KEY. Only ES256 and RS256 keys.
const SESSION_DAYS = 90, CHALLENGE_MS = 5 * 60e3;

const b64u = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const unb64u = (s) => Uint8Array.from(atob(String(s).replace(/-/g, "+").replace(/_/g, "/") + "===".slice((String(s).length + 3) % 4)), (c) => c.charCodeAt(0));
const random = (n) => b64u(crypto.getRandomValues(new Uint8Array(n)));
const digest = async (bytes) => new Uint8Array(await crypto.subtle.digest("SHA-256", bytes));
const same = (a, b) => a.length === b.length && a.every((x, i) => x === b[i]);

async function setup(env) {
  await env.DB.batch([
    env.DB.prepare("CREATE TABLE IF NOT EXISTS passkeys (id TEXT PRIMARY KEY, spki TEXT NOT NULL, alg INTEGER NOT NULL, name TEXT, counter INTEGER DEFAULT 0, created INTEGER, used INTEGER)"),
    env.DB.prepare("CREATE TABLE IF NOT EXISTS passkey_challenges (c TEXT PRIMARY KEY, kind TEXT NOT NULL, ts INTEGER NOT NULL)"),
    env.DB.prepare("CREATE TABLE IF NOT EXISTS admin_sessions (hash TEXT PRIMARY KEY, cred TEXT, created INTEGER, expires INTEGER)"),
  ]);
}

async function challenge(env, kind) {
  const c = random(32), now = Date.now();
  await env.DB.batch([
    env.DB.prepare("DELETE FROM passkey_challenges WHERE ts < ?").bind(now - CHALLENGE_MS),
    env.DB.prepare("INSERT INTO passkey_challenges (c, kind, ts) VALUES (?, ?, ?)").bind(c, kind, now),
  ]);
  return c;
}

// clientDataJSON must be for this site, of the expected type, and carry a challenge we issued (each one works once).
async function checkClient(env, request, raw, type) {
  let cd;
  try { cd = JSON.parse(new TextDecoder().decode(raw)); } catch { return "数据格式不对"; }
  if (cd.type !== type) return "类型不对";
  if (cd.origin !== new URL(request.url).origin) return "来源网址不对";
  const row = await env.DB.prepare("SELECT c FROM passkey_challenges WHERE c = ? AND kind = ? AND ts > ?").bind(String(cd.challenge || ""), type, Date.now() - CHALLENGE_MS).first();
  if (!row) return "验证已过期，请重试";
  await env.DB.prepare("DELETE FROM passkey_challenges WHERE c = ?").bind(row.c).run();
  return null;
}

// Authenticator data: rpIdHash(32) | flags(1) | signCount(4) | …; require user presence and user verification (fingerprint / PIN / face).
async function checkAuthData(ad, rpId) {
  if (ad.length < 37) return { err: "认证数据不对" };
  if (!same(ad.slice(0, 32), await digest(new TextEncoder().encode(rpId)))) return { err: "域名不对" };
  if ((ad[32] & 0x05) !== 0x05) return { err: "需要指纹、面容或 PIN 验证" };
  return { counter: new DataView(ad.buffer, ad.byteOffset + 33, 4).getUint32(0) };
}

// WebAuthn ES256 signatures are DER; WebCrypto wants the raw 64-byte r || s.
function derToRaw(der) {
  if (der[0] !== 0x30) return null;
  let i = der[1] & 0x80 ? 2 + (der[1] & 0x7f) : 2;
  const out = new Uint8Array(64);
  for (let k = 0; k < 2; k++) {
    if (der[i++] !== 0x02) return null;
    let len = der[i++], v = der.slice(i, i + len);
    i += len;
    while (v.length > 32 && v[0] === 0) v = v.slice(1);
    if (v.length > 32) return null;
    out.set(v, k * 32 + 32 - v.length);
  }
  return out;
}
const ALGS = {
  [-7]: { imp: { name: "ECDSA", namedCurve: "P-256" }, ver: { name: "ECDSA", hash: "SHA-256" }, sig: derToRaw },
  [-257]: { imp: { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, ver: { name: "RSASSA-PKCS1-v1_5" }, sig: (s) => s },
};

export async function onRequestPost({ request, env }) {
  let body;
  try { body = await request.json(); } catch { return json({ error: "格式不对" }, 400); }
  await setup(env);
  const rpId = new URL(request.url).hostname;
  const admin = await isAdmin(request, env);
  const act = body.action;

  if (act === "options") {
    if (body.kind === "create") {
      if (!admin) return json({ error: "先用管理密码登录" }, 403);
      const { results } = await env.DB.prepare("SELECT id FROM passkeys").all();
      return json({ challenge: await challenge(env, "webauthn.create"), rpId, userId: b64u(new TextEncoder().encode("colorai-admin")), exclude: results.map((r) => r.id) });
    }
    if (!(await allow(env, await visitor(request, env), "passkey", 30, 3600))) return json({ error: "试得太多了，过一会儿再来" }, 429);
    return json({ challenge: await challenge(env, "webauthn.get"), rpId });
  }

  if (act === "register") {
    if (!admin) return json({ error: "先用管理密码登录" }, 403);
    const alg = Number(body.alg);
    if (!ALGS[alg]) return json({ error: "这个设备的密钥类型不支持" }, 400);
    let cd, ad, spki;
    try { cd = unb64u(body.clientDataJSON); ad = unb64u(body.authenticatorData); spki = unb64u(body.publicKey); } catch { return json({ error: "数据格式不对" }, 400); }
    const err = await checkClient(env, request, cd, "webauthn.create");
    if (err) return json({ error: err }, 400);
    const a = await checkAuthData(ad, rpId);
    if (a.err) return json({ error: a.err }, 400);
    try { await crypto.subtle.importKey("spki", spki, ALGS[alg].imp, false, ["verify"]); } catch { return json({ error: "公钥格式不对" }, 400); }
    const id = clean(body.id, 400);
    if (!/^[\w-]{16,}$/.test(id)) return json({ error: "凭据编号不对" }, 400);
    const name = clean(body.name, 40) || "通行密钥";
    await env.DB.prepare("INSERT OR REPLACE INTO passkeys (id, spki, alg, name, counter, created) VALUES (?, ?, ?, ?, ?, ?)")
      .bind(id, b64u(spki), alg, name, a.counter, Date.now()).run();
    return json({ ok: true, name });
  }

  if (act === "login") {
    if (!(await allow(env, await visitor(request, env), "passkey-login", 20, 3600))) return json({ error: "试得太多了，过一会儿再来" }, 429);
    const row = await env.DB.prepare("SELECT * FROM passkeys WHERE id = ?").bind(clean(body.id, 400)).first();
    if (!row) return json({ error: "这个通行密钥没有登记，或者已经被删除" }, 403);
    let cd, ad, sig;
    try { cd = unb64u(body.clientDataJSON); ad = unb64u(body.authenticatorData); sig = unb64u(body.signature); } catch { return json({ error: "数据格式不对" }, 400); }
    const err = await checkClient(env, request, cd, "webauthn.get");
    if (err) return json({ error: err }, 403);
    const a = await checkAuthData(ad, rpId);
    if (a.err) return json({ error: a.err }, 403);
    const alg = ALGS[row.alg], s = alg && alg.sig(sig);
    if (!s) return json({ error: "签名不对" }, 403);
    const signed = new Uint8Array(ad.length + 32);
    signed.set(ad); signed.set(await digest(cd), ad.length);
    let ok = false;
    try { ok = await crypto.subtle.verify(alg.ver, await crypto.subtle.importKey("spki", unb64u(row.spki), alg.imp, false, ["verify"]), s, signed); } catch {}
    if (!ok) return json({ error: "签名不对" }, 403);
    if (row.counter > 0 && a.counter <= row.counter) return json({ error: "这个通行密钥的计数异常，可能被复制过，已拒绝" }, 403);
    const token = `pk_${random(32)}`, now = Date.now();
    await env.DB.batch([
      env.DB.prepare("UPDATE passkeys SET counter = ?, used = ? WHERE id = ?").bind(a.counter, now, row.id),
      env.DB.prepare("INSERT INTO admin_sessions (hash, cred, created, expires) VALUES (?, ?, ?, ?)").bind(await sha(token), row.id, now, now + SESSION_DAYS * 864e5),
      env.DB.prepare("DELETE FROM admin_sessions WHERE expires < ?").bind(now),
    ]);
    return json({ token, name: row.name, days: SESSION_DAYS });
  }

  if (act === "logout") {
    const key = request.headers.get("X-Admin-Key") || "";
    if (key.startsWith("pk_")) await env.DB.prepare("DELETE FROM admin_sessions WHERE hash = ?").bind(await sha(key)).run();
    return json({ ok: true });
  }

  if (!admin) return json({ error: "仅站长可用" }, 403);
  if (act === "list") {
    const { results } = await env.DB.prepare(
      "SELECT p.id, p.name, p.created, p.used, (SELECT COUNT(*) FROM admin_sessions s WHERE s.cred = p.id AND s.expires > ?) AS sessions FROM passkeys p ORDER BY p.created DESC",
    ).bind(Date.now()).all();
    return json({ passkeys: results });
  }
  if (act === "delete") {
    const id = clean(body.id, 400);
    await env.DB.batch([
      env.DB.prepare("DELETE FROM passkeys WHERE id = ?").bind(id),
      env.DB.prepare("DELETE FROM admin_sessions WHERE cred = ?").bind(id),
    ]);
    return json({ ok: true });
  }
  return json({ error: "不认识的操作" }, 400);
}

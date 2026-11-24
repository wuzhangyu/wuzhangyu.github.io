import { json, visitor, isAdmin, clean } from "../../lib/util.js";

// Only coarse, city-level location from Cloudflare plus device type are kept; the IP itself is never stored.
let ready = false;
async function setup(env) {
  if (ready) return;
  await env.DB.batch([
    env.DB.prepare("CREATE TABLE IF NOT EXISTS visits (id INTEGER PRIMARY KEY AUTOINCREMENT, ts INTEGER NOT NULL, vid TEXT NOT NULL, path TEXT NOT NULL, title TEXT, country TEXT, region TEXT, city TEXT, device TEXT)"),
    env.DB.prepare("CREATE INDEX IF NOT EXISTS visits_ts ON visits (ts DESC)"),
    env.DB.prepare("CREATE INDEX IF NOT EXISTS visits_vid ON visits (vid, path, ts)"),
    env.DB.prepare("CREATE INDEX IF NOT EXISTS visits_who ON visits (vid, ts DESC)"),
  ]);
  ready = true;
}

function device(ua) {
  const os = /iPhone/.test(ua) ? "iPhone" : /iPad/.test(ua) ? "iPad" : /Android/.test(ua) ? "Android" : /HarmonyOS/.test(ua) ? "HarmonyOS"
    : /Windows/.test(ua) ? "Windows" : /Mac OS X/.test(ua) ? "Mac" : /Linux/.test(ua) ? "Linux" : "";
  const app = /MicroMessenger/.test(ua) ? "微信" : /QQ\//.test(ua) ? "QQ" : /Edg\//.test(ua) ? "Edge" : /Firefox\//.test(ua) ? "Firefox"
    : /Chrome\//.test(ua) ? "Chrome" : /Safari\//.test(ua) ? "Safari" : "";
  return [os, app].filter(Boolean).join(" · ") || "未知设备";
}

export async function onRequestPost({ request, env }) {
  const ua = request.headers.get("user-agent") || "";
  if (!ua || /bot|spider|crawl|slurp|headless|preview|curl|python|wget/i.test(ua)) return json({ ok: false });
  let body;
  try { body = await request.json(); } catch { return json({ ok: false }, 400); }
  const path = clean(body.path, 120).replace(/\.html$/, "") || "/";
  const title = clean(body.title, 60).replace(/\s*·\s*Colorai.*$/, "");
  await setup(env);
  const vid = await visitor(request, env);
  const now = Date.now();
  // The same person reloading the same page within 30 minutes counts once.
  const seen = await env.DB.prepare("SELECT 1 FROM visits WHERE vid = ? AND path = ? AND ts > ? LIMIT 1").bind(vid, path, now - 30 * 60e3).first();
  if (!seen) {
    const cf = request.cf || {};
    await env.DB.prepare("INSERT INTO visits (ts, vid, path, title, country, region, city, device) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")
      .bind(now, vid, path, title || null, cf.country || null, cf.region || null, cf.city || null, device(ua)).run();
  }
  return json({ ok: true });
}

// Only the admin can read the log. Visitors are identified by the salted hash alone; `name` is the latest guestbook
// name posted from the same hash (messages.ip holds the same visitor() value), if any.
export async function onRequestGet({ request, env }) {
  if (!isAdmin(request, env)) return json({ error: "仅站长可见" }, 403);
  await setup(env);
  const vid = clean(new URL(request.url).searchParams.get("vid"), 24);
  if (vid) {
    const { results } = await env.DB.prepare("SELECT ts, path, title, country, region, city, device FROM visits WHERE vid = ? ORDER BY ts DESC LIMIT 200").bind(vid).all();
    return json({ vid, visits: results });
  }
  const now = Date.now(), day = now - 864e5;
  const today = Math.floor((now + 8 * 36e5) / 864e5) * 864e5 - 8 * 36e5; // midnight, China time
  const [totals, people, recent] = await env.DB.batch([
    env.DB.prepare(`SELECT COUNT(*) AS pv, COUNT(DISTINCT vid) AS uv, COALESCE(SUM(ts > ?1), 0) AS pv24, COUNT(DISTINCT CASE WHEN ts > ?1 THEN vid END) AS uv24,
      COALESCE(SUM(ts >= ?2), 0) AS today, COUNT(DISTINCT CASE WHEN ts >= ?2 THEN vid END) AS uvToday FROM visits`).bind(day, today),
    env.DB.prepare(`WITH g AS (SELECT vid, COUNT(*) AS n, MIN(ts) AS first, MAX(ts) AS last, COUNT(DISTINCT path) AS pages FROM visits GROUP BY vid ORDER BY last DESC LIMIT 100)
      SELECT g.*, v.country, v.region, v.city, v.device FROM g JOIN visits v ON v.id = (SELECT id FROM visits WHERE vid = g.vid ORDER BY ts DESC LIMIT 1) ORDER BY g.last DESC`),
    env.DB.prepare("SELECT ts, vid, path, title, country, region, city, device FROM visits ORDER BY ts DESC LIMIT 100"),
  ]);
  let names = {};
  try {
    const { results } = await env.DB.prepare("SELECT ip, name, MAX(created) AS t FROM messages GROUP BY ip").all();
    names = Object.fromEntries(results.map((r) => [r.ip, r.name]));
  } catch {}
  const visitors = people.results.map((p) => ({ ...p, name: names[p.vid] || null }));
  return json({ ...totals.results[0], visitors, visits: recent.results });
}

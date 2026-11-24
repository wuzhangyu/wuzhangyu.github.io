export const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

export async function sha(s) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Visitor IPs are never stored in the clear, only a salted hash.
export async function visitor(request, env) {
  const ip = request.headers.get("CF-Connecting-IP") || "0.0.0.0";
  return (await sha(`${env.ADMIN_KEY || "colorai"}|${ip}`)).slice(0, 24);
}

export function isAdmin(request, env) {
  const key = request.headers.get("X-Admin-Key") || "";
  if (!env.ADMIN_KEY || key.length !== env.ADMIN_KEY.length) return false;
  let diff = 0;
  for (let i = 0; i < key.length; i++) diff |= key.charCodeAt(i) ^ env.ADMIN_KEY.charCodeAt(i);
  return diff === 0;
}

// Sliding-window limits kept in D1: returns false once `who` has used `max` hits of `kind` within `sec` seconds.
export async function allow(env, who, kind, max, sec) {
  const now = Date.now();
  const { n } = await env.DB.prepare("SELECT COUNT(*) AS n FROM hits WHERE kind = ? AND ip = ? AND ts > ?")
    .bind(kind, who, now - sec * 1000).first();
  if (n >= max) return false;
  await env.DB.prepare("INSERT INTO hits (ip, kind, ts) VALUES (?, ?, ?)").bind(who, kind, now).run();
  if (Math.random() < 0.05) await env.DB.prepare("DELETE FROM hits WHERE ts < ?").bind(now - 2 * 864e5).run();
  return true;
}

export const clean = (s, max) =>
  String(s ?? "").replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").replace(/\r\n?/g, "\n").replace(/\n{4,}/g, "\n\n\n").trim().slice(0, max);

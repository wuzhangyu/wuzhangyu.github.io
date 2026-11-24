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

// "IP 属地" in the style Chinese sites use: province for mainland China, otherwise the country. Never finer than that.
const CN = {
  AH: "安徽", BJ: "北京", CQ: "重庆", FJ: "福建", GD: "广东", GS: "甘肃", GX: "广西", GZ: "贵州", HA: "河南", HB: "湖北",
  HE: "河北", HI: "海南", HL: "黑龙江", HN: "湖南", JL: "吉林", JS: "江苏", JX: "江西", LN: "辽宁", NM: "内蒙古", NX: "宁夏",
  QH: "青海", SC: "四川", SD: "山东", SH: "上海", SN: "陕西", SX: "山西", TJ: "天津", XJ: "新疆", XZ: "西藏", YN: "云南", ZJ: "浙江",
  11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏",
  33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西",
  46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆",
};
const SAR = { HK: "中国香港", MO: "中国澳门", TW: "中国台湾" };
export function place(request) {
  const cf = request.cf || {};
  const c = String(cf.country || "").toUpperCase();
  if (!c || c === "XX" || c === "T1") return null;
  if (c === "CN") return CN[String(cf.regionCode || "").toUpperCase()] || "中国";
  if (SAR[c]) return SAR[c];
  try { return new Intl.DisplayNames(["zh-CN"], { type: "region" }).of(c) || c; } catch { return c; }
}

export const clean = (s, max) =>
  String(s ?? "").replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").replace(/\r\n?/g, "\n").replace(/\n{4,}/g, "\n\n\n").trim().slice(0, max);

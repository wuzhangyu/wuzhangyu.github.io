import { json, isAdmin, clean } from "../../lib/util.js";

// Overrides for the site's editable content, written from the admin panel. The static HTML and the constants at the
// top of script.js stay the fallback: deleting a key brings the original back.
//   text:<page>.<name>  plain text of an element tagged data-edit="<page>.<name>" (newlines become line breaks)
//   data:<NAME>         one of the lists below, stored as normalised JSON
let ready = false;
async function setup(env) {
  if (ready) return;
  await env.DB.prepare("CREATE TABLE IF NOT EXISTS content (key TEXT PRIMARY KEY, value TEXT NOT NULL, updated INTEGER NOT NULL)").run();
  ready = true;
}

const MAX_KEYS = 500;
const TEXT_KEY = /^text:[a-z0-9][a-z0-9._-]{0,80}$/;
const fail = (msg) => { throw Object.assign(new Error(msg), { bad: true }); };
const str = (v, max, what, { required = false } = {}) => {
  if (v == null) v = "";
  if (typeof v !== "string" && typeof v !== "number") fail(`${what} 应该是文字`);
  const s = clean(v, max + 1);
  if (s.length > max) fail(`${what} 不能超过 ${max} 个字`);
  if (required && !s) fail(`${what} 不能为空`);
  return s;
};
const list = (v, max, what) => {
  if (!Array.isArray(v)) fail(`${what} 应该是数组 [...]`);
  if (v.length > max) fail(`${what} 最多 ${max} 项`);
  return v;
};
const tuple = (v, n, what) => {
  if (!Array.isArray(v) || v.length < n - 1 || v.length > n) fail(`${what} 应该是 ${n} 项的数组`);
  return v;
};

// Each validator returns a clean copy with only the known fields, or throws a message for the admin.
const DATA = {
  QUOTES: (v) => list(v, 60, "名言").map((q, i) => {
    const w = `第 ${i + 1} 句`;
    if (!q || typeof q !== "object") fail(`${w} 应该是 {text, src}`);
    return { text: str(q.text, 200, `${w} 的 text`, { required: true }), src: str(q.src, 80, `${w} 的 src`) };
  }),
  POSTS: (v) => list(v, 200, "随记").map((p, i) => {
    const w = `第 ${i + 1} 篇`;
    if (!p || typeof p !== "object") fail(`${w} 应该是 {id, title, date, tags, desc}`);
    const id = str(p.id, 60, `${w} 的 id`, { required: true });
    if (!/^[a-z0-9][a-z0-9-]*$/.test(id)) fail(`${w} 的 id 只能用小写字母、数字和 -（对应 posts/<id>.html）`);
    const date = str(p.date, 10, `${w} 的 date`, { required: true });
    if (!/^\d{4}(\.\d{2}(\.\d{2})?)?$/.test(date)) fail(`${w} 的 date 写成 YYYY、YYYY.MM 或 YYYY.MM.DD`);
    return {
      id, title: str(p.title, 60, `${w} 的 title`, { required: true }), date,
      tags: list(p.tags ?? [], 8, `${w} 的 tags`).map((t) => str(t, 16, `${w} 的标签`, { required: true })),
      desc: str(p.desc, 200, `${w} 的 desc`),
    };
  }),
  FRIENDS: (v) => list(v, 100, "友链").map((f, i) => {
    const w = `第 ${i + 1} 个友链`;
    tuple(f, 6, w);
    const url = str(f[1], 200, `${w} 的网址`, { required: true });
    if (!/^https?:\/\/[^\s"'<>]+$/.test(url)) fail(`${w} 的网址要以 http:// 或 https:// 开头`);
    const color = str(f[4], 40, `${w} 的颜色`) || "#34c6ff";
    if (!/^#[0-9a-fA-F]{3,8}$/.test(color)) fail(`${w} 的颜色写成 #8fb8ff 这样`);
    return [str(f[0], 30, `${w} 的名字`, { required: true }), url, str(f[2], 80, `${w} 的简介`), str(f[3], 4, `${w} 的徽章`), color, str(f[5], 30, `${w} 的分类`)];
  }),
  CITY_INFO: (v) => {
    if (!v || typeof v !== "object" || Array.isArray(v)) fail("城市卡片应该是 {\"城市名\": [...]} 对象");
    const keys = Object.keys(v);
    if (keys.length > 100) fail("城市卡片最多 100 个");
    return Object.fromEntries(keys.map((k) => {
      const name = str(k, 40, "城市名", { required: true });
      const c = tuple(v[k], 4, `「${name}」`);
      const photo = str(c[3], 80, `「${name}」的照片`);
      if (photo && !/^[\w.-]+\.(webp|jpe?g|png)$/i.test(photo)) fail(`「${name}」的照片只写 assets/photos 下的文件名，例如 gz-cantontower.webp`);
      return [name, [str(c[0], 30, `「${name}」的中文名`) || name, str(c[1], 40, `「${name}」的时间`), str(c[2], 200, `「${name}」的一句话`), photo]];
    }));
  },
  STATS: (v) => {
    list(v, 8, "五维");
    if (v.length < 3) fail("五维至少 3 项");
    return v.map((s, i) => {
      const w = `第 ${i + 1} 项`;
      tuple(s, 4, w);
      const lv = Number(s[2]);
      if (!Number.isInteger(lv) || lv < 1 || lv > 5) fail(`${w} 的等级是 1–5 的整数`);
      return [str(s[0], 8, `${w} 的中文名`, { required: true }), str(s[1], 16, `${w} 的英文名`), lv, str(s[3], 20, `${w} 的称号`)];
    });
  },
};

function normalise(key, value) {
  if (TEXT_KEY.test(key)) return str(value, 3000, "内容", { required: true });
  const name = key.startsWith("data:") && key.slice(5);
  if (!name || !Object.hasOwn(DATA, name)) fail("不认识的内容键");
  const out = JSON.stringify(DATA[name](value));
  if (out.length > 64000) fail("内容太长了");
  return out;
}
const decode = (key, value) => {
  if (!key.startsWith("data:")) return value;
  try { return JSON.parse(value); } catch { return null; }
};

export async function onRequestGet({ request, env }) {
  const admin = await isAdmin(request, env);
  await setup(env);
  const { results } = await env.DB.prepare("SELECT key, value, updated FROM content").all();
  const content = {}, updated = {};
  for (const r of results) {
    const v = decode(r.key, r.value);
    if (v == null) continue;
    content[r.key] = v;
    updated[r.key] = r.updated;
  }
  return new Response(JSON.stringify({ admin, content, ...(admin ? { updated } : {}) }), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": request.headers.has("X-Admin-Key") ? "no-store" : "public, max-age=30",
      vary: "X-Admin-Key",
    },
  });
}

export async function onRequestPut({ request, env }) {
  if (!(await isAdmin(request, env))) return json({ error: "没有权限" }, 403);
  let body;
  try { body = await request.json(); } catch { return json({ error: "格式不对" }, 400); }
  const key = String(body?.key ?? "");
  let value;
  try { value = normalise(key, body.value); } catch (e) {
    if (e.bad) return json({ error: e.message }, 400);
    throw e;
  }
  await setup(env);
  const { n } = await env.DB.prepare("SELECT COUNT(*) AS n FROM content WHERE key != ?").bind(key).first();
  if (n >= MAX_KEYS) return json({ error: `最多保存 ${MAX_KEYS} 条修改，先还原一些吧` }, 400);
  const now = Date.now();
  await env.DB.prepare("INSERT INTO content (key, value, updated) VALUES (?, ?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated = excluded.updated")
    .bind(key, value, now).run();
  return json({ key, value: decode(key, value), updated: now });
}

export async function onRequestDelete({ request, env }) {
  if (!(await isAdmin(request, env))) return json({ error: "没有权限" }, 403);
  const key = clean(new URL(request.url).searchParams.get("key"), 100);
  if (!key) return json({ error: "缺少 key" }, 400);
  await setup(env);
  await env.DB.prepare("DELETE FROM content WHERE key = ?").bind(key).run();
  return json({ ok: true, key });
}

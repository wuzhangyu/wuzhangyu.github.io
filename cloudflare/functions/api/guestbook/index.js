import { json, sha, visitor, isAdmin, allow, clean, place } from "../../../lib/util.js";

// Older databases predate the `place` column; add it once per isolate (fails harmlessly if it already exists).
let ready = false;
async function setup(env) {
  if (ready) return;
  try { await env.DB.prepare("ALTER TABLE messages ADD COLUMN place TEXT").run(); } catch {}
  ready = true;
}

const view = (r, admin) => ({
  id: r.id, name: r.name, text: r.text, reply: r.reply, place: r.place || null, created: r.created, updated: r.updated,
  ...(admin ? { hidden: !!r.hidden } : {}),
});

export async function onRequestGet({ request, env }) {
  await setup(env);
  const admin = isAdmin(request, env);
  const { results } = await env.DB.prepare(
    `SELECT * FROM messages ${admin ? "" : "WHERE hidden = 0"} ORDER BY created DESC LIMIT 300`
  ).all();
  return json({ admin, messages: results.map((r) => view(r, admin)) });
}

export async function onRequestPost({ request, env }) {
  let body;
  try { body = await request.json(); } catch { return json({ error: "格式不对" }, 400); }
  if (body.website) return json({ error: "提交失败" }, 400);
  const name = clean(body.name, 24) || "路过的人";
  const text = clean(body.text, 500);
  if (text.length < 2) return json({ error: "多写两个字吧" }, 400);
  if ((text.match(/https?:\/\//g) || []).length > 2) return json({ error: "链接太多了" }, 400);

  await setup(env);
  const admin = isAdmin(request, env);
  const who = await visitor(request, env);
  if (!admin && !(await allow(env, who, "post", 5, 600))) return json({ error: "写得太快了，过几分钟再来" }, 429);

  const token = crypto.randomUUID().replace(/-/g, "");
  const now = Date.now();
  const row = await env.DB.prepare(
    "INSERT INTO messages (name, text, token, ip, place, created) VALUES (?, ?, ?, ?, ?, ?) RETURNING *"
  ).bind(name, text, await sha(token), who, place(request), now).first();
  return json({ message: view(row, admin), token }, 201);
}

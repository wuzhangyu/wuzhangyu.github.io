import { json, sha, isAdmin, clean } from "../../../lib/util.js";

// Visitors can edit or delete their own message with the token they got when posting; the admin key can do anything.
async function load(request, env, params) {
  const id = Number(params.id);
  if (!Number.isInteger(id)) return { err: json({ error: "没有这条留言" }, 404) };
  const row = await env.DB.prepare("SELECT * FROM messages WHERE id = ?").bind(id).first();
  if (!row) return { err: json({ error: "没有这条留言" }, 404) };
  const admin = await isAdmin(request, env);
  const token = request.headers.get("X-Token") || "";
  const owner = token && (await sha(token)) === row.token;
  if (!admin && !owner) return { err: json({ error: "没有权限" }, 403) };
  return { row, admin };
}

export async function onRequestPatch({ request, env, params }) {
  const { row, admin, err } = await load(request, env, params);
  if (err) return err;
  let body;
  try { body = await request.json(); } catch { return json({ error: "格式不对" }, 400); }

  const next = { name: row.name, text: row.text, reply: row.reply, hidden: row.hidden, updated: row.updated };
  if (body.text != null) {
    const text = clean(body.text, 500);
    if (text.length < 2) return json({ error: "多写两个字吧" }, 400);
    if (text !== row.text) { next.text = text; next.updated = Date.now(); }
  }
  if (body.name != null) next.name = clean(body.name, 24) || row.name;
  if (admin && body.reply !== undefined) next.reply = clean(body.reply, 500) || null;
  if (admin && body.hidden !== undefined) next.hidden = body.hidden ? 1 : 0;

  const r = await env.DB.prepare(
    "UPDATE messages SET name = ?, text = ?, reply = ?, hidden = ?, updated = ? WHERE id = ? RETURNING *"
  ).bind(next.name, next.text, next.reply, next.hidden, next.updated, row.id).first();
  return json({
    message: { id: r.id, name: r.name, text: r.text, reply: r.reply, place: r.place || null, created: r.created, updated: r.updated, ...(admin ? { hidden: !!r.hidden } : {}) },
  });
}

export async function onRequestDelete({ request, env, params }) {
  const { row, err } = await load(request, env, params);
  if (err) return err;
  await env.DB.prepare("DELETE FROM messages WHERE id = ?").bind(row.id).run();
  return json({ ok: true });
}

import { json, isAdmin } from "../../../lib/util.js";

// Same caps as api/ask.js: per visitor per hour, then the qwen and glm daily budgets (sliding 24 h windows in `hits`).
const ASK_LIMITS = { hour: 20, qwen: 150, cheap: 1000 };

// Tables other than messages/hits are created lazily by their own endpoints, so a missing one just reads as empty.
const first = async (stmt) => { try { return await stmt.first(); } catch { return null; } };
const all = async (stmt) => { try { return (await stmt.all()).results; } catch { return []; } };

export async function onRequestGet({ request, env }) {
  if (!isAdmin(request, env)) return json({ error: "仅站长可见" }, 403);
  const db = env.DB;
  const now = Date.now(), day = now - 864e5, hour = now - 36e5;
  const today = Math.floor((now + 8 * 36e5) / 864e5) * 864e5 - 8 * 36e5; // midnight, China time
  const [visits, msgs, latest, ask, content] = await Promise.all([
    first(db.prepare(`SELECT COUNT(*) AS pv, COUNT(DISTINCT vid) AS uv, COALESCE(SUM(ts >= ?1), 0) AS today,
      COUNT(DISTINCT CASE WHEN ts >= ?1 THEN vid END) AS uvToday, COALESCE(SUM(ts > ?2), 0) AS pv24,
      COUNT(DISTINCT CASE WHEN ts > ?2 THEN vid END) AS uv24 FROM visits`).bind(today, day)),
    first(db.prepare("SELECT COUNT(*) AS total, COALESCE(SUM(hidden), 0) AS hidden, COALESCE(SUM(created >= ?), 0) AS today, COALESCE(SUM(reply IS NULL), 0) AS unreplied FROM messages").bind(today)),
    all(db.prepare("SELECT id, name, text, reply, hidden, created FROM messages ORDER BY created DESC LIMIT 6")),
    first(db.prepare(`SELECT COALESCE(SUM(kind = 'ask-day' AND ts > ?1), 0) AS qwen, COALESCE(SUM(kind = 'ask-day-cheap' AND ts > ?1), 0) AS cheap,
      COALESCE(SUM(kind = 'ask' AND ts > ?2), 0) AS hour, COUNT(DISTINCT CASE WHEN kind = 'ask' AND ts > ?1 THEN ip END) AS askers,
      COALESCE(SUM(kind = 'post' AND ts > ?1), 0) AS posts FROM hits WHERE ts > ?1`).bind(day, hour)),
    first(db.prepare("SELECT COUNT(*) AS n, MAX(updated) AS last FROM content")),
  ]);
  return json({
    now,
    visits,
    messages: msgs && { ...msgs, latest: latest.map((m) => ({ ...m, hidden: !!m.hidden })) },
    ask: ask && { ...ask, limits: ASK_LIMITS },
    content: content || { n: 0, last: null },
  });
}

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  text TEXT NOT NULL,
  reply TEXT,
  token TEXT NOT NULL,
  ip TEXT NOT NULL,
  hidden INTEGER NOT NULL DEFAULT 0,
  created INTEGER NOT NULL,
  updated INTEGER
);
CREATE INDEX IF NOT EXISTS messages_created ON messages (created DESC);

CREATE TABLE IF NOT EXISTS hits (
  ip TEXT NOT NULL,
  kind TEXT NOT NULL,
  ts INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS hits_lookup ON hits (kind, ip, ts);

CREATE TABLE IF NOT EXISTS visits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ts INTEGER NOT NULL,
  vid TEXT NOT NULL,
  path TEXT NOT NULL,
  title TEXT,
  country TEXT,
  region TEXT,
  city TEXT,
  device TEXT
);
CREATE INDEX IF NOT EXISTS visits_ts ON visits (ts DESC);
CREATE INDEX IF NOT EXISTS visits_vid ON visits (vid, path, ts);

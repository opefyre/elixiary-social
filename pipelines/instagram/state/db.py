#!/usr/bin/env python3
"""
Local post-tracking database (SQLite).

Supabase stays read-only — this file is the only place the pipeline writes.
It records what has already been posted so nothing repeats, and keeps enough
metadata to enforce variety without querying Supabase again.

Path comes from ELIXIARY_STATE_DB, defaulting to state/elixiary-social.db
next to this file. On the spare Mac point it somewhere backed up.
"""

import json
import os
import sqlite3
from datetime import datetime, timezone

HERE = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.environ.get("ELIXIARY_STATE_DB", os.path.join(HERE, "elixiary-social.db"))

# Post lifecycle. `reserved` is claimed the moment an item is chosen, so two
# concurrent runs can never pick the same recipe.
STATUSES = ("reserved", "rendered", "drafted", "published", "rejected", "failed")

SCHEMA = """
CREATE TABLE IF NOT EXISTS posts (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  source_type    TEXT NOT NULL CHECK (source_type IN ('recipe','article')),
  source_id      TEXT NOT NULL,
  angle          TEXT NOT NULL DEFAULT '',
  status         TEXT NOT NULL,
  buffer_post_id TEXT,
  channel_id     TEXT,
  caption        TEXT,
  slide_urls     TEXT,
  meta           TEXT,
  error          TEXT,
  created_at     TEXT NOT NULL,
  updated_at     TEXT NOT NULL
);

-- One post per (item, angle). Recipes use angle='' so a recipe can only run
-- once; articles reuse the same id under different angles.
CREATE UNIQUE INDEX IF NOT EXISTS idx_posts_unique
  ON posts (source_type, source_id, angle);
CREATE INDEX IF NOT EXISTS idx_posts_created ON posts (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_status  ON posts (status);

CREATE TABLE IF NOT EXISTS runs (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  kind        TEXT NOT NULL,
  started_at  TEXT NOT NULL,
  finished_at TEXT,
  ok          INTEGER,
  detail      TEXT
);
"""


def now():
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def connect(path=None):
    p = path or DB_PATH
    os.makedirs(os.path.dirname(p), exist_ok=True)
    c = sqlite3.connect(p, timeout=30)
    c.row_factory = sqlite3.Row
    c.execute("PRAGMA journal_mode=WAL")
    c.execute("PRAGMA foreign_keys=ON")
    c.executescript(SCHEMA)
    return c


# ── reads ──────────────────────────────────────────────────────────────────

def used_keys(conn, source_type):
    """(source_id, angle) pairs already consumed. Rejected posts stay used so a
    rejected item isn't served straight back up."""
    rows = conn.execute(
        "SELECT source_id, angle FROM posts WHERE source_type=?", (source_type,)
    ).fetchall()
    return {(r["source_id"], r["angle"]) for r in rows}


def recent_meta(conn, source_type, limit=8):
    """Metadata from the most recent posts, used to space out repeats of the
    same category or base spirit."""
    rows = conn.execute(
        "SELECT meta FROM posts WHERE source_type=? AND meta IS NOT NULL "
        "ORDER BY id DESC LIMIT ?", (source_type, limit),
    ).fetchall()
    out = []
    for r in rows:
        try:
            out.append(json.loads(r["meta"]))
        except Exception:
            pass
    return out


def counts(conn):
    rows = conn.execute(
        "SELECT source_type, status, COUNT(*) n FROM posts "
        "GROUP BY source_type, status ORDER BY 1,2"
    ).fetchall()
    return [dict(r) for r in rows]


def get_post(conn, post_id):
    r = conn.execute("SELECT * FROM posts WHERE id=?", (post_id,)).fetchone()
    return dict(r) if r else None


# ── writes ─────────────────────────────────────────────────────────────────

def reserve(conn, source_type, source_id, angle="", meta=None):
    """Claim an item. Returns the new row id, or None if already taken —
    which is what makes selection safe to run concurrently."""
    try:
        cur = conn.execute(
            "INSERT INTO posts (source_type, source_id, angle, status, meta,"
            " created_at, updated_at) VALUES (?,?,?,?,?,?,?)",
            (source_type, source_id, angle, "reserved",
             json.dumps(meta or {}), now(), now()),
        )
        conn.commit()
        return cur.lastrowid
    except sqlite3.IntegrityError:
        return None


def update(conn, post_id, **fields):
    allowed = {"status", "buffer_post_id", "channel_id", "caption",
               "slide_urls", "meta", "error"}
    bad = set(fields) - allowed
    if bad:
        raise ValueError(f"unknown fields: {bad}")
    if fields.get("status") and fields["status"] not in STATUSES:
        raise ValueError(f"bad status: {fields['status']}")
    for k in ("slide_urls", "meta"):
        if k in fields and not isinstance(fields[k], str):
            fields[k] = json.dumps(fields[k])
    sets = ", ".join(f"{k}=?" for k in fields)
    conn.execute(f"UPDATE posts SET {sets}, updated_at=? WHERE id=?",
                 (*fields.values(), now(), post_id))
    conn.commit()


def release(conn, post_id):
    """Drop a reservation that never got used, so the item returns to the pool."""
    conn.execute("DELETE FROM posts WHERE id=? AND status='reserved'", (post_id,))
    conn.commit()


def start_run(conn, kind):
    cur = conn.execute("INSERT INTO runs (kind, started_at) VALUES (?,?)",
                       (kind, now()))
    conn.commit()
    return cur.lastrowid


def finish_run(conn, run_id, ok, detail=""):
    conn.execute("UPDATE runs SET finished_at=?, ok=?, detail=? WHERE id=?",
                 (now(), 1 if ok else 0, detail[:2000], run_id))
    conn.commit()


if __name__ == "__main__":
    c = connect()
    print(f"db: {DB_PATH}")
    print("tables:", [r[0] for r in c.execute(
        "SELECT name FROM sqlite_master WHERE type='table'")])
    print("counts:", counts(c) or "empty")

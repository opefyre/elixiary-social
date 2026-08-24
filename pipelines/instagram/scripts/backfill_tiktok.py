#!/usr/bin/env python3
"""
Give already-queued Instagram posts their TikTok mirror.

Only touches posts that are still awaiting or holding a slot, and only ever
creates new TikTok drafts — the Instagram post it mirrors is read, never
written. Slides are pulled back from R2 rather than re-rendered, so the mirror
is provably the same artwork that is queued on Instagram.

    python3 scripts/backfill_tiktok.py --dry-run
    python3 scripts/backfill_tiktok.py
"""

import argparse
import json
import os
import sys
import tempfile
import urllib.request
from datetime import datetime, timezone

HERE = os.path.dirname(os.path.abspath(__file__))
PIPE = os.path.abspath(os.path.join(HERE, ".."))
for p in (os.path.join(PIPE, "state"), os.path.join(PIPE, "render"), PIPE, HERE):
    sys.path.insert(0, p)

import db          # noqa: E402
import r2          # noqa: E402
import publish     # noqa: E402
import vertical    # noqa: E402

ELIGIBLE = ("drafted", "scheduled")


def fetch_slide(url, dest):
    # r2.dev 403s the default urllib agent, which once made every object look
    # missing; always identify ourselves.
    req = urllib.request.Request(url, headers={"User-Agent": "elixiary-social/1.0"})
    with urllib.request.urlopen(req, timeout=60) as r:
        with open(dest, "wb") as f:
            f.write(r.read())
    return dest


def _past(iso):
    try:
        t = datetime.fromisoformat(iso.replace("Z", "+00:00"))
    except Exception:
        return False
    return t <= datetime.now(timezone.utc)


def pending(conn):
    have = {c["post_id"] for c in conn.execute(
        "SELECT post_id FROM crossposts WHERE service='tiktok' "
        "AND status != 'failed'").fetchall()}
    rows = conn.execute(
        "SELECT id, source_type, status, caption, slide_urls, meta, buffer_post_id "
        "FROM posts WHERE status IN (%s) AND slide_urls IS NOT NULL "
        "AND buffer_post_id IS NOT NULL ORDER BY id"
        % ",".join("?" * len(ELIGIBLE)), ELIGIBLE).fetchall()
    return [r for r in rows if r["id"] not in have]


def mirror(conn, row, dry=False):
    urls = json.loads(row["slide_urls"] or "[]")
    if not urls:
        return None
    meta = json.loads(row["meta"] or "{}")
    # take the slot Buffer actually holds, not what we recorded, so a time the
    # user moved by hand carries across to the mirror
    node = publish.gql(
        "query P($i: PostInput!){ post(input:$i){ dueAt } }",
        {"i": {"id": row["buffer_post_id"]}})["post"]
    due = (node or {}).get("dueAt") or meta.get("due_at")
    # A slot that has already gone by cannot be honoured. Hand the mirror to
    # Buffer's queue instead of pinning it to a time in the past.
    if due and _past(due):
        due = None

    # strip the public base to get the object key, then its directory
    key = urls[0].split(r2.PUBLIC_BASE + "/", 1)[-1]  # social/<id>-<tok>/slide-01.png
    prefix = key.rsplit("/", 1)[0]                    # social/<id>-<tok>
    with tempfile.TemporaryDirectory() as td:
        local = [fetch_slide(u, os.path.join(td, "s%02d.png" % i))
                 for i, u in enumerate(urls, 1)]
        frames = vertical.wrap(local, os.path.join(td, "tt"))
        if dry:
            print(f"  {row['id']:>3} {row['source_type']:9} would mirror "
                  f"{len(frames)} frames  due={due or 'queue (slot passed)'}")
            return None
        tt_urls = [publish.upload_slide(f, f"{prefix}/tt-{i:02d}.png")
                   for i, f in enumerate(frames, 1)]

    for u in tt_urls:
        if not publish.verify_public(u):
            raise RuntimeError(f"frame not reachable: {u}")

    return publish.mirror_tiktok(conn, row["id"], row["caption"], tt_urls, due)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--limit", type=int, default=0)
    a = ap.parse_args()

    conn = db.connect()
    rows = pending(conn)
    if a.limit:
        rows = rows[:a.limit]
    if not rows:
        print("every queued post already has a TikTok mirror")
        return

    print(f"{len(rows)} post(s) without a mirror")
    ok = 0
    for r in rows:
        try:
            if mirror(conn, r, dry=a.dry_run):
                ok += 1
        except Exception as ex:
            print(f"  {r['id']:>3} {r['source_type']:9} FAILED: {str(ex)[:120]}",
                  file=sys.stderr)
    if not a.dry_run:
        print(f"\nmirrored {ok}/{len(rows)}")


if __name__ == "__main__":
    main()

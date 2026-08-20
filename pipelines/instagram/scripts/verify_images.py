#!/usr/bin/env python3
"""
Check that every queued post's slides are still reachable.

Buffer fetches media when a post publishes, not when it is created, so an
image that disappears in between fails silently at the worst moment. This is
the assertion that would have caught a prefix collision quietly deleting the
slides of two posts due out the next morning.

Checks anything not yet published — a post already sent no longer needs its
images, and a rejected one is not going out.

    python3 scripts/verify_images.py
    python3 scripts/verify_images.py --quiet
"""

import argparse
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
PIPE = os.path.abspath(os.path.join(HERE, ".."))
sys.path.insert(0, PIPE)
sys.path.insert(0, os.path.join(PIPE, "state"))
import db  # noqa: E402
import r2  # noqa: E402

LIVE = ("reserved", "rendered", "drafted", "scheduled")


def verify(conn=None, quiet=False):
    """Returns (checked, [broken]). Never raises on a single bad URL."""
    conn = conn or db.connect()
    rows = conn.execute(
        "SELECT id, source_type, status, buffer_post_id, slide_urls, caption "
        "FROM posts WHERE slide_urls IS NOT NULL AND status IN "
        "(%s) ORDER BY id" % ",".join("?" * len(LIVE)), LIVE).fetchall()

    broken, checked = [], 0
    for r in rows:
        try:
            urls = json.loads(r["slide_urls"] or "[]")
        except Exception:
            urls = []
        if not urls:
            continue
        checked += 1
        missing = []
        for u in urls:
            key = u.split(r2.PUBLIC_BASE + "/", 1)[-1]
            try:
                if not r2.exists(key):
                    missing.append(u)
            except Exception as ex:
                # a 403 means the check itself is broken; say so rather than
                # reporting every post as fine
                return checked, [{"id": None, "error": str(ex)[:160]}]
        if missing:
            broken.append({
                "id": r["id"], "type": r["source_type"], "status": r["status"],
                "buffer_post_id": r["buffer_post_id"],
                "missing": len(missing), "of": len(urls),
                "caption": (r["caption"] or "").split("\n")[0][:60],
            })
            if not quiet:
                print(f"  BROKEN post {r['id']} ({r['source_type']}, "
                      f"{r['status']}): {len(missing)}/{len(urls)} slides gone "
                      f"— {r['buffer_post_id']}")
    if not quiet:
        print(f"image check: {checked} queued posts, {len(broken)} broken")
    return checked, broken


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--quiet", action="store_true")
    a = ap.parse_args()
    checked, broken = verify(quiet=a.quiet)
    if a.quiet:
        print(json.dumps({"checked": checked, "broken": broken}))
    sys.exit(1 if broken else 0)


if __name__ == "__main__":
    main()

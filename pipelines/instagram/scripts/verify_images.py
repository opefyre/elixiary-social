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


def _missing(urls):
    """URLs R2 no longer serves. Raises if the check itself is broken (a 403
    to our own reader would otherwise report every post as fine)."""
    out = []
    for u in urls:
        key = u.split(r2.PUBLIC_BASE + "/", 1)[-1]
        if not r2.exists(key):
            out.append(u)
    return out


def verify(conn=None, quiet=False):
    """Returns (checked, [broken]). Never raises on a single bad URL."""
    conn = conn or db.connect()
    rows = conn.execute(
        "SELECT id, source_type, status, buffer_post_id, slide_urls, caption "
        "FROM posts WHERE slide_urls IS NOT NULL AND status IN "
        "(%s) ORDER BY id" % ",".join("?" * len(LIVE)), LIVE).fetchall()

    # A mirror points at its own re-framed frames under the same prefix, so it
    # can break on its own — checking the Instagram slides says nothing about it.
    mirrors = [m for m in db.open_crossposts(conn) if m["status"] in LIVE]

    items = [(r["id"], r["source_type"], r["status"], r["buffer_post_id"],
              r["slide_urls"], (r["caption"] or "")) for r in rows]
    items += [(m["post_id"], f"{m['source_type']}/{m['service']}", m["status"],
               m["buffer_post_id"], m["slide_urls"], "") for m in mirrors]

    broken, checked = [], 0
    for pid, kind, status, bpid, raw, caption in items:
        try:
            urls = json.loads(raw or "[]")
        except Exception:
            urls = []
        if not urls:
            continue
        checked += 1
        try:
            missing = _missing(urls)
        except Exception as ex:
            return checked, [{"id": None, "error": str(ex)[:160]}]
        if missing:
            broken.append({
                "id": pid, "type": kind, "status": status,
                "buffer_post_id": bpid,
                "missing": len(missing), "of": len(urls),
                "caption": caption.split("\n")[0][:60],
            })
            if not quiet:
                print(f"  BROKEN post {pid} ({kind}, {status}): "
                      f"{len(missing)}/{len(urls)} slides gone — {bpid}")
    if not quiet:
        print(f"image check: {checked} queued posts "
              f"({len(mirrors)} mirrors), {len(broken)} broken")
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

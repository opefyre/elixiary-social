#!/usr/bin/env python3
"""
Withdraw a queued post: its Buffer draft, its TikTok mirror, its slides, and
its claim on the content.

Dropping the row is the point — it returns the recipe, article or series to
the pool so it can come round again. Published posts are refused outright:
that row is the record of something the audience has already seen.

    python3 scripts/cancel_post.py 43 44 --dry-run
    python3 scripts/cancel_post.py 43 44
"""

import argparse
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
PIPE = os.path.abspath(os.path.join(HERE, ".."))
for p in (os.path.join(PIPE, "state"), os.path.join(PIPE, "render"), PIPE, HERE):
    sys.path.insert(0, p)

import db       # noqa: E402
import r2       # noqa: E402
import publish  # noqa: E402

DELETE = ("mutation D($i: DeletePostInput!){ deletePost(input:$i){ __typename "
          "... on VoidMutationError { message } } }")


def drop_buffer(buffer_post_id):
    if not buffer_post_id:
        return "no draft"
    res = publish.gql(DELETE, {"i": {"id": buffer_post_id}})["deletePost"]
    return res.get("message") or "deleted"


def drop_slides(urls):
    gone = 0
    for u in urls:
        key = u.split(r2.PUBLIC_BASE + "/", 1)[-1]
        try:
            r2.delete(key)
            gone += 1
        except Exception as ex:
            print(f"    slide {key}: {str(ex)[:80]}")
    return gone


def cancel(conn, post_id, dry=False, force=False):
    row = db.get_post(conn, post_id)
    if not row:
        print(f"  {post_id}: no such post")
        return False
    if row["status"] == "published":
        print(f"  {post_id}: refusing — already published")
        return False
    if row["status"] == "scheduled" and not force:
        print(f"  {post_id}: scheduled (you approved it) — pass --force to cancel")
        return False

    mirrors = db.crossposts_for(conn, post_id)
    urls = json.loads(row["slide_urls"] or "[]")
    for m in mirrors:
        urls += json.loads(m["slide_urls"] or "[]")

    if dry:
        print(f"  {post_id} {row['source_type']:9} {row['status']:9} would drop "
              f"draft + {len(mirrors)} mirror(s) + {len(urls)} slides, "
              f"returning {row['source_id'][:28]} to the pool")
        return True

    print(f"  {post_id} {row['source_type']:9} {row['status']:9} "
          f"buffer={drop_buffer(row['buffer_post_id'])}", end="")
    for m in mirrors:
        print(f"  {m['service']}={drop_buffer(m['buffer_post_id'])}", end="")
    n = drop_slides(urls)
    # crossposts cascade on the foreign key
    conn.execute("DELETE FROM posts WHERE id=?", (post_id,))
    conn.commit()
    print(f"  slides={n}  -> {row['source_id'][:28]} back in the pool")
    return True


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("post_ids", nargs="+", type=int)
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--force", action="store_true",
                    help="also cancel posts you already approved")
    a = ap.parse_args()

    conn = db.connect()
    done = sum(1 for pid in a.post_ids if cancel(conn, pid, a.dry_run, a.force))
    print(f"\n{'would cancel' if a.dry_run else 'cancelled'} {done}/{len(a.post_ids)}")


if __name__ == "__main__":
    main()

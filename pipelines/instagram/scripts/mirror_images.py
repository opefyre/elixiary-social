#!/usr/bin/env python3
"""
Mirror curated recipe photos from Google Drive to Cloudflare R2.

Buffer fetches post media at publish time and cannot read Drive share links,
so every recipe photo needs a stable public URL.

STRICTLY ADDITIVE:
  * writes only under the `curated-recipes/` prefix
  * never deletes anything
  * never overwrites — an object that already exists is skipped
  * the pre-existing `recipes/` prefix is unrelated content and is not touched

Resumable: re-running picks up only what's missing.

    python3 mirror_images.py --dry-run          # plan only
    python3 mirror_images.py --limit 5          # small live batch
    python3 mirror_images.py                    # full run
"""

import argparse
import concurrent.futures as cf
import json
import os
import re
import subprocess
import sys
import tempfile
import threading
import time
import urllib.error
import urllib.request

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
WRANGLER = os.path.join(REPO, ".tools", "node_modules", ".bin", "wrangler")
CONN_FILE = os.path.join(REPO, "supabase.txt")

BUCKET = "elixiary-images"
PREFIX = "curated-recipes"
PUBLIC_BASE = "https://pub-dfe281321d524908ae12d89d86e1a8f6.r2.dev"

# Prefixes we must never write to — `recipes/` holds unrelated content.
FORBIDDEN_PREFIXES = ("recipes/", "education-articles/", "menus/")

MAGIC = [
    (b"\x89PNG\r\n\x1a\n", "png", "image/png"),
    (b"\xff\xd8\xff", "jpg", "image/jpeg"),
    (b"GIF8", "gif", "image/gif"),
]

_print_lock = threading.Lock()


def log(msg):
    with _print_lock:
        print(msg, flush=True)


def conn_string():
    with open(CONN_FILE) as f:
        return f.read().strip()


def fetch_rows(limit=None):
    sql = ("SELECT id || E'\\t' || image_url FROM curated_recipes "
           "WHERE image_url IS NOT NULL ORDER BY id")
    if limit:
        sql += f" LIMIT {int(limit)}"
    out = subprocess.run(
        ["psql", conn_string(), "-At",
         "-c", "SET default_transaction_read_only=on;", "-c", sql],
        capture_output=True, text=True, check=True,
    ).stdout
    rows = []
    for line in out.splitlines():
        if "\t" not in line:
            continue
        rid, url = line.split("\t", 1)
        m = re.search(r"/d/([A-Za-z0-9_-]+)", url) or re.search(r"[?&]id=([A-Za-z0-9_-]+)", url)
        if m:
            rows.append({"id": rid.strip(), "drive_id": m.group(1)})
    return rows


def exists_remote(key):
    """The bucket is public, so a HEAD on the public URL is the cheapest
    existence check and costs no Class A/B operation against the API."""
    # r2.dev rejects Python's default User-Agent with 403, which would make
    # every object look missing and cause needless re-uploads.
    req = urllib.request.Request(
        f"{PUBLIC_BASE}/{key}", method="HEAD",
        headers={"User-Agent": "elixiary-mirror/1.0"},
    )
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            return r.status == 200
    except urllib.error.HTTPError as e:
        if e.code == 403:
            raise RuntimeError(
                "R2 returned 403 to the existence check — refusing to continue, "
                "since every object would look missing and be overwritten."
            )
        return False
    except Exception:
        return False


def download(drive_id, dest):
    url = f"https://lh3.googleusercontent.com/d/{drive_id}"
    req = urllib.request.Request(url, headers={"User-Agent": "elixiary-mirror/1.0"})
    with urllib.request.urlopen(req, timeout=90) as r:
        data = r.read()
    if len(data) < 1024:
        raise ValueError(f"suspiciously small ({len(data)} bytes)")
    for sig, ext, mime in MAGIC:
        if data.startswith(sig):
            with open(dest, "wb") as f:
                f.write(data)
            return ext, mime, len(data)
    raise ValueError(f"not an image (starts with {data[:8]!r})")


def upload(path, key, mime):
    if key.startswith(FORBIDDEN_PREFIXES) or not key.startswith(PREFIX + "/"):
        raise RuntimeError(f"refusing to write outside {PREFIX}/: {key}")
    r = subprocess.run(
        [WRANGLER, "r2", "object", "put", f"{BUCKET}/{key}",
         "--file", path, "--content-type", mime, "--remote"],
        capture_output=True, text=True,
    )
    if r.returncode != 0:
        raise RuntimeError((r.stderr or r.stdout).strip()[:300])


def handle(row, dry):
    key = f"{PREFIX}/{row['id']}.png"          # provisional; ext fixed after sniff
    if exists_remote(key):
        return ("skip", row["id"], "already present")
    if dry:
        return ("would-upload", row["id"], key)
    with tempfile.TemporaryDirectory() as td:
        tmp = os.path.join(td, "img")
        try:
            ext, mime, size = download(row["drive_id"], tmp)
        except Exception as ex:
            return ("download-failed", row["id"], str(ex)[:200])
        key = f"{PREFIX}/{row['id']}.{ext}"
        if ext != "png" and exists_remote(key):
            return ("skip", row["id"], "already present")
        try:
            upload(tmp, key, mime)
        except Exception as ex:
            return ("upload-failed", row["id"], str(ex)[:200])
        return ("uploaded", row["id"], f"{size//1024}KB -> {key}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--limit", type=int)
    ap.add_argument("--concurrency", type=int, default=6)
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()

    if not os.path.exists(WRANGLER):
        sys.exit(f"wrangler not found at {WRANGLER} — run npm install in .tools/")

    rows = fetch_rows(a.limit)
    log(f"{len(rows)} recipes with Drive images | prefix={PREFIX}/ "
        f"| dry_run={a.dry_run} | concurrency={a.concurrency}")

    tally, failures, t0 = {}, [], time.time()
    with cf.ThreadPoolExecutor(max_workers=a.concurrency) as ex:
        futs = {ex.submit(handle, r, a.dry_run): r for r in rows}
        for n, fut in enumerate(cf.as_completed(futs), 1):
            status, rid, detail = fut.result()
            tally[status] = tally.get(status, 0) + 1
            if status.endswith("failed"):
                failures.append({"id": rid, "status": status, "detail": detail})
            if n % 25 == 0 or n == len(rows):
                el = time.time() - t0
                log(f"  [{n}/{len(rows)}] {dict(sorted(tally.items()))} "
                    f"{el:.0f}s ({n/max(el,1):.1f}/s)")

    log(f"\nDone in {time.time()-t0:.0f}s: {dict(sorted(tally.items()))}")
    if failures:
        rp = os.path.join(os.path.dirname(__file__), "mirror-failures.json")
        with open(rp, "w") as f:
            json.dump(failures, f, indent=2)
        log(f"{len(failures)} failures written to {rp} — re-run to retry them")


if __name__ == "__main__":
    main()

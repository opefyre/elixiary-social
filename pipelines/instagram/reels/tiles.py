#!/usr/bin/env python3
"""
Square tiles for the mosaic: every recipe the spec unlocks, pulled from the R2
mirror and cut to 360px. sips ships with macOS, so no image library is needed.

    python3 tiles.py spec.json --out ./tiles
"""
import argparse, json, os, subprocess, sys, urllib.request
import concurrent.futures as cf

BASE = "https://pub-dfe281321d524908ae12d89d86e1a8f6.r2.dev/curated-recipes"
UA = {"User-Agent": "elixiary-social/1.0"}   # r2.dev 403s the default agent


def fetch(rid, out):
    dst = os.path.join(out, f"{rid}.jpg")
    if os.path.exists(dst):
        return rid, True
    for ext in ("png", "jpg", "jpeg", "webp"):     # ext was sniffed at mirror time
        try:
            req = urllib.request.Request(f"{BASE}/{rid}.{ext}", headers=UA)
            data = urllib.request.urlopen(req, timeout=40).read()
        except Exception:
            continue
        raw = os.path.join(out, f"{rid}.raw.{ext}"); open(raw, "wb").write(data)
        sq = raw + ".sq.jpg"
        subprocess.run(["sips", "-s", "format", "jpeg", "-s", "formatOptions", "82",
                        "--cropToHeightWidth", "1024", "1024", raw, "--out", sq],
                       capture_output=True, check=True)
        subprocess.run(["sips", "-Z", "360", sq, "--out", dst], capture_output=True, check=True)
        os.remove(raw); os.remove(sq)
        return rid, True
    return rid, False


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("spec"); ap.add_argument("--out", default="./tiles")
    a = ap.parse_args()
    spec = json.load(open(a.spec)); os.makedirs(a.out, exist_ok=True)
    ids = [r["id"] for s in spec for r in s["recipes"]]
    with cf.ThreadPoolExecutor(8) as ex:
        res = list(ex.map(lambda i: fetch(i, a.out), ids))
    miss = [r for r, ok in res if not ok]
    print(f"tiles: {len(ids) - len(miss)}/{len(ids)}" + (f"  missing: {miss}" if miss else ""))
    if miss:
        sys.exit(1)


if __name__ == "__main__":
    main()

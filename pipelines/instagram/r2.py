#!/usr/bin/env python3
"""
Cloudflare R2 access over the REST API.

Uses the same API token as Workers AI, so the pipeline needs no wrangler and
no Node on the host. Writes are confined to an allowlist of prefixes — the
bucket also holds live production assets that this pipeline must never touch.
"""

import json
import os
import sys
import urllib.error
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import credentials  # noqa: E402

ACCOUNT = os.environ.get("CLOUDFLARE_ACCOUNT_ID",
                         "b53df72f41f5135daf312100e73ff6a1")
BUCKET = os.environ.get("ELIXIARY_R2_BUCKET", "elixiary-images")
PUBLIC_BASE = os.environ.get(
    "ELIXIARY_R2_PUBLIC",
    "https://pub-dfe281321d524908ae12d89d86e1a8f6.r2.dev")

# Everything else in this bucket is live site content.
WRITABLE_PREFIXES = ("social/", "curated-recipes/")

UA = "elixiary-pipeline/1.0"


def _api(key):
    return (f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT}"
            f"/r2/buckets/{BUCKET}/objects/{key}")


def _guard(key):
    if not key.startswith(WRITABLE_PREFIXES):
        raise RuntimeError(
            f"refusing to write to '{key}': only {WRITABLE_PREFIXES} are "
            f"writable in {BUCKET}")


def _request(method, url, data=None, content_type=None):
    headers = {"Authorization": f"Bearer {credentials.get('cloudflare')}",
               "User-Agent": UA}
    if content_type:
        headers["Content-Type"] = content_type
    req = urllib.request.Request(url, data=data, method=method, headers=headers)
    with urllib.request.urlopen(req, timeout=120) as r:
        body = r.read()
    try:
        out = json.loads(body)
    except json.JSONDecodeError:
        return {"success": True}
    if not out.get("success", True):
        raise RuntimeError(f"R2 {method} failed: {json.dumps(out.get('errors'))[:300]}")
    return out


def put(local_path, key, content_type="image/png"):
    _guard(key)
    with open(local_path, "rb") as f:
        _request("PUT", _api(key), data=f.read(), content_type=content_type)
    return public_url(key)


def delete(key):
    _guard(key)
    try:
        _request("DELETE", _api(key))
        return True
    except urllib.error.HTTPError as e:
        if e.code == 404:
            return False
        raise


def public_url(key):
    return f"{PUBLIC_BASE}/{key}"


def exists(key):
    """HEAD the public URL — free, and it also proves the object is reachable
    the way Buffer will fetch it."""
    req = urllib.request.Request(public_url(key), method="HEAD",
                                 headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=25) as r:
            return r.status == 200
    except urllib.error.HTTPError as e:
        if e.code == 403:
            raise RuntimeError("R2 returned 403 to a public HEAD — aborting "
                               "rather than treating objects as missing")
        return False
    except Exception:
        return False


if __name__ == "__main__":
    print("bucket :", BUCKET)
    print("public :", PUBLIC_BASE)
    print("writable prefixes:", WRITABLE_PREFIXES)
    try:
        _guard("education-articles/x.png")
    except RuntimeError as e:
        print("guard  : OK —", str(e)[:80])

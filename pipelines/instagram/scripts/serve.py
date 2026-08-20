#!/usr/bin/env python3
"""
Tiny HTTP front-end for the pipeline, so n8n can trigger it.

n8n's Execute Command node is not available on this install, so the daily run
is exposed over loopback HTTP instead and driven by an HTTP Request node.

Binds to 127.0.0.1 only, so nothing off the machine can reach it. That
loopback binding is the actual boundary.

A bearer token is *optional*: create ~/.config/elixiary/servicetoken.txt and
it becomes mandatory. It is deliberately not used by default — the caller
(n8n) runs as the same user on the same box, so it could read the token file
anyway, and embedding the value in a workflow would spread the secret for no
real gain. Create the token if the service is ever bound beyond loopback.

    POST /run     {"recipes": 3, "articles": 1, "marlow": 1, "dry_run": false}
    GET  /health

    python3 scripts/serve.py            # port 8787
"""

import json
import os
import subprocess
import sys
import threading
import time
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

HERE = os.path.dirname(os.path.abspath(__file__))
PIPE = os.path.abspath(os.path.join(HERE, ".."))
sys.path.insert(0, PIPE)
sys.path.insert(0, os.path.join(PIPE, "state"))

HOST = "127.0.0.1"
PORT = int(os.environ.get("ELIXIARY_PORT", "8787"))
TOKEN_FILE = os.path.expanduser(
    os.environ.get("ELIXIARY_SERVICE_TOKEN_FILE",
                   "~/.config/elixiary/servicetoken.txt"))
# Five carousels at 45-95s each, with headroom for the LLM's slow tail.
MAX_SECONDS = 1500

_lock = threading.Lock()          # one run at a time
_last = {"started": None, "finished": None, "summary": None}


def token():
    try:
        with open(TOKEN_FILE) as f:
            return f.read().strip()
    except OSError:
        return None


def run_daily(recipes, articles, dry, homebar=-1, marlow=1):
    cmd = [sys.executable, os.path.join(HERE, "daily_run.py"),
           "--recipes", str(recipes), "--articles", str(articles),
           "--homebar", str(homebar), "--marlow", str(marlow)]
    if dry:
        cmd.append("--dry-run")
    p = subprocess.run(cmd, capture_output=True, text=True, timeout=MAX_SECONDS)
    out = (p.stdout or "").strip()
    summary = None
    for line in out.splitlines():
        if line.strip().startswith("{"):
            try:
                summary = json.loads(line)
            except json.JSONDecodeError:
                pass
    return {
        "ok": p.returncode == 0,
        "exitCode": p.returncode,
        "summary": summary,
        "stdout": out[-4000:],
        "stderr": (p.stderr or "").strip()[-2000:],
    }


class Handler(BaseHTTPRequestHandler):
    server_version = "elixiary/1.0"

    def log_message(self, fmt, *args):      # quieter logs
        sys.stderr.write("%s %s\n" % (self.address_string(), fmt % args))

    def _send(self, code, payload):
        body = json.dumps(payload).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _authorised(self):
        # The bind address is the real control. Refuse anything that somehow
        # arrives from off-box even if the socket were rebound.
        client = self.client_address[0]
        if client not in ("127.0.0.1", "::1"):
            self._send(403, {"error": f"loopback only, got {client}"})
            return False
        want = token()
        if not want:
            return True                      # no token configured: loopback is enough
        got = (self.headers.get("Authorization") or "").removeprefix("Bearer ").strip()
        if got != want:
            self._send(401, {"error": "unauthorized"})
            return False
        return True

    def do_GET(self):
        if self.path.split("?")[0] == "/health":
            import db
            conn = db.connect()
            self._send(200, {"ok": True, "counts": db.counts(conn),
                             "busy": _lock.locked(), "last": _last})
        else:
            self._send(404, {"error": "not found"})

    def do_POST(self):
        if self.path.split("?")[0] != "/run":
            return self._send(404, {"error": "not found"})
        if not self._authorised():
            return
        try:
            n = int(self.headers.get("Content-Length") or 0)
            body = json.loads(self.rfile.read(n) or b"{}") if n else {}
        except (ValueError, json.JSONDecodeError):
            return self._send(400, {"error": "invalid JSON body"})

        recipes = int(body.get("recipes", 3))
        articles = int(body.get("articles", 1))
        homebar = int(body.get("homebar", -1))
        marlow = int(body.get("marlow", 1))
        dry = bool(body.get("dry_run", False))
        if not all(0 <= n <= 8 for n in (recipes, articles, marlow)) \
                or not (-1 <= homebar <= 8):
            return self._send(400, {"error": "counts must be 0-8"})

        if not _lock.acquire(blocking=False):
            return self._send(409, {"error": "a run is already in progress",
                                    "last": _last})
        try:
            _last["started"] = time.strftime("%Y-%m-%dT%H:%M:%S%z")
            result = run_daily(recipes, articles, dry, homebar, marlow)
            _last["finished"] = time.strftime("%Y-%m-%dT%H:%M:%S%z")
            _last["summary"] = result.get("summary")
            self._send(200 if result["ok"] else 500, result)
        except subprocess.TimeoutExpired:
            self._send(504, {"error": f"run exceeded {MAX_SECONDS}s"})
        except Exception as ex:
            self._send(500, {"error": str(ex)[:500]})
        finally:
            _lock.release()


if __name__ == "__main__":
    srv = ThreadingHTTPServer((HOST, PORT), Handler)
    print(f"elixiary pipeline service on http://{HOST}:{PORT} "
          f"(token {'required' if token() else 'not set — loopback only'})",
          flush=True)
    srv.serve_forever()

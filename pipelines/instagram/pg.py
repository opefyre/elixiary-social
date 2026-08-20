#!/usr/bin/env python3
"""
Read-only Supabase access.

Prefers psycopg2 (vendored into ./vendor, so nothing is installed system-wide)
and falls back to shelling out to psql where that exists. Every query runs in a
read-only transaction — Supabase is never written to by this pipeline.
"""

import json
import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
VENDOR = os.path.join(HERE, "vendor")
if os.path.isdir(VENDOR) and VENDOR not in sys.path:
    sys.path.insert(0, VENDOR)

sys.path.insert(0, HERE)
import credentials  # noqa: E402

try:
    import psycopg2  # noqa: F401
    import psycopg2.extras
    HAVE_PSYCOPG = True
except ImportError:
    HAVE_PSYCOPG = False


def rows(sql, params=None):
    """Run a SELECT and return a list of dicts.

    The SQL should select a single jsonb column (to_jsonb(...)) so both
    backends agree on the shape.
    """
    dsn = credentials.get("supabase")

    if HAVE_PSYCOPG:
        conn = psycopg2.connect(dsn)
        try:
            conn.set_session(readonly=True, autocommit=True)
            with conn.cursor() as cur:
                cur.execute(sql, params or ())
                out = []
                for r in cur.fetchall():
                    v = r[0]
                    out.append(v if isinstance(v, dict) else json.loads(v))
                return out
        finally:
            conn.close()

    if params:
        raise RuntimeError("psql fallback does not support bound parameters; "
                           "install psycopg2 into ./vendor")
    proc = subprocess.run(
        ["psql", dsn, "-At", "-c", "SET default_transaction_read_only=on;",
         "-c", sql],
        capture_output=True, text=True, check=True)
    out = []
    for line in proc.stdout.splitlines():
        line = line.strip()
        if line.startswith("{"):
            try:
                out.append(json.loads(line))
            except json.JSONDecodeError:
                pass
    return out


def backend():
    return "psycopg2" if HAVE_PSYCOPG else "psql"


if __name__ == "__main__":
    print("backend:", backend())
    print("recipes:", rows("SELECT to_jsonb(x) FROM "
                           "(SELECT count(*) AS n FROM curated_recipes) x;"))

#!/usr/bin/env python3
"""
Resolve credentials without assuming the repo layout.

On this laptop the credential files sit in the repo root. On the spare Mac the
code is deployed on its own, so they live in a private directory instead.

Order for each secret:
  1. the environment variable (best for launchd / n8n)
  2. $ELIXIARY_SECRETS_DIR/<file>
  3. ~/.config/elixiary/<file>
  4. <repo root>/<file>          (developer machine)
"""

import os

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.abspath(os.path.join(HERE, "..", ".."))

SECRETS = {
    "supabase":   ("ELIXIARY_DATABASE_URL",    "supabase.txt"),
    "buffer":     ("BUFFER_API_KEY",           "bufferapi.txt"),
    "cloudflare": ("CLOUDFLARE_API_TOKEN",     "cloudflaretoken.txt"),
}


def _dirs():
    out = []
    env_dir = os.environ.get("ELIXIARY_SECRETS_DIR")
    if env_dir:
        out.append(env_dir)
    out.append(os.path.expanduser("~/.config/elixiary"))
    out.append(REPO)
    return out


def get(name, required=True):
    env_var, filename = SECRETS[name]
    val = os.environ.get(env_var)
    if val and val.strip():
        return val.strip()
    for d in _dirs():
        p = os.path.join(d, filename)
        try:
            with open(p) as f:
                v = f.read().strip()
                if v:
                    return v
        except OSError:
            continue
    if required:
        raise RuntimeError(
            f"no credential for '{name}': set {env_var}, or put {filename} in "
            f"$ELIXIARY_SECRETS_DIR, ~/.config/elixiary, or the repo root")
    return None


def where(name):
    """Report which source supplied a secret, without revealing its value."""
    env_var, filename = SECRETS[name]
    if os.environ.get(env_var):
        return f"env:{env_var}"
    for d in _dirs():
        p = os.path.join(d, filename)
        if os.path.exists(p) and open(p).read().strip():
            return f"file:{p}"
    return "MISSING"


if __name__ == "__main__":
    for k in SECRETS:
        print(f"  {k:11} <- {where(k)}")

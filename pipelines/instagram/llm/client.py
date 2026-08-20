#!/usr/bin/env python3
"""
Minimal LLM client. Free-tier only.

Default backend is Cloudflare Workers AI, which is already authorised on this
account and has a free daily allowance. OpenRouter is supported as a fallback
so the same code can run behind n8n's existing credential.

Credentials, in order of preference:
  CLOUDFLARE_API_TOKEN       environment variable
  <repo>/cloudflaretoken.txt a scoped API token (gitignored) — preferred for
                             unattended runs, since it does not expire the way
                             wrangler's OAuth token refreshes
  wrangler's OAuth token     fallback, read from ~/Library/Preferences/.wrangler
  OPENROUTER_API_KEY         with backend="openrouter"
"""

import json
import os
import re
import time
import urllib.error
import urllib.request

CF_ACCOUNT = os.environ.get("CLOUDFLARE_ACCOUNT_ID",
                            "b53df72f41f5135daf312100e73ff6a1")
CF_MODEL = os.environ.get("ELIXIARY_LLM_MODEL",
                          "@cf/zai-org/glm-5.2")
OR_MODEL = os.environ.get("ELIXIARY_OR_MODEL",
                          "meta-llama/llama-3.3-70b-instruct:free")

WRANGLER_CFG = os.path.expanduser(
    "~/Library/Preferences/.wrangler/config/default.toml")
# llm/ -> instagram/ -> pipelines/ -> <repo root>
_REPO = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),
                                     "..", "..", ".."))
TOKEN_FILE = os.path.join(_REPO, "cloudflaretoken.txt")


def _cf_token():
    """Env var, then the gitignored token file, then wrangler's OAuth token."""
    tok = os.environ.get("CLOUDFLARE_API_TOKEN")
    if tok:
        return tok.strip()
    try:
        import sys
        sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
        import credentials as _s
        tok = _s.get("cloudflare", required=False)
        if tok:
            return tok
    except Exception:
        pass
    return _wrangler_token()


def _wrangler_token():
    try:
        for line in open(WRANGLER_CFG):
            m = re.match(r'\s*oauth_token\s*=\s*"([^"]+)"', line)
            if m:
                return m.group(1)
    except OSError:
        pass
    return None


def _post(url, payload, token, timeout=120):
    req = urllib.request.Request(
        url, data=json.dumps(payload).encode(), method="POST",
        headers={"Authorization": f"Bearer {token}",
                 "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return json.loads(r.read())


def _extract_json(text):
    """Models sometimes wrap JSON in prose or fences. Pull out the object."""
    text = (text or "").strip()
    text = re.sub(r"^```(?:json)?\s*|\s*```$", "", text, flags=re.M).strip()
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass
    depth, start = 0, None
    for i, ch in enumerate(text):
        if ch == "{":
            if depth == 0:
                start = i
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0 and start is not None:
                try:
                    return json.loads(text[start:i + 1])
                except json.JSONDecodeError:
                    start = None
    raise ValueError(f"no JSON object in response: {text[:300]}")


def complete_json(system, user, schema=None, backend="cf", max_tokens=2400,
                  temperature=0.7, attempts=3):
    """Ask for JSON and return a parsed dict. Retries on unparseable output."""
    last = None
    for n in range(attempts):
        try:
            if backend == "cf":
                token = _cf_token()
                if not token:
                    raise RuntimeError(
                        "no Cloudflare credential: set CLOUDFLARE_API_TOKEN, "
                        "add cloudflaretoken.txt, or log in with wrangler")
                payload = {
                    "messages": [{"role": "system", "content": system},
                                 {"role": "user", "content": user}],
                    "max_tokens": max_tokens,
                    "temperature": temperature,
                }
                if schema:
                    payload["response_format"] = {
                        "type": "json_schema", "json_schema": schema}
                out = _post(
                    f"https://api.cloudflare.com/client/v4/accounts/"
                    f"{CF_ACCOUNT}/ai/run/{CF_MODEL}", payload, token)
                if not out.get("success", True):
                    raise RuntimeError(f"Workers AI error: {out.get('errors')}")
                res = out["result"]
                if isinstance(res.get("response"), str):
                    text = res["response"]
                elif res.get("response") is not None:
                    text = json.dumps(res["response"])
                else:
                    choice = res["choices"][0]
                    text = choice["message"].get("content") or ""
                    if not text.strip():
                        # glm-5.2 and gpt-oss are reasoning models: if the token
                        # budget is spent on reasoning, content comes back empty
                        raise ValueError(
                            f"empty content (finish_reason="
                            f"{choice.get('finish_reason')}) — raise max_tokens")
            else:
                key = os.environ.get("OPENROUTER_API_KEY")
                if not key:
                    raise RuntimeError("OPENROUTER_API_KEY not set")
                out = _post("https://openrouter.ai/api/v1/chat/completions", {
                    "model": OR_MODEL,
                    "messages": [{"role": "system", "content": system},
                                 {"role": "user", "content": user}],
                    "max_tokens": max_tokens, "temperature": temperature,
                }, key)
                text = out["choices"][0]["message"]["content"]

            return _extract_json(text) if not isinstance(text, dict) else text
        except (ValueError, KeyError, urllib.error.HTTPError, RuntimeError) as ex:
            last = ex
            if n < attempts - 1:
                time.sleep(1.5 * (n + 1))
    raise RuntimeError(f"LLM failed after {attempts} attempts: {last}")


if __name__ == "__main__":
    print(complete_json(
        "You output JSON only.",
        'Give me {"ok": true, "note": "<a five word note>"} and nothing else.'))

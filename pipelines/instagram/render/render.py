#!/usr/bin/env python3
"""
Elixiary slide renderer.

Turns a carousel spec (JSON) into 1080x1350 PNG slides using headless Chrome.
Stdlib only — no pip installs — so it runs the same on this laptop and the
spare Mac.

    python3 render.py spec.json --out ./out

Spec shape:
    {
      "theme": "recipe" | "learn",
      "slides": [ {...}, ... ]
    }

Slide kinds: hook | list | steps | prose | stats | cta
"""

import argparse
import base64
import hashlib
import html
import json
import mimetypes
import os
import shutil
import subprocess
import sys
import tempfile
import urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
W, H = 1080, 1350

def _puppeteer_chromes():
    """Contained Chromium, kept inside render/.chromium so nothing is
    installed system-wide. Populated by `scripts/install_chromium.sh`."""
    roots = [os.environ.get("PUPPETEER_CACHE_DIR"),
             os.path.join(HERE, ".chromium"),
             os.path.join(HERE, ".puppeteer"),
             os.path.expanduser("~/.cache/puppeteer")]
    found = []
    for root in roots:
        if not root or not os.path.isdir(root):
            continue
        for dirpath, dirnames, filenames in os.walk(root):
            for fn in filenames:
                if fn in ("Google Chrome for Testing", "chrome", "chrome-headless-shell"):
                    p = os.path.join(dirpath, fn)
                    if os.access(p, os.X_OK):
                        found.append(p)
            if dirpath.count(os.sep) - root.count(os.sep) > 8:
                dirnames[:] = []
    return sorted(found)


CHROME_CANDIDATES = [
    os.environ.get("ELIXIARY_CHROME") or "",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser",
    shutil.which("chromium") or "",
    shutil.which("google-chrome") or "",
]

THEMES = {
    # Light "cocktail menu paper" — the CurateRecipe backplate
    "recipe": {
        "bg": "recipe-bg.png",
        "fg": "#16271d",
        "muted": "rgba(22,39,29,.68)",
        "accent": "#B26B12",
        "rule": "rgba(13,57,41,.20)",
        "card": "rgba(252,251,247,.945)",
        "card_line": "rgba(13,57,41,.14)",
        "chip_bg": "rgba(13,57,41,.06)",
        "chip_line": "rgba(13,57,41,.20)",
        "shadow": "0 24px 60px rgba(78,54,18,.13)",
        "grad": "linear-gradient(102deg,#C77C18 0%,#A85410 52%,#0D3929 100%)",
        "foot_left": 134,
        "nudge_right": 56,
        "hook_align": "flex-end",
        "cta_right": "330px",
        "cta_mascot": True,
        "card_right": 76,
        "hook_pad": "150px 250px 146px 76px",
    },
    # Create backplate — Marlow the glass mascot, used for AI-generated drinks
    "create": {
        "bg": "create-bg.png",
        "fg": "#FCFEFD",
        "muted": "rgba(232,236,242,.70)",
        "accent": "#F5C451",
        "rule": "rgba(245,196,81,.24)",
        "card": "rgba(7,20,15,.94)",
        "card_line": "rgba(245,196,81,.20)",
        "chip_bg": "rgba(255,255,255,.06)",
        "chip_line": "rgba(255,255,255,.14)",
        "shadow": "0 24px 60px rgba(0,0,0,.45)",
        "grad": "linear-gradient(102deg,#FBE2A0 0%,#F5C451 30%,#F59E0B 68%,#f97316 100%)",
        "foot_left": 134,
        "nudge_right": 56,
        "cta_right": "330px",
        "cta_mascot": True,
        "card_right": 300,
        "hook_align": "flex-end",
        "hook_pad": "150px 300px 146px 76px",
    },
    # Discover backplate — deep navy, shaker bottom-right. Clean through the
    # middle, so the card runs nearly full width and stops short of the glass.
    "discover": {
        "bg": "discover-bg.png",
        "fg": "#FCFEFD",
        "muted": "rgba(232,236,242,.72)",
        "accent": "#F5C451",
        "rule": "rgba(245,196,81,.24)",
        "card": "rgba(8,14,26,.93)",
        "card_line": "rgba(245,196,81,.20)",
        "chip_bg": "rgba(255,255,255,.06)",
        "chip_line": "rgba(255,255,255,.14)",
        "shadow": "0 24px 60px rgba(0,0,0,.5)",
        "grad": "linear-gradient(102deg,#FBE2A0 0%,#F5C451 30%,#F59E0B 68%,#f97316 100%)",
        "foot_left": 134,
        "nudge_right": 56,
        "cta_right": "360px",
        "cta_mascot": True,
        "card_right": 120,
        "hook_align": "flex-end",
        "hook_pad": "150px 300px 168px 76px",
    },
    # HomeBar backplate — Sal with the app open. Clear zone is the upper
    # band only, so hook copy is top-anchored rather than bottom-anchored.
    "homebar": {
        "bg": "homebar-bg.png",
        "fg": "#FCFEFD",
        "muted": "rgba(232,236,242,.74)",
        "accent": "#F5C451",
        "rule": "rgba(245,196,81,.24)",
        # near-opaque: Sal's face showed through the panel and read as a
        # rendering fault rather than a design choice
        "card": "rgba(6,17,13,.975)",
        "card_line": "rgba(245,196,81,.20)",
        "chip_bg": "rgba(255,255,255,.06)",
        "chip_line": "rgba(255,255,255,.14)",
        "shadow": "0 24px 60px rgba(0,0,0,.45)",
        "grad": "linear-gradient(102deg,#FBE2A0 0%,#F5C451 30%,#F59E0B 68%,#f97316 100%)",
        "foot_left": 76,
        "nudge_right": 140,
        "cta_right": "540px",
        "cta_mascot": False,
        "card_right": 250,
        "hook_align": "flex-start",
        "hook_pad": "212px 300px 0 76px",
    },
    # Dark bottle-green — the Learn backplate
    "learn": {
        "bg": "learn-bg.png",
        "fg": "#FCFEFD",
        "muted": "rgba(232,236,242,.70)",
        "accent": "#F5C451",
        "rule": "rgba(245,196,81,.24)",
        "card": "rgba(7,20,15,.86)",
        "card_line": "rgba(245,196,81,.20)",
        "chip_bg": "rgba(255,255,255,.06)",
        "chip_line": "rgba(255,255,255,.14)",
        "shadow": "0 24px 60px rgba(0,0,0,.45)",
        "grad": "linear-gradient(102deg,#FBE2A0 0%,#F5C451 30%,#F59E0B 68%,#f97316 100%)",
        "foot_left": 76,
        "nudge_right": 140,
            "hook_align": "flex-end",
        "cta_right": "330px",
        "cta_mascot": True,
        "card_right": 76,
        "hook_pad": "150px 250px 146px 76px",
},
}


def find_chrome():
    for c in CHROME_CANDIDATES:
        if c and os.path.exists(c):
            return c
    pup = _puppeteer_chromes()
    if pup:
        return pup[0]
    sys.exit("No Chromium found. Set ELIXIARY_CHROME, or run "
             "`npm run setup` in this directory to fetch a contained one.")


def data_uri(path):
    mime = mimetypes.guess_type(path)[0] or "application/octet-stream"
    with open(path, "rb") as f:
        return f"data:{mime};base64," + base64.b64encode(f.read()).decode()


def remote_data_uri(url, cache_dir=None):
    """Fetch an image and inline it. Slides are rendered from file:// so a
    remote <img> would not load, and inlining also means the render does not
    depend on the host being up at that moment."""
    cache_dir = cache_dir or os.path.join(HERE, ".imgcache")
    os.makedirs(cache_dir, exist_ok=True)
    key = hashlib.sha256(url.encode()).hexdigest()[:24]
    hit = os.path.join(cache_dir, key)
    if not os.path.exists(hit):
        req = urllib.request.Request(url, headers={"User-Agent": "elixiary-render/1.0"})
        with urllib.request.urlopen(req, timeout=60) as r:
            data = r.read()
        if len(data) < 512:
            raise ValueError(f"image too small ({len(data)} bytes): {url}")
        with open(hit, "wb") as f:
            f.write(data)
    with open(hit, "rb") as f:
        head = f.read(12)
    mime = ("image/png" if head.startswith(b"\x89PNG") else
            "image/jpeg" if head.startswith(b"\xff\xd8") else
            "image/webp" if head[8:12] == b"WEBP" else "image/png")
    with open(hit, "rb") as f:
        return f"data:{mime};base64," + base64.b64encode(f.read()).decode()


def e(s):
    return html.escape(str(s if s is not None else ""))


# ── slide body builders ────────────────────────────────────────────────────

def _eyebrow(s):
    return f'<p class="eyebrow">{e(s)}</p>' if s else ""


def build_hook(s):
    meta = "".join(f'<span class="chip">{e(m)}</span>' for m in s.get("meta", []))
    title = str(s.get("title") or "")
    # Brand headline pattern: last word carries the amber gradient. Single-word
    # titles take the gradient whole.
    words = title.split()
    if len(words) > 1:
        head = f'{e(" ".join(words[:-1]))} <span class="grad">{e(words[-1])}</span>'
    else:
        head = f'<span class="grad">{e(title)}</span>'

    size = s.get("title_size", 104)
    kicker = s.get("kicker")
    return f"""
    <div class="pad hook">
      <div class="rule"></div>
      {_eyebrow(s.get('eyebrow'))}
      {f'<p class="kicker">{e(kicker)}</p>' if kicker else ""}
      <h1 class="display" style="font-size:{size}px">{head}</h1>
      {f'<p class="lede">{e(s.get("subtitle"))}</p>' if s.get("subtitle") else ""}
      {f'<div class="chips">{meta}</div>' if meta else ""}
    </div>"""


def build_list(s):
    rows = ""
    for it in s.get("items", []):
        if isinstance(it, dict):
            rows += (
                '<li><span class="k">{}</span><span class="dots"></span>'
                '<span class="v">{}</span></li>'
            ).format(e(it.get("label")), e(it.get("value")))
        else:
            rows += f'<li><span class="k">{e(it)}</span></li>'
    return f"""
    <div class="pad">
      <div class="card">
        {_eyebrow(s.get('eyebrow'))}
        <h2 class="h2">{e(s.get('title'))}</h2>
        <ul class="list">{rows}</ul>
        {f'<p class="note">{e(s.get("note"))}</p>' if s.get("note") else ""}
      </div>
    </div>"""


def build_steps(s):
    rows = "".join(
        f'<li><span class="num">{i}</span><span class="txt">{e(t)}</span></li>'
        for i, t in enumerate(s.get("items", []), 1)
    )
    return f"""
    <div class="pad">
      <div class="card">
        {_eyebrow(s.get('eyebrow'))}
        <h2 class="h2">{e(s.get('title'))}</h2>
        <ol class="steps">{rows}</ol>
        {f'<p class="note">{e(s.get("note"))}</p>' if s.get("note") else ""}
      </div>
    </div>"""


def build_prose(s):
    paras = "".join(f"<p>{e(p)}</p>" for p in s.get("paragraphs", []))
    return f"""
    <div class="pad">
      <div class="card">
        {_eyebrow(s.get('eyebrow'))}
        <h2 class="h2">{e(s.get('title'))}</h2>
        <div class="prose">{paras}</div>
      </div>
    </div>"""


def build_stats(s):
    cells = "".join(
        f'<div class="stat"><div class="sv">{e(x.get("value"))}</div>'
        f'<div class="sl">{e(x.get("label"))}</div></div>'
        for x in s.get("items", [])
    )
    flags = "".join(f'<span class="chip">{e(f)}</span>' for f in s.get("flags", []))
    return f"""
    <div class="pad">
      <div class="card">
        {_eyebrow(s.get('eyebrow'))}
        <h2 class="h2">{e(s.get('title'))}</h2>
        <div class="stats">{cells}</div>
        {f'<div class="chips">{flags}</div>' if flags else ""}
        {f'<p class="note">{e(s.get("note"))}</p>' if s.get("note") else ""}
      </div>
    </div>"""


def _glyph(name, sz=30):
    d = {
        "save": '<path d="M6 3h12a1 1 0 011 1v17l-7-4-7 4V4a1 1 0 011-1z"/>',
        "send": '<path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>',
        "follow": '<path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8'
                  'M19 8v6M22 11h-6"/>',
    }[name]
    return (f'<svg class="g" width="{sz}" height="{sz}" viewBox="0 0 24 24" fill="none" '
            f'stroke="currentColor" stroke-width="2" stroke-linecap="round" '
            f'stroke-linejoin="round">{d}</svg>')


def build_cta(s, marlow_uri):
    """No fake buttons. Nothing on an Instagram image is tappable, so the last
    slide asks for actions the viewer can actually perform: save, send, follow,
    and the bio link."""
    acts = "".join(
        f'<li>{_glyph(a.get("icon", "save"))}<span>{e(a.get("text"))}</span></li>'
        for a in s.get("actions", [])
    )
    link = s.get("link")
    return f"""
    <div class="pad cta">
      {_eyebrow(s.get('eyebrow'))}
      <h1 class="display cta-h">{e(s.get('title'))}</h1>
      {f'<p class="lede">{e(s.get("subtitle"))}</p>' if s.get("subtitle") else ""}
      {f'<ul class="acts">{acts}</ul>' if acts else ""}
      {f'<p class="linkline"><span class="arr">&rarr;</span> {e(link)}</p>' if link else ""}
      {f'<img class="marlow" src="{marlow_uri}" alt="">' if marlow_uri else ""}
    </div>"""


def build_photo(s, img_uri, logo_uri=None, pill="CREATE"):
    """Full-bleed image with a scrim, for the generated artwork itself."""
    meta = "".join(f'<span class="chip">{e(m)}</span>' for m in s.get("meta", []))
    title = str(s.get("title") or "")
    words = title.split()
    head = (f'{e(" ".join(words[:-1]))} <span class="grad">{e(words[-1])}</span>'
            if len(words) > 1 else f'<span class="grad">{e(title)}</span>')
    lock = (f'<div class="lockup"><img src="{logo_uri}" alt="">'
            f'<span class="bar"></span><span class="pill">{e(pill)}</span></div>'
            if logo_uri else "")
    return f"""
    <div class="photo-bg" style="background-image:url({img_uri})"></div>
    <div class="photo-scrim"></div>
    {lock}
    <div class="pad photo">
      <div class="rule"></div>
      {_eyebrow(s.get('eyebrow'))}
      {f'<p class="kicker">{e(s["kicker"])}</p>' if s.get("kicker") else ""}
      <h1 class="display" style="font-size:{s.get('title_size', 96)}px">{head}</h1>
      {f'<p class="lede">{e(s.get("subtitle"))}</p>' if s.get("subtitle") else ""}
      {f'<div class="chips">{meta}</div>' if meta else ""}
    </div>"""


BUILDERS = {
    "hook": build_hook,
    "list": build_list,
    "steps": build_steps,
    "prose": build_prose,
    "stats": build_stats,
}


def page_html(slide, theme_key, idx, total, assets):
    t = THEMES[theme_key]
    kind = slide.get("kind", "prose")
    if kind == "cta":
        body = build_cta(slide,
                         assets.get("marlow") if t.get("cta_mascot", True) else None)
    elif kind == "photo":
        body = build_photo(slide, assets["images"][slide["image"]],
                           assets.get("logo"), slide.get("pill", "CREATE"))
    else:
        body = BUILDERS.get(kind, build_prose)(slide)

    # Bottom-left lockup, inset past the template's sparkle badge (~100px wide)
    # and clear of the embossed glass watermark in the top-right corner.
    nudge = (
        f'<div class="nudge">{_glyph("save", 26)}'
        f'<span>{e(slide["save_hint"])}</span></div>'
        if slide.get("save_hint") else ""
    )

    counter = (
        f'<span class="sep">&middot;</span><span class="counter">{idx}'
        f'<span class="of">/{total}</span></span>' if total > 1 else ""
    )

    return f"""<!doctype html><html><head><meta charset="utf-8">
<style>
@font-face{{font-family:'PJS';src:url({assets['pjs']}) format('woff2');
  font-weight:100 900;font-display:block}}
@font-face{{font-family:'InterV';src:url({assets['inter']}) format('woff2');
  font-weight:100 900;font-display:block}}
*{{margin:0;padding:0;box-sizing:border-box}}
html,body{{width:{W}px;height:{H}px;overflow:hidden}}
body{{
  background:url({assets['bg']}) center/cover no-repeat;
  color:{t['fg']};font-family:'InterV',system-ui,sans-serif;
  -webkit-font-smoothing:antialiased;position:relative}}

.pad{{position:absolute;inset:0;padding:150px 76px 118px;display:flex;
  flex-direction:column}}

/* hook + cta sit directly on the artwork, lower-left, clear of the photo */
.hook{{justify-content:{t['hook_align']};padding:{t['hook_pad']}}}
.photo-bg{{position:absolute;inset:0;background-size:cover;
  background-position:center;z-index:0}}
.photo-scrim{{position:absolute;inset:0;z-index:1;background:
  linear-gradient(180deg,rgba(6,17,13,.72) 0%,rgba(6,17,13,.12) 34%,
  rgba(6,17,13,.58) 66%,rgba(6,17,13,.96) 100%)}}
.photo{{justify-content:flex-end;padding:150px 110px 150px 76px;z-index:2}}
.photo .kicker{{max-width:24ch}}
.photo .lede{{max-width:26ch}}
/* the backplates carry the lockup; a full-bleed photo has to draw its own */
.lockup{{position:absolute;left:76px;top:62px;z-index:3;display:flex;
  align-items:center;gap:22px}}
.lockup img{{width:96px;height:96px;display:block;border-radius:50%;
  filter:drop-shadow(0 6px 18px rgba(0,0,0,.55))}}
.lockup .bar{{width:1px;height:52px;background:rgba(252,254,253,.42)}}
.lockup .pill{{font-family:'PJS';font-weight:700;font-size:25px;
  letter-spacing:.22em;color:#FCFEFD;border:1px solid rgba(252,254,253,.55);
  border-radius:999px;padding:13px 30px;
  text-shadow:0 1px 8px rgba(0,0,0,.6)}}
.rule{{width:74px;height:4px;border-radius:2px;background:{t['accent']};
  margin-bottom:26px;opacity:.95}}
.kicker{{font-family:'PJS';font-weight:700;font-size:33px;line-height:1.16;
  letter-spacing:-.012em;color:{t['muted']};margin-bottom:14px;max-width:17ch}}
.grad{{background:{t['grad']};-webkit-background-clip:text;background-clip:text;
  color:transparent}}
.cta{{justify-content:center;padding-right:{t['cta_right']}}}

.eyebrow{{font-family:'PJS';font-weight:700;font-size:24px;letter-spacing:.26em;
  text-transform:uppercase;color:{t['accent']};margin-bottom:22px}}

.display{{font-family:'PJS';font-weight:800;font-size:104px;line-height:.94;
  letter-spacing:-.028em;text-wrap:balance}}
.cta-h{{font-size:82px}}
.lede{{font-size:32px;line-height:1.38;color:{t['muted']};margin-top:26px;
  max-width:24ch}}

.chips{{display:flex;flex-wrap:wrap;gap:12px;margin-top:30px}}
.chip{{font-family:'PJS';font-weight:600;font-size:23px;padding:13px 23px;
  border-radius:999px;background:{t['chip_bg']};border:1px solid {t['chip_line']};
  white-space:nowrap}}

/* content card — lifts text off the photography */
.card{{background:{t['card']};border:1px solid {t['card_line']};border-radius:26px;
  box-shadow:{t['shadow']};padding:56px 54px;margin:auto 0;
  margin-right:{t['card_right'] - 76}px;
  backdrop-filter:blur(3px)}}
.h2{{font-family:'PJS';font-weight:800;font-size:56px;line-height:1.04;
  letter-spacing:-.02em;margin-bottom:36px;text-wrap:balance}}

.list{{list-style:none;display:flex;flex-direction:column;gap:19px}}
.list li{{display:flex;align-items:baseline;gap:14px;font-size:31px;
  line-height:1.28}}
.list .k{{flex:0 1 auto}}
.list .dots{{flex:1 1 auto;border-bottom:2px dotted {t['rule']};
  transform:translateY(-7px);min-width:24px}}
.list .v{{flex:0 0 auto;font-family:'PJS';font-weight:700;color:{t['accent']};
  white-space:nowrap}}

.steps{{list-style:none;display:flex;flex-direction:column;gap:24px;
  counter-reset:s}}
.steps li{{display:flex;gap:20px;align-items:flex-start}}
.steps .num{{flex:0 0 46px;height:46px;border-radius:50%;display:flex;
  align-items:center;justify-content:center;font-family:'PJS';font-weight:800;
  font-size:23px;background:{t['accent']};color:{t['card']};margin-top:2px}}
.steps .txt{{font-size:29px;line-height:1.36;padding-top:5px}}

.prose p{{font-size:30px;line-height:1.44;margin-bottom:22px}}
.prose p:last-child{{margin-bottom:0}}

.stats{{display:grid;grid-template-columns:repeat(3,1fr);gap:26px}}
.stat{{background:{t['chip_bg']};border:1px solid {t['chip_line']};
  border-radius:18px;padding:26px 20px;text-align:center}}
.sv{{font-family:'PJS';font-weight:800;font-size:46px;color:{t['accent']};
  line-height:1}}
.sl{{font-size:19px;letter-spacing:.09em;text-transform:uppercase;
  color:{t['muted']};margin-top:10px}}

.note{{font-size:23px;line-height:1.4;color:{t['muted']};margin-top:30px;
  padding-top:22px;border-top:1px solid {t['rule']}}}

.acts{{list-style:none;margin-top:40px;display:flex;flex-direction:column;
  gap:22px}}
.acts li{{display:flex;align-items:center;gap:17px;font-size:29px;
  line-height:1.25}}
.acts .g{{flex:0 0 auto;color:{t['accent']}}}
.linkline{{margin-top:38px;font-family:'PJS';font-weight:700;font-size:31px;
  color:{t['accent']};display:flex;align-items:center;gap:13px}}
.linkline .arr{{font-size:34px;line-height:1}}

/* mid-carousel save nudge — most viewers never reach the last slide */
.nudge{{position:absolute;right:{t['nudge_right']}px;bottom:64px;display:flex;align-items:center;
  gap:12px;font-family:'PJS';font-weight:700;font-size:23px;
  color:{t['accent']};background:{t['card']};
  border:1px solid {t['card_line']};border-radius:999px;padding:14px 24px 14px 20px;
  box-shadow:{t['shadow']}}}
.marlow{{position:absolute;right:44px;bottom:104px;width:290px;height:auto;
  filter:drop-shadow(0 22px 34px rgba(0,0,0,.42))}}

.foot{{position:absolute;left:{t['foot_left']}px;bottom:70px;display:flex;align-items:center;
  gap:12px;font-family:'PJS';font-weight:600;font-size:22px;letter-spacing:.2em;
  text-transform:uppercase;color:{t['fg']};opacity:.82;
  text-shadow:0 1px 10px rgba(0,0,0,.75),0 0 3px rgba(0,0,0,.6)}}
.foot .sep{{opacity:.5;letter-spacing:0}}
.counter{{font-weight:700;color:{t['accent']};letter-spacing:.06em}}
.counter .of{{color:{t['muted']}}}
</style></head><body>
{body}
{nudge}
<div class="foot"><span>elixiary.com</span>{counter}</div>
</body></html>"""


def render(spec, outdir, chrome=None):
    chrome = chrome or find_chrome()
    theme_key = spec.get("theme", "recipe")
    t = THEMES[theme_key]
    tpl_dir = os.path.join(HERE, "templates")
    font_dir = os.path.join(HERE, "fonts")

    marlow = os.path.join(HERE, "assets", "marlow-mascot.png")
    if not os.path.exists(marlow):
        marlow = os.path.join(HERE, "..", "..", "..", "marlow", "mascot-1024.png")
    assets = {
        "bg": data_uri(os.path.join(tpl_dir, t["bg"])),
        "pjs": data_uri(os.path.join(font_dir, "PlusJakartaSans-latin.woff2")),
        "inter": data_uri(os.path.join(font_dir, "Inter-latin.woff2")),
        "marlow": data_uri(marlow) if os.path.exists(marlow) else None,
        "logo": (data_uri(os.path.join(HERE, "assets", "logo.png"))
                 if os.path.exists(os.path.join(HERE, "assets", "logo.png")) else None),
    }

    assets["images"] = {}
    for sl in spec["slides"]:
        u = sl.get("image")
        if u and u not in assets["images"]:
            assets["images"][u] = remote_data_uri(u)

    os.makedirs(outdir, exist_ok=True)
    slides = spec["slides"]
    total = len(slides)
    written = []

    with tempfile.TemporaryDirectory() as tmp:
        for i, s in enumerate(slides, 1):
            hp = os.path.join(tmp, f"s{i}.html")
            with open(hp, "w") as f:
                f.write(page_html(s, theme_key, i, total, assets))
            png = os.path.abspath(os.path.join(outdir, f"slide-{i:02d}.png"))
            subprocess.run(
                [chrome, "--headless", "--disable-gpu", "--hide-scrollbars",
                 "--force-device-scale-factor=1",
                 "--default-background-color=00000000",
                 f"--screenshot={png}", f"--window-size={W},{H}",
                 "--virtual-time-budget=4000", f"file://{hp}"],
                check=True, capture_output=True,
            )
            written.append(png)
    return written


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("spec")
    ap.add_argument("--out", default="./out")
    a = ap.parse_args()
    with open(a.spec) as f:
        spec = json.load(f)
    for p in render(spec, a.out):
        print(p)


if __name__ == "__main__":
    main()

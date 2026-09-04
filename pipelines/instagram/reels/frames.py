#!/usr/bin/env python3
"""
Reel frames: one PNG per beat, 1080x1920.

Not a recipe reel. Recipe reels compete with millions of identical ones and we
have no edge there. The edge is the database: a greedy set-cover over all 1,047
recipes says which five bottles unlock the most drinks, and in what order. That
claim is true, checkable, and nobody else can make it.

The running total is the retention device — a viewer stays to see where the
number lands. Everything else serves that climb.

SAFE ZONES. Instagram draws its own chrome over the video and published specs
disagree (top 108-270px, bottom 320-672px, none citing Meta), so this takes the
conservative union: nothing that matters outside x 80-880, y 280-1420. That
clears the username, the right-hand action rail and the caption. `--guides`
draws the box so it can be checked against a real screenshot.
"""

import argparse
import json
import os
import re
import subprocess
import sys
import tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, "..", "render"))
from render import data_uri, find_chrome  # noqa: E402

W, H = 1080, 1920
PAREN = re.compile(r"\s*\(.*?\)")
SAFE = dict(left=80, right=200, top=280, bottom=500)   # right: action rail

BG, BG2, INK, DIM, GOLD = "#06110d", "#0D3929", "#FCFEFD", "rgba(252,254,253,.62)", "#F5C451"

CSS = """
*{{margin:0;padding:0;box-sizing:border-box}}
html,body{{width:{W}px;height:{H}px;overflow:hidden}}
body{{background:
   radial-gradient(120% 55% at 50% 8%,{BG2} 0%,rgba(13,57,41,0) 60%),
   linear-gradient(180deg,{BG} 0%,#08201a 48%,{BG} 100%);
  color:{INK};font-family:'PJS',system-ui,sans-serif;position:relative}}
@font-face{{font-family:'PJS';src:url({pjs}) format('woff2');
  font-weight:100 900;font-display:block}}
/* content sits high: thumbs stop at the top of the frame and the caption
   eats the bottom, so vertical-centre wastes the only real estate we have */
.safe{{position:absolute;left:{L}px;right:{R}px;top:{T}px;bottom:{B}px;
  display:flex;flex-direction:column;justify-content:flex-start;padding-top:60px}}
.safe.mid{{justify-content:center;padding-top:0}}
.eyebrow{{font-size:30px;font-weight:700;letter-spacing:.20em;
  text-transform:uppercase;color:{GOLD};margin-bottom:26px}}
.huge{{font-size:104px;font-weight:800;line-height:1.0;letter-spacing:-.03em}}
.huge.gold{{color:{GOLD}}}
.big{{font-size:86px;font-weight:800;line-height:1.02;letter-spacing:-.02em}}
.sub{{font-size:40px;font-weight:500;color:{DIM};margin-top:28px;line-height:1.3}}
.count{{font-size:290px;font-weight:800;line-height:.88;letter-spacing:-.05em;
  color:{GOLD};font-variant-numeric:tabular-nums}}
.name{{font-size:78px;font-weight:800;letter-spacing:-.01em;text-transform:capitalize}}
/* five segments, filled to the current step — makes the climb visible at a
   glance and stops the frame reading as an empty left column */
.prog{{display:flex;gap:12px;margin-bottom:44px}}
.prog i{{height:10px;flex:1;border-radius:6px;background:rgba(252,254,253,.16)}}
.prog i.on{{background:{GOLD}}}
.delta{{font-size:44px;font-weight:700;color:{INK};opacity:.75;margin-top:6px}}
.step{{font-size:30px;font-weight:700;letter-spacing:.18em;color:{DIM};
  margin-bottom:18px}}
.ex{{margin-top:34px;font-size:36px;font-weight:600;color:{DIM};line-height:1.5}}
.ex b{{color:{INK};font-weight:700}}
.list{{font-size:52px;font-weight:700;line-height:1.55}}
.list span{{color:{GOLD};font-variant-numeric:tabular-nums;
  display:inline-block;min-width:130px}}
.foot{{position:absolute;left:{L}px;bottom:{B}px;font-size:32px;
  font-weight:700;letter-spacing:.16em;color:{DIM};text-transform:uppercase}}
.guides{{position:absolute;inset:0}}
.guides i{{position:absolute;background:rgba(255,0,80,.16)}}
.guides u{{position:absolute;left:{L}px;right:{R}px;top:{T}px;bottom:{B}px;
  border:2px dashed rgba(0,255,160,.55)}}
"""


def page(body, assets, guides=False):
    g = ""
    if guides:
        g = ("<div class=guides>"
             f"<i style='left:0;right:0;top:0;height:{SAFE['top']}px'></i>"
             f"<i style='left:0;right:0;bottom:0;height:{SAFE['bottom']}px'></i>"
             f"<i style='right:0;top:{SAFE['top']}px;bottom:{SAFE['bottom']}px;"
             f"width:{SAFE['right']}px'></i>"
             f"<i style='left:0;top:{SAFE['top']}px;bottom:{SAFE['bottom']}px;"
             f"width:{SAFE['left']}px'></i><u></u></div>")
    css = CSS.format(W=W, H=H, BG=BG, BG2=BG2, INK=INK, DIM=DIM, GOLD=GOLD,
                     L=SAFE["left"], R=SAFE["right"], T=SAFE["top"],
                     B=SAFE["bottom"], pjs=assets["pjs"])
    return (f"<!doctype html><html><head><meta charset=utf-8><style>{css}</style>"
            f"</head><body>{g}{body}</body></html>")


def beats(spec):
    """The story: contrarian claim -> promise -> the climb -> recap -> save."""
    out = [
        # the number first: concrete and parseable inside one second, which is
        # all a scrolling thumb gives you. The contrarian line earns the *next*
        # second, and the promise of a list earns the rest.
        ("hook", 1.4,
         '<div class="safe"><div class="eyebrow">1,047 cocktails, analysed</div>'
         '<div class="huge">5 bottles.</div>'
         '<div class="huge gold">104 cocktails.</div></div>'),
        ("turn", 1.5,
         '<div class="safe"><div class="huge">You don\'t need<br>a 6th.</div>'
         '<div class="sub">Buy them in this order &darr;</div></div>'),
    ]
    for s in spec:
        # the catalogue disambiguates with parentheticals; on screen they
        # just eat the line -- "Bacardi (Bacardi Cocktail)" reads as a stutter
        clean = [PAREN.sub("", e).strip() for e in s["examples"][:2]]
        ex = " &middot; ".join("<b>%s</b>" % c for c in clean)
        bars = "".join(f'<i class="{"on" if k <= s["n"] else ""}"></i>'
                       for k in range(1, 6))
        out.append((f"b{s['n']}", 1.35,
                    f'<div class="safe"><div class="step">{s["n"]} / 5</div>'
                    f'<div class="prog">{bars}</div>'
                    f'<div class="name">{s["item"]}</div>'
                    f'<div class="count">{s["total"]}</div>'
                    f'<div class="delta">+{s["gained"]} new drinks</div>'
                    f'<div class="ex">{ex}</div></div>'))
    rows = "".join(f'<div><span>{s["total"]}</span> {s["item"]}</div>'
                   for s in spec)
    out.append(("recap", 2.1,
                f'<div class="safe"><div class="eyebrow">the whole bar</div>'
                f'<div class="list">{rows}</div></div>'))
    out.append(("cta", 2.3,
                '<div class="safe mid"><div class="huge">Save this<br>before you shop.</div>'
                '<div class="sub">Every count is computed from<br>1,047 real recipes.</div>'
                '</div><div class="foot">@elixiary.ai</div>'))
    return out


def render(spec, outdir, guides=False):
    chrome = find_chrome()
    assets = {"pjs": data_uri(os.path.join(HERE, "..", "render", "fonts",
                                           "PlusJakartaSans-latin.woff2"))}
    os.makedirs(outdir, exist_ok=True)
    plan = []
    with tempfile.TemporaryDirectory() as tmp:
        for i, (name, dur, body) in enumerate(beats(spec), 1):
            hp = os.path.join(tmp, f"{i}.html")
            with open(hp, "w") as f:
                f.write(page(body, assets, guides))
            png = os.path.abspath(os.path.join(outdir, f"{i:02d}-{name}.png"))
            subprocess.run(
                [chrome, "--headless", "--disable-gpu", "--hide-scrollbars",
                 "--force-device-scale-factor=1",
                 f"--screenshot={png}", f"--window-size={W},{H}",
                 "--virtual-time-budget=3000", f"file://{hp}"],
                check=True, capture_output=True)
            plan.append({"png": png, "seconds": dur, "name": name})
    with open(os.path.join(outdir, "plan.json"), "w") as f:
        json.dump(plan, f, indent=1)
    return plan


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("spec")
    ap.add_argument("--out", default="./out")
    ap.add_argument("--guides", action="store_true",
                    help="overlay the Instagram-chrome danger zones")
    a = ap.parse_args()
    with open(a.spec) as f:
        spec = json.load(f)
    for p in render(spec, a.out, a.guides):
        print(f"  {p['seconds']:.2f}s  {p['png']}")


if __name__ == "__main__":
    main()

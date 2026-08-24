#!/usr/bin/env python3
"""
4:5 slide -> 9:16 TikTok frame.

TikTok shows photo posts in a full-screen 9:16 viewport. Handing it our
1080x1350 Instagram slides means TikTok fits them itself, and its own fit is a
blurred copy of the image smeared behind the bars. This puts the slide on a
brand field instead, so the dead space is deliberate.

The slide is placed at 1:1 — no rescaling, so type stays exactly as crisp as
the Instagram version. It sits high in the frame because TikTok's caption,
handle and action buttons overlay the bottom of the screen; a centred slide
would have its last line covered.

This is a second pass over finished PNGs rather than a render mode, so the
Instagram path it mirrors stays byte-for-byte untouched.
"""

import argparse
import os
import subprocess
import tempfile

from render import W, H, data_uri, find_chrome

# 9:16 at the same width, so the slide never scales.
VW, VH = 1080, 1920

# Slide sits 210px down, leaving a 360px foot. TikTok's own UI covers roughly
# the bottom 320px, so the foot absorbs it and the slide stays clear.
TOP = 210
FOOT = VH - TOP - H

FIELD = "#06110d"
FIELD_2 = "#0D3929"

PAGE = """<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{{font-family:'PJS';src:url({pjs}) format('woff2');
  font-weight:100 900;font-display:block}}
*{{margin:0;padding:0;box-sizing:border-box}}
html,body{{width:{VW}px;height:{VH}px;overflow:hidden}}
body{{background:
  radial-gradient(120% 60% at 50% 0%,{field2} 0%,rgba(13,57,41,0) 62%),
  linear-gradient(180deg,{field} 0%,#08201a 46%,{field} 100%);
  font-family:'PJS',system-ui,sans-serif;position:relative}}

/* top band: the handle, so the frame reads as brand rather than padding */
.mark{{position:absolute;top:0;left:0;right:0;height:{top}px;
  display:flex;align-items:center;justify-content:center;gap:20px}}
.mark span{{font-weight:600;font-size:31px;letter-spacing:.20em;
  text-transform:uppercase;color:rgba(252,254,253,.80)}}

.slide{{position:absolute;top:{top}px;left:0;width:{W}px;height:{H}px}}
.slide img{{width:{W}px;height:{H}px;display:block}}

/* hairlines mark the seam so the slide reads as a card, not a crop */
.slide::before,.slide::after{{content:"";position:absolute;left:0;right:0;
  height:1px;background:rgba(245,196,81,.30)}}
.slide::before{{top:0}} .slide::after{{bottom:0}}

/* foot: swipe cue on the first slide only, clear of TikTok's chrome */
.cue{{position:absolute;left:0;right:0;top:{cue_top}px;text-align:center;
  font-weight:600;font-size:29px;letter-spacing:.16em;text-transform:uppercase;
  color:rgba(245,196,81,.82)}}
</style></head><body>
<div class="mark"><span>@elixiary.ai</span></div>
<div class="slide"><img src="{slide}" alt=""></div>
{cue}
</body></html>"""


def page_html(slide_uri, cue_text=""):
    cue = f'<div class="cue">{cue_text}</div>' if cue_text else ""
    return PAGE.format(
        VW=VW, VH=VH, W=W, H=H, top=TOP, cue_top=TOP + H + 92,
        field=FIELD, field2=FIELD_2, pjs=data_uri(
            os.path.join(os.path.dirname(os.path.abspath(__file__)),
                         "fonts", "PlusJakartaSans-latin.woff2")),
        slide=slide_uri, cue=cue)


def wrap(pngs, outdir, chrome=None, cue="Swipe"):
    """Re-frame finished 4:5 slides as 9:16. Returns the new paths."""
    chrome = chrome or find_chrome()
    os.makedirs(outdir, exist_ok=True)
    written = []
    with tempfile.TemporaryDirectory() as tmp:
        for i, src in enumerate(pngs, 1):
            hp = os.path.join(tmp, f"v{i}.html")
            with open(hp, "w") as f:
                # the cue only earns its space on slide 1
                f.write(page_html(data_uri(src),
                                  cue if i == 1 and len(pngs) > 1 else ""))
            png = os.path.abspath(os.path.join(outdir, f"tt-{i:02d}.png"))
            subprocess.run(
                [chrome, "--headless", "--disable-gpu", "--hide-scrollbars",
                 "--force-device-scale-factor=1",
                 "--default-background-color=00000000",
                 f"--screenshot={png}", f"--window-size={VW},{VH}",
                 "--virtual-time-budget=3000", f"file://{hp}"],
                check=True, capture_output=True,
            )
            written.append(png)
    return written


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("pngs", nargs="+")
    ap.add_argument("--out", default="./out-tt")
    a = ap.parse_args()
    for p in wrap(a.pngs, a.out):
        print(p)


if __name__ == "__main__":
    main()

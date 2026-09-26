#!/usr/bin/env python3
"""trim.py name... — assets/src/<name>.png (transparent generation) → assets/cutouts/<name>.webp, cropped to the alpha bbox.
Also writes a magenta contact strip to $STRIP (if set) for checking."""
import os, sys
from PIL import Image
HERE = os.path.dirname(os.path.abspath(__file__)); A = os.path.join(HERE, "assets"); ims = []
for n in sys.argv[1:]:
    im = Image.open(f"{A}/src/{n}.png").convert("RGBA"); im = im.crop(im.getchannel("A").point(lambda v: 255 if v > 8 else 0).getbbox())
    im.save(f"{A}/cutouts/{n}.webp", lossless=True, method=6); print(n, im.size)
    h = 440; t = im.resize((int(im.width * h / im.height), h)); bg = Image.new("RGBA", t.size, (255, 0, 255, 255)); bg.alpha_composite(t); ims.append(bg.convert("RGB"))
if os.environ.get("STRIP"):
    c = Image.new("RGB", (sum(i.width for i in ims), 440)); x = 0
    for i in ims: c.paste(i, (x, 0)); x += i.width
    c.save(os.environ["STRIP"])

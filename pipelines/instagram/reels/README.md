# Reels

A reel is not a carousel with motion, and it is deliberately not a recipe.

Recipe reels compete with millions of identical ones and Elixiary has no edge
there. The edge is the database: a greedy set-cover over all 1,047 curated
recipes says which five bottles unlock the most drinks and in what order to buy
them. That claim is true, checkable, and nobody else can make it.

## Story

| beat | content | job |
|---|---|---|
| hook | `5 bottles. 104 cocktails.` | Concrete and parseable in under a second |
| turn | `You don't need a 6th.` | Contrarian line earns the next second |
| ×5 | gin 20 → vodka 40 → rum 63 → orange liqueur 85 → whiskey 104 | The climbing counter is the retention device |
| recap | the five, listed | Makes the frame worth screenshotting |
| cta | `Save this before you shop.` | Saves are the ranking signal worth chasing |

Every number comes from `bottle_math.build_order`, which counts only recipes
that actually require a bottle you bought. Calling `analyse()` instead does not
apply that filter and reads about 22 high, because pantry-only drinks — latte,
limeade, ayran — get credited to whatever bottle was added last.

## Safe zones

Instagram draws its own chrome over the video. Published specs disagree badly
(top 108–270px, bottom 320–672px) and none cite Meta, so `frames.py` takes the
conservative union: nothing that matters outside **x 80–880, y 280–1420** on a
1080×1920 canvas. That clears the username, the right-hand action rail and the
caption. `--guides` paints the danger zones so a build can be checked against a
real screenshot rather than trusted.

Content is deliberately top-weighted rather than vertically centred: thumbs stop
at the top of the frame and the caption eats the bottom.

## Build

One HTML timeline, captured frame by frame. `timeline.html` positions every
element as a function of time — `window.render(t)` — and `capture.js` drives
headless Chrome through it at 30fps in a single browser session, so a 15s reel
is ~450 screenshots in under two minutes. Slide-and-zoom on still images reads
as a slideshow; this is real motion: the counter ticks, the wall of 104 real
recipe photos blows away at the turn and is rebuilt bottle by bottle, Marlow
reacts on the beats.

```bash
python3 reels/spec.py  --out spec.json                # needs the database
python3 reels/tiles.py spec.json --out tiles          # 104 photos from R2, sips-cut
python3 reels/build.py spec.json --tiles tiles --out reel.mp4 [--preview] [--guides]
```

`--preview` captures at 6fps for a fast look; `--guides` paints Instagram's
chrome zones so placement is checked, not trusted. Needs `puppeteer-core`
(`npm install --prefix .tools puppeteer-core`) and ffmpeg — both on the laptop
and the spare Mac, so either can render.

A silent AAC track is muxed in. Add a trending sound in the Instagram editor
before posting.

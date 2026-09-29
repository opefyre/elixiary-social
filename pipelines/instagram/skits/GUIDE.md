# Elixiary character skits — production guide (current process)

How we make, check and schedule the Elixiary Instagram character skits. This is the process as it stands after skits 45–47
(29 Sep 2026). It covers skits only — the automated pipeline (carousels/reels) is paused and is not part of this.

---

## 1. The rules

| Topic | Rule |
|---|---|
| Length | ~20–24 s. Every event gets a moment to land; no dead holds. |
| Humour | Must be genuinely funny and relatable — the kind of thing people tag a friend in. A clear setup, escalation, and a twist ending. |
| Audience | Universal. No country-specific jokes, no foreign-language dialogue. |
| Detail | Rich, accurate code-drawn sets and props. More images or more code is fine if it buys detail. |
| Sound | Real voices (ElevenLabs) and sound effects when the joke needs them. |
| Higgsfield budget | **Max 5–6 credits per run of 3 skits.** Reuse existing poses first (see §4). |
| Posting | One skit per day, **13:00 Lisbon**, always a Buffer **draft** — the owner approves. Schedule only when the owner says so. |
| Review | Build 3, send the mp4s for review, schedule only after "schedule". |

## 2. Finding ideas (research first)

Don't pitch from memory. Before each round:

1. **Current trend formats** (Instagram/TikTok trend reports, e.g. NewEngen weekly, Later, sfom.ai). Formats that worked:
   - *Absurd service rule* ("Smile more or card declined") → **sk45 Our bar's new pricing**.
   - *"POV: [ordinary thing] in 2026"* → **sk46 Ordering a beer in 2026**.
   - *Calm partner vs chaos partner* ("What did my husband pray for?") → **sk47 wine tasting**.
2. **Real behaviour people recognise** — bartender pet-peeve lists (finger-wave, "surprise me", "make it strong", "I know the owner", ordering one drink at a time), relatable drinking memes.
3. Check it isn't a repeat: every skit's premise is the first comment line of `reels/skNN-*.reel.mjs`.
4. Pitch 3 with: the premise in one line, the beat-by-beat escalation, the twist, why it gets shared, and the estimated credit cost.

## 3. Folder map (`pipelines/instagram/skits/`)

| Path | What |
|---|---|
| `reels/skNN-name.reel.mjs` | One skit = one file (scene code). |
| `captions/skNN-name.txt` | Instagram caption. |
| `assets/cutouts/*.webp` | Transparent character poses (reusable library). |
| `assets/src/*.png` | Raw generations before trimming. |
| `assets/voices/skNN/*.wav` | Voice lines. |
| `assets/sfx/*.wav` | Sound effects library. |
| `assets/SOURCES.md` | Log of job ids and voices per skit — append every round. |
| `engine.js`, `render.mjs`, `audio.py` | The renderer (don't edit per skit). |
| `trim.py` | Crop a transparent PNG to its content → `assets/cutouts/<name>.webp`. |
| `publish_skit.py`, `move_skit.py` | Buffer scheduling (§9). |

## 4. Characters & reusable poses

Always check `assets/cutouts/` first — a new pose costs ~2 credits.

| Character | Voice (ElevenLabs id) | Poses (cutouts) |
|---|---|---|
| **Sal** — bartender, green apron with E+ | Chris `iP95p4xoKVk53GoZ742B` | `salc_wait` (hands on bar), `sal_twitch` (annoyed), `salb_thumb`, `salb_ear`, `salb_negroni`, `sal_apron`, `sal_psychic`, `sal_mop` (singing into a mop — not "handing a mop") |
| **Rico** — tropical-shirt friend | Liam `TX3LPaxmHKxFdv7VOQHJ` | `friend_point`, `friend_present`, `friend_flip`, `friend_lime` (facepalm), `friend_shake`, `rico_*` (bed, swan, cart), `w_spit`, `w_cheese` |
| **Nina** — green sweater, bun | Sarah `EXAVITQu4vr4xnSDxMaL` | `nina_order`, `nina_water`, `nina_sip`, `nina_empties`, `w_nina` (elegant dress) |
| Curly-haired customer | Jessica `r1KmysJdVYZjJCm4mL3b` | `cust_ask`, `cust_sweet`, `cust_shout`, `cust_flat`, `cust_oops`, `em_*` (in bed) |
| Date guy (navy blazer) | Alex `yl2ZDV1MzN4HbQJbMihG` | `guy_smile`, `guy_stare`, `guy_order`, `guy_sip`, `guy_love`, `xm_dad` |
| Sommelier / waiter (tuxedo) | George `JBFqnCBsd6RMkjVDRZzb` | `waiter` |
| Others | — | `crowd_hands` (waving crowd), `pals_*`, `couple_*`, `tourist_*`, `hb_*`, `theo_*`, `mum_*`, `gramps_*` … |

Other ElevenLabs voices used: Laura `FGY2WhTYpPnrIDTdsKH5`, Matilda `XrExE9yKIg1WjnnlVkGX`, Daniel `onwK4e9ZLuTAKqWW03F9`, Bill `pqHfZKP75CvOlQylNhV4`, Callum `N2lVS1w4EtoT3dr4eOWO`, Brian `nPczCjzI2devNBz1zQrb`.

## 5. New images (Higgsfield)

The old 0.5-credit transparent model (`gpt_image_2_5`) is retired. Current recipe:

1. **Generate** with `generate_image_batch`, model `gpt_image_2`, `quality: "medium"` (1 credit), `aspect_ratio: "2:3"`.
   Prompt: describe the character in full (text-only — reference images currently fail with "Something went wrong"),
   say *"Polished Pixar-like 3D cartoon character … Plain flat solid white background, no shadow, nothing else in frame.
   Exactly two arms and two hands. No text."*
2. **Remove the background** with `remove_background` on the finished job id (1 credit). Never use the local
   `cutout.py`/`clean.py` — the owner finds them inaccurate.
3. **Download + trim**: `curl -o assets/src/<name>.png <result_url>` then
   `STRIP=/tmp/strip.png python3 trim.py <name>` (writes `assets/cutouts/<name>.webp` and a magenta contact strip to check).

⚠️ **Timeouts:** Higgsfield sometimes says "server isn't responding" but the job ran and charged. Before retrying, check
`transactions` / `show_generations`. Budget ≈ 2 credits per new pose.

## 6. Voices (ElevenLabs)

Scripts live in `~/Desktop/Personal/Projects/finance/social-posts-workflow/tools/reel/voice/` (key in the finance
project's secrets — never print it).

1. One lines file per voice, e.g. `assets/voices/sk45/sal.txt`:
   ```
   Evening, welcome in, grab a seat anywhere you like, I'll be right with you in just a minute.   ← warm-up line
   [dry, deadpan] New pricing. Drinks are cheap. Behaviour... costs extra.
   [warm, smiling] On the house.
   Right, that is all for this evening, thank you very much.                                        ← filler line
   ```
   (Warm-up first, filler last — v3 clips very short texts and the last line of a take.)
2. `python3 $V/tts.py <voice_id> sk45/sal.txt sk45/sal_take` (max 3 in parallel).
3. Cut: a `cutsNN.txt` with `take|exact phrase|out.wav` lines → `python3 $V/cut.py cutsNN.txt`.
4. **Re-cut every line to true silence** (cut.py clips endings):
   `python3 recut_end.py <take> <out.wav> <start> <aligned_end>` (in `assets/voices/`).
5. **Normalize** each line to about −16.5 dB mean (`ffmpeg volumedetect`, then `volume=…dB,alimiter=limit=0.9`).

Fallback only if `tts.py` says `quota_exceeded`: Higgsfield `generate_audio_batch`, model `text2speech_v2`,
`variant: "elevenlabs"`, a preset voice (0.15 credits/line, batches of ≤3). Presets can't match the character voices.

## 7. Writing the skit (`reels/skNN-name.reel.mjs`)

Copy the closest recent skit (sk45 bar scene, sk46 phone UI, sk47 outdoor + hard-cut montage) and adapt. Structure:

```js
export const meta = { id: "sk45-new-pricing", images: { wait: "cutouts/salc_wait.webp", … } };
export default function (E) {
  E.episode(-16);                                   // sfx loudness
  const S1 = .4, …, STAMP = 21.6, DUR = 24.4;       // the timeline as named constants
  E.music({ bpm, root, seed, prog, until });        // generated music bed
  const S = E.scene("bar", 0, DUR, "dark"); E.cur = S; const R = S.el;
  // set (code-drawn), characters (E.img), bubbles, voices (E.clip), stamp, title
  E.finish(DUR);
}
```

Engine cheat-sheet: `E.el(parent, cls, css, html)` · `E.img(parent, name, css)` · `E.K(el, prop, [[t, v, ease]…])` keyframes
(`x y r s sx o w h draw`) · `E.F(t => …)` per-frame code · `E.S(t, "pop|thud|ding|tick|swish|whoosh|nope|blare|slam|splat|crack|creak|buzz|scratch|sparkle", vol)` synth sfx ·
`E.clip(t, "sfx/x.wav" | "voices/skNN/x.wav", {vol, to, duck})` · `E.pop` · `E.stamp` · `E.shake` · `E.flash` · `E.wipe(t)` (scene change) ·
`E.text(box, "Title *highlight*", {size, instant:true, id:"hook", nowrap:true})` + `E.until(title, t)`.

Every skit has: a hook title at frame 0 (top 252 px, left 100), voice bubbles, an ending **stamp** (the punchline card),
the logo pulse at the end.

**Pitfalls we've hit:**
- `E.K` keys on the same element/prop are **merged**, not replaced — never add a second fade to an element that already has one (sk25's duplicated Nina).
- A per-frame `style.transform` overwrites `E.K` x/y — animate an **inner wrapper** instead.
- SVG `rotate` in a `transform` attribute is broken by the engine's `transform-box: fill-box` — add `style="transform-box:view-box;transform-origin:0 0"`.
- CSS `zoom` also scales `left/top` (divide offsets by the zoom).
- Render checks: **FRAME0** (something must move in the first 0.5 s), **SAFE** (title must fit x 100–886 px → reduce `size`), **READ** (title on screen ≥ words/3 + 0.8 s).
- Keep characters from covering each other's faces, bubbles off faces, props not hidden behind people.

## 8. Render, check, deliver

Spare Mac: `ssh -o BatchMode=yes -i ~/.ssh/finkavo_spare_ed25519 abolfazlshirkavand@100.119.76.96`, deploy dir `~/.local/elixiary-social/`.

1. **Deploy** from the laptop: `bash scripts/deploy.sh` (in `pipelines/instagram`).
2. **Stills** (fast): `cd ~/.local/elixiary-social/skits && export PATH=$HOME/.local/finkavo-node/bin:$PATH && node render.mjs reels/<id>.reel.mjs --stills 0.3,2.5,5,…`
   Pull `out/<id>/stills/*`, make a contact sheet, **look at every beat** — faces covered? text readable at phone size? props visible? Fix, repeat.
3. **Full render**: same command without `--stills`, with `PYTHON=$HOME/social-posts-workflow/tools/reel/.venv/bin/python`.
   Output: `out/<id>/reel.mp4` → copy to `output/skits/<id>.mp4` locally.
4. **Audio check**: `ffmpeg -i x.mp4 -af ebur128 -f null -` → integrated ≈ **−14 LUFS** (−12.5 to −16 is fine);
   `volumedetect` on each voice window — lines should be even.
5. Write `captions/<id>.txt`, append the round to `assets/SOURCES.md`, commit + push, deploy, send the mp4s for review.

## 9. Scheduling (only after the owner says "schedule")

On the spare Mac, from `~/.local/elixiary-social`:

```bash
python3 skits/publish_skit.py <id> "<title>" <cover_ms>              # next 13:00 on a day with no skit (looks 90 days ahead)
python3 skits/publish_skit.py <id> "<title>" <cover_ms> 2026-12-25   # a fixed date (seasonal skits)
python3 skits/move_skit.py <id> <YYYY-MM-DD|next>                    # move one; drafts stay drafts, approved stay approved
```

It uploads the mp4 to R2, creates the Instagram reel **draft** in Buffer (channel `6a855825ccaf649a67d4db86` only — never
the Finkavo channel) and records it in the tracking DB. Captions must be deployed first. `cover_ms` = the frame used as the
reel cover (pick a funny, readable moment).

## 10. The pipeline is paused

Since 29 Sep 2026 `pipelines/instagram/state/PAUSED` exists and the spare Mac's pipeline service + watchdog are disabled,
so only hand-built skits are posted. How to resume is written inside that file.

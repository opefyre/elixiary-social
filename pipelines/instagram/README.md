# Elixiary → Instagram pipeline

Renders carousel posts from Supabase content and queues them to Buffer as
**drafts** for manual approval. Nothing publishes without a human.

## Status

| Stage | State |
|---|---|
| Slide renderer (`render/`) | ✅ 1080×1350 PNGs via headless Chromium |
| Recipe → carousel mapper | ✅ deterministic, DB-sourced |
| Drive → R2 image mirror | ✅ 1047/1047 under `curated-recipes/` |
| Local tracking DB (`state/`) | ✅ SQLite + diversity-aware selection |
| Deployed to spare Mac | ✅ `~/.local/elixiary-social` |
| Article → carousel mapper | ⬜ scaffolded, needs the LLM angle step |
| Caption + hook generation | ⬜ not started |
| Buffer draft submission | ⬜ next — API key in place |
| n8n orchestration | ⬜ not started |

## Layout

```
render/
  render.py            headless-Chromium renderer, stdlib only
  build_spec.py        DB row -> carousel spec (deterministic)
  templates/           backplates normalised to 1080x1350
  fonts/               Plus Jakarta Sans + Inter, embedded as data URIs
  assets/              Marlow mascot
  .chromium/           contained browser (gitignored)
state/
  db.py                SQLite tracking store — the only thing we write to
scripts/
  pick_next.py         choose + claim the next item
  mirror_images.py     Drive -> R2, additive only
  install_chromium.sh  fetch the contained browser
```

## Setup

```bash
npm run setup          # fetch a contained Chromium into render/.chromium
npm run which-chrome   # confirm it is found
```

## Try it

```bash
python3 scripts/pick_next.py --type recipe --dry-run   # choose without claiming
python3 render/build_spec.py fixtures/recipe-sample.json > /tmp/spec.json
python3 render/render.py /tmp/spec.json --out /tmp/slides
```

## Deployment

Lives at `~/.local/elixiary-social` on the spare Mac (`my-server`):

```bash
rsync -az --delete --exclude node_modules/ --exclude '.chromium/' \
  --exclude __pycache__/ --exclude 'state/*.db*' \
  pipelines/instagram/ my-server:.local/elixiary-social/
```

Rendering there is **byte-identical** to local and ~3× faster (7.8s vs 23s for
a 7-slide carousel) because `chrome-headless-shell` starts faster than Chrome.

## Design notes

- **Content is not generated.** Every recipe fact on a slide is read straight
  from `curated_recipes`. The LLM only writes the caption and the hook line, so
  the model can never invent a measurement.
- **Supabase is read-only.** All pipeline state lives in the local SQLite DB,
  keyed off Supabase ids.
- **Selection is not random.** It spaces out categories and base spirits over a
  rolling window and favours seasonally matching recipes.
- **No fake buttons.** Nothing on an Instagram image is tappable, so CTAs ask
  for actions a viewer can actually perform: save, send, follow, link in bio.
- Templates are normalised once. `CurateRecipe` is already 4:5; `Learn` is
  0.7583 and is **extended leftward** into its uniform dark edge, not cropped.
- Chromium is fetched from Chrome-for-Testing directly rather than via
  `puppeteer browsers install`, which silently produces a broken tree on
  macOS 26 (launcher without framework — the binary exists and fails at dlopen).

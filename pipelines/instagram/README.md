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

## Orchestration (n8n)

`n8n/elixiary-daily-drafts.json` — import into n8n on the spare Mac.

```
Every day 09:00 (Europe/Lisbon) ─┐
Run manually ────────────────────┴→ Execute Command
                                      cd $HOME/.local/elixiary-social &&
                                      /usr/bin/python3 scripts/daily_run.py
                                        --recipes 2 --articles 1
                                    → Parse summary (Code)
                                    → Any drafts created? (IF)
                                        ├─ yes → Drafts ready to review
                                        └─ no  → Stop and Error
```

The heavy lifting stays in Python so it is version-controlled and testable;
n8n only schedules, reports and gives you a manual trigger.

`daily_run.py` treats each item independently — one failure does not stop the
rest, and it exits non-zero only if *nothing* succeeded, so a single miss does
not raise an alarm.

Expect ~90s per daily batch (3 carousels).

## Deployment layout on the spare Mac (`my-server`)

```
~/.local/elixiary-social/      the pipeline (rsync target)
  render/.chromium/            contained headless Chromium
  vendor/                      contained psycopg2
  state/elixiary-social.db     authoritative post-tracking DB
~/.config/elixiary/            credentials, chmod 600
```

The spare Mac's SQLite DB is the **authoritative** record of what has been
posted. A development copy on a laptop will drift; do not let both create real
drafts.

### Why HTTP and not Execute Command

n8n on this host does not ship `n8n-nodes-base.executeCommand` (801 node types
are available; that one is excluded, as it commonly is for security). The
pipeline is therefore exposed over loopback HTTP by `scripts/serve.py`, run
under launchd as `com.elixiary.social.service`, and driven by an HTTP Request
node.

The service binds to `127.0.0.1` only — that binding is the security boundary,
and it additionally refuses any non-loopback client. A bearer token is
supported but intentionally unset: n8n runs as the same user on the same box
and could read the token file anyway, so embedding the value in a workflow
would spread a secret for no real gain. Create
`~/.config/elixiary/servicetoken.txt` and it becomes mandatory.

Note n8n 2.x replaced "Activate" with **Publish** (a named version). The
`active` flag cannot be flipped by PATCHing the REST API alone.

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
                                        --recipes 4 --articles 1
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

Expect ~4-8 min per daily batch (5 carousels), against a 1500s service
timeout. The variance is Workers AI queue time on the hook step.

**Cadence: 5 posts a day (4 recipes + 1 article), one per slot.** With angles
on both sides that is ~7,200 recipe-posts (~5 years at 4/day) and ~430
article-posts (~14 months).
Change it in one place — the `jsonBody` of the workflow's HTTP node — and
`daily_run.py` defaults match.

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

## Model selection is per task

Both LLM steps run on Cloudflare Workers AI (free), but not on the same model —
the right choice differs by task, measured rather than assumed:

| Task | Model | Why |
|---|---|---|
| Article angle | `glm-5.2` | The only free model tested that reliably fills the structured schema. `llama-3.3-70b` and `mistral-small` returned empty sections. |
| Recipe hook | `glm-5.2` | `mistral-small` is 10x faster but writes labels ("Spirit-forward Italian classic") rather than hooks ("Mint does the heavy lifting"). The hook is the most visible line, and this runs unattended, so quality wins. |

Hook latency is 9-65s depending on Workers AI queue time. A full daily batch is
typically ~2 min and worst case ~5 min, against a 900s service timeout.

## What is generated vs read

| Post part | Source |
|---|---|
| Recipe ingredients, method, numbers, pairings | database, verbatim |
| Recipe hook line + caption opener | LLM, from the recipe's own fields |
| Article slide content | LLM, restricted to the article text |
| Captions, hashtags, URLs | template + database |

No measurement or factual claim is ever model-invented.

## Posting slots

Five fixed times a day, local to `Europe/Lisbon`:

```
11:00   13:00   15:00   17:00   19:00
```

Buffer stores times in UTC, and Lisbon is UTC+1 in summer, so an 11 AM slot
reads as `10:00Z`. The offset is computed via `zoneinfo`, never hardcoded, so
the October DST change is handled.

A new post takes the earliest slot not already occupied by a scheduled or
draft post on the channel, at least `ELIXIARY_MIN_LEAD_HOURS` (default 4) away
— a draft awaiting review must not be scheduled for ten minutes' time.

A draft can carry a time: `saveToDraft: true` keeps it in review while `dueAt`
reserves the slot, and `customScheduled` pins the exact time instead of letting
Buffer snap it to the next queue opening. Setting `dueAt` *without*
`saveToDraft` promotes the post out of draft state.

**Changing the time on an existing draft takes two calls.** Sending `dueAt`
and `saveToDraft` together silently keeps the old time while still reporting
success — set the time first, then send `saveToDraft: true` to return it to
review. Always read `dueAt` back; the mutation result reports success either
way.

## Status sync

`scripts/sync_status.py` reconciles the local DB with Buffer, and `daily_run`
calls it before picking anything.

| Buffer | local |
|---|---|
| `draft`, `needs_approval` | `drafted` — awaiting review |
| `scheduled`, `sending` | `scheduled` — approved, queued |
| `sent` | `published` |
| `error` | `failed` |
| missing | `rejected` — deleted by a human |

A post deleted in Buffer is recorded as `rejected` rather than removed: a human
declining it is a signal, so the item stays out of the pool.


## Angles

Both content types yield several distinct posts per source item, which is what
turns a finite catalogue into years of runway.

**Articles** — the model composes the slides, restricted to the article text.
Angle types rotate: primer, mistakes, comparison, checklist, myths, kit.

**Recipes** — angles are *not* model-composed. Each selects a different set of
database fields, so the content stays verbatim and no measurement can be
invented. Only the hook is written by the LLM, and it is told which angle it is
writing for so several posts from one recipe never open the same way.

| Angle | Slides from | Recipes |
|---|---|---|
| `classic` | ingredients, method, serving notes, numbers | 1047 |
| `story` | origin story, flavour profile, ingredients | 1047 |
| `swaps` | substitutions, variation tips, glass alternatives | 1017 |
| `faq` | the recipe's own Q&A pairs | 1047 |
| `pairing` | food pairings, flavour notes, occasions, serving | 1047 |
| `numbers` | ABV, calories, sugar, allergens, dietary flags | 975 |
| `kit` | equipment, glass, garnish, serving temp, method | 1047 |

An angle is offered only when it yields at least two content slides, so a
sparse recipe never produces a thin post. Selection spaces out angle types as
well as categories and spirits, and spreads across the catalogue rather than
exhausting one recipe's seven angles first.

Rows created before angles existed carry `angle=''` and are read as `classic`.


## Hook reliability

Measured across nine recipe/angle combinations: **2 fell back (22%)**, both
after ~60s. Re-running those exact two succeeded in 7s and 19s, so the cause
was transient Workers AI latency, not bad output or an over-strict validator.

The response is three attempts inside a 150s per-hook budget, rather than
relaxing the quality bar. A fallback is logged with its reason — silent
fallbacks look like working hooks until every post of one angle opens the
same way.

Hook latency is 7-69s (median ~38s), which is most of a daily batch's 6-9
minutes. `ELIXIARY_HOOK_BUDGET` caps the per-hook spend.

## Home-bar format

A third content type, on the `HomeBar` plate. Unlike recipes and articles it
has no queue of source items — it cycles through **52 variants** of
`(seed bottle, bottle count)`, each producing a different answer:

```
order:cold:10     "10 bottles, 178 cocktails"
order:gin:5       "You already own Gin — 5 more bottles, 122 cocktails"
order:whiskey:8   "You already own Whiskey — 8 more, 160 cocktails"
```

`bottle_math.py` derives the buying order greedily from
`ingredients_resolved`, scoring every gap at `1/n²` so a recipe one ingredient
away counts four times one that is two away.

Two things make the output sane:

- **Only bottles are ranked.** `ingredients_master.category` separates
  spirit/liqueur/wine/beer/bitters from groceries. Cream blocks more recipes
  than any spirit, so an unfiltered ranking opens with "buy cream first".
- **A normal kitchen is assumed** — any grocery appearing in 20+ recipes
  (citrus, sugar, juice, milk, coffee) counts as already owned.

The stats slide reads its claim off the numbers rather than asserting a fixed
one: ordering by value front-loads the gains, so "later bottles are worth
more" would contradict the figures printed beside it.

Marlow is omitted from this theme's CTA — Sal already carries the plate, and
two mascots in one corner read as a collision.

## Weekly mix

Five posts a day, one per slot:

| | Recipes | Article | Marlow | Home bar |
|---|---|---|---|---|
| Tue, Sat | 2 | 1 | 1 | 1 |
| Other days | 3 | 1 | 1 | — |

`homebar: -1` in the workflow body means "decide from the weekday"
(`ELIXIARY_HOMEBAR_DAYS`, default Tue+Sat). Recipes absorb whatever is left,
so a day always fills five slots.

Home bar is twice weekly because it has ~52 variants — daily exhausted it in
seven weeks.

## Ask Marlow

Carousels from `generated_recipes`: the generated image full-bleed, then the
prompt that produced it, then the build. It demonstrates the Pro feature
rather than describing it.

**Privacy.** That table holds 517 generations from 128 different users. The
format reads only `ELIXIARY_MARLOW_USER_ID` and raises if it is unset — it
must never guess an account. The id is set in the launchd plist on the spare
Mac, not in this repo.

Only generations that already have an image qualify (101 of 272 for the
configured account), since the picture is the point.

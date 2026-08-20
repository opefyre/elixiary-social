#!/usr/bin/env python3
"""
"Discover" shortlists — five drinks that share an attribute.

Every other format is a deep dive on one thing and assumes you already know
what you want. This is the browse format: one post surfaces five drinks and
gives someone a reason to open the app without having a drink in mind.

Selection is a plain database filter, so nothing here is generated. Each
series tracks which recipes it has already used, so the same five never
recur inside a series.
"""

import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
sys.path.insert(0, os.path.join(HERE, "render"))

PER_POST = 5

# name       — the series title, shown as the headline
# eyebrow    — the standing series label
# where      — SQL predicate against curated_recipes
# stat       — SQL expression shown beside each drink
# hook       — the standing kicker line
SERIES = [
    {
        "id": "rule-of-three",
        "name": "Rule of Three",
        "eyebrow": "Rule of three",
        "hook": "Three bottles. Nothing else.",
        "where": "jsonb_array_length(ingredients) <= 3",
        "stat": "jsonb_array_length(ingredients)::text || ' parts'",
        "blurb": "Five drinks that need three ingredients or fewer.",
        "note": "Fewer moving parts means less to get wrong.",
    },
    {
        "id": "two-minutes-flat",
        "name": "Two Minutes Flat",
        "eyebrow": "Two minutes flat",
        "hook": "Faster than the kettle.",
        "where": "(prep_time ILIKE '%1 min%' OR prep_time ILIKE '%2 min%')",
        "stat": "prep_time",
        "blurb": "Five drinks you can build before anyone notices you left.",
        "note": "Timings assume everything is already cold.",
    },
    {
        "id": "light-work",
        "name": "Light Work",
        "eyebrow": "Light work",
        "hook": "Under 150 calories, still worth drinking.",
        "where": "calories_kcal IS NOT NULL AND calories_kcal < 150",
        "stat": "calories_kcal::text || ' kcal'",
        "blurb": "Five drinks under 150 calories that don't taste like penance.",
        "note": "Estimates — actual values vary with pour and brand.",
    },
    {
        "id": "no-proof-needed",
        "name": "No Proof Needed",
        "eyebrow": "No proof needed",
        "hook": "Zero proof. Not zero effort.",
        "where": "is_mocktail",
        "allow_no_spirit": True,
        "stat": "COALESCE(difficulty, 'Easy')",
        "blurb": "Five alcohol-free drinks built like the real thing.",
        "note": "Made properly, nobody asks what's missing.",
    },
    {
        "id": "full-proof",
        "name": "Full Proof",
        "eyebrow": "Full proof",
        "hook": "Spirit-forward and unapologetic.",
        "where": "abv_percent IS NOT NULL AND abv_percent > 25",
        "stat": "round(abv_percent)::text || '% ABV'",
        "blurb": "Five drinks for when you want to taste the spirit.",
        "note": "Stir, don't rush. These are for sipping.",
    },
]
BY_ID = {s["id"]: s for s in SERIES}


# Recognisability, not traffic. view_count turned out to track alphabetical
# crawl order — its top entries are "252", "3 Wise Men", "57 Chevy" — so
# ordering by it filled a "best of" list with drinks nobody has heard of.
# The style tags are the real signal: style_classic yields Daiquiri, Dry
# Martini, Hanky Panky.
QUALITY_ORDER = """
  CASE
    WHEN tags ? 'style_classic' THEN 0
    WHEN tags ? 'style_contemporary_classic' THEN 1
    WHEN tags ? 'style_sour_family' OR tags ? 'style_tiki'
      OR tags ? 'style_highball' OR tags ? 'style_spritz' THEN 2
    WHEN tags ? 'style_punch' THEN 3
    ELSE 4
  END"""

# A "cocktail" shortlist full of fruit-nectar mixes is not a cocktail
# shortlist. Zero-proof is the deliberate exception.
HAS_SPIRIT = """EXISTS (
    SELECT 1 FROM jsonb_array_elements(curated_recipes.ingredients_resolved) i
    JOIN ingredients_master m ON m.id = i->>'masterId'
    WHERE m.category IN ('spirit','liqueur'))"""


def candidates(series, exclude_ids=()):
    """Recipes matching the series, most recognisable first, minus used ones."""
    import pg
    excl = ""
    if exclude_ids:
        safe = [i.replace("'", "") for i in exclude_ids]
        excl = " AND id NOT IN (%s)" % ",".join("'%s'" % i for i in safe)
    spirit = "" if series.get("allow_no_spirit") else f" AND {HAS_SPIRIT}"
    sql = (f"SELECT to_jsonb(r) FROM (SELECT id, name, slug, category, "
           f"difficulty, prep_time, glassware, ingredients, view_count, tags, "
           f"({series['stat']}) AS stat "
           f"FROM curated_recipes "
           f"WHERE {series['where']}{excl}{spirit} "
           f"AND name IS NOT NULL AND jsonb_array_length(ingredients) > 0 "
           # seeded per series: an unseeded md5 gives every series the same
           # order within a tier, so Hanky Panky headlined three lists at once
           f"ORDER BY {QUALITY_ORDER}, md5(id || '{series['id']}') LIMIT 60) r;")
    return pg.rows(sql)


def pool_size(series):
    import pg
    spirit = "" if series.get("allow_no_spirit") else f" AND {HAS_SPIRIT}"
    rows = pg.rows("SELECT to_jsonb(x) FROM (SELECT count(*) AS n FROM "
                   f"curated_recipes WHERE {series['where']}{spirit}) x;")
    return rows[0]["n"] if rows else 0


def carousel(series, picks, kicker=None):
    from build_spec import fit, hook_size, humanize, clean_category, MAX_SLIDES
    if len(picks) < PER_POST:
        return None

    slides = [{
        "kind": "hook",
        "eyebrow": series["eyebrow"],
        "kicker": kicker or series["hook"],
        "title": series["name"],
        "title_size": hook_size(series["name"]),
        "subtitle": fit(series["blurb"], 76),
        "meta": [f"{PER_POST} drinks", "Swipe through"],
    }]

    for n, r in enumerate(picks[:PER_POST], 1):
        items = []
        for i in (r.get("ingredients") or [])[:6]:
            label = (i.get("name") or i.get("ingredient") or "").strip()
            if label:
                items.append({"label": fit(label, 46),
                              "value": fit((i.get("measure") or "").strip(), 20)})
        slides.append({
            "kind": "list",
            "eyebrow": f"{n} of {PER_POST}  ·  {fit(str(r.get('stat') or ''), 20)}",
            "title": fit(r["name"], 40),
            "items": items,
            "note": fit(" · ".join(x for x in (r.get("difficulty"),
                                               r.get("prep_time"),
                                               r.get("glassware")) if x), 108),
        })

    slides.append({
        "kind": "cta",
        "eyebrow": "Free to start",
        "title": "Find your next one.",
        "subtitle": f"{series['name']} is one of hundreds of ways to browse.",
        "actions": [
            {"icon": "save", "text": "Save the whole list"},
            {"icon": "send", "text": "Send it to your drinking partner"},
            {"icon": "follow", "text": "Follow @elixiary.ai"},
        ],
        "link": "Browse them all → elixiary.com",
    })
    if len(slides) > 2:
        slides[1]["save_hint"] = "Save this"
        slides[-1]["note"] = series["note"]

    return {"theme": "discover",
            "source": {"type": "shortlist", "series": series["id"],
                       "name": series["name"],
                       "picks": [r["id"] for r in picks[:PER_POST]],
                       "names": [r["name"] for r in picks[:PER_POST]]},
            "slides": slides[:MAX_SLIDES]}


if __name__ == "__main__":
    for s in SERIES:
        n = pool_size(s)
        print(f"  {s['name']:20} {n:>4} recipes  →  ~{n // PER_POST} posts")

#!/usr/bin/env python3
"""
"Ask Marlow" — carousels built from AI-generated recipes.

`generated_recipes` holds what people asked Marlow for and what it made, and
`user_prompt` is the interesting part: the post shows a real request and the
drink that came back. That demonstrates the Pro feature rather than describing
it, which no recipe card can do.

PRIVACY: these rows belong to individual users. Only the account named in
ELIXIARY_MARLOW_USER_ID is ever read, and nothing runs without it set. Other
people's generations are off limits, full stop.
"""

import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

# No default on purpose: an unset value must fail, never fall back to
# "whatever account happens to have the most recipes".
USER_ID = os.environ.get("ELIXIARY_MARLOW_USER_ID", "").strip()

FIELDS = """id,recipe_name,description,ingredients,instructions,garnish,glassware,
equipment,difficulty_level,tips,user_prompt,image_url,tags,abv_percent,
calories_kcal,sugar_g,is_vegan,occasions,pairing_foods,serving_temperature,
created_at"""


def require_user():
    if not USER_ID:
        raise RuntimeError(
            "ELIXIARY_MARLOW_USER_ID is not set. This format reads a specific "
            "user's private generations and must never guess which account.")
    # Validated rather than parameterised because the psql fallback takes no
    # bound parameters. Firebase ids are alphanumeric; anything else is refused.
    if not re.fullmatch(r"[A-Za-z0-9_-]{8,128}", USER_ID):
        raise RuntimeError(f"ELIXIARY_MARLOW_USER_ID is not a valid id")
    return USER_ID


def fetch(limit=None):
    """Generated recipes for the configured account that have an image."""
    import pg
    uid = require_user()
    sql = (f"SELECT to_jsonb(g) FROM (SELECT {FIELDS.replace(chr(10),'')} "
           f"FROM generated_recipes WHERE user_id = '{uid}' "
           f"AND image_url IS NOT NULL AND image_url <> '' "
           f"ORDER BY created_at DESC" + (f" LIMIT {int(limit)}" if limit else "") +
           ") g;")
    return pg.rows(sql)


# ── parsing the free-text fields ───────────────────────────────────────────

def bullets(text, limit=9):
    """`ingredients` is markdown-ish: '- 2 oz Aged Scotch Whisky'."""
    out = []
    for line in (text or "").splitlines():
        line = line.strip().lstrip("-•*").strip()
        if not line:
            continue
        m = re.match(r"^([\d¼½¾/.\s]+(?:oz|ml|cl|dash(?:es)?|tsp|tbsp|cup|part|"
                     r"drop|slice|sprig|leaves|leaf|piece|bar spoon)?s?)\s+(.*)$",
                     line, re.I)
        if m and m.group(2):
            out.append({"amount": m.group(1).strip(), "item": m.group(2).strip()})
        else:
            out.append({"amount": "", "item": line})
        if len(out) >= limit:
            break
    return out


def steps(text, limit=6):
    out = []
    for line in (text or "").splitlines():
        line = re.sub(r"^\s*\d+[.)]\s*", "", line.strip())
        if line:
            out.append(line)
        if len(out) >= limit:
            break
    return out


def sentences(text, limit=2):
    parts = re.split(r"(?<=[.!?])\s+", (text or "").strip())
    return [p.strip() for p in parts[:limit] if p.strip()]


# ── carousel ───────────────────────────────────────────────────────────────

def carousel(g, hook=None):
    """Build the 'Ask Marlow' carousel for one generated recipe.

    Slide 1 is the generated image full-bleed — it is the most persuasive
    thing in the post, and the point is that a machine made this drink.
    Slide 2 shows the request that produced it.
    """
    sys.path.insert(0, os.path.join(HERE, "render"))
    from build_spec import fit, hook_size, MAX_SLIDES

    name = (g.get("recipe_name") or "Untitled").strip()
    prompt = " ".join((g.get("user_prompt") or "").split())
    ing = bullets(g.get("ingredients"))
    method = steps(g.get("instructions"))
    if not ing or not method:
        return None

    meta = [x for x in (g.get("difficulty_level"), g.get("glassware")) if x]

    slides = [{
        "kind": "photo",
        "image": g["image_url"],
        "eyebrow": "Made with Marlow",
        "kicker": hook or "Asked for, not looked up.",
        "title": fit(name, 44),
        "title_size": hook_size(fit(name, 44)),
        # a description cut mid-phrase reads worse than none at all
        "subtitle": (lambda d: d if d and len(d) <= 74 else None)(
            (sentences(g.get("description"), 1) or [""])[0]),
        "meta": meta,
    }, {
        "kind": "prose",
        "eyebrow": "The request",
        "title": "This is what was asked for",
        "paragraphs": [fit(prompt, 250)],
        "note": "Marlow wrote the recipe and generated the picture.",
    }, {
        "kind": "list",
        "eyebrow": "What went in",
        "title": "Ingredients",
        "items": [{"label": fit(i["item"], 46), "value": fit(i["amount"], 20)}
                  for i in ing],
        "note": fit(f"Glass: {g['glassware']}", 108) if g.get("glassware") else None,
    }, {
        "kind": "steps",
        "eyebrow": "Method",
        "title": "How to make it",
        "items": [fit(x, 186) for x in method[:6]],
        "note": fit(" ".join(sentences(g.get("tips"), 1)), 108)
                if g.get("tips") else None,
    }]

    garnish = (g.get("garnish") or "").replace("\n", ", ").strip()
    if garnish:
        slides.append({
            "kind": "list", "eyebrow": "Finish it",
            "title": "Garnish",
            "items": [fit(x.strip(), 46) for x in garnish.split(",") if x.strip()][:4],
            "note": fit(f"Serve {g['serving_temperature']}", 108)
                    if g.get("serving_temperature") else None,
        })

    slides.append({
        "kind": "cta",
        "eyebrow": "Marlow is a Pro feature",
        "title": "Ask for a drink.",
        "subtitle": "Describe what you want. Marlow builds it, picture and all.",
        "actions": [
            {"icon": "save", "text": "Save this one to try"},
            {"icon": "send", "text": "Send it to a fellow tinkerer"},
            {"icon": "follow", "text": "Follow @elixiary.ai"},
        ],
        "link": "Try Marlow → elixiary.com",
    })
    if len(slides) > 2:
        slides[1]["save_hint"] = "Save this"

    return {"theme": "create",
            "source": {"type": "marlow", "id": g.get("id"), "name": name,
                       "image": g.get("image_url")},
            "slides": slides[:MAX_SLIDES]}

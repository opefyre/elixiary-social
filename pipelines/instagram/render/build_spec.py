#!/usr/bin/env python3
"""
Map a curated_recipes / education_articles row into a carousel spec.

Deterministic: every slide's *content* comes straight from the database.
Only the caption and the hook line are left for the LLM, which keeps the
AI spend near zero and stops the model inventing recipe facts.

    python3 build_spec.py recipe.json > spec.json
"""

import json
import re
import sys

MAX_SLIDES = 10

# tag/flag vocabularies use snake_case with a category prefix
PREFIXES = ("flavor_", "style_", "strength_", "season_", "occ_", "base_spirit_",
            "energy_", "temp_", "method_")

FLAG_LABELS = {
    "contains_alcohol": "Contains alcohol",
    "high_sugar": "High sugar",
    "low_sugar": "Low sugar",
    "gluten_free": "Gluten free",
    "dairy_free": "Dairy free",
    "nut_free": "Nut free",
    "vegan": "Vegan",
    "vegetarian": "Vegetarian",
    "low_calorie": "Low calorie",
    "caffeine": "Contains caffeine",
}


def humanize(tag):
    s = str(tag)
    for p in PREFIXES:
        if s.startswith(p):
            s = s[len(p):]
            break
    s = s.replace("_", " ").strip()
    return s[:1].upper() + s[1:] if s else s


def clean_category(c):
    """Recipe categories aren't normalized in the DB — collapse the duplicates."""
    if not c:
        return None
    c = c.strip()
    fixes = {
        "Highball Long": "Highballs & Long Drinks",
        "Coffee Tea": "Coffee & Tea Cocktails",
        "Shot Shooter": "Shots & Shooters",
    }
    return fixes.get(c, c)


def hook_size(title):
    """Step the display type down for longer names so the headline always
    stays inside the backplate's clear zone."""
    n = len(title or "")
    longest = max((len(w) for w in (title or "").split()), default=0)
    if longest >= 13:          # a single very long word sets the ceiling
        return 84
    if n <= 13:
        return 112
    if n <= 17:
        return 104
    if n <= 24:
        return 92
    return 80


def sentences(text, limit):
    """Trim prose to at most `limit` sentences, preserving whole sentences."""
    if not text:
        return []
    parts = re.split(r"(?<=[.!?])\s+", text.strip())
    return [p.strip() for p in parts[:limit] if p.strip()]


def recipe_spec(r):
    slides = []
    name = r.get("name") or "Untitled"
    cat = clean_category(r.get("category"))

    # 1 — hook
    meta = [x for x in (r.get("difficulty"), r.get("prep_time"),
                        r.get("glassware")) if x and x != "Error"]
    # Prefer the opening sentence of the flavour profile, but only when it fits
    # whole — a mid-phrase ellipsis reads worse than no lede at all. Otherwise
    # fall back to a scannable tag line, e.g. "Tequila · Citrus · Winter".
    lede = (sentences(r.get("flavor_profile"), 1) or [None])[0]
    if lede and len(lede) > 116:
        lede = None
    if not lede:
        tags = r.get("tags") or []
        picked = []
        for pref in ("base_spirit_", "flavor_", "season_", "style_"):
            for t in tags:
                if str(t).startswith(pref):
                    picked.append(humanize(t))
                    break
        lede = " · ".join(picked[:3]) or None

    slides.append({
        "kind": "hook",
        "eyebrow": cat or "Cocktail Recipe",
        # `kicker` is the one line the LLM writes on this slide — the hook.
        # Left empty here; the caption step fills it in.
        "kicker": None,
        "title": name,
        "title_size": hook_size(name),
        "subtitle": lede,
        "meta": meta,
    })

    # 2 — ingredients
    ing = r.get("ingredients") or []
    if ing:
        items = []
        for i in ing[:9]:
            label = (i.get("name") or i.get("ingredient") or "").strip()
            if not label:
                continue
            items.append({"label": label, "value": (i.get("measure") or "").strip()})
        if items:
            slides.append({
                "kind": "list",
                "eyebrow": "What you'll need",
                "title": "Ingredients",
                "items": items,
                "note": f"Glass: {r['glassware']}" if r.get("glassware") else None,
            })

    # 3 — method (instructions is an OBJECT {steps[], notes[]}, not an array)
    instr = r.get("instructions")
    steps, notes = [], []
    if isinstance(instr, dict):
        steps = instr.get("steps") or []
        notes = instr.get("notes") or []
    elif isinstance(instr, list):
        steps = instr
    if steps:
        # long methods split across two slides rather than shrinking the type
        chunks = [steps[:5], steps[5:9]] if len(steps) > 6 else [steps[:6]]
        for n, chunk in enumerate([c for c in chunks if c]):
            slides.append({
                "kind": "steps",
                "eyebrow": "Method" if n == 0 else "Method, continued",
                "title": "How to make it" if n == 0 else " ",
                "items": chunk,
                "note": " ".join(notes) if (notes and n == len(chunks) - 1) else None,
            })

    # 4 — serving
    serving = sentences(r.get("serving_notes"), 3)
    if serving:
        slides.append({
            "kind": "prose",
            "eyebrow": "Serve it right",
            "title": "Serving notes",
            "paragraphs": serving,
        })

    # 5 — pairings
    foods = r.get("pairing_foods") or []
    flavs = r.get("pairing_flavors") or []
    if foods or flavs:
        items = [{"label": humanize(f), "value": ""} for f in foods[:5]]
        slides.append({
            "kind": "list",
            "eyebrow": "Pairs with",
            "title": "What to serve alongside",
            "items": items or [humanize(f) for f in flavs[:5]],
            "note": ("Flavour notes: " + ", ".join(humanize(f) for f in flavs[:4]))
                    if flavs and items else None,
        })

    # 6 — the numbers
    stats = []
    if r.get("abv_percent") is not None:
        stats.append({"value": f"{float(r['abv_percent']):g}%", "label": "ABV"})
    if r.get("calories_kcal") is not None:
        stats.append({"value": str(r["calories_kcal"]), "label": "Calories"})
    if r.get("sugar_g") is not None:
        stats.append({"value": f"{float(r['sugar_g']):g}g", "label": "Sugar"})
    if stats:
        flags = [FLAG_LABELS.get(f, humanize(f)) for f in (r.get("health_flags") or [])]
        if r.get("is_vegan"):
            flags.append("Vegan")
        if r.get("is_mocktail"):
            flags.append("Mocktail")
        slides.append({
            "kind": "stats",
            "eyebrow": "Good to know",
            "title": "The numbers",
            "items": stats[:3],
            "flags": sorted(set(flags))[:5],
            "note": "Estimates — actual values vary with pour and brand.",
        })

    # 7 — cta: performable actions only, no fake button
    slides.append({
        "kind": "cta",
        "eyebrow": "Free to start",
        "title": "Mix it tonight.",
        "subtitle": "1,000+ recipes, free in the Elixiary app.",
        "actions": [
            {"icon": "save", "text": "Save it for your next round"},
            {"icon": "send", "text": "Send it to your drinking partner"},
            {"icon": "follow", "text": "Follow @elixiary.ai for a drink a day"},
        ],
        "link": "Full recipe — link in bio",
    })

    # Nudge saves at peak interest rather than only on the final slide, which
    # most viewers never reach. Slide 2 also doubles as an entry point when
    # Instagram re-serves the carousel from a later position.
    if len(slides) > 2:
        slides[1]["save_hint"] = "Save this"

    return {
        "theme": "recipe",
        "source": {"type": "recipe", "id": r.get("id"), "slug": r.get("slug"),
                   "name": name},
        "slides": slides[:MAX_SLIDES],
    }


def article_spec(a, angle=None):
    """`angle` comes from scripts/generate_angle.py. Without one we fall back
    to a plain summary of the article."""
    angle = angle or {}
    title = angle.get("title") or a.get("title") or "Untitled"

    slides = [{
        "kind": "hook",
        "eyebrow": humanize(a.get("category") or "Learn"),
        "kicker": angle.get("kicker"),
        "title": title,
        "title_size": hook_size(title),
        "subtitle": angle.get("subtitle") or (a.get("excerpt") or "")[:120],
        "meta": [x for x in (a.get("difficulty"), a.get("read_time")) if x],
    }]

    for sec in angle.get("sections", []):
        kind = sec.get("kind", "prose")
        s = {"kind": kind, "eyebrow": sec.get("eyebrow"),
             "title": sec.get("title"), "note": sec.get("note")}
        if kind == "prose":
            s["paragraphs"] = sec.get("paragraphs", [])
        else:
            s["items"] = sec.get("items", [])
        slides.append(s)

    slides.append({
        "kind": "cta",
        "eyebrow": "Learn more",
        "title": "Go deeper.",
        "subtitle": "The full guide, and 1,000+ recipes to use it on.",
        "actions": [
            {"icon": "save", "text": "Save this for your next pour"},
            {"icon": "send", "text": "Send it to someone who needs it"},
            {"icon": "follow", "text": "Follow @elixiary.ai for a drink a day"},
        ],
        "link": "Read the full guide — link in bio",
    })

    if len(slides) > 2:
        slides[1]["save_hint"] = "Save this"

    return {
        "theme": "learn",
        "source": {"type": "article", "id": a.get("id"), "slug": a.get("slug"),
                   "name": a.get("title"), "angle": angle.get("angle_id")},
        "slides": slides[:MAX_SLIDES],
    }


if __name__ == "__main__":
    row = json.load(open(sys.argv[1]) if len(sys.argv) > 1 else sys.stdin)
    spec = article_spec(row) if "content" in row else recipe_spec(row)
    json.dump(spec, sys.stdout, indent=2, ensure_ascii=False)

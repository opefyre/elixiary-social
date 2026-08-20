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


# The category column is not normalised: the same bucket appears as a display
# name ("Highball Long"), a tidier variant ("Highballs & Long Drinks") and a
# raw slug ("cat_highball_long"). Collapse all three onto one label.
CATEGORY_CANON = {
    "highball long": "Highballs & Long Drinks",
    "short shaken citrus": "Short & Shaken Citrus",
    "short spirit forward": "Spirit-Forward",
    "soft zero proof": "Zero-Proof",
    "coffee tea": "Coffee & Tea Cocktails",
    "spritz sparkling": "Spritz & Sparkling",
    "punch party": "Punch & Party",
    "milk egg cream": "Milk, Egg & Cream",
    "beer cocktail": "Beer Cocktails",
    "shot shooter": "Shots & Shooters",
    "tiki tropical": "Tiki & Tropical",
    "smash julep swizzle": "Smash, Julep & Swizzle",
    "wine vermouth aperitif": "Wine, Vermouth & Aperitif",
    "frozen blended": "Frozen & Blended",
    "liqueur cordial": "Liqueurs & Cordials",
    "digestif after dinner": "Digestifs",
    "hot": "Hot Drinks",
}
# no useful label — fall back to the generic eyebrow
CATEGORY_EMPTY = {"unknown other", "unknown", "other", ""}


def clean_category(c):
    if not c:
        return None
    key = str(c).strip().lower()
    if key.startswith("cat_"):
        key = key[4:]
    key = key.replace("_", " ").replace("&", " ").replace(",", " ")
    key = " ".join(key.split())
    if key in CATEGORY_EMPTY:
        return None
    if key in CATEGORY_CANON:
        return CATEGORY_CANON[key]
    # already-tidy variants such as "highballs long drinks" land here
    for canon in CATEGORY_CANON.values():
        norm = " ".join(canon.lower().replace("&", " ").replace(",", " ")
                        .replace("-", " ").split())
        if key == norm or key.rstrip("s") == norm.rstrip("s"):
            return canon
    return str(c).strip().title()


def fit(text, limit, ellipsis="…"):
    """Trim to `limit` on a word boundary. Content that doesn't fit is shortened
    here rather than rejected later — the catalogue has plenty of long
    ingredient names and drink titles, and they are all still postable."""
    if not text:
        return text
    t = " ".join(str(text).split())
    if len(t) <= limit:
        return t
    cut = t[:limit - 1].rsplit(" ", 1)[0].rstrip(",;:-(")
    if len(cut) < limit * 0.5:          # one very long word — hard cut
        cut = t[:limit - 1]
    return cut + ellipsis


def hook_size(title):
    """Step the display type down for longer names so the headline always
    stays inside the backplate's clear zone."""
    n = len(title or "")
    longest = max((len(w) for w in (title or "").split()), default=0)
    if n > 34:                 # very long names drop to the smallest step
        return 68
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


# Slides are fixed-size images with no scrolling, so anything past these
# limits silently runs off the artboard. Checked before rendering rather than
# discovered in a published post.
LIMITS = {
    "hook_title": 52, "kicker": 52, "subtitle": 76,
    "section_title": 40, "eyebrow": 30,
    # list labels sit on one line beside a dotted leader; step text is a full
    # sentence in a wrapping block, so they need very different ceilings
    "item_label": 48, "item_value": 20, "step_text": 190,
    "paragraph": 260, "note": 110,
}
MAX_ITEMS = 9
MAX_STEPS = 6
MAX_PARAS = 3


def validate_spec(spec):
    """Length and shape checks against what the renderer can actually fit."""
    p = []
    slides = spec.get("slides") or []
    if not 3 <= len(slides) <= MAX_SLIDES:
        p.append(f"{len(slides)} slides, need 3-{MAX_SLIDES}")

    def too_long(where, text, key):
        if text and len(str(text)) > LIMITS[key]:
            p.append(f"{where}: {key} is {len(str(text))} chars, "
                     f"max {LIMITS[key]}")

    for i, s in enumerate(slides, 1):
        kind = s.get("kind")
        w = f"slide {i} ({kind})"
        too_long(w, s.get("eyebrow"), "eyebrow")
        if kind == "hook":
            too_long(w, s.get("title"), "hook_title")
            too_long(w, s.get("kicker"), "kicker")
            too_long(w, s.get("subtitle"), "subtitle")
        elif kind in ("list", "steps", "stats", "prose"):
            too_long(w, s.get("title"), "section_title")
            too_long(w, s.get("note"), "note")
            items = s.get("items") or []
            if kind in ("list", "stats") and not items:
                p.append(f"{w}: no items")
            cap = MAX_STEPS if kind == "steps" else MAX_ITEMS
            if len(items) > cap:
                p.append(f"{w}: {len(items)} items, max {cap}")
            label_key = "step_text" if kind == "steps" else "item_label"
            for it in items:
                if isinstance(it, dict):
                    too_long(w, it.get("label"), label_key)
                    too_long(w, it.get("value"), "item_value")
                else:
                    too_long(w, it, label_key)
            paras = s.get("paragraphs") or []
            if kind == "prose" and not paras:
                p.append(f"{w}: no paragraphs")
            if len(paras) > MAX_PARAS:
                p.append(f"{w}: {len(paras)} paragraphs, max {MAX_PARAS}")
            for para in paras:
                too_long(w, para, "paragraph")
    if slides and slides[-1].get("kind") != "cta":
        p.append("last slide must be the cta")
    return p


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
    if lede and len(lede) > 76:
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
        "eyebrow": fit(cat or "Cocktail Recipe", 30),
        # `kicker` is the one line the LLM writes on this slide — the hook.
        # Left empty here; the caption step fills it in.
        "kicker": None,
        "title": fit(name, 52),
        "title_size": hook_size(fit(name, 52)),
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
            items.append({"label": fit(label, 46),
                          "value": fit((i.get("measure") or "").strip(), 20)})
        if items:
            slides.append({
                "kind": "list",
                "eyebrow": "What you'll need",
                "title": "Ingredients",
                "items": items,
                "note": fit(f"Glass: {r['glassware']}", 108)
                        if r.get("glassware") else None,
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
                "items": [fit(x, 186) for x in chunk],
                "note": fit(" ".join(notes), 108)
                        if (notes and n == len(chunks) - 1) else None,
            })

    # 4 — serving
    serving = sentences(r.get("serving_notes"), 3)
    if serving:
        slides.append({
            "kind": "prose",
            "eyebrow": "Serve it right",
            "title": "Serving notes",
            "paragraphs": [fit(x, 250) for x in serving],
        })

    # 5 — pairings
    foods = r.get("pairing_foods") or []
    flavs = r.get("pairing_flavors") or []
    if foods or flavs:
        items = [{"label": fit(humanize(f), 46), "value": ""} for f in foods[:5]]
        slides.append({
            "kind": "list",
            "eyebrow": "Pairs with",
            "title": "What to serve alongside",
            "items": items or [humanize(f) for f in flavs[:5]],
            "note": fit("Flavour notes: "
                        + ", ".join(humanize(f) for f in flavs[:4]), 108)
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

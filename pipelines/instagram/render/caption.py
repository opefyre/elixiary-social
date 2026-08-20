#!/usr/bin/env python3
"""
Build the Instagram caption for a carousel.

Template-driven for now, from database fields only. The LLM step will later
replace `hook` and may rewrite `line2`; everything else stays deterministic so
no measurement or claim can be invented.

Instagram weights sends and saves above likes, so the caption asks for those
explicitly and names a person to send to — a concrete prompt converts far
better than "share!".
"""

import re

# Instagram enforced a hard 5-hashtag cap in December 2025 (down from 30).
# Going over doesn't just get trimmed — it suppresses distribution in Explore,
# hashtag browse and recommendations. So we pick 5 deliberately, in the tiers
# Instagram itself recommends: one broad, a few mid-size niche, one specific.
BROAD_TAG = "cocktails"
BRAND_TAG = "elixiary"

SPIRIT_TAGS = {"vodka": "vodka", "rum": "rum", "gin": "gin",
               "whiskey": "whiskey", "brandy": "brandy",
               "tequila": "tequila", "mezcal": "mezcal"}

SITE = "elixiary.com"
MAX_LEN = 2200          # Instagram's hard caption limit
MAX_TAGS = 5            # platform-enforced since Dec 2025 — do not raise


def _tag(row, prefix):
    for t in (row.get("tags") or []):
        if str(t).startswith(prefix):
            return str(t)[len(prefix):]
    return None


def _slug(s):
    return re.sub(r"[^a-z0-9]", "", str(s).lower())


def hashtags(row):
    """At most 5, tiered: 1 broad + up to 3 mid-size niche + 1 specific."""
    mid = []
    sp = _tag(row, "base_spirit_")
    if sp in SPIRIT_TAGS:
        mid.append(SPIRIT_TAGS[sp])
    if row.get("is_mocktail"):
        mid.append("mocktail")
    fl = _tag(row, "flavor_")
    if fl:
        mid.append(f"{_slug(fl)}cocktail")
    se = _tag(row, "season_")
    if se:
        mid.append(f"{_slug(se)}drinks")

    # specific: the drink itself if it makes a usable tag, else the brand
    name = _slug(row.get("name"))
    specific = name if name and 4 < len(name) < 24 else BRAND_TAG

    tags, seen = [], set()
    for t in [BROAD_TAG] + mid[:3] + [specific]:
        if t and t not in seen:
            seen.add(t)
            tags.append("#" + t)
    return tags[:MAX_TAGS]


def recipe_url(row):
    """Canonical public URL, matching sitemap-recipes.xml."""
    slug = (row.get("slug") or "").strip()
    return f"{SITE}/cocktails/{slug}" if slug else None


def article_url(a):
    """Canonical public URL, matching sitemap-education.xml:
    /education/<category>/<slug>."""
    slug = (a.get("slug") or "").strip()
    cat = (a.get("category") or "").strip()
    if not slug:
        return None
    return f"{SITE}/education/{cat}/{slug}" if cat else f"{SITE}/education/{slug}"


def recipe_caption(row, hook=None):
    name = row.get("name") or "This one"
    bits = [x for x in (row.get("difficulty"), row.get("prep_time"),
                        row.get("glassware")) if x and x != "Error"]

    lede = (row.get("flavor_profile") or "").strip()
    lede = re.split(r"(?<=[.!?])\s+", lede)[0] if lede else ""
    if len(lede) > 190:
        lede = lede[:190].rsplit(" ", 1)[0].rstrip(",;:") + "…"

    parts = []
    parts.append(hook or f"{name}, start to finish.")
    parts.append("")
    # The generated hook is written from the flavour profile, so printing the
    # profile underneath just says the same thing twice.
    if lede and not hook:
        parts.append(lede)
        parts.append("")
    if bits:
        parts.append(" · ".join(bits))
        parts.append("")
    parts.append("Swipe for the full build — ingredients, method, "
                 "serving notes and what to pair it with.")
    parts.append("")
    parts.append("Save it for your next round, and send it to whoever "
                 "usually makes the drinks.")
    parts.append("")
    url = recipe_url(row)
    parts.append(f"Full recipe → {url}" if url
                 else "Full recipe → link in bio")

    cap = "\n".join(parts).strip()
    if len(cap) > MAX_LEN:
        cap = cap[:MAX_LEN].rsplit("\n", 1)[0]
    return cap


def first_comment(row):
    """Hashtags go in the first comment, not the caption — it keeps the caption
    readable while the tags still count for discovery. Buffer posts this for us
    via metadata.instagram.firstComment."""
    return " ".join(hashtags(row))


if __name__ == "__main__":
    import json, sys
    row = json.load(open(sys.argv[1]))
    print(recipe_caption(row))
    print("\n--- first comment ---")
    print(first_comment(row))


# ── articles ───────────────────────────────────────────────────────────────

CATEGORY_TAGS = {
    "mixology-techniques": "mixologytips",
    "mixology-fundamentals": "bartending",
    "classic-cocktails": "classiccocktails",
    "comparisons": "cocktailtips",
    "cocktail-pairing": "foodandcocktails",
    "bar-equipment": "barware",
    "cocktail-ingredients": "cocktailingredients",
    "home-bar-setup": "homebar",
    "cocktail-presentation": "cocktailstyling",
    "cocktail-history": "cocktailhistory",
    "seasonal": "seasonalcocktails",
    "pillar-guides": "mixology",
}


def article_hashtags(article, angle=None):
    """Same 5-tag budget as recipes: 1 broad + up to 3 niche + 1 branded."""
    mid = []
    cat = CATEGORY_TAGS.get(article.get("category"))
    if cat:
        mid.append(cat)
    if (article.get("difficulty") or "").lower() == "beginner":
        mid.append("cocktailsforbeginners")
    mid.append("bartender")

    tags, seen = [], set()
    for t in [BROAD_TAG] + mid[:3] + [BRAND_TAG]:
        if t and t not in seen:
            seen.add(t)
            tags.append("#" + t)
    return tags[:MAX_TAGS]


def article_caption(article, angle=None):
    angle = angle or {}
    parts = []
    parts.append(angle.get("caption_hook")
                 or (article.get("excerpt") or article.get("title") or "").strip())
    parts.append("")

    sub = (angle.get("subtitle") or "").strip()
    if sub:
        parts.append(sub)
        parts.append("")

    bits = [x for x in (article.get("difficulty"), article.get("read_time")) if x]
    if bits:
        parts.append(" · ".join(str(b).capitalize() for b in bits))
        parts.append("")

    parts.append("Swipe for the whole thing.")
    parts.append("")
    parts.append("Save it for the next time you are behind the bar, and send it "
                 "to someone still getting this wrong.")
    parts.append("")
    url = article_url(article)
    parts.append(f"Full guide → {url}" if url
                 else "Full guide → link in bio")

    cap = "\n".join(parts).strip()
    if len(cap) > MAX_LEN:
        cap = cap[:MAX_LEN].rsplit("\n", 1)[0]
    return cap


# ── home bar ───────────────────────────────────────────────────────────────

def homebar_hashtags(source):
    mid = ["homebar", "bartending", "cocktailtips"]
    tags, seen = [], set()
    for t in [BROAD_TAG] + mid[:3] + [BRAND_TAG]:
        if t and t not in seen:
            seen.add(t)
            tags.append("#" + t)
    return tags[:MAX_TAGS]


def homebar_caption(source, hook=None):
    order = source.get("order") or []
    seed = source.get("seed")
    total = source.get("total")
    steps = source.get("steps")

    parts = []
    if hook:
        parts.append(hook)
    elif seed:
        parts.append(f"You own {seed}. {steps} more bottles and you can make "
                     f"{total} cocktails.")
    else:
        parts.append(f"{steps} bottles is all it takes to make {total} cocktails "
                     f"— if you buy them in the right order.")
    parts.append("")
    if order:
        parts.append("The order: " + ", ".join(order) + ".")
        parts.append("")
    parts.append("Worked out across every recipe in the app, assuming a normal "
                 "kitchen — citrus, sugar, juice, milk, coffee.")
    parts.append("")
    parts.append("Save it for your next shop, and send it to whoever keeps "
                 "saying they can't make anything.")
    parts.append("")
    parts.append(f"Your own shelf → {SITE}")

    cap = "\n".join(parts).strip()
    return cap[:MAX_LEN]


# ── Marlow-generated ───────────────────────────────────────────────────────

def marlow_hashtags(source):
    mid = ["aicocktails", "mixology", "cocktailrecipe"]
    tags, seen = [], set()
    for t in [BROAD_TAG] + mid[:3] + [BRAND_TAG]:
        if t and t not in seen:
            seen.add(t)
            tags.append("#" + t)
    return tags[:MAX_TAGS]


def marlow_caption(source, hook=None):
    name = source.get("name") or "This one"
    prompt = " ".join((source.get("prompt") or "").split())
    if len(prompt) > 220:
        prompt = prompt[:220].rsplit(" ", 1)[0] + "…"

    parts = [hook or f"Nobody has made a {name} before. Marlow invented it."]
    parts.append("")
    if prompt:
        parts.append(f"The ask: \u201c{prompt}\u201d")
        parts.append("")
    parts.append("Marlow wrote the recipe and generated the photograph. "
                 "Swipe for the full build.")
    parts.append("")
    parts.append("Save it if you want to try it, and send it to whoever thinks "
                 "AI can't make a decent drink.")
    parts.append("")
    parts.append(f"Make your own → {SITE}")
    return "\n".join(parts).strip()[:MAX_LEN]


# ── shortlists ─────────────────────────────────────────────────────────────

SERIES_TAGS = {
    "rule-of-three": "easycocktails",
    "two-minutes-flat": "quickcocktails",
    "light-work": "lowcalcocktails",
    "no-proof-needed": "mocktails",
    "full-proof": "spiritforward",
}


def shortlist_hashtags(source):
    mid = [SERIES_TAGS.get(source.get("series"), "cocktailrecipe"),
           "mixology", "homebar"]
    tags, seen = [], set()
    for t in [BROAD_TAG] + mid[:3] + [BRAND_TAG]:
        if t and t not in seen:
            seen.add(t)
            tags.append("#" + t)
    return tags[:MAX_TAGS]


def shortlist_caption(source, hook=None):
    names = source.get("names") or []
    parts = [hook or f"{source.get('name')}: five worth knowing."]
    parts.append("")
    if names:
        parts.append("\n".join(f"· {n}" for n in names))
        parts.append("")
    parts.append("Swipe for the builds. Every one is in the app with "
                 "measurements, method and what to serve it with.")
    parts.append("")
    parts.append("Save the list, and send it to whoever asks you what to make.")
    parts.append("")
    parts.append(f"Browse them all → {SITE}")
    return "\n".join(parts).strip()[:MAX_LEN]

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

BRAND_TAGS = ["cocktails", "cocktailrecipe", "mixology", "homebar",
              "cocktailsofinstagram", "drinkstagram"]

SPIRIT_TAGS = {"vodka": "vodka", "rum": "rum", "gin": "gin",
               "whiskey": "whiskey", "brandy": "brandy",
               "tequila": "tequila", "mezcal": "mezcal"}

MAX_LEN = 2200          # Instagram's hard caption limit
MAX_TAGS = 12


def _tag(row, prefix):
    for t in (row.get("tags") or []):
        if str(t).startswith(prefix):
            return str(t)[len(prefix):]
    return None


def _slug(s):
    return re.sub(r"[^a-z0-9]", "", str(s).lower())


def hashtags(row):
    tags = list(BRAND_TAGS)
    sp = _tag(row, "base_spirit_")
    if sp in SPIRIT_TAGS:
        tags.append(SPIRIT_TAGS[sp])
    for pref, fmt in (("flavor_", "{}cocktail"), ("season_", "{}drinks")):
        v = _tag(row, pref)
        if v:
            tags.append(fmt.format(_slug(v)))
    name = _slug(row.get("name"))
    if name and len(name) < 24:
        tags.append(name)
    if row.get("is_mocktail"):
        tags += ["mocktail", "zeroproof"]
    seen, out = set(), []
    for t in tags:
        if t and t not in seen:
            seen.add(t)
            out.append("#" + t)
    return out[:MAX_TAGS]


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
    if lede:
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
    parts.append("Full recipe → link in bio")

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

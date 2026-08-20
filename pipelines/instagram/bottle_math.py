#!/usr/bin/env python3
"""
"One bottle away" — what a given bar can make, and what one more bottle adds.

The catalogue resolves ingredients to 2250 canonical names, but those are very
granular: "bourbon whiskey", "rye whiskey" and "blended scotch whisky" are
three separate entries. Matching a home bar against them literally makes
almost nothing look makeable. There is no family column, so families are
derived here.

Staples (ice, water, sugar, salt, common garnishes) are assumed present —
nobody thinks of them as something they need to buy.
"""

import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

# canonical-name pattern -> family. First match wins, so order matters.
FAMILIES = [
    (r"\b(bourbon|rye|scotch|whisk(e)?y)\b", "whiskey"),
    (r"\b(gin)\b", "gin"),
    (r"\b(vodka)\b", "vodka"),
    (r"\b(cacha[çc]a)\b", "cachaca"),
    (r"\b(rum|rhum)\b", "rum"),
    (r"\b(mezcal|mescal)\b", "mezcal"),
    (r"\b(tequila)\b", "tequila"),
    (r"\b(cognac|armagnac|brandy|pisco|calvados)\b", "brandy"),
    (r"\b(dry vermouth|blanc vermouth)\b", "dry vermouth"),
    (r"\b(sweet vermouth|rosso vermouth|red vermouth)\b", "sweet vermouth"),
    (r"\b(vermouth)\b", "sweet vermouth"),
    (r"(triple sec|cointreau|curacao|curaçao|grand marnier|orange liqueur)",
     "orange liqueur"),
    (r"\b(campari|aperol|bitter aperitif)\b", "bitter aperitif"),
    (r"(coffee liqueur|kahl[uú]a|tia maria)", "coffee liqueur"),
    (r"(amaretto)", "amaretto"),
    (r"(cr[eè]me de cassis)", "creme de cassis"),
    (r"(cr[eè]me de menthe)", "creme de menthe"),
    (r"(cr[eè]me de cacao)", "creme de cacao"),
    (r"(bitters)", "bitters"),
    (r"(prosecco|champagne|sparkling wine|cava)", "sparkling wine"),
    (r"\b(lemon juice|lemon)\b", "lemon"),
    (r"\b(lime juice|lime)\b", "lime"),
    (r"\b(orange juice)\b", "orange juice"),
    (r"(pineapple juice)", "pineapple juice"),
    (r"(cranberry juice)", "cranberry juice"),
    (r"(grapefruit juice)", "grapefruit juice"),
    (r"(tomato juice)", "tomato juice"),
    (r"(simple syrup|sugar syrup|gomme)", "simple syrup"),
    (r"(soda water|club soda|sparkling water|seltzer)", "soda water"),
    (r"(tonic water)", "tonic"),
    (r"(ginger beer)", "ginger beer"),
    (r"(ginger ale)", "ginger ale"),
    (r"\b(cola|coke)\b", "cola"),
    (r"(grenadine)", "grenadine"),
    (r"\b(milk|cream|half-and-half|double cream)\b", "milk or cream"),
    (r"\b(egg white|egg)\b", "egg"),
    (r"\b(mint)\b", "mint"),
    (r"\b(honey)\b", "honey"),
    (r"\b(coffee|espresso)\b", "coffee"),
]

# Assumed present in any kitchen — not things anyone "buys for a cocktail".
STAPLES = {
    "ice", "water", "hot water", "boiling water", "sugar", "caster sugar",
    "granulated sugar", "salt", "sea salt", "black pepper", "ground pepper",
    "ice cubes", "crushed ice", "sparkling water",
}
STAPLE_PATTERNS = [
    r"^ice\b", r"\bwater\b", r"^(caster |granulated |white |brown )?sugar$",
    r"\bsalt\b", r"\bpepper\b", r"\bgarnish\b", r"\bpeel\b", r"\bzest\b",
    r"\btwist\b", r"\bwedge\b", r"\bslice\b", r"\bsprig\b", r"\bwheel\b",
]


def family(canonical):
    """Map a canonical ingredient name to a shopping-level family."""
    c = (canonical or "").strip().lower()
    if not c:
        return None
    for pat in STAPLE_PATTERNS:
        if re.search(pat, c):
            return None                       # staple: costs nothing to "have"
    if c in STAPLES:
        return None
    for pat, fam in FAMILIES:
        if re.search(pat, c):
            return fam
    return c                                  # its own family


def recipe_families(rec):
    out = set()
    for i in (rec.get("ingredients_resolved") or []):
        f = family(i.get("canonical"))
        if f:
            out.add(f)
    return out


def analyse(recipes, bar):
    """Given a set of family names the user owns, return what they can make and
    which single addition unlocks the most."""
    bar = {b.lower() for b in bar}
    makeable, one_away = [], {}
    for r in recipes:
        need = recipe_families(r)
        if not need:
            continue
        gaps = need - bar
        if not gaps:
            makeable.append(r)
        elif len(gaps) == 1:
            g = next(iter(gaps))
            one_away.setdefault(g, []).append(r)
    ranked = sorted(one_away.items(), key=lambda kv: (-len(kv[1]), kv[0]))
    return makeable, ranked


if __name__ == "__main__":
    sys.path.insert(0, os.path.join(HERE, "scripts"))
    import pick_next
    rows = pick_next.query(
        "SELECT to_jsonb(r) FROM (SELECT id,name,slug,ingredients_resolved "
        "FROM curated_recipes) r;")
    bar = ["gin", "vodka", "rum", "lemon", "lime", "simple syrup",
           "soda water", "orange juice", "mint"]
    makeable, ranked = analyse(rows, bar)
    print(f"bar: {', '.join(bar)}")
    print(f"makeable now: {len(makeable)} of {len(rows)}")
    print("one bottle away:")
    for fam, rs in ranked[:8]:
        print(f"   + {fam:20} unlocks {len(rs):>3}   e.g. {rs[0]['name'][:34]}")


# ── carousel spec ──────────────────────────────────────────────────────────

def _title(s):
    s = str(s or "").strip()
    return s[:1].upper() + s[1:]


def carousel(recipes, bar, kicker=None):
    """Build a 'one bottle away' carousel spec.

    The hook slide uses the HomeBar plate — Sal with the app open — because
    the whole point is what YOUR shelf makes. Content slides fall back to the
    dark Learn plate, whose clear area is much taller.
    """
    import sys as _s
    _s.path.insert(0, os.path.join(HERE, "render"))
    from build_spec import fit, MAX_SLIDES

    makeable, ranked = analyse(recipes, bar)
    if not makeable or not ranked:
        return None

    top_fam, top_recipes = ranked[0]
    after = len(makeable) + len(top_recipes)

    slides = [{
        "kind": "hook",
        "eyebrow": "Your home bar",
        "kicker": kicker or "Your shelf is doing more than you think.",
        "title": f"{len(bar)} bottles, {len(makeable)} drinks",
        "title_size": 92,
        "subtitle": f"One more bottle makes it {after}.",
        "meta": [f"{len(makeable)} you can make now", f"+{len(top_recipes)} with one buy"],
    }, {
        "kind": "list",
        "eyebrow": "On the shelf",
        "title": "What we're working with",
        "items": [fit(_title(b), 46) for b in bar],
        "note": "Ice, water, sugar and salt assumed — nobody buys those for a drink.",
    }, {
        "kind": "list",
        "eyebrow": f"{len(makeable)} drinks",
        "title": "What that already makes",
        "items": [{"label": fit(r["name"], 46), "value": ""}
                  for r in sorted(makeable, key=lambda x: x["name"])[:6]],
        "note": f"…and {max(0, len(makeable) - 6)} more from the same shelf."
                if len(makeable) > 6 else None,
    }, {
        "kind": "list",
        "eyebrow": "Biggest wins",
        "title": "One bottle away",
        "items": [{"label": fit(_title(fam), 40), "value": f"+{len(rs)}"}
                  for fam, rs in ranked[:5]],
        "note": "Each unlocks this many more drinks on its own.",
    }, {
        "kind": "list",
        "eyebrow": f"Buy {_title(top_fam)}",
        "title": f"What {_title(top_fam)} unlocks",
        "items": [{"label": fit(r["name"], 46), "value": ""}
                  for r in sorted(top_recipes, key=lambda x: x["name"])[:6]],
        "note": f"{len(makeable)} drinks becomes {after}.",
    }, {
        "kind": "cta",
        "eyebrow": "Free to start",
        "title": "What's on your shelf?",
        "subtitle": "Add your bottles once. Elixiary tells you what you can pour.",
        # The HomeBar plate leaves a narrower column than the other themes,
        # so these are written to fit one line each rather than wrap.
        "actions": [
            {"icon": "save", "text": "Save for your next shop"},
            {"icon": "send", "text": "Send to whoever stocks up"},
            {"icon": "follow", "text": "Follow @elixiary.ai"},
        ],
        "link": "Your bar → elixiary.com",
    }]

    if len(slides) > 2:
        slides[1]["save_hint"] = "Save this"

    return {"theme": "homebar",
            "source": {"type": "homebar", "bar": bar, "makeable": len(makeable),
                       "unlock": top_fam, "after": after},
            "slides": slides[:MAX_SLIDES]}

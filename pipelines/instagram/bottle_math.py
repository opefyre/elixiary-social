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


# Categories from ingredients_master that represent something you go out and
# buy for a bar. Everything else — citrus, dairy, syrups, juices — is a
# grocery, and telling someone to "buy cream first" is absurd advice even
# though cream blocks more recipes than any spirit.
BOTTLE_CATEGORIES = {"spirit", "liqueur", "wine", "beer", "bitters"}

# A grocery counts as already owned once it appears in at least this many
# recipes: a normal kitchen has lemons, not passion fruit puree.
COMMON_GROCERY_MIN = 20

_classified = None


def classify(recipes, master):
    """Split ingredient families into bottles-to-buy and assumed groceries."""
    global _classified
    cat_by_id = {m["id"]: (m.get("category") or "") for m in master}
    fam_cat, fam_n = {}, {}
    for r in recipes:
        for i in (r.get("ingredients_resolved") or []):
            f = family(i.get("canonical"))
            if not f:
                continue
            c = cat_by_id.get(i.get("masterId"), "")
            fam_cat.setdefault(f, {})
            fam_cat[f][c] = fam_cat[f].get(c, 0) + 1
            fam_n[f] = fam_n.get(f, 0) + 1
    bottles, pantry = set(), set()
    for f, cats in fam_cat.items():
        top = max(cats.items(), key=lambda kv: kv[1])[0]
        if top in BOTTLE_CATEGORIES:
            bottles.add(f)
        elif fam_n[f] >= COMMON_GROCERY_MIN:
            pantry.add(f)                 # common enough to assume
    _classified = (bottles, pantry)
    return bottles, pantry


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


# ── build order ────────────────────────────────────────────────────────────

def build_order(recipes, steps=10, bottles=None, pantry=None, seed=None):
    """Greedy shopping order: which bottle to buy next to unlock the most.

    Scoring weights every gap by 1/n^2, so a recipe one ingredient away counts
    four times one that is two away. A naive "only count recipes this
    completes" greedy is myopic — nothing completes early, so it opens with
    absurd picks like amaretto third. This orders sensibly (lemon, vodka, gin,
    lime) and lands in the same place.
    """
    bottles = bottles if bottles is not None else set()
    pantry = pantry if pantry is not None else set()

    pairs = [(r, recipe_families(r)) for r in recipes]
    # the kitchen is assumed; only bottles are ranked
    pairs = [(r, f - pantry) for r, f in pairs if f]
    pairs = [(r, f) for r, f in pairs if f and f <= bottles]

    bar, made = set(), set()
    if seed:
        bar.add(seed)
        for i, (r, f) in enumerate(pairs):
            if not (f - bar):
                made.add(i)
    out = []
    for _ in range(steps):
        score = {}
        for i, (r, f) in enumerate(pairs):
            if i in made:
                continue
            gaps = f - bar
            if not gaps:
                continue
            w = 1.0 / (len(gaps) ** 2)
            for g in gaps:
                if bottles and g not in bottles:
                    continue
                score[g] = score.get(g, 0.0) + w
        if not score:
            break
        pick = max(score.items(), key=lambda kv: (kv[1], -len(kv[0])))[0]
        bar.add(pick)
        unlocked = []
        for i, (r, f) in enumerate(pairs):
            if i not in made and not (f - bar):
                made.add(i)
                unlocked.append(r)
        out.append({"n": len(bar), "item": pick, "total": len(made),
                    "gained": len(unlocked), "examples": unlocked})
    return out


def order_carousel(recipes, steps=10, kicker=None, bottles=None, pantry=None,
                   seed=None):
    """'Build your bar in this order' — the strongest version of the format,
    because the numbers compound and the advice is directly actionable."""
    import sys as _s
    _s.path.insert(0, os.path.join(HERE, "render"))
    from build_spec import fit, MAX_SLIDES

    order = build_order(recipes, steps, bottles=bottles, pantry=pantry, seed=seed)
    start = order[0]["total"] - order[0]["gained"] if order else 0
    if len(order) < steps:
        return None
    total = order[-1]["total"]
    half = steps // 2
    first_half, second_half = order[:half], order[half:]
    gain_first = first_half[-1]["total"]
    gain_second = total - gain_first

    made_examples = []
    for st in reversed(order):
        for r in st["examples"]:
            if r["name"] not in made_examples:
                made_examples.append(r["name"])
        if len(made_examples) >= 6:
            break

    def rows(chunk):
        return [{"label": fit(_title(st["item"]), 38),
                 "value": f"{st['total']}"} for st in chunk]

    slides = [{
        "kind": "hook",
        "eyebrow": (f"You already own {_title(seed)}" if seed
                    else "Build your home bar"),
        "kicker": kicker or ("Here's what to buy next." if seed
                             else "Buy them in this order."),
        "title": (f"{steps} more bottles, {total} cocktails" if seed
                  else f"{steps} bottles, {total} cocktails"),
        "title_size": 78 if seed else 84,
        "subtitle": "Worked out across all 1,000+ recipes.",
        "meta": ([f"{start} with just {_title(seed)}", f"{total} after {steps} more"]
                 if seed else
                 [f"{gain_first} by bottle {half}", f"{total} by bottle {steps}"]),
    }, {
        "kind": "list",
        "eyebrow": f"Bottles 1-{half}",
        "title": "Start here",
        "items": rows(first_half),
        "note": "The number is how many cocktails you can make by that point.",
    }, {
        "kind": "list",
        "eyebrow": f"Bottles {half+1}-{steps}",
        "title": "Then these",
        "items": rows(second_half),
        "note": f"Bottle {steps} alone adds {order[-1]['gained']} more drinks.",
    }, {
        # The shape of the curve is whatever the data says. Ordering bottles by
        # value front-loads the gains, so claiming later bottles are worth more
        # would contradict the numbers printed beside it.
        "kind": "stats",
        "eyebrow": "Where the value is",
        "title": ("The first few do the work" if gain_first >= gain_second
                  else "It keeps compounding"),
        "items": [{"value": str(gain_first), "label": f"first {half}"},
                  {"value": f"+{gain_second}", "label": f"next {steps-half}"},
                  {"value": str(total), "label": "all {}".format(steps)}],
        "flags": [],
        "note": (f"Five bottles gets you {gain_first}. The next five add "
                 f"{gain_second} more."),
    }, {
        "kind": "list",
        "eyebrow": f"{total} drinks",
        "title": "A few you'll unlock",
        "items": [{"label": fit(n, 46), "value": ""} for n in made_examples[:6]],
        "note": "Assumes a normal kitchen: citrus, sugar, juice, milk, coffee.",
    }, {
        "kind": "cta",
        "eyebrow": "Free to start",
        "title": "What's on your shelf?",
        "subtitle": "Add your bottles once. Elixiary tells you what you can pour.",
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
            "source": {"type": "homebar", "variant": "build_order",
                       "steps": steps, "total": total,
                       "order": [st["item"] for st in order]},
            "slides": slides[:MAX_SLIDES]}


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


# ── variants ───────────────────────────────────────────────────────────────

# Seeds let the format recur: "you already own gin, here's what's next" is a
# different post and a different answer from the cold-start order.
SEED_BOTTLES = ["gin", "vodka", "rum", "whiskey", "tequila", "brandy",
                "orange liqueur", "sweet vermouth", "coffee liqueur",
                "bitter aperitif", "sparkling wine", "amaretto"]
STEP_CHOICES = [5, 8, 10, 12]


def variants():
    """Every (seed, steps) pair, cold start first."""
    out = [(None, n) for n in STEP_CHOICES]
    for seed in SEED_BOTTLES:
        for n in STEP_CHOICES:
            out.append((seed, n))
    return out


def variants_by_impact(recipes, bottles, pantry):
    """Variants ordered so the biggest headline number goes out first.

    Beyond about a dozen bottles the greedy converges on the same set, so many
    variants share a total. Ties are broken toward the smaller bar, because
    "10 bottles, 178 cocktails" is a better claim than reaching the same number
    with more — and it keeps consecutive posts from repeating a figure.
    """
    scored = []
    for seed, steps in variants():
        order = build_order(recipes, steps, bottles=bottles, pantry=pantry,
                            seed=seed)
        if len(order) < steps:
            continue
        scored.append((order[-1]["total"], steps, seed))
    scored.sort(key=lambda x: (-x[0], x[1], x[2] or ""))
    return [(seed, steps, total) for total, steps, seed in scored]


def variant_id(seed, steps):
    return f"order:{seed or 'cold'}:{steps}"

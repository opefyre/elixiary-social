#!/usr/bin/env python3
"""
Build the reel's spec from the database.

The claim is a greedy set-cover over every curated recipe: which bottle to buy
next to unlock the most drinks. `bottle_math.build_order` already computes the
totals correctly — it counts only recipes that actually require a bottle you
bought, so pantry-only drinks (lemonade, iced coffee, ayran) never inflate it.
Calling `analyse()` directly does NOT apply that filter and reads ~22 high.

Example drinks are the part that has to be earned rather than taken: the
greedy keeps whatever recipes it happened to hit, and sorting those by name
length surfaces "Ace", "Adam", "ACID" — real rows, useless as proof. These are
drawn from the full newly-unlocked set, restricted to recipes actually tagged
classic, and ranked by real popularity.
"""

import argparse
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
PIPE = os.path.abspath(os.path.join(HERE, ".."))
for p in (PIPE, os.path.join(PIPE, "scripts")):
    sys.path.insert(0, p)

import bottle_math as bm   # noqa: E402
import pick_next as pn     # noqa: E402
import shortlist           # noqa: E402

# Short all-caps names and bare initials are catalogue artifacts, not drinks
# anyone recognises. A name has to be long enough or contain a space.
NAME_OK = "(length(name) >= 6 OR name LIKE '% %')"


def load():
    recipes = pn.query("SELECT to_jsonb(x) FROM (SELECT id,name,slug,"
                       "ingredients_resolved FROM curated_recipes) x;")
    master = pn.query("SELECT to_jsonb(m) FROM (SELECT id,category "
                      "FROM ingredients_master) m;")
    return recipes, master


def _key(name):
    """'Bacardi (Bacardi Cocktail)' and 'Bacardi Cocktail' are the same drink
    to a viewer; showing both as proof looks like padding."""
    n = re.sub(r"\(.*?\)", " ", name).lower()
    n = re.sub(r"\b(cocktail|the|a)\b", " ", n)
    return re.sub(r"[^a-z0-9]+", "", n)


def examples(ids, k=2):
    if not ids:
        return []
    q = ",".join("'%s'" % i.replace("'", "") for i in ids)
    rows = pn.query(
        "SELECT to_jsonb(x) FROM (SELECT name FROM curated_recipes "
        "WHERE id IN (%s) AND %s "
        "AND (tags ? 'style_classic' OR tags ? 'style_contemporary_classic') "
        "ORDER BY %s, view_count DESC NULLS LAST LIMIT %d) x;"
        % (q, NAME_OK, shortlist.QUALITY_ORDER, k * 6))
    out, seen = [], set()
    for r in rows:
        kk = _key(r["name"])
        if kk in seen:
            continue
        seen.add(kk)
        out.append(r["name"])
        if len(out) == k:
            break
    return out


def build(steps=5):
    recipes, master = load()
    bottles, pantry = bm.classify(recipes, master)
    order = bm.build_order(recipes, steps=steps, bottles=bottles, pantry=pantry)
    pantryset = {p.lower() for p in pantry}

    def unlocked(bar):
        bar = {b.lower() for b in bar}
        have = bar | pantryset
        out = set()
        for r in recipes:
            need = bm.recipe_families(r)
            if need and not (need - have) and (need & bar):
                out.add(r["id"])
        return out

    names = {r["id"]: r["name"] for r in recipes}
    bar, prev, spec = [], set(), []
    for s in order:
        bar.append(s["item"])
        now = unlocked(bar)
        new = now - prev
        # every newly unlocked recipe, so the reel can show the actual drinks
        # as they stack up -- the mosaic is the proof of the number
        spec.append({"n": s["n"], "item": s["item"], "total": s["total"],
                     "gained": s["gained"], "examples": examples(new),
                     "recipes": sorted(({"id": i, "name": names[i]} for i in new),
                                       key=lambda x: x["name"])})
        prev = now
    return spec


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--steps", type=int, default=5)
    ap.add_argument("--out", default="-")
    a = ap.parse_args()
    spec = build(a.steps)
    text = json.dumps(spec, indent=1)
    if a.out == "-":
        print(text)
    else:
        with open(a.out, "w") as f:
            f.write(text)
        for s in spec:
            print("  %d. %-16s %4d  (+%d)  %s"
                  % (s["n"], s["item"], s["total"], s["gained"],
                     " · ".join(s["examples"])))


if __name__ == "__main__":
    main()

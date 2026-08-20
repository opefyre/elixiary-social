#!/usr/bin/env python3
"""
Choose the next item to post, and claim it.

Supabase supplies the candidates; the local SQLite DB decides what's already
been used. Selection is not random — it spaces out categories and base
spirits so the feed doesn't run three gins in a row, and it favours recipes
that suit the current season.

    python3 pick_next.py --type recipe
    python3 pick_next.py --type recipe --dry-run
    python3 pick_next.py --type article
"""

import argparse
import hashlib
import json
import os
import subprocess
import sys
from datetime import date

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "state"))
import db  # noqa: E402

REPO = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),
                                    "..", "..", ".."))
CONN_FILE = os.path.join(REPO, "supabase.txt")

RECIPE_FIELDS = """id,name,slug,category,difficulty,glassware,garnish,prep_time,
image_url,ingredients,instructions,tags,moods,origin_story,flavor_profile,
serving_notes,variations_tips,abv_percent,calories_kcal,sugar_g,is_vegan,
is_mocktail,health_flags,pairing_foods,pairing_flavors,occasions,equipment,
serving_temperature,view_count"""

# Northern-hemisphere seasons; the tag vocabulary uses 'autumn', not 'fall'.
SEASONS = {12: "winter", 1: "winter", 2: "winter", 3: "spring", 4: "spring",
           5: "spring", 6: "summer", 7: "summer", 8: "summer", 9: "autumn",
           10: "autumn", 11: "autumn"}

# How far back to look when spacing out repeats
CATEGORY_WINDOW = 6
SPIRIT_WINDOW = 4


def query(sql):
    with open(CONN_FILE) as f:
        conn = f.read().strip()
    out = subprocess.run(
        ["psql", conn, "-At", "-c", "SET default_transaction_read_only=on;",
         "-c", sql],
        capture_output=True, text=True, check=True,
    ).stdout
    rows = []
    for line in out.splitlines():
        line = line.strip()
        if line and line != "SET":
            try:
                rows.append(json.loads(line))
            except json.JSONDecodeError:
                pass
    return rows


def tag_of(row, prefix):
    for t in (row.get("tags") or []):
        if str(t).startswith(prefix):
            return str(t)[len(prefix):]
    return None


def jitter(seed_key):
    """Deterministic per-day tie-break: stable within a run, varies day to day
    so the ordering doesn't ossify."""
    h = hashlib.sha256(f"{date.today().isoformat()}::{seed_key}".encode()).digest()
    return int.from_bytes(h[:4], "big") / 0xFFFFFFFF


def pick_recipe(conn, dry):
    rows = query(f"SELECT to_jsonb(r) FROM (SELECT {RECIPE_FIELDS} "
                 f"FROM curated_recipes) r;")
    used = {sid for sid, _ in db.used_keys(conn, "recipe")}
    cands = [r for r in rows if r["id"] not in used]
    if not cands:
        return None, f"no unposted recipes left ({len(rows)} total, all used)"

    recent = db.recent_meta(conn, "recipe", max(CATEGORY_WINDOW, SPIRIT_WINDOW))
    recent_cats = {m.get("category") for m in recent[:CATEGORY_WINDOW]}
    recent_spirits = {m.get("spirit") for m in recent[:SPIRIT_WINDOW]}
    season = SEASONS[date.today().month]

    peak_views = max((r.get("view_count") or 0) for r in cands) or 1
    scored = []
    for r in cands:
        s = 0.0
        if f"season_{season}" in (r.get("tags") or []):
            s += 3.0
        if r.get("category") in recent_cats:
            s -= 4.0
        if tag_of(r, "base_spirit_") in recent_spirits:
            s -= 3.0
        s += 1.5 * ((r.get("view_count") or 0) / peak_views)   # mild popularity pull
        s += 0.9 * jitter(r["id"])                              # break ties
        scored.append((s, r))

    scored.sort(key=lambda x: -x[0])
    score, best = scored[0]
    meta = {"category": best.get("category"),
            "spirit": tag_of(best, "base_spirit_"),
            "season": tag_of(best, "season_"),
            "name": best.get("name"), "slug": best.get("slug")}

    if dry:
        return {"post_id": None, "score": round(score, 3), "meta": meta,
                "row": best, "pool": len(cands)}, None

    pid = db.reserve(conn, "recipe", best["id"], "", meta)
    if pid is None:
        return None, "lost a race for that recipe — re-run to pick another"
    return {"post_id": pid, "score": round(score, 3), "meta": meta,
            "row": best, "pool": len(cands)}, None


def pick_article(conn, dry):
    rows = query("SELECT to_jsonb(a) FROM (SELECT id,slug,title,excerpt,category,"
                 "difficulty,read_time,word_count,featured_image,content "
                 "FROM education_articles WHERE status='published') a;")
    used = db.used_keys(conn, "article")
    used_count = {}
    for sid, _ in used:
        used_count[sid] = used_count.get(sid, 0) + 1

    recent = db.recent_meta(conn, "article", CATEGORY_WINDOW)
    recent_cats = {m.get("category") for m in recent}

    scored = []
    for r in rows:
        s = -2.5 * used_count.get(r["id"], 0)      # spread angles across articles
        if r.get("category") in recent_cats:
            s -= 3.0
        s += 0.9 * jitter(r["id"])
        scored.append((s, r))
    scored.sort(key=lambda x: -x[0])
    score, best = scored[0]

    prior = sorted(a for sid, a in used if sid == best["id"] and a)
    meta = {"category": best.get("category"), "title": best.get("title"),
            "slug": best.get("slug")}
    return {"post_id": None, "score": round(score, 3), "meta": meta,
            "row": best, "used_angles": prior, "pool": len(rows),
            "note": "angle not yet chosen — LLM step picks one, then reserve"}, None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--type", choices=["recipe", "article"], default="recipe")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--quiet", action="store_true",
                    help="print only the chosen row (for piping into build_spec)")
    a = ap.parse_args()

    conn = db.connect()
    pick, err = (pick_recipe if a.type == "recipe" else pick_article)(conn, a.dry_run)
    if err:
        print(json.dumps({"error": err}), file=sys.stderr)
        sys.exit(2)
    print(json.dumps(pick["row"] if a.quiet else pick, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()

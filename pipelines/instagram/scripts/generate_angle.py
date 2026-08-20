#!/usr/bin/env python3
"""
Turn one education article into a distinct carousel "angle".

111 articles at one post a day would repeat inside four months. Each article
averages ~1,600 words and comfortably holds several separate posts — a
technique breakdown, a myth-buster, a comparison, a checklist — so an angle is
how one article yields many without repeating itself.

The model may only reorganise what the article says. It is told not to add
facts, and anything it invents is caught by the verifier before rendering.

    python3 scripts/generate_angle.py --article-id <id>
    python3 scripts/generate_angle.py --slug ice-the-secret-ingredient
"""

import argparse
import json
import os
import re
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
PIPE = os.path.abspath(os.path.join(HERE, ".."))
REPO = os.path.abspath(os.path.join(PIPE, "..", ".."))
sys.path.insert(0, os.path.join(PIPE, "llm"))
sys.path.insert(0, os.path.join(PIPE, "state"))
import client as llm  # noqa: E402
import db  # noqa: E402

ANGLE_KINDS = [
    ("primer", "a practical primer: what it is and why it matters"),
    ("mistakes", "the common mistakes people make, and the fix for each"),
    ("comparison", "a head-to-head comparison of the options covered"),
    ("checklist", "a do-this-not-that checklist someone can act on tonight"),
    ("myths", "myths the article corrects"),
    ("kit", "the equipment or ingredients involved and what each is for"),
]

SCHEMA = {
    "name": "carousel_angle",
    "strict": True,
    "schema": {
        "type": "object",
        "additionalProperties": False,
        "required": ["angle_id", "kicker", "title", "subtitle", "sections",
                     "caption_hook"],
        "properties": {
            "angle_id": {"type": "string"},
            "kicker": {"type": "string"},
            "title": {"type": "string"},
            "subtitle": {"type": "string"},
            "caption_hook": {"type": "string"},
            "sections": {
                "type": "array", "minItems": 3, "maxItems": 4,
                "items": {
                    "type": "object",
                    "additionalProperties": False,
                    "required": ["kind", "eyebrow", "title"],
                    "properties": {
                        "kind": {"type": "string", "enum": ["list", "prose"]},
                        "eyebrow": {"type": "string"},
                        "title": {"type": "string"},
                        "note": {"type": "string"},
                        "paragraphs": {"type": "array",
                                       "items": {"type": "string"}},
                        "items": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "additionalProperties": False,
                                "required": ["label"],
                                "properties": {"label": {"type": "string"},
                                               "value": {"type": "string"}},
                            },
                        },
                    },
                },
            },
        },
    },
}

# Deliberately about citrus, not any of the angle types above, so a model
# cannot pass off the example as its own answer. An earlier version used ice
# as the example and the model reproduced it almost verbatim on the ice
# article.
EXAMPLE = {
    "angle_id": "primer-citrus-goes-flat-fast",
    "kicker": "Bottled juice is costing you drinks.",
    "title": "Citrus dies in an hour",
    "subtitle": "Fresh is not a garnish note. It is the drink.",
    "caption_hook": "The gap between a good sour and a great one is usually about forty minutes.",
    "sections": [
        {"kind": "list", "eyebrow": "The clock",
         "title": "How fast juice fades",
         "items": [{"label": "Just squeezed", "value": "Peak"},
                   {"label": "After 1 hour", "value": "Softening"},
                   {"label": "After 4 hours", "value": "Flat"},
                   {"label": "Bottled", "value": "Cooked"}],
         "note": "Squeeze to order, or squeeze the same evening."},
        {"kind": "list", "eyebrow": "Know your fruit",
         "title": "Lime, lemon, grapefruit",
         "items": [{"label": "Lime", "value": "Sharp"},
                   {"label": "Lemon", "value": "Rounder"},
                   {"label": "Grapefruit", "value": "Bitter edge"}],
         "note": "They are not interchangeable, whatever the recipe says."},
        {"kind": "prose", "eyebrow": "Why it matters",
         "title": "Acid does the balancing",
         "paragraphs": [
             "Sugar and spirit pull a drink in one direction and acid pulls it back. When the citrus is tired that tension collapses and the drink reads as sweet and heavy.",
             "You cannot fix flat juice with more of it. You can only fix it with fresh."]},
    ],
}

SYSTEM = """You write Instagram carousel copy for Elixiary, a cocktail app.

Absolute rule: use ONLY facts stated in the supplied article. Do not add
techniques, numbers, brands or claims of your own. If the article doesn't say
it, it does not go in the post.

House voice: short, declarative, confident. No exclamation marks, no emoji, no
hype words ("game-changer", "unlock", "level up"). Address the reader directly.
British or American spelling as the article uses.

Text is rendered onto fixed-size images, so lengths are ranges, not just
ceilings. Aim for the middle of each range — too short reads as empty:
- title: 12-32 characters, a claim not a label ("Ice is an ingredient", not "Ice")
- kicker: 20-44 characters, the line that stops the scroll
- subtitle: 20-58 characters
- caption_hook: 50-90 characters, one full sentence
- every "list" section: 3-5 items. label 6-32 characters, value 4-18 characters
- every "prose" section: 1-2 paragraphs, each 90-240 characters
- note: 30-88 characters, optional

Every section must carry real content from the article. A list section with no
items, or a title of one word, is a failure.
Return JSON only."""

USER = """ARTICLE
Title: {title}
Category: {category}
Difficulty: {difficulty}

{content}

---
Write ONE carousel angle of this type: {kind} — {kind_desc}

{avoid}

Give 3 or 4 sections. Use "list" sections for anything enumerable (types,
steps, comparisons, kit) and "prose" for explanation. A list section needs
items with a short label and an even shorter value; a prose section needs 1-2
paragraphs. angle_id must be a short kebab-case slug describing this angle.
caption_hook is the opening line of the Instagram caption: one full sentence,
50-90 characters, that makes someone stop scrolling.

Below is a well-formed example built from a DIFFERENT article, about citrus.
It shows the required shape and depth only. Do not reuse its wording, its
section titles, its structure or its subject. Your answer must come entirely
from the article above:
{example}"""


def fetch_article(where):
    conn = open(os.path.join(REPO, "supabase.txt")).read().strip()
    sql = (f"SELECT to_jsonb(a) FROM (SELECT id,slug,title,excerpt,category,"
           f"difficulty,read_time,content FROM education_articles "
           f"WHERE {where} AND status='published' LIMIT 1) a;")
    out = subprocess.run(["psql", conn, "-At",
                          "-c", "SET default_transaction_read_only=on;",
                          "-c", sql],
                         capture_output=True, text=True, check=True).stdout
    for line in out.splitlines():
        if line.startswith("{"):
            return json.loads(line)
    return None


def strip_markdown(md, limit=9000):
    t = re.sub(r"```.*?```", "", md or "", flags=re.S)
    t = re.sub(r"!\[[^\]]*\]\([^)]*\)", "", t)
    t = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", t)
    t = re.sub(r"[*_`>#]", "", t)
    t = re.sub(r"\n{3,}", "\n\n", t)
    return t.strip()[:limit]


def validate_angle(a):
    """The model is capable of returning schema-valid but empty copy — a
    one-word title, or a list section with no items. Catch that here rather
    than rendering it."""
    p = []
    if not isinstance(a, dict):
        return ["not an object"]
    t = (a.get("title") or "").strip()
    if len(t) < 12 or len(t) > 34:
        p.append(f"title must be 12-34 chars, got {len(t)}: {t!r}")
    if len(t.split()) < 2:
        p.append("title must be a phrase, not a single word")
    k = (a.get("kicker") or "").strip()
    if len(k) < 18 or len(k) > 48:
        p.append(f"kicker must be 18-48 chars, got {len(k)}: {k!r}")
    ch = (a.get("caption_hook") or "").strip()
    if len(ch) < 45 or len(ch) > 95:
        p.append(f"caption_hook must be 45-95 chars, got {len(ch)}: {ch!r}")
    secs = a.get("sections") or []
    if not 3 <= len(secs) <= 4:
        p.append(f"need 3-4 sections, got {len(secs)}")
    for i, s in enumerate(secs, 1):
        st = (s.get("title") or "").strip()
        if len(st) < 8:
            p.append(f"section {i} title too short: {st!r}")
        if s.get("kind") == "list":
            items = s.get("items") or []
            if len(items) < 3:
                p.append(f"section {i} is a list with {len(items)} items, need 3-5")
            for it in items:
                if not (it.get("label") or "").strip():
                    p.append(f"section {i} has an item with no label")
        else:
            paras = [x for x in (s.get("paragraphs") or []) if x.strip()]
            if not paras:
                p.append(f"section {i} is prose with no paragraphs")
            for para in paras:
                if len(para) < 80:
                    p.append(f"section {i} paragraph too short ({len(para)} chars)")
    return p


def choose_kind(used_angles):
    """Rotate through angle types so an article's posts stay distinct."""
    used = set(used_angles or [])
    for kid, desc in ANGLE_KINDS:
        if not any(kid in u for u in used):
            return kid, desc
    return ANGLE_KINDS[len(used) % len(ANGLE_KINDS)]


def generate(article, used_angles=None, backend="cf"):
    kind, kind_desc = choose_kind(used_angles)
    avoid = (f"Angles already used for this article, do not repeat them: "
             f"{', '.join(used_angles)}." if used_angles else
             "This is the first post from this article.")
    user = USER.format(title=article["title"], category=article.get("category"),
                       difficulty=article.get("difficulty"),
                       content=strip_markdown(article.get("content")),
                       kind=kind, kind_desc=kind_desc, avoid=avoid,
                       example=json.dumps(EXAMPLE, indent=2, ensure_ascii=False))

    angle, problems = None, []
    for attempt in range(3):
        u = user if not problems else (
            user + "\n\nYour previous attempt was rejected:\n- "
            + "\n- ".join(problems) + "\nFix these and return the whole object again.")
        angle = llm.complete_json(SYSTEM, u, schema=SCHEMA, backend=backend,
                                  temperature=0.7 + 0.1 * attempt)
        problems = validate_angle(angle)
        if not problems:
            break
    if problems:
        raise RuntimeError("angle failed validation after 3 attempts: "
                           + "; ".join(problems))
    angle.setdefault("angle_id", kind)
    if not angle["angle_id"].startswith(kind):
        angle["angle_id"] = f"{kind}-{angle['angle_id']}"[:48]
    angle["_kind"] = kind
    return angle


def main():
    ap = argparse.ArgumentParser()
    g = ap.add_mutually_exclusive_group(required=True)
    g.add_argument("--article-id")
    g.add_argument("--slug")
    ap.add_argument("--backend", default="cf", choices=["cf", "openrouter"])
    a = ap.parse_args()

    where = (f"id = '{a.article_id}'" if a.article_id
             else f"slug = '{a.slug}'")
    art = fetch_article(where)
    if not art:
        sys.exit("article not found")

    conn = db.connect()
    used = sorted(ang for sid, ang in db.used_keys(conn, "article")
                  if sid == art["id"] and ang)
    angle = generate(art, used, backend=a.backend)
    print(json.dumps({"article": {k: art[k] for k in
                                  ("id", "slug", "title", "category",
                                   "difficulty", "read_time")},
                      "used_angles": used, "angle": angle},
                     indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()

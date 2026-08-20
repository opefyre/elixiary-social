#!/usr/bin/env python3
"""
Write the hook line for a recipe post.

Without this every recipe opened "<Name>, start to finish." — fine once,
formulaic across 700+ posts a year. This is the only generated text on a
recipe post; the ingredients, method and numbers all still come straight
from the database, so the model cannot invent a measurement.

Falls back to the deterministic line if the model is unavailable or its
output fails the length checks, so a post is never blocked on the LLM.
"""

import os
import sys
import time

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import client as llm  # noqa: E402

# Model choice here is quality-led, not speed-led. Measured on this prompt:
#   glm-5.2        ~20s   real hooks    ("The after-dinner jolt.")
#   mistral-small  ~2s    labels        ("Spirit-forward Italian classic")
#   llama-3.3-70b  ~2.5s  usable 1 in 3
# The hook is the most visible line of the post and this runs unattended, so
# the slower model is worth it. Two recipes a day costs about 40s.
HOOK_MODEL = os.environ.get("ELIXIARY_HOOK_MODEL", "@cf/zai-org/glm-5.2")

# Total wall-clock allowed per hook across retries. Three attempts at the
# observed median comfortably fit; a pathological tail gets cut off instead of
# stretching the daily batch.
HOOK_BUDGET_SECONDS = float(os.environ.get("ELIXIARY_HOOK_BUDGET", "150"))

SCHEMA = {
    "name": "recipe_hook",
    "strict": True,
    "schema": {
        "type": "object",
        "additionalProperties": False,
        "required": ["kicker", "caption_hook"],
        "properties": {
            "kicker": {"type": "string"},
            "caption_hook": {"type": "string"},
        },
    },
}

SYSTEM = """You write Instagram hooks for Elixiary, a cocktail app.

Use ONLY what the recipe brief states. Never invent an ingredient, a measure,
an origin or a claim. If the brief doesn't say it, don't write it.

Voice: short, declarative, confident, a little dry. No exclamation marks, no
emoji, no hype words ("game-changer", "unlock", "level up", "elevate"), no
questions, no second-person commands like "try this".

Two fields:
- kicker: 20-46 characters. Goes above the drink name on the first slide.
  A claim or an angle, never the drink's name and never a label.
- caption_hook: 50-92 characters, one full sentence. The first line of the
  caption, written to stop a scroll.

They must not repeat each other. Return JSON only."""

ANGLE_FOCUS = {
    "classic": "the drink itself — how it tastes and why it is worth making",
    "story":   "where the drink came from and what it tastes like",
    "swaps":   "swapping ingredients and making the drink your own",
    "faq":     "the questions people actually ask about this drink",
    "pairing": "what to eat with it and when to serve it",
    "numbers": "the alcohol, calories and dietary facts",
    "kit":     "the equipment, glass and garnish it needs",
}

USER = """RECIPE BRIEF
Name: {name}
Category: {category}
Flavour: {flavour}
Base spirit: {spirit}
Season: {season}
Occasions: {occasions}
Difficulty: {difficulty} · {prep} · served in a {glass}
Alcohol-free: {mocktail}

THIS POST IS ABOUT: {focus}
The hook must point at that, not at the drink in general — several posts are
made from this same recipe and they must not open the same way.

Write the kicker and caption_hook.

Good kickers, for other drinks, to show register — do not reuse them:
  "Bitter, then bright."
  "The one people ask for twice."
  "Built in the glass, no shaker."
  "Autumn, without the pumpkin."
"""

# The fallback has to suit the angle too — a pairing post opening
# "start to finish" describes the wrong thing entirely.
FALLBACKS = {
    "classic": ("{name}, start to finish.",
                "{name}, start to finish — ingredients, method and how to serve it."),
    "story":   ("Where the {name} comes from.",
                "The {name} has a history worth knowing before you pour one."),
    "swaps":   ("Make the {name} your own.",
                "Swaps, substitutions and variations for the {name}, all tested."),
    "faq":     ("The {name}, answered.",
                "The questions people actually ask about making a {name}."),
    "pairing": ("What to serve with a {name}.",
                "What to eat alongside a {name}, and when to pour one."),
    "numbers": ("The {name}, by the numbers.",
                "Alcohol, calories and dietary detail for the {name}, in one place."),
    "kit":     ("What the {name} needs.",
                "The kit, the glass and the garnish a {name} actually calls for."),
}


def _tag(row, prefix):
    for t in (row.get("tags") or []):
        if str(t).startswith(prefix):
            return str(t)[len(prefix):].replace("_", " ")
    return None


def _valid(h):
    k = (h.get("kicker") or "").strip()
    c = (h.get("caption_hook") or "").strip()
    if not (18 <= len(k) <= 50):
        return False
    if not (45 <= len(c) <= 100):
        return False
    if k.lower() == c.lower():
        return False
    if any(ch in k + c for ch in "!"):
        return False
    # "Classic, bubbly, and citrusy." is a label, not a hook
    if k.count(",") >= 2 and len(k.split()) <= 5:
        return False
    return True


def recipe_hook(row, angle="classic", backend="cf"):
    """Returns (kicker, caption_hook). Never raises — falls back instead."""
    name = row.get("name") or "This drink"
    k_tpl, c_tpl = FALLBACKS.get(angle, FALLBACKS["classic"])
    fallback = (k_tpl.format(name=name), c_tpl.format(name=name))

    flavour = (row.get("flavor_profile") or "").strip()
    if len(flavour) > 320:
        flavour = flavour[:320].rsplit(" ", 1)[0] + "…"

    user = USER.format(
        name=name,
        category=row.get("category") or "cocktail",
        flavour=flavour or "not stated",
        spirit=_tag(row, "base_spirit_") or "not stated",
        season=_tag(row, "season_") or "any",
        occasions=", ".join(row.get("occasions") or []) or "any",
        difficulty=row.get("difficulty") or "n/a",
        prep=row.get("prep_time") or "n/a",
        glass=row.get("glassware") or "glass",
        mocktail="yes" if row.get("is_mocktail") else "no",
        focus=ANGLE_FOCUS.get(angle, ANGLE_FOCUS["classic"]),
    )

    # Observed failures were transient Workers AI latency, not bad output:
    # both combinations that fell back re-ran clean in 7s and 19s. So retry
    # rather than relaxing the quality bar — but bound the total, because a
    # slow tail on four recipes would otherwise dominate the daily run.
    why = "no attempt made"
    deadline = time.time() + HOOK_BUDGET_SECONDS
    for attempt in range(3):
        if attempt and time.time() > deadline:
            why = f"budget of {HOOK_BUDGET_SECONDS}s exhausted after {attempt} attempts"
            break
        try:
            h = llm.complete_json(SYSTEM, user, schema=SCHEMA, backend=backend,
                                  max_tokens=700, temperature=0.85 + 0.1 * attempt,
                                  model=HOOK_MODEL)
            if _valid(h):
                return h["kicker"].strip(), h["caption_hook"].strip()
            why = f"rejected: kicker={h.get('kicker')!r}"
        except Exception as ex:
            why = f"{type(ex).__name__}: {str(ex)[:100]}"
    # Say so — a silent fallback looks like a working hook until you notice
    # every post of this angle opens the same way.
    print(f"hook fell back for {name} [{angle}] — {why}", file=sys.stderr)
    return fallback


if __name__ == "__main__":
    import json
    row = json.load(open(sys.argv[1]))
    k, c = recipe_hook(row)
    print(f"kicker       ({len(k):>3}): {k}")
    print(f"caption_hook ({len(c):>3}): {c}")

---
name: pr-learn
description: Extract durable, reusable lessons from merged PRs (and their reviews) — recurring bug patterns, missed test cases, review blind spots, conventions — and record them in shared memory so future reviews and changes improve.
argument-hint: "[PR number | since <date> | last N]"
---

# PR Learn

## Role

You are the learning loop. You mine merged PRs and their reviews for durable lessons and write them
to shared memory so the plugin gets better over time.

## Context to load

Load and honor these before acting:
- The target merged PR(s) via `gh` (diff, review comments, linked issues, follow-up fixes).
- Existing `memory.md` (avoid duplicates) and the traceability subgraph.

## Workflow

### Step 0: TodoWrite Checklist

```
TodoWrite([
  { content: "Select merged PR(s) to learn from", status: "in_progress" },
  { content: "Extract recurring patterns, misses, and conventions", status: "pending" },
  { content: "De-duplicate against existing memory", status: "pending" },
  { content: "Write concise, durable lessons to memory.md", status: "pending" }
])
```

### Steps

1. **Select.** Resolve `$ARGUMENTS` to the PR(s): a number, `since <date>`, or `last N` merged.
2. **Extract.** Look for: bug patterns that recurred, test cases that were missing then added,
   review comments that repeat across PRs, hotfixes that followed a merge (review misses), and
   emergent conventions.
3. **Generalize.** Turn specifics into a durable rule ("prefer X over Y because Z"), not a one-off.
4. **De-duplicate.** Skip anything already in `memory.md`; merge/refine related entries.
5. **Record.** Append concise, dated lessons via
   `python .developer/scripts/memory.py remember "..."` (or edit `memory.md`), tagged by area
   (security/testing/a11y/…). Keep entries short.

## Output

A short list of the lessons captured (area → lesson), and confirmation of what was written to memory.

## Rules

- Durable and general, not PR-specific trivia. Never invent a lesson that the PRs don't support.
- Keep memory concise; refine rather than pile up near-duplicates.

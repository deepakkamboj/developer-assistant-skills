---
mode: agent
description: Run a roster-driven, multi-specialist review of a code change (diff/PR). Selects the relevant critic agents by what the change touches, collects severity-tagged findings, de-duplicates, then hands them to `deliberate` for a verdict. Read-only — posts a review, never merges.
---

Read and execute the skill at [`.developer/skills/review/code-review/SKILL.md`](../../.developer/skills/review/code-review/SKILL.md). Follow its Role, load the listed context,
and complete its TodoWrite workflow in order. Use the user's request as the skill arguments.

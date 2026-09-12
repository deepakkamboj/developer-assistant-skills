---
mode: agent
description: Given a structured bug, produce ranked root-cause hypotheses (at least k competing causes) each with cited evidence and a confidence score, and flag ambiguity when the top hypothesis isn't clearly ahead. Read-only diagnosis that feeds fix-bug. Realizes EASE-MAS A19 (Algorithm 5).
---

Read and execute the skill at [`.developer/skills/debugging/root-cause/SKILL.md`](../../.developer/skills/debugging/root-cause/SKILL.md). Follow its Role, load the listed context,
and complete its TodoWrite workflow in order. Use the user's request as the skill arguments.

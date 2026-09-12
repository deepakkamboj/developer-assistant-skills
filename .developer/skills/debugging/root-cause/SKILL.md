---
name: root-cause
description: Given a structured bug, produce ranked root-cause hypotheses (at least k competing causes) each with cited evidence and a confidence score, and flag ambiguity when the top hypothesis isn't clearly ahead. Read-only diagnosis that feeds fix-bug. Realizes EASE-MAS A19 (Algorithm 5).
argument-hint: "[bug id or analyze-bug output] [-k 3]"
---

# Root Cause

## Role

You are a root-cause analyst. You reason from evidence to **multiple competing hypotheses**, rank
them, and hand the best candidates to repair — you never jump to a single guess.

## Context to load

Load and honor these before acting:
- The structured bug from `analyze-bug` (error, stack, artifacts, suspected files, repro).
- `diff since last green`, commit/run history, and `graph-repo` impact for the suspected area.

## Workflow

### Step 0: TodoWrite Checklist

```
TodoWrite([
  { content: "Gather evidence (trace, diff, logs, history, impact)", status: "in_progress" },
  { content: "Propose >= k competing hypotheses", status: "pending" },
  { content: "Score each against the evidence; rank", status: "pending" },
  { content: "Flag ambiguity if top-1 margin is small; hand top-k to fix-bug", status: "pending" }
])
```

### Steps

1. **Gather evidence.** Assemble the trace/artifacts, the diff since last green, related history, and
   the dependency/call context from `graph-repo`.
2. **Hypothesize (≥k, default 3).** Enumerate distinct plausible causes (logic error, bad input
   handling, race, dependency change, environment/config, test bug). Avoid anchoring on the first idea.
3. **Score.** For each hypothesis, cite the specific evidence for and against and assign a confidence.
   A hypothesis with no supporting evidence is dropped.
4. **Rank & judge ambiguity.** Rank by confidence. If the top-1 margin over top-2 is small, **flag as
   ambiguous** and keep the top-k for repair to try in order.
5. **Hand off.** Provide the ranked hypotheses (with localized `file:line` and evidence) to `fix-bug`.

## Output

Ranked hypotheses: `rank · hypothesis · localized location · evidence for/against · confidence`, plus
an ambiguity flag.

## Rules

- Read-only diagnosis; propose ≥k competing causes, never a single unsupported guess.
- Cite real evidence for every hypothesis; never fabricate. Symptom ≠ cause.

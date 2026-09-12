---
name: grade-spec
description: Grade a PRD/spec for quality before build starts — completeness, testability, clarity, scope discipline, and NFR coverage — with a scored rubric and specific fixes. Blocks weak specs from entering the build loop. Realizes EASE-MAS A5.
argument-hint: "[path to PRD/spec]"
---

# Grade Spec

## Role

You are a spec critic. You decide whether a PRD is ready to build against, scoring it on an objective
rubric and returning concrete gaps — not vibes.

## Context to load

Load and honor these before acting:
- The PRD/spec under review; `config.quality_gates` (required NFRs).
- The traceability graph (to check every requirement is testable/linked).

## Workflow

### Step 0: TodoWrite Checklist

```
TodoWrite([
  { content: "Load the spec and required NFR gates", status: "in_progress" },
  { content: "Score each rubric dimension with evidence", status: "pending" },
  { content: "List concrete gaps and required fixes", status: "pending" },
  { content: "Give a ready/not-ready verdict", status: "pending" }
])
```

### Steps

1. **Rubric.** Score each dimension 1–5 with a one-line justification:
   - **Completeness** — goals, stories, scope, constraints all present.
   - **Testability** — every acceptance criterion is verifiable (Given/When/Then).
   - **Clarity** — unambiguous, no contradictions, defined terms.
   - **Scope discipline** — explicit non-goals; no gold-plating.
   - **NFR coverage** — perf/security/a11y/reliability targets are measurable.
   - **Traceability** — each requirement maps to a PRD item and can anchor tests.
2. **Gaps.** For any dimension < 4, give the specific defect and the fix needed.
3. **Verdict.** **Ready** (enter build) or **Not ready** (return with the blocking fixes). Weak or
   untestable requirements block the loop.

## Output

A scored rubric table, a prioritized gap list with fixes, and a ready/not-ready verdict.

## Rules

- Objective and specific — cite the offending text; no hand-waving.
- Untestable acceptance criteria or missing NFRs are automatic blockers.

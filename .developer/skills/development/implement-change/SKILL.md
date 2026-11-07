---
name: implement-change
description: Implement an authorized, bounded change with observed test-first RED, GREEN and refactor stages, fresh exact-candidate verification and a review handoff. No automatic delegation or publication; human merges.
argument-hint: "[issue/task or description of the change]"
---

# Implement Change

## Role

You are an implementation engineer. You make the smallest correct change that satisfies the task,
prove it with tests, and leave the code reviewable — you do not merge.

## Context to load

First apply the [shared execution boundary](../../_shared/execution-boundary.md); it limits every step below.

Load and honor these before acting:
- The task/issue and its requirement/PRD node; repo conventions/instructions; `graph-repo` impact.
- `config.repo` (test/build/lint commands); `config.autonomy` (bounds); `memory.md` lessons.

## Workflow

### Step 0: TodoWrite Checklist

```
TodoWrite([
  { content: "Understand the task; reproduce current behavior", status: "in_progress" },
  { content: "Ask if the intended behavior is unclear (never assume)", status: "pending" },
  { content: "Plan the minimal change + its tests", status: "pending" },
  { content: "Observe RED; implement GREEN; refactor with tests", status: "pending" },
  { content: "Verify exact candidate; prepare review handoff (no merge)", status: "pending" }
])
```

### Steps

1. **Understand & reproduce.** Confirm what "done" means. For a bug, reproduce it first (or invoke
   `debugger`); for a feature step, restate the acceptance criterion.
2. **Plan minimally.** Decide the smallest change and which tests will prove it. If behavior is
   ambiguous, ask.
3. **Observe RED before production edits.** Add the smallest test for the acceptance criterion
   or defect. Run it against the current candidate and capture its actual failing assertion.
   Missing dependencies, compilation errors and broken fixtures are not a behavioral RED.
   Fix test setup first. If the test already passes, investigate the scenario rather than
   manufacture a failure. Record any approved testability exception and its alternative evidence.
4. **Reach GREEN.** Within the authorized workspace, make the smallest complete change that
   satisfies that test. Run the same command and record the passing result. Respect file,
   diff and attempt limits; do not broaden scope or add dependencies without approval.
5. **Refactor under coverage.** Improve names or duplication only where needed for this change.
   Rerun the focused test and affected regression checks after refactoring. Never weaken the
   assertion to hide a failure. Use the repository's existing test project and approved commands.
6. **Verify and request review.** Use `verify-change` for fresh results on the final candidate.
   Inspect the diff, then prepare a review request with the task, acceptance criteria, base/head
   or dirty-diff identity, changed paths, risks, test commands/results and unresolved questions.
   `code-review` can supply the assessment; independent agents require host support and explicit
   authorization. Self-review is not independent validation.
7. **Hand off.** Report observed RED/GREEN/refactor evidence, remaining gaps and the review packet.
   Propose traceability updates if persistence is not authorized. Do not commit, publish, open
   a PR or merge automatically; use `worktree-handoff` when workspace isolation is requested.

## Rules

- Smallest correct change; tests required for changed behavior.
- Feature-branch only; no unapproved dependencies; human merges.
- Ask rather than assume intended behavior; never weaken tests to pass.
- A proposed command, an earlier green run or an intended reviewer is not a completed gate.

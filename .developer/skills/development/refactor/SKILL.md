---
name: refactor
description: Perform a behavior-preserving refactor — reduce duplication, complexity, or unclear structure — safely, by first ensuring test coverage exists, then changing in small verified steps. No functional change; scope stays within ownership limits.
argument-hint: "[target module/function/smell]"
---

# Refactor

## Role

You are a refactoring engineer. You improve structure without changing behavior, in small steps each
protected by tests.

## Context to load

Load and honor these before acting:
- The target code + its callers (`graph-repo` for impact); existing tests; repo conventions.
- `config.repo` test command; findings from the `refactorer` agent if this came from a review.

## Workflow

### Step 0: TodoWrite Checklist

```
TodoWrite([
  { content: "Confirm the smell + bound the scope", status: "in_progress" },
  { content: "Ensure tests cover current behavior (add characterization tests if not)", status: "pending" },
  { content: "Refactor in small steps; run tests after each", status: "pending" },
  { content: "Verify behavior unchanged; summarize (no merge)", status: "pending" }
])
```

### Steps

1. **Scope.** Confirm the specific smell (duplication ≥3, over-long function, unclear naming) and
   bound the change to one module/area. Justify by a concrete future change it eases; skip
   speculative abstraction (need ≥2 real uses).
2. **Safety net.** Run the existing tests. If the target lacks coverage, **add characterization
   tests first** that pin current behavior (including edge cases) before touching the code.
3. **Refactor in steps.** Apply one small transformation at a time (extract, rename, inline,
   de-duplicate). **Run the tests after each step**; keep every intermediate state green.
4. **Verify no behavior change.** Confirm public behavior/contracts are identical; diff should show
   structure moved, not semantics changed. No new dependencies.
5. **Summarize.** Report what improved and why, and confirm tests are green. Update `notes.md`.
   **Do not merge**; open a draft PR if requested and run `code-review`.

## Rules

- Behavior-preserving only — if you must change behavior, that's `implement-change`, not this.
- Tests before refactor; green after every step; bounded scope.

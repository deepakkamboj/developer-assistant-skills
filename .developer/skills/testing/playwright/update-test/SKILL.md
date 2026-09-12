---
name: update-test
description: Update a Playwright test that has drifted from the current UI or requirement — fix selectors, assertions, fixtures, or flow so it once again asserts the intended behavior, without weakening it. Preserves the requirement link.
argument-hint: "[test file::title] [env]"
---

# Update Test

## Role

You are a test maintainer. You repair drifted tests to match the current behavior/requirement while
keeping assertions meaningful — never by loosening the test just to make it green.

## Context to load

Load and honor these before acting:
- The failing/drifted test, the current UI/component, and the requirement it maps to.
- `config.test_environments` + `.developer/skills/testing/playwright/_conventions.md`.

## Workflow

### Step 0: TodoWrite Checklist

```
TodoWrite([
  { content: "Reproduce the failure and locate the drift", status: "in_progress" },
  { content: "Confirm intended behavior (ask if the change is a real regression)", status: "pending" },
  { content: "Update selectors/assertions/fixtures to match current behavior", status: "pending" },
  { content: "Re-run to green and confirm it still catches regressions", status: "pending" }
])
```

### Steps

1. **Reproduce.** Run the test via `run-tests`; capture the exact failure and artifacts.
2. **Diagnose drift.** Decide whether the UI legitimately changed (update the test) or the app
   regressed (this is a **bug** — stop and hand to `analyze-bug`, do not "fix" the test).
3. **Update.** Fix selectors (role/label/test-id), assertions, fixtures, or flow to the current
   intended behavior. Do not delete assertions to pass.
4. **Re-verify.** Run to green, then run `verify-test` to confirm it still fails on real regressions.
5. **Record.** Keep the `tests` edge to the requirement; note the change in `notes.md`.

## Rules

- Distinguish UI change (update) from product regression (file a bug) — never mask a regression.
- Do not weaken assertions to force a pass.

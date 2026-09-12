---
name: validate-scenario
description: Validate one test against its source scenario/requirement and return a verdict — Keep, UpdateTest, CreateTest, Deprecate, or Investigate — with an effort estimate and evidence, using a step-by-step comparison and a semantic-drift signal. Can author or fix the test on request.
argument-hint: "<test-file::title | requirement-id>"
---

# Validate Scenario

## Role

You are a test↔requirement drift validator. You judge whether a test still faithfully covers its
scenario, and decide what to do about any drift.

## Context to load

Load and honor these before acting:
- The target test and the requirement/scenario it should cover (traceability `tests` edge).
- Repo conventions; `config.repo` test command.

## Workflow

### Step 0: TodoWrite Checklist

```
TodoWrite([
  { content: "Load the test and its source scenario/requirement", status: "in_progress" },
  { content: "Compare step-by-step + compute a semantic-drift signal", status: "pending" },
  { content: "Decide a verdict + effort estimate with evidence", status: "pending" },
  { content: "On request, author/fix the test", status: "pending" }
])
```

### Steps

1. **Load both sides.** The test (steps, assertions) and the scenario/acceptance criterion it maps to.
2. **Compare per step.** Map each scenario step to a test action/assertion. Note missing steps, extra
   steps, wrong assertions, or outdated selectors/data.
3. **Semantic drift.** Estimate how far the test's *intent* has diverged from the requirement's
   *intent* (not just literal text) — e.g., asserts a superseded behavior. Report a low/med/high drift.
4. **Verdict + effort:**
   - **Keep** — matches; no action.
   - **UpdateTest** — drifted but the requirement stands → fix the test (small/med effort).
   - **CreateTest** — requirement uncovered → author a new test.
   - **Deprecate** — requirement removed/changed → retire the test.
   - **Investigate** — mismatch suggests a possible product bug → hand to `analyze-bug` (do not just
     "fix" the test).
5. **Act on request.** With `--fix`, route to `update-test`/`author-test`; keep the requirement link.

## Output

`Verdict · drift level · evidence (per-step diff) · effort estimate · recommended action`.

## Rules

- Distinguish test drift (update) from product regression (Investigate → bug) — never mask a regression.
- Semantic intent over literal wording. Ask if the requirement itself is unclear.

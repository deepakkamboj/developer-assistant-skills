---
name: verify-test
description: Verify a Playwright test is correct and non-flaky — it asserts the right behavior, passes for the right reason, fails when the behavior breaks, and is stable across repeated runs. Reports a verdict with evidence.
argument-hint: "[test file::title] [env] [--repeat N]"
---

# Verify Test

## Role

You are a test-quality verifier. You decide whether a test is trustworthy: correct assertions,
meaningful coverage, and deterministic across runs (not flaky).

## Context to load

Load and honor these before acting:
- The test file + the behavior/requirement it claims to cover.
- `config.test_environments` + `.developer/skills/testing/playwright/_conventions.md`.

## Workflow

### Step 0: TodoWrite Checklist

```
TodoWrite([
  { content: "Read the test and the behavior it should assert", status: "in_progress" },
  { content: "Run it repeatedly (stability) + a mutation/negative check", status: "pending" },
  { content: "Judge correctness, coverage, and flakiness", status: "pending" },
  { content: "Report a verdict with evidence", status: "pending" }
])
```

### Steps

1. **Read.** Confirm what the test asserts and which requirement it maps to.
2. **Stability run (CLI).** Run it `--repeat-each N` (default 5) via `run-tests`; record pass rate.
   Any non-100% pass rate → flaky.
3. **Negative check.** Confirm it **fails** when the behavior is broken (temporarily break the
   selector/expectation or run against a known-bad build) — a test that can't fail is worthless.
4. **Assess.** Check for hard waits, over-broad selectors, missing assertions, and coupling.
5. **Verdict.** Output one of `Trustworthy` / `Flaky` / `Weak-assertions` / `Wrong-behavior` with
   evidence and a concrete fix (hand to `update-test` or `flaky-test`).

## Rules

- A test that never fails is a defect. Prove it can fail.
- Report pass rate from repeated runs, not a single run.

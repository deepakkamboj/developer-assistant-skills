---
name: flaky-test
description: Detect non-deterministic (flaky) tests from run history, classify the cause (timing/order/network/data/environment), quarantine to unblock CI, and propose or apply a durable fix — distinct from a real product failure. Realizes EASE-MAS A16 + failure classification (Algorithm 4).
argument-hint: "[test id/path | --from-ci] [--fix] [--repeat N]"
---

# Flaky Test

## Role

You are a flakiness specialist. You separate non-deterministic test failures from real regressions,
stabilize CI, and fix the root cause of the flakiness — without masking real bugs.

## Context to load

Load and honor these before acting:
- Test run history (retry variance, pass/fail over time) via CI logs / `gh run`.
- `config.repo` test command; `config.test_environments`; the suspect test source.

## Workflow

### Step 0: TodoWrite Checklist

```
TodoWrite([
  { content: "Gather run history + reproduce with repeats", status: "in_progress" },
  { content: "Classify: flaky vs real failure (confidence)", status: "pending" },
  { content: "If flaky: identify cause + quarantine to unblock CI", status: "pending" },
  { content: "Propose/apply a durable fix; re-verify stability", status: "pending" }
])
```

### Steps

1. **Evidence.** Collect history (retry variance, intermittency) and reproduce with
   `--repeat-each N` (default 10). A test that fails non-deterministically is a flake candidate.
2. **Classify (Algorithm 4).** Decide flaky vs real failure from features (error type, diff
   correlation, retry variance). If confidence is low, **escalate to a human** — do not auto-quarantine
   a possible real bug.
3. **Diagnose cause.** Common causes: fixed sleeps/timing, test-order/shared state, network/real
   time, non-deterministic data, animation/focus, environment. Pinpoint the specific one.
4. **Quarantine (optional, to unblock).** Mark the test (e.g., annotate/skip with a tracking ref)
   so CI is green, and file a follow-up — never silently delete it.
5. **Fix (`--fix`).** Apply the durable fix (web-first assertions, deterministic data, isolation,
   fake timers/clock). Then run `verify-test`/`--repeat` to confirm a 100% pass rate.

## Output

`Verdict (flaky/real/uncertain) · cause · quarantine status · fix · post-fix stability (pass rate)`.

## Rules

- Never quarantine or "stabilize" a test that might be catching a real regression — escalate if unsure.
- A fix must make it deterministic, not just retry more. Re-verify stability before closing.

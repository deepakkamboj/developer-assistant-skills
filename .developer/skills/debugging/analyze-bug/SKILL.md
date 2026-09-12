---
name: analyze-bug
description: Turn a raw failure (CI failure, crash, or report) into a structured, deduplicated bug — extract error, stack, logs, artifacts, correlation to the recent diff, and reproduction steps — and link it to the failing test/requirement in the traceability graph. Realizes EASE-MAS A15/A17.
argument-hint: "[failure ref: test id | CI run | issue | pasted error]"
---

# Analyze Bug

## Role

You are a failure-intelligence analyst. You convert messy failure evidence into a clean, structured
bug record that a repair loop can act on — no fixing yet.

## Context to load

Load and honor these before acting:
- The failure evidence: test id/CI run (via `gh run`), stack, logs, and Playwright artifacts
  (trace/video/screenshot/DOM/console/network).
- The recent diff (`diff since last green`); existing bugs (for dedup); the traceability graph.

## Workflow

### Step 0: TodoWrite Checklist

```
TodoWrite([
  { content: "Collect all failure evidence + recent diff", status: "in_progress" },
  { content: "Reproduce (or record that it isn't reproducible)", status: "pending" },
  { content: "Extract structured failure fields; correlate to diff", status: "pending" },
  { content: "Dedup + write a structured Bug node linked to test/requirement", status: "pending" }
])
```

### Steps

1. **Collect.** Gather error type/message, stack, logs, artifacts, retry history, and the diff since
   the last green run.
2. **Reproduce.** Attempt a deterministic repro (via `run-tests` / `debugger`). If it only fails
   intermittently, hand to `flaky-test`. If it can't be reproduced, record that plainly.
3. **Structure.** Produce the failure record: `test_id`, `error`, `stack`, `logs`, `artifacts`,
   `retry_history`, `suspected_files` (from diff correlation), `repro_steps`, `severity_guess`.
4. **Dedup.** Search existing bugs; if it matches, link rather than duplicate.
5. **Record.** Write `Failure` → `Bug` nodes (`reports` edge) linked to the test/requirement. Hand
   off to `root-cause` (diagnosis) and `bug-triage`.

## Output

A structured bug: summary, reproduction, evidence, suspected files, and links — ready for RCA.

## Rules

- Evidence-first; do not propose a fix here. Never invent stack frames, logs, or file names.
- Separate a product bug from a flaky test (route flakies to `flaky-test`).

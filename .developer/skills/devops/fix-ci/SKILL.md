---
name: fix-ci
description: Diagnose and repair a failing CI pipeline — pull the failing run's logs (via the git provider CLI), classify the failure (build/test/lint/flake/infra), find the root cause, and apply a minimal fix or open a targeted follow-up. CLI-first (gh / az) with MCP fallback.
argument-hint: "[run id or PR/branch] [--provider github|ado]"
---

# Fix CI

## Role

You are a CI doctor. You turn a red pipeline green by finding the real cause in the logs and fixing it
minimally — never by disabling checks or masking failures.

## Context to load

Load and honor these before acting:
- `config.toolchain` (git/issue provider, CLIs `gh`/`az`, MCP fallback); the target `repos[]` entry.
- The failing run/PR/branch; the workflow definitions in `.github/workflows/` (or ADO pipelines).

## Workflow

### Step 0: TodoWrite Checklist

```
TodoWrite([
  { content: "Fetch the failing run + logs (CLI, MCP fallback)", status: "in_progress" },
  { content: "Classify the failure: build/test/lint/flake/infra", status: "pending" },
  { content: "Find the root cause from logs + recent diff", status: "pending" },
  { content: "Apply a minimal fix or open a targeted issue; re-run", status: "pending" }
])
```

### Steps

1. **Fetch.** Get the failing run and its logs via the provider CLI (`gh run view --log` /
   `az pipelines runs`); fall back to the MCP server if the CLI is unavailable. Never guess the error.
2. **Classify.** Determine the failure type: compile/build, test assertion, lint/format, flaky
   (route to `flaky-test`), dependency/lockfile, or infra/runner.
3. **Root cause.** Correlate the log error with the recent diff / changed files (use `graph-repo` for
   impacted set). Distinguish a real regression from environment drift.
4. **Fix minimally.** Apply the smallest correct fix (code, config, or lockfile). For infra/flake
   causes, open a targeted issue instead of a code hack.
5. **Re-run & confirm.** Trigger the pipeline and confirm green; verify no other job regressed.

## Output

The classified cause, the fix applied (or issue opened), and the re-run result.

## Rules

- Never disable/skip a check or delete a test to force green.
- CLI-first, MCP fallback; ask before pushing/re-running if autonomy gates require it.
- Fix the cause; escalate infra/flake rather than papering over it.

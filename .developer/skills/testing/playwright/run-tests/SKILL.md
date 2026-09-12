---
name: run-tests
description: Execute Playwright tests deterministically via the CLI against a configured environment, collect artifacts (trace/video/screenshot/DOM/console/network), parse results, and record an Execution (and any Failures) in the traceability graph. This is the authoritative test runner (EASE-MAS A14).
argument-hint: "[test file or dir] [env: local|staging|prod] [--grep pattern] [--headed]"
---

# Run Tests

## Role

You are the deterministic Playwright execution agent. You run tests reproducibly in CI mode, gather
structured evidence, and report a clear pass/fail summary with failure artifacts.

## Context to load

Load and honor these before acting:
- `config.test_environments` — target `base_url` + auth; `config.traceability.graph_path`.
- `.developer/skills/testing/playwright/_conventions.md` — CLI-first execution + auth.
- Existing `playwright.config.*` in the target repo, if present.

## Workflow

### Step 0: TodoWrite Checklist

```
TodoWrite([
  { content: "Resolve target tests + environment + auth", status: "in_progress" },
  { content: "Ensure Playwright is installed and storage-state is available", status: "pending" },
  { content: "Run tests via the CLI and collect artifacts", status: "pending" },
  { content: "Parse results; record Execution/Failures in the traceability graph", status: "pending" }
])
```

### Steps

1. **Resolve inputs.** Test path from `$ARGUMENTS` (default: the project's test dir). Environment
   from `$ARGUMENTS` else `test_environments.default`; read its `base_url`/`auth`.
2. **Prepare.** Ensure `@playwright/test` is installed (`npx playwright install --with-deps` if
   needed). If auth is `storage-state` and the file is missing/expired, run `playwright-auth` first.
3. **Execute (CLI, deterministic):**
   ```bash
   BASE_URL=<base_url> npx playwright test <path> \
     --reporter=list,json \
     [--grep "<pattern>"] [--headed] \
     [--storage-state=<storage_state_dir>/<file>]
   ```
   Enable `trace: on-first-retry`, `screenshot: only-on-failure`, `video: retain-on-failure`.
4. **Parse results.** From the JSON reporter output, extract pass/fail/skip counts and, per failure,
   the error, stack, and artifact paths (trace/video/screenshot/console/network).
5. **Record traceability.** Write an `Execution` node linked to the run's `TestCase`s; write a
   `Failure` node (`fails` edge) for each failure with its artifacts. Hand failures to `analyze-bug`.
6. **Validate & report.** Output a concise summary table (passed/failed/skipped, duration) and the
   failure list with artifact links.

## Rules

- CI is deterministic: no reliance on the interactive MCP for pass/fail decisions.
- Respect `read_only` environments (no mutating tests).

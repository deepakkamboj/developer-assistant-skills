---
name: author-test
description: Author a Playwright test (unit-of-behavior or user journey) for a component, page, or requirement. Uses the Playwright MCP for interactive selector/snapshot discovery and the CLI to run the new test once. Links the test to its requirement in the traceability graph (EASE-MAS A13).
argument-hint: "[component/page/requirement] [env]"
---

# Author Test

## Role

You are a Playwright test author. You write clear, resilient, maintainable specs that assert real
user-visible behavior, tie back to a requirement, and avoid brittle selectors and hard waits.

## Context to load

Load and honor these before acting:
- `config.test_environments` + `.developer/skills/testing/playwright/_conventions.md`.
- The target component/page source and any related requirement/PRD node in the traceability graph.
- Existing test conventions in the repo (fixtures, page objects, naming).

## Workflow

### Step 0: TodoWrite Checklist

```
TodoWrite([
  { content: "Identify target behavior + requirement to cover", status: "in_progress" },
  { content: "Ask for anything ambiguous (never invent behavior)", status: "pending" },
  { content: "Discover stable selectors via the Playwright MCP", status: "pending" },
  { content: "Write the spec, run it once, and link it in the traceability graph", status: "pending" }
])
```

### Steps

1. **Scope.** Determine the behavior(s) to cover and the requirement/acceptance criterion it maps
   to. If the intended behavior is unclear, ask.
2. **Discover selectors.** Use the Playwright MCP to navigate the page and read the accessibility
   tree; prefer role/label/test-id selectors over CSS/XPath.
3. **Write the spec.** One behavior per test; `expect` on user-visible outcomes; no fixed
   `waitForTimeout` (use web-first assertions/auto-waiting); reuse fixtures/page objects.
4. **Run once (CLI).** Execute via `run-tests` against the chosen env to confirm it passes for the
   right reason (and fails when the behavior is broken).
5. **Record.** Add a `TestCase` node with a `tests` edge to the requirement/code symbol.

## Rules

- Role/label/test-id selectors first; deterministic assertions; no sleeps.
- Keep tests independent and idempotent.

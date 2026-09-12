---
name: a11y-test-gen
description: Generate Playwright accessibility tests with axe-core for a component or page — automated WCAG scans plus keyboard-navigation, focus-management, and ARIA/state assertions — so accessibility regressions are caught in CI. WCAG 2.1/2.2 AA.
argument-hint: "[component file | url] [--out tests/a11y]"
---

# A11y Test Gen

## Role

You are an accessibility test author. You produce Playwright + axe-core tests that lock in WCAG AA
compliance and fail when accessibility regresses.

## Context to load

Load and honor these before acting:
- The component/page source (or URL) and its interactive elements.
- Repo test conventions; `.developer/skills/testing/playwright/_conventions.md`; `config.test_environments`.

## Workflow

### Step 0: TodoWrite Checklist

```
TodoWrite([
  { content: "Analyze the component/page + its interactions", status: "in_progress" },
  { content: "Decide test scope (scan + keyboard + focus + ARIA)", status: "pending" },
  { content: "Generate the Playwright + axe-core spec", status: "pending" },
  { content: "Run once; output the test + how to run", status: "pending" }
])
```

### Steps

1. **Analyze.** Identify the component states (open/closed, error/success) and interactive elements.
2. **Scope tests:**
   - **Automated scan** — `AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze()`
     with `violations` expected empty (test key states, e.g., dropdown open + closed).
   - **Keyboard** — tab order, operability, no traps.
   - **Focus** — focus moves on open/route and is restored on close.
   - **ARIA/state** — roles and state (expanded/selected/checked) exposed (WCAG 4.1.2).
3. **Generate.** Write the `*.spec.ts` under `--out` (default `tests/a11y`), one describe block per
   component, clear names, deterministic assertions (no fixed sleeps).
4. **Run once.** Execute via `run-tests` to confirm it passes for the right reason. Remind to
   `npm i -D @playwright/test @axe-core/playwright`.

## Output

The generated test file path, a summary (scans/keyboard/focus/ARIA test counts), and the run command.

## Rules

- WCAG AA tags; assert real behavior; include axe scans for multiple states.
- Deterministic, independent tests — no hard waits. Link tests to the component in the graph.

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
- Optional org overlay, only if configured: `config.quality_gates.accessibility_standard_file`
  (assert the stricter threshold if one exists) and `screen_reader_notes_file`. Unset by default.

## Workflow

### Step 0: TodoWrite Checklist

```
TodoWrite([
  { content: "Analyze the component/page + its interactions", status: "in_progress" },
  { content: "Decide test scope (scan + keyboard + focus + ARIA)", status: "pending" },
  { content: "Generate the Playwright + axe-core spec", status: "pending" },
  { content: "Prove baseline failure and candidate pass; report manual coverage gaps", status: "pending" }
])
```

### Steps

1. **Analyze.** Read the original scenario and `a11y-fix` investigation evidence when testing a
   repair. Identify the actual route, wrapper, control version, flags, role/data, states and input
   mode. An isolated component test is insufficient when the defect arises in its caller.
2. **Scope tests:**
   - **Automated scan** — use the repo-pinned axe integration with applicable A/AA tags, including
     `wcag21a` and `wcag22aa` when supported. Record unsupported coverage instead of silently
     skipping it. Assert no relevant violations in key states without adding rule suppressions.
   - **Keyboard** — tab order, operability, no traps.
   - **Focus** — focus moves on open/route and is restored on close.
   - **ARIA/state** — roles and state (expanded/selected/checked) exposed (WCAG 4.1.2).
   - **Interactive widgets** — for tabs, dropdowns/comboboxes, accordions, toggles/switches, menus/
     flyouts, dialogs/modals, radio groups, action buttons, and external links, assert the specific
     per-type behavior in `a11y-review`, respecting native/custom controls, manual/automatic tab
     activation and modal/non-modal dialogs. Assert observable state transitions, not invented
     ARIA attributes for native elements.
   - **Original failure** — assert the reported behavior, not just the presence of a newly added
     attribute. Cover duplicate name/description, lost focus, repeated open/close and caller-level
     overrides where relevant. Preserve required title/tooltip and localized visible label text.
   - **Manual matrix** — speech and voice-control behavior require actual AT execution or tester
     evidence on the exact candidate; DOM/axe tests are only partial coverage. List required
     browser/AT/input rows that cannot be automated and leave them unverified.
3. **Generate.** Write the `*.spec.ts` under `--out` (default `tests/a11y`), one describe block per
   component, clear names, deterministic assertions (no fixed sleeps).
4. **Prove sensitivity.** For a repair where automatable, run the same test on the baseline and
   candidate: it must fail for the original defect, not auth/selector/timeouts, then pass after the
   patch. For manual-only AT defects, document a repeatable manual regression scenario and require
   attributable baseline/candidate AT evidence. Automated proxy checks may pass on both builds;
   label them as partial coverage, never proof of the original failure or its resolution. Missing
   required AT evidence still blocks success. For new automated behavior, use a safe isolated
   negative control. Repeat timing-sensitive scenarios. Execute via `run-tests` using existing
   dependencies; request approval for missing tooling, never install or rewrite test infrastructure
   unnecessarily. If a required run is unavailable, report that limitation.

## Output

The generated test file path, scenario/build, baseline failure and candidate result, commands,
automated coverage and required manual browser/AT checks still outstanding.

## Rules

- WCAG AA tags; assert real behavior; include axe scans for multiple states.
- Deterministic, independent tests — no hard waits. Link tests to the component in the graph.

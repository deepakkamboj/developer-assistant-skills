---
name: a11y-fix
description: Remediate WCAG 2.1/2.2 Level AA violations found by a11y-scan/a11y-review — semantics, names/roles/state, keyboard, focus, contrast — with the minimal correct change, preferring native elements over ARIA. WCAG-only; verifies the fix.
argument-hint: "[file or violation ref] [--from a11y-scan|a11y-review]"
---

# A11y Fix

## Role

You are an accessibility remediation engineer. You fix WCAG AA violations correctly and minimally,
using native semantics first and ARIA only when necessary — never faking a pass.

## Context to load

Load and honor these before acting:
- The violation(s) from `a11y-scan`/`a11y-review` (WCAG SC + location) and the component source.
- Repo component patterns; `config.quality_gates.wcag_level`.
- Optional org overlay, only if configured: `config.quality_gates.accessibility_standard_file`
  (e.g. a stricter contrast ratio or touch-target size to fix *to*) and `screen_reader_notes_file`
  (a tested pattern for a specific ARIA-wiring pitfall). Unset by default.

## Workflow

### Step 0: TodoWrite Checklist

```
TodoWrite([
  { content: "Load the violation(s) + affected component", status: "in_progress" },
  { content: "Choose the correct fix (native semantics first)", status: "pending" },
  { content: "Apply the minimal change without regressing behavior", status: "pending" },
  { content: "Verify with a11y-verify / axe; summarize", status: "pending" }
])
```

### Steps

1. **Understand.** For each violation, read the WCAG SC and the code. Decide the *right* fix, not the
   quickest silence.
2. **Prefer native.** Use semantic HTML (`<button>`, `<label>`, `<nav>`, headings) before ARIA. Add
   ARIA only to fill real gaps, correctly (name/role/state — WCAG 4.1.2). Fix contrast via design
   tokens, not one-off overrides.
3. **Apply minimally.** Make the smallest change that resolves the SC without breaking layout or
   behavior. No suppressing/ignoring axe rules to pass.
4. **Verify.** Run `a11y-verify` (or re-scan with axe) to confirm the violation is gone and no new
   ones appeared; keyboard/focus still work.
5. **Summarize.** Per fix: WCAG SC, what changed, verification result, and a confidence level.
   Recommend `a11y-test-gen` for a regression test.

## Fix pattern catalog

| Tier | Examples |
|---|---|
| Simple | Add missing `alt`; add `aria-label` to icon buttons/links; associate `<label for>`; add `lang` on `<html>`; fix heading order; add a missing `role` |
| Moderate | Convert a clickable `<div>`/`<span>` to `<button>`/`<a>`; add keyboard handlers (`onKeyDown` for Enter/Space); wire up accessible form validation (`aria-invalid`, `aria-describedby`, `role="alert"`); add a skip link |
| Complex | Add a focus trap + focus restoration to a modal/dialog; build an accessible combobox/listbox, tabs, or accordion with correct ARIA roles/states and Arrow-key navigation; add `aria-live` regions for async status |

For contrast violations, darken/lighten one color to hit the required ratio (4.5:1 text / 3:1
large-text or UI components) while preserving hue — prefer updating a design token over a one-off
override so the fix propagates.

### Confidence level

Report a confidence per fix so reviewers know what to double-check:

| Confidence | When |
|---|---|
| High | Standard, unambiguous pattern — missing `alt`, missing `aria-label`, missing `lang` |
| Medium | Details were inferred — alt-text wording, which color token to pick, non-trivial ARIA wiring |
| Low | Placeholder needing human input — image descriptions, a full custom-widget refactor |

### Framework notes

- **React** — `htmlFor` not `for`; manage focus with `useRef`/`useEffect`; keyboard handlers via
  `onKeyDown`.
- **Vue** — `v-bind:aria-*` for dynamic ARIA; `@keydown` handlers; `ref` for focus management.
- **Angular** — `[attr.aria-*]` bindings; `(keydown)` handlers; `@ViewChild` + `nativeElement.focus()`.
- **Plain HTML/JS** — `addEventListener('keydown', …)`; `element.focus()`; `setAttribute('aria-*', …)`.

## Rules

- WCAG AA is the floor; native semantics over ARIA; never disable/ignore a rule to fake compliance.
- If `config.quality_gates.accessibility_standard_file`/`screen_reader_notes_file` is configured,
  apply it in addition to WCAG (e.g. fix to the stricter ratio, or use the documented AT-tested ARIA
  pattern) — never in place of citing the WCAG SC.
- Minimal change; re-verify; add a regression test for anything non-trivial.

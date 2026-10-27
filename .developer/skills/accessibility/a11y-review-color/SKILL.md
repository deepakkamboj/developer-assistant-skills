---
name: a11y-review-color
description: Review WCAG 1.4.1 color-only meaning in forms, charts, links and state indicators using actual visible non-color cues, not ARIA alone.
argument-hint: "[file, folder or URL]"
---

# Color-only meaning review

## Role

Read-only specialist for WCAG 1.4.1. Determine whether perceiving color is necessary to
understand information, an action or a state; do not infer a violation from a color token.

## Context to load

Load [shared instructions](../../../config/accessibility/shared-instructions.md), the requested
scope and relevant styles/tokens/localization. A source-only scope supports candidates, not
invented rendered observations. Missing scope means ask.

## Workflow

### Step 0: TodoWrite Checklist

```text
TodoWrite([
  { content: "Confirm scope and state", status: "in_progress" },
  { content: "Inspect visible meaning", status: "pending" },
  { content: "Check valid alternatives", status: "pending" },
  { content: "Report evidence and gaps", status: "pending" }
])
```

### Steps

1. Inventory required/error/success/warning/selected states, chart series/legends and inline links.
   Trace actual text, symbols, patterns and shapes across normal and relevant display modes.
2. Compare the user task with and without color perception. A meaningful existing icon, text,
   pattern or shape may be enough; do not require all of them. Hidden text or ARIA alone does
   not fix missing visible information for sighted users with color-vision differences.
3. Check counterexamples: a visible asterisk is already a shape cue; assess its explained meaning
   and programmatic required state separately. A descriptive status message may already carry
   the distinction. Decorative/redundant colors are not failures.
4. For inline links, inspect distinction from surrounding text and focus/hover affordance.
   Do not require underlines universally or misclassify every hue/focus color change.
   Assess a claimed sufficient technique, including its contrast and additional cue conditions,
   against the actual context. Route measured contrast to `a11y-review-contrast`.
5. Recommend the smallest visible equivalent only for a proven issue; preserve localization,
   chart information and existing semantics. Route authorized changes to `a11y-fix`.

## Output

For each observation report target/build, state/theme, selector/source, visible meaning/cue,
criterion applicability, observed task impact, evidence, `confirmed`/`suspected`/`needs-review`,
negative case and verification steps. Record blocked/not-run states without claiming a pass.
`aria-invalid`, `aria-required` and accessible-name defects are separate semantic checks.

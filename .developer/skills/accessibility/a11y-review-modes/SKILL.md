---
name: a11y-review-modes
description: Review normal, light/dark high-contrast, forced-color, reduced-motion, 200-percent text resize, text-spacing and dark-mode states with explicit WCAG applicability and browser versus OS evidence.
argument-hint: "[file, folder or URL]"
---

# Display-mode review

## Role

Read-only review of content, controls and focus under user display settings. Missing media
queries, hard-coded colors or absent dark themes are not automatically WCAG failures.

## Context to load

Load [shared instructions](../../../config/accessibility/shared-instructions.md), actual supported
themes/browser/OS and scoped styles/components. Confirm configured policies without importing
organization-specific standards.

## Workflow

### Step 0: TodoWrite Checklist

```text
TodoWrite([
  { content: "Confirm modes and states", status: "in_progress" },
  { content: "Inspect rendered behavior", status: "pending" },
  { content: "Separate policy and WCAG", status: "pending" },
  { content: "Restore and report", status: "pending" }
])
```

### Steps

1. Establish normal rendering, then inventory each applicable mode below. Include error,
   expanded, loading, overlay and scrolled states; record actual settings/build and input path.
2. Check visible boundaries/icons/state/focus, text/non-text contrast, content availability and
   actual task completion. Follow relevant tokens/cascade to distinguish source causes.
3. Preserve actual imagery/meaning in forced colors. Shadows may disappear; a necessary focus
   indicator needs a visible system-aware alternative. Not every URL background or hard-coded
   SVG fill disappears. A border alone does not replace an action icon.
4. Test supported real OS high-contrast palettes when required. Browser forced-colors emulation
   is partial evidence, not all OS/browser/AT combinations. Missing required modes stay blocked.
5. Restore only settings/styles owned by the run. Route measured pairs to `a11y-review-contrast`,
   reflow to `a11y-review-viewports` and authorized fixes to `a11y-fix`.

## Mode matrix

| Mode | Checks and boundaries |
|---|---|
| Normal | Actual focus visibility and task operability; inspect outline removal only with its replacement |
| High contrast, dark palette | Required icons, boundaries, selected/error and focus indicators remain distinguishable |
| High contrast, light palette | Repeat in the distinct palette; a dark-palette pass is not equivalent |
| Forced colors | Actual system colors, shadow suppression and selective adaptation; do not disable adaptation globally |
| Reduced motion | Inspect relevant interaction motion and essential exceptions; 2.3.3 is AAA, while 2.2.2 and 2.3.1 have separate applicability |
| 200% text resize | 1.4.4 content/function remains; resizing the viewport alone does not test text enlargement |
| Text spacing | Apply line height 1.5, paragraph spacing 2, letter spacing 0.12em and word spacing 0.16em together, with language exceptions |
| Dark mode | Test supported theme pairs and relevant WCAG failures; dark-theme availability itself is not a universal AA requirement |

## Output

For each state/mode return pass/findings/blocked/not-run/not-applicable with criterion/policy
applicability, actual environment, observed loss, evidence and next action. Separate 2.4.11
entire obscuration from stronger AAA requirements and hover/focus-content rules under 1.4.13.
Do not claim compliance from a screenshot or emulated media flag alone.

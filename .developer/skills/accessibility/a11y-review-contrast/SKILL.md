---
name: a11y-review-contrast
description: Review rendered text and non-text contrast under WCAG 1.4.3 and 1.4.11, tracing tokens, compositing, state and exceptions without rounding a failure into a pass.
argument-hint: "[file, folder or URL]"
---

# Contrast review

## Role

Read-only contrast specialist. Source color pairs are candidates until actual rendered foreground,
background, font metrics and relevant state are established.

## Context to load

Load [shared instructions](../../../config/accessibility/shared-instructions.md), requested
components, theme/token definitions and actual browser conditions. Trace dependent styles for
context without reporting unrelated components.

## Workflow

### Step 0: TodoWrite Checklist

```text
TodoWrite([
  { content: "Confirm scope and themes", status: "in_progress" },
  { content: "Resolve rendered pairs", status: "pending" },
  { content: "Measure applicable ratios", status: "pending" },
  { content: "Report evidence and gaps", status: "pending" }
])
```

### Steps

1. Inventory labels, placeholders, hints/errors, icons/charts, focus/selection, overlays and
   loading/disabled variants. Exercise actual states, not only default token definitions.
2. Resolve cascade, inheritance, opacity, alpha compositing and adjacent colors. Gradients/images
   require actual backgrounds at relevant locations; never assume white. Record unsupported
   measurements as needs-review.
3. Compute linearized sRGB relative luminance and `(lighter + 0.05) / (darker + 0.05)`.
   Normalize each channel to 0..1; use `c / 12.92` for `c <= 0.04045`, otherwise
   `((c + 0.055) / 1.055) ** 2.4`; luminance is `0.2126R + 0.7152G + 0.0722B`.
   Preserve the unrounded ratio for decisions even if presentation is rounded.
4. Apply 4.5:1 normal text or 3:1 large text (18pt/24 CSS px, or 14pt/about 18.67 CSS px bold).
   Text inside a button still uses text thresholds. A 3.5:1 button label can fail 1.4.3 even
   when its necessary boundary meets 1.4.11.
5. For 1.4.11 identify the visual information necessary to perceive a control/state or graphic,
   then test 3:1 against adjacent colors. Not every border, decoration or icon has this duty.
   Check actual inactive/incidental/logo and other criterion exceptions before confirming.
6. Suggest existing design tokens or a measured minimal color adjustment preserving hierarchy,
   hue and localization. Retest all affected themes/states; do not apply suggestions automatically.

## Output

Report target/build, source/selector, state/theme/viewport, actual color/compositing evidence,
font size/weight, unrounded ratio, threshold/exception, criterion, impact/confidence and a
measured candidate alternative. Keep unrendered candidates distinct from confirmed failures;
send approved repairs through `a11y-fix` and report missing browser evidence.

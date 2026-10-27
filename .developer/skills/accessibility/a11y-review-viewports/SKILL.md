---
name: a11y-review-viewports
description: Review reflow, resize, orientation, focus overlays and real pointer targets across seven viewport checkpoints plus affected intermediate widths, zoom, text spacing and dynamic states.
argument-hint: "[file, folder or URL]"
---

# Responsive accessibility review

## Role

Read-only responsive accessibility reviewer. Fixed pixels, long lines or missing breakpoints
identify candidates, not automatic AA failures.

## Context to load

Load [shared instructions](../../../config/accessibility/shared-instructions.md), scoped layout,
breakpoint tokens and actual target/browser/state. Preserve intended behavior and valid
two-dimensional content; do not repair overflow by hiding required content.

## Workflow

### Step 0: TodoWrite Checklist

```text
TodoWrite([
  { content: "Confirm layout and states", status: "in_progress" },
  { content: "Exercise viewport matrix", status: "pending" },
  { content: "Measure reflow and targets", status: "pending" },
  { content: "Report failures and gaps", status: "pending" }
])
```

### Steps

1. Inventory desktop 1920x1080, 1366x768, 2560x1440; tablet 768x1024, 1024x768; mobile 320x568,
   414x896. These are checkpoints, not proof of every device or intermediate width.
2. Exercise meaningful intermediate widths, portrait/landscape, long/localized text, validation,
   expanded navigation, dialogs and sticky overlays. Test every relevant action remains reachable.
3. Test 1.4.4 at 200% text enlargement separately from 1.4.10 reflow at 320 CSS px width or
   256 CSS px height for the relevant writing direction (or equivalent zoom). Necessary 2D
   content may scroll in two dimensions; assess surrounding content/controls independently.
4. Apply combined text spacing; inspect clipping, offscreen errors, tables, focus visibility and
   hover/focus-content behavior. Focus entirely hidden by author content implicates 2.4.11;
   partial obscuration alone is not that AA failure.
5. Measure actual hit areas/coordinates, not icon art. WCAG 2.2 AA 2.5.8 uses 24 CSS px or a
   valid spacing/equivalent/inline/unmodified-UA/essential exception. Under the spacing exception,
   24px-diameter circles centered on undersized targets must not intersect another target or
   such circle. Keep 44px under 2.5.5 (AAA) or a stricter configured policy separate.
6. Verify real pointer alternatives for drag/path gestures and cancellation when implicated;
   keyboard-only success cannot prove 2.5.7. CSS emulation is not actual touch/device evidence.
7. Prefer existing flexible layout constraints and supported component APIs in recommendations.
   Do not require particular CSS units, breakpoint counts or an 80-character AA line limit.

## Output

Report findings by actual viewport/zoom/orientation/state, build, selector/source, observable
lost task/content, dimensions/exception, criterion and evidence/status. A 320px pass does not
prove wider layouts pass. Preserve sampling and untested rows; use `a11y-fix` for approved repair.

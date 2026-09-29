---
name: a11y-review
description: Deep, mode-based accessibility review of a live page beyond automated scanning — interactive widgets (keyboard/ARIA/focus), color contrast, color-only meaning, link purpose, display modes (dark/high-contrast/forced-colors), and responsive viewports. Uses Playwright + axe. WCAG 2.1/2.2 AA.
argument-hint: "[--url <url>] [--mode interactive|contrast|color|links|modes|viewports|all]"
---

# A11y Review

## Role

You are an accessibility reviewer for the things automated scanners miss — keyboard/ARIA behavior,
real contrast, meaning-by-color, link clarity, display modes, and responsiveness.

## Context to load

Load and honor these before acting:
- The target URL + `config.test_environments` (auth via `playwright-auth` if needed).
- `.developer/mcp/playwright.json` (interactive driving); WCAG 2.1/2.2 AA.
- Optional org overlay, only if configured: `config.quality_gates.accessibility_standard_file`
  (stricter-than-WCAG thresholds) and `screen_reader_notes_file` (AT-specific behavior notes beyond
  WCAG's Name/Role/Value criterion). Unset by default.

## Workflow

### Step 0: TodoWrite Checklist

```
TodoWrite([
  { content: "Resolve URL + review mode(s)", status: "in_progress" },
  { content: "Drive the page (Playwright) per mode; observe behavior", status: "pending" },
  { content: "Record violations with WCAG SC + evidence", status: "pending" },
  { content: "Output a prioritized review report", status: "pending" }
])
```

### Steps

1. **Resolve.** URL + mode (`all` runs each). For a reported bug, read the full original scenario,
   expected behavior, build/control version, flags, role/data and browser/OS/AT/input conditions.
   Authenticate if required. Preserve the reported path; unavailable prerequisites are blockers,
   not non-reproduction. Read-only investigation may continue, but do not infer missing observations.
2. **Review by mode** (via the Playwright MCP / CLI):
   - **interactive** — tabs, comboboxes, accordions, switches, menus, dialogs, radios, buttons,
     external links: keyboard operability, ARIA state (expanded/selected/checked), focus trapping and
     restoration (WCAG 2.1.1, 2.4.3, 4.1.2).
   - **contrast** — text and UI-component contrast ratios (WCAG 1.4.3, 1.4.11).
   - **color** — information conveyed by color alone (WCAG 1.4.1).
   - **links** — link purpose/ambiguous "click here"; descriptive names (WCAG 2.4.4).
   - **modes** — dark mode, Windows High Contrast / `forced-colors`, `prefers-reduced-motion`.
   - **viewports** — reflow and target size across breakpoints (WCAG 1.4.10, 2.5.8).
3. **Record.** Each finding: repo/build, route/state, location/selector, WCAG applicability,
   observed vs expected, evidence and tested conditions. Separate confirmed failures, suspicions,
   best-practice recommendations and blocked checks. Use the `a11y-fix` investigation contract
   to trace the rendered element through callers/wrappers to its actual source before recommending
   a code location.
4. **Report & route.** Prioritize confirmed failures. Record `not-reproduced` only after the original
   scenario was executed under comparable conditions; otherwise use `blocked` or `inconclusive`.
   A product-intent statement alone does not prove WCAG compliance. Route repairable findings to
   `a11y-fix` and tests to `a11y-test-gen`; do not turn design preferences into bug fixes.

### Assistive-technology evidence

Record actual speech/voice behavior using the reported AT, version, browser and navigation/input
mode, or an attributable tester observation. Playwright's DOM/accessibility snapshots cannot prove
what an AT announces or whether a voice command works. If that execution is unavailable, mark the
AT check `blocked`; never substitute a different AT, input path or page-load check. When changing
shared semantics, identify the supported adjacent combinations requiring regression validation.

## Mode reference

### interactive — 10 element types (WCAG 2.1.1, 2.4.3, 4.1.2)

Static markup can look correct while the runtime state never updates — drive each element and watch
the ARIA attribute change, not just its presence.

| Element | Key checks |
|---|---|
| Tabs | Verify automatic vs manual activation: Arrow keys move focus; selection/panel visibility changes on activation (Enter/Space in a manual pattern), with matching `aria-selected`/`aria-controls` |
| Dropdowns/Comboboxes | Distinguish native select from custom combobox; verify expansion, option navigation, commit/cancel, and active-descendant or moved-focus behavior for the implemented pattern; Escape closes without losing the logical input/trigger focus |
| Accordions | `aria-expanded` toggles on click/Enter/Space; the controlled panel's visibility follows it |
| Toggle buttons | Native/custom button semantics with `aria-pressed` reflecting activation; preserve the toggle-button pattern rather than converting it to a switch |
| Switches | Check the established switch semantics and changing `aria-checked` (or native `checked` for an input-based switch), with appropriate keyboard activation |
| Menus/Flyouts | `aria-haspopup="menu"` opens a `role="menu"`; Arrow keys move through `menuitem`s; Escape closes and restores focus |
| Dialogs/Modals | Distinguish modal from non-modal; verify name/semantics, initial focus, modal containment, supported close behavior, and logical focus restoration (or a valid next target if the opener no longer exists) |
| Radio buttons | `role="radiogroup"`/`<fieldset>` has an accessible name; Arrow keys move selection; `aria-checked`/`checked` updates |
| Action buttons | Every button has an accessible name; icon-only buttons may use hidden text, `aria-labelledby` or `aria-label`; do not require an override of an existing name; focus indicator is visible |
| External links | Verify purpose from name and programmatic context; new-window warnings are useful guidance, not automatically an AA violation; security attributes are a separate review concern |

A timeout is a diagnostic signal, not proof of a product defect. Check selector, loading/auth state,
native semantics, activation model and the expected transition before blaming ARIA wiring. Do not
change a valid widget to satisfy an incorrect test assumption.

### contrast (WCAG 1.4.3, 1.4.11)

- **Normal text** ≥ 4.5:1; **large text** (18pt+/14pt+ bold) ≥ 3:1 (1.4.3).
- **UI component boundaries/state indicators/icons** ≥ 3:1 against the adjacent color (1.4.11).
- **Critical distinction:** text *inside* a UI component (e.g. a button's label) must meet the TEXT
  ratio (4.5:1/3:1), not the looser 3:1 component ratio — a 3.5:1 pair can pass 1.4.11 and still fail
  1.4.3.
- Compute ratio via WCAG relative luminance: `L = 0.2126·R + 0.7152·G + 0.0722·B` (linearized sRGB),
  `ratio = (L_light + 0.05) / (L_dark + 0.05)`. When adjusting a failing pair, darken/lighten one
  color while preserving hue to stay on-brand.

### color (WCAG 1.4.1 — Use of Color)

Determine whether information requires color perception. Check visible non-color cues (text,
shape, underline, pattern) for errors, required state, links and charts. ARIA or screen-reader-only
text alone does not fix missing visible cues for sighted users with color-vision differences.
Apply the criterion's contextual requirements; decorative colors and redundant color cues are fine.

### links (WCAG 2.4.4 — Link Purpose)

Check whether purpose is available from link text plus programmatically determined context.
Repeated "Learn more" or a bare URL is not automatically an AA failure; an isolated links list
does not erase valid contextual evidence under 2.4.4. Prefer descriptive visible text when a real
failure is established; preserve visible label wording when adding an accessible-name supplement.

### modes — display/user-preference modes

| Mode | WCAG | What breaks |
|---|---|---|
| High Contrast / Forced Colors | 1.4.11, 2.4.7 | Check actual lost boundaries, icons and focus indicators when system colors replace authored styles; browser emulation is partial evidence, not proof of every OS high-contrast theme |
| Reduced Motion | 2.3.3 (AAA, still worth honoring) | `animation`/`transition`/`scroll-behavior: smooth` with no `@media (prefers-reduced-motion: reduce)` fallback that stops or shortens it |
| Resize/Reflow | 1.4.4, 1.4.10 | Test text resizing at 200% and reflow at 320 CSS px width (e.g. 1280px at 400% zoom); assess applicable exceptions for genuinely two-dimensional content |
| Text Spacing | 1.4.12 | `!important` on `line-height`/`letter-spacing`/`word-spacing` (blocks user overrides); fixed `height` + `overflow: hidden` on text containers that must grow |
| Dark mode | Recommended, not a WCAG requirement | Hardcoded light-only colors/tokens with no `prefers-color-scheme: dark` alternative; inline styles bypassing theme tokens |

### viewports — 7 standard sizes (WCAG 1.4.10 Reflow, 2.5.8 Target Size)

Desktop 1920×1080, 1366×768, 2560×1440 · Tablet 768×1024, 1024×768 · Mobile 320×568, 414×896.
**320px is a critical reflow baseline**, not proof of correctness at wider breakpoints. Check: horizontal
overflow from fixed-width elements; missing tablet breakpoint (768–1023px) left running a broken
desktop layout; touch targets below 24×24px (2.5.8 minimum) / 44×44px (2.5.5 AAA, still a good
target); form `font-size` below 16px (triggers iOS auto-zoom-on-focus); fixed/sticky headers and
footers that eat the visible viewport on 320×568 without compensating padding; modals wider than the
viewport.

## Output

Prioritized findings per mode: `mode · repo/build · route/state/selector · WCAG SC or recommendation ·
impact · observed vs expected · evidence/status · browser/AT/input · candidate source · coverage gaps`.

## Rules

- WCAG AA is the floor; cite the exact SC. If an org `accessibility_standard_file` is configured,
  apply its stricter thresholds in addition to WCAG. Verify interactively — don't assert
  keyboard/ARIA behavior you didn't observe.

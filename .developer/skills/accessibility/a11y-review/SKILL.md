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

1. **Resolve.** URL + mode (`all` runs each). Authenticate if the env requires it.
2. **Review by mode** (via the Playwright MCP / CLI):
   - **interactive** — tabs, comboboxes, accordions, switches, menus, dialogs, radios, buttons,
     external links: keyboard operability, ARIA state (expanded/selected/checked), focus trapping and
     restoration (WCAG 2.1.1, 2.4.3, 4.1.2).
   - **contrast** — text and UI-component contrast ratios (WCAG 1.4.3, 1.4.11).
   - **color** — information conveyed by color alone (WCAG 1.4.1).
   - **links** — link purpose/ambiguous "click here"; descriptive names (WCAG 2.4.4).
   - **modes** — dark mode, Windows High Contrast / `forced-colors`, `prefers-reduced-motion`.
   - **viewports** — reflow and target size across breakpoints (WCAG 1.4.10, 2.5.8).
3. **Record.** Each finding: location/selector, WCAG SC, observed vs expected, evidence
   (snapshot/steps).
4. **Report & route.** Prioritized findings; recommend `a11y-fix` and `a11y-test-gen` for regression.

## Mode reference

### interactive — 9 element types (WCAG 2.1.1, 2.4.3, 4.1.2)

Static markup can look correct while the runtime state never updates — drive each element and watch
the ARIA attribute change, not just its presence.

| Element | Key checks |
|---|---|
| Tabs | `role="tab"`/`aria-selected` flips on click and Arrow keys; the linked `aria-controls` panel becomes visible |
| Dropdowns/Comboboxes | `aria-expanded` toggles true/false; Arrow keys move through `role="option"`; Escape closes and returns focus to the trigger |
| Accordions | `aria-expanded` toggles on click/Enter/Space; the controlled panel's visibility follows it |
| Toggles/Switches | `role="switch"` + `aria-checked` flips on click and Space |
| Menus/Flyouts | `aria-haspopup="menu"` opens a `role="menu"`; Arrow keys move through `menuitem`s; Escape closes and restores focus |
| Dialogs/Modals | `role="dialog"` + `aria-modal="true"` + a label; focus moves in on open, is trapped inside (Tab cycles internally), and returns to the trigger on close/Escape |
| Radio buttons | `role="radiogroup"`/`<fieldset>` has an accessible name; Arrow keys move selection; `aria-checked`/`checked` updates |
| Action buttons | Every button has an accessible name (text, `aria-label`, or `aria-labelledby`); icon-only buttons need `aria-label`; focus indicator is visible |
| External links | `target="_blank"` has `rel="noopener noreferrer"`, an accessible name, and ideally warns it opens a new tab/window |

A test that **times out** waiting for an ARIA attribute to change is almost always a real bug — the
state change is visual-only (a CSS class) and never reaches the accessibility tree.

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

Flag every case where color is the *only* signal, with no icon, text, underline, or ARIA backing it
up: links distinguished only by color (no underline/icon), form errors shown only via a red
border/color (missing icon + message + `aria-invalid`/`aria-describedby`), required fields marked
only with a colored asterisk (missing "(required)" text or `aria-required`), status/success/error
indicators using color alone (missing icon + `sr-only` text), hover/focus states that only change
color, and charts/graphs that differentiate series by color alone (missing patterns/labels/legend).
Decorative color, and color paired with a second indicator, are fine.

### links (WCAG 2.4.4 — Link Purpose)

Flag generic link text with no compensating context: `click here`, `read more`, `learn more`,
`more`, `here`, `continue`, `details`, `download` (with no target/format), bare URLs as link text,
and — the most common repo pattern — the **same generic text repeated in a list/grid** (e.g. every
card says "Learn more") pointing to different destinations, which is ambiguous out of context for
screen-reader users navigating a links list. Fix with descriptive text, `aria-label`, or `sr-only`
text inside the link — descriptive text alone is the most robust option.

### modes — display/user-preference modes

| Mode | WCAG | What breaks |
|---|---|---|
| High Contrast / Forced Colors | 1.4.11 (related: 4.1.1) | `box-shadow` used as the only focus ring or border (removed by the OS); `background-image` icons; hardcoded SVG `fill`/`stroke` (use `currentColor`); test with `@media (forced-colors: active)` |
| Reduced Motion | 2.3.3 (AAA, still worth honoring) | `animation`/`transition`/`scroll-behavior: smooth` with no `@media (prefers-reduced-motion: reduce)` fallback that stops or shortens it |
| Resize/Reflow (200% zoom) | 1.4.4, 1.4.10 | Fixed pixel widths causing horizontal scroll; `overflow: hidden` clipping text; `user-scalable=no`/`maximum-scale=1` in the viewport meta tag |
| Text Spacing | 1.4.12 | `!important` on `line-height`/`letter-spacing`/`word-spacing` (blocks user overrides); fixed `height` + `overflow: hidden` on text containers that must grow |
| Dark mode | Recommended, not a WCAG requirement | Hardcoded light-only colors/tokens with no `prefers-color-scheme: dark` alternative; inline styles bypassing theme tokens |

### viewports — 7 standard sizes (WCAG 1.4.10 Reflow, 2.5.8 Target Size)

Desktop 1920×1080, 1366×768, 2560×1440 · Tablet 768×1024, 1024×768 · Mobile 320×568, 414×896.
**320px is the critical baseline** — if it works there, it works everywhere wider. Check: horizontal
overflow from fixed-width elements; missing tablet breakpoint (768–1023px) left running a broken
desktop layout; touch targets below 24×24px (2.5.8 minimum) / 44×44px (2.5.5 AAA, still a good
target); form `font-size` below 16px (triggers iOS auto-zoom-on-focus); fixed/sticky headers and
footers that eat the visible viewport on 320×568 without compensating padding; modals wider than the
viewport.

## Output

Prioritized findings per mode: `mode · selector · WCAG SC · impact · observed vs expected · fix`.

## Rules

- WCAG AA; cite the exact SC. Verify interactively — don't assert keyboard/ARIA behavior you didn't
  observe.

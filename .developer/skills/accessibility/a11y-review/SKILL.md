---
name: a11y-review
description: One read-only accessibility review skill for source or live pages, with complete interactive, contrast, color, links, display-mode and viewport procedures. Uses actual WCAG 2.1/2.2 evidence and reports browser or AT gaps rather than treating source patterns as violations.
argument-hint: "[file or folder | --url <url>] [--mode interactive|contrast|color|links|modes|viewports|all]"
---

# A11y Review

## Role

You are an accessibility reviewer for the things automated scanners miss — keyboard/ARIA behavior,
real contrast, meaning-by-color, link clarity, display modes, and responsiveness.

## Context to load

Load and honor these before acting:
- [Shared accessibility instructions](../../../config/accessibility.md).
- The target file/folder or URL + `config.test_environments` (auth via `playwright-auth` if needed).
  A source-only scope supports inspection and candidates, not fabricated runtime measurements.
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

1. **Resolve.** Source/URL + mode (`all` runs each applicable mode). For a reported bug, read the full original scenario,
   expected behavior, build/control version, flags, role/data and browser/OS/AT/input conditions.
   Authenticate if required. Preserve the reported path; unavailable prerequisites are blockers,
   not non-reproduction. Read-only investigation may continue, but do not infer missing observations.
2. **Review by mode** (via the Playwright MCP / CLI):
   Keep this combined `--mode` interface; use the complete mode procedures below. `all` invokes every applicable mode, not only the first matching widget:
   - **interactive** — tabs, comboboxes, accordions, switches, menus, dialogs, radios, buttons,
     external links: keyboard operability, ARIA state (expanded/selected/checked), focus trapping and
     restoration (WCAG 2.1.1, 2.4.3, 4.1.2).
   - **contrast** — text and UI-component contrast ratios (WCAG 1.4.3, 1.4.11).
   - **color** — information conveyed by color alone (WCAG 1.4.1).
   - **links** — link purpose/ambiguous "click here"; descriptive names (WCAG 2.4.4).
   - **modes** — dark mode, Windows High Contrast / `forced-colors`, `prefers-reduced-motion`.
   - **viewports** — reflow and target size across breakpoints (WCAG 1.4.10, 2.5.8).
   Each mode has a scoped heading below; no separate review skill is required.
   Also use the shared issue families for forms/authentication, tables, language, media,
   timing, pointer alternatives and asynchronous updates; six modes are not the whole WCAG map.
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

The following summaries are quick discovery aids, not unconditional failure rules.
The detailed mode procedures below control applicability, native/custom patterns, actual
measurements, exceptions and evidence requirements. Missing CSS/media queries or an attribute
alone never establishes a violation; verify the user task and relevant criterion.

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

## Detailed mode procedures

The six specialist procedures are maintained here, not as separate skills. Use the main
workflow checklist and select the applicable mode subsections. Mode-local checklists remain
available for focused work; do not create duplicate parallel task lists for the same task.

- [interactive](#mode-interactive)
- [contrast](#mode-contrast)
- [color](#mode-color)
- [links](#mode-links)
- [modes](#mode-modes)
- [viewports](#mode-viewports)

## Mode interactive

### Role

Read-only widget reviewer. Discover the native/custom interaction model before judging roles,
keyboard behavior or state. Do not force every control into an APG example.

### Context to load

Load [shared instructions](../../../config/accessibility.md), existing
Playwright fixtures/tooling, target build and reported browser/OS/AT/input mode. Discover actual
unique locators, source owner and frame/portal/shadow boundaries. No arbitrary first matching
control, fabricated URL or universal Chromium-only harness.

### Workflow

#### Step 0: TodoWrite Checklist

```text
TodoWrite([
  { content: "Confirm original scenario", status: "in_progress" },
  { content: "Discover actual widgets", status: "pending" },
  { content: "Exercise native patterns", status: "pending" },
  { content: "Report evidence and AT gaps", status: "pending" }
])
```

#### Steps

1. Verify app readiness and authenticated final page, role/data/flags and exact control version.
   Missing expected controls are discovery/environment failures, not skipped passes. An absent
   family is not-applicable only with scope inventory evidence.
2. Select relevant rows below and shared scenarios. Test real forward/reverse Tab boundaries,
   entry, activation, dismissal and repeated state changes. Use documented composite navigation;
   not every descendant should Tab. Do not replace boundary tests with an arbitrary six Tabs.
3. Check computed names/roles and referenced labels, not just ARIA attribute presence. Inspect
   rendered focus and required contrast/themes, not `outlineWidth` alone.
4. Investigate timeouts, selector drift, loading/auth problems and wrong activation assumptions
   before reporting product failures. Never change valid behavior to satisfy a bad test template.
5. Use `a11y-test-gen` for durable tests with discovered preconditions, locators, real expected
   action/state/value and retrying assertions. No empty tests, arbitrary sleeps, swallowed errors
   or `test.fail()` to hide missing required coverage.
6. Require actual affected-AT execution for speech, duplicate announcements, voice control or
   timing. DOM/axe are proxies. A pass on one AT does not clear another required combination.

### Widget matrix

| Family | Actual interaction checks |
|---|---|
| Tabs | Manual/automatic activation, orientation/RTL, roving focus, selected state and panel association; manual arrows need not activate |
| Dropdown/combobox | Native select versus custom editable/select-only and popup type; open, active option versus selected value, commit/cancel and supported focus model |
| Accordion | Actual trigger/panel, Enter/Space, expanded and visibility state; do not test another component's first expanded attribute |
| Toggle/switch | Toggle button pressed state versus switch/native checked state, stable name and proper activation; loading is not a pressed toggle |
| Menu/flyout | Action menu versus generic popover, item navigation/activation, Escape and restoration; ordinary navigation need not be an ARIA menu |
| Dialog | Native/custom and modal/non-modal, name, initial focus, close and restoration; containment/background inertness only for actual modal behavior |
| Radio group | Native name/fieldset/legend or supported custom roles, correct group selection and navigation, not just focus on any input |
| Action button | Computed name/role, actual Tab discovery, visible focus, Enter/Space action exactly once, native disabled versus guarded aria-disabled |
| External link | Purpose from programmatic context and actual approved navigation; new-window guidance/security policy are not automatic AA failures |
| Grid/treegrid | Static table versus interactive composite, headers, entry/exit, navigation/edit, sort/select/page and focus after updates |
| Tree | Hierarchy, expand/collapse, focused versus selected node, single/multiple selection, lazy-loading and exit |
| Slider/spinbutton | Real name/value/range and relevant arrows/Home/End/native editing; preserve valid native range and pointer alternatives |
| Tooltip/popover | Noninteractive tooltip versus interactive popup, actual hover/focus trigger, applicable dismissal, hoverability and persistence |
| Toolbar/rich editor | Composite entry/exit, formatting state, commands, native text editing without a trap, generated content structure |
| Date picker | Input format/name/error, selected/current/disabled date, locale-specific navigation, open/close and supported text entry |
| Carousel | Controls/slide information, pause/update applicability, inactive-slide focusability and retained user focus |
| Drag/reorder | Actual single-pointer non-drag path plus keyboard path, cancellation/undo and result; keyboard alone does not establish 2.5.7 |
| Virtualized/infinite | Load/recycle/sort/delete with truthful metadata, stable intended focus/name/selection and reachable content |

Also inspect shortcut scoping, label-in-name, pointer cancellation/target exceptions and focused
controls behind sticky overlays where implicated. Restore only run-owned settings/data.

### Output

Return criterion/applicability, repo/build, route/state, widget pattern, discovered selector,
steps, expected/observed result, `confirmed`/`suspected`/`needs-review` and evidence. Keep
pass/fail/blocked/not-run rows separate per widget/browser/AT. Explicit skips stay untested.
Route approved repairs to `a11y-fix` and requested reports to `a11y-report`; do not edit or close issues.

## Mode contrast

### Role

Read-only contrast specialist. Source color pairs are candidates until actual rendered foreground,
background, font metrics and relevant state are established.

### Context to load

Load [shared instructions](../../../config/accessibility.md), requested
components, theme/token definitions and actual browser conditions. Trace dependent styles for
context without reporting unrelated components.

### Workflow

#### Step 0: TodoWrite Checklist

```text
TodoWrite([
  { content: "Confirm scope and themes", status: "in_progress" },
  { content: "Resolve rendered pairs", status: "pending" },
  { content: "Measure applicable ratios", status: "pending" },
  { content: "Report evidence and gaps", status: "pending" }
])
```

#### Steps

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

### Output

Report target/build, source/selector, state/theme/viewport, actual color/compositing evidence,
font size/weight, unrounded ratio, threshold/exception, criterion, impact/confidence and a
measured candidate alternative. Keep unrendered candidates distinct from confirmed failures;
send approved repairs through `a11y-fix` and report missing browser evidence.

## Mode color

### Role

Read-only specialist for WCAG 1.4.1. Determine whether perceiving color is necessary to
understand information, an action or a state; do not infer a violation from a color token.

### Context to load

Load [shared instructions](../../../config/accessibility.md), the requested
scope and relevant styles/tokens/localization. A source-only scope supports candidates, not
invented rendered observations. Missing scope means ask.

### Workflow

#### Step 0: TodoWrite Checklist

```text
TodoWrite([
  { content: "Confirm scope and state", status: "in_progress" },
  { content: "Inspect visible meaning", status: "pending" },
  { content: "Check valid alternatives", status: "pending" },
  { content: "Report evidence and gaps", status: "pending" }
])
```

#### Steps

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
   against the actual context. Route measured contrast to `a11y-review --mode contrast`.
5. Recommend the smallest visible equivalent only for a proven issue; preserve localization,
   chart information and existing semantics. Route authorized changes to `a11y-fix`.

### Output

For each observation report target/build, state/theme, selector/source, visible meaning/cue,
criterion applicability, observed task impact, evidence, `confirmed`/`suspected`/`needs-review`,
negative case and verification steps. Record blocked/not-run states without claiming a pass.
`aria-invalid`, `aria-required` and accessible-name defects are separate semantic checks.

## Mode links

### Role

Read-only WCAG 2.4.4 specialist. Establish actual link purpose and destination from the computed
name and valid programmatically determined context, not a list of forbidden phrases.

### Context to load

Load [shared instructions](../../../config/accessibility.md), requested
navigation/content and rendered names, relationships and destinations. Source-only findings
remain candidates where runtime context is necessary.

### Workflow

#### Step 0: TodoWrite Checklist

```text
TodoWrite([
  { content: "Confirm link scope", status: "in_progress" },
  { content: "Resolve names and context", status: "pending" },
  { content: "Verify actual destinations", status: "pending" },
  { content: "Report findings and gaps", status: "pending" }
])
```

#### Steps

1. Inventory navigation, repeated cards/articles/products, table links, linked images, downloads,
   skip links and SPA destinations. Resolve actual names, including referenced labels and
   hidden text, plus valid sentence/paragraph/list/table context.
2. Treat "click here", "learn more", bare URLs and identical text with different destinations
   as discovery hints, not violations. Context can satisfy 2.4.4; an isolated links list does not
   erase it. Do not assume nearby visual text is programmatically related.
3. Distinguish an accessible description from the name; `aria-describedby` does not automatically
   add words to the name. For image links assess destination/function and redundant alternatives.
4. Verify approved real navigation and skip-link destination/focus, including dynamic route titles
   and repeated identification. Do not follow destructive/logout links merely for a test.
5. Where purpose is actually missing, prefer clearer visible localized text or an existing valid
   relationship. Preserve visible-label-in-name and IDs in repeated components; do not replace
   a correct visible name with a guessed ARIA override.
6. Keep 2.4.9 link purpose alone (AAA), useful new-window/download notices and security `rel`
   policy separate from AA findings unless an applicable configured policy requires them.

### Output

Report link/source/selector, route/state/build, name versus description, programmatic context,
destination, actual ambiguity/user impact, applicable criterion, evidence/status, minimal
recommendation and verification. Route changes to `a11y-fix`; keep missing navigation evidence
blocked/not-run rather than a passing link test.

## Mode modes

### Role

Read-only review of content, controls and focus under user display settings. Missing media
queries, hard-coded colors or absent dark themes are not automatically WCAG failures.

### Context to load

Load [shared instructions](../../../config/accessibility.md), actual supported
themes/browser/OS and scoped styles/components. Confirm configured policies without importing
organization-specific standards.

### Workflow

#### Step 0: TodoWrite Checklist

```text
TodoWrite([
  { content: "Confirm modes and states", status: "in_progress" },
  { content: "Inspect rendered behavior", status: "pending" },
  { content: "Separate policy and WCAG", status: "pending" },
  { content: "Restore and report", status: "pending" }
])
```

#### Steps

1. Establish normal rendering, then inventory each applicable mode below. Include error,
   expanded, loading, overlay and scrolled states; record actual settings/build and input path.
2. Check visible boundaries/icons/state/focus, text/non-text contrast, content availability and
   actual task completion. Follow relevant tokens/cascade to distinguish source causes.
3. Preserve actual imagery/meaning in forced colors. Shadows may disappear; a necessary focus
   indicator needs a visible system-aware alternative. Not every URL background or hard-coded
   SVG fill disappears. A border alone does not replace an action icon.
4. Test supported real OS high-contrast palettes when required. Browser forced-colors emulation
   is partial evidence, not all OS/browser/AT combinations. Missing required modes stay blocked.
5. Restore only settings/styles owned by the run. Route measured pairs to `a11y-review --mode contrast`,
   reflow to `a11y-review --mode viewports` and authorized fixes to `a11y-fix`.

### Mode matrix

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

### Output

For each state/mode return pass/findings/blocked/not-run/not-applicable with criterion/policy
applicability, actual environment, observed loss, evidence and next action. Separate 2.4.11
entire obscuration from stronger AAA requirements and hover/focus-content rules under 1.4.13.
Do not claim compliance from a screenshot or emulated media flag alone.

## Mode viewports

### Role

Read-only responsive accessibility reviewer. Fixed pixels, long lines or missing breakpoints
identify candidates, not automatic AA failures.

### Context to load

Load [shared instructions](../../../config/accessibility.md), scoped layout,
breakpoint tokens and actual target/browser/state. Preserve intended behavior and valid
two-dimensional content; do not repair overflow by hiding required content.

### Workflow

#### Step 0: TodoWrite Checklist

```text
TodoWrite([
  { content: "Confirm layout and states", status: "in_progress" },
  { content: "Exercise viewport matrix", status: "pending" },
  { content: "Measure reflow and targets", status: "pending" },
  { content: "Report failures and gaps", status: "pending" }
])
```

#### Steps

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

### Output

Report findings by actual viewport/zoom/orientation/state, build, selector/source, observable
lost task/content, dimensions/exception, criterion and evidence/status. A 320px pass does not
prove wider layouts pass. Preserve sampling and untested rows; use `a11y-fix` for approved repair.

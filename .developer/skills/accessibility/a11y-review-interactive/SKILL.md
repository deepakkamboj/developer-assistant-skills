---
name: a11y-review-interactive
description: Review native and custom widgets including grids, trees, dialogs, comboboxes, editors, sliders, drag interactions and virtualized content using discovered keyboard, focus, state and pointer evidence.
argument-hint: "[file, folder or URL]"
---

# Interactive accessibility review

## Role

Read-only widget reviewer. Discover the native/custom interaction model before judging roles,
keyboard behavior or state. Do not force every control into an APG example.

## Context to load

Load [shared instructions](../../../config/accessibility/shared-instructions.md), existing
Playwright fixtures/tooling, target build and reported browser/OS/AT/input mode. Discover actual
unique locators, source owner and frame/portal/shadow boundaries. No arbitrary first matching
control, fabricated URL or universal Chromium-only harness.

## Workflow

### Step 0: TodoWrite Checklist

```text
TodoWrite([
  { content: "Confirm original scenario", status: "in_progress" },
  { content: "Discover actual widgets", status: "pending" },
  { content: "Exercise native patterns", status: "pending" },
  { content: "Report evidence and AT gaps", status: "pending" }
])
```

### Steps

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

## Widget matrix

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

## Output

Return criterion/applicability, repo/build, route/state, widget pattern, discovered selector,
steps, expected/observed result, `confirmed`/`suspected`/`needs-review` and evidence. Keep
pass/fail/blocked/not-run rows separate per widget/browser/AT. Explicit skips stay untested.
Route approved repairs to `a11y-fix` and requested reports to `a11y-report`; do not edit or close issues.

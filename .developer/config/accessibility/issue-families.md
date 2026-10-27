# Issue-family inspection procedures

Use after confirming scope through `a11y-scan`, or during a relevant specialist review.
Read the [coverage map](accessibility-coverage.md) and existing investigation/
prerequisite contracts. These procedures add manual/source/runtime probes to the pinned axe
scan; they do not replace it. Do not execute destructive transactions or change app settings
without authorization. Never manufacture a URL, selector, role, error or observed AT result.

For each applicable family:

1. Identify actual content, controls, owning templates/wrappers and relevant states.
2. Inspect the entire user task, not only source matches or an initial screenshot.
3. Record the failed step, expected/actual result, criterion and evidence. Separate source
   hypotheses from rendered/behavioral confirmation and actual AT evidence.
4. Check the listed counterexamples before confirming. If required execution is unavailable,
   return a coverage gap and exact next action; keep independent authorized source work possible.
5. Route a confirmed repair through `a11y-fix`; never repair from the scanner itself.

## 1. Text alternatives, icons, canvas and data visualization

Criteria: 1.1.1, 1.3.1, 1.3.3, 1.4.1, 1.4.5, 1.4.11.

- Inventory meaningful/decorative images, CSS imagery, SVG, canvas, charts, diagrams, maps,
  CAPTCHA and image controls. Determine whether the content conveys information or a function.
- Inspect the computed accessible name and contextual equivalent. A chart's short label need
  not contain every data value, but users need access to the meaningful relationships/data.
- Check image links/buttons for the action/destination rather than describing the icon's shape.
  Verify chart legend, selected series and error/success state without color alone.
- Inspect available equivalent text/table and actual task completion, not merely `alt` presence.
  Color-only meaning and insufficient contrast are separate tests.
- Do not flag decorative `alt=""`, text already adequately supplied by its named control,
  essential logos or a valid equivalent elsewhere. Do not expose decorative SVG to add noise.

## 2. Structure, reading sequence, navigation and language

Criteria: 1.3.1-1.3.3, 2.4.1-2.4.6, 3.1.1-3.1.2, 3.2.3-3.2.4, 3.2.6.

- Inspect the rendered heading/list/landmark structure in context, including repeated embedded
  components. A heading-level skip or multiple relevant landmarks is not automatically invalid.
- Compare visual/task order with DOM and AT reading order across columns, CSS ordering and
  responsive changes. Identify a lost relationship or changed meaning before confirming.
- Execute skip navigation and verify that the intended destination receives usable navigation/
  focus. Inspect actual page titles and route changes; do not require every SPA transition to
  use one universal focus destination.
- For a set of pages, inventory repeated navigation, equivalent functions and help mechanisms.
  Verify consistent order/identification and available ways to locate content, with exceptions.
- Resolve actual document language and foreign-language passages; do not guess language from a
  product name, code token, loanword or user-generated text alone. Review pronunciation with the
  affected AT where claimed.

## 3. Tables, grids and rich content

Criteria: 1.1.1, 1.3.1-1.3.2, 2.1.1-2.1.2, 2.4.3, 4.1.2.

- Distinguish a static data table, layout structure, interactive data grid, treegrid and editable
  spreadsheet. Do not turn a static table into an ARIA grid just to add keyboard handlers.
- Verify caption/context and row/column associations, including multi-level headers, merged
  cells, sorting, sticky columns and responsive alternatives. `scope` is one technique, not a
  universal requirement when associations are otherwise valid.
- In an interactive grid, test entering/leaving the composite, navigation versus edit mode,
  selection, sorting and paging. A cell editor must retain native text editing where applicable.
- Exercise loading, empty, error and virtualized/reordered states. Check accurate row/column
  metadata when needed, stable names/selection and focus after recycling or deleting an item.
- Rich text editors and contenteditable controls need an actual name, mode/instructions and
  keyboard-accessible tools; inspect output structure as well as the editor chrome.

## 4. Forms, labels, instructions and validation

Criteria: 1.3.1, 1.3.5, 2.4.6, 2.5.3, 3.2.1-3.2.2, 3.3.1-3.3.4, 4.1.2-4.1.3.

- Resolve visible labels, computed names, group legends, hints, formats, required state and
  applicable autocomplete purposes. Placeholder text is not a robust persistent label.
- Test blank, malformed and corrected input on submit and relevant blur/change paths. Use
  approved data, avoiding live financial/legal actions. Check field-specific text and useful
  correction guidance, not just a red border or invalid attribute.
- Verify that error IDs exist when referenced, remain unique across repeated rows/portals, and
  update correctly when errors clear. Native `required` can supply semantics; hidden/non-labelable
  inputs are not subject to a universal text-label test.
- Verify how users discover errors: associated messages, error summary or a justified live
  update/focus strategy. Do not require `role="alert"` on every error or both live output and a
  focus jump that produces duplicate speech.
- Test preservation of entered values, focus after submit, error recovery and review/confirmation
  for covered consequential submissions. Association, visible instructions and speech timing
  are separate acceptance checks.

## 5. Authentication, multistep tasks and cognitive load

Criteria: 2.2.1, 3.3.2-3.3.4, 3.3.7-3.3.8.

- Inspect each actual login/re-authentication step, including password managers, paste, MFA/OTP,
  puzzle/CAPTCHA and any usable alternative. Do not capture credentials in evidence.
- A password field is not itself a failure. Determine whether cognitive tests have a permitted
  assistance mechanism/alternative or applicable object-recognition/personal-content exception.
  Do not require biometric/passwordless authentication or disable security controls as a fix.
- Test pasting a whole OTP and available supported filling mechanisms; do not confuse a
  deliberate security policy with a conformance exception without proving the criterion.
- Track information already supplied in the same process. Check auto-population/selectability
  before calling repeated entry a 3.3.7 issue; security, essential and no-longer-valid exceptions
  need evidence. Different processes are not automatically one process.
- Inspect timeout warning, extension method, remaining time and preservation/recovery of task
  data. Use an authorized test session, not a destructive forced logout in production.
  Under the extension option of 2.2.1, check at least 20 seconds to perform a simple extension
  action and at least ten extensions; evaluate turn-off/adjustment alternatives and exceptions
  against the actual criterion rather than demanding this option for every time limit.

## 6. Dynamic updates, SPA routes and asynchronous work

Criteria: 1.3.2, 2.4.2-2.4.3, 3.2.1-3.2.2, 4.1.2-4.1.3.

- Inventory loading/results/empty/error/success, background saves, chat/log entries and user-
  initiated route/filter changes. Determine which updates meet the definition of a status message.
- Trigger the actual update and inspect timing, insertion/removal, accessible properties and
  focus. A live-region attribute alone does not prove delivery; a missing same-file region does
  not prove failure if a shared announcer or native behavior already handles it.
- Check announcements for duplicates, stale results, excessive verbosity and interrupted input.
  Do not add a live region around an entire application or move focus for every status update.
- A focused element removed by rendering needs a logical successor, not an unconditional focus
  reset to the document. Use actual route/dialog/task context and preserve user initiative.
- `aria-busy` describes an updating region; `aria-pressed` describes a toggle, not a save-in-progress
  action. A named progressbar and a timely completion status have different responsibilities.

## 7. Keyboard, overlays and complex interactions

Criteria: 2.1.1-2.1.2, 2.4.3, 2.4.7, 2.4.11, 4.1.2.

- Use `a11y-review-interactive` for the discovered pattern. Trace Tab/Shift+Tab through actual
  boundaries and use documented composite navigation; do not require every descendant to Tab.
- Test entry, activation, selection, dismissal, repeated open/close and restoration. Test
  scrolled/sticky/portal/zoom states where focused controls can be entirely obscured.
- Distinguish modal containment from a keyboard trap with no usable exit. Native dialogs,
  disclosures and selects need behavior checks, not automatic replacement with custom ARIA.
- Menus, listboxes and ordinary navigation links are not interchangeable roles.
  Read-only, native disabled and `aria-disabled` controls have different operability contracts.

## 8. Pointer, touch, dragging, shortcuts and device motion

Criteria: 2.1.4, 2.5.1-2.5.4, 2.5.7-2.5.8.

- Try the function without multipoint/path gestures or dragging. Keyboard support alone does
  not prove the single-pointer alternative required by 2.5.7; test an actual click/tap path.
- Inspect down/up events and leaving/cancelling a target before release. Check undo/abort and
  any essential-event exception; do not ban all down-event handling indiscriminately.
- Measure actual hit areas and nearby targets for 2.5.8; include the criterion's exceptions.
  Distinguish WCAG 2.2's 24px/spacing rule from AAA or confirmed stricter configured product targets.
- Test single-character shortcuts while focus is in and outside the component, including dictation/
  text input. Support scoped focus, remapping or disabling as applicable.
- For motion activation, inspect a UI equivalent and the setting to disable motion response.
  Do not claim hardware/voice/touch behavior from a synthetic DOM event alone.

## 9. Visual presentation, resizing and display modes

Criteria: 1.3.4, 1.4.1, 1.4.3-1.4.5, 1.4.10-1.4.13, 2.4.7, 2.4.11.

- Delegate measurements to contrast/color/modes/viewports skills and retain all their evidence.
  Test zoom, text spacing, portrait/landscape and meaningful intermediate widths, not just named devices.
- Exercise tooltips, validation, expanded navigation, dialogs and long/localized content in
  those modes. A screenshot of the default state cannot cover error/popover focus or clipping.
- For hover/focus content, test moving onto it, dismissing it without changing hover/focus where
  required, and persistence while still needed. Distinguish HTML tooltip/title exceptions.
- Do not require particular breakpoints, pixel units, an underline on every standalone link or
  a dark theme to claim AA. Demonstrate the actual criterion failure and apply product policy separately.

## 10. Audio, video, moving content and time limits

Criteria: 1.2.1-1.2.5, 1.4.2, 2.2.1-2.2.2, 2.3.1.

- Inventory prerecorded/live, audio-only/video-only/synchronized media, autoplay and controls.
  Determine whether content is an explicitly labeled alternative and which exceptions apply.
- Verify caption accuracy, synchronization, speaker/non-speech information and available user
  control. A `<track>` tag or a subtitles language track alone does not prove captions.
- Check whether needed visual information is available through an appropriate description/
  alternative for 1.2.3 and specifically audio description for 1.2.5. Do not substitute a transcript
  for every media requirement or require descriptions of visuals already adequately narrated.
- Operate player controls, captions, settings, scrubber and fullscreen with applicable keyboard/AT
  paths. Third-party ownership is not proven by an iframe alone; trace allowed configuration/source.
- Check qualifying autoplay audio, moving/auto-updating content and time limits with applicable
  controls/exceptions. Reduced-motion preference is not a universal AA ban on animation.
- Avoid triggering suspected unsafe flashing; use safe existing measurements or an approved
  specialist evaluation and record blocked coverage if needed.

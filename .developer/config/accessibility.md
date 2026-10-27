# Accessibility guidance

One maintained document for shared accessibility instructions, WCAG coverage, inspection,
repair, scenario verification and optional private policy templates. Read shared instructions
first, then select the sections applicable to the authorized task; headings do not imply that
every section has been executed or every criterion applies.

- [Shared instructions](#shared-instructions)
- [WCAG coverage and routing](#wcag-coverage-and-routing)
- [Issue-family inspection procedures](#issue-family-inspection-procedures)
- [Evidence-led repair playbook](#evidence-led-repair-playbook)
- [Scenario-specific verification and test authoring](#scenario-specific-verification-and-test-authoring)
- [Optional organization standard template](#optional-organization-standard-template)
- [Optional screen-reader notes template](#optional-screen-reader-notes-template)

## Shared instructions

Load this file before any accessibility workflow. This is the single maintained source for
shared procedures; skills retain their own roles and select sections by scope.
Resolve paths relative to the installed `.developer` plugin, not a hard-coded checkout.

### Context and scope

Resolve `DEVELOPER_CONFIG` (fallback `~/.developer/config.json`), companion `content.md`,
`memory.md` and `notes.md` using existing repository conventions. Missing optional files are not
proof that a required target, permission or environment is available. Remembered fixes are
hypotheses until their scenario, source owner and resolved package version match.

Confirm the authorized target, original task, expected behavior, WCAG version/level, route,
role/data/flags, build and relevant browser/OS/AT/input/language/theme. No target means ask,
not scan or edit everything. Preserve narrower caller scopes. A comprehensive scan inventories
all applicable families; a targeted repair checks its cause and affected neighbors.

### Shared coverage routing

- [Coverage map](#wcag-coverage-and-routing): all 55 WCAG 2.2 A/AA criteria, WCAG 2.1 boundaries,
  exceptions, thresholds and specialist routing.
- [Issue-family procedures](#issue-family-inspection-procedures): ten source/runtime/manual inspection families.
- [Repair playbook](#evidence-led-repair-playbook): ten native-first repair families, used only after
  the investigation contract in `a11y-fix` establishes cause and ownership.
- [Scenario checks](#scenario-specific-verification-and-test-authoring): twenty baseline/candidate, negative-case and adjacent
  regression scenarios for `a11y-test-gen` and independent `a11y-verify`.

These are operational instructions, not new detectors, pre-executed tests, guaranteed compliance
or a bundled execution/baseline framework. Use existing output fields and report unsupported
details as explicit evidence rather than inventing a second schema.

Use the single `a11y-review` skill with `--mode interactive|contrast|color|links|modes|viewports|all`.
Its detailed mode headings contain the full specialist procedures. Select every applicable mode,
share evidence and deduplicate only equivalent observations, not entire categories.

### Prerequisites and evidence

Use the target's pinned tools, configured startup/readiness and approved authentication fixtures.
Use `prereq-check` for missing capabilities. Never silently install packages or browsers, sign in,
enable/edit MCP servers, weaken browser/security controls or change application configuration.
Verify tools and required target access with read-only operations; registration/version presence
is not usability. Confirm the final intended page, not an HTTP-200 login/error page.

When blocked, give exact platform-appropriate steps to install from an official source, configure
the target, authenticate interactively, verify read-only access and retry the original operation.
Obtain approval before changes. Do not collect credentials in chat or persist tokens/cookies.
Stop dependent checks; independently justified authorized source investigation may continue.
Record `missing`, `unauthenticated`, `unauthorized`, `startup-failed`, `unreachable` and
`not-checked` separately. No global ready/pass from partial evidence.

Keep reviews read-only. Source patterns identify candidates until criterion applicability and
behavior are proven. Use `confirmed`, `suspected` or `needs-review`; record applicable family
rows as `passed`, `findings`, `blocked`, `not-run` or `not-applicable` with reasons.
An absent widget is not-applicable only after inspecting the authorized scope.

Use all supported A/AA axe tags for the selected version. Inspect available tags, including
`wcag22a` when supported; disclose unavailable tags/rules and preserve `incomplete`, inaccessible
frames/shadow boundaries and untested states. Do not suppress failures or accept changed debt
to pass. A clean axe scan or accessibility-tree snapshot cannot establish speech, voice control,
timing or the whole user task. Use actual affected-AT execution or attributable tester evidence;
never substitute a different AT/input path or invent predicted speech as observation.

### Repair, verification and reporting

Follow `a11y-fix` for runtime-to-source ownership, search ledger, competing causes and bounded
repair attempts. Reuse existing native/design-system APIs at their actual resolved versions.
No repair from the first source match, generic ARIA recipe or unverified memory.
An environment-pending source repair is not a verified fix.

Keep baseline/candidate provenance, exact consumer build, original scenario and required matrix rows. Known failures
take precedence over unavailable checks. Independent `a11y-verify` returns `Fixed`, `Not fixed`,
`Fixed but new issues`, `Blocked` or `Inconclusive`; it does not edit assertions/source to pass.
Use `a11y-report` for existing Markdown/HTML reports; preserve unknowns and separate configured
policy findings from WCAG. Invocation, code edits or a draft PR do not set verified status.

Apply optional `accessibility_standard_file` and `screen_reader_notes_file` only when configured,
in addition to WCAG. Cite their actual source/version; do not embed organization-specific policy.
Keep AA requirements, AAA guidance, product decisions and security concerns distinct.

Publish or update GitHub issues/PRs only with the configured permission and approval.
Merge and issue closure remain explicit human actions. Stop only processes owned by the run,
restore authorized temporary settings, and sanitize evidence before sharing.

## WCAG coverage and routing

Use this map for technical scans, reviews, development, repair and independent verification,
including issue-driven entry points. It supplements, not replaces, the investigation contract
in [a11y-fix](../skills/accessibility/a11y-fix/SKILL.md) and the
[shared instructions](#shared-instructions).
There is no new runtime, public command, automatic repair or certification here.

### Select work from the actual scenario

1. Confirm the authorized page/component/source scope, WCAG version, product policy, role,
   language, input mode, states and affected browser/AT. Do not broaden a targeted repair into
   an unapproved audit. For a comprehensive scan, inventory every applicable family below.
2. Use the [issue-family procedures](#issue-family-inspection-procedures) for content,
   semantics, forms, dynamic updates, authentication, media and time/input behavior. Retain the
   existing base scan and specialist reviews; an axe rule list is not this coverage map.
3. Use `a11y-review --mode interactive` for actual native/custom widget patterns; `a11y-review --mode contrast`,
   `a11y-review --mode color`, `a11y-review --mode links`, `a11y-review --mode modes` and `a11y-review --mode viewports`
   retain their specialist responsibilities. Share evidence instead of counting one defect twice.
4. A confirmed issue enters `a11y-fix` with the
   [repair playbook](#evidence-led-repair-playbook). Use
   [scenario checks](#scenario-specific-verification-and-test-authoring) for `a11y-test-gen`
   and independent `a11y-verify`. Do not apply a catalog fix before proving source ownership.
5. Report per-family/criterion applicability, executed method, states and evidence. Reuse existing
   output fields; no second artifact format is required. If a format cannot express a detail,
   keep it in its supported narrative/evidence fields rather than dropping it.

For each applicable check record `passed`, `findings`, `blocked`, `not-run` or `not-applicable`
with a reason and evidence. These are coverage descriptions, not new top-level artifact enums.
Static-only candidates stay `suspected`/`needs-review` where rendering or behavior is required.
A missing environment does not block independently justified source repair, but prevents a claim
that runtime/AT verification passed. Missing media/widgets can be not-applicable only after
inventorying the authorized scope; absence on the first screen does not cover hidden states.

### Criterion-to-probe map

This indexes all 55 WCAG 2.2 A/AA criteria, not all possible accessibility needs. The descriptions
are inspection prompts, not replacements for the criterion text, exceptions or conformance rules.

| Criterion | Level | Inspect and test |
|---|---|---|
| 1.1.1 | A | Purpose of images/icons/canvas/charts, functional image names, decorative exclusions and equivalent information |
| 1.2.1 | A | Alternatives for prerecorded audio-only/video-only, with applicable exceptions |
| 1.2.2 | A | Accurate synchronized captions for prerecorded synchronized media, not just a track element |
| 1.2.3 | A | Prerecorded synchronized media description or an appropriate media alternative |
| 1.2.4 | AA | Captions on live synchronized media; prerecorded captions do not satisfy live coverage |
| 1.2.5 | AA | Audio description of necessary prerecorded visual information; a transcript alone is not this AA check |
| 1.3.1 | A | Heading/list/landmark, form grouping, table associations and structural relationships |
| 1.3.2 | A | Meaningful reading sequence after CSS layout, portal placement and responsive changes |
| 1.3.3 | A | Instructions that depend only on shape, sound, position or other sensory characteristics |
| 1.3.4 | AA | Portrait/landscape access; assess essential-orientation exceptions |
| 1.3.5 | AA | Supported input-purpose tokens for fields collecting information about the user |
| 1.4.1 | A | Visible non-color meaning for states, charts, errors and links |
| 1.4.2 | A | Automatic audio longer than three seconds and independent pause/stop/volume control |
| 1.4.3 | AA | Actual text contrast, font size/weight, compositing and applicable exceptions |
| 1.4.4 | AA | Text can reach 200% without loss of content/function; do not substitute device viewport resizing |
| 1.4.5 | AA | Images of text versus actual text; essential/customizable exceptions such as logos |
| 1.4.10 | AA | Reflow at 320 CSS px width or 256 CSS px height for the relevant writing direction, with 2D exceptions |
| 1.4.11 | AA | Necessary component/state/graphic identification against adjacent colors, with exceptions |
| 1.4.12 | AA | Combined text-spacing overrides without lost content/function |
| 1.4.13 | AA | Additional hover/focus content is dismissible, hoverable and persistent as applicable |
| 2.1.1 | A | Every non-path-dependent function works through a keyboard interface |
| 2.1.2 | A | Keyboard can leave components; disclose any required nonstandard exit method |
| 2.1.4 | A | Single-character shortcuts can be disabled/remapped or work only with appropriate focus |
| 2.2.1 | A | Author-controlled time limits can be disabled/adjusted/extended unless an exception applies |
| 2.2.2 | A | Qualifying moving, blinking, scrolling and auto-updating information can be paused/stopped/hidden/controlled |
| 2.3.1 | A | Flashing thresholds or avoidance; do not deliberately expose users to unsafe flashing to test it |
| 2.4.1 | A | Mechanism to bypass repeated blocks; test destination and focus behavior |
| 2.4.2 | A | Page title describes purpose and updates appropriately for the actual SPA route |
| 2.4.3 | A | Meaningful focus order through navigation, overlays, errors and removal of focused items |
| 2.4.4 | A | Link purpose from its name or valid programmatic context, not an isolation-only AAA requirement |
| 2.4.5 | AA | More than one way to locate pages in a set, except steps/results in a process |
| 2.4.6 | AA | Headings and labels describe topic or purpose |
| 2.4.7 | AA | Focus is visibly discoverable in actual required themes/states |
| 2.4.11 | AA | Focused component is not entirely hidden by author-created content; apply criterion notes |
| 2.5.1 | A | Multipoint/path-based gesture functions have a single-pointer alternative unless essential |
| 2.5.2 | A | Pointer actions support cancellation/undo or completion on up-event unless an exception applies |
| 2.5.3 | A | Accessible name includes visible label text in the correct order |
| 2.5.4 | A | Motion-actuated functions have UI alternatives and can disable actuation unless excepted |
| 2.5.7 | AA | Dragging functions have a single-pointer non-drag alternative unless essential/UA-controlled |
| 2.5.8 | AA | Pointer targets meet 24 CSS px minimum or a valid spacing/equivalent/inline/UA/essential exception |
| 3.1.1 | A | Actual page language is programmatically available |
| 3.1.2 | AA | Language changes in passages/phrases are identified, accounting for listed exceptions |
| 3.2.1 | A | Receiving focus does not unexpectedly change context |
| 3.2.2 | A | Changing input settings does not unexpectedly change context without prior advice |
| 3.2.3 | AA | Repeated navigation has consistent relative order within the page set |
| 3.2.4 | AA | Repeated functions are identified consistently within the page set |
| 3.2.6 | A | Repeated help mechanisms retain consistent relative placement unless changed by the user |
| 3.3.1 | A | Detected input errors identify the affected field and describe the error in text |
| 3.3.2 | A | Labels/instructions explain required input and constraints before users need them |
| 3.3.3 | AA | Known correction suggestions are supplied unless security/purpose exceptions apply |
| 3.3.4 | AA | Covered legal/financial/data/test submissions are reversible, checked or confirmed |
| 3.3.7 | A | Previously supplied information in the same process is reused/selectable unless excepted |
| 3.3.8 | AA | Authentication avoids unsupported cognitive tests; inspect allowed assistance/alternative exceptions |
| 4.1.2 | A | Computed names/roles/states/values and change notifications match the actual control |
| 4.1.3 | AA | Qualifying status messages are exposed without moving focus; not every DOM update is a status |

For a WCAG 2.1 target, exclude 2.2-only additions: 2.4.11, 2.5.7, 2.5.8, 3.2.6, 3.3.7 and 3.3.8.
WCAG 4.1.1 Parsing is part of 2.1 and removed from 2.2. Keep any applicable 2.1 policy check
separate; do not relabel every markup error as a 2.2 failure. Semantic breakage can still affect
1.3.1 or 4.1.2 independently.

### Thresholds and false-positive boundaries

- 1.4.3 uses 4.5:1 normal text and 3:1 large text (18pt/24 CSS px, or 14pt/about 18.67 CSS px
  bold), with exceptions. Apply independently verified stricter configured product policy separately.
- 1.4.11 is not a requirement for every border or decoration to contrast 3:1. Identify the visual
  information necessary to perceive the component, state or graphic first.
- For 1.4.12 apply line height 1.5 times font size, paragraph spacing 2 times, letter spacing
  0.12em and word spacing 0.16em together; preserve supported language/writing-system exceptions.
- 2.4.11 AA concerns an entirely obscured component. Requiring no partial obscuration is the
  enhanced AAA criterion, not the AA threshold. Keep focus visibility and geometry distinct.
- 2.5.8 uses the actual hit target, not the icon artwork. For the spacing exception, 24px-diameter
  circles centered on undersized targets must not intersect another target or such circle.
  44px under 2.5.5 is AAA; a confirmed stricter product target remains additional policy.
- 2.3.3 reduced-motion interaction animation and 2.4.13 focus appearance are AAA. Retain
  applicable configured product requirements and recommendations without presenting them as WCAG AA.
- APG keyboard patterns and HTML/ARIA specifications guide correct implementation. A departure
  from an APG example is not alone proof of a WCAG failure; demonstrate the affected requirement.
- Native controls can supply role, name and state without explicit ARIA. `required` is not
  inherently broken; adding `aria-required` or `role="button"` universally is not a repair.

### Authoritative references and policy evidence

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) and [WCAG 2.1](https://www.w3.org/TR/WCAG21/).
- [Understanding WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/).
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) and
  [ARIA in HTML](https://www.w3.org/TR/html-aria/).
- For an optional configured organization overlay, record the actual source/version/section.
  If authoritative material is unavailable, disclose the policy-verification gap. Do not invent
  identifiers, waive recorded stricter policy or infer observed AT behavior.

## Issue-family inspection procedures

Use after confirming scope through `a11y-scan`, or during a relevant specialist review.
Read the [coverage map](#wcag-coverage-and-routing) and existing investigation/
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

### 1. Text alternatives, icons, canvas and data visualization

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

### 2. Structure, reading sequence, navigation and language

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

### 3. Tables, grids and rich content

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

### 4. Forms, labels, instructions and validation

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

### 5. Authentication, multistep tasks and cognitive load

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

### 6. Dynamic updates, SPA routes and asynchronous work

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

### 7. Keyboard, overlays and complex interactions

Criteria: 2.1.1-2.1.2, 2.4.3, 2.4.7, 2.4.11, 4.1.2.

- Use `a11y-review --mode interactive` for the discovered pattern. Trace Tab/Shift+Tab through actual
  boundaries and use documented composite navigation; do not require every descendant to Tab.
- Test entry, activation, selection, dismissal, repeated open/close and restoration. Test
  scrolled/sticky/portal/zoom states where focused controls can be entirely obscured.
- Distinguish modal containment from a keyboard trap with no usable exit. Native dialogs,
  disclosures and selects need behavior checks, not automatic replacement with custom ARIA.
- Menus, listboxes and ordinary navigation links are not interchangeable roles.
  Read-only, native disabled and `aria-disabled` controls have different operability contracts.

### 8. Pointer, touch, dragging, shortcuts and device motion

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

### 9. Visual presentation, resizing and display modes

Criteria: 1.3.4, 1.4.1, 1.4.3-1.4.5, 1.4.10-1.4.13, 2.4.7, 2.4.11.

- Delegate measurements to contrast/color/modes/viewports skills and retain all their evidence.
  Test zoom, text spacing, portrait/landscape and meaningful intermediate widths, not just named devices.
- Exercise tooltips, validation, expanded navigation, dialogs and long/localized content in
  those modes. A screenshot of the default state cannot cover error/popover focus or clipping.
- For hover/focus content, test moving onto it, dismissing it without changing hover/focus where
  required, and persistence while still needed. Distinguish HTML tooltip/title exceptions.
- Do not require particular breakpoints, pixel units, an underline on every standalone link or
  a dark theme to claim AA. Demonstrate the actual criterion failure and apply product policy separately.

### 10. Audio, video, moving content and time limits

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

## Evidence-led repair playbook

Load only the relevant families after the [investigation contract](../skills/accessibility/a11y-fix/SKILL.md)
establishes scenario, eligibility, owner and causal evidence. Use the
[coverage map](#wcag-coverage-and-routing) for criterion applicability and exceptions.
These are repair hypotheses, not a bulk autofix registry. Preserve all existing scope,
localization, dependency, source/provider and tracker lifecycle safeguards.

### Repair decision

1. State which user task fails and which concrete source behavior causes it. Compare competing
   causes for non-trivial cases, including wrappers, version-specific library behavior and product data.
2. Inspect the design system's existing native/component API at the actual resolved version.
   Prefer its supported fix over creating a second focus, label, event or live-region mechanism.
3. Choose the smallest complete repair at the proven owner. Trace siblings and consumers;
   request approval for shared scope, behavior decisions or dependency changes.
4. Identify the precise baseline failure, candidate expectation, negative case and adjacent
   regression before editing. Use [scenario checks](#scenario-specific-verification-and-test-authoring).
5. Run source/unit checks and the applicable actual UI/AT scenario. Missing environment may
   permit a justified source repair and environment-pending draft, never a verified claim.

### 1. Semantics, accessible names and text alternatives

- Replace an action-like generic element with a native button or use the existing component API,
  preserving styles, event behavior, form `type`, disabled behavior, analytics and localization.
  Do not add both native activation and a key handler that fires the action twice.
- Preserve visible label wording in the computed name. Reuse real visible text/label references
  before inventing `aria-label`; decorative children should not pollute the name.
- For image controls, name the action/destination; for informative media, supply a contextual
  equivalent. Retain intentionally decorative empty alternatives and avoid redundant descriptions.
- Charts/canvas may need an equivalent summary/data representation plus accessible controls,
  not a paragraph squeezed into one label. Product-specific information equivalence needs review.
- Test computed role/name, actual user task, visible-label matching, localization and duplicate
  names in the actual repeated-component context.

### 2. Structure, tables, languages and navigation

- Correct actual relationships with semantic headings/lists/landmarks or supported table headers.
  Do not renumber unrelated headings from a source regex or add ARIA grid behavior to a static table.
- Complex headers need correct associations through spanning/nested headers and responsive views;
  select the supported `scope` or `headers` technique rather than requiring both everywhere.
- Fix meaningful reading/focus sequence in source/layout rather than applying positive tabindex
  to imitate a screenshot. Preserve visual and AT meaning after reflow.
- Bind page/route title and language to actual localized content. Do not infer language from a
  product acronym or overwrite content locale with the developer's language.
- Make skip navigation target usable and preserve repeated navigation/help consistency.
  A route focus change should serve the actual navigation task, not fire on every render.

### 3. Forms, error recovery and consequential submissions

- Use an actual visible label with native association or the supported component label slot;
  preserve wrapped labels and fieldset/legend groups. Keep hint/error IDs unique and present.
- Native `required` is valid. Add custom required semantics only for the actual pattern or
  demonstrated browser/AT interoperability need, not as a global screen-reader workaround.
- Present required/format instructions before submission, specific text errors after detection,
  and correction guidance where known. Set invalid state only when there is an error.
- Choose an error discovery strategy appropriate to the task: associated inline errors, a
  summary or targeted status announcement. Do not combine indiscriminate alerts, assertive
  regions and focus jumps that interrupt typing or announce the same error repeatedly.
- Preserve entered values and security constraints. For covered consequential submissions, use
  the product's approved review/check/reverse mechanism; do not invent business rules or transactions.
- Test no-error -> error -> corrected -> resubmitted and multiple errors, keyboard recovery,
  programmatic relationships, visual indication and the affected actual AT response.

### 4. Keyboard, focus, disabled controls and overlays

- Reuse native keyboard activation and documented composite navigation. A list of links does not
  become an ARIA menu merely to gain arrow handlers. Retain text editing and browser shortcuts.
- Repair focus entry/restoration at the correct event/lifecycle boundary with stable references.
  Avoid arbitrary sleeps, repeated focus effects, positive tabindex and focusing hidden nodes.
- A modal needs a usable exit and appropriate containment/background behavior. Non-modal UI
  must allow leaving. Prefer native/supported library behavior; do not layer competing focus traps.
- Preserve focus after deletion, async replacement, sorting, pagination and virtualization using
  a logical surviving item or next task control, not an unconditional jump to page start.
- Handle sticky author-created overlays so focused controls are not entirely hidden. Distinguish
  AA obscuration from stricter AAA/product requirements; do not disable sticky UI indiscriminately.
- Native `disabled` prevents activation; `aria-disabled` does not. If the actual pattern keeps a
  disabled item discoverable, guard all activation paths and preserve its expected focus model.

### 5. Composite widgets and rich applications

- Tabs need one coherent activation/focus model and panel association. Preserve manual/automatic
  selection, orientation, RTL and focusability of panel content.
- Comboboxes need the correct editable/select-only and popup pattern. Keep active option distinct
  from selected value, valid active-descendant references and supported focus management.
- Trees/grids/treegrids need consistent navigation, hierarchy/selection/edit state and stable
  focus across virtualization. Do not fabricate row counts/positions or labels for unloaded data.
- Sliders/spinbuttons need meaningful value/range and relevant keyboard actions. Do not add
  value attributes to unrelated controls or implement a custom slider when native range suffices.
- Menus/toolbars/date pickers/editors require pattern-specific navigation and instructions;
  copying a role list without the corresponding interaction behavior is not a complete repair.
- Verify every affected interaction and sibling consumer; do not treat a passing simpler demo
  or different library major version as evidence that the reported app is fixed.

### 6. Status, loading, progress and SPA updates

- Reuse a scoped, stable existing status mechanism. Update text for meaningful completion/error/
  results states and avoid replacing the entire application with a live region.
- Use `aria-busy` on the actual updating region where appropriate. A save operation is not a
  pressed toggle. Use `aria-pressed` only when users toggle a persistent pressed state.
- For determinate progress, expose an actual name and current/range values; omit a fabricated
  current value for indeterminate progress. Announce useful transitions without excessive chatter.
- Preserve user focus unless the original task requires a justified move. Inspect stale-request
  races and duplicate announcers at wrappers/portals before adding a new region.
- Verify actual affected-AT delivery/timing, not only DOM attributes or predicted speech strings.

### 7. Contrast, color, display modes and responsive layouts

- Repair actual foreground/background compositing and required graphical/state boundaries,
  using existing tokens. Do not apply a text threshold to every decoration or round failures up.
- Add an equivalent visible non-color cue where meaning depends on color; ARIA alone does not
  fix the visible problem. Preserve labels, legends and localized explanations.
- Keep a visible focus treatment across actual themes/forced colors. Prefer system-aware
  outlines/borders where needed; do not disable forced-color adaptation globally.
- Permit text enlargement/spacing and reflow without hidden content or lost actions. Use flexible
  constraints and scrolling for valid 2D content rather than hiding overflow or shrinking text.
- Hover/focus content needs applicable dismissal/hoverability/persistence behavior. Do not remove
  tooltips or required instructions just to eliminate a failing overlay.
- Retest zoom, text spacing, orientation, long localized text and affected expanded/error states.

### 8. Pointer alternatives, targets and shortcuts

- Provide an actual click/tap alternative for dragging and path/multipoint gestures. Preserve
  keyboard alternatives too; these are different requirements.
- Enlarge the real hit area or adjust spacing using the applicable criterion and exceptions;
  merely enlarging an SVG or imposing 44px as universal WCAG AA is not sufficient reasoning.
- Preserve pointer cancellation and prevent unintended irreversible down-event activation.
  Review essential-event exceptions and all click/touch/pen paths before changing handlers.
- Scope/remap/disable single-character shortcuts as applicable, without capturing text input.
  Motion actuation needs an appropriate UI alternative and disable mechanism.

### 9. Authentication, repeated entry and timing

- Allow supported password manager/paste mechanisms or an approved authentication alternative
  where needed. Preserve security controls and coordinate policy decisions with the owner.
- Reuse/select information already provided in the same process unless an applicable exception
  is established. Do not cache sensitive data in logs, URLs or unapproved client storage.
- Use an accessible warning/extension flow for applicable time limits while preserving task
  data. A required security timeout must be assessed against the actual exception, not removed
  speculatively. Test warning focus, timing and recovery using approved test sessions.

### 10. Media and automatically changing content

- Fix missing/inaccurate captions or descriptions in the actual media delivery pipeline.
  A tag, generic transcript or empty caption file is not an equivalent correction.
- Preserve keyboard/AT operation of media controls and applicable autoplay audio controls.
  Do not automatically mute/remove meaningful content or break the player's supported APIs.
- Provide applicable pause/stop/hide/update-frequency controls for qualifying movement/updates.
  Respect essential exceptions; reduced-motion support is not permission to remove task feedback.
- Route suspected unsafe flashing to safe specialist evaluation; do not generate or replay it.

### Completion evidence

Return source owner/version, failing task/criterion, causal explanation, exact changes, local
checks and actual scenario/AT coverage. Include unresolved rows and negative-case regressions.
Preserve the original issue history, full repair handoff, publication approval and
independent verification. No playbook entry authorizes closing
a bug, updating acceptance baselines, upgrading a dependency or merging a PR automatically.

## Scenario-specific verification and test authoring

Use with `a11y-verify` and `a11y-test-gen`, after confirming the original defect and actual
builds. The [coverage map](#wcag-coverage-and-routing) determines applicability;
the [repair playbook](#evidence-led-repair-playbook) supplies hypotheses, not verdicts.
These are Markdown procedures to instantiate with inspected controls and existing tooling,
not pre-run tests or claims of product coverage.

### Evidence for each chosen scenario

- Original task, criterion/exception, discovered element and expected user outcome.
- Baseline/candidate commits and consumer builds; browser/OS/AT/input/theme/locale as relevant.
- Actual interaction sequence, observed failure before and corresponding result after.
- Automated assertions versus manual/actual-AT observations, separately. An accessibility-tree
  name/state assertion does not verify speech order, announcement timing or voice control.
- An appropriate negative/control case proving the test does not reject a valid alternative.
- Neighboring task/sibling regression and unavailable rows. Missing required evidence stays
  blocked/inconclusive; a known remaining failure takes precedence.

When automation is justified, demonstrate baseline failure for the intended reason and candidate
success. A timeout, selector drift, missing auth or tool crash is not that baseline failure.
For manual-only AT defects, automated proxies may pass on both builds; retain attributable
before/after actual-AT evidence instead of inventing a failing automated assertion.

### Scenario library

| ID | Scenario and observable acceptance | Negative/control case and coverage boundary |
|---|---|---|
| S01 | Icon action: keyboard reaches the actual control; computed name/role identify its function; Enter/Space perform the action once | Decorative icon inside an already named button must not be named again; no duplicate native key activation |
| S02 | Labeled input/group: visible label matches computed name; required state/instructions/group context are available | Wrapped labels/native required are valid; exclude hidden/non-labelable inputs |
| S03 | Validation: submit approved invalid data, identify text errors, discover affected fields, correct and resubmit without lost data | No stale invalid state/dangling error IDs; don't require an alert on every error |
| S04 | Status/results: trigger real loading/results/success/error transitions without moving focus unnecessarily | Existing shared announcer is valid; inspect actual AT delivery for duplicates/missed messages, not attribute presence |
| S05 | Modal/non-modal: name, entry, keyboard traversal, exit and logical restoration behave for the actual pattern | Containment is required for an actual modal, not all popovers; native semantics need not be repeated as ARIA |
| S06 | Tabs/combobox: actual activation, active/selected value, panel/popup and focus model remain consistent | Manual tabs/native select are valid; active option and selected value need not always coincide |
| S07 | Grid/tree/editor: navigate, edit/select, load/reorder/remove and leave using documented behavior | A static table needs no arrow-key grid model; virtualized nodes must not leave focus on a recycled wrong item |
| S08 | Table/structure: read representative simple/complex cells with correct associations; inspect heading/list and meaningful sequence | No universal requirement for both `scope` and `headers`, a single h1, or no heading-level skips |
| S09 | Content alternative: perform the actual information/function task without relying on the image/canvas/chart alone | Decorative empty alt and a complete contextual equivalent can be valid; compare actual information, not string length |
| S10 | Contrast/color: measure actual applicable text/graphic/state pairs and verify visible non-color meaning | Account for required visual identification and disabled/decorative exceptions; ARIA cannot replace a visible cue |
| S11 | Resize/reflow/spacing: operate the same expanded/error states at 200% text, required 320px/256px equivalent reflow and combined spacing | Necessary 2D content can scroll in two dimensions; no prescribed breakpoint count or CSS unit is required |
| S12 | Focus/overlay/tooltip: traverse forward/backward at scroll/zoom boundaries; focus is visible and not entirely obscured; relevant extra content can be dismissed/reached | Partial obscuration is not automatically 2.4.11 AA failure; account for actual hover/focus-content exceptions |
| S13 | Pointer/drag: complete the same operation using actual click/tap without dragging; test cancel/abort/up-event paths | A keyboard-only alternative does not prove single-pointer non-drag access; apply essential/UA exceptions |
| S14 | Target size: measure actual hit areas/positions at relevant responsive states; apply the 24px rule or a documented exception | Inline, spacing, equivalent, unmodified-UA and essential exceptions are not automatic failures; apply verified stricter configured policy separately |
| S15 | Authentication: test supported manager/paste/OTP assistance and an approved alternative across the actual login process | Do not require a passwordless flow or capture secrets; a credential field alone does not establish failure |
| S16 | Multistep/time: check reused/selectable information, applicable review/correction and accessible timeout extension/recovery | Same-process/security/essential exceptions need evidence; do not execute irreversible production transactions |
| S17 | Media/time-changing content: review real caption/description accuracy and synchronization, keyboard player controls, pause/update/audio controls | Track presence/transcript alone cannot prove all media criteria; avoid replaying suspected unsafe flashing |
| S18 | Language/routes/help: inspect real page/passage languages, title, focus/read order after navigation, repeated navigation/help and ways to locate pages | Product names/loanwords and process-step exceptions require context; no universal SPA focus destination |
| S19 | Shortcuts/motion: type/dictate in input contexts, test shortcut scoping/remap/disable and available motion alternatives/settings | Synthetic DOM events cannot establish actual dictation, touch or device-motion success |
| S20 | Progress/save: start, update, complete/fail; actual name/value/busy state fits the operation and focus remains usable | A save-in-progress button is not automatically a pressed toggle; indeterminate progress must not invent a percentage |

### Test construction rules

1. Select relevant scenarios from the original cause and affected siblings, not all scenarios for
   every repair. A comprehensive scan inventories all applicable families separately.
2. Use existing fixtures/unique discovered locators, role/name calculations, supported library
   APIs and framework test conventions. Do not invent a universal CSS selector or action count.
3. Assert user outcomes: action count/effect, selection/value, focus entry/exit, message/error
   relationship and content availability. Never use "keypress caused no exception" as the outcome.
4. Include asynchronous readiness and real state changes using repository-standard assertions,
   not arbitrary sleeps, error swallowing or expected-failure markers.
5. Keep WCAG version, exceptions, actual native/custom pattern and stricter policy visible in
   the acceptance conditions. Do not rewrite valid product behavior to satisfy an APG sample.
6. Run the existing axe integration in every relevant affected state, preserving incomplete/
   unsupported rules. A single initial-page scan does not cover the behavioral scenarios above.
7. Restore temporary user settings/styles/test data where authorized; keep security/session
   isolation and prevent evidence from exposing secrets or unrelated private content.
8. Independent verification does not modify product source, tests or expected snapshots to pass.

### Review result

For each selected ID report `pass`, `fail`, `blocked` or `not-run` with scenario-specific evidence.
Report `not-applicable` only with criterion/content applicability evidence. These rows supplement
existing outputs; do not introduce a new executable artifact format.

Use the existing final-verdict and optional-environment rules. A locally justified repair can
remain environment-pending; its manual steps are a handoff, not executed evidence. No checklist
authorizes a new tracker note, reassignment, resolution, PR merge or acceptance of new debt.

## Optional organization standard template

This repo ships **WCAG 2.1/2.2 Level AA only** — no vendor-specific standard is bundled or assumed.
If your organization has an internal accessibility standard that is stricter than WCAG AA in places
(a common pattern: same baseline as WCAG, plus a few tighter numeric thresholds and a mandated
assistive-technology test matrix), copy this section to a private path (e.g.
`~/.developer/accessibility-standard.md`), fill in the placeholders, and point
`config.quality_gates.accessibility_standard_file` at it.

**Do not commit a filled-in copy of this file into an open-source repo** — keep organization-specific
standards outside the tree (`~/.developer/…` or another private config path), the same way secrets
are kept out of `config.json`.

### Precedence

Skills treat this file as **additive to WCAG, not a replacement**: they always cite the WCAG success
criterion first, and apply your stricter number only where it's actually stricter. If this file is
absent or `accessibility_standard_file` is unset, skills use WCAG AA only — that's the shipped
default.

### How this relates to WCAG

Fill in your organization's actual numbers; delete rows that don't differ from WCAG.

| Area | WCAG 2.1/2.2 AA | Our standard |
|------|-----------------|--------------|
| Contrast — normal text | 4.5:1 | _fill in, or delete if same_ |
| Contrast — large text | 3:1 | _fill in_ |
| Contrast — UI components/focus indicators | 3:1 | _fill in_ |
| Touch target size | 24 CSS px or a valid exception (WCAG 2.2 AA 2.5.8) | _fill in, e.g. 44×44px_ |
| Required assistive-technology test matrix | Use actual supported combinations; WCAG does not prescribe one universal matrix | _name the specific screen reader/OS/browser combinations your org requires_ |

### Additional requirements beyond WCAG

<!-- List anything your org requires that WCAG doesn't mandate, e.g.:
- Dark-mode support (`prefers-color-scheme: dark`) is required, not just recommended.
- A specific component library must be used for interactive widgets because it's pre-verified.
-->

### Approved component library / design system

<!-- e.g. "Prefer <YourDesignSystem>'s <Button>/<Dialog>/<Combobox> — they're pre-verified against
this standard; a custom-built equivalent needs a manual accessibility review before merge." -->

### PR documentation requirement (optional)

<!-- e.g.: When a change fixes an assistive-technology-specific bug, require the PR description to
include a before/after of what the screen reader announces, and which AT/browser combo was tested. -->

## Optional screen-reader notes template

This repo's accessibility skills verify against **WCAG 2.1/2.2 AA**, which is platform- and
AT-agnostic by design. In practice, individual screen readers/browsers sometimes diverge from the
generic accessibility-tree model WCAG assumes. If your team has found and fixed platform-specific
quirks (with NVDA, JAWS, VoiceOver, a Windows/Linux/mobile screen reader, etc.) that are worth
codifying so they don't regress, copy this section to a private path (e.g.
`~/.developer/screen-reader-notes.md`), fill in your own findings, and point
`config.quality_gates.screen_reader_notes_file` at it.

This template ships **empty of any vendor-specific content** — the patterns below are generic examples
to show the shape; replace them with what your team has actually observed and tested.

### Precedence

This file supplements WCAG's Name/Role/Value criterion (4.1.2) with concrete, tested AT behavior. It
never overrides WCAG — it documents *how* to satisfy 4.1.2 correctly for the assistive technologies
your product is tested against.

### Control-type → required accessible-name pattern (example shape)

| UI element | HTML | What actually gets announced correctly |
|---|---|---|
| Text field | `<input type="text">` | An associated `<label>` or `aria-label` — `placeholder` alone is **not** announced as the accessible name by most screen readers |
| Required field | `<input required>` | Native `required` is valid; add custom semantics only for a demonstrated, version-specific interoperability need |
| Error state | Styling only | `aria-invalid="true"` + `aria-describedby` pointing at the error text — a red border alone announces nothing |
| Validation error | Inline text | Use associated errors, an appropriate summary or a scoped announcement strategy; avoid duplicate alerts and focus jumps |
| Toggle button | `<button>` | `aria-pressed="true|false"` — a CSS class alone isn't exposed as state |
| Disclosure | `<button>` expand/collapse | `aria-expanded="true|false"` |

### Known pitfalls (replace with your team's actual findings)

**1. Placeholder is not a label.**
```html
<!-- Review candidate: placeholder is not a robust persistent label -->
<input type="email" placeholder="Enter your email" />

<!-- CORRECT -->
<label for="email">Email</label>
<input type="email" id="email" placeholder="Enter your email" />
```

**2. Validation errors must be programmatically associated, not just visually adjacent.**
```html
<!-- Styling alone does not establish programmatic error association -->
<input type="text" class="error" />
<span class="error-text">This field is required</span>

<!-- CORRECT -->
<input type="text" id="name" aria-required="true" aria-invalid="true" aria-describedby="name-error" />
<span id="name-error">This field is required</span>
```

**3. Expose a real toggle state; loading is not a pressed toggle.**
```html
<!-- A real formatting toggle exposes its persistent pressed state -->
<button type="button" aria-pressed="true">Bold</button>

<!-- A save operation is not a toggle; use appropriate busy/status behavior -->
<button type="button" disabled>Saving</button>
```

### High contrast / forced-colors specifics (example shape)

If your target AT/OS combination has known forced-colors quirks beyond the generic `currentColor` /
`@media (forced-colors: active)` guidance already in `a11y-review`, document the specific pattern and
a tested fix here.

### PR documentation requirement (optional)

<!-- e.g.: When a change fixes a screen-reader announcement bug, require the PR description to
include:

### Screen Reader Impact
**Before:** <what was announced, or that nothing was announced>
**After:** <exact announcement text>
Tested with: <screen reader> on <OS/browser>
-->


Record the actual tested versions, task, before/after AT observation and competing causes.
These examples do not predict speech or authorize blanket ARIA changes. A disabled saving
button alone does not establish delivery of completion/error status; test the actual task.

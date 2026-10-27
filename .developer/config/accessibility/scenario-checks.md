# Scenario-specific verification and test authoring

Use with `a11y-verify` and `a11y-test-gen`, after confirming the original defect and actual
builds. The [coverage map](accessibility-coverage.md) determines applicability;
the [repair playbook](repair-playbook.md) supplies hypotheses, not verdicts.
These are Markdown procedures to instantiate with inspected controls and existing tooling,
not pre-run tests or claims of product coverage.

## Evidence for each chosen scenario

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

## Scenario library

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

## Test construction rules

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

## Review result

For each selected ID report `pass`, `fail`, `blocked` or `not-run` with scenario-specific evidence.
Report `not-applicable` only with criterion/content applicability evidence. These rows supplement
existing outputs; do not introduce a new executable artifact format.

Use the existing final-verdict and optional-environment rules. A locally justified repair can
remain environment-pending; its manual steps are a handoff, not executed evidence. No checklist
authorizes a new tracker note, reassignment, resolution, PR merge or acceptance of new debt.

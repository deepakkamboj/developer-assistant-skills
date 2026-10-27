# Evidence-led repair playbook

Load only the relevant families after the [investigation contract](../../skills/accessibility/a11y-fix/SKILL.md)
establishes scenario, eligibility, owner and causal evidence. Use the
[coverage map](accessibility-coverage.md) for criterion applicability and exceptions.
These are repair hypotheses, not a bulk autofix registry. Preserve all existing scope,
localization, dependency, source/provider and tracker lifecycle safeguards.

## Repair decision

1. State which user task fails and which concrete source behavior causes it. Compare competing
   causes for non-trivial cases, including wrappers, version-specific library behavior and product data.
2. Inspect the design system's existing native/component API at the actual resolved version.
   Prefer its supported fix over creating a second focus, label, event or live-region mechanism.
3. Choose the smallest complete repair at the proven owner. Trace siblings and consumers;
   request approval for shared scope, behavior decisions or dependency changes.
4. Identify the precise baseline failure, candidate expectation, negative case and adjacent
   regression before editing. Use [scenario checks](scenario-checks.md).
5. Run source/unit checks and the applicable actual UI/AT scenario. Missing environment may
   permit a justified source repair and environment-pending draft, never a verified claim.

## 1. Semantics, accessible names and text alternatives

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

## 2. Structure, tables, languages and navigation

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

## 3. Forms, error recovery and consequential submissions

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

## 4. Keyboard, focus, disabled controls and overlays

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

## 5. Composite widgets and rich applications

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

## 6. Status, loading, progress and SPA updates

- Reuse a scoped, stable existing status mechanism. Update text for meaningful completion/error/
  results states and avoid replacing the entire application with a live region.
- Use `aria-busy` on the actual updating region where appropriate. A save operation is not a
  pressed toggle. Use `aria-pressed` only when users toggle a persistent pressed state.
- For determinate progress, expose an actual name and current/range values; omit a fabricated
  current value for indeterminate progress. Announce useful transitions without excessive chatter.
- Preserve user focus unless the original task requires a justified move. Inspect stale-request
  races and duplicate announcers at wrappers/portals before adding a new region.
- Verify actual affected-AT delivery/timing, not only DOM attributes or predicted speech strings.

## 7. Contrast, color, display modes and responsive layouts

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

## 8. Pointer alternatives, targets and shortcuts

- Provide an actual click/tap alternative for dragging and path/multipoint gestures. Preserve
  keyboard alternatives too; these are different requirements.
- Enlarge the real hit area or adjust spacing using the applicable criterion and exceptions;
  merely enlarging an SVG or imposing 44px as universal WCAG AA is not sufficient reasoning.
- Preserve pointer cancellation and prevent unintended irreversible down-event activation.
  Review essential-event exceptions and all click/touch/pen paths before changing handlers.
- Scope/remap/disable single-character shortcuts as applicable, without capturing text input.
  Motion actuation needs an appropriate UI alternative and disable mechanism.

## 9. Authentication, repeated entry and timing

- Allow supported password manager/paste mechanisms or an approved authentication alternative
  where needed. Preserve security controls and coordinate policy decisions with the owner.
- Reuse/select information already provided in the same process unless an applicable exception
  is established. Do not cache sensitive data in logs, URLs or unapproved client storage.
- Use an accessible warning/extension flow for applicable time limits while preserving task
  data. A required security timeout must be assessed against the actual exception, not removed
  speculatively. Test warning focus, timing and recovery using approved test sessions.

## 10. Media and automatically changing content

- Fix missing/inaccurate captions or descriptions in the actual media delivery pipeline.
  A tag, generic transcript or empty caption file is not an equivalent correction.
- Preserve keyboard/AT operation of media controls and applicable autoplay audio controls.
  Do not automatically mute/remove meaningful content or break the player's supported APIs.
- Provide applicable pause/stop/hide/update-frequency controls for qualifying movement/updates.
  Respect essential exceptions; reduced-motion support is not permission to remove task feedback.
- Route suspected unsafe flashing to safe specialist evaluation; do not generate or replay it.

## Completion evidence

Return source owner/version, failing task/criterion, causal explanation, exact changes, local
checks and actual scenario/AT coverage. Include unresolved rows and negative-case regressions.
Preserve the original issue history, full repair handoff, publication approval and
independent verification. No playbook entry authorizes closing
a bug, updating acceptance baselines, upgrading a dependency or merging a PR automatically.

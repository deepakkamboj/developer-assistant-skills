# Web accessibility coverage and routing

Use this map for technical scans, reviews, development, repair and independent verification,
including issue-driven entry points. It supplements, not replaces, the investigation contract
in [a11y-fix](../../skills/accessibility/a11y-fix/SKILL.md) and the
[shared instructions](shared-instructions.md).
There is no new runtime, public command, automatic repair or certification here.

## Select work from the actual scenario

1. Confirm the authorized page/component/source scope, WCAG version, product policy, role,
   language, input mode, states and affected browser/AT. Do not broaden a targeted repair into
   an unapproved audit. For a comprehensive scan, inventory every applicable family below.
2. Use the [issue-family procedures](issue-families.md) for content,
   semantics, forms, dynamic updates, authentication, media and time/input behavior. Retain the
   existing base scan and specialist reviews; an axe rule list is not this coverage map.
3. Use `a11y-review-interactive` for actual native/custom widget patterns; `a11y-review-contrast`,
   `a11y-review-color`, `a11y-review-links`, `a11y-review-modes` and `a11y-review-viewports`
   retain their specialist responsibilities. Share evidence instead of counting one defect twice.
4. A confirmed issue enters `a11y-fix` with the
   [repair playbook](repair-playbook.md). Use
   [scenario checks](scenario-checks.md) for `a11y-test-gen`
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

## Criterion-to-probe map

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

## Thresholds and false-positive boundaries

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

## Authoritative references and policy evidence

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) and [WCAG 2.1](https://www.w3.org/TR/WCAG21/).
- [Understanding WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/).
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) and
  [ARIA in HTML](https://www.w3.org/TR/html-aria/).
- For an optional configured organization overlay, record the actual source/version/section.
  If authoritative material is unavailable, disclose the policy-verification gap. Do not invent
  identifiers, waive recorded stricter policy or infer observed AT behavior.

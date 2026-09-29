---
name: a11y-fix
description: Investigate and repair reported WCAG 2.1/2.2 AA defects — reproduce the original scenario, prove repository and source ownership, test root causes, apply a bounded native-first fix, and verify the exact build and required assistive-technology behavior. Explicit non-fix outcomes when evidence is missing.
argument-hint: "[issue, file or violation ref] [--from a11y-scan|a11y-review]"
---

# A11y Fix

## Role

You are an accessibility remediation engineer. You fix WCAG AA violations correctly and minimally,
using native semantics first and ARIA only when necessary — never faking a pass.

## Context to load

Load and honor these before acting:
- The full issue, comments, attachments available to the runner, and any `a11y-scan`/`a11y-review`
  evidence, not just a title, suggested file, or automated rule.
- Resolve `DEVELOPER_CONFIG` (fallback `~/.developer/config.json`), companion context and verified
  memory; repo instructions, configured repositories, test commands, and autonomy limits.
- Repo component patterns; `config.quality_gates.wcag_level`; the investigation contract below.
- Optional org overlay, only if configured: `config.quality_gates.accessibility_standard_file`
  (e.g. a stricter contrast ratio or touch-target size to fix *to*) and `screen_reader_notes_file`
  (a tested pattern for a specific ARIA-wiring pitfall). Unset by default.

## Workflow

### Step 0: TodoWrite Checklist

```
TodoWrite([
  { content: "Load the exact issue, environment, and expected behavior", status: "in_progress" },
  { content: "Reproduce and prove runtime-to-source ownership", status: "pending" },
  { content: "Test competing causes; classify repairability before editing", status: "pending" },
  { content: "Apply a bounded root-cause fix and regression test", status: "pending" },
  { content: "Verify the original scenario and report evidence or blockers", status: "pending" }
])
```

### Steps

1. **Establish the scenario.** Record issue URL, expected vs actual behavior, WCAG applicability
   (or explicitly pending clarification), app/route, role, data, flags, deployed build, control
   version, OS, browser, assistive technology (AT) and version, input/navigation mode, language,
   zoom, and theme where relevant. Missing access/configuration is `blocked`, not `not-reproduced`.
   Preserve the original steps; an easier input path is not an equivalent reproduction.
2. **Reproduce before editing.** Capture the failing state, interaction sequence, DOM/accessibility
   tree, focus transitions, or measured contrast. For speech/voice behavior, obtain an actual
   affected-AT observation; an accessibility snapshot is not speech evidence. If execution is
   unavailable, inspect source to narrow the cause but do not invent a baseline or patch a guess.
3. **Locate and diagnose.** Complete the investigation contract below. Only proceed with a
   demonstrated defect, verified ownership, and a supported expected result. Ask a focused question
   interactively for ambiguity; scheduled runs record the exact missing decision and owner.
4. **Repair minimally.** Use the owning repo's feature-branch convention. Prefer existing native
   semantics and design-system APIs; fix the value/state/event at its source. Check callers and
   variants before changing shared code. Add a focused regression test with the repo's existing
   tooling (or `a11y-test-gen`) where automatable; show that it fails on the baseline for the
   reported reason and passes on the patch. For manual-only AT defects, require a repeatable manual
   regression scenario with attributable baseline/candidate AT evidence; keep any automated proxy
   checks explicitly separate. Missing required AT evidence still blocks success. Keep original
   product behavior unless a change is explicitly approved.
5. **Verify the actual fix.** Run the smallest relevant tests, lint, type-check, and build, then
   `a11y-verify` on the exact candidate build and original scenario. Axe alone is not an alternative
   to behavior/AT verification. A failing or unavailable required check cannot yield `fixed`.
6. **Stop honestly.** Honor `config.autonomy.max_repair_attempts` (default 3, or a lower run limit).
   Each revised patch counts as an attempt and needs new diagnostic evidence; do not cycle through
   speculative ARIA changes. Stop on regression and discard only your own failed changes safely.
   A pointer, explanation, workaround, PR comment, or opened PR is not a completed fix.

## Investigation contract

Complete this evidence record before editing. Use `unknown` plus a next action when unresolved.

| Evidence | Required investigation |
|---|---|
| Repository identity | Verify canonical remote, branch, commit, package and entry point. Issue labels and suggested paths are routing hints, not proof. Never edit this plugin repo for a product bug. |
| Runtime-to-source chain | Trace route/feature -> rendered element (including frame, portal or shadow root) -> wrapper/caller -> component -> property/state/event/style -> owning source or dependency. Cite file, symbol and line at the inspected commit for every resolved hop. |
| Search ledger | Record repo/ref, bounded scope, queries, hits and exclusions. Start with runtime strings, localization keys, selectors and component names; use symbol references/imports to follow callers, exports, aliases and wrappers. Check flags, old/new controls, generated sources and locked package versions. A same-named component or first text hit is not proof. |
| Search escalation | If the first repo misses, follow manifest/import/source-map evidence and configured ownership mappings to other allowed repos. Distinguish no match from access denied or missing checkout. Do not search unrelated repos or declare an external dependency from a failed grep. |
| Dependency boundary | Establish whether the app's props, template, event handling, theme or wrapper causes the defect before blaming a library. If upstream-owned, record package/version, source boundary and minimal reproduction, check for a relevant newer fix, and name the owner/upgrade action. No edits to vendored/generated output or unapproved version bumps. |
| Competing causes | Compare at least two plausible causes for non-trivial defects (e.g. wrapper state vs library behavior, stale build vs active source). Give supporting and contradicting evidence and a discriminating test. Explain why the chosen change fixes the observed failure rather than its symptom. |
| Existing work | Inspect linked issues, history and candidate fixes. A duplicate/already-fixed result requires the same scenario, root cause and affected version; an issue ID or nearby label change alone is insufficient. Reproduce on the relevant newer build before claiming resolution. |
| Expected behavior | Cite applicable WCAG and product/design requirements. Missing accessible-name wording or changed behavior needs owner clarification. Intentional behavior may still violate WCAG; "by design" needs authoritative intent AND an accessibility assessment. |

### Multi-repository applications and Fluent UI v8/v9

Treat the application as a dependency chain, not a single checkout. Inventory every configured
product repo with canonical URL, ref, available checkout/access, produced packages and consuming
apps. Rank candidates using the issue's product/route, runtime evidence and imports, not config
order. Trace shared controls across repository boundaries and record each hop with its exact
revision/package version. If ownership remains unknown, perform bounded targeted searches in
the remaining plausible configured repos and report searched/unsearched scope. A partial search
cannot establish an external dependency.

For Fluent UI, identify the **actual loaded generation and version** before applying guidance:

- `@fluentui/react` is the v8 package family; `@fluentui/react-components` is v9. Apps may use both,
  component-specific packages, compatibility wrappers or legacy imports. Resolve the exact import,
  exports/aliases, installed dependency tree and lockfile entry for the failing component; do not
  infer generation solely from a component name or the app's top-level manifest.
- Verify the deployed app uses that resolved version, including nested/duplicate dependencies,
  overrides/patches and feature-switched controls. Inspect library source read-only at the matching
  package version/tag, not the repository's default branch or latest online example.
- Trace app repo -> shared control repo/package -> wrapper props/render callbacks/styles/focus
  handlers -> Fluent component. Check local overrides of naming, focus, selection, portals and
  theme before attributing a failure to Fluent itself.
- Reproduce in the full app, then in the smallest faithful **same-version** Fluent example using
  documented APIs and the same browser/AT/input conditions. Remove app customization one boundary
  at a time while preserving the failing interaction. A different control, missing state or v9
  sample cannot clear a v8 defect.

| Observation | Ownership/action |
|---|---|
| Fails only with app props, wrapper, styles or composition | Fix the proven owning app/shared-control repo; test its consuming app, not just the isolated library component. |
| Fails in a faithful direct Fluent example at the installed version | Upstream candidate; confirm documented API use, source behavior and known issues before declaring `external-dependency`. Record the exact package/version, source pointer, reproduction and owner. |
| A relevant fix exists in a newer v8 patch/minor | Verify the same scenario on that version; propose the smallest approved compatible upgrade with consumer regression tests. Do not silently update dependencies. |
| Behavior is corrected only in v9 | A v8-to-v9 migration is not a routine version bump or completed bug fix. Record component/API/style/behavior differences and request a separately scoped migration or upstream/backport decision. |
| Library example passes but app source/conditions cannot be matched | Ownership remains unresolved; continue cross-repo diagnosis or report `blocked`/`inconclusive`, not by-design or external. |

A shared-repo fix is not complete until the consuming app's built/deployed dependency includes it.
Record `dependencyTrace` with repository/ref, import, resolved package/version, customization and
runtime evidence for each boundary. If both producer and consumer need changes, request coordinated
scope approval, link each repo's commit/PR and validate the combined app build; do not count an
unconsumed library PR as a fixed app bug.

Public reference: [Fluent UI's package/generation map](https://github.com/microsoft/fluentui#readme).
Use its generation-specific docs and changelog at the version relevant to the bug. Newer-generation
availability is not evidence that the installed version caused this defect.

Do not widen a file/directory request into a codebase-wide repair. If the true owner is outside the
authorized scope, provide the proven pointer and request authorization; do not patch the wrong file.

## Repair safeguards

- Compute the current accessible name and description, including visible labels, localization and
  inherited props, before adding ARIA. Preserve visible label text in the name (2.5.3). Do not
  duplicate names/descriptions or add live regions as a generic announcement fix.
- Preserve required title/tooltip behavior, keyboard focus, native activation and existing state.
  Do not remove focus to suppress speech, add redundant key handlers to native controls, or apply
  AT/browser-specific hacks without evidence and cross-environment regression checks.
- Do not turn a bug into a feature, add a new option, or refactor an unrelated component to make
  the test pass. Upgrade/shared-design changes require approval and compatibility testing.

## Outcome and handoff

Report `issueKey, repositoryUrl, baseCommit, candidateCommit, scenario, sourceTrace, dependencyTrace, searchLedger,
hypotheses, rootCause, changedFiles, tests, verificationMatrix, outcome, reason, nextAction, owner`.
Evidence references must be sanitized and tied to the tested commit; use `null` for absent commits.

Choose exactly one outcome:

| Outcome | Evidence required |
|---|---|
| `fixed` | Original defect reproduced before the patch; `a11y-verify` returns `Fixed` for the exact candidate, required regression gates pass, and no required matrix row is untested. |
| `not-fixed` | Original behavior still fails or the patch regresses behavior; report failing checks and attempts. |
| `blocked` | Missing source/access, build, environment, data or required AT prevents investigation/verification; name the prerequisite and owner. |
| `inconclusive` | Conflicting evidence or uncertain cause/expectation remains after bounded investigation. |
| `not-reproduced` | Original scenario actually executed under recorded comparable conditions without failure; no speculative edit and no claim of a fix. |
| `needs-product-decision` | Expected behavior, wording, feature scope or upgrade approval is unresolved. |
| `external-dependency` | Evidence establishes an upstream boundary after checking the app integration; actionable owner/package/version handoff, not a fix. |
| `out-of-scope` | Proven owner/platform is outside authorized scope; identify the boundary and next owner. |
| `by-design` | Authoritative intent and WCAG assessment support no change; not merely an old implementation or an opinion. |
| `duplicate` / `already-fixed` | Matching scenario/cause/version and linked prior work are verified; do not count as a new repair. |

## Fix pattern catalog

| Tier | Examples |
|---|---|
| Simple | Correct a proven missing text alternative, label association or page language; reuse the existing naming/localization mechanism |
| Moderate | Convert a clickable `<div>`/`<span>` to `<button>`/`<a>`; add keyboard handlers (`onKeyDown` for Enter/Space); wire up accessible form validation (`aria-invalid`, `aria-describedby`, `role="alert"`); add a skip link |
| Complex | Add a focus trap + focus restoration to a modal/dialog; build an accessible combobox/listbox, tabs, or accordion with correct ARIA roles/states and Arrow-key navigation; add `aria-live` regions for async status |

For contrast violations, darken/lighten one color to hit the required ratio (4.5:1 text / 3:1
large-text or UI components) while preserving hue — prefer updating a design token over a one-off
override so the fix propagates.

### Confidence level

Confidence measures evidence, not how familiar an HTML pattern looks; it never overrides a gate:

| Confidence | When |
|---|---|
| High | Reproduced baseline, proven source/cause, and original scenario plus required regression/AT matrix pass |
| Medium | Source/cause supported but required runtime or AT evidence incomplete; cannot report `fixed` |
| Low | Ownership, cause or expectation unresolved; investigate or request clarification, do not ship a placeholder |

### Framework notes

- **React** — `htmlFor` not `for`; manage focus with `useRef`/`useEffect`; keyboard handlers via
  `onKeyDown`.
- **Vue** — `v-bind:aria-*` for dynamic ARIA; `@keydown` handlers; `ref` for focus management.
- **Angular** — `[attr.aria-*]` bindings; `(keydown)` handlers; `@ViewChild` + `nativeElement.focus()`.
- **Plain HTML/JS** — `addEventListener('keydown', …)`; `element.focus()`; `setAttribute('aria-*', …)`.

## Rules

- WCAG AA is the floor; native semantics over ARIA; never disable/ignore a rule to fake compliance.
- If `config.quality_gates.accessibility_standard_file`/`screen_reader_notes_file` is configured,
  apply it in addition to WCAG (e.g. fix to the stricter ratio, or use the documented AT-tested ARIA
  pattern) — never in place of citing the WCAG SC.
- Minimal change; re-verify; add a regression test for anything non-trivial.

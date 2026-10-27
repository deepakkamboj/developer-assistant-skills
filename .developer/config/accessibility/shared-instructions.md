# Shared accessibility instructions

Load this file before any accessibility workflow. This is the single entry point for shared
procedures; skills retain their own roles and do not duplicate the reference paths below.
Resolve paths relative to the installed `.developer` plugin, not a hard-coded checkout.

## Context and scope

Resolve `DEVELOPER_CONFIG` (fallback `~/.developer/config.json`), companion `content.md`,
`memory.md` and `notes.md` using existing repository conventions. Missing optional files are not
proof that a required target, permission or environment is available. Remembered fixes are
hypotheses until their scenario, source owner and resolved package version match.

Confirm the authorized target, original task, expected behavior, WCAG version/level, route,
role/data/flags, build and relevant browser/OS/AT/input/language/theme. No target means ask,
not scan or edit everything. Preserve narrower caller scopes. A comprehensive scan inventories
all applicable families; a targeted repair checks its cause and affected neighbors.

## Shared coverage routing

- [Coverage map](accessibility-coverage.md): all 55 WCAG 2.2 A/AA criteria, WCAG 2.1 boundaries,
  exceptions, thresholds and specialist routing.
- [Issue-family procedures](issue-families.md): ten source/runtime/manual inspection families.
- [Repair playbook](repair-playbook.md): ten native-first repair families, used only after
  the investigation contract in `a11y-fix` establishes cause and ownership.
- [Scenario checks](scenario-checks.md): twenty baseline/candidate, negative-case and adjacent
  regression scenarios for `a11y-test-gen` and independent `a11y-verify`.

These are operational instructions, not new detectors, pre-executed tests, guaranteed compliance
or a bundled execution/baseline framework. Use existing output fields and report unsupported
details as explicit evidence rather than inventing a second schema.

The existing `a11y-review --mode` interface remains supported. Each mode also has a focused
`a11y-review-interactive`, `a11y-review-contrast`, `a11y-review-color`, `a11y-review-links`,
`a11y-review-modes` or `a11y-review-viewports` skill. Select every applicable mode, share
evidence and deduplicate only equivalent observations, not entire categories.

## Prerequisites and evidence

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

## Repair, verification and reporting

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

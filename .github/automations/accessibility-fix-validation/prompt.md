# Scheduled Accessibility Fix Validation

Independently validate the exact candidates produced by the
[fixer runbook](../accessibility-fix-bugs/prompt.md). Never select new backlog bugs, modify source,
tests or dependencies, push/amend branches, create replacement fixes, approve/merge PRs or
close/resolve issues. A review comment is not evidence that the original bug is fixed.

## Configuration and capabilities

Resolve `DEVELOPER_CONFIG` (fallback `~/.developer/config.json`) and companion context as the fixer
does. Use its reviewed repository mappings, supported platform/browser/AT scope, test environments,
documented commands, permissions and escalation owners. No host, identity or environment is
hard-coded. Read the same `FIX_HANDOFF_PATH` (default `a11y-fixes.json` beside the config).

Generate a unique `validationRunId` as `a11y-validation-<UTC timestamp>-<unique suffix>`.
The hard cap is 5 issues, lowered by configured limits. Runs are non-interactive: missing settings
produce an explicit blocker and owner action, not guessed defaults.

Reuse the approved authenticated Copilot/runner session on each exact configured host. Verify
read access to issues, repositories, PRs and builds without extracting credentials or switching
accounts. Use `gh` where available or the host's GitHub tools. The only provider writes allowed
are explicitly authorized validation comments and configured result labels.

Require the canonical `a11y-verify` skill, an independent `repair-validator`, working repo-pinned
test/browser tooling, and actual AT execution or attributable tester evidence for required AT
checks. One working Playwright integration is sufficient; missing a second integration is not a
blocker. A working browser does not establish screen-reader or voice-control capability.

## Step 0 - Freeze the validation worklist

1. Read the handoff JSON array without discarding old records or unknown fields. Malformed or
   unreadable input blocks worklist construction; do not replace it with an empty successful run.
2. Resolve each candidate's canonical issue URL (`issueKey`), valid timestamp, PR provider/ID/URL
   and current repository from the recorded evidence and configured allowlist. For a legacy
   record, missing values require verified enrichment, never inferred repo ownership from a title.
3. Verify the exact recorded PR exists, is open and belongs to that repository and issue. Missing,
   closed, merged or mismatched PRs are ineligible; report each reason. Access/API failures are
   unresolved eligibility, not proof a PR is absent; report the selection as incomplete.
4. Deduplicate eligible records by `issueKey`, taking the newest source `date` (last file occurrence
   on a tie). Sort date descending, then canonical issue URL ascending for deterministic ties.
5. Freeze the first 5 (or lower configured cap). If fewer exist, show eligible count and shortfall;
   never invent work or backfill after a selected item blocks. Display each original `fixRunId`,
   issue, repository, recorded commit and PR before further enrichment.

Do not exclude an otherwise eligible PR just because its status, build/checksum or previous verdict
is missing or failed. Those are per-record validation work, not a way to select only easy passes.
Keep original source run IDs; a batch spanning multiple runs must not be assigned a fabricated
common `fixRunId`. The separate `validationRunId` identifies the frozen batch.

Process all frozen records even if one blocks. Metadata reads may be parallel; environment
deployment/testing must be serialized for a shared target. Parallel runs require separate owned
environments, identities where needed, and rollback paths.

## Step 1 - Verify source and candidate provenance

For each frozen record:

1. Read the full original issue, comments, available attachments and acceptance criteria. Verify
   scenario, source trace and WCAG applicability rather than accepting the fixer's conclusion.
2. Read the exact PR, changed files and relevant review comments. Check repository, base/source
   branches and linkage to the issue. A PR-comment edit must still solve the original scenario.
3. Freeze the current PR head as `validationTargetCommit`. Preserve the original `fixCommit`
   and source-run fields. If they differ, report a stale handoff and validate the new head as a
   separate attempt with fresh build and behavior evidence; never transfer an earlier pass.
4. Use a clean validation checkout at that target, preserving other work. Follow the rendered
   element -> wrapper/caller -> owning component chain in `a11y-fix` and ensure the changed code
   actually runs in the reported app/version. A matching component name is not enough.
   Verify `dependencyTrace` and any `relatedChanges` across product repos. The deployed consumer
   must include the exact shared-control fix and library version. Freeze and re-check every related
   PR head as well as the primary head; a partial/mixed build cannot pass. In mixed Fluent UI apps,
   a v9 control's success is not evidence for the reported v8 control.
5. Find a build tied to the exact target, or a provider-generated merge commit whose metadata and
   graph prove inclusion of that target and the recorded base. Keep `validatedCommit` as the PR
   target and record the tested `buildCommit` separately in validation evidence.
6. Verify artifact version/type, calculate its checksum, and compare with an authoritative expected
   checksum when available. A mismatch is a failure; do not deploy it. Missing legacy checksum
   fields may be recovered from trusted build metadata; absence of a historical checksum alone
   need not prevent a safe diagnostic run. Final success still needs proof of the exact build
   and installed bytes/version. For local apps, verify the running source commit and build command.

Missing provenance is `Blocked`; contradictory provenance is `Fail`. A stale handoff can be
enriched, but never overwrite source-run build fields with a different candidate's values.
Review discussions alone are not a deployment blocker; evaluate any concrete regression/security
concern they raise. Do not deploy a known unsafe candidate.

## Step 2 - Prepare the approved environment

Use only documented setup/deployment commands for the configured, writable, isolated test target.
Verify role, app, data, flags, locale, control version, ownership, expiration and rollback plan.
Authenticate with protected state (`playwright-auth` when applicable); check identity and
authenticated navigation in a fresh session without exposing secrets.

First check whether the exact candidate is already installed; if so, capture independent version
and deployment proof. Otherwise deploy only with explicit test-environment authority and confirm
installed build/version and history. A successful command or page load is not proof.
If the target cannot be obtained safely, block that record and continue other records.

## Step 3 - Validate the original defect, not a proxy

Invoke `a11y-verify` in validation-only mode.

1. Confirm baseline failure using trustworthy recorded evidence or an isolated baseline run.
   Preserve original input steps, role, route, data and display conditions. A passing candidate
   without a proven original failure is `Inconclusive`, not a verified repair.
2. Execute the original scenario on the proven candidate. Assert the expected user-visible
   behavior and applicable WCAG criterion; do not invent label wording or change input steps.
3. Re-scan affected states with pinned axe and all applicable supported A/AA tags, including
   WCAG 2.2 when requested; record incomplete/unsupported coverage. Axe alone is insufficient.
4. Check keyboard activation, focus entry/movement/restoration, accessible name/description/state,
   required titles, repeated transitions, contrast and applicable reflow/forced-colors conditions.
   Check for duplicate announcements, removed focus and browser-specific regressions.
5. Execute the required browser/OS/AT/input matrix. Speech/voice results require actual affected-AT
   execution or attributable tester evidence on the exact candidate. Playwright and accessibility
   snapshots cannot prove spoken output or voice-command behavior. One passing combination
   cannot cover a failing or untested required combination.
6. Run existing relevant regression tests without modifying them. Inspect baseline failure and
   candidate pass evidence for the targeted regression test. Test absence is a coverage gap, not
   permission to author source changes here.
7. Re-check the PR head before finalizing. If it moved during validation, retain results for the
   tested commit but mark the current PR recommendation `Inconclusive` until the new head is tested.

Record every required row as `pass`, `fail`, `blocked` or `not-run` with versions, commit, observed
vs expected result and evidence. Unavailable AT is a blocker, not `by-design` or `not-reproduced`.

## Step 4 - Independent repair review and verdict

Send original issue, source trace, competing causes, diff, tests, baseline/candidate evidence,
provenance, deployment and the complete verification matrix to `repair-validator`. It must confirm
root-cause relevance, scope, product behavior and absence of material regressions independently.
Missing review cannot become approval. Use these verdicts:
Map the critic's `Pass`/`Fail` to `validationRepairValidatorStatus: approved`/`rejected`.

| Verdict | Meaning |
|---|---|
| `Pass` | `a11y-verify` returns `Fixed`, all required matrix/regression checks pass on the proven exact candidate, and independent repair review approves |
| `Fail` | Original defect remains, required behavior fails, new issues appear, provenance contradicts the candidate, or repair review rejects |
| `Blocked` | Source/build/environment/data/permissions/tooling/required AT or independent review is unavailable |
| `Inconclusive` | Original failure, intended behavior or causal connection is unproven, or the PR advanced during validation |

A known failure wins over a blocker; list both in evidence. `Fixed but new issues` maps to `Fail`.
Page load, clean axe, code-pointer advice, a PR or progress on review comments never constitute
`Pass`. Return precise failed rows and next actions to the fixer, not an alternative untested patch.

## Step 5 - Persist and report without changing lifecycle state

Update only the original record keyed by `(fixRunId, issueKey, fixCommit)`. For legacy records whose
identity cannot be uniquely established, block persistence rather than updating a guessed match.
Use the fixer's locked read-modify-write and atomic replacement procedure; preserve all unselected
records, unknown fields and source-run evidence. Do not overwrite `outcome`, `fixCommit`,
`repairValidatorStatus` or source build fields.

Append each attempt to `validationHistory`, then update these latest-result fields:

- `validationStatus`: `pass`, `fail`, `blocked` or `inconclusive`
- `validationRunId`, `validationDate`, `validationTargetCommit`
- `validatedCommit`: actual commit tested, or `null` when execution never occurred
- `validationEnvironmentId`
- `deploymentValidationStatus`: `not-run`, `pass`, `fail` or `blocked`
- `accessibilityValidationStatus`: `not-run`, `pass`, `fail`, `blocked` or `inconclusive`
- `validationRepairValidatorStatus`: `not-run`, `approved` or `rejected`
- `validationEvidence`: sanitized baseline, source trace, candidate/build/checksum, commands, matrix
  and regression evidence (including all provenance warnings)
- `validationNextAction`, `validationOwner`: required for every non-pass; `null` on pass

Record persistence failure explicitly and do not claim the result was saved. A failed write must
not erase an observed test failure or turn it into success.

If authorized, post one idempotent comment per issue/PR keyed by `validationRunId` and `issueKey`.
Include the original source run ID, tested and current commits, build/environment, before/after,
matrix gaps, verdict, evidence and next owner/action. Apply only configured result labels.
Never overwrite descriptions, change issue state, approve or merge. Report failed comment writes.

## Summary and cleanup

Report selection completeness, eligible/excluded/unresolved counts, frozen batch size, every
record's source run, provenance and gate results, verdict, evidence, persistence and comment result.
Give exact next action/owner for non-passes; do not drop blocked workers from the report.
Use `a11y-report` cohort accounting: attribute later validations to the original source run,
separate carried work and retries, and never count a non-fix as a successful repair.

Close only browser sessions this run created, release/record environment ownership, protect evidence
with an owner/expiration, and remove only known temporary authentication material under policy.
Do not delete source-run audit artifacts. Confirm no source, branch or issue/PR lifecycle changes.

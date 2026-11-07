---
name: release-readiness
description: Run a release-readiness gate before shipping — verify tests/coverage, quality gates (security, a11y, perf), open blockers, changelog/version, migrations, and rollback plan — and produce a go/no-go report with the evidence. Realizes EASE-MAS A23. Does not deploy.
argument-hint: "[version or release scope] [--provider <configured-provider>]"
---

# Release Readiness

## Role

You are a release gatekeeper. You produce an evidence-backed go/no-go recommendation — you check, you
do not deploy, and you never wave through unmet gates.

## Context to load

First apply the [shared execution boundary](../../_shared/execution-boundary.md); it limits every step below.

Load and honor these before acting:
- `config.quality_gates`, `config.autonomy`, and the target `repos[]` + `config.toolchain`.
- CI status, the traceability graph (coverage), and the release/change scope.

## Workflow

### Step 0: TodoWrite Checklist

```
TodoWrite([
  { content: "Confirm CI green + tests/coverage on the release scope", status: "in_progress" },
  { content: "Check quality gates: security, a11y, performance", status: "pending" },
  { content: "Verify blockers, changelog/version, migrations, rollback", status: "pending" },
  { content: "Produce a go/no-go report with evidence", status: "pending" }
])
```

### Steps

1. **Build & tests.** Use `verify-change` to identify the exact release candidate and obtain
   fresh results. Confirm CI runs refer to that candidate, not an earlier branch state. Check
   coverage against the gate and that new requirements have tests (traceability).
2. **Quality gates.** Confirm security (SCA/secret scan), accessibility (AA), and performance gates
   for the change are met; list any waivers explicitly.
3. **Blockers.** Read open Critical/High issues for the release scope through the approved
   configured provider or supplied export; no open blockers may remain. Missing access is an
   unknown gate, not evidence that no blockers exist.
4. **Release hygiene.** Verify version bump, changelog/release notes, data migrations (and their
   reversibility), feature flags, and a documented **rollback plan**.
5. **Verdict.** **Go** (all gates met) or **No-go** (with the exact blocking items and owners).
   When success also requires adoption, metric or impact evidence, include `impact-readiness`
   as a separate assessment; a passing build does not prove business or user impact.

## Output

A go/no-go report: gate-by-gate status with evidence, open blockers, release hygiene checklist, and
the rollback plan.

## Rules

- No deploy here — recommend only; human owns the ship decision.
- Unmet gates or open blockers force **No-go**; waivers must be explicit and owned.
- Evidence over assertion — link CI runs, scans, and issues.

---
name: fix-bug
description: Repair an authorized defect with a reproduced failing test, bounded hypothesis-led changes, observed GREEN and fresh regression evidence before an independent validator gate. Draft-PR publication is separately approved; human merges.
argument-hint: "[bug id | issue] [--max-attempts N] [--require-regression-pass] [--draft]"
---

# Fix Bug

## Role

You are a bounded autonomous repair engineer. You fix the defect with the smallest safe change, prove
it, and stop at the safety boundary — a human always merges.

## Context to load

First apply the [shared execution boundary](../../_shared/execution-boundary.md); it limits every step below.

Load and honor these before acting:
- Ranked hypotheses from `root-cause`; the structured bug; the failing test.
- `config.autonomy` (max files/diff/attempts, wall-clock, secret isolation); `config.repo` commands.
- `graph-repo` impact for the localized area.

## Workflow

### Step 0: TodoWrite Checklist

```
TodoWrite([
  { content: "Load hypotheses + safety limits; branch", status: "in_progress" },
  { content: "Select hypothesis; localize + patch (smallest change)", status: "pending" },
  { content: "Validate: unit -> targeted E2E -> regression -> security", status: "pending" },
  { content: "Independent repair-validator gate; open draft PR or escalate", status: "pending" }
])
```

### Steps

1. **Prepare.** Read the top hypotheses and the autonomy limits. Work on a feature branch (never a
   protected branch). No secret scope; no unapproved dependencies. Use the existing authorized
   workspace; branch/worktree creation is a separate approved action. Before editing product
   code, add or confirm a regression test that fails for the actual defect and observe its RED
   result. Setup/compiler failures are not reproduction; use `implement-change` for the detailed
   RED/GREEN/refactor protocol.
2. **Repair loop (bounded).** For the top hypothesis (then next, within budget):
   - Localize and apply the **smallest** patch. Reject if it exceeds max files/diff.
   - Validate in a sandbox: the failing test now passes → targeted E2E → **full/impacted regression**
     → **security scan**.
3. **Independent gate.** Obtain `verify-change` results on the final candidate, then request an
   independent repair validator within explicit delegation authorization. If no independent
   reviewer is available, mark the gate pending/blocked; do not substitute self-certification.
4. **Terminate** on the first of: (a) failing test passes ∧ regression green ∧ security clean ∧
   validator accepts → **ready for approved draft-PR handoff**, not automatic publication;
   (b) attempt/time/diff budget exhausted →
   escalate; (c) repeated identical failures → escalate (likely mis-localized); (d) safety violation
   → stop, preserve evidence and propose a safe rollback/notification; do not reset local work
   or send external alerts without authorization.
5. **Record.** Write `Hypothesis → Repair → Validation` nodes; summarize what changed and why.

## Output

`Outcome (ready for review / gate pending / escalated / aborted) · patch summary · validation results (unit/E2E/
regression/security) · attempts used`.

## Rules

- Bounded: max files/diff/attempts + wall-clock; feature-branch; no secrets; no unapproved deps.
- Independent validation required; regression must pass; **human merges** — never auto-merge.
- Fix the cause, not the test. If the "bug" is actually a wrong test, route to `fix-test`.

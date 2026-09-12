---
name: fix-bug
description: Repair a defect under bounded autonomy — take ranked hypotheses, localize and patch, then validate through unit, targeted E2E, regression, and security before an independent repair-validator gate, and open a draft PR (human merges). Enforces max attempts/diff and termination conditions. Realizes EASE-MAS A20–A22 (Algorithms 6/7).
argument-hint: "[bug id | issue] [--max-attempts N] [--require-regression-pass] [--draft]"
---

# Fix Bug

## Role

You are a bounded autonomous repair engineer. You fix the defect with the smallest safe change, prove
it, and stop at the safety boundary — a human always merges.

## Context to load

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
   protected branch). No secret scope; no unapproved dependencies.
2. **Repair loop (bounded).** For the top hypothesis (then next, within budget):
   - Localize and apply the **smallest** patch. Reject if it exceeds max files/diff.
   - Validate in a sandbox: the failing test now passes → targeted E2E → **full/impacted regression**
     → **security scan**.
3. **Independent gate.** Invoke the `repair-validator` agent (separate from repair) to accept/reject
   the patch on evidence — guards against overfitting to the one test.
4. **Terminate** on the first of: (a) failing test passes ∧ regression green ∧ security clean ∧
   validator accepts → **open a draft PR** for human merge; (b) attempt/time/diff budget exhausted →
   escalate; (c) repeated identical failures → escalate (likely mis-localized); (d) safety violation
   → abort + rollback + alert.
5. **Record.** Write `Hypothesis → Repair → Validation` nodes; summarize what changed and why.

## Output

`Outcome (fixed→draft PR / escalated / aborted) · patch summary · validation results (unit/E2E/
regression/security) · attempts used`.

## Rules

- Bounded: max files/diff/attempts + wall-clock; feature-branch; no secrets; no unapproved deps.
- Independent validation required; regression must pass; **human merges** — never auto-merge.
- Fix the cause, not the test. If the "bug" is actually a wrong test, route to `fix-test`.

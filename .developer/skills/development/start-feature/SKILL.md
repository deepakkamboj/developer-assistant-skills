---
name: start-feature
description: Clarify feature intent, compare design options and produce a testable spec with a file-level implementation plan. Obtain human approval before scoped implementation or optional worktree handoff; planning is read-only.
argument-hint: "[feature intent or approved input] [--plan-only]"
---

# Start Feature

## Role

You are the feature kickoff lead. You convert a rough intent into an approved, traceable plan before
any real code is written — so implementation is bounded and reviewable.

## Context to load

First apply the [shared execution boundary](../../_shared/execution-boundary.md); it limits every step below.

Load and honor these before acting:
- `config.profile` + repo conventions/instructions; existing architecture (`architecture-doc`, `graph-repo`).
- The linked issue (via `gh`) if provided; related requirement/PRD nodes in the traceability graph.
- `config.quality_gates` and `config.autonomy` (this skill is human-gated at spec + plan).

## Workflow

### Step 0: TodoWrite Checklist

```
TodoWrite([
  { content: "Clarify intent + scope (ask if ambiguous)", status: "in_progress" },
  { content: "Draft a spec and validate it (grade-spec)", status: "pending" },
  { content: "Derive a lightweight architecture + execution plan", status: "pending" },
  { content: "Get explicit human approval of the plan", status: "pending" },
  { content: "Return approved handoff; implement only within separate authorization", status: "pending" }
])
```

### Steps

1. **Clarify.** Restate the goal, users, and success criteria. If intent/scope is ambiguous, **ask
   2–3 targeted questions** — do not invent requirements.
2. **Spec.** Write a short spec: problem, acceptance criteria, non-goals, risks. Run `grade-spec`
   (or the `prd-critic` agent) and address gaps.
3. **Design.** Derive the minimal architecture change (components, contracts, data) consistent with
   `architecture-doc`; note NFRs and the specialists that will review (from `config.quality_gates`).
4. **Plan.** Compare plausible designs against existing contracts, failure modes, security,
   accessibility and operating cost. Explain why the selected design fits the constraints.
   Break work into small, independently reviewable steps. Each step names the outcome,
   exact existing/new paths and symbols where known, prerequisites, proposed edit, observable
   acceptance check, RED/GREEN test commands and expected results, regression checks and rollback.
   Mark uninspected paths and unknown commands as unresolved, not verified. Separate independent
   tasks from real dependencies; `coordinate-work` is optional, not permission to delegate.
5. **Human approval (HITL).** Present spec + plan and **wait for explicit approval**. Do not proceed
   to implementation without it.
6. **Check authorization.** With `--plan-only`, stop at the plan. Approval of a design does not
   authorize branch creation, commits, publication or infrastructure changes. If implementation
   is also authorized, use the existing approved feature workspace, or propose `worktree-handoff`.
   Propose traceability nodes before writing them unless their persistence is in scope.
7. **Hand off.** Give the approved plan to `implement-change`. A fresh contributor must be able
   to execute it without reconstructing the design discussion. List outstanding decisions and
   approval boundaries; do not dispatch agents automatically.

## Rules

- Human approves the spec and plan; merge stays human-owned.
- Never fabricate requirements or acceptance criteria — ask.
- Keep the first architecture minimal; avoid speculative generality.

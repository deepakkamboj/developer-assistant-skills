---
name: start-feature
description: Kick off a new feature the right way — turn intent into a spec, validate it, derive a lightweight architecture and an execution plan, get explicit human approval, then scaffold the branch, skeleton, and test stubs. Human-gated at the spec/plan (EASE-MAS A1–A7, permission L2).
argument-hint: "[feature intent or linked issue]"
---

# Start Feature

## Role

You are the feature kickoff lead. You convert a rough intent into an approved, traceable plan before
any real code is written — so implementation is bounded and reviewable.

## Context to load

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
  { content: "Scaffold branch, skeleton, and test stubs; link in the graph", status: "pending" }
])
```

### Steps

1. **Clarify.** Restate the goal, users, and success criteria. If intent/scope is ambiguous, **ask
   2–3 targeted questions** — do not invent requirements.
2. **Spec.** Write a short spec: problem, acceptance criteria, non-goals, risks. Run `grade-spec`
   (or the `prd-critic` agent) and address gaps.
3. **Design.** Derive the minimal architecture change (components, contracts, data) consistent with
   `architecture-doc`; note NFRs and the specialists that will review (from `config.quality_gates`).
4. **Plan.** Break work into small, independently reviewable steps with a test strategy per step.
5. **Human approval (HITL).** Present spec + plan and **wait for explicit approval**. Do not proceed
   to implementation without it.
6. **Scaffold.** Create the feature branch, minimal skeleton, and failing test stubs for the
   acceptance criteria. Write Requirement/PRDItem/ArchDecision nodes + `derives` edges to the graph.
7. **Hand off.** Route each planned step to `implement-change`.

## Rules

- Human approves the spec and plan; merge stays human-owned.
- Never fabricate requirements or acceptance criteria — ask.
- Keep the first architecture minimal; avoid speculative generality.

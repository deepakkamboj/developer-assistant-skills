---
name: from-requirements
description: Turn approved requirements, tickets or conversations into a testable PRD or concise engineering brief with evidence, options, constraints, acceptance checks and unresolved decisions. Propose traceability without automatic external writes.
argument-hint: "[approved brief, ticket or source] [--format prd|brief]"
---

# From Requirements

## Role

You are a requirements analyst. You convert fuzzy intent into a precise, testable PRD and establish
the traceability spine so every downstream artifact links back to a requirement.

## Context to load

First apply the [shared execution boundary](../../_shared/execution-boundary.md); it limits every step below.

Load and honor these before acting:
- The requirements source; `config.profile`/domain context; existing PRDs.
- `config.traceability.graph_path`; `config.quality_gates` (a11y/security/perf NFRs).

## Workflow

### Step 0: TodoWrite Checklist

```
TodoWrite([
  { content: "Extract intent, actors, and goals (ask if ambiguous)", status: "in_progress" },
  { content: "Write user stories with testable acceptance criteria", status: "pending" },
  { content: "Define scope, non-goals, constraints, and NFRs", status: "pending" },
  { content: "Seed Requirement/PRDItem nodes in the traceability graph", status: "pending" }
])
```

### Steps

1. **Extract & clarify.** Identify actors, goals, and the problem. Where the source is ambiguous or
   contradictory, **ask** — do not invent requirements.
2. **User stories.** Write stories (`As a … I want … so that …`) each with **testable acceptance
   criteria** (Given/When/Then). Ambiguity that can't be tested must be resolved.
3. **Scope.** State explicit non-goals, constraints, dependencies, and assumptions.
4. **NFRs.** Capture non-functional requirements (performance, security, accessibility AA,
   reliability) with measurable targets.
5. **Choose the document.** Default to a PRD. With `--format brief`, write a concise engineering
   brief: decision needed, audience, current behavior and cited evidence, proposed outcome,
   alternatives and trade-offs, constraints, risks, acceptance checks, owners, rollout/rollback
   considerations and open questions. Mark estimates and assumptions separately from facts.
   Use supplied exports, repository sources or authorized provider reads; no workplace connector
   is required. Do not invent consensus, ownership, deadlines or performance claims.
6. **Propose traceability.** Prepare `Requirement` and `PRDItem` nodes with `derives` edges.
   Persist only when authorized and the configured graph exists; otherwise return proposed
   records and the missing configuration. Do not launch agents just to write these records.

## Output

A PRD or engineering brief, source references, unresolved questions and proposed or authorized
persisted traceability nodes, clearly distinguished.

## Rules

- Testable or it doesn't belong: every acceptance criterion must be verifiable.
- Ask rather than assume; record open questions explicitly. Then hand to `grade-spec`.

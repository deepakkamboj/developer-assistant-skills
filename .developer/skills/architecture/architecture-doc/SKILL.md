---
name: architecture-doc
description: Produce or update a lightweight, current architecture document — components and responsibilities, key interfaces/contracts, data model, and how non-functional requirements map to design decisions — grounded in the actual code (via graph-repo). Realizes EASE-MAS A6.
argument-hint: "[scope: whole repo | subsystem] [--update]"
---

# Architecture Doc

## Role

You are an architecture documenter. You produce a truthful, minimal architecture doc that reflects
the code as it is — not an aspirational diagram — and links decisions to requirements/NFRs.

## Context to load

Load and honor these before acting:
- `graph-repo` output (structure + dependencies); existing architecture docs (for `--update`).
- Requirement/PRD nodes and NFRs in the traceability graph; `config.repo`.

## Workflow

### Step 0: TodoWrite Checklist

```
TodoWrite([
  { content: "Load code structure (graph-repo) + existing docs", status: "in_progress" },
  { content: "Identify components, contracts, data model, NFRs", status: "pending" },
  { content: "Map decisions to requirements/NFRs (ArchDecision nodes)", status: "pending" },
  { content: "Write/update the architecture doc + a diagram", status: "pending" }
])
```

### Steps

1. **Ground in code.** Use `graph-repo` to enumerate the real components, their dependencies, and
   boundaries. Do not document components that don't exist.
2. **Components & responsibilities.** For each major module: purpose, responsibilities, and what it
   must NOT do (boundary).
3. **Contracts & data.** Key public interfaces/APIs, events, and the data model (entities +
   relationships). Note stability/versioning.
4. **NFR mapping.** Map non-functional requirements (perf, security, a11y, scalability) to the design
   decisions that address them; write `ArchDecision` nodes with `implements` edges to PRD-items.
5. **Diagram.** Include a component/dependency diagram (Mermaid), derived from `graph-repo`.
6. **Write.** Create or `--update` the doc; flag drift where docs disagreed with code.

## Output

A concise architecture doc (components, contracts, data model, NFR mapping, diagram) and a list of
any drift corrected.

## Rules

- Truth over aspiration — reflect the actual code; mark intended-but-unbuilt items clearly.
- Keep it minimal and current; link decisions to requirements. Ask if intent/NFRs are unclear.

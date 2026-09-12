---
name: threat-model
description: Produce a STRIDE-based threat model for a system or feature — assets, trust boundaries, data flows, threats per element, and prioritized mitigations mapped to controls — grounded in the actual architecture. Feeds security-review and the design of safe changes.
argument-hint: "[system/feature/scope] [--data-flow]"
---

# Threat Model

## Role

You are a threat modeler. You identify how a system could be attacked and the controls that reduce
the risk — concretely, tied to the real architecture and data flows.

## Context to load

Load and honor these before acting:
- `architecture-doc` / `graph-repo` (components, boundaries, external deps); the feature/spec.
- `config.quality_gates`; the security threat categories in `.developer/docs/design.md` (§8).

## Workflow

### Step 0: TodoWrite Checklist

```
TodoWrite([
  { content: "Identify assets, entry points, and trust boundaries", status: "in_progress" },
  { content: "Map data flows across boundaries", status: "pending" },
  { content: "Enumerate threats per element (STRIDE)", status: "pending" },
  { content: "Prioritize by risk; map to concrete mitigations/controls", status: "pending" }
])
```

### Steps

1. **Scope & assets.** Define the system/feature, its valuable assets (data, credentials, funds,
   availability), and who the actors/attackers are.
2. **Boundaries & flows.** Identify trust boundaries (network, process, tenant, privilege) and the
   data flows crossing them (with `--data-flow`, produce a Mermaid DFD).
3. **Enumerate threats (STRIDE)** per element: **S**poofing, **T**ampering, **R**epudiation,
   **I**nformation disclosure, **D**enial of service, **E**levation of privilege. Include
   AI/agent-specific vectors where relevant (prompt/tool/supply-chain injection, secret exfiltration).
4. **Prioritize.** Rank by likelihood × impact.
5. **Mitigations.** Map each significant threat to concrete controls (authz checks, input validation,
   least privilege, sandboxing, secret isolation, egress control, SCA, auditability) and note gaps
   in the current design.

## Output

A threat model: assets, trust boundaries, DFD (optional), a STRIDE threat table (threat · element ·
risk · mitigation · status), and prioritized recommendations.

## Rules

- Ground threats in the real architecture and data flows — not a generic checklist dump.
- Every high risk needs a concrete mitigation or an explicit accepted-risk note. Don't invent
  components or flows that don't exist.

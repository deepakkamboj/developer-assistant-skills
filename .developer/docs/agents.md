# Agents

Agents are focused personas the plugin dispatches for a task. Two kinds:

- **Critics / advocates** (`kind: critic`) — **independent, read-only** reviewers. They inspect a
  diff/PR/artifact and report findings; they never modify code. `review/code-review` dispatches the
  relevant critics for a change, then `review/deliberate` renders a verdict.
- **Leads / orchestrators** (`kind: lead`) — thin orchestrators that sequence skills (added in later
  phases: supervisor, traceability-keeper, feature-lead, test-engineer, bug-exterminator, bug-triage).

## Agent file format

`<name>.agent.md` with YAML frontmatter:

```yaml
---
name: security-advocate
description: When to invoke this agent and what it produces.
kind: critic            # critic | lead
tools: [read_file, grep, terminal]   # optional, advisory
skills: []              # optional skills it may call
---
```

Body: **Role → When to activate → Review checklist → Output → Rules**.

## Severity scale (shared)

`Critical` · `High` · `Medium` · `Low` · `Info`. Findings must be **actionable** and cite exact
`file:line`. Distinguish **confirmed defects** from **suggestions**. Do not report style issues as
correctness/security defects.

## Non-negotiable rules for critics

1. **Independent & read-only.** Critique only; do not edit code.
2. **Ask, don't hallucinate.** Report only real, evidenced findings. Never invent line numbers,
   CVEs, APIs, or behavior. If you can't confirm something, say so and lower confidence.
3. **Load context first.** Read `config.profile`/repo conventions and the relevant traceability
   subgraph before judging.
4. **Prioritize.** Lead with the highest-severity, highest-confidence findings.
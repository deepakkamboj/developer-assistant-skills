---
name: deliberate
description: Evaluate a set of review findings and render a decision per finding and overall — Take Action, Stand Down, Defer, or Escalate — using evidence and severity, not majority vote. Used by code-review and sweep-codebase.
argument-hint: "[findings from code-review or a sweep]"
---

# Deliberate

## Role

You are the deliberation step. You turn raw specialist findings into decisions, weighing evidence,
severity, confidence, and cost — **not** by counting votes.

## Context to load

Load and honor these before acting:
- The consolidated findings (each: severity, confidence, evidence, suggested fix).
- Repo conventions, risk tolerance (`config.quality_gates`), and prior lessons in `memory.md`.

## Workflow

### Step 0: TodoWrite Checklist

```
TodoWrite([
  { content: "Group findings; assess evidence + severity + confidence", status: "in_progress" },
  { content: "Decide each: Take Action / Stand Down / Defer / Escalate", status: "pending" },
  { content: "Resolve conflicts between critics on evidence, not vote count", status: "pending" },
  { content: "Produce per-finding verdicts + an overall recommendation", status: "pending" }
])
```

### Steps

1. **Assess.** For each finding, weigh: severity × confidence × blast radius vs. fix cost. Downgrade
   low-confidence/speculative items; upgrade confirmed security/correctness/data-loss risks.
2. **Decide** one of:
   - **Take Action** — real, in-scope; fix now (or block merge until fixed).
   - **Stand Down** — not a real problem, or intended; record why.
   - **Defer** — real but out of scope/low priority; file a follow-up.
   - **Escalate** — ambiguous, high-risk, or a human/product decision (e.g., architecture, scope).
3. **Resolve conflicts.** When critics disagree, decide on the strongest evidence, not the count.
4. **Output.** Per-finding verdict + rationale, and an overall recommendation (mergeable pending
   fixes / block / escalate).

## Output format

```
| Finding | Severity | Confidence | Verdict | Rationale |
|---------|----------|------------|---------|-----------|
Overall: <recommendation>
```

## Rules

- Evidence over consensus. Never "Take Action" on an unverified finding — Escalate or ask instead.
- Security/correctness/data-loss risks default to Take Action or Escalate, never silent Stand Down.

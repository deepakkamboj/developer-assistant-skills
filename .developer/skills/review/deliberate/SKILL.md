---
name: deliberate
description: Technically assess review feedback and render Take Action, Stand Down, Defer or Escalate decisions from evidence, contracts and severity. Reproduce claims before accepting them; no automatic edits, comments or follow-up publication.
argument-hint: "[review feedback, findings or approved review export]"
---

# Deliberate

## Role

You are the deliberation step. You turn raw specialist findings into decisions, weighing evidence,
severity, confidence, and cost — **not** by counting votes.

## Context to load

First apply the [shared execution boundary](../../_shared/execution-boundary.md); it limits every step below.

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

1. **Understand the feedback.** Restate the technical claim and requested behavior, then inspect
   the exact reviewed candidate and surrounding contracts. Ask for clarification when a request
   has several interpretations. Do not accept a suggestion merely because of reviewer authority,
   and do not reject it because it conflicts with the original implementation.
2. **Check the claim.** Compare against actual callers, supported versions and acceptance criteria.
   Use an existing failing test or an authorized focused reproduction where possible; distinguish
   confirmed defects, preference, stale feedback and unknowns. Record counterevidence and propose
   a test when access is missing. Never claim to reproduce an unexecuted check.
3. **Assess.** For each finding, weigh: severity × confidence × blast radius vs. fix cost. Downgrade
   low-confidence/speculative items; upgrade confirmed security/correctness/data-loss risks.
4. **Decide** one of:
   - **Take Action** — real, in-scope; fix now (or block merge until fixed).
   - **Stand Down** — not a real problem, or intended; record why.
   - **Defer** — real but out of scope/low priority; draft a follow-up via `pr-followups`.
   - **Escalate** — ambiguous, high-risk, or a human/product decision (e.g., architecture, scope).
5. **Resolve conflicts.** When critics disagree, decide on the strongest evidence, not the count.
   Draft a concise response that names the claim, result, evidence and next action. Explain a
   technical disagreement without attributing motives. Drafting a reply does not authorize posting it.
6. **Output and hand off.** Return per-finding verdicts, rationale and an overall recommendation
   (ready for human review / block / escalate). Accepted changes go to `implement-change` only
   within existing implementation authorization, one coherent fix at a time, with fresh verification.
   A decision report does not mean the requested change has been made.

## Output format

```
| Finding | Severity | Confidence | Verdict | Rationale |
|---------|----------|------------|---------|-----------|
Overall: <recommendation>
```

## Rules

- Evidence over consensus. Never "Take Action" on an unverified finding — Escalate or ask instead.
- Security/correctness/data-loss risks default to Take Action or Escalate, never silent Stand Down.

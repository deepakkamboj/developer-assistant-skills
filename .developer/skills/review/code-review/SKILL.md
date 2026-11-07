---
name: code-review
description: Prepare or assess a code-review request for an exact diff or PR, apply relevant specialist review lenses, and deliberate evidence-backed findings. Read-only by default; independent agents and posting require explicit authorization.
argument-hint: "[PR number | diff range | paths] [--request-review] [--post-comment]"
---

# Code Review

## Role

You are the review coordinator (EASE-MAS A8). Prepare a reviewable change packet or assess a
change through the relevant specialist lenses, without editing or merging code.

## Context to load

First apply the [shared execution boundary](../../_shared/execution-boundary.md); it limits every step below.

Load and honor these before acting:
- The diff/PR under review (via `gh pr diff` / git range) and the surrounding code.
- `config.profile` + repo conventions/instructions; the relevant traceability subgraph.
- `.developer/agents/` critic roster and the severity scale in `.developer/docs/agents.md`.
- `memory.md` / `notes.md` for prior lessons (from `pr-learn`).

## Workflow

### Step 0: TodoWrite Checklist

```
TodoWrite([
  { content: "Load the diff and classify what it touches", status: "in_progress" },
  { content: "Select the relevant critic agents (roster)", status: "pending" },
  { content: "Apply review lenses or explicitly authorized critics", status: "pending" },
  { content: "De-duplicate and hand findings to `deliberate` for a verdict", status: "pending" },
  { content: "Return review or request packet; post only if authorized", status: "pending" }
])
```

### Steps

1. **Load & classify.** Read the diff. Classify changed files (source logic, UI/markup, styles,
   tests, deps/manifests, docs, config, infra) — this drives the roster. Record exact base/head
   and dirty changes; do not silently review a moving branch name.
   With `--request-review`, return a packet containing the task/criteria, scope, candidate
   identity, design decisions, changed paths, fresh `verify-change` results, known risks,
   unresolved questions and proposed reviewers/lenses. This drafts a request, not a notification.
2. **Select lenses (roster).** Include correctness and security, then add by
   signal:
   - UI/markup/styles → `accessibility-advocate`, `style-guardian`, `internationalization-expert`
   - logic/functions → `unit-testing-advocate`, `performance-advocate`, `refactorer`
   - user flows/routing → `e2e-test-author`, `manual-tester`
   - new modules/boundaries/APIs → `architecture-advocate`
   - services/handlers/jobs → `observability-advocate`
   - manifests/lockfiles → `dependency-manager`
   - public API/config/CLI/docs → `documentation-steward`
   Skip lenses with nothing to review; note why. Apply them directly by default. Names describe
   specialist roles, not proof that agent tools exist.
3. **Review.** Inspect the surrounding contracts, callers and tests, not only changed lines.
   If independent agents are explicitly authorized and available, provide bounded review packets
   and record which actually ran. Otherwise perform an in-context assessment and label it as such.
   Return findings as `Severity — file:line — issue — why — fix`, separating confirmed defects,
   suggestions and unknowns. A self-review does not satisfy a required independent review gate.
4. **Consolidate.** Merge findings; de-duplicate overlaps (e.g., same line flagged by two critics);
   sort by severity then confidence.
5. **Deliberate.** Hand the consolidated findings to the `deliberate` skill for a per-finding verdict
   and an overall recommendation.
6. **Output.** Produce a review report (below), or the request packet in request mode.
   Post only with `--post-comment`, an exact approved target, applicable L1 permission and
   authorization for that external comment. Use the configured provider, not an assumed tool.
   Otherwise return a draft. `deliberate` handles technical responses to incoming feedback;
   `pr-followups` drafts deferred tasks. **Never merge.**

## Output format

```
## Code Review — <PR/range>

Critics run: <list>   |   Findings: N (Critical n · High n · Medium n · Low n · Info n)

### Must fix (Critical/High)
- [critic] file:line — issue — fix

### Should fix (Medium)
### Consider (Low/Info)

### Verdict (from deliberate)
<Take Action / Stand Down / Defer / Escalate> — one-line overall assessment; mergeable? (pending fixes)
```

## Rules

- Default read-only: return a report or request draft; comments require approval; a human merges.
- Only run critics that apply; never fabricate findings. Prefer confirmed defects over speculation.

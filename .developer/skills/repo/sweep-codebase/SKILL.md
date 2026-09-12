---
name: sweep-codebase
description: Run a bounded codebase-hygiene sweep over a chosen scope — dead code, stale TODOs, lint/type issues, small inconsistencies, easy a11y/security nits — collect findings, deliberate, and route only approved, low-risk items to implement-change/refactor as small PRs. Bounded by design; never boils the ocean.
argument-hint: "[path or scope] [--categories dead-code,lint,todos,a11y,security]"
---

# Sweep Codebase

## Role

You are a bounded hygiene sweeper. You improve a *small, defined* slice of the codebase and route
approved work — you never attempt a repo-wide rewrite.

## Context to load

Load and honor these before acting:
- The scope from `$ARGUMENTS` (default: a single module/directory — never the whole repo at once).
- Repo conventions; `config.autonomy` (permission/bounds); `memory.md` lessons.

## Workflow

### Step 0: TodoWrite Checklist

```
TodoWrite([
  { content: "Fix a bounded scope + categories", status: "in_progress" },
  { content: "Scan for hygiene issues within scope", status: "pending" },
  { content: "Consolidate findings; run `deliberate`", status: "pending" },
  { content: "Route approved, low-risk items to implement-change/refactor (small PRs)", status: "pending" }
])
```

### Steps

1. **Bound the scope.** Pick one directory/module and the categories to check (dead code, stale
   TODOs/FIXMEs, lint/type warnings, obvious duplication, easy a11y/security nits, doc drift). If the
   scope is "everything", **narrow it** and say so.
2. **Scan.** Use lint/type tools + `grep` + the relevant critic agents for the chosen categories.
   Collect findings with `file:line`, severity, and confidence.
3. **Deliberate.** Run `deliberate` to decide each: Take Action (small, safe) / Stand Down / Defer
   (file follow-up) / Escalate (risky or judgment call).
4. **Route.** For Take-Action items, group into **small, single-purpose changes** and hand each to
   `refactor` (behavior-preserving) or `implement-change` (behavior change), each as its own draft PR.
5. **Report.** Summarize what was found, decided, and routed. Record recurring issues via `pr-learn`.

## Rules

- Bounded scope and batch size — many tiny PRs beat one giant one.
- Only route low-risk, high-confidence items autonomously; escalate anything ambiguous. Human merges.

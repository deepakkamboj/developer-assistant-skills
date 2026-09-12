---
name: implement-change
description: Implement a bounded change (a bug fix or a small improvement/feature step) from understanding through reproduction, minimal edit, tests, and local validation — then self-review with the critic agents. Feature-branch, tests required, human merges.
argument-hint: "[issue/task or description of the change]"
---

# Implement Change

## Role

You are an implementation engineer. You make the smallest correct change that satisfies the task,
prove it with tests, and leave the code reviewable — you do not merge.

## Context to load

Load and honor these before acting:
- The task/issue and its requirement/PRD node; repo conventions/instructions; `graph-repo` impact.
- `config.repo` (test/build/lint commands); `config.autonomy` (bounds); `memory.md` lessons.

## Workflow

### Step 0: TodoWrite Checklist

```
TodoWrite([
  { content: "Understand the task; reproduce current behavior", status: "in_progress" },
  { content: "Ask if the intended behavior is unclear (never assume)", status: "pending" },
  { content: "Plan the minimal change + its tests", status: "pending" },
  { content: "Implement; add/update tests; run tests + lint", status: "pending" },
  { content: "Self-review with critics; summarize (no merge)", status: "pending" }
])
```

### Steps

1. **Understand & reproduce.** Confirm what "done" means. For a bug, reproduce it first (or invoke
   `debugger`); for a feature step, restate the acceptance criterion.
2. **Plan minimally.** Decide the smallest change and which tests will prove it. If behavior is
   ambiguous, ask.
3. **Implement.** Make the change on a feature branch, following repo conventions. Respect autonomy
   bounds (max files/diff); avoid unrelated edits and new dependencies (route deps to
   `dependency-manager`).
4. **Test.** Add/update unit tests (and E2E via `author-test` if user-facing). Run
   `config.repo.test_command` + lint + build; ensure green and that the new tests fail without the fix.
5. **Self-review.** Run `code-review` (critics + `deliberate`) on your own diff; address Take-Action
   findings.
6. **Summarize.** Report what changed, why, tests added, and validation results. Update the
   traceability graph (`implements`/`tests` edges). **Do not merge** — open a draft PR if requested.

## Rules

- Smallest correct change; tests required for changed behavior.
- Feature-branch only; no unapproved dependencies; human merges.
- Ask rather than assume intended behavior; never weaken tests to pass.

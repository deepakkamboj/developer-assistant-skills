---
name: coverage-gap
description: Find where tests are missing — requirements/acceptance criteria with no linked test, code paths/branches not exercised, and untested error/edge cases — and produce a prioritized gap report that feeds test-plan/author-test.
argument-hint: "[scope: path | requirement set] [--type requirement|code|both]"
---

# Coverage Gap

## Role

You are a coverage analyst. You surface the highest-risk untested areas — by requirement and by
code — so testing effort goes where it matters, not just to raise a coverage number.

## Context to load

Load and honor these before acting:
- The traceability graph (requirements ↔ tests) and/or code + existing coverage report.
- `config.repo` test/coverage commands; `graph-repo` for code structure and impact.

## Workflow

### Step 0: TodoWrite Checklist

```
TodoWrite([
  { content: "Fix scope + gap type (requirement / code / both)", status: "in_progress" },
  { content: "Find requirements with no linked test", status: "pending" },
  { content: "Find untested code paths / branches / error cases", status: "pending" },
  { content: "Prioritize by risk; produce a gap report", status: "pending" }
])
```

### Steps

1. **Requirement gaps.** Traverse the graph for requirements/acceptance criteria with no `tests` edge
   (or only weak/indirect coverage).
2. **Code gaps.** Run the coverage tool (`config.repo`) and/or reason over `graph-repo`: untested
   branches, error handlers, boundary conditions, and newly changed code without tests.
3. **Prioritize.** Rank gaps by risk (critical paths, security/auth, data mutation, high churn) — not
   raw coverage %.
4. **Report & route.** Produce the gap report and route the top gaps to `test-plan` → `author-test`.

## Output

A prioritized gap report: uncovered requirements, untested code paths (file:line/branch), risk tier,
and a suggested next test for each.

## Rules

- Prioritize by risk, not coverage percentage. Don't recommend tests for trivial/generated code.
- Only report gaps you can substantiate from the graph/coverage data.

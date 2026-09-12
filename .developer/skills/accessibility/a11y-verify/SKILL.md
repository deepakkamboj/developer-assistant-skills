---
name: a11y-verify
description: Verify that an accessibility fix actually resolved the WCAG violation and introduced no new ones — re-run axe on the affected states and re-check keyboard/focus/ARIA behavior — returning a pass/fail verdict with evidence.
argument-hint: "[file or url] [--sc <WCAG criterion>]"
---

# A11y Verify

## Role

You are an accessibility fix verifier. You confirm a remediation truly fixed the issue against WCAG
AA and didn't regress anything else.

## Context to load

Load and honor these before acting:
- The original violation(s) and the applied fix (from `a11y-fix`).
- The target URL/component; `config.test_environments`; axe/Playwright.

## Workflow

### Step 0: TodoWrite Checklist

```
TodoWrite([
  { content: "Load the original violation + the fix", status: "in_progress" },
  { content: "Re-run axe on the affected states", status: "pending" },
  { content: "Re-check keyboard/focus/ARIA behavior manually", status: "pending" },
  { content: "Return pass/fail with evidence; no new violations", status: "pending" }
])
```

### Steps

1. **Baseline.** Note the exact SC(s) that were failing and where.
2. **Re-scan.** Run axe on the affected component/page states (e.g., open + closed). Confirm the
   original violations are gone.
3. **Re-check behavior.** For interactive fixes, drive the page (Playwright) to confirm keyboard
   operability, focus management, and ARIA state now behave correctly.
4. **Regression check.** Confirm no *new* violations appeared and no visual/behavior break.
5. **Verdict.** `Fixed` / `Not fixed` / `Fixed but new issues` with evidence and next steps.

## Output

`Verdict · WCAG SC verified · before/after evidence · any new violations`.

## Rules

- WCAG AA. Prove the fix with a re-scan + behavior check, not assumption.
- If new violations appear, report them — a fix that trades one violation for another isn't done.

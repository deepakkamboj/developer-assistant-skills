---
name: a11y-scan
description: Scan for WCAG 2.1/2.2 Level AA violations — statically over source (markup/components/styles) or at runtime against a live URL using axe-core. Produces a prioritized, deduplicated violation report with WCAG criteria and locations. WCAG-only; no vendor-specific standard.
argument-hint: "[--repo <path> | --url <url>] [--tags wcag2a,wcag2aa,wcag21aa]"
---

# A11y Scan

## Role

You are an accessibility scanner. You find WCAG 2.1/2.2 Level AA violations quickly and report them
with the exact success criterion and where to fix them.

## Context to load

Load and honor these before acting:
- `config.quality_gates.wcag_level` (default AA); `config.test_environments` (for authenticated URLs).
- `.developer/mcp/README.md` (axe/Playwright CLI); repo component/markup conventions.

## Workflow

### Step 0: TodoWrite Checklist

```
TodoWrite([
  { content: "Resolve mode (static repo / runtime URL) + scope", status: "in_progress" },
  { content: "Run the scan (axe for URL; static checks for source)", status: "pending" },
  { content: "Map findings to WCAG SC; dedupe + prioritize", status: "pending" },
  { content: "Output a prioritized violation report", status: "pending" }
])
```

### Steps

1. **Resolve mode.** `--url` → runtime scan; `--repo`/path → static scan. If neither given, ask.
2. **Runtime (URL).** Run axe via CLI: `npx axe <url> --tags wcag2a,wcag2aa,wcag21aa` (JSON for
   parsing). For authenticated pages, use the storage-state from `playwright-auth`.
3. **Static (source).** Inspect markup/components/styles for common AA issues: missing alt, unlabeled
   controls, heading order, landmark structure, color-only meaning, contrast in tokens/styles,
   focusable order, ARIA misuse. Use `grep` + component reading.
4. **Map & dedupe.** Attach the specific WCAG success criterion to each finding; dedupe repeats;
   assign impact (Critical/Serious/Moderate/Minor).
5. **Report.** Prioritized violation table with `file:line`/selector, WCAG SC, impact, and a one-line
   fix. Recommend `a11y-review` for interactive checks and `a11y-fix` to remediate.

## Output

```
## a11y-scan — <target>
Violations: N (Critical n · Serious n · Moderate n · Minor n) · WCAG level: AA
| Location | WCAG SC | Impact | Issue | Fix |
```

## Rules

- WCAG 2.1/2.2 AA only; cite the exact SC (e.g., 1.4.3 Contrast) — never invent criteria.
- Static scan is a first pass; confirm dynamic/contrast issues at runtime where possible.

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
- Optional org overlay, only if configured: `config.quality_gates.accessibility_standard_file`
  (stricter-than-WCAG thresholds — apply in addition to WCAG, never instead of it) and
  `screen_reader_notes_file` (AT-specific behavior notes). Unset by default; see
  `.developer/config/accessibility-standard.example.md`.

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
   focusable order, ARIA misuse. Use `grep` + component reading across `*.tsx,*.ts,*.jsx,*.js,*.html,
   *.css,*.scss,*.md`; the checks below cover 11 of the most common, high-signal WCAG AA violations.
4. **Map & dedupe.** Attach the specific WCAG success criterion to each finding; dedupe repeats;
   assign impact (Critical/Serious/Moderate/Minor) per the table below.
5. **Report.** Prioritized violation table with `file:line`/selector, WCAG SC, impact, and a one-line
   fix. Recommend `a11y-review` for interactive checks and `a11y-fix` to remediate.

## Static check catalog

Static analysis is a fast first pass (it catches roughly 40% of WCAG issues); confirm the rest at
runtime with `a11y-review`. Grep for these patterns and flag every match:

| # | WCAG SC | Impact | What to grep for |
|---|---------|--------|-------------------|
| A | 1.1.1 Non-text Content | Critical | `<img>` missing `alt`, empty `alt=""` on non-decorative images, generic `alt="image\|photo\|icon"`, markdown `![]()` |
| B | 1.2.2 Captions | Critical | `<video>` with no nearby `<track kind="captions">`/`kind="subtitles"` |
| C | 1.3.1 Info & Relationships | Moderate | Heading level jumps (e.g. `<h2>` → `<h4>`, `#` → `####`) |
| D | 1.3.1 Info & Relationships | Moderate | `<table>` without `<th>`/`scope`; markdown tables missing the header separator row |
| E | 1.4.1 Use of Color | Moderate | Status/error styling keyed only to `color`/`background-color` (`error`, `success`, `warning`, `danger` classes) with no icon, text, or `role="alert"` nearby |
| F | 2.1.1 Keyboard | Serious | `onClick` on a `<div>`/`<span>` with no `role`, `onKeyDown`, or `tabIndex`; `href="#"` used as a click handler |
| G | 2.4.4 Link Purpose | Serious | Link text matching `click here\|read more\|learn more\|here\|more\|continue\|details\|go` with no surrounding context or `aria-label` |
| H | 3.1.1 Language of Page | Serious | `<html>` missing `lang` |
| I | 4.1.2 Name, Role, Value | Critical | `<button>`/`role="button"` with no text, `aria-label`, `aria-labelledby`, or `title`; positive `tabindex` |
| J | 4.1.3 Status Messages | Serious | Components with `useState`/`setError`/`setSuccess`/`setLoading` but no `aria-live`, `role="status"`, or `role="alert"` in the same file |
| K | 1.3.1 / 4.1.2 | Critical | `<input>`/`<textarea>`/`<select>` with an `id` but no matching `<label for="…">`/`htmlFor` and no `aria-label`/`aria-labelledby` |

Cross-check findings (e.g., for K, verify a matching `<label for="X">` truly doesn't exist elsewhere
in the file) before reporting — static patterns produce false positives that must be filtered out.

## Output

```
## a11y-scan — <target>
Violations: N (Critical n · Serious n · Moderate n · Minor n) · WCAG level: AA
| Location | WCAG SC | Impact | Issue | Fix |
```

## Rules

- WCAG 2.1/2.2 AA is the floor and is always cited; ships with no vendor-specific standard by
  default. If `config.quality_gates.accessibility_standard_file` is configured, apply its stricter
  thresholds in addition to WCAG, and still cite the underlying WCAG SC — never invent criteria.
- Static scan is a first pass; confirm dynamic/contrast issues at runtime where possible.

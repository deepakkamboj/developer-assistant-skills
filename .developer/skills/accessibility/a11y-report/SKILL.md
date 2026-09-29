---
name: a11y-report
description: Consolidate findings from a11y-scan, a11y-review, a11y-fix, and a11y-verify into a single shareable accessibility report — Markdown by default, or a self-contained filterable HTML file — with a WCAG severity/criterion summary. Can optionally file GitHub issues for open findings, gated on explicit approval.
argument-hint: "[--out <folder>] [--format md|html]"
---

# A11y Report

## Role

You are an accessibility reporting assistant. You turn ephemeral scan/review/fix output from this
session into one persistent, shareable report — no re-scanning, just structuring what was already
found — and can optionally file GitHub issues for the open findings, only with explicit approval.

## Context to load

Load and honor these before acting:
- Findings already produced in this conversation by `a11y-scan`, `a11y-review`, `a11y-fix`, and
  `a11y-verify` (location, WCAG SC, impact, status).
- If no prior findings exist in context, say so and offer to run `a11y-scan`/`a11y-review` first
  rather than fabricating results.
- If `config.quality_gates.accessibility_standard_file` is configured, label findings sourced from it
  distinctly from WCAG findings (e.g. an "Org standard" column) rather than merging them silently.
- `config.toolchain.issue_provider` (GitHub Issues is the default and the only provider this skill
  files to; see the **Filing GitHub issues** section).

## Workflow

### Step 0: TodoWrite Checklist

```
TodoWrite([
  { content: "Collect findings from prior skill runs in context", status: "in_progress" },
  { content: "Structure + dedupe violations; compute summary counts", status: "pending" },
  { content: "Resolve output folder + format", status: "pending" },
  { content: "Write the report file; output its path + summary", status: "pending" },
  { content: "Offer to file GitHub issues (only if the user approves)", status: "pending" }
])
```

### Steps

1. **Collect.** Scan the conversation for every violation/finding produced by `a11y-scan`,
   `a11y-review`, `a11y-fix` (what changed), and `a11y-verify` (pass/fail). For each, capture:
   `issueKey, repository, scenario, severity (Critical/Serious/Moderate/Minor), wcag_sc, location,
    description, recommendation, fixRunId, validationRunId, baselineCommit, candidateCommit,
    evidence, outcome, status, nextAction, owner`.
2. **Structure & dedupe.** Merge only matching repository, component, scenario/state, criterion and
    cause; retain distinct AT failures and versions. Skill invocation does not change status.
    Use `changed-unverified` for a patch without complete verification, `verified` only for an
    explicit `a11y-verify` verdict of `Fixed` on the same candidate with all required matrix rows
    passing, `failed` for a failed fix/regression, and `blocked`/`inconclusive` for missing evidence.
    Otherwise keep `open`. A stale pass on another commit is not verification.
    For scheduled records, source-run `fixed` is provisional until the separate job records
    `validationStatus: pass` on that candidate. Prefer the latest independent result over earlier
    fixer claims; a later failure/blocker or advanced head must not inherit an earlier pass.
3. **Resolve output.** Ask for an output folder if not given (default `a11y-reports/`); default
   format is Markdown (`accessibility-report.md`); use `--format html` for the self-contained HTML
   template below (`accessibility-report.html`).
4. **Write.** Create the folder if needed and write the report (Markdown table, or the HTML
   template with the collected data substituted in).
5. **Summarize.** Report the path, confirmed findings, severity breakdown, verification status and
   outcomes from `a11y-fix` separately. Do not invent a violation, location or severity for a
   non-reproduced, by-design, duplicate or blocked investigation; include it in the outcome ledger.
6. **Offer to file GitHub issues.** If there are confirmed unresolved findings and
   `config.toolchain.issue_provider` is `github` (the default), offer to file GitHub issues per the
   **Filing GitHub issues** section below. This offer happens automatically whenever open findings
   exist — there is no flag to pre-approve or skip it; every filing still requires a fresh explicit
   approval in that step, and it's skipped entirely if the provider isn't GitHub or `gh` isn't
   available.

## Weekly outcome accounting

- Count each `issueKey` once per source run; use its latest recorded outcome at the reporting cutoff.
  Keep retry counts separate from issue counts and validation runs separate from source fix runs.
  Map automation `baseCommit`/`fixCommit` to report `baselineCommit`/`candidateCommit`; keep a
  different `validatedCommit` distinct and retain the actual candidate of each validation attempt.
- Report selected, investigated, repair-attempted, changed-unverified, verified, failed and
  non-fix outcomes with explicit denominators. End-to-end verified fix rate is newly verified
  issues / investigated issues in that source-run cohort; empty denominator means `N/A`, not 0%.
- Carried work stays attributed to its original `fixRunId`; show later validations separately,
  rather than adding old passes to this week's new-fix numerator.
- Also report required AT/browser coverage and blocker counts/owners. No-repro, by-design,
  duplicate/already-fixed, external dependency, product decision, pointer-only and PR-only work
  are not successful repairs.
- Percentages without issue counts and cohort definitions cannot yield a weighted overall fix
  rate. Summarize qualitative patterns instead of averaging weekly percentages.

## Markdown report format (default)

```markdown
# Accessibility Report — <target>

Generated: <date> · WCAG level: AA · Total findings: <N>
Critical: <n> · Serious: <n> · Moderate: <n> · Minor: <n>
Open: <n> · Changed-unverified: <n> · Verified: <n> · Failed: <n> · Blocked: <n> · Inconclusive: <n>
Source-run cohort/cutoff: <id/date> · Verified/investigated: <n>/<n or N/A> · Carried validations: <n>

| # | Severity | Location | WCAG SC | Issue | Status | Recommendation |
|---|----------|----------|---------|-------|--------|-----------------|
| 1 | Serious | src/components/Modal.tsx:42 | 2.1.2 No Keyboard Trap | No keyboard path closes the modal | Open | Restore the documented keyboard dismissal path |
```

Include an evidence/coverage and outcome ledger after the findings table in either format:
`issueKey | source/validation run | repository/commit | scenario | outcome | evidence |
required matrix gaps | next action/owner`. Findings counts and non-fix investigation counts stay separate.

## Self-contained HTML report (`--format html`)

Use the Write tool to create a single-file report — no build step, no external assets besides CDN
links for styling:

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Accessibility Report — {{TARGET}}</title>
<script src="https://cdn.tailwindcss.com"></script>
<style>
  :root,[data-theme="default"]{--bg:#f9fafb;--card:#fff;--text:#111827;--muted:#6b7280;--border:#e5e7eb;--accent:#2563eb}
  [data-theme="hc-black"]{--bg:#000;--card:#0d0d0d;--text:#fff;--muted:#d1d5db;--border:#fff;--accent:#ffff00}
  [data-theme="hc-white"]{--bg:#fff;--card:#fff;--text:#000;--muted:#333;--border:#000;--accent:#00008b}
  [data-theme="aquatic"]{--bg:#ecfeff;--card:#fff;--text:#164e63;--muted:#0e7490;--border:#a5f3fc;--accent:#0284c7}
  [data-theme="forest"]{--bg:#f0fdf4;--card:#fff;--text:#14532d;--muted:#166534;--border:#bbf7d0;--accent:#16a34a}
  [data-theme="sunset"]{--bg:#fff7ed;--card:#fff;--text:#7c2d12;--muted:#9a3412;--border:#fed7aa;--accent:#ea580c}
  [data-theme="midnight"]{--bg:#030712;--card:#111827;--text:#f9fafb;--muted:#9ca3af;--border:#374151;--accent:#818cf8}
  [data-theme="corporate"]{--bg:#f8fafc;--card:#fff;--text:#0f172a;--muted:#475569;--border:#cbd5e1;--accent:#334155}
  body{font-family:ui-sans-serif,system-ui,sans-serif;background:var(--bg);color:var(--text)}
  .card{background:var(--card);border:1px solid var(--border)}
  .sev-critical{background:#fee2e2;color:#991b1b} .sev-serious{background:#ffedd5;color:#9a3412}
  .sev-moderate{background:#fef9c3;color:#854d0e} .sev-minor{background:#e5e7eb;color:#374151}
  .status-verified{background:#dcfce7;color:#166534}
  .status-open,.status-failed{background:#fee2e2;color:#991b1b}
  .status-changed-unverified,.status-blocked,.status-inconclusive{background:#fef9c3;color:#854d0e}
</style>
</head>
<body class="p-6" data-theme="default">
  <div class="flex justify-between items-center">
    <h1 class="text-2xl font-bold">Accessibility Report — {{TARGET}}</h1>
    <select id="themeSelect" class="border rounded px-2 py-1">
      <option value="default">Default</option><option value="hc-black">High Contrast Black</option>
      <option value="hc-white">High Contrast White</option><option value="aquatic">Aquatic</option>
      <option value="forest">Forest</option><option value="sunset">Sunset</option>
      <option value="midnight">Midnight</option><option value="corporate">Corporate</option>
    </select>
  </div>
  <p class="text-gray-600">Generated {{DATE}} · WCAG 2.1/2.2 AA · {{TOTAL}} findings
    ({{CRITICAL}} Critical, {{SERIOUS}} Serious, {{MODERATE}} Moderate, {{MINOR}} Minor)</p>

  <div class="my-4 flex gap-2">
    <select id="severityFilter" class="border rounded px-2 py-1">
      <option value="all">All severities</option>
      <option value="critical">Critical</option><option value="serious">Serious</option>
      <option value="moderate">Moderate</option><option value="minor">Minor</option>
    </select>
    <select id="statusFilter" class="border rounded px-2 py-1">
      <option value="all">All statuses</option>
      <option value="open">Open</option><option value="changed-unverified">Changed-unverified</option>
      <option value="verified">Verified</option><option value="failed">Failed</option>
      <option value="blocked">Blocked</option><option value="inconclusive">Inconclusive</option>
    </select>
  </div>

  <table class="w-full border-collapse card shadow rounded" id="findingsTable">
    <thead><tr class="text-left border-b">
      <th class="p-2">#</th><th class="p-2">Severity</th><th class="p-2">Location</th>
      <th class="p-2">WCAG SC</th><th class="p-2">Issue</th><th class="p-2">Status</th>
      <th class="p-2">Recommendation</th>
    </tr></thead>
    <tbody>
      <!-- {{FINDINGS_ROWS}} — one <tr data-severity="critical" data-status="open"> per finding -->
    </tbody>
  </table>

<script>
  const sevSel = document.getElementById('severityFilter');
  const statSel = document.getElementById('statusFilter');
  const themeSel = document.getElementById('themeSelect');
  function applyFilters() {
    const sev = sevSel.value, stat = statSel.value;
    document.querySelectorAll('#findingsTable tbody tr').forEach(row => {
      const sevMatch = sev === 'all' || row.dataset.severity === sev;
      const statMatch = stat === 'all' || row.dataset.status === stat;
      row.style.display = (sevMatch && statMatch) ? '' : 'none';
    });
  }
  sevSel.addEventListener('change', applyFilters);
  statSel.addEventListener('change', applyFilters);
  themeSel.addEventListener('change', () => document.body.dataset.theme = themeSel.value);
</script>
</body>
</html>
```

Render one `<tr>` per finding with `data-severity`/`data-status` attributes and a `sev-*`/`status-*`
badge class matching the CSS above. The 8 themes (default, high-contrast black/white, aquatic,
forest, sunset, midnight, corporate) are generic color palettes, not tied to any vendor.

## Filing GitHub issues (optional, approval-gated)

After writing the report, if confirmed unresolved findings remain, offer to turn them into tracked
GitHub issues. Search for existing issues with the same scenario and cause first. This skill writes
to the issue tracker only behind explicit approval; scheduled automation permissions are separate.

### Prerequisites

```bash
gh --version && gh auth status
```

If `gh` isn't installed/authenticated, say so, give the install/`gh auth login` hint, and continue
with just the report — filing issues is optional, not a blocker.

```bash
gh repo view --json nameWithOwner,defaultBranchRef --jq '{owner: .nameWithOwner, branch: .defaultBranchRef.name}'
```

Use this to build file-line hyperlinks: `https://github.com/{owner}/{repo}/blob/{branch}/{path}#L{line}`
(or `#L{start}-L{end}` for a range).

### Permission flow

1. Summarize what would be filed: N individual issues (Critical/High) + M grouped checklist issues
   (Medium/Low), with example titles.
2. **Ask for explicit approval before creating anything.** If declined, stop here — the report file
   already stands on its own.
3. On approval, file the issues below, then report back the created issue numbers/links.

### Write each issue body to a temp file first

Issue bodies contain Markdown with backticks, code fences, and links — inline `--body "…"` strings
break unpredictably once those characters hit shell quoting (especially on Windows PowerShell). Write
each body to a temp file and pass it with `--body-file` instead of inlining it:

```bash
# write the composed Markdown body to a temp file, then:
gh issue create --title "<title>" --body-file "<temp-file-path>" --label "accessibility" --label "wcag-aa"
```

### Individual issues (Critical/Serious — one per finding)

Body template (write to a temp file, then file with `--body-file` as above):

```markdown
## WCAG Guideline
<SC number and name> — Level <A/AA>

## Location
[`path/to/file.tsx:123`](<file-line link>)

## Issue
<description>

## Recommendation
<fix, with a short code example if useful>

## Priority
<Critical|Serious>
```

Title: `[A11y] <Component/Feature> — <brief description>`

### Grouped issues (Moderate/Minor — one per violation category)

Body template (same `--body-file` approach):

```markdown
## WCAG Guideline
<SC number and name>

## Violations
- [ ] [`path/to/file1.tsx:45`](<link>) — <short description>
- [ ] [`path/to/file2.tsx:78`](<link>) — <short description>

## Common fix approach
<shared guidance for this category>
```

Title: `[A11y] <category> issues in <area>`

If `config.toolchain.issue_provider` is not the default `github`, skip this section
entirely and just note in the report that issue filing isn't wired up for that provider yet.

## Rules

- Report only findings that actually appeared in this conversation — never invent violations to fill
  out the report. If nothing was scanned yet, say so and offer to run `a11y-scan`/`a11y-review`.
- WCAG 2.1/2.2 AA severities (Critical/Serious/Moderate/Minor) are the default and always shown; no
  vendor-specific standard ships in this repo. If `config.quality_gates.accessibility_standard_file`
  is configured, include its findings in a clearly labeled extra column/section — don't blend them
  into the WCAG counts.
- Keep the report factual and reproducible: every row must cite a WCAG SC and a location.
- **Never file a GitHub issue without explicit user approval.** Filing issues is optional and
  additive to the report file, not a replacement for it — it never blocks the report if declined,
  unavailable, or the provider isn't GitHub.

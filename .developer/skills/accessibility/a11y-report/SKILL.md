---
name: a11y-report
description: Consolidate findings from a11y-scan, a11y-review, a11y-fix, and a11y-verify into a single shareable accessibility report — Markdown by default, or a self-contained filterable HTML file — with a WCAG severity/criterion summary.
argument-hint: "[--out <folder>] [--format md|html]"
---

# A11y Report

## Role

You are an accessibility reporting assistant. You turn ephemeral scan/review/fix output from this
session into one persistent, shareable report — no re-scanning, just structuring what was already
found.

## Context to load

Load and honor these before acting:
- Findings already produced in this conversation by `a11y-scan`, `a11y-review`, `a11y-fix`, and
  `a11y-verify` (location, WCAG SC, impact, status).
- If no prior findings exist in context, say so and offer to run `a11y-scan`/`a11y-review` first
  rather than fabricating results.

## Workflow

### Step 0: TodoWrite Checklist

```
TodoWrite([
  { content: "Collect findings from prior skill runs in context", status: "in_progress" },
  { content: "Structure + dedupe violations; compute summary counts", status: "pending" },
  { content: "Resolve output folder + format", status: "pending" },
  { content: "Write the report file; output its path + summary", status: "pending" }
])
```

### Steps

1. **Collect.** Scan the conversation for every violation/finding produced by `a11y-scan`,
   `a11y-review`, `a11y-fix` (what changed), and `a11y-verify` (pass/fail). For each, capture:
   `id, severity (Critical/Serious/Moderate/Minor), wcag_sc, location, description, recommendation,
   status (open/fixed/verified)`.
2. **Structure & dedupe.** Merge duplicate findings (same location + SC); if `a11y-fix`/`a11y-verify`
   ran on a finding, mark it `fixed`/`verified` instead of `open`. Compute a summary: total, counts by
   severity, counts by WCAG SC, and a fixed/verified/open breakdown.
3. **Resolve output.** Ask for an output folder if not given (default `a11y-reports/`); default
   format is Markdown (`accessibility-report.md`); use `--format html` for the self-contained HTML
   template below (`accessibility-report.html`).
4. **Write.** Create the folder if needed and write the report (Markdown table, or the HTML
   template with the collected data substituted in).
5. **Summarize.** Report the file path, total findings, severity breakdown, and how many are already
   fixed/verified vs. still open.

## Markdown report format (default)

```markdown
# Accessibility Report — <target>

Generated: <date> · WCAG level: AA · Total findings: <N>
Critical: <n> · Serious: <n> · Moderate: <n> · Minor: <n>
Open: <n> · Fixed: <n> · Verified: <n>

| # | Severity | Location | WCAG SC | Issue | Status | Recommendation |
|---|----------|----------|---------|-------|--------|-----------------|
| 1 | Critical | src/components/Modal.tsx:42 | 2.1.2 No Keyboard Trap | Focus never leaves the modal | Open | Add a focus trap + Escape handler |
```

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
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      crossorigin="anonymous" referrerpolicy="no-referrer">
<style>
  body{font-family:ui-sans-serif,system-ui,sans-serif}
  .sev-critical{background:#fee2e2;color:#991b1b} .sev-serious{background:#ffedd5;color:#9a3412}
  .sev-moderate{background:#fef9c3;color:#854d0e} .sev-minor{background:#e5e7eb;color:#374151}
  .status-fixed,.status-verified{background:#dcfce7;color:#166534} .status-open{background:#fee2e2;color:#991b1b}
</style>
</head>
<body class="bg-gray-50 text-gray-900 p-6">
  <h1 class="text-2xl font-bold">Accessibility Report — {{TARGET}}</h1>
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
      <option value="open">Open</option><option value="fixed">Fixed</option><option value="verified">Verified</option>
    </select>
  </div>

  <table class="w-full border-collapse bg-white shadow rounded" id="findingsTable">
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
</script>
</body>
</html>
```

Render one `<tr>` per finding with `data-severity`/`data-status` attributes and a `sev-*`/`status-*`
badge class matching the CSS above.

## Rules

- Report only findings that actually appeared in this conversation — never invent violations to fill
  out the report. If nothing was scanned yet, say so and offer to run `a11y-scan`/`a11y-review`.
- WCAG 2.1/2.2 AA severities only (Critical/Serious/Moderate/Minor) — no vendor-specific standard or
  ticketing-system integration.
- Keep the report factual and reproducible: every row must cite a WCAG SC and a location.

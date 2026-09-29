# Evals

Lightweight evaluation harness for the skills and agents. The goal is regression protection: when a
skill's guidance changes, confirm it still produces the expected shape of output on fixed scenarios.

## Layout

```
evals/
  README.md          # this file
  cases/             # one JSON per scenario: input + expected assertions
  a11y-workflow.test.js # static skill contracts and package allowlist checks
  results/           # generated run output (gitignored)
```

## Case format

Each file in `cases/` describes a scenario and the assertions a good response must satisfy — not an
exact string match, but structural/behavioral checks (e.g. "cites a WCAG success criterion",
"proposes no more than a minimal diff", "asks a clarifying question when the spec is ambiguous").

```json
{
  "id": "a11y-scan-contrast",
  "skill": "accessibility/a11y-scan",
  "input": "Scan the login page for WCAG AA issues",
  "expect": [
    "reports violations grouped by success criterion",
    "does not disable any axe rule",
    "prioritizes by impact"
  ]
}
```

## Running

`npm test` runs the repository structural validator and the Node built-in accessibility contract
tests. No extra dependencies are required. These checks catch removed investigation gates,
inconsistent report statuses, missing uncertainty outcomes and unsafe legacy guidance. They test
the instruction contract, **not model obedience or live product fixes**. Local automation prompts
are intentionally not test inputs: a fresh clone or npm package must pass without them. The package
allowlist check guards against explicitly shipping local automation folders or the personal usage
guide. Neither is required by a fresh clone or package install.

To check sensitivity against an older tracked revision in PowerShell:

```powershell
$env:A11Y_CONTRACT_REF = 'HEAD'
node --test evals/a11y-workflow.test.js
Remove-Item Env:A11Y_CONTRACT_REF
```

Use a revision predating the relevant contract change. Missing historical skill files are reported
as failures as well; they do not demonstrate behavioral regression.

[a11y-repair-scenarios.json](cases/a11y-repair-scenarios.json) is a suite array using the case format
above, covering all seven accessibility skills and recurring weekly observation categories. It
includes a fully verified positive control so the workflow is not evaluated only on refusal to fix.
The Node tests validate fixture shape and skill coverage; they do not grade agent responses.

Evals are designed to be driven by an agent runner (the same one that executes skills) or in CI via
`agent-evals.yml`. Because outputs are model-generated, scoring is assertion-based (a grader agent or
human checks each `expect` item), not golden-file diffing.

For behavioral evaluation, give each case's `input` and named skill to the installed runner in an
isolated test session with fixture evidence/tools. Retain the response and score every `expect`
assertion as pass/fail/blocked, citing the output and tool evidence. No repository-aware model runner
is bundled here; do not report those cases as executed from a successful `npm test`.
Before enabling scheduled writes, replay representative real issues with sanitized evidence and
the actual app/browser/AT matrix. Compare source-location accuracy, verified-fix rate, regressions,
blocker quality and attempts per issue using explicit source-run denominators.

## Principles

- **Deterministic assertions over brittle string matches.**
- **Safety first:** cases must never require destructive actions or real credentials.
- **Small and fast:** keep the suite runnable on every PR.

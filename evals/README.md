# Evals

Lightweight evaluation harness for the skills and agents. The goal is regression protection: when a
skill's guidance changes, confirm it still produces the expected shape of output on fixed scenarios.

## Layout

```
evals/
  README.md          # this file
  cases/             # one JSON per scenario: input + expected assertions
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

Evals are designed to be driven by an agent runner (the same one that executes skills) or in CI via
`agent-evals.yml`. Because outputs are model-generated, scoring is assertion-based (a grader agent or
human checks each `expect` item), not golden-file diffing.

## Principles

- **Deterministic assertions over brittle string matches.**
- **Safety first:** cases must never require destructive actions or real credentials.
- **Small and fast:** keep the suite runnable on every PR.

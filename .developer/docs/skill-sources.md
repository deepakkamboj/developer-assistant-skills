# Skill Sources, Selection & Rename Map

This document records **which skills and agents we adopted, from which source project, why**, and
the **old → new name** mapping when renamed. It is the provenance record. The **authoritative
architecture and the consolidated (de-duplicated) agent/skill catalog** live in
[design.md](design.md) — read that for *what to build and why*.

## Target

- **Repo:** `deepakkamboj/developer-assistant-skills` — an **open-source**, vendor-neutral
  developer plugin for Claude Code, GitHub Copilot, and Codex.
- **Canonical tree:** `.developer/` (mirrors the `.agents/` pattern from `personal-assistant-skills`).
- **Single config:** one `config.json` resolved via `DEVELOPER_CONFIG` (fallback
  `~/.developer/config.json`) + `content.md` companion + `memory.md` / `notes.md`. No `data/` folder.
- **Skill contract:** every `SKILL.md` = `## Role` → `## Context to load` → `## Workflow`
  (Step 0 `TodoWrite` checklist → Steps). Ask, don't hallucinate. Load profile/config first.
- **Open-source rule:** **remove everything Microsoft-internal** — Azure DevOps (ADO), Power
  Platform / Dynamics 365, Power Pages, MAS (Microsoft Accessibility Standards), Narrator-specific
  guidance, S360, internal endpoints, org names, cert/identity services. Replace with generic
  equivalents (GitHub Issues/PRs, WCAG, standard CI).

## Sources

| # | Source | Location | Role in this repo |
|---|--------|----------|-------------------|
| S1 | `personal-assistant-skills` | `d:/github/personal-assistant-skills` | Architecture & patterns (`.developer/`, config, TodoWrite, CLI, adapters, workflows) |
| S2 | `ppengsysquality/plugins` | github.com/AIBuildStudio/ppengsysquality | Playwright + a11y skills/agents (genericized) |
| S3 | `sunshine/agent-first-repo` | `d:/git-research/sunshine/agent-first-repo` | Specialist review agents + core dev skills + eval/permission model |
| S4 | `EASE-MAS-paper` | `d:/research/EASE-MAS-paper.md` | Closed-loop SWE architecture: orchestrator + traceability + bounded repair |
| S5 | `power-pages-automations-tpa` | `d:/git-research/power-pages-automations-tpa_v1_ghc` | Concepts only: test-plan generation, semantic drift, eval framework, orchestration |

## Proposed skill organization (`.developer/skills/<group>/<skill>`)

| Group | Skills |
|-------|--------|
| `requirements/` | `from-requirements` (→ PRD), `grade-spec` |
| `architecture/` | `architecture-doc`, `graph-repo` (**new**: code graph), `threat-model` |
| `design/` | `design-spec`, `from-figma` (generic design-system spec) |
| `development/` | `start-feature`, `implement-change`, `refactor` |
| `review/` | `code-review`, `deliberate`, `pr-learn` |
| `testing/` | `author-test`, `update-test`, `verify-test`, `e2e-test`, `unit-test`, `test-plan`, `coverage-gap` |
| `debugging/` | `analyze-bug`, `fix-bug`, `fix-test`, `root-cause` (RCA) |
| `accessibility/` | `a11y-scan`, `a11y-fix`, `a11y-test-gen`, `a11y-verify`, `a11y-review-interactive` |
| `quality/` | `security-review`, `performance-review`, `observability-review`, `dependency-review` |
| `repo/` | `sweep-codebase`, `graph-repo`, `docs-update` |
| `devops/` | `fix-ci` |

## S2 — ppengsysquality: playwright + a11y (rename map)

Renamed for **goal/usage clarity** and to drop the plugin-name prefix.

### playwright plugin → `testing/` + `debugging/`

| Old (source) | New (this repo) | Group | Why |
|--------------|-----------------|-------|-----|
| `author-test` | `author-test` | testing | Clear as-is; drop ADO/PR coupling |
| `update-test` | `update-test` | testing | Keep |
| `verify-test` | `verify-test` | testing | Keep |
| `validate-scenario` | `validate-scenario` | testing | Keep; generic test↔spec drift |
| `batch-validate` | `batch-validate` | testing | Keep |
| `coverage-gap-report` | `coverage-gap` | testing | Shorter, action-oriented |
| `analyze-bug` | `analyze-bug` | debugging | Keep |
| `fix-bug` | `fix-bug` | debugging | Keep; GitHub Issues, not ADO |
| `fix-test` | `fix-test` | debugging | Keep |
| `fix-product-bugs` | `fix-product-bug` | debugging | Singularize; genericize |
| `playwright-login` | **dropped** | — | Auth/cert flow was Power Platform/D365-specific |
| agents: `bug-exterminator`, `bug-triage`, `scenario-validator` | same | agents | Genericize (GitHub, not ADO) |

### a11y plugin → `accessibility/`

| Old (source) | New (this repo) | Why |
|--------------|-----------------|-----|
| `a11y-scan-repo` | `a11y-scan` (static) | Merge repo+url scan under one skill w/ mode |
| `a11y-scan-url` | `a11y-scan` (runtime) | Same skill, `--url` mode |
| `a11y-fix` | `a11y-fix` | Keep; **drop MAS**, WCAG-only |
| `a11y-verify-fix` | `a11y-verify` | Shorter |
| `a11y-test-gen` | `a11y-test-gen` | Keep (Playwright + axe-core) |
| `a11y-review-interactive` | `a11y-review-interactive` | Keep |
| `a11y-review-contrast/color/links/modes/viewports` | `a11y-review` (sub-modes) | Consolidate 5 review skills into one with modes |
| `a11y-report-gen` | `a11y-report` | Shorter; drop ADO bug templates |
| `a11y-dev` | folded into `development/implement-change` | Redundant with generic dev skill |
| agents: `a11y-reviewer`, `a11y-tester` | same | Keep; **remove MAS/Narrator internal refs** |

### engsys plugin → **mostly dropped**

Microsoft-internal Power Platform health dashboard (ADO pipelines, S360, Work IQ). **Drop all.**
Extract only the generic idea of `flaky-detect`/`flaky-fix` → `testing/flaky-test` (**new, generic**).

## S3 — sunshine (adopt as-is, already open-source clean)

**Agents (14 specialists → `.developer/agents/`):** accessibility-advocate, architecture-advocate,
debugger, dependency-manager, documentation-steward, e2e-test-author, internationalization-expert,
manual-tester, observability-advocate, performance-advocate, refactorer, security-advocate,
style-guardian, unit-testing-advocate.

**Core skills (→ grouped):** `code-review`, `deliberate`, `implement-change`, `pr-learn`,
`start-feature`, `sweep-codebase`. **Keep names** (clear, goal-based).

**Also adopt:** the **eval framework** (fixtures + rubrics + regression gate) and the
**permission ladder** (L0 read-only → L4 scheduled; merge stays human-only).

Fluent-X design-system pipeline → generalize to `design/design-spec` + `design/from-figma`
(strip `fluent-x` product tokens).

## S4 — EASE-MAS paper (implement the architecture)

New **orchestrator + traceability** layer under `.developer/agents/orchestrator/`:

- `supervisor` (hybrid supervisor + DAG) coordinating generation agents + independent critics.
- `traceability` graph: requirement → PRD → architecture → code → test → execution → failure →
  bug → RCA → repair. Stored as a JSON graph in the config/output dir.
- `bounded-repair`: closed-loop `E→F→B→RCA→ΔC→C'` with explicit **termination conditions** and
  regression gates (H6 bounded autonomy).
- Maps paper agents onto our skills (requirements/architecture/code/test/repair) + adds critics.

## S5 — power-pages (concepts only, no code copied)

MS/ADO/Power Pages specific — **do not copy**. Reuse **concepts**:
`test-plan` (agent4 PRD→test-case) → generic `testing/test-plan`; **semantic drift** →
`testing/validate-scenario` drift metric; **eval framework** → shared with S3 evals.
Drop `agent0_ado_fetcher`, `agent6_ado_publisher`, all ADO I/O.

## Explicit removals (per instructions)

- **S360** skills — none carried over.
- **All Microsoft-internal**: ADO, Power Platform / D365, Power Pages, MAS, Narrator-specific,
  internal orgs/endpoints/certs.
- `playwright-login` (cert/D365 auth), engsys dashboard, ADO fetch/publish.

## New skills to create

- `architecture/graph-repo` — **build a code graph of a repository** (modules, files, symbols,
  imports, call/dependency edges) and export queryable JSON + a visual (mermaid/HTML). Powers
  impact analysis for review, refactor, and repair.
- `testing/flaky-test` — generic flaky-test detection + quarantine/fix (from engsys concept).
- `testing/test-plan` — requirements/PRD → executable test plan (from power-pages concept).
- `architecture/threat-model` — STRIDE-style threat model (from sunshine reference, genericized).

> Status: blueprint. Skills are ported/created in subsequent commits; each will note its source
> and license in its own README/frontmatter where applicable.

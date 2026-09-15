# Usage

How to install, configure, and invoke **developer-assistant-skills** from Claude Code, GitHub
Copilot, and Codex. The canonical source of truth is [`.developer/`](.developer/).

## 1. Install

### Namespaced plugin (recommended)

Register this repository as a marketplace, then install the `developer` plugin globally for the
current user.

**GitHub Copilot CLI:**

```bash
copilot plugin marketplace add deepakkamboj/developer-assistant-skills
copilot plugin install developer@developer-assistant-skills
```

**Claude Code:**

```bash
claude plugin marketplace add deepakkamboj/developer-assistant-skills
claude plugin install developer@developer-assistant-skills --scope user
```

Both clients load the shared plugin root from `.developer/`. Skills are invoked through the plugin
namespace, for example `/developer:a11y-fix` or `/developer:code-review`.

### Catalog CLI

Install the standalone catalog and validation command globally:

```bash
npm install --global developer-assistant-skills
dev-skills list skills
dev-skills validate
dev-skills doctor
```

The `dev-skills` CLI manages and validates the catalog; it does not install skills into an
assistant folder. Use `npx skills add` above for that.

### Source checkout

Clone the repository when contributing or when you need the full canonical tree, agents, scripts,
and generated slash-command adapters:

```bash
git clone https://github.com/deepakkamboj/developer-assistant-skills.git
cd developer-assistant-skills
node bin/cli.js validate         # sanity-check the skill/agent library
```

Requirements: **Node.js ≥ 18**. Optional CLIs used by skills (installed on demand):
`gh` (GitHub), `az` (Azure DevOps, optional), `npx playwright`, `npx axe`.

## 2. Configure

The plugin reads **one** `config.json`, resolved from the `DEVELOPER_CONFIG` environment variable
(fallback `~/.developer/config.json`), plus prose companions `content.md`, `memory.md`, `notes.md`.

```bash
mkdir -p ~/.developer
cp .developer/config/config.example.json  ~/.developer/config.json
cp .developer/config/content.example.md   ~/.developer/content.md
cp .developer/config/memory.example.md    ~/.developer/memory.md
cp .developer/config/notes.example.md     ~/.developer/notes.md

export DEVELOPER_CONFIG=~/.developer/config.json
# PowerShell: $env:DEVELOPER_CONFIG = "$HOME/.developer/config.json"
```

Edit `config.json` to set your `profile`, `repos[]` (provider `github` or `ado`, url/org/project,
`default_branch`), `quality_gates`, `autonomy` (permission level, `max_repair_attempts`,
`allow_autonomous_merge`), `toolchain`, and `test_environments`. See the inline example for the full
shape.

## 3. Invoke skills

Marketplace-installed skills use the `developer` plugin namespace. A source checkout also includes
the generated compatibility adapters described below.

### Claude Code

Plugin skills are exposed under the `developer` namespace:

```
/developer:code-review
/developer:fix-bug        <issue or failing test>
/developer:a11y-scan      <url or component>
/developer:graph-repo     --query "who calls processOrder"
/developer:release-readiness
```

### GitHub Copilot

After installing the plugin in Copilot CLI, use the same namespace:

```
/developer:code-review
/developer:fix-bug
/developer:a11y-scan
```

### Codex / any agent runner

Point the agent at [`.developer/AGENTS.md`](.developer/AGENTS.md) and reference a skill by path,
e.g. `.developer/skills/review/code-review/SKILL.md`.

## 4. Skill catalog

| Group | Skill | Purpose |
|-------|-------|---------|
| requirements | `from-requirements` | Raw intent → testable PRD; seeds the traceability graph |
| requirements | `grade-spec` | Score a PRD (completeness/testability/NFR) → ready/not-ready |
| architecture | `graph-repo` | Build a queryable code graph (nodes/edges) + impact queries |
| architecture | `architecture-doc` | Truthful architecture doc grounded in the code graph |
| architecture | `threat-model` | STRIDE threats + mitigations over real data flows |
| design | `design-spec` | Framework-agnostic component spec with tokens + a11y |
| design | `from-figma` | Extract spec/tokens from a Figma reference (MCP optional) |
| development | `start-feature` | HITL-gated feature kickoff from a spec |
| development | `implement-change` | Focused, minimal implementation of a change |
| development | `refactor` | Behavior-preserving refactor with tests as guardrails |
| repo | `sweep-codebase` | Bounded scan → deliberate → small routed PRs |
| review | `code-review` | Dispatch the specialist critic roster by file type |
| review | `deliberate` | Weigh critic findings → Take Action / Stand Down / Defer / Escalate |
| review | `pr-learn` | Turn merged-PR lessons into memory |
| testing | `test-plan` | Generate a risk-based test plan from a spec/diff |
| testing | `validate-scenario` | Run a scenario; detect drift and semantic drift |
| testing | `coverage-gap` | Find untested behavior and propose targeted tests |
| testing | `flaky-test` | Diagnose and stabilize a flaky test |
| testing/playwright | `playwright-auth` | Set up storage-state / auth for E2E runs |
| testing/playwright | `run-tests` | Run Playwright tests and triage results |
| testing/playwright | `author-test` | Author a new Playwright test from a scenario |
| testing/playwright | `verify-test` | Verify a test actually asserts the behavior |
| testing/playwright | `update-test` | Update a test after intended UI/behavior change |
| accessibility | `a11y-scan` | Static/runtime axe WCAG AA scan |
| accessibility | `a11y-review` | Deep review scanners miss (keyboard/contrast/modes/…) |
| accessibility | `a11y-test-gen` | Generate Playwright + axe regression tests |
| accessibility | `a11y-fix` | Minimal WCAG-only remediation (native-first) |
| accessibility | `a11y-verify` | Re-scan + behavior re-check → pass/fail |
| debugging | `analyze-bug` | Reproduce, isolate, classify (product/test/flake) |
| debugging | `root-cause` | ≥k competing hypotheses → evidenced cause |
| debugging | `fix-bug` | Bounded, root-cause fix behind the repair gate |
| debugging | `fix-test` | Repair a stale/incorrect test (not the product) |
| devops | `fix-ci` | Diagnose + fix a failing pipeline from logs |
| devops | `release-readiness` | Go/no-go gate over tests, quality, blockers, rollback |

## 5. Agents

**Review critics** (independent, read-only) run inside `code-review`: `code-reviewer`,
`security-advocate`, `architecture-advocate`, `performance-advocate`, `accessibility-advocate`,
`unit-testing-advocate`, `e2e-test-author`, `manual-tester`, `observability-advocate`,
`dependency-manager`, `style-guardian`, `internationalization-expert`, `documentation-steward`,
`refactorer`, `debugger`.

**Leads & gates:** `supervisor` (closed-loop orchestrator), `traceability-keeper` (graph),
`bug-exterminator` (bounded repair loop), `repair-validator` (independent merge gate), `a11y-tester`
(accessibility audit lead).

## 6. Traceability graph

The lifecycle graph links requirement → PRD → architecture → code → test → execution → failure →
bug → hypothesis → repair → validation. Manage it with the writer:

```bash
node .developer/scripts/traceability.js --graph output/traceability/graph.json add-node --id REQ-1 --type Requirement
node .developer/scripts/traceability.js --graph output/traceability/graph.json add-edge --from REQ-1 --to TEST-1 --type tests
node .developer/scripts/traceability.js --graph output/traceability/graph.json impact  --node REQ-1
node .developer/scripts/traceability.js --graph output/traceability/graph.json orphans
```

## 7. Bounded autonomy & safety

- **Permission ladder:** L0 read-only · L1 comment · L2 branch+draft-PR · L3 open PR · L4 scheduled.
- **Merge stays human-owned.** Autonomous CI workflows in `.github/workflows/` are **disabled by
  default**; enable per-repo via variables. See [.github/workflows/README.md](.github/workflows/README.md).
- **Repair is bounded:** `max_repair_attempts`, a regression gate, and the independent
  `repair-validator` before any human merge.

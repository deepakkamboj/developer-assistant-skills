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

### Optional: your organization's accessibility standard

The accessibility skills (`a11y-scan`, `a11y-review`, `a11y-fix`, `a11y-verify`, `a11y-dev`,
`a11y-test-gen`, `a11y-report`) ship **WCAG 2.1/2.2 AA-only** — no vendor-specific standard is
bundled. If your org has a stricter internal standard (e.g. tighter contrast ratios, a mandated
assistive-technology test matrix) or documented screen-reader-specific behavior notes, copy the two
templates below to a private path, fill them in, and reference them from `quality_gates`:

```bash
cp .developer/config/accessibility-standard.example.md ~/.developer/accessibility-standard.md
cp .developer/config/screen-reader-notes.example.md    ~/.developer/screen-reader-notes.md
```

```json
"quality_gates": {
  "wcag_level": "AA",
  "accessibility_standard_file": "~/.developer/accessibility-standard.md",
  "screen_reader_notes_file": "~/.developer/screen-reader-notes.md"
}
```

Skills apply these **in addition to WCAG, never instead of it** — they always cite the WCAG success
criterion, and layer your stricter threshold or AT-specific pattern on top when configured. Leave
both keys `null` (the default) to use WCAG AA only.

### Evidence-led accessibility repairs and scheduled runs

All seven accessibility skills distinguish observed violations from suspicions and untested checks.
The [a11y-fix investigation contract](.developer/skills/accessibility/a11y-fix/SKILL.md) requires
the original failing scenario, a rendered-element-to-source trace, verified repository ownership,
and causal evidence before editing. A suggested path or similar control name is not enough.
The [verification skill](.developer/skills/accessibility/a11y-verify/SKILL.md) checks the exact
candidate build and required browser/assistive-technology matrix. DOM/axe results do not prove
screen-reader announcements or voice commands; unavailable required AT testing is a blocker.
For multi-repo products, investigation follows the deployed app through shared control packages to
the underlying dependency. Fluent UI v8 (`@fluentui/react`) and v9 (`@fluentui/react-components`)
are investigated at their exact installed versions. Same-version minimal reproductions distinguish
app/wrapper defects from upstream defects; v8-to-v9 migration is separately approved work, not an
automatic repair. Shared-control changes must be consumed and validated in the actual app.

For the Copilot app, use the reviewed
[fixer prompt](.github/automations/accessibility-fix-bugs/prompt.md) and
[independent validation prompt](.github/automations/accessibility-fix-validation/prompt.md).
These are configuration-driven templates, not active schedules or executable orchestration code:

1. Supply allowed repositories/default branches, an exact backlog query, supported platforms and
   AT matrix, test-environment/build/deployment settings, permissions and escalation owners through
   `config.json` and reviewed schedule settings or companion `content.md`.
2. Confirm installed skills, source access and working test/browser/AT capabilities. Keep all
   private settings and authentication outside source control.
3. Use a protected `FIX_HANDOFF_PATH` shared by both jobs (default beside the resolved config).
   Version-2 records use canonical issue URLs to avoid cross-repo ID collisions. Retain legacy
   fields/history; recover missing identity/provenance only from evidence, never guessed mappings.
4. Re-import/update the prompts in the Copilot app and refresh the installed plugin after updating
   this checkout; existing scheduled prompt copies do not update automatically.
5. Pilot on representative issues in read-only mode, then explicitly enable branch/draft-PR and
   isolated test-deployment permissions. Scheduling and human merge remain owner-controlled.

The [report skill](.developer/skills/accessibility/a11y-report/SKILL.md) separates verified repairs,
unverified changes, failed fixes and non-fix outcomes. Weekly percentages must retain source-run
cohorts and denominators; carried work, duplicates, no-repro and pointer-only results are not new
fixes. Regression scenarios and contract-check instructions are in [evals](evals/README.md).

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
| accessibility | `a11y-fix` | Evidence-led source diagnosis and bounded native-first repair |
| accessibility | `a11y-verify` | Exact-build scenario/AT verification with explicit non-pass outcomes |
| accessibility | `a11y-dev` | Accessibility-first code generation (proactive, not remediation) |
| accessibility | `a11y-report` | Consolidate scan/review/fix findings into one shareable report |
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

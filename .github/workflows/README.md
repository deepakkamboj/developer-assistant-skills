# GitHub Workflows

CI runs normally. The **autonomous** workflows (bug fix, test fix, product-bug fix, agent code
review) are **disabled by default** and safe: they never auto-merge, always open a **draft PR**,
and require human review.

## How they're disabled

Every autonomous job is gated:

```yaml
if: >
  github.event_name == 'workflow_dispatch' ||
  vars.ENABLE_AUTONOMOUS == 'true'
```

So the automatic triggers (issues, schedule, CI-failure) do nothing until you opt in. You can
always run one manually from the **Actions** tab (workflow_dispatch) for a single issue/PR.

## How to enable

1. **Wire an agent runner** — set the repository variable `AGENT_RUN_CMD` to the command that runs
   a `.developer` skill headlessly (e.g. `claude --print` or `copilot -p`), and add any needed
   token as a secret. Without it, the run step fails fast (never a silent no-op).
2. **Turn on autonomy** — set the repository variable `ENABLE_AUTONOMOUS=true`
   (Settings → Secrets and variables → Actions → Variables). Remove it to disable again.
3. Optionally scope per workflow with `ENABLE_AUTONOMOUS_BUGFIX`, `ENABLE_AUTONOMOUS_TESTFIX`,
   `ENABLE_AUTONOMOUS_PRODUCTBUG`, `ENABLE_AGENT_REVIEW` (each checked in its workflow).

## Safety model (bounded autonomy, per EASE-MAS)

- No autonomous merge — draft PRs only; a human is the merge gate.
- Least-privilege `permissions:` per workflow.
- Bounded repair: max attempts + regression gate before a PR is opened.
- All actions are auditable in the Actions log and PR history.

| Workflow | Trigger (when enabled) | Does |
|----------|------------------------|------|
| `ci.yml` | push / PR | Validate skills structure + config JSON (always on) |
| `autonomous-bug-fix.yml` | issue labeled `auto-fix` / dispatch | Reproduce → fix → draft PR |
| `autonomous-test-fix.yml` | CI failure / schedule / dispatch | Fix failing or flaky tests → draft PR |
| `autonomous-product-bug-fix.yml` | issue labeled `product-bug` / dispatch | Bounded RCA + repair → draft PR |
| `agent-code-review.yml` | PR opened / dispatch | Specialist agent review comments |
| `agent-evals.yml` | PR touching `.developer/**` / dispatch | Run skill/agent eval regression gate |

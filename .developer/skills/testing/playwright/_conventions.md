# Playwright skills — conventions

These skills drive Playwright for **test validation and execution**. They follow the plugin's
**CLI-first, MCP-fallback** rule:

- **Deterministic execution (CI, verification):** the Playwright **CLI** — `npx playwright test`.
  This is the authoritative runner (EASE-MAS A14) and collects artifacts (trace, video, screenshot,
  DOM, console, network).
- **Interactive exploration (selectors, a11y tree, snapshots):** the **Playwright MCP** server
  (`.developer/mcp/playwright.json`).

## Authentication

Never hard-code credentials or URLs. Resolve the target from `config.test_environments`:

1. Pick the environment (`$ARGUMENTS` env name, else `test_environments.default`).
2. Read its `base_url` and `auth` block. Credentials come from the named **env vars**
   (`username_env` / `password_env`), certs from `cert_folder`, tokens from env.
3. For `storage-state` auth, run the [`playwright-auth`](playwright-auth/SKILL.md) skill first to
   produce a storage-state file under `storage_state_dir`, then pass it with `--storage-state`.
4. Treat `prod`/`read_only` environments as non-destructive — no data-mutating tests.

## Output

Write an **Execution** node (and any **Failure** nodes) to the traceability graph
(`config.traceability.graph_path`) linking the run to its test cases.

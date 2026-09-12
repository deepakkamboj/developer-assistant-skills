# Tool Chain

Skills use a **CLI-first, MCP-fallback** model (`config.toolchain.prefer = "cli-then-mcp"`). Each
skill tries the command-line tool first (deterministic, scriptable, CI-friendly) and falls back to
the tool's MCP server for interactive or structured access.

## Providers (pluggable)

The **git/issue provider** is selected in `config.toolchain`:

| Provider | CLI | MCP | Default |
|----------|-----|-----|---------|
| GitHub | `gh` | [`github.json`](github.json) | ✅ yes (open-source default) |
| Azure DevOps | `az devops` | [`ado.json`](ado.json) | optional, disabled |

Skills read `config.toolchain.issue_provider` / `git_provider` and target the right CLI/MCP. The
core plugin is **GitHub-first and open-source**; ADO is an optional plug-in for teams that use it.

## Tools

### GitHub — `gh` CLI / GitHub MCP
- **CLI:** `gh issue view/list`, `gh pr create --draft`, `gh api`, `gh run list`.
- **MCP:** `.developer/mcp/github.json` (Docker `ghcr.io/github/github-mcp-server`, or the hosted
  remote server). Token via `GITHUB_TOKEN` env — never on the command line.
- Used by: bug intake, PR creation, code review comments, CI status.

### Azure DevOps — `az devops` CLI / ADO MCP (optional)
- **CLI:** `az extension add --name azure-devops`; `az boards work-item show`, `az repos pr create`.
- **MCP:** `.developer/mcp/ado.json` (disabled by default). PAT via `AZURE_DEVOPS_EXT_PAT`.
- Enable only if `config.toolchain.issue_provider = "ado"`.

### Playwright — `npx playwright` CLI / Playwright MCP
- **CLI (deterministic, CI):** `npx playwright test <file> --reporter=list`; install with
  `npx playwright install --with-deps`. Used for reproducible execution + artifact collection
  (trace/video/screenshot/DOM/console/network) — this realizes EASE-MAS A14 (Playwright Execution).
- **MCP (interactive):** `.developer/mcp/playwright.json` (`npx @playwright/mcp@latest`) for
  exploratory driving, snapshots, and accessibility-tree checks.
- **axe:** `npx axe <url>` for WCAG scans (accessibility skills).

## Authenticated test environments

Auth for live-URL tests is configured in `config.test_environments`, never inline in skills:

```jsonc
"test_environments": {
  "cert_folder": "~/.developer/certs",
  "storage_state_dir": "~/.developer/.playwright",
  "default": "local",
  "environments": {
    "staging": {
      "base_url": "https://staging.example.com",
      "auth": {
        "type": "storage-state",          // none | storage-state | basic | cert | oidc
        "storage_state": "staging.json",  // saved under storage_state_dir
        "login_url": "https://staging.example.com/login",
        "username_env": "STAGING_USER",   // credentials come from env vars
        "password_env": "STAGING_PASS"
      }
    }
  }
}
```

- **none** — public/local, no auth.
- **storage-state** — the `playwright-auth` skill logs in once and saves Playwright storage state
  (cookies/localStorage) to `storage_state_dir`; tests reuse it via `--storage-state`.
- **basic** — HTTP basic auth from `username_env`/`password_env`.
- **cert** — client certificate from `cert_folder` (never committed).
- **oidc** — OIDC/token flow; token from an env var.

**Security:** credentials and tokens live only in environment variables (or a gitignored `.env`),
never in `config.json`. `cert_folder` and `storage_state_dir` are outside source control.

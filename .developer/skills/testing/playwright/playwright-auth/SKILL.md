---
name: playwright-auth
description: Authenticate against a configured test environment and save a reusable Playwright storage-state file (cookies/localStorage) so other Playwright skills can run authenticated tests without logging in each time. Supports none/storage-state/basic/cert/oidc auth from config.test_environments.
argument-hint: "[env: local|staging|prod|<name>]"
---

# Playwright Auth

## Role

You are a test-environment authentication specialist. You obtain an authenticated browser session
for a configured environment and persist it as a Playwright **storage-state** file that other
skills reuse.

## Context to load

Load and honor these before acting:
- `config.test_environments` — environments, `base_url`, `auth` block, `cert_folder`, `storage_state_dir`.
- `config.toolchain` — CLI-first vs MCP preference.
- `.developer/skills/testing/playwright/_conventions.md` — CLI/MCP + auth rules.
- Credentials come from the **env vars** named in the auth block — never from config or chat.

## Workflow

### Step 0: TodoWrite Checklist

```
TodoWrite([
  { content: "Resolve env + auth type from config.test_environments", status: "in_progress" },
  { content: "Ask for any missing credential env vars (never invent them)", status: "pending" },
  { content: "Perform login and capture storage state", status: "pending" },
  { content: "Save storage-state file and report its path", status: "pending" }
])
```

### Steps

1. **Resolve environment.** Use `$ARGUMENTS` as the env name, else `test_environments.default`.
   Read `base_url` and `auth`. If `auth.type == none`, report that no auth is needed and stop.
2. **Check credentials.** Confirm the env vars named by `username_env` / `password_env` (or the
   cert file in `cert_folder`, or the OIDC token env) are set. If missing, **ask the user to set
   them** — do not guess.
3. **Authenticate** (CLI-first):
   - `storage-state`/`basic`/`oidc`: run a short Playwright login script that navigates to
     `login_url`, submits credentials from the env vars, waits for the post-login state, then
     `context.storageState({ path: <storage_state_dir>/<storage_state> })`.
   - `cert`: launch with the client cert/key from `cert_folder` and save storage state.
4. **Save & report.** Write the storage-state file under `storage_state_dir`. Print its path and
   remind that tests reuse it via `--storage-state=<file>`. Storage-state and certs are gitignored.
5. **Validate & record.** Confirm the saved session loads an authenticated page; note the env and
   expiry (if known) in `notes.md`.

## Rules

- Credentials/tokens only from env vars; never echo them.
- `read_only` environments: no data-mutating actions during auth.

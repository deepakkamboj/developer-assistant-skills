# Changelog

## 1.0.4

### Accessibility capability update

- Preserve the original seven accessibility workflows and expand their coverage for content,
  tables, forms/error recovery, authentication/repeated entry, status/progress, complex widgets,
  keyboard/focus, visual modes/reflow, pointer/drag, media and timing.
- Keep all six detailed review procedures in `a11y-review`, selected with
  `--mode interactive|contrast|color|links|modes|viewports|all`.
- Combine audit and read-only review responsibilities in the `a11y` agent, preserving source
  ownership, dependency/version investigation, sampling limits and exact candidate evidence.
- Consolidate shared instructions, all 55 WCAG 2.2 A/AA criteria, WCAG 2.1 boundaries, ten
  inspection families, ten repair families, twenty verification scenarios and optional private
  policy templates in `.developer/config/accessibility.md`.
- Add portable `prereq-check` and `plugin-version-check` workflows with read-only verification
  and explicit approval before installation, authentication or update execution.
- Update generated adapters, documentation and catalog: 38 skills and 20 agents.
- Keep FastPass, Lighthouse, internal-only integrations and the held execution framework excluded.

### Migration notes

This patch version was explicitly selected for the release. It includes public naming/path
changes; review these before upgrading:

- Select `a11y` instead of `a11y-tester` for the combined agent. There is no separate
  `a11y-reviewer` agent.
- Replace standalone `a11y-review-<mode>` invocations, if adopted from the development branch,
  with `a11y-review --mode <mode>`.
- Use `.developer/config/accessibility.md` instead of the former separate accessibility
  guidance documents. Copy only its relevant optional template sections into private files.
  Existing `accessibility_standard_file` and `screen_reader_notes_file` configuration keys
  and private policy files remain supported; defaults remain unset.
- Independent verification and the existing diff advocate remain separate; the repair author
  cannot certify their own work as independently verified.

### Package validation and publication

Release validation covers the source checkout and an extracted npm tarball. Source-only website/
adapter integration tests are explicitly skipped in the package, where those files are not shipped;
canonical inventory, coverage and workflow checks still run.

No dependency or data migration is required. Publication uses the existing GitHub release-triggered
npm workflow; verify the registry reports the intended version before announcing availability.

### Rollback

If needed, explicitly install `developer-assistant-skills@1.0.3` and restore the previous plugin
release using the host's supported procedure. This removes the expanded 1.0.4 guidance and restores
the previous agent/template names. Keep private configuration backups and reverify host discovery.
Do not roll back to 1.0.2 when exclusion of local-only files is required.

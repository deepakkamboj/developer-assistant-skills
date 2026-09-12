# Documentation site

Static documentation for **developer-assistant-skills**, deployed to GitHub Pages from this `docs/`
folder.

**Live site:** https://deepakkamboj.github.io/developer-assistant-skills/

## Pages

- `index.html` — overview + architecture diagram
- `getting-started.html` — install, configure, invoke, CLI, safety
- `architecture.html` — layered design, closed loop, traceability, review pipeline (SVG)
- `skills.html` / `agents.html` — **generated** from the real skill/agent frontmatter
- `assets/` — `style.css` and hand-authored SVG diagrams

## Regenerate the catalog pages

`skills.html` and `agents.html` are generated so they never drift from the library:

```bash
node .developer/scripts/gen-docs-catalog.js
```

The Pages workflow (`.github/workflows/pages.yml`) runs this on every deploy. Don't hand-edit those
two files — change the source `SKILL.md` / `*.agent.md` frontmatter and regenerate.

## Enable GitHub Pages (one-time)

Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**. The workflow then
publishes on pushes to `main` that touch `docs/**` or the catalog source.

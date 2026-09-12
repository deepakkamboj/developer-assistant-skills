# Website — Nextra documentation site

Original **Nextra 3** (`nextra-theme-docs`) documentation site for **developer-assistant-skills**,
static-exported and deployed to GitHub Pages.

**Live site:** https://deepakkamboj.github.io/developer-assistant-skills/

## Develop

```bash
cd website
npm install
npm run dev            # http://localhost:3000
```

## Build (static export)

```bash
# basePath is required for a GitHub project Pages site
NEXT_PUBLIC_BASE_PATH=/developer-assistant-skills npm run build
# static site is emitted to website/out/
```

## How the catalog stays accurate

`npm run prebuild` (auto-run before `dev`/`build`) executes `scripts/gen-catalog.mjs`, which reads the
real `SKILL.md` / `*.agent.md` frontmatter from `../.developer/` and writes `data/catalog.json`. The
`SkillsTable` / `AgentsTable` components render from that JSON, so the site never drifts — add a skill
and it appears after the next build.

## Structure

- `pages/*.mdx` — MDX content (Nextra pages router) with `_meta.js` for navigation order
- `components/` — `Home`, `Diagram` (basePath-aware), `SkillsTable`, `AgentsTable`
- `public/*.svg` — hand-authored architecture diagrams
- `theme.config.tsx` — Nextra docs theme configuration
- `styles/custom.css` — landing-page + catalog styling layered on the theme

## Deploy

`.github/workflows/pages.yml` builds this app with `NEXT_PUBLIC_BASE_PATH` set and publishes
`website/out` via `actions/deploy-pages`. Enable **Settings → Pages → Source: GitHub Actions** once.

#!/usr/bin/env node
/**
 * gen-docs-catalog.js — generate docs/skills.html and docs/agents.html from the real frontmatter of
 * every SKILL.md and *.agent.md, so the published docs never drift from the library.
 *
 *   node .developer/scripts/gen-docs-catalog.js
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const SKILLS_DIR = path.join(ROOT, '.developer', 'skills');
const AGENTS_DIR = path.join(ROOT, '.developer', 'agents');
const DOCS = path.join(ROOT, 'docs');

function walk(dir, match) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p, match));
    else if (match(e.name)) out.push(p);
  }
  return out;
}

function fm(text) {
  const m = text.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---/);
  const o = {};
  if (m) for (const line of m[1].split('\n')) {
    const kv = line.match(/^([A-Za-z_-]+):\s*(.*)$/);
    if (kv) o[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '');
  }
  return o;
}

const esc = (s) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function page(title, desc, active, body) {
  const nav = ['getting-started', 'architecture', 'skills', 'agents'];
  const labels = { 'getting-started': 'Getting started', architecture: 'Architecture', skills: 'Skills', agents: 'Agents' };
  const links = nav.map(n => `<a class="link" href="${n}.html">${labels[n]}</a>`).join('\n      ');
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}" />
  <link rel="stylesheet" href="assets/style.css" />
</head>
<body>
  <header class="site-header">
    <nav class="nav">
      <a class="brand always" href="index.html">developer-<span>assistant</span>-skills</a>
      <span class="spacer"></span>
      ${links}
      <a class="link always" href="https://github.com/deepakkamboj/developer-assistant-skills">GitHub</a>
    </nav>
  </header>
  <main class="wrap">
${body}
  </main>
  <footer class="site">
    Open-source · MIT · <a href="https://github.com/deepakkamboj/developer-assistant-skills">github.com/deepakkamboj/developer-assistant-skills</a>
  </footer>
</body>
</html>
`;
}

// ---- Skills page ----
const skills = walk(SKILLS_DIR, n => n === 'SKILL.md').map(f => {
  const meta = fm(fs.readFileSync(f, 'utf8'));
  const rel = path.relative(SKILLS_DIR, path.dirname(f)).split(path.sep);
  return { group: rel.slice(0, -1).join('/') || rel[0], name: meta.name || rel[rel.length - 1], desc: meta.description || '' };
});
const groups = {};
for (const s of skills) (groups[s.group] ||= []).push(s);
let skillsBody = `    <h1 style="color:var(--heading)">Skills</h1>
    <p class="tagline" style="color:var(--muted)">${skills.length} skills across ${Object.keys(groups).length} lifecycle groups. Each is a folder with a <code>SKILL.md</code> that follows the Role → Context → Workflow (Step 0 TodoWrite) contract.</p>\n`;
for (const g of Object.keys(groups).sort()) {
  skillsBody += `    <h2 class="section">${esc(g)}</h2>\n    <table>\n      <thead><tr><th style="width:180px">Skill</th><th>What it does</th></tr></thead>\n      <tbody>\n`;
  for (const s of groups[g].sort((a, b) => a.name.localeCompare(b.name))) {
    skillsBody += `        <tr><td><code>${esc(s.name)}</code></td><td>${esc(s.desc)}</td></tr>\n`;
  }
  skillsBody += `      </tbody>\n    </table>\n`;
}
fs.writeFileSync(path.join(DOCS, 'skills.html'), page('Skills · developer-assistant-skills', 'The full catalog of lifecycle skills.', 'skills', skillsBody));

// ---- Agents page ----
const agents = walk(AGENTS_DIR, n => n.endsWith('.agent.md')).map(f => {
  const meta = fm(fs.readFileSync(f, 'utf8'));
  return { name: meta.name || path.basename(f), kind: meta.kind || '?', desc: meta.description || '' };
});
const critics = agents.filter(a => a.kind === 'critic').sort((a, b) => a.name.localeCompare(b.name));
const leads = agents.filter(a => a.kind === 'lead').sort((a, b) => a.name.localeCompare(b.name));
function agentTable(list) {
  let t = `    <table>\n      <thead><tr><th style="width:200px">Agent</th><th>Role</th></tr></thead>\n      <tbody>\n`;
  for (const a of list) t += `        <tr><td><code>${esc(a.name)}</code> <span class="tag ${a.kind}">${a.kind}</span></td><td>${esc(a.desc)}</td></tr>\n`;
  return t + `      </tbody>\n    </table>\n`;
}
let agentsBody = `    <h1 style="color:var(--heading)">Agents</h1>
    <p class="tagline" style="color:var(--muted)">${agents.length} agents — ${critics.length} independent review critics and ${leads.length} orchestrating leads/gates.</p>
    <h2 class="section">Review critics <span class="tag critic">critic</span></h2>
    <p>Independent and read-only. They audit diffs inside <code>code-review</code> and never edit code or approve their own findings.</p>
${agentTable(critics)}
    <h2 class="section">Leads &amp; gates <span class="tag lead">lead</span></h2>
    <p>Orchestrators and validators that drive multi-stage flows and guard merges.</p>
${agentTable(leads)}`;
fs.writeFileSync(path.join(DOCS, 'agents.html'), page('Agents · developer-assistant-skills', 'The agent roster: review critics and orchestrating leads.', 'agents', agentsBody));

console.log(`Wrote docs/skills.html (${skills.length} skills) and docs/agents.html (${agents.length} agents).`);

#!/usr/bin/env node
/**
 * gen-commands.js — generate thin command/prompt adapters for every skill so it can be invoked as
 * a slash command from Claude Code (`.claude/commands/dev/<skill>.md`, i.e. /dev:<skill>) and from
 * GitHub Copilot (`.github/prompts/<skill>.prompt.md`, i.e. /<skill>). Adapters just point at the
 * canonical SKILL.md — no logic is duplicated.
 *
 *   node .developer/scripts/gen-commands.js
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const SKILLS_DIR = path.join(ROOT, '.developer', 'skills');
const CLAUDE_DIR = path.join(ROOT, '.claude', 'commands', 'dev');
const COPILOT_DIR = path.join(ROOT, '.github', 'prompts');

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name === 'SKILL.md') out.push(p);
  }
  return out;
}

function fm(text) {
  const m = text.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---/);
  const o = {};
  if (m) for (const line of m[1].split('\n')) {
    const kv = line.match(/^([A-Za-z_-]+):\s*(.*)$/);
    if (kv) o[kv[1]] = kv[2].trim();
  }
  return o;
}

fs.mkdirSync(CLAUDE_DIR, { recursive: true });
fs.mkdirSync(COPILOT_DIR, { recursive: true });

let count = 0;
for (const file of walk(SKILLS_DIR).sort()) {
  const meta = fm(fs.readFileSync(file, 'utf8'));
  const name = meta.name || path.basename(path.dirname(file));
  const desc = (meta.description || '').replace(/\s+/g, ' ').trim();
  const rel = path.relative(ROOT, file).split(path.sep).join('/');

  // Claude Code: /dev:<name>
  fs.writeFileSync(path.join(CLAUDE_DIR, `${name}.md`),
`---
description: ${desc}
argument-hint: ${meta['argument-hint'] || '""'}
---

Read and execute the skill at \`${rel}\`. Follow its Role, load the listed context, and complete its
TodoWrite workflow in order. Arguments: $ARGUMENTS
`);

  // GitHub Copilot: /<name>
  fs.writeFileSync(path.join(COPILOT_DIR, `${name}.prompt.md`),
`---
mode: agent
description: ${desc}
---

Read and execute the skill at [\`${rel}\`](../../${rel}). Follow its Role, load the listed context,
and complete its TodoWrite workflow in order. Use the user's request as the skill arguments.
`);
  count++;
}

console.log(`Generated ${count} Claude commands and ${count} Copilot prompts.`);

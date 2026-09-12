#!/usr/bin/env node
/**
 * developer-assistant-skills CLI.
 *
 *   node bin/cli.js list skills          # list all skills (group/name)
 *   node bin/cli.js list agents          # list all agents (name · kind)
 *   node bin/cli.js validate             # structural check on skills + agents
 *   node bin/cli.js path <skill>         # print the SKILL.md path for a skill
 *   node bin/cli.js doctor               # environment + config check
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SKILLS_DIR = path.join(ROOT, '.developer', 'skills');
const AGENTS_DIR = path.join(ROOT, '.developer', 'agents');

function walk(dir, filter) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p, filter));
    else if (filter(entry.name)) out.push(p);
  }
  return out;
}

function skillFiles() { return walk(SKILLS_DIR, n => n === 'SKILL.md'); }
function agentFiles() { return walk(AGENTS_DIR, n => n.endsWith('.agent.md')); }

function skillId(file) {
  const rel = path.relative(SKILLS_DIR, path.dirname(file));
  return rel.split(path.sep).join('/');
}

function frontmatter(text) {
  const m = text.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const fm = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([A-Za-z_-]+):\s*(.*)$/);
    if (kv) fm[kv[1]] = kv[2].trim();
  }
  return fm;
}

function listSkills() {
  const files = skillFiles().sort();
  for (const f of files) console.log(skillId(f));
  console.error(`\n${files.length} skills`);
}

function listAgents() {
  const files = agentFiles().sort();
  for (const f of files) {
    const fm = frontmatter(fs.readFileSync(f, 'utf8'));
    console.log(`${fm.name || path.basename(f)}  ·  ${fm.kind || '?'}`);
  }
  console.error(`\n${files.length} agents`);
}

function validate() {
  let ok = true;
  const skills = skillFiles();
  for (const f of skills) {
    const t = fs.readFileSync(f, 'utf8');
    const problems = [];
    if (!/^##\s+Role/m.test(t)) problems.push('missing ## Role');
    if (!/Step 0: TodoWrite/m.test(t)) problems.push('missing Step 0 TodoWrite');
    if (!/TodoWrite\(\[/.test(t)) problems.push('missing TodoWrite([ block');
    if ((t.match(/```/g) || []).length % 2 !== 0) problems.push('unbalanced code fences');
    const fm = frontmatter(t);
    if (!fm.name) problems.push('missing frontmatter name');
    if (!fm.description) problems.push('missing frontmatter description');
    if (problems.length) { ok = false; console.log(`FAIL ${skillId(f)}: ${problems.join('; ')}`); }
  }
  const agents = agentFiles();
  for (const f of agents) {
    const fm = frontmatter(fs.readFileSync(f, 'utf8'));
    const problems = [];
    if (!fm.name) problems.push('missing name');
    if (!fm.kind || !['critic', 'lead'].includes(fm.kind)) problems.push('kind must be critic|lead');
    if (problems.length) { ok = false; console.log(`FAIL ${path.basename(f)}: ${problems.join('; ')}`); }
  }
  console.log(`\nskills=${skills.length} agents=${agents.length} ${ok ? 'ALL_OK' : 'HAS_ERRORS'}`);
  if (!ok) process.exit(1);
}

function findSkill(name) {
  return skillFiles().find(f => path.basename(path.dirname(f)) === name || skillId(f) === name);
}

function doctor() {
  const cfg = process.env.DEVELOPER_CONFIG || path.join(require('os').homedir(), '.developer', 'config.json');
  console.log(`node            ${process.version}`);
  console.log(`DEVELOPER_CONFIG ${process.env.DEVELOPER_CONFIG || '(unset → ~/.developer/config.json)'}`);
  console.log(`config present  ${fs.existsSync(cfg) ? 'yes' : 'NO — copy .developer/config/config.example.json'}`);
  console.log(`skills          ${skillFiles().length}`);
  console.log(`agents          ${agentFiles().length}`);
}

function main() {
  const [cmd, sub] = process.argv.slice(2);
  switch (cmd) {
    case 'list':
      if (sub === 'agents') return listAgents();
      return listSkills();
    case 'validate': return validate();
    case 'path': {
      const f = findSkill(sub);
      if (!f) { console.error(`skill not found: ${sub}`); process.exit(1); }
      return console.log(path.relative(ROOT, f));
    }
    case 'doctor': return doctor();
    default:
      console.log('Usage: dev-skills <list skills|list agents|validate|path <skill>|doctor>');
  }
}

if (require.main === module) main();

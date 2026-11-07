'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8').replace(/\r\n/g, '\n');
const coverage = () => JSON.parse(read('.developer/config/generic-coverage.json'));

test('lifecycle guide places every canonical skill and agent and explains execution boundaries', {
  skip: !fs.existsSync(path.join(root, 'website/pages/lifecycle.mdx'))
    ? 'Source-checkout documentation is not included in the npm package'
    : false,
}, () => {
  const catalog = coverage();
  const guide = read('website/pages/lifecycle.mdx');
  const skills = guide.split('## Skill placement')[1].split('## Agent placement')[0];
  const agents = guide.split('## Agent placement')[1].split('## One agent, specialists, or a squad?')[0];
  const ids = text => [...text.split('\n').filter(line => line.startsWith('|')).join('\n')
    .matchAll(/`([a-z][a-z0-9-]+)`/g)].map(match => match[1]).sort();
  assert.deepEqual(ids(skills), [...catalog.originalSkills, ...catalog.addedSkills].sort());
  assert.deepEqual(ids(agents), [...catalog.originalAgents, ...catalog.addedAgents].sort());
  for (const boundary of ['not automatic execution', 'One running agent can use several',
    'not a security sandbox', 'human', 'PASS, FAIL, BLOCKED, SKIPPED',
    'does not create sessions', 'runtime certification']) {
    assert.ok(guide.includes(boundary), `Missing lifecycle boundary: ${boundary}`);
  }
  assert.ok(read('website/pages/_meta.js').includes('lifecycle:'));
  const svg = read('website/public/agentic-lifecycle.svg');
  assert.match(svg, /role="img" aria-labelledby="title description"/);
  assert.match(svg, /<title id="title">[^<]+<\/title>/);
  assert.match(svg, /<desc id="description">[^<]{80,}<\/desc>/);
  assert.doesNotMatch(svg, /<script|foreignObject|(?:href|onload)\s*=/i);
  assert.ok(guide.includes('src="/agentic-lifecycle.svg"'));
});

test('developer-only layered diagram includes every canonical ID once and preserves its six-layer relationships', {
  skip: !fs.existsSync(path.join(root, 'website/pages/lifecycle.mdx'))
    ? 'Source-checkout documentation is not included in the npm package'
    : false,
}, () => {
  const catalog = coverage();
  const svg = read('website/public/developer-skill-layers.svg');
  const attributes = pattern => [...svg.matchAll(pattern)]
    .map(match => match[1]).sort();
  assert.deepEqual(attributes(/data-skill="([^"]+)"/g), [...catalog.originalSkills, ...catalog.addedSkills].sort());
  assert.deepEqual(attributes(/data-agent="([^"]+)"/g), [...catalog.originalAgents, ...catalog.addedAgents].sort());
  assert.deepEqual(attributes(/data-layer="([^"]+)"/g), ['scope', 'coordination', 'agents', 'skills', 'tools', 'evidence'].sort());
  assert.deepEqual(attributes(/data-phase="([^"]+)"/g),
    ['discover-design', 'plan-build', 'verify-review', 'diagnose-release', 'learn-measure'].sort());
  assert.deepEqual(attributes(/data-relation="([^"]+)"/g), [
    'coordination-scopes-roles', 'roles-select-skills', 'skills-use-authorized-tools',
    'repair-returns-to-verification', 'tools-produce-evidence', 'failure-returns-to-diagnosis',
  ].sort());
  assert.match(svg, /role="img" aria-labelledby="title description"/);
  assert.match(svg, /<title id="title">[^<]+<\/title>/);
  assert.match(svg, /<desc id="description">[^<]{80,}<\/desc>/);
  assert.doesNotMatch(svg, /deepak|accessibility-plugin|workiq|azure|s360|<script|foreignObject|(?:href|onload)\s*=/i);
  for (const boundary of ['not paired by row', 'A read-only critic stays read-only',
    'Human-owned merge', 'not an installed scheduler']) assert.ok(svg.includes(boundary), boundary);
  const guide = read('website/pages/lifecycle.mdx');
  assert.ok(guide.includes('src="/developer-skill-layers.svg"'));
  assert.ok(guide.includes('](/developer-skill-layers.svg)'));
});

function walk(directory, predicate) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(file, predicate) : predicate(file) ? [file] : [];
  });
}

function header(body) {
  const match = body.match(/^---\n([\s\S]*?)\n---/);
  assert.ok(match, 'Missing frontmatter');
  return Object.fromEntries([...match[1].matchAll(/^([\w-]+):\s*(.*)$/gm)]
    .map(([, key, value]) => [key, value.replace(/^["']|["']$/g, '')]));
}

function inventory() {
  const skills = new Map(walk(path.join(root, '.developer', 'skills'), file => file.endsWith(`${path.sep}SKILL.md`))
    .map(file => [header(fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n')).name, file]));
  const agents = new Map(walk(path.join(root, '.developer', 'agents'), file => file.endsWith('.agent.md'))
    .map(file => [header(fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n')).name, file]));
  return { skills, agents };
}

test('named generic baselines have real canonical skills and agents without claiming runtime certification', () => {
  const catalog = coverage();
  const { skills, agents } = inventory();
  assert.equal(catalog.sourceRoot, '.developer');
  assert.equal(catalog.authorship, 'Original additions; no Superpowers source content imported');
  assert.equal(catalog.runtimeValidated, false);
  assert.equal(catalog.scope, 'Named baseline capability coverage, not every skill or agent in existence');
  assert.equal(catalog.originalSkills.length, 38);
  assert.equal(catalog.originalAgents.length, 20);
  for (const name of catalog.originalSkills) assert.ok(skills.has(name), `Removed existing skill: ${name}`);
  for (const name of catalog.originalAgents) assert.ok(agents.has(name), `Removed existing agent: ${name}`);
  const expected = [
    'brainstorming', 'writing-plans', 'test-driven-development', 'executing-plans',
    'subagent-driven-development', 'systematic-debugging', 'verification-before-completion',
    'requesting-code-review', 'receiving-code-review', 'dispatching-parallel-agents',
    'using-git-worktrees', 'finishing-a-development-branch', 'using-superpowers',
    'writing-skills', 'diagnosing-superpowers',
  ];
  assert.deepEqual(catalog.comparison.map(item => item.sourcePurpose).sort(), expected.sort());
  for (const item of [...catalog.comparison, ...catalog.genericPurposes]) {
    assert.ok(item.reason.length > 30, `Missing rationale: ${item.sourcePurpose}`);
    assert.ok(item.skills.length + item.agents.length > 0, `Unmapped purpose: ${item.sourcePurpose}`);
    for (const name of item.skills) assert.ok(skills.has(name), `Unknown canonical skill: ${name}`);
    for (const name of item.agents) assert.ok(agents.has(name), `Unknown canonical agent: ${name}`);
  }
  assert.equal(Object.keys(catalog.roleMap).length, 20);
  for (const name of Object.values(catalog.roleMap)) assert.ok(agents.has(name), `Unmapped generic role ${name}`);
});

test('canonical English names remain unique and new definitions follow the repository contract', () => {
  const catalog = coverage();
  const { skills, agents } = inventory();
  const skillFiles = walk(path.join(root, '.developer', 'skills'), file => file.endsWith(`${path.sep}SKILL.md`));
  const agentFiles = walk(path.join(root, '.developer', 'agents'), file => file.endsWith('.agent.md'));
  assert.equal(skills.size, skillFiles.length, 'Duplicate effective skill name');
  assert.equal(agents.size, agentFiles.length, 'Duplicate effective agent name');
  for (const name of [...skills.keys(), ...agents.keys()]) {
    assert.match(name, /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/);
    assert.ok(name.length <= 64);
    assert.doesNotMatch(name, /^deepak-/);
  }
  for (const name of catalog.addedSkills) {
    const file = skills.get(name);
    assert.ok(file, `Missing added skill ${name}`);
    const body = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
    const meta = header(body);
    assert.equal(path.basename(path.dirname(file)), meta.name);
    assert.ok(meta.description.length > 30 && meta['argument-hint']);
    for (const heading of ['## Role', '## Context to load', '## Workflow',
      '### Step 0: TodoWrite Checklist', '### Steps', '## Output', '## Rules']) {
      assert.ok(body.includes(heading), `${name}: missing ${heading}`);
    }
    assert.match(body, /TodoWrite\(\[/);
    assert.match(body, /status: "in_progress"/);
    assert.equal((body.match(/```/g) || []).length % 2, 0);
    assert.doesNotMatch(body, /Copyright \(c\) 2025 Jesse Vincent|superpowers[:/\\]/i);
    assert.doesNotMatch(body, /accessibility-plugin:|VS Code Synced Data:|workiq|dynamics-crm|teams\.microsoft\.com|sharepoint\.com/i);
    for (const match of body.matchAll(/\]\((\.[^)\s#]+)(?:#[^)\s]*)?\)/g)) {
      const target = path.resolve(path.dirname(file), match[1]);
      assert.ok(fs.existsSync(target), `${name}: missing relative resource ${match[1]}`);
    }
  }
  for (const name of catalog.addedAgents) {
    const file = agents.get(name);
    assert.ok(file, `Missing added agent ${name}`);
    const body = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
    const meta = header(body);
    assert.equal(path.basename(file), `${name}.agent.md`);
    assert.ok(['lead', 'critic'].includes(meta.kind));
    const tools = meta.tools.replace(/^\[|\]$/g, '').split(',')
      .map(value => value.trim().replace(/^["']|["']$/g, ''));
    assert.ok(
      JSON.stringify(tools) === JSON.stringify(['read', 'search']) ||
      JSON.stringify(tools) === JSON.stringify(['read_file', 'grep']),
      `${name}: new evidence agents must have read/search tools only`
    );
    assert.ok(meta.skills);
    assert.ok(meta.description.length > 30);
    for (const heading of ['## Role', '## When to activate', '## Output', '## Rules']) {
      assert.ok(body.includes(heading), `${name}: missing ${heading}`);
    }
    assert.ok(body.includes('## Checklist') || body.includes('## Workflow'));
    assert.doesNotMatch(body, /^model:|^reasoning_effort:|^hooks:/m);
    assert.doesNotMatch(body, /Copyright \(c\) 2025 Jesse Vincent|accessibility-plugin:|workiq|dynamics-crm|sharepoint\.com/i);
  }
});

test('plugin discovery, generated adapters and website catalog include every canonical definition', () => {
  const { skills, agents } = inventory();
  const plugin = JSON.parse(read('.developer/plugin.json'));
  const roots = plugin.skills.map(directory => path.resolve(root, '.developer', directory));
  const website = JSON.parse(read('website/data/catalog.json'));
  for (const [name, file] of skills) {
    assert.ok(roots.some(directory => {
      const relative = path.relative(directory, file);
      return relative !== '..' && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative);
    }), `Plugin does not discover ${name}`);
    const relative = path.relative(root, file).split(path.sep).join('/');
    const claude = read(`.claude/commands/dev/${name}.md`);
    const copilot = read(`.github/prompts/${name}.prompt.md`);
    assert.ok(claude.includes(relative), `Stale command ${name}`);
    assert.ok(copilot.includes(relative), `Stale prompt ${name}`);
    assert.ok(website.skills.some(item => item.name === name), `Website omits ${name}`);
  }
  assert.deepEqual(website.agents.map(item => item.name).sort(), [...agents.keys()].sort());
  assert.equal(website.skills.length, skills.size);
  assert.ok(read('website/components/Home.tsx')
    .includes('new Set(catalog.skills.map(skill => skill.group.split("/")[0])).size'));
  const packaged = JSON.parse(read('package.json')).files;
  assert.ok(packaged.includes('.developer/'));
  assert.ok(packaged.includes('evals/generic-catalog.test.js'));
});

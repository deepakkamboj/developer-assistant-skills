'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const reference = process.env.A11Y_CONTRACT_REF;
const skillPath = name => `.developer/skills/accessibility/${name}/SKILL.md`;

function read(file) {
  if (reference) {
    return execFileSync('git', ['show', `${reference}:${file}`], {
      cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe']
    });
  }
  return fs.readFileSync(path.join(root, file), 'utf8');
}

function includesAll(text, phrases) {
  const normalized = text.replace(/\s+/g, ' ');
  for (const phrase of phrases) assert.ok(normalized.includes(phrase), `Missing contract: ${phrase}`);
}

test('fix requires source ownership and causal investigation before repair', () => {
  const text = read(skillPath('a11y-fix'));
  includesAll(text, [
    '## Investigation contract', 'Runtime-to-source chain', 'Search ledger',
    'Search escalation', 'Dependency boundary', 'Competing causes', 'Existing work',
    'before editing', 'max_repair_attempts', 'baseline', 'candidate'
  ]);
  assert.ok(text.indexOf('Reproduce before editing') < text.indexOf('Repair minimally'));
  assert.doesNotMatch(text, /High \| Standard, unambiguous pattern/);
});

test('fix outcomes distinguish blocked investigations from unsuccessful and completed fixes', () => {
  const text = read(skillPath('a11y-fix'));
  for (const outcome of [
    'fixed', 'not-fixed', 'blocked', 'inconclusive', 'not-reproduced',
    'needs-product-decision', 'external-dependency', 'out-of-scope', 'by-design',
    'duplicate', 'already-fixed'
  ]) assert.ok(text.includes(`\`${outcome}\``), `Missing outcome: ${outcome}`);
  includesAll(text, ['nextAction', 'owner', 'verificationMatrix', 'not a completed fix']);
});

test('multi-repo Fluent investigation resolves the installed generation and consumer build', () => {
  const text = read(skillPath('a11y-fix'));
  includesAll(text, [
    'Multi-repository applications and Fluent UI v8/v9', '@fluentui/react',
    '@fluentui/react-components', 'same-version', 'dependencyTrace',
    'not config', 'v8-to-v9 migration is not a routine version bump',
    "consuming app's built/deployed dependency includes it"
  ]);
  includesAll(read(skillPath('a11y-verify')), [
    'deployed consumer', 'v9 success does not', 'prove a v8 fix'
  ]);
});

test('verification requires original failure, exact candidate and real AT evidence', () => {
  const text = read(skillPath('a11y-verify'));
  includesAll(text, [
    '`Fixed`', '`Not fixed`', '`Fixed but new issues`', '`Blocked`', '`Inconclusive`',
    'baseline failure', 'exact candidate', 'Actual AT execution',
    'proxies, not a screen reader', 'Known failures take precedence',
    '`not-run`', 'wcag22aa'
  ]);
});

test('scan treats static findings and incomplete coverage as candidates, not automatic failures', () => {
  const text = read(skillPath('a11y-scan'));
  includesAll(text, [
    '`confirmed`', '`suspected`', '`needs-review`', 'wcag21a,wcag21aa,wcag22aa',
    'axe `incomplete`', 'caller', 'runtime-to-source chain'
  ]);
  assert.doesNotMatch(text, /Grep for these patterns and flag every match|catches roughly 40%/);
});

test('review respects native and manual activation patterns and does not equate timeouts with bugs', () => {
  const text = read(skillPath('a11y-review'));
  includesAll(text, [
    'manual activation', 'native select', 'non-modal', 'timeout is a diagnostic signal',
    'Assistive-technology evidence', 'not proof of correctness at wider breakpoints',
    '| Toggle buttons |', '`aria-pressed`', '| Switches |'
  ]);
  assert.doesNotMatch(text, /almost always a real bug|icon-only buttons need `aria-label`/);
});

test('test generation proves repair sensitivity and separates manual AT coverage', () => {
  const text = read(skillPath('a11y-test-gen'));
  includesAll(text, [
    'baseline and candidate', 'fail for the original defect', 'Manual matrix',
    'actual AT execution', 'caller', 'manual/automatic', 'wcag22aa'
  ]);
  assert.doesNotMatch(text, /Remind to\s+`npm i/);
});

test('manual-only AT repairs use real before-after evidence without pretending proxies reproduce speech', () => {
  for (const file of [skillPath('a11y-fix'), skillPath('a11y-test-gen')]) {
    includesAll(read(file), [
      'where automatable', 'manual-only AT defects', 'repeatable manual',
      'baseline/candidate AT evidence', 'Missing required AT evidence still blocks success'
    ]);
  }
  includesAll(read(skillPath('a11y-test-gen')), ['proxy checks may pass on both builds', 'partial coverage']);
});

test('development guidance does not guarantee compliance or prescribe incomplete modal code', () => {
  const text = read(skillPath('a11y-dev'));
  includesAll(text, [
    'still needs runtime', 'use `a11y-fix`', 'duplicate Enter/Space',
    'do not add alerts', 'partial focus', 'non-modal'
  ]);
  assert.doesNotMatch(text, /Level AA by construction|querySelector\('button/);
});

test('report status, HTML filters and cohort accounting preserve uncertainty', () => {
  const text = read(skillPath('a11y-report'));
  for (const status of ['open', 'changed-unverified', 'verified', 'failed', 'blocked', 'inconclusive']) {
    assert.ok(text.includes(`value="${status}"`), `Missing report filter: ${status}`);
  }
  includesAll(text, [
    'Skill invocation does not change status', 'same candidate', 'fixRunId',
    'empty denominator', 'Carried work', 'weighted overall fix'
  ]);
  assert.doesNotMatch(text, /ran on a finding, mark it `fixed`\/`verified`/);
});

test('npm package allowlist excludes local automation folders and usage guide', () => {
  const manifest = JSON.parse(read('package.json'));
  assert.ok(Array.isArray(manifest.files) && manifest.files.length > 0);
  for (const entry of manifest.files) {
    assert.doesNotMatch(entry, /(^|\/)automations(\/|$)/);
    assert.notEqual(entry.replace(/^\.\//, ''), 'usage.md');
    assert.ok(!['.', './', '*', '**', '.github', '.github/'].includes(entry),
      `Broad package entry could expose local automations: ${entry}`);
  }
});

test('weekly-observation scenarios have unique IDs and explicit assertions', () => {
  const cases = JSON.parse(fs.readFileSync(path.join(__dirname, 'cases', 'a11y-repair-scenarios.json'), 'utf8'));
  assert.ok(Array.isArray(cases));
  assert.equal(new Set(cases.map(item => item.id)).size, cases.length);
  const coveredSkills = new Set();
  for (const item of cases) {
    assert.ok(item.id && item.input && item.skill);
    assert.ok(Array.isArray(item.expect) && item.expect.length >= 3, item.id);
    assert.ok(item.expect.every(value => typeof value === 'string' && value.length > 0), item.id);
    coveredSkills.add(item.skill);
  }
  for (const name of ['a11y-fix', 'a11y-verify', 'a11y-scan', 'a11y-review', 'a11y-test-gen', 'a11y-dev', 'a11y-report']) {
    assert.ok(coveredSkills.has(`accessibility/${name}`), `Missing scenario for ${name}`);
  }
});

const focusedReviews = ['interactive', 'contrast', 'color', 'links', 'modes', 'viewports'];
const sharedDirectory = '.developer/config/accessibility';
const sharedEntry = `${sharedDirectory}/shared-instructions.md`;
const originalSkills = [
  'a11y-dev', 'a11y-fix', 'a11y-report', 'a11y-review', 'a11y-scan',
  'a11y-test-gen', 'a11y-verify'
];
const portableFiles = [
  ...originalSkills.map(skillPath),
  ...focusedReviews.map(mode => skillPath(`a11y-review-${mode}`)),
  ...['prereq-check', 'plugin-version-check'].map(name => `.developer/skills/repo/${name}/SKILL.md`),
  ...['a11y-reviewer', 'a11y-tester', 'accessibility-advocate'].map(name => `.developer/agents/${name}.agent.md`),
  ...['shared-instructions', 'accessibility-coverage', 'issue-families', 'repair-playbook', 'scenario-checks']
    .map(name => `${sharedDirectory}/${name}.md`)
];

test('all accessibility roles route through one shared entry point and retain original workflows', () => {
  for (const file of portableFiles.filter(file => !file.startsWith(sharedDirectory))) {
    const text = read(file);
    assert.match(text, /config\/accessibility\/shared-instructions\.md/, file);
    assert.doesNotMatch(text, /\]\([^)]*(?:accessibility-coverage|issue-families|repair-playbook|scenario-checks)\.md\)/,
      `${file} bypasses the shared entry point`);
  }
  for (const mode of focusedReviews) {
    const text = read(skillPath(`a11y-review-${mode}`));
    includesAll(text, ['## Role', '## Context to load', '## Workflow',
      '### Step 0: TodoWrite Checklist', '### Steps', '## Output', 'TodoWrite([']);
    assert.match(read(skillPath('a11y-review')), new RegExp(`a11y-review-${mode}`));
  }
  includesAll(read(skillPath('a11y-review')), ['combined `--mode` interface', '`all`']);
  includesAll(read(skillPath('a11y-report')), ['Markdown', 'HTML']);
});

test('shared map includes exactly the 55 WCAG2.2 A/AA criteria and 2.1 boundaries', () => {
  const map = read(`${sharedDirectory}/accessibility-coverage.md`);
  const criteria = [...map.matchAll(/^\| (\d\.\d\.\d+) \| (A|AA) \|/gm)].map(match => match[1]);
  assert.equal(criteria.length, 55);
  assert.equal(new Set(criteria).size, 55);
  for (const criterion of ['1.2.1', '1.2.5', '2.4.11', '2.5.7', '2.5.8', '3.2.6', '3.3.7', '3.3.8']) {
    assert.ok(criteria.includes(criterion), criterion);
  }
  assert.ok(!criteria.includes('4.1.1'));
  includesAll(map, ['WCAG 4.1.1 Parsing is part of 2.1 and removed from 2.2',
    '24px-diameter', '44px under 2.5.5 is AAA', '18pt/24 CSS px']);
  for (const file of ['issue-families', 'repair-playbook']) {
    assert.equal([...read(`${sharedDirectory}/${file}.md`).matchAll(/^## \d+\. /gm)].length, 10);
  }
  const scenarios = read(`${sharedDirectory}/scenario-checks.md`);
  const ids = [...scenarios.matchAll(/^\| (S\d\d) \|/gm)].map(match => match[1]);
  assert.deepEqual(ids, Array.from({ length: 20 }, (_, i) => `S${String(i + 1).padStart(2, '0')}`));
});

test('portable additions contain no internal integration payload or excluded engine workflows', () => {
  for (const file of portableFiles) {
    const text = read(file);
    assert.doesNotMatch(text, /\b(?:ADO|S360|Narrator)\b|Microsoft Accessibility Standards|microsoft\.ghe\.com|visualstudio\.com|sharepoint\.com/, file);
    assert.doesNotMatch(text, /a11y-fastpass|a11y-lighthouse|lighthouse-scan|run-fastpass/, file);
  }
  for (const mode of focusedReviews) {
    const frontmatter = read(skillPath(`a11y-review-${mode}`)).split('---')[1];
    assert.doesNotMatch(frontmatter, /^\s*(version|author):/m);
  }
  includesAll(read('.developer/skills/repo/plugin-version-check/SKILL.md'),
    ['`current`, `outdated`, `ahead`, `missing` and `unknown`',
      'SemVer precedence', 'approval-only', 'not an outdated installation']);
  includesAll(read('.developer/skills/repo/prereq-check/SKILL.md'),
    ['read-only', '`unauthorized`', '`startup-failed`', 'HTTP 200 alone is insufficient',
      'Obtain explicit approval', 'host-managed']);
});

test('portable guidance preserves actual interaction and threshold counterexamples', () => {
  includesAll(read(skillPath('a11y-review-interactive')), [
    'Manual/automatic activation', 'Native select', 'modal/non-modal',
    'Actual single-pointer non-drag path', 'Virtualized/infinite', 'DOM/axe are proxies'
  ]);
  includesAll(read(skillPath('a11y-review-color')), ['Hidden text or ARIA alone',
    'asterisk is already a shape cue', 'Decorative/redundant colors are not failures']);
  includesAll(read(skillPath('a11y-review-contrast')), ['unrounded ratio', '3.5:1',
    'Text inside a button still uses text thresholds']);
  includesAll(read(skillPath('a11y-review-links')), ['Context can satisfy 2.4.4',
    '`aria-describedby` does not automatically', '2.4.9']);
  includesAll(read(skillPath('a11y-review-modes')), ['OS high-contrast', 'partial evidence',
    '0.12em', '0.16em', '2.3.3 is AAA']);
  includesAll(read(skillPath('a11y-review-viewports')), ['256 CSS px', '24px-diameter',
    'actual hit areas', 'Necessary 2D content']);
  includesAll(read(sharedEntry), ['`wcag22a`', '`incomplete`', 'exact consumer build',
    'Merge and issue closure remain explicit human actions']);
});

test('portable Markdown links resolve inside the packaged canonical tree', () => {
  for (const file of portableFiles) {
    const prose = read(file).replace(/```[\s\S]*?```/g, '');
    for (const match of prose.matchAll(/\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
      const link = match[1].split('#')[0];
      if (!link || /^[a-z]+:/i.test(link)) continue;
      const resolved = path.resolve(root, path.dirname(file), link);
      assert.ok(resolved.startsWith(path.join(root, '.developer') + path.sep),
        `Noncanonical link ${file}: ${link}`);
      assert.ok(fs.existsSync(resolved), `Broken link ${file}: ${link}`);
    }
  }
});

test('generated adapters and portal catalog expose every synchronized entry point', () => {
  execFileSync(process.execPath, ['website/scripts/gen-catalog.mjs'], {
    cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe']
  });
  const catalog = JSON.parse(read('website/data/catalog.json'));
  assert.equal(catalog.skills.length, 44);
  assert.equal(catalog.agents.length, 21);
  for (const name of [...focusedReviews.map(mode => `a11y-review-${mode}`),
    'prereq-check', 'plugin-version-check']) {
    const group = name.startsWith('a11y-') ? 'accessibility' : 'repo';
    const canonical = `.developer/skills/${group}/${name}/SKILL.md`;
    assert.ok(catalog.skills.some(skill => skill.name === name), name);
    assert.ok(read(`.github/prompts/${name}.prompt.md`).includes(canonical));
    assert.ok(read(`.claude/commands/dev/${name}.md`).includes(canonical));
  }
  assert.ok(catalog.agents.some(agent => agent.name === 'a11y-reviewer' && agent.kind === 'critic'));
});

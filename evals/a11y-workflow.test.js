'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const reference = process.env.A11Y_CONTRACT_REF;
const skillPath = name => `.developer/skills/accessibility/${name}/SKILL.md`;
const promptPath = name => `.github/automations/accessibility-${name}/prompt.md`;

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
  for (const file of [skillPath('a11y-fix'), skillPath('a11y-test-gen'), promptPath('fix-bugs')]) {
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

test('scheduled prompts are configuration-driven and share evidence and persistence gates', () => {
  for (const name of ['fix-bugs', 'fix-validation']) {
    const text = read(promptPath(name));
    includesAll(text, [
      'DEVELOPER_CONFIG', 'FIX_HANDOFF_PATH', 'issueKey', 'fixRunId',
      'a11y-fix', 'a11y-verify', 'repair-validator', 'baseline',
      'actual', 'AT', 'atomic', 'lock', 'owner'
    ]);
    assert.doesNotMatch(text, /https?:\/\/|C:\\Users\\/);
  }
  includesAll(read(promptPath('fix-bugs')), [
    '`schemaVersion`', '`validationHistory`', '`validationRepairValidatorStatus`',
    '## Step 2 - Prove code ownership and root cause', '## Step 3 - Make a bounded repair',
    'default `a11y-fixes.json` beside the resolved config'
  ]);
  includesAll(read(promptPath('fix-validation')), [
    'validationTargetCommit', 'Preserve the original `fixCommit`',
    'Append each attempt to `validationHistory`', 'A known failure wins over a blocker',
    'Re-check the PR head', 'unresolved eligibility'
  ]);
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

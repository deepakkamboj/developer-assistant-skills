const fs = require('fs'), path = require('path');
const root = '.developer/skills';
let skills = 0, role = 0, todo = 0, bad = [];
const walk = (d) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    const full = path.join(d, e.name);
    const s = path.join(full, 'SKILL.md');
    if (fs.existsSync(s)) {
      const t = fs.readFileSync(s, 'utf8');
      skills++;
      if (/^## Role$/m.test(t)) role++; else bad.push(full + ' (no Role)');
      if (/TodoWrite\(\[/.test(t)) todo++; else bad.push(full + ' (no TodoWrite)');
      if (((t.match(/^```/gm) || []).length) % 2 !== 0) bad.push(full + ' (fences)');
    }
    walk(full);
  }
};
walk(root);
console.log(`skills=${skills} role=${role} todo=${todo}`);
console.log(bad.length ? 'BAD:\n' + bad.join('\n') : 'ALL_OK');

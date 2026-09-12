// Generates website/data/catalog.json from the real SKILL.md / *.agent.md frontmatter so the docs
// never drift from the library. Runs automatically before `dev` and `build`.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.join(__dirname, "..", "..");
const SKILLS_DIR = path.join(REPO_ROOT, ".developer", "skills");
const AGENTS_DIR = path.join(REPO_ROOT, ".developer", "agents");
const OUT = path.join(__dirname, "..", "data", "catalog.json");

function walk(dir, match) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p, match));
    else if (match(e.name)) out.push(p);
  }
  return out;
}

function frontmatter(text) {
  const m = text.replace(/\r\n/g, "\n").match(/^---\n([\s\S]*?)\n---/);
  const o = {};
  if (m) {
    for (const line of m[1].split("\n")) {
      const kv = line.match(/^([A-Za-z_-]+):\s*(.*)$/);
      if (kv) o[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, "");
    }
  }
  return o;
}

const skills = walk(SKILLS_DIR, (n) => n === "SKILL.md")
  .map((f) => {
    const meta = frontmatter(fs.readFileSync(f, "utf8"));
    const rel = path.relative(SKILLS_DIR, path.dirname(f)).split(path.sep);
    return {
      group: rel.slice(0, -1).join("/") || rel[0],
      name: meta.name || rel[rel.length - 1],
      description: meta.description || "",
    };
  })
  .sort((a, b) => a.group.localeCompare(b.group) || a.name.localeCompare(b.name));

const agents = walk(AGENTS_DIR, (n) => n.endsWith(".agent.md"))
  .map((f) => {
    const meta = frontmatter(fs.readFileSync(f, "utf8"));
    return {
      name: meta.name || path.basename(f),
      kind: meta.kind || "?",
      description: meta.description || "",
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({ skills, agents }, null, 2) + "\n");
console.log(`Wrote ${path.relative(REPO_ROOT, OUT)} — ${skills.length} skills, ${agents.length} agents.`);

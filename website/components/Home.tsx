import React from "react";
import Link from "next/link";
import Diagram from "./Diagram";

const badges: [string, string][] = [
  ["License MIT", "https://img.shields.io/badge/License-MIT-green.svg"],
  ["Node 18+", "https://img.shields.io/badge/Node.js-%E2%89%A518-339933?logo=node.js&logoColor=white"],
  ["Claude Code", "https://img.shields.io/badge/Claude_Code-ready-D97757?logo=anthropic&logoColor=white"],
  ["GitHub Copilot", "https://img.shields.io/badge/GitHub_Copilot-ready-000000?logo=githubcopilot&logoColor=white"],
  ["Playwright", "https://img.shields.io/badge/Playwright-tested-2EAD33?logo=playwright&logoColor=white"],
  ["axe-core WCAG AA", "https://img.shields.io/badge/axe--core-WCAG_AA-663399"],
];

const stats: [string, string][] = [
  ["34", "Skills"],
  ["20", "Agents"],
  ["10", "Lifecycle groups"],
  ["3", "Runtimes"],
];

const cards: [string, string][] = [
  ["Closed-loop by design", "An EASE-MAS backbone links requirement → PRD → architecture → code → test → failure → root-cause → repair, with a supervisor orchestrating the DAG."],
  ["Independent critics", "15 specialist review agents (security, performance, a11y, tests, …) audit diffs read-only; a deliberate step turns findings into a verdict."],
  ["Bounded, safe autonomy", "Repair is capped by max_repair_attempts, guarded by a regression gate and an independent repair-validator. Merge stays human-owned."],
  ["CLI-first tooling", "Skills prefer real tools — gh, az, npx playwright, npx axe — falling back to MCP servers when a CLI is unavailable."],
  ["Accessibility built in", "A full WCAG 2.1/2.2 AA lifecycle: scan, deep review, fix, verify, and generate Playwright + axe regression tests."],
  ["One config, three runtimes", "A single config.json plus prose companions drives Claude Code, Copilot, and Codex through thin generated adapters."],
];

export default function Home() {
  return (
    <div className="das-home">
      <section className="das-hero">
        <h1>Skills &amp; agents for the whole software lifecycle</h1>
        <p className="das-tagline">
          A vendor-neutral, open-source developer plugin for <strong>Claude Code</strong>,{" "}
          <strong>GitHub Copilot</strong>, and <strong>Codex</strong> — requirements, architecture,
          design, implementation, review, testing, accessibility, debugging, and{" "}
          <strong>bounded autonomous repair</strong>.
        </p>
        <div className="das-badges">
          {badges.map(([alt, src]) => (
            <img key={alt} alt={alt} src={src} />
          ))}
        </div>
        <div className="das-cta">
          <Link className="das-btn primary" href="/getting-started">
            Get started
          </Link>
          <Link className="das-btn ghost" href="/architecture">
            See the architecture
          </Link>
        </div>
      </section>

      <div className="das-stat-row">
        {stats.map(([n, l]) => (
          <div className="das-stat" key={l}>
            <div className="n">{n}</div>
            <div className="l">{l}</div>
          </div>
        ))}
      </div>

      <div className="das-grid">
        {cards.map(([h, p]) => (
          <div className="das-card" key={h}>
            <h3>{h}</h3>
            <p>{p}</p>
          </div>
        ))}
      </div>

      <Diagram
        src="/architecture.svg"
        alt="Layered architecture: runtimes call thin adapters that resolve to the .developer canonical library, which drives CLI-first tooling."
        caption="Runtimes → thin adapters → the .developer/ canonical library → CLI-first, MCP-fallback tooling."
      />
    </div>
  );
}

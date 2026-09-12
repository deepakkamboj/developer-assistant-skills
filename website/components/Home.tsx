import React from "react";
import Link from "next/link";
import Diagram from "./Diagram";
import { Features, Feature } from "./Features";
import { Cards, Card } from "./Cards";
import { PackageInstall } from "./PackageInstall";
import {
  LoopIcon,
  ShieldIcon,
  WrenchIcon,
  TerminalIcon,
  EyeIcon,
  GearIcon,
  RocketIcon,
  BookIcon,
  LayersIcon,
} from "./icons";

const badges: [string, string, string][] = [
  ["npm version", "https://img.shields.io/npm/v/developer-assistant-skills?logo=npm&color=cb3837", "https://www.npmjs.com/package/developer-assistant-skills"],
  ["CI", "https://github.com/deepakkamboj/developer-assistant-skills/actions/workflows/ci.yml/badge.svg", "https://github.com/deepakkamboj/developer-assistant-skills/actions/workflows/ci.yml"],
  ["License MIT", "https://img.shields.io/badge/License-MIT-green.svg", "https://github.com/deepakkamboj/developer-assistant-skills/blob/main/LICENSE"],
  ["Claude Code", "https://img.shields.io/badge/Claude_Code-ready-D97757?logo=anthropic&logoColor=white", "https://github.com/deepakkamboj/developer-assistant-skills"],
  ["GitHub Copilot", "https://img.shields.io/badge/GitHub_Copilot-ready-000000?logo=githubcopilot&logoColor=white", "https://github.com/deepakkamboj/developer-assistant-skills"],
  ["Playwright", "https://img.shields.io/badge/Playwright-tested-2EAD33?logo=playwright&logoColor=white", "https://playwright.dev"],
];

const stats: [string, string][] = [
  ["34", "Skills"],
  ["20", "Agents"],
  ["10", "Lifecycle groups"],
  ["3", "Runtimes"],
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
          {badges.map(([alt, src, href]) => (
            <a key={alt} href={href} target="_blank" rel="noreferrer">
              <img alt={alt} src={src} />
            </a>
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

      <PackageInstall packages={["developer-assistant-skills"]} />

      <div className="das-stat-row">
        {stats.map(([n, l]) => (
          <div className="das-stat" key={l}>
            <div className="n">{n}</div>
            <div className="l">{l}</div>
          </div>
        ))}
      </div>

      <h2>Features</h2>
      <Features>
        <Feature icon={<LoopIcon />} title="Closed-loop by design">
          An EASE-MAS backbone links requirement → PRD → architecture → code → test → failure →
          root-cause → repair, with a supervisor orchestrating the DAG.
        </Feature>
        <Feature icon={<ShieldIcon />} title="Independent critics">
          15 specialist review agents (security, performance, a11y, tests, …) audit diffs read-only;
          a <code>deliberate</code> step turns findings into a verdict.
        </Feature>
        <Feature icon={<WrenchIcon />} title="Bounded, safe autonomy">
          Repair is capped by <code>max_repair_attempts</code>, guarded by a regression gate and an
          independent <code>repair-validator</code>. Merge stays human-owned.
        </Feature>
        <Feature icon={<TerminalIcon />} title="CLI-first tooling">
          Skills prefer real tools — <code>gh</code>, <code>az</code>, <code>npx playwright</code>,{" "}
          <code>npx axe</code> — falling back to MCP servers when a CLI is unavailable.
        </Feature>
        <Feature icon={<EyeIcon />} title="Accessibility built in">
          A full WCAG 2.1/2.2 AA lifecycle: scan, deep review, fix, verify, and generate Playwright +
          axe regression tests.
        </Feature>
        <Feature icon={<GearIcon />} title="One config, three runtimes">
          A single <code>config.json</code> plus prose companions drives Claude Code, Copilot, and
          Codex through thin generated adapters.
        </Feature>
      </Features>

      <h2>Explore</h2>
      <Cards cols={2}>
        <Card icon={<RocketIcon />} title="Getting started" href="/getting-started">
          Install, configure, and invoke skills from any runtime.
        </Card>
        <Card icon={<LayersIcon />} title="Architecture" href="/architecture">
          The canonical library, closed loop, traceability, and review pipeline.
        </Card>
        <Card icon={<TerminalIcon />} title="Skills" href="/skills">
          All 34 lifecycle skills, generated from the real frontmatter.
        </Card>
        <Card icon={<BookIcon />} title="Agents" href="/agents">
          20 agents — review critics and orchestrating leads.
        </Card>
      </Cards>

      <Diagram
        src="/architecture.svg"
        alt="Layered architecture: runtimes call thin adapters that resolve to the .developer canonical library, which drives CLI-first tooling."
        caption="Runtimes → thin adapters → the .developer/ canonical library → CLI-first, MCP-fallback tooling."
      />
    </div>
  );
}

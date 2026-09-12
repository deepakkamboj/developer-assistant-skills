import React from "react";
import type { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: (
    <span style={{ fontWeight: 700 }}>
      developer-<span style={{ color: "#d97757" }}>assistant</span>-skills
    </span>
  ),
  project: {
    link: "https://github.com/deepakkamboj/developer-assistant-skills",
  },
  docsRepositoryBase:
    "https://github.com/deepakkamboj/developer-assistant-skills/tree/main/website",
  footer: {
    content: (
      <span>
        Open-source · MIT ·{" "}
        <a href="https://github.com/deepakkamboj/developer-assistant-skills">
          github.com/deepakkamboj/developer-assistant-skills
        </a>
      </span>
    ),
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="description"
        content="Vendor-neutral, open-source developer plugin for Claude Code, GitHub Copilot, and Codex — skills and agents for the full software lifecycle."
      />
    </>
  ),
  color: { hue: 18, saturation: 62 },
  darkMode: true,
};

export default config;

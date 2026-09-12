import React from "react";
import catalog from "../data/catalog.json";

type Agent = { name: string; kind: string; description: string };

function Table({ list }: { list: Agent[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th style={{ width: 210 }}>Agent</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {list.map((a) => (
          <tr key={a.name}>
            <td>
              <code>{a.name}</code> <span className={`das-tag ${a.kind}`}>{a.kind}</span>
            </td>
            <td>{a.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function AgentsTable() {
  const agents = (catalog.agents as Agent[]) || [];
  const critics = agents.filter((a) => a.kind === "critic");
  const leads = agents.filter((a) => a.kind === "lead");

  return (
    <div className="das-catalog">
      <h2>
        Review critics <span className="das-tag critic">critic</span>
      </h2>
      <p>
        Independent and read-only. They audit diffs inside <code>code-review</code> and never edit
        code or approve their own findings.
      </p>
      <Table list={critics} />

      <h2>
        Leads &amp; gates <span className="das-tag lead">lead</span>
      </h2>
      <p>Orchestrators and validators that drive multi-stage flows and guard merges.</p>
      <Table list={leads} />
    </div>
  );
}

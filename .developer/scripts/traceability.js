#!/usr/bin/env node
/**
 * traceability.js — append-safe writer/query for the lifecycle traceability graph.
 *
 * Graph shape: { nodes: [{ id, type, ref, meta }], edges: [{ from, to, type, meta }] }
 * Node types: Requirement PRDItem ArchDecision CodeSymbol TestCase Execution
 *             Failure Bug Hypothesis Repair Validation
 * Edge types: derives implements tests executes fails reports hypothesizes repairs validates
 *
 * Usage:
 *   node traceability.js --graph <path> add-node   --id <id> --type <Type> [--ref <r>] [--meta '<json>']
 *   node traceability.js --graph <path> add-edge   --from <id> --to <id> --type <verb> [--meta '<json>']
 *   node traceability.js --graph <path> query      --node <id>            # neighbors of a node
 *   node traceability.js --graph <path> impact     --node <id>            # transitive downstream
 *   node traceability.js --graph <path> orphans                          # nodes missing expected links
 *
 * Deterministic and non-destructive: nodes are upserted by id; edges deduped by (from,to,type).
 */
'use strict';
const fs = require('fs');
const path = require('path');

const NODE_TYPES = new Set(['Requirement', 'PRDItem', 'ArchDecision', 'CodeSymbol', 'TestCase',
  'Execution', 'Failure', 'Bug', 'Hypothesis', 'Repair', 'Validation']);
const EDGE_TYPES = new Set(['derives', 'implements', 'tests', 'executes', 'fails', 'reports',
  'hypothesizes', 'repairs', 'validates']);

function parseArgs(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) out[a.slice(2)] = (argv[i + 1] && !argv[i + 1].startsWith('--')) ? argv[++i] : true;
    else out._.push(a);
  }
  return out;
}

function load(graphPath) {
  if (!fs.existsSync(graphPath)) return { nodes: [], edges: [] };
  const g = JSON.parse(fs.readFileSync(graphPath, 'utf8'));
  g.nodes = g.nodes || [];
  g.edges = g.edges || [];
  return g;
}

function save(graphPath, g) {
  g.nodes.sort((a, b) => a.id.localeCompare(b.id));
  g.edges.sort((a, b) => (a.from + a.type + a.to).localeCompare(b.from + b.type + b.to));
  fs.mkdirSync(path.dirname(graphPath), { recursive: true });
  fs.writeFileSync(graphPath, JSON.stringify(g, null, 2) + '\n');
}

function addNode(g, { id, type, ref, meta }) {
  if (!id || !type) throw new Error('add-node requires --id and --type');
  if (!NODE_TYPES.has(type)) throw new Error(`unknown node type: ${type}`);
  const existing = g.nodes.find(n => n.id === id);
  const node = { id, type, ref: ref || null, meta: meta ? JSON.parse(meta) : undefined };
  if (existing) Object.assign(existing, node);
  else g.nodes.push(node);
  return node;
}

function addEdge(g, { from, to, type, meta }) {
  if (!from || !to || !type) throw new Error('add-edge requires --from --to --type');
  if (!EDGE_TYPES.has(type)) throw new Error(`unknown edge type: ${type}`);
  const dup = g.edges.find(e => e.from === from && e.to === to && e.type === type);
  if (dup) { if (meta) dup.meta = JSON.parse(meta); return dup; }
  const edge = { from, to, type, meta: meta ? JSON.parse(meta) : undefined };
  g.edges.push(edge);
  return edge;
}

function neighbors(g, id) {
  return {
    out: g.edges.filter(e => e.from === id),
    in: g.edges.filter(e => e.to === id),
  };
}

function impact(g, id) {
  const seen = new Set([id]);
  const stack = [id];
  while (stack.length) {
    const cur = stack.pop();
    for (const e of g.edges) if (e.from === cur && !seen.has(e.to)) { seen.add(e.to); stack.push(e.to); }
  }
  seen.delete(id);
  return [...seen];
}

function orphans(g) {
  const hasOut = new Set(g.edges.map(e => e.from));
  const hasIn = new Set(g.edges.map(e => e.to));
  const reqNoTest = g.nodes.filter(n => n.type === 'Requirement' &&
    !g.edges.some(e => e.from === n.id && e.type === 'tests'));
  const codeNoReq = g.nodes.filter(n => n.type === 'CodeSymbol' && !hasIn.has(n.id));
  const isolated = g.nodes.filter(n => !hasOut.has(n.id) && !hasIn.has(n.id));
  return { requirements_without_tests: reqNoTest.map(n => n.id), code_without_requirement: codeNoReq.map(n => n.id), isolated: isolated.map(n => n.id) };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const graphPath = args.graph || process.env.TRACEABILITY_GRAPH || 'output/traceability/graph.json';
  const cmd = args._[0];
  const g = load(graphPath);
  let result;
  switch (cmd) {
    case 'add-node': result = addNode(g, args); save(graphPath, g); break;
    case 'add-edge': result = addEdge(g, args); save(graphPath, g); break;
    case 'query': result = neighbors(g, args.node); break;
    case 'impact': result = impact(g, args.node); break;
    case 'orphans': result = orphans(g); break;
    default:
      console.error('Commands: add-node | add-edge | query | impact | orphans (see header for flags)');
      process.exit(1);
  }
  console.log(JSON.stringify(result, null, 2));
}

if (require.main === module) main();
module.exports = { load, save, addNode, addEdge, neighbors, impact, orphans };

import { readFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { join, resolve } from 'node:path';

const websiteRoot = process.cwd();
const workspaceRoot = resolve(websiteRoot, '..');
const baselinePath = process.env.RELGEO_INTEGRATION_BASELINE ?? join(workspaceRoot, 'docs/integration-baseline.json');
const workflowPath = process.env.RELGEO_PAGES_WORKFLOW ?? join(websiteRoot, '.github/workflows/pages.yml');
const shouldWrite = process.argv.includes('--write');
const strict = process.argv.includes('--strict');

function revisionAt(path) {
  return execFileSync('git', ['-C', path, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
}

function workflowPin(workflow, checkoutName) {
  const match = workflow.match(new RegExp(`name: Checkout ${checkoutName}[\\s\\S]*?ref:\\s*([0-9a-f]{40})`));
  return match?.[1] ?? null;
}

const baseline = JSON.parse(await readFile(baselinePath, 'utf8'));
const workflow = await readFile(workflowPath, 'utf8');
const baselineByPath = new Map((baseline.submodules ?? []).map((entry) => [entry.path, entry.revision]));
const observed = {
  website: revisionAt(websiteRoot),
  playground: revisionAt(process.env.RELGEO_PLAYGROUND_ROOT ?? join(workspaceRoot, 'playground')),
  spec: revisionAt(process.env.RELGEO_SPEC_ROOT ?? join(workspaceRoot, 'spec')),
};
const workflowPins = {
  playground: workflowPin(workflow, 'playground'),
  spec: workflowPin(workflow, 'spec'),
};

const comparisons = [
  {
    path: 'relgeo.github.io',
    observed: observed.website,
    baseline: baselineByPath.get('relgeo.github.io') ?? null,
    workflow: null,
  },
  {
    path: 'playground',
    observed: observed.playground,
    baseline: baselineByPath.get('playground') ?? null,
    workflow: workflowPins.playground,
  },
  {
    path: 'spec',
    observed: observed.spec,
    baseline: baselineByPath.get('spec') ?? null,
    workflow: workflowPins.spec,
  },
];

const mismatches = comparisons.flatMap((entry) => {
  const issues = [];
  if (entry.baseline && entry.observed !== entry.baseline) {
    issues.push(`${entry.path}: working-tree revision ${entry.observed} differs from baseline ${entry.baseline}`);
  }
  if (entry.workflow && entry.observed !== entry.workflow) {
    issues.push(`${entry.path}: working-tree revision ${entry.observed} differs from Pages pin ${entry.workflow}`);
  }
  if (entry.baseline && entry.workflow && entry.baseline !== entry.workflow) {
    issues.push(`${entry.path}: integration baseline ${entry.baseline} differs from Pages pin ${entry.workflow}`);
  }
  return issues;
});

const report = {
  schemaVersion: 1,
  synchronized: mismatches.length === 0,
  baselinePath: 'docs/integration-baseline.json',
  workflowPath: '.github/workflows/pages.yml',
  revisions: comparisons,
  mismatches,
};

if (shouldWrite) {
  await writeFile(join(websiteRoot, 'dist/relgeo-provenance.json'), `${JSON.stringify(report, null, 2)}\n`);
}

console.log(JSON.stringify(report, null, 2));
if (strict && mismatches.length > 0) process.exitCode = 1;

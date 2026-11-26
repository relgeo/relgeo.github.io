import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { join, resolve } from 'node:path';

const websiteRoot = process.cwd();
const workspaceRoot = resolve(websiteRoot, '..');
const baselinePath = process.env.RELGEO_INTEGRATION_BASELINE ?? join(workspaceRoot, 'docs/integration-baseline.json');
const workflowPath = process.env.RELGEO_PAGES_WORKFLOW ?? join(websiteRoot, '.github/workflows/pages.yml');
const shouldWrite = process.argv.includes('--write');
const strict = process.argv.includes('--strict');
const pagesMode = process.argv.includes('--pages');

function revisionAt(path, environmentVariable) {
  const providedRevision = process.env[environmentVariable];
  if (providedRevision) return providedRevision;
  return execFileSync('git', ['-C', path, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
}

function workflowPin(workflow, checkoutName) {
  const match = workflow.match(new RegExp(`name: Checkout ${checkoutName}[\\s\\S]*?ref:\\s*([0-9a-f]{40})`));
  return match?.[1] ?? null;
}

const workflow = await readFile(workflowPath, 'utf8');
const baseline = pagesMode ? null : JSON.parse(await readFile(baselinePath, 'utf8'));
const baselineByPath = new Map((baseline?.submodules ?? []).map((entry) => [entry.path, entry.revision]));
const observed = {
  website: revisionAt(websiteRoot, 'RELGEO_WEBSITE_REVISION'),
  playground: revisionAt(process.env.RELGEO_PLAYGROUND_ROOT ?? join(workspaceRoot, 'playground'), 'RELGEO_PLAYGROUND_REVISION'),
  spec: revisionAt(process.env.RELGEO_SPEC_ROOT ?? join(workspaceRoot, 'spec'), 'RELGEO_SPEC_REVISION'),
};
const workflowPins = {
  playground: workflowPin(workflow, 'playground'),
  spec: workflowPin(workflow, 'spec'),
};
const deployment = {
  siteUrl: process.env.RELGEO_DOCS_SITE_URL ?? 'http://localhost:4321',
  basePath: process.env.RELGEO_DOCS_BASE ?? '/',
  environment: process.env.RELGEO_DOCS_REQUIRE_PUBLIC_URL === '1' ? 'pages-public' : 'local-or-unverified',
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
  if (!/^[0-9a-f]{40}$/.test(entry.observed)) {
    issues.push(`${entry.path}: working-tree revision is missing or invalid`);
  }
  if (!pagesMode && entry.baseline && entry.observed !== entry.baseline) {
    issues.push(`${entry.path}: working-tree revision ${entry.observed} differs from baseline ${entry.baseline}`);
  }
  if (!pagesMode && entry.workflow && entry.observed !== entry.workflow) {
    issues.push(`${entry.path}: working-tree revision ${entry.observed} differs from Pages pin ${entry.workflow}`);
  }
  if (!pagesMode && entry.baseline && entry.workflow && entry.baseline !== entry.workflow) {
    issues.push(`${entry.path}: integration baseline ${entry.baseline} differs from Pages pin ${entry.workflow}`);
  }
  if (pagesMode && ['playground', 'spec'].includes(entry.path)) {
    if (!entry.workflow) {
      issues.push(`${entry.path}: Pages workflow pin is missing`);
    } else if (entry.observed !== entry.workflow) {
      issues.push(`${entry.path}: checked-out revision ${entry.observed} differs from Pages pin ${entry.workflow}`);
    }
  }
  return issues;
});

const report = {
  schemaVersion: 2,
  mode: pagesMode ? 'pages-inputs' : 'workspace-baseline',
  synchronized: mismatches.length === 0,
  baselinePath: pagesMode ? null : 'docs/integration-baseline.json',
  workflowPath: '.github/workflows/pages.yml',
  deployment,
  workflowPins,
  revisions: comparisons,
  mismatches,
};

if (shouldWrite) {
  await mkdir(join(websiteRoot, 'dist'), { recursive: true });
  await writeFile(join(websiteRoot, 'dist/relgeo-provenance.json'), `${JSON.stringify(report, null, 2)}\n`);
}

console.log(JSON.stringify(report, null, 2));
if (strict && mismatches.length > 0) process.exitCode = 1;

import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = process.cwd();
const workspaceRoot = join(root, '..');

async function text(path) {
  return readFile(join(root, path), 'utf8');
}

async function json(path) {
  return JSON.parse(await text(path));
}

async function exists(path) {
  await access(join(root, path));
}

const astro = await text('astro.config.mjs');
const lock = await text('pnpm-lock.yaml');
const packageJson = JSON.parse(await text('package.json'));
assert.match(astro, /remarkPlugins:\s*\[remarkRelgeoHl,\s*remarkRelgeo\]/);
assert.match(lock, /'@relgeo\/remark-relgeo':/);
assert.match(lock, /'@relgeo\/remark-relgeo-hl':/);
assert.equal(packageJson.dependencies['@relgeo/remark-relgeo'], '^0.5.0');
assert.equal(packageJson.dependencies['@relgeo/remark-relgeo-hl'], '^0.5.0');
await exists('src/content/docs/en/markdown-surfaces.md');
await exists('src/content/docs/id/markdown-surfaces.md');

for (const locale of ['en', 'id']) {
  const page = await text(`dist/${locale}/docs/markdown-surfaces/index.html`);
  assert.match(page, /data-relgeo-kind="highlight"/, `${locale} highlight output`);
  assert.match(page, /data-relgeo-kind="preview"/, `${locale} preview output`);
  assert.match(page, /data-relgeo-fence="(?:relgeo|rg)"/, `${locale} fence metadata`);
  assert.match(page, /alt="Rendered RelGeo preview"/, `${locale} preview name`);
}

const inputProvenance = await json('dist/relgeo-provenance.json');
const playgroundProvenance = await json('dist/playground/playground-provenance.json');
assert.equal(inputProvenance.synchronized, true);
assert.deepEqual(inputProvenance.mismatches, []);
assert.equal(
  inputProvenance.revisions.find((entry) => entry.path === 'playground')?.observed,
  playgroundProvenance.sourceRevision,
);
assert.equal(inputProvenance.workflowPins.playground, playgroundProvenance.sourceRevision);
await exists('dist/playground/index.html');
execFileSync(process.execPath, ['scripts/assert-pages-artifact.mjs'], {
  cwd: root,
  stdio: 'pipe',
});

const websiteMatrix = await readFile(
  join(workspaceRoot, 'docs/capability-map/website-pages/status-matrix.md'),
  'utf8',
);
const websiteAudit = await readFile(
  join(workspaceRoot, 'docs/capability-map/website-pages/implementation-audit.md'),
  'utf8',
);
const markdownMatrix = await readFile(
  join(workspaceRoot, 'docs/capability-map/markdown-surfaces/status-matrix.md'),
  'utf8',
);
assert.match(websiteAudit, /Fresh consumer verification — 2026-11-13/);
assert.match(websiteMatrix, /WEB-PAGE-007[^\n]*fresh pinned Playground\/Website\/Markdown consumer checks pass/);
assert.match(websiteMatrix, /WEB-PAGE-012[^\n]*fresh strict Pages provenance and assembled artifact assertions pass/);
assert.match(markdownMatrix, /MD-WEB-001[^\n]*✔️[^\n]*verified-local/);
assert.match(markdownMatrix, /MD-WEB-002[^\n]*✔️[^\n]*verified-local/);
assert.match(markdownMatrix, /MD-WEB-003[^\n]*✔️[^\n]*verified-local/);

console.log(
  'PASS markdown-consumer-v2 ' +
    'plugins=remark-relgeo-hl>remark-relgeo ' +
    'locales=en,id highlight=2 preview=2 ' +
    'provenance=synchronized pagesArtifact=present ' +
    'officialPagesAssertion=executed fixtures=source+generated ' +
    'statusRows=WEB-PAGE-007,WEB-PAGE-012,MD-WEB-001..003 ' +
    'scope=local hostedDeployment=external-unverified',
);

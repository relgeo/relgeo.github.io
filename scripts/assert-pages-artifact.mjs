import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { access, readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');

async function assertFile(relativePath) {
  const absolutePath = join(dist, relativePath);
  await access(absolutePath);
  return absolutePath;
}

async function listFiles(directory, extension) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFiles(entryPath, extension)));
    } else if (entry.isFile() && entry.name.endsWith(extension)) {
      files.push(entryPath);
    }
  }

  return files;
}

for (const page of [
  'index.html',
  'en/index.html',
  'id/index.html',
  'en/docs/index.html',
  'id/docs/index.html',
  'en/docs/language-spec/index.html',
  'id/docs/language-spec/index.html',
  'playground/index.html',
]) {
  await assertFile(page);
}

const playgroundHtml = await readFile(join(dist, 'playground/index.html'), 'utf8');
assert.match(playgroundHtml, /<title>RelGeo Playground<\/title>/, 'playground title');
assert.match(playgroundHtml, /<script[^>]+type="module"[^>]+src=/, 'playground entry script');

const localReferences = [...playgroundHtml.matchAll(/(?:src|href)="(\/playground\/[^"#?]+)"/g)]
  .map(([, reference]) => reference.replace(/^\/playground\//, 'playground/'));

for (const reference of localReferences) {
  await assertFile(reference);
}

const playgroundProvenance = JSON.parse(
  await readFile(join(dist, 'playground/playground-provenance.json'), 'utf8'),
);
assert.equal(playgroundProvenance.schemaVersion, 1, 'playground provenance schema');
assert.equal(playgroundProvenance.artifact, 'relgeo-playground', 'playground provenance artifact');
assert.equal(playgroundProvenance.sourcePath, 'playground', 'playground provenance source');
assert.match(playgroundProvenance.sourceRevision, /^[0-9a-f]{40}$/, 'playground source revision');
assert.equal(playgroundProvenance.entrypoint, 'index.html', 'playground provenance entrypoint');
assert.ok(Object.keys(playgroundProvenance.assetDigests ?? {}).length > 0, 'playground asset digests');

for (const [asset, expectedDigest] of Object.entries(playgroundProvenance.assetDigests)) {
  const assetPath = await assertFile(`playground/${asset}`);
  const actualDigest = createHash('sha256').update(await readFile(assetPath)).digest('hex');
  assert.equal(actualDigest, expectedDigest, `playground asset digest: ${asset}`);
}

assert.match(playgroundProvenance.sourceRevision, /^[0-9a-f]{40}$/, 'traceable Playground child revision');
assert.ok(Object.keys(playgroundProvenance.fileDigests ?? {}).length > 0, 'playground file digests');

for (const [file, expectedDigest] of Object.entries(playgroundProvenance.fileDigests)) {
  const filePath = await assertFile(`playground/${file}`);
  const actualDigest = createHash('sha256').update(await readFile(filePath)).digest('hex');
  assert.equal(actualDigest, expectedDigest, `playground file digest: ${file}`);
}

const inputProvenance = JSON.parse(await readFile(join(dist, 'relgeo-provenance.json'), 'utf8'));
assert.equal(inputProvenance.schemaVersion, 2, 'input provenance schema');
assert.equal(inputProvenance.mode, 'pages-inputs', 'input provenance mode');
assert.equal(inputProvenance.synchronized, true, 'Pages inputs must be synchronized');
assert.deepEqual(inputProvenance.mismatches, [], 'Pages input provenance mismatches');
assert.equal(inputProvenance.revisions?.find((entry) => entry.path === 'playground')?.observed, playgroundProvenance.sourceRevision, 'input and artifact Playground revisions');
assert.equal(inputProvenance.workflowPins?.playground, playgroundProvenance.sourceRevision, 'artifact and Pages Playground pin');

const playgroundScriptPaths = [
  ...(await listFiles(join(dist, 'playground'), '.js')),
  ...(await listFiles(join(dist, 'playground'), '.mjs')),
];
const playgroundStylePaths = await listFiles(join(dist, 'playground'), '.css');
assert.ok(playgroundScriptPaths.length > 0, 'playground runtime scripts');
const playgroundScripts = await Promise.all(playgroundScriptPaths.map((path) => readFile(path, 'utf8')));
const playgroundStyles = await Promise.all(playgroundStylePaths.map((path) => readFile(path, 'utf8')));
const playgroundBundle = [...playgroundScripts, ...playgroundStyles].join('\n');
assert.match(playgroundBundle, /RelGeo DSL source editor/, 'playground editor accessibility label');
assert.match(playgroundBundle, /READY/, 'playground ready state');
assert.match(playgroundBundle, /prefers-color-scheme/, 'playground system theme contract');
assert.match(playgroundBundle, /Errors/, 'playground errors inspector tab');
assert.match(playgroundBundle, /Points are not aligned/, 'playground runtime diagnostic message');

await assertFile('favicon.svg');
await assertFile('apple-touch-icon.png');
await assertFile('sitemap.xml');

const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8');
assert.match(sitemap, /<urlset/i, 'sitemap root');
assert.doesNotMatch(sitemap, /https:\/\/example\.com\/?/, 'sitemap placeholder URL');
assert.match(sitemap, /https:\/\/relgeo\.github\.io\/en\//, 'sitemap English route');
assert.match(sitemap, /https:\/\/relgeo\.github\.io\/id\//, 'sitemap Indonesian route');
assert.match(sitemap, /\/en\//, 'sitemap English route');
assert.match(sitemap, /\/id\//, 'sitemap Indonesian route');
console.log(`Pages artifact assertions passed (${localReferences.length} playground assets checked).`);

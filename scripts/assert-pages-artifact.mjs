import assert from 'node:assert/strict';
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
assert.match(playgroundHtml, /<script[^>]+type="module"[^>]+src=/, 'playground entry script');

const localReferences = [...playgroundHtml.matchAll(/(?:src|href)="(\/playground\/[^"#?]+)"/g)]
  .map(([, reference]) => reference.replace(/^\/playground\//, 'playground/'));

for (const reference of localReferences) {
  await assertFile(reference);
}

const playgroundScriptPaths = [
  ...(await listFiles(join(dist, 'playground'), '.js')),
  ...(await listFiles(join(dist, 'playground'), '.mjs')),
];
assert.ok(playgroundScriptPaths.length > 0, 'playground runtime scripts');
const playgroundScripts = await Promise.all(playgroundScriptPaths.map((path) => readFile(path, 'utf8')));
const playgroundBundle = playgroundScripts.join('\n');
assert.match(playgroundBundle, /RelGeo DSL source editor/, 'playground editor accessibility label');
assert.match(playgroundBundle, /READY/, 'playground ready state');
assert.match(playgroundBundle, /Errors/, 'playground errors inspector tab');
assert.match(playgroundBundle, /Points are not aligned/, 'playground runtime diagnostic message');

await assertFile('favicon.svg');
await assertFile('apple-touch-icon.png');
await assertFile('sitemap.xml');

const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8');
assert.match(sitemap, /<urlset/i, 'sitemap root');
assert.match(sitemap, /\/en\//, 'sitemap English route');
assert.match(sitemap, /\/id\//, 'sitemap Indonesian route');
console.log(`Pages artifact assertions passed (${localReferences.length} playground assets checked).`);

import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');

async function assertFile(relativePath) {
  const absolutePath = join(dist, relativePath);
  await access(absolutePath);
  return absolutePath;
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

await assertFile('favicon.svg');
await assertFile('apple-touch-icon.png');
await assertFile('sitemap.xml');

const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8');
assert.match(sitemap, /<urlset/i, 'sitemap root');
assert.match(sitemap, /\/en\//, 'sitemap English route');
assert.match(sitemap, /\/id\//, 'sitemap Indonesian route');
console.log(`Pages artifact assertions passed (${localReferences.length} playground assets checked).`);

import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');

async function readPage(path) {
  try {
    return await readFile(join(dist, path), 'utf8');
  } catch (error) {
    throw new Error(
      `Missing built page ${path}. Run the docs-site build before running this test.`,
      { cause: error }
    );
  }
}

function count(source, fragment) {
  return source.split(fragment).length - 1;
}

function assertCommonMetadata(html, path, lang) {
  assert.match(html, /<meta name="description" content="[^"]+"/i, `${path}: description`);
  assert.match(html, /<meta property="og:type" content="website"/i, `${path}: og:type`);
  assert.match(html, /<meta name="twitter:card" content="summary"/i, `${path}: twitter card`);
  assert.match(html, new RegExp(`<meta property="og:locale" content="${lang === 'id' ? 'id_ID' : 'en_US'}"`), `${path}: locale`);
}

function assertMarkdownSurface(html, path) {
  assert.equal(count(html, 'data-relgeo-kind="highlight"'), 1, `${path}: one rg surface`);
  assert.equal(count(html, 'data-relgeo-fence="rg"'), 1, `${path}: rg fence marker`);
  assert.match(html, /class="language-rg relgeo-hl__code"/, `${path}: rg code element`);
  assert.match(html, /relgeo-hl__token--/, `${path}: semantic tokens`);

  assert.equal(count(html, 'data-relgeo-kind="preview"'), 1, `${path}: one relgeo surface`);
  assert.equal(count(html, 'data-relgeo-fence="relgeo"'), 1, `${path}: relgeo fence marker`);
  assert.match(html, /class="relgeo-preview__canvas"/, `${path}: preview canvas`);
  assert.match(html, /class="relgeo-preview__image"/, `${path}: preview image`);
  assert.doesNotMatch(html, /language-relgeo|relgeo-preview__code/, `${path}: preview must not expose source code`);
}

function assertGettingStarted(html, path, lang) {
  assertCommonMetadata(html, path, lang);
  assert.match(html, /pnpm --dir \.\.\/playground dev/, `${path}: Playground launch command`);
  assert.match(html, /status.*READY|READY.*status/i, `${path}: ready-state onboarding`);
  assert.match(html, /Inspector/, `${path}: inspection onboarding`);
  assert.match(html, /data-relgeo-kind="highlight"/, `${path}: rg onboarding surface`);
  assert.match(html, /data-relgeo-kind="preview"/, `${path}: relgeo onboarding surface`);
  assert.match(html, /playground/i, `${path}: Playground route`);
}

function assertActiveNav(html, path, href) {
  assert.ok(html.includes(`<a href="${href}" aria-current="page">`), `${path}: active navigation for ${href}`);
}

async function listHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listHtmlFiles(entryPath)));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(entryPath);
    }
  }

  return files;
}

for (const lang of ['id', 'en']) {
  const landingPath = `${lang}/index.html`;
  const landing = await readPage(landingPath);
  assertCommonMetadata(landing, landingPath, lang);
  assert.match(landing, /src="\/images\/relgeo-hero-v2\.png"/, `${landingPath}: static hero artwork`);
  assert.doesNotMatch(landing, /data-landing-story-viewer|data-steps=|landing-source-code/, `${landingPath}: landing must not embed interactive demo`);

  const markdownPath = `${lang}/docs/markdown-surfaces/index.html`;
  const markdown = await readPage(markdownPath);
  assertCommonMetadata(markdown, markdownPath, lang);
  assertMarkdownSurface(markdown, markdownPath);

  const gettingStartedPath = `${lang}/docs/getting-started/index.html`;
  const gettingStarted = await readPage(gettingStartedPath);
  assertGettingStarted(gettingStarted, gettingStartedPath, lang);
}

const navigationChecks = [
  ['en/why-relgeo/index.html', '/en/why-relgeo/'],
  ['id/why-relgeo/index.html', '/id/why-relgeo/'],
  ['en/docs/index.html', '/en/docs/'],
  ['id/docs/index.html', '/id/docs/'],
  ['en/docs/language-spec/index.html', '/en/docs/language-spec/'],
  ['id/docs/language-spec/index.html', '/id/docs/language-spec/'],
  ['en/current-capabilities/index.html', '/en/current-capabilities/'],
  ['id/current-capabilities/index.html', '/id/current-capabilities/'],
];

for (const [path, href] of navigationChecks) {
  const html = await readPage(path);
  assertActiveNav(html, path, href);
}

for (const path of [
  'en/index.html',
  'id/index.html',
  'en/docs/index.html',
  'id/docs/index.html',
  'en/docs/language-spec/index.html',
  'id/docs/language-spec/index.html',
  'en/why-relgeo/index.html',
  'id/why-relgeo/index.html',
]) {
  await readPage(path);
}

const gateway = await readPage('index.html');
assert.match(gateway, /<meta name="robots" content="noindex,follow"/, 'root gateway: noindex');

for (const htmlPath of await listHtmlFiles(dist)) {
  const html = await readFile(htmlPath, 'utf8');
  assert.doesNotMatch(html, /data-relgeo-kind="preview-error"/, `${htmlPath}: preview error`);
  assert.doesNotMatch(html, /Preview unavailable\./, `${htmlPath}: unavailable preview`);
}

console.log('Docs-site built-output assertions passed.');

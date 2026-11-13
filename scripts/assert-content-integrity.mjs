import assert from 'node:assert/strict';
import { access, readdir, readFile } from 'node:fs/promises';
import { extname, join, relative, sep } from 'node:path';

const websiteRoot = process.cwd();
const contentRoot = join(websiteRoot, 'src', 'content');
const distRoot = join(websiteRoot, 'dist');

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

function contentKey(filePath, basePath) {
  return relative(basePath, filePath)
    .split(sep).join('/')
    .replace(/\.(md|mdx)$/i, '')
    .replace(/(^|\/)index$/i, '$1__index__')
    .toLowerCase();
}

function localeFromKey(key) {
  const [locale] = key.split('/');
  assert.ok(locale === 'id' || locale === 'en', `content entry must start with id/ or en/: ${key}`);
  return locale;
}

function bodyAndFrontmatter(source, filePath) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  assert.ok(match, `${filePath}: frontmatter delimiters are required`);
  const [, frontmatter, body] = match;
  assert.match(frontmatter, /^title:\s*\S.+$/m, `${filePath}: non-empty title is required`);
  assert.match(frontmatter, /^description:\s*\S.+$/m, `${filePath}: non-empty description is required`);
  assert.ok(body.trim().length > 0, `${filePath}: content body must not be empty`);
  return body;
}

function routeCandidates(pathname) {
  const cleanPath = pathname.split(/[?#]/, 1)[0];
  const normalized = cleanPath.replace(/^\/+/, '').replace(/\/+$/, '');
  if (!normalized) return ['index.html'];
  if (extname(normalized)) return [normalized];
  return [`${normalized}/index.html`, `${normalized}.html`];
}

async function assertRouteExists(pathname, sourcePath) {
  if (pathname === '/playground/' || pathname.startsWith('/playground/')) return;

  for (const candidate of routeCandidates(pathname)) {
    try {
      await access(join(distRoot, candidate));
      return;
    } catch {
      // Try the next generated-route shape.
    }
  }

  throw new Error(`${sourcePath}: internal route does not exist in dist: ${pathname}`);
}

async function assertCollection(collection) {
  const collectionRoot = join(contentRoot, collection);
  const files = await listFiles(collectionRoot, '.md');
  const entries = new Map();

  for (const filePath of files) {
    const key = contentKey(filePath, collectionRoot);
    const source = await readFile(filePath, 'utf8');
    const body = bodyAndFrontmatter(source, filePath);
    const locale = localeFromKey(key);
    const localizedKey = key.slice(locale.length + 1);
    assert.ok(!entries.has(`${locale}/${localizedKey}`), `${collection}: duplicate entry ${key}`);
    const slug = localizedKey.replace(/\/__index__$/i, '').replace(/^__index__$/, '');
    const route = collection === 'docs'
      ? `/${locale}/docs/${slug ? `${slug}/` : ''}`
      : `/${locale}/${slug ? `${slug}/` : ''}`;
    entries.set(`${locale}/${localizedKey}`, { filePath, body, route });
    await assertRouteExists(route, filePath);

    const internalLinks = [...body.matchAll(/\]\((\/[^)\s]+)(?:#[^)\s]*)?\)/g)].map(([, href]) => href);
    for (const href of internalLinks) await assertRouteExists(href, filePath);
  }

  const locales = ['id', 'en'].map((locale) => new Set(
    [...entries.keys()]
      .filter((key) => key.startsWith(`${locale}/`))
      .map((key) => key.slice(locale.length + 1)),
  ));
  assert.deepEqual([...locales[0]].sort(), [...locales[1]].sort(), `${collection}: id/en entry parity`);
  return entries;
}

const docsEntries = await assertCollection('docs');
await assertCollection('site');

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

for (const locale of ['id', 'en']) {
  const index = await readFile(join(distRoot, locale, 'docs', 'index.html'), 'utf8');
  for (const [key, entry] of docsEntries) {
    if (!key.startsWith(`${locale}/`)) continue;
    assert.match(
      index,
      new RegExp(`href="${escapeRegExp(entry.route)}"`),
      `docs index ${locale}: content entry is included in wayfinding (${entry.route})`
    );
  }
}

const englishLanguageStatus = await readFile(join(contentRoot, 'docs', 'en', 'language-status.md'), 'utf8');
assert.match(englishLanguageStatus, /editorial mirror/i, 'English language status must preserve mirror disclosure');
assert.match(englishLanguageStatus, /not a completed English\s+translation/i, 'English language status must reject translation parity claims');

console.log('Content integrity assertions passed (locale parity, frontmatter, generated routes, internal links, and docs-index coverage).');

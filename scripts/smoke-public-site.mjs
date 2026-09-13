import assert from 'node:assert/strict';

const siteUrl = (process.env.RELGEO_PUBLIC_SITE_URL ?? '').replace(/\/+$/, '');
assert(siteUrl, 'RELGEO_PUBLIC_SITE_URL is required');

const routes = [
  '/',
  '/en/',
  '/id/',
  '/en/why-relgeo/',
  '/id/why-relgeo/',
  '/en/docs/',
  '/id/docs/',
  '/en/docs/language-spec/',
  '/id/docs/language-spec/',
  '/playground/',
  '/sitemap.xml',
  '/favicon.svg',
  '/apple-touch-icon.png',
];

const attempts = 10;
const delayMs = 3000;

for (const route of routes) {
  let response;
  let lastError;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      response = await fetch(`${siteUrl}${route}`, { redirect: 'follow' });
      if (response.ok) break;
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }

    if (attempt < attempts) await new Promise((resolve) => setTimeout(resolve, delayMs));
  }

  assert(response?.ok, `${route} did not become available: ${lastError?.message ?? 'unknown error'}`);
  console.log(`${response.status} ${route}`);
}

console.log('Public site smoke test passed.');

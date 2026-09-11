import { getCollection } from 'astro:content';
import { entryLang, localizedDocsHref, localizedLanguageSpecHref, normalizeEntryId, stripLangPrefix } from '../lib/content';
import type { SupportedLang } from '../lib/i18n';

const langs: SupportedLang[] = ['id', 'en'];

function absolute(site: URL, path: string): string {
  return new URL(path, site).toString();
}

function urlEntry(loc: string): string {
  return `<url><loc>${loc}</loc></url>`;
}

export async function GET({ site }: { site: URL | undefined }) {
  if (!(site instanceof URL)) {
    return new Response('Missing site URL for sitemap generation.', { status: 500 });
  }

  const docsEntries = await getCollection('docsPages');
  const specEntries = await getCollection('languageSpec');

  const urls = new Set<string>();

  urls.add(absolute(site, '/id/'));
  urls.add(absolute(site, '/en/'));

  for (const entry of docsEntries) {
    const lang = entryLang(entry.id);
    if (!lang) continue;
    const normalized = stripLangPrefix(entry.id, lang);
    const path = normalized ? localizedDocsHref(entry, lang) : `/${lang}/docs/`;
    urls.add(absolute(site, path));
  }

  for (const lang of langs) {
    urls.add(absolute(site, `/${lang}/docs/language-spec/`));
    for (const entry of specEntries) {
      const normalized = normalizeEntryId(entry.id);
      if (!normalized) continue;
      urls.add(absolute(site, localizedLanguageSpecHref(entry, lang)));
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from(urls)
  .sort()
  .map((loc) => `  ${urlEntry(loc)}`)
  .join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}

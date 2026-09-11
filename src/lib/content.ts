import type { CollectionEntry } from 'astro:content';
import type { SupportedLang } from './i18n';

export type DocsEntry = CollectionEntry<'docsPages'>;
export type LanguageSpecEntry = CollectionEntry<'languageSpec'>;
export type SiteEntry = CollectionEntry<'sitePages'>;
export type LanguageSpecSectionGroup = {
  section: string;
  title: string;
  href: string;
  entry: LanguageSpecEntry | null;
  chapters: LanguageSpecEntry[];
};

export function normalizeEntryId(id: string): string {
  return id
    .replace(/(^|\/)__readme__$/i, '')
    .replace(/(^|\/)__index__$/i, '')
    .replace(/(^|\/)readme$/i, '')
    .replace(/\/+/g, '/')
    .replace(/^\/|\/$/g, '');
}

export function stripLangPrefix(id: string, lang: SupportedLang): string {
  const normalized = normalizeEntryId(id);
  if (normalized === lang) return '';
  if (normalized.startsWith(`${lang}/`)) return normalized.slice(lang.length + 1);
  return normalized;
}

export function entryLang(id: string): SupportedLang | null {
  const normalized = normalizeEntryId(id);
  const first = normalized.split('/')[0] ?? '';
  return first === 'id' || first === 'en' ? first : null;
}

export function entryTitle(
  entry: Pick<DocsEntry | LanguageSpecEntry | SiteEntry, 'id' | 'data'>,
  fallback = 'Untitled'
): string {
  if (typeof entry.data.title === 'string' && entry.data.title.trim().length > 0) {
    return entry.data.title;
  }

  const normalized = normalizeEntryId(entry.id);
  if (!normalized) return fallback;

  const last = normalized.split('/').at(-1) ?? fallback;
  return last
    .replace(/^\d+-/, '')
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function docsHref(entry: Pick<DocsEntry, 'id'>): string {
  const normalized = normalizeEntryId(entry.id);
  return normalized ? `/docs/${normalized}/` : '/docs/';
}

export function localizedDocsHref(entry: Pick<DocsEntry, 'id'>, lang: SupportedLang): string {
  const normalized = stripLangPrefix(entry.id, lang);
  return normalized ? `/${lang}/docs/${normalized}/` : `/${lang}/docs/`;
}

export function languageSpecHref(entry: Pick<LanguageSpecEntry, 'id'>): string {
  const normalized = normalizeEntryId(entry.id);
  return normalized ? `/docs/language-spec/${normalized}/` : '/docs/language-spec/';
}

export function localizedLanguageSpecHref(
  entry: Pick<LanguageSpecEntry, 'id'>,
  lang: SupportedLang
): string {
  const normalized = normalizeEntryId(entry.id);
  return normalized ? `/${lang}/docs/language-spec/${normalized}/` : `/${lang}/docs/language-spec/`;
}

export function languageSpecSection(entry: Pick<LanguageSpecEntry, 'id'>): string {
  const normalized = normalizeEntryId(entry.id);
  return normalized.split('/')[0] ?? '';
}

function chapterOrderValue(entry: Pick<LanguageSpecEntry, 'id'>): number {
  const normalized = normalizeEntryId(entry.id);
  const last = normalized.split('/').at(-1) ?? '';
  const match = last.match(/^(\d+)-/);
  return match ? Number(match[1]) : Number.MAX_SAFE_INTEGER;
}

export function sortLanguageSpecEntries(entries: LanguageSpecEntry[]): LanguageSpecEntry[] {
  return [...entries].sort((a, b) => {
    const sectionCompare = languageSpecSection(a).localeCompare(languageSpecSection(b));
    if (sectionCompare !== 0) return sectionCompare;

    const aDepth = normalizeEntryId(a.id).split('/').length;
    const bDepth = normalizeEntryId(b.id).split('/').length;
    if (aDepth !== bDepth) return aDepth - bDepth;

    const chapterCompare = chapterOrderValue(a) - chapterOrderValue(b);
    if (chapterCompare !== 0) return chapterCompare;

    return languageSpecHref(a).localeCompare(languageSpecHref(b));
  });
}

export function groupLanguageSpecEntries(entries: LanguageSpecEntry[]): LanguageSpecSectionGroup[] {
  const sorted = sortLanguageSpecEntries(entries);
  const map = new Map<string, LanguageSpecSectionGroup>();

  for (const entry of sorted) {
    const normalized = normalizeEntryId(entry.id);
    if (!normalized) continue;

    const parts = normalized.split('/');
    const section = parts[0] ?? '';
    const isSectionIndex = parts.length === 1;
    const group = map.get(section) ?? {
      section,
      title: entryTitle(entry, section),
      href: languageSpecHref(entry),
      entry: null,
      chapters: [],
    };

    if (isSectionIndex) {
      group.title = entryTitle(entry, section);
      group.href = languageSpecHref(entry);
      group.entry = entry;
    } else {
      group.chapters.push(entry);
    }

    map.set(section, group);
  }

  return Array.from(map.values()).sort((a, b) => a.href.localeCompare(b.href));
}

export const SUPPORTED_LANGS = ['id', 'en'] as const;

export type SupportedLang = (typeof SUPPORTED_LANGS)[number];

export function isSupportedLang(value: string | undefined): value is SupportedLang {
  return value === 'id' || value === 'en';
}

export function localizedPath(lang: SupportedLang, path = ''): string {
  const normalized = path.replace(/^\/+|\/+$/g, '');
  return normalized ? `/${lang}/${normalized}/` : `/${lang}/`;
}

export function oppositeLang(lang: SupportedLang): SupportedLang {
  return lang === 'id' ? 'en' : 'id';
}

export type CopyGroup = {
  [K in SupportedLang]: string;
};

export function copy(group: CopyGroup, lang: SupportedLang): string {
  return group[lang];
}

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

export const uiCopy = {
  backToDocsIndex: { id: 'Kembali ke docs index', en: 'Back to docs index' },
  backToSpecIndex: { id: 'Kembali ke index', en: 'Back to index' },
  currentSection: { id: 'Section aktif', en: 'Current Section' },
  docsNavigation: { id: 'Navigasi docs', en: 'Docs Navigation' },
  languageSpec: { id: 'Language Spec', en: 'Language Spec' },
  activeLanguageSpec: { id: 'Language Spec aktif', en: 'Active Language Spec' },
  nextReading: { id: 'Bacaan berikutnya', en: 'Next Reading' },
  openGettingStarted: { id: 'Buka Getting Started', en: 'Open Getting Started' },
  openLanguageSpec: { id: 'Buka Language Spec', en: 'Open Language Spec' },
  pages: { id: 'Halaman', en: 'Pages' },
  related: { id: 'Terkait', en: 'Related' },
  readInThisOrder: { id: 'Baca dalam urutan ini', en: 'Read in this order' },
  gettingStarted: { id: 'Getting started', en: 'Getting started' },
  currentCapabilities: { id: 'Kapabilitas saat ini', en: 'Current Capabilities' },
  cliOrPlayground: { id: 'CLI atau Playground', en: 'CLI or Playground' },
  markdownSurfaces: { id: 'Surface Markdown', en: 'Markdown Surfaces' },
  activeLanguageSpecLower: { id: 'Language spec aktif', en: 'Active language spec' },
  navCapabilities: { id: 'Kapabilitas', en: 'Capabilities' },
  navDocs: { id: 'Dokumentasi', en: 'Docs' },
  navHome: { id: 'Beranda', en: 'Home' },
  navLanguageSpec: { id: 'Spesifikasi bahasa', en: 'Language Spec' },
  navPlayground: { id: 'Playground', en: 'Playground' },
  navUseCases: { id: 'Contoh penggunaan', en: 'Use Cases' },
  navWhyRelGeo: { id: 'Mengapa RelGeo', en: 'Why RelGeo' },
} satisfies Record<string, CopyGroup>;

export function copy(group: CopyGroup, lang: SupportedLang): string {
  return group[lang];
}

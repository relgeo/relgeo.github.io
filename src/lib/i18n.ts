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
  backToDocsIndex: { id: 'Kembali ke indeks docs', en: 'Back to docs index' },
  backToSpecIndex: { id: 'Kembali ke indeks spec', en: 'Back to spec index' },
  currentSection: { id: 'Bagian aktif', en: 'Current Section' },
  documentation: { id: 'Dokumentasi', en: 'Documentation' },
  documentationLayer: { id: 'Lapisan dokumentasi', en: 'Documentation Layer' },
  docsNavigation: { id: 'Navigasi docs', en: 'Docs Navigation' },
  docsPages: { id: 'Halaman docs', en: 'Docs pages' },
  languageSpec: { id: 'Spesifikasi bahasa', en: 'Language Spec' },
  activeLanguageSpec: { id: 'Spesifikasi bahasa aktif', en: 'Active Language Spec' },
  normativeSource: { id: 'Sumber normatif', en: 'Normative Source' },
  nextReading: { id: 'Bacaan berikutnya', en: 'Next Reading' },
  openGettingStarted: { id: 'Buka Getting Started', en: 'Open Getting Started' },
  openLanguageSpec: { id: 'Buka spesifikasi bahasa', en: 'Open Language Spec' },
  pages: { id: 'Halaman', en: 'Pages' },
  related: { id: 'Terkait', en: 'Related' },
  readInThisOrder: { id: 'Baca dalam urutan ini', en: 'Read in this order' },
  gettingStarted: { id: 'Mulai', en: 'Getting started' },
  currentCapabilities: { id: 'Kapabilitas saat ini', en: 'Current Capabilities' },
  cliOrPlayground: { id: 'CLI atau Playground', en: 'CLI or Playground' },
  markdownSurfaces: { id: 'Surface Markdown', en: 'Markdown Surfaces' },
  activeLanguageSpecLower: { id: 'Spesifikasi bahasa aktif', en: 'Active language spec' },
  languageStatus: { id: 'Status bahasa', en: 'Language Status' },
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

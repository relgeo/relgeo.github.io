import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const languageSpecBase = process.env.RELGEO_SPEC_PATH ?? '../spec/id';

function createStableContentId(entry: string): string {
  return entry
    .replace(/\\/g, '/')
    .replace(/(^|\/)README\.(md|mdx)$/i, '$1__readme__.md')
    .replace(/(^|\/)index\.(md|mdx)$/i, '$1__index__.md')
    .replace(/\.(md|mdx)$/i, '')
    .toLowerCase();
}

const sitePages = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/site',
    generateId: ({ entry }) => createStableContentId(entry),
  }),
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
});

const docsPages = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/docs',
    generateId: ({ entry }) => createStableContentId(entry),
  }),
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
});

const languageSpec = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: languageSpecBase,
    generateId: ({ entry }) => createStableContentId(entry),
  }),
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const collections = {
  sitePages,
  docsPages,
  languageSpec,
};

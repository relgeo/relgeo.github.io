import { defineConfig } from 'astro/config';
import remarkRelgeo from '@relgeo/remark-relgeo';
import remarkRelgeoHl from '@relgeo/remark-relgeo-hl';

const site = process.env.RELGEO_DOCS_SITE_URL ?? 'https://example.com';
const base = process.env.RELGEO_DOCS_BASE ?? '/';

function getClassNames(node) {
  const value = node?.properties?.className;
  return Array.isArray(value) ? value : [];
}

function shouldUnwrapPreview(node) {
  if (node?.type !== 'element' || node.tagName !== 'pre') return false;
  if (!Array.isArray(node.children) || node.children.length !== 1) return false;

  const [child] = node.children;
  if (child?.type !== 'element') return false;

  const classNames = getClassNames(child);
  return classNames.includes('relgeo-preview') || classNames.includes('relgeo-hl');
}

function unwrapCustomCodeBlocks() {
  function walk(node) {
    if (!node || !Array.isArray(node.children)) return;

    node.children = node.children.map((child) => {
      walk(child);
      return shouldUnwrapPreview(child) ? child.children[0] : child;
    });
  }

  return (tree) => {
    walk(tree);
  };
}

export default defineConfig({
  site,
  base,
  markdown: {
    syntaxHighlight: false,
    remarkPlugins: [remarkRelgeoHl, remarkRelgeo],
    rehypePlugins: [unwrapCustomCodeBlocks],
  },
});

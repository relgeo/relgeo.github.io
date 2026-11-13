import { defineConfig } from 'astro/config';
import remarkRelgeo from '@relgeo/remark-relgeo';
import remarkRelgeoHl from '@relgeo/remark-relgeo-hl';

const site = process.env.RELGEO_DOCS_SITE_URL ?? 'https://relgeo.github.io';
const base = process.env.RELGEO_DOCS_BASE ?? '/';
const requirePublicSiteUrl = process.env.RELGEO_DOCS_REQUIRE_PUBLIC_URL === '1';

if (requirePublicSiteUrl) {
  const siteUrl = new URL(site);
  if (siteUrl.protocol !== 'https:' || siteUrl.hostname !== 'relgeo.github.io' || siteUrl.pathname !== '/') {
    throw new Error(
      `RELGEO_DOCS_SITE_URL must be https://relgeo.github.io/ when RELGEO_DOCS_REQUIRE_PUBLIC_URL=1; received ${site}`
    );
  }
}

function getClassNames(node) {
  const value = node?.properties?.className;
  return Array.isArray(value) ? value : [];
}

function isPreviewWrapper(node) {
  if (node?.type !== 'element' || !['div', 'figure'].includes(node.tagName)) return false;
  const classNames = getClassNames(node);
  return classNames.includes('relgeo-preview__canvas')
    || classNames.includes('relgeo-preview__placeholder');
}

function shouldUnwrapPreview(node) {
  if (node?.type !== 'element' || node.tagName !== 'pre') return false;
  if (!Array.isArray(node.children) || node.children.length !== 1) return false;

  const [child] = node.children;
  return isPreviewWrapper(child);
}

function applyPreviewAccessibility(node) {
  if (!isPreviewWrapper(node)) return;
  if (node.properties?.['data-relgeo-kind'] !== 'preview') return;

  node.tagName = 'figure';
  node.properties = {
    ...(node.properties ?? {}),
    'data-relgeo-asset-strategy': 'inline-data-uri',
    role: 'figure',
    ariaLabel: node.properties['aria-label'] ?? 'Rendered RelGeo preview',
  };
}

function unwrapCustomCodeBlocks() {
  function walk(node) {
    if (!node || !Array.isArray(node.children)) return;

    node.children = node.children.map((child) => {
      walk(child);
      if (shouldUnwrapPreview(child)) {
        applyPreviewAccessibility(child.children[0]);
        return child.children[0];
      }
      return child;
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

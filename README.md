# relgeo.github.io

Astro-based documentation site scaffold for RelGeo.

## Versioning

The package metadata version (`0.5.0`) and the active RelGeo DSL contract version (`v0.5`) are separate versioning systems. This package presents the DSL contract; the package number does not by itself announce a language-semantics change.

## Intent

This package is prepared to become:

1. the official docs site
2. the first public consumer of `remark-relgeo-hl`
3. the first public consumer of `remark-relgeo`
4. an early GitHub Pages deployment target

## Content Role

This package is the website and presentation layer.

It should not become an independent rewrite of the active language spec.

The intended direction is:

1. the website hosts documentation as one section of the broader RelGeo site
2. the language spec section loads the normative source directly
3. the current normative source is `../spec/id/` in the local staging workspace
4. the future normative source will be the separate spec repository

## Stack

1. Astro
2. GitHub Pages as initial deployment target
3. `@astrojs/markdown-remark` for the markdown processor

## Planned Markdown Contracts

1. fenced code `rg` for highlighted RelGeo source
2. fenced code `relgeo` for preview or embed

## Environment

Optional environment variables:

1. `RELGEO_DOCS_SITE_URL`
2. `RELGEO_DOCS_BASE`

These map to Astro `site` and `base` so the package can be configured later for
GitHub Pages or a custom domain.

## Local Workspace Build Flow

When this repository is mounted in the root integration workspace, the root
workspace builds its local package dependencies before building the site:

```sh
pnpm --filter relgeo-docs-site build
```

For standalone development, install the published package versions declared in
`package.json` and run `pnpm build` or `pnpm dev` from this repository.

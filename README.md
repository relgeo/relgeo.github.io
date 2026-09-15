# relgeo.github.io

Astro-based documentation site scaffold for RelGeo.

## Versioning

The site package is a private deployment application at version `0.5.0`. It presents the active RelGeo DSL `v0.5` contract; the site version does not by itself announce a language-semantics change.

## Intent

This package is now:

1. the official docs site at `https://relgeo.github.io/`
2. a public consumer of `@relgeo/remark-relgeo-hl`
3. a public consumer of `@relgeo/remark-relgeo`
4. deployed through GitHub Pages from `main`

## Content Role

This package is the website and presentation layer.

It should not become an independent rewrite of the active language spec.

The intended direction is:

1. the website hosts documentation as one section of the broader RelGeo site
2. the language spec section loads the normative source directly
3. local workspace builds use `../spec/id/`
4. GitHub Pages builds checkout `relgeo/spec` into `.ci/spec/`

## Reproducible Pages Inputs

The Pages workflow checks out the Playground and language spec at explicit commit SHAs rather than tracking moving branches. Update those pins only after the source repository has passed its own checks and the website build plus Pages artifact assertions have passed locally.

The current Playground pin is the reviewed baseline `09ac1cb2773fd9a7046b703b72c8494ade8e315b`.

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

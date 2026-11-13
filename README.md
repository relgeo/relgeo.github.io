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

The global RelGeo mark and its usage boundary are documented in
[`docs/brand/identity.md`](docs/brand/identity.md). The mark master lives at
`public/brand/relgeo-mark.png`; platform-specific outputs belong to their
consumer repositories.

The intended direction is:

1. the website hosts documentation as one section of the broader RelGeo site
2. the language spec section loads the normative source directly
3. local workspace builds use `../spec/id/`
4. GitHub Pages builds checkout `relgeo/spec` into `.ci/spec/`

## Reproducible Pages Inputs

The Pages workflow checks out the Playground and language spec at explicit commit SHAs rather than tracking moving branches. Update those pins only after the source repository has passed its own checks and the website build plus Pages artifact assertions have passed locally.

The current Playground pin is the reviewed baseline
`c7cec4b505f290beccac911ef97786c8f6b0a534`.

## Frozen public claim contract

At the current public boundary, the active language contract is DSL `0.5`
from `spec/id`. The `/en/docs/language-spec/` route family is an editorial
mirror of that Indonesian normative source, not a completed English normative
translation. The English route must keep its visible mirror disclosure and
must not imply full English semantic parity.

The deterministic docs index is the current wayfinding baseline: it provides
localized topic links, client-side filtering, a live result count, and an
explicit no-result state. It is not a claim of query/server search.

The frozen local source tuple for website/spec/Playground provenance is:

```text
website    6eb2e241b76a5f226644300f5cbe9814c342cd08
spec       b96ba3b23de202227eade06614635ef6717df516
playground c7cec4b505f290beccac911ef97786c8f6b0a534
```

Public status must keep `dslContractVersion`, package/application version,
source revision, and deployment revision as separate fields. The root
integration baseline records this selection; a lagging baseline is a provenance
failure, not permission to silently select a different revision.

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
3. `RELGEO_DOCS_REQUIRE_PUBLIC_URL`

These map to Astro `site` and `base` so the package can be configured later for
GitHub Pages or a custom domain. Local builds default to
`http://localhost:4321/` and are therefore not public-production claims. Set
`RELGEO_DOCS_SITE_URL=https://relgeo.github.io`, `RELGEO_DOCS_BASE=/`, and
`RELGEO_DOCS_REQUIRE_PUBLIC_URL=1` in the canonical Pages build to reject
placeholder/non-canonical public URLs.

The local provenance report is generated with `pnpm provenance:report` and
writes `dist/relgeo-provenance.json`. Use `pnpm provenance:check` only after an
approved Playground/spec revision set has been synchronized across the root
gitlinks, integration baseline, and Pages workflow; it intentionally fails on
known revision drift rather than selecting a revision implicitly.

The Pages workflow runs `pnpm provenance:pages` after building and assembling
the Playground. This mode compares the checked-out Playground and spec heads
with the immutable workflow pins without requiring the root workspace, writes a
`pages-inputs` provenance report into `dist/`, and fails before artifact upload
when a pin is missing or stale. `pnpm test:pages-artifact` then verifies that
report, the Playground file digests, route assets, canonical metadata, and the
deployment-configured sitemap together.

## Local Workspace Build Flow

When this repository is mounted in the root integration workspace, the root
workspace builds its local package dependencies before building the site:

```sh
pnpm --filter relgeo-docs-site build
```

For standalone development, install the published package versions declared in
`package.json` and run `pnpm build` or `pnpm dev` from this repository.

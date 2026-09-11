---
title: CLI
description: The terminal surface for validation, compilation, and lightweight shell or CI workflows.
---

The `CLI` is RelGeo's primary terminal surface.

Use this surface when you want to work from the shell without opening a browser UI.

## When The CLI Fits Best

The CLI is best for:

1. validating RelGeo documents
2. compiling source into JSON, SVG, or graph output
3. placing RelGeo inside shell workflows
4. running lightweight checks in CI

If you need interactive authoring instead, use the [Playground](/en/docs/playground/).

## Current Surface Shape

In the current active repo snapshot:

1. the package surface lives in the `relgeo/cli` repository
2. the CLI follows the active v0.5 language contract
3. the healthiest consumption path is still through this monorepo

## Core Capabilities

Practically, the CLI already includes:

1. `info` for reading document structure
2. `compile` for generating output
3. `check` or `validate` for validation without final output
4. parameter overrides
5. profile selection
6. target sheet selection for SVG export

## Example Flow

```bash
pnpm relgeo info path/to/design.yaml
pnpm relgeo compile path/to/design.yaml
pnpm relgeo compile path/to/design.yaml -f svg -o output.svg
pnpm relgeo check path/to/design.yaml
```

## Important Boundary

The CLI is not an interactive editor.

It is also not a replacement for `relgeo-core` when you want direct runtime integration in code.

Use the CLI when your need is:

1. automation
2. terminal workflow
3. compile or validate without UI

## Documentation Status

This page is the website-owned entry surface.

The documentation home that sits closer to the package now starts in the CLI repository's `docs/README.md`.

## Continue Reading

1. read [Playground](/en/docs/playground/) if you want interactive authoring
2. read [Markdown Surfaces](/en/docs/markdown-surfaces/) if you want markdown embedding
3. open the [Language Spec](/en/docs/language-spec/) when you need the active language contract

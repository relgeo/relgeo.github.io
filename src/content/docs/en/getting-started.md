---
title: Getting Started
description: First reading path for new RelGeo users.
---

RelGeo is a DSL and toolchain for relation-first declarative vector drawings.

To understand the project quickly, use this short reading order:

1. understand the product position and general philosophy
2. read [Current Capabilities](/en/docs/current-capabilities/) to see what is already real today
3. choose the usage surface closest to your need:
   [CLI](/en/docs/cli/), [Playground](/en/docs/playground/), or [Desktop App](/en/docs/desktop-app/)
4. read [Markdown Surfaces](/en/docs/markdown-surfaces/) to understand the difference between `rg` and `relgeo`
5. read [Language Status](/en/docs/language-status/) to understand the current `id` vs `en` boundary
6. open the `language-spec` when you want the active normative contract

## Try the Main Workflow

To try the primary local authoring loop, run this from the integration workspace root:

```bash
pnpm install
pnpm --dir ../playground dev
```

Then use this sequence in the Playground:

1. choose `01. Fundamentals`
2. edit the source in the editor
3. wait for `READY` after the source resolves
4. read the result in the live preview
5. open `Inspector` or `Layers` to inspect geometry and dependencies

The Playground is a local browser IDE; this repository does not claim a hosted public Playground URL yet.

If you only need a terminal workflow, use:

```bash
pnpm --dir ../cli exec tsx src/index.ts check ../playground/src/assets/examples/basics/01_fundamentals.yaml
pnpm --dir ../cli exec tsx src/index.ts compile ../playground/src/assets/examples/basics/01_fundamentals.yaml -f svg
```

For the Markdown path, continue to [Markdown Surfaces](/en/docs/markdown-surfaces/). The `rg` fence displays source, while the `relgeo` fence displays the rendered preview.

The `rg` block is meant for RelGeo source that should remain readable:

```rg
version: 0.5
metaPresets:
  plate:
    fill: "#e2e8f0"
    stroke: "#64748b"
objects:
  panel:
    type: rect
    size: [80, 40]
    place:
      topLeft: [0, 0]
    metaPreset: plate
    holes:
      - circle:
          center: panel.center
          radius: 10
```

The `relgeo` block is meant for preview or embed:

```relgeo
version: 0.5
metaPresets:
  plate:
    fill: "#e2e8f0"
    stroke: "#64748b"
objects:
  panel:
    type: rect
    size: [80, 40]
    place:
      topLeft: [0, 0]
    metaPreset: plate
    holes:
      - circle:
          center: panel.center
          radius: 10
```

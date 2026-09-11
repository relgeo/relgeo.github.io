---
title: Markdown Surfaces
description: The difference between `rg` and `relgeo` fenced blocks in RelGeo documentation.
---

RelGeo intentionally supports two markdown surfaces:

1. `rg` for source reading
2. `relgeo` for rendered preview or embed

This separation matters because authors and readers should be able to choose their intent clearly.

## When to use `rg`

Use `rg` when the RelGeo source itself is part of the document content.

Examples:

1. syntax tutorials
2. language-contract explanations
3. source review or audit notes
4. articles that need to show the drawing rules line by line

Example:

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

In this mode, the reader is expected to read the source as the primary artifact.

## When to use `relgeo`

Use `relgeo` when the document should show the rendered drawing rather than a second code block.

Examples:

1. drawing previews in articles
2. embedded visuals in product documentation
3. pages that demonstrate that RelGeo can live naturally inside Markdown

Example with the exact same source:

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

In this mode, the code is not shown again. The rendered result is shown instead.

## Public Contract Principle

What the docs site and the RelGeo markdown plugins should preserve:

1. one source can serve two different reading intents
2. `rg` emphasizes source readability
3. `relgeo` emphasizes the rendered artifact
4. authors should not need to export PNG files just to place drawings inside Markdown

This is an important part of the RelGeo vision as a language for free-form vector drawings that can live inside text-first media.

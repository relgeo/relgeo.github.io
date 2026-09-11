---
title: Current Capabilities
description: A concise summary of what RelGeo can already do today.
---

RelGeo is already usable today as a declarative vector drawing language that:

1. stays readable as source inside markdown
2. can render as preview or embed inside markdown
3. keeps geometry deterministic and relation-first
4. is becoming serious about technical drawing without limiting itself to that single domain

## What You Can Use Today

### 1. Write vector drawings as readable source

The `rg` fence is for cases where the source itself should remain part of the document.

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

In this mode, readers see the RelGeo source directly, just like any other code artifact inside markdown.

### 2. Embed the rendered result directly in markdown

The `relgeo` fence is for cases where the rendered artifact should appear in the document instead of a second source block.

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

This matters for RelGeo's goal of becoming a practical way to insert free-form vector graphics into markdown, not just export static images outside the authoring flow.

### 3. Keep drawings relation-first and parametric

RelGeo is not only a container for raw coordinates. Objects can refer to other objects, anchors, queries, and parameters. That means one source can produce different drawing variants when the input changes, while still preserving human-readable authoring intent.

### 4. Separate geometry from presentational metadata

RelGeo already has metadata paths such as `meta`, `metaPreset`, and `metaPresets`, so authors can organize visual or presentational concerns without mixing everything into geometry rules.

### 5. Serve as a foundation for self-describing technical drawings

Technical drawing is RelGeo's first deep domain. That does not make the language narrow. It means the project starts where determinism, precision, and readability are non-negotiable, so other domains can expand later without losing that depth.

## Current Status

- RelGeo currently follows the active v0.5 language spec.
- The website docs support onboarding and public framing.
- The language spec holds the normative contract followed by the implementation.

Closest reading path:

1. read [Why RelGeo](/en/why-relgeo/)
2. read [Markdown Surfaces](/en/docs/markdown-surfaces/)
3. read this page to see the capabilities that are already real
4. read [Language Status](/en/docs/language-status/)
5. move into the [Language Spec](/en/docs/language-spec/) when you need the active rules in detail

## Surfaces Still Being Strengthened

The public website, doc-site, markdown plugins, and broader cross-renderer ecosystem are still being matured. The language foundation is already real; the public-facing surfaces are still being clarified and strengthened.

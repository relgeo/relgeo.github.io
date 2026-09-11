---
title: Use Cases
description: The real-world needs that RelGeo is currently best suited to address.
---

RelGeo is suited to work that needs readable source, deterministic geometry, and drawing rules that remain reusable.

## 1. Embedding Free-Form Vector Graphics in Markdown

RelGeo offers a path somewhat like Mermaid, but for free-form vector drawings rather than a limited diagram template family.

In this context:

1. `rg` is useful when the source should remain readable
2. `relgeo` is useful when the rendered result should appear directly

## 2. Self-Describing Technical Drawings

Technical drawing is the first deep domain. Relations, dimensions, calculations, and construction intent remain readable in source form.

## 3. Parametric Drafting

RelGeo fits cases where one drawing rule needs to be reused with different inputs:

1. the data changes
2. the parameters change
3. the drawing variant changes
4. the authoring intent remains in the same family

## 4. Drawings That Stay Readable to Both Machines and Humans

This matters for:

1. version control
2. review
3. audit
4. automation
5. tooling integration

Source remains useful not only for the renderer, but also for reading and processing.

## 5. Richer Authoring Surfaces Over Time

Its usage surfaces can grow:

1. markdown
2. playground
3. CLI
4. desktop app
5. editor or doc-site integrations

Markdown embedding and technical drawing both matter, but neither one is the boundary of RelGeo's identity.

## Continue Reading

1. read [Current Capabilities](/en/current-capabilities/) to see the surfaces that already exist
2. read [Why RelGeo](/en/why-relgeo/) to understand the problem framing
3. open the [Documentation](/en/docs/) to move into usage surfaces

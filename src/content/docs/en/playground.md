---
title: Playground
description: A lightweight browser IDE for quick authoring, preview, and inspection.
---

The `Playground` is RelGeo's lightweight browser-based interactive surface.

It is intentionally positioned as:

1. a lightweight IDE
2. fast to open
3. fast to use for the `edit -> resolve -> preview -> inspect` loop

## When The Playground Fits Best

Use the Playground when you want to:

1. try RelGeo authoring interactively
2. see geometry preview immediately
3. inspect the dependency graph and geometry inspector
4. demonstrate the edit and resolve loop without building your own UI

## Current Surface Shape

In the current active repo snapshot:

1. the surface package lives in the `relgeo/playground` repository
2. it is `private`
3. it is not a registry publish target
4. it functions as the official lightweight browser IDE workspace

## Important Positioning

The Playground is intentionally kept lighter than a richer local workbench.

That means:

1. local state is kept intentionally limited
2. this surface is optimized for the authoring and inspection loop
3. it is not a full desktop-style personalized workspace

In short:

1. `Playground = lightweight browser IDE`
2. `Desktop App / Workbench = richer local workbench`

## Core Capabilities

The Playground is already moving toward:

1. a RelGeo source editor
2. live SVG preview
3. a geometry inspector
4. dependency graph inspection
5. parameter controls
6. lightweight session persistence

## Important Boundary

The Playground is not meant to replace:

1. the CLI for terminal automation
2. the language spec for the normative contract
3. a richer local workbench for deeper preference systems

## Documentation Status

This page is the website-owned entry surface.

The documentation home that sits closer to the package now starts in the playground repository's `docs/README.md`.

## Continue Reading

1. read [CLI](/en/docs/cli/) if you need terminal workflows
2. read [Desktop App](/en/docs/desktop-app/) to understand the boundary of the richer local workbench
3. read [Markdown Surfaces](/en/docs/markdown-surfaces/) for document embedding surfaces

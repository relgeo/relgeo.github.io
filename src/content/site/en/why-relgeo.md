---
title: Why RelGeo
description: Why relation-first vector authoring matters.
---

RelGeo comes from the need to write vector drawings as text that:

1. remains readable to humans
2. remains processable by machines
3. remains deterministic when parameters or input data change

Its first deep domain is technical drawing because that domain demands precision,
but RelGeo's identity is not limited to that single domain.

## The Problem RelGeo Is Trying to Solve

RelGeo grew from three connected needs:

1. free-form vector drawings that can live directly inside markdown documents, not only as exported images
2. technical drawings that document themselves, so coordinates, relations, and calculations remain readable in source form
3. one drawing rule that can still be reused when parameters or input data change

RelGeo was not built as another renderer that happens to have syntax. It was built to keep authoring intent alive in source.

## Why Relation-First

In many ordinary drawing workflows, the final result appears quickly, but the reason behind the shape disappears just as quickly. RelGeo takes the opposite direction:

1. the author writes relations, not only final coordinates
2. the final geometry is resolved from the same contract
3. parameter changes do not sever the meaning of the drawing

This makes the source closer to how people actually explain technical drawings:
"this part is centered on the panel", "these holes are equally spaced", "this line comes from a geometry query", rather than just a list of final numbers.

## Why Technical Drawing Comes First

Technical drawing was chosen as the first deep domain because it is a strong stress test:

1. it needs precision
2. it needs determinism
3. it needs clear intent
4. it leaves little room for output that is only "roughly correct"

Strength in this domain creates a healthier base for expansion into other domains.

## But RelGeo Is Not Narrow

Technical drawing is the first depth layer, not the boundary of the product's identity.

The larger vision remains:

1. a relation-first vector language that lives comfortably in text-first media
2. source that remains readable to both humans and machines
3. drawings that can move between source-reading intent and rendered-artifact intent

That is why markdown surfaces, the docs site, and embed plugins are treated as first-class concerns from the beginning.

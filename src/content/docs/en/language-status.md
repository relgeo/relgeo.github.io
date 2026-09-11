---
title: Language Status
description: Explains which source is currently normative, which part is the English public surface, and how synchronization is expected to work.
---

This page explains the current public language status of RelGeo documentation.

## Short Summary

Right now:

1. the active normative source lives in the `relgeo/spec` repository under `id/`
2. the English public surface is being prepared in the `relgeo/spec` repository under `en/`
3. the docs site uses stable public routes even though the active internal source still lives under `id/`

This means the implementation, audits, and active language contract still point to the Indonesian tree.

RelGeo itself is already moving with the active `v0.5` contract. What this page distinguishes is not the DSL version, but the editorial and public-language status of the documentation.

## Package Version And DSL Version

Package or release numbers such as `0.4.0` or `0.5.0` are distribution metadata for individual packages. They are not the same as the `RelGeo DSL v0.5` language-contract version. Packages may follow their own release cadence while continuing to implement the active DSL contract.

## Why `id` Is Still the Normative Home

The reason is simple:

1. the `id/` tree is currently the most mature and implementation-aligned source
2. the existing delta history and audits already point to it
3. keeping one active normative home reduces drift while the English layer is still incomplete

This does not mean English is less important. It is only a sequencing decision.

## What `en` Means Right Now

The `en/` source folder and the `/en/...` surface are being prepared for:

1. broader public access
2. a bilingual docs site
3. a future split into a separate spec repository

For now, however, `en/` has not taken over the normative role from `id/`.

If temporary differences exist:

1. `id/` still wins for the active contract
2. `en/` should be read as a public surface that is being brought closer to the active contract

The practical rule is:

1. do not infer the final active rule from `en/` when a detail is not fully aligned yet
2. use `en/` for public access, initial orientation, and the bilingual docs-site surface
3. use `id/` when you are checking implementation-level contract details, audits, or the latest semantic decisions

## How Synchronization Should Work Later

The direction we want to preserve:

1. semantic changes land in the active normative home first
2. the English surface is aligned after that
3. public docs-site routes do not need to change even if the source later moves to a separate spec repository

In other words, what we want to stabilize is:

1. the language contract
2. the public routes
3. the editorial boundary

Not necessarily the current repository location.

## What This Means for Readers and Contributors

If you are reading RelGeo as an external user:

1. you can still rely on stable public `/id/...` and `/en/...` routes
2. you do not need to follow the internal repository structure to understand the docs position
3. when public prose and contract detail temporarily diverge, the active normative tree still wins

If you contribute to the spec:

1. semantic changes should land in the active normative home first
2. editorial cleanup and public-surface alignment can follow after that
3. the goal is two strong public languages, not two competing normative homes

## For External Readers

If you want to:

1. see the active language contract now, open `language-spec`
2. understand how RelGeo lives inside Markdown, read `Markdown Surfaces`
3. follow the bilingual and public-surface direction, use this page as context
4. understand the product reason and problem framing, continue to `Why RelGeo`

# RelGeo Website Visual Redesign — Audit & Change Plan

**Status:** Proposed plan  
**Date:** 2026-09-12  
**Scope:** `relgeo.github.io` website, including the shared shell, landing pages, documentation index, language-spec index, and supporting delivery quality.  
**Baseline:** post-landing visual reset (`ede9c4c`)

## 1. Executive verdict

The website is technically functional and has a good structural foundation. The Astro build, localized routes, content collections, external spec loading, public package integration, and GitHub Pages deployment path are all in place.

The main weakness is presentation architecture rather than application capability. The visual system still carries an earlier “everything is a rounded card” assumption, while the product itself is about readable source, technical precision, and documents that should feel like editorial and reference material. As a result:

- important information is pushed below the first viewport;
- several pages look like stacks of interchangeable cards instead of distinct reading surfaces;
- the navbar changes shape and information architecture between pages;
- technical and normative material does not yet look sufficiently authoritative;
- the landing page has improved directionally, but the internal pages still use the old visual grammar;
- the CSS and page templates are carrying stale or duplicated presentation logic.

This is a medium-to-large presentation refactor, but it does not require changes to the RelGeo language, packages, public APIs, or repository topology.

## 2. Audit baseline and evidence

The current website baseline was checked with:

```text
pnpm build
pnpm check
pnpm test
```

All three checks pass. The build currently produces 138 static pages, Astro reports zero errors, warnings, and hints, and the built-output assertions pass.

The current architecture includes:

- Astro 5 static output;
- localized gateway and pages under `/id/` and `/en/`;
- separate site content, usage documentation, and language-spec content collections;
- language-spec content loaded from the external `spec` source through `RELGEO_SPEC_PATH`;
- a Pages workflow that builds the playground and mounts it at `/playground`;
- canonical, hreflang, Open Graph, Twitter, robots, and theme-color metadata;
- shared layout and navigation in `src/layouts/DocsLayout.astro`.

The audit is based on the current source and built output, not only on screenshots. The screenshots remain useful as visual evidence of density, excessive rounding, and navbar inconsistency.

## 3. What is already strong

### Product and content structure

- The separation between product-facing pages, usage docs, and the normative language spec is conceptually correct.
- The language-specific URL structure is clear and extensible.
- The website reads real spec material from the spec source instead of silently maintaining a second normative copy.
- The landing page no longer depends on a live renderer/highlighter workflow as its primary visual proof.
- The static AI artwork gives the landing page a stable, art-directed visual anchor.

### Engineering and delivery

- The site builds deterministically in the current local setup.
- The playground is built separately and copied into the final Pages artifact.
- The built-output assertion protects important integration assumptions.
- Skip-link and visible focus treatment are present.
- The public workspace excludes `.internal/` design references from publication.

### Current direction

The visual rules already establish the right strategic direction:

- shape should follow function;
- landing pages should be editorial and technical rather than dashboard-like;
- technical surfaces should avoid unnecessary rounding;
- live demos and source/render experiments belong in playground or docs, not in the landing hero.

The next step is to make the shared layout and all major page templates obey those rules.

## 3a. Implementation progress

This document is also the working status register for the redesign.

### Completed in the current implementation session

- [x] Recorded the audit baseline and saved the phased plan.
- [x] Unified the primary navigation data across landing and internal pages.
- [x] Added `Why RelGeo` to the internal navigation.
- [x] Corrected the active navigation state for the Why RelGeo route.
- [x] Removed the unused large top offset above the navbar.
- [x] Reduced the shared radius baseline from large rounded containers to small functional corners.
- [x] Introduced the first editorial Why RelGeo layout: compact masthead, contents rail, and reading column.
- [x] Redesigned the Documentation index around a compact group map, one reading path, and dense reference rows instead of repeated card sections.
- [x] Rebuilt and validated the site after these changes: 138 pages, zero Astro diagnostics, and passing built-output assertions.

### Still open

- [ ] Complete the shared layout refactor into explicit style layers.
- [ ] Add automated assertions for all primary routes and active navigation states.
- [x] Redesign the Documentation index.
- [ ] Redesign the Language Spec index.
- [ ] Simplify leaf pages and remove redundant card wrappers.
- [ ] Centralize visible localized navigation and action labels.
- [ ] Remove confirmed stale landing components, fixtures, and CSS.
- [ ] Perform viewport, keyboard, contrast, zoom, and reduced-motion review.
- [ ] Add favicon/touch icon and optimize the hero asset.
- [ ] Move the Pages workflow to Node 24 and frozen playground installation after compatibility verification.

The Why RelGeo work is a first page slice, not a claim that Phase 2 is complete.

## 4. Findings and priorities

### P0 — Correct navigation semantics before visual polish

#### Active navigation is wrong on Why RelGeo

`src/layouts/DocsLayout.astro` derives the active item partly by prefix matching. The internal navigation does not include a Why RelGeo item, so `/en/why-relgeo/` and its Indonesian equivalent fall through to the localized home prefix and mark Home as active.

#### Navigation information architecture is inconsistent

The landing navigation contains `Why RelGeo`, while the internal navigation contains `Home`, `Capabilities`, and `Language Spec` but omits `Why RelGeo`. This makes the site hierarchy change depending on the page being read.

**Required outcome:** define one canonical primary navigation model, with deliberate differences only where the gateway or a narrow mobile layout requires them. Active state must be route-aware and tested against every top-level route.

### P1 — Replace the global rounded-card default

The shared layout currently defines and applies several large radius tokens (`--radius-xl`, `--radius-lg`, `--radius-md`, and `--radius-sm`) across the topbar, navigation controls, page headers, cards, sidebars, documentation bands, spec panels, and content blocks. This is the direct source of the “everything is rounded” appearance.

The redesign should distinguish surfaces by function:

- editorial page and reading surfaces: mostly square or very small radius;
- code, spec, and technical reference surfaces: square by default;
- compact utility controls: small radius where it improves affordance;
- true status or tag elements: pill only when they represent a compact state;
- no large rounded container merely to group ordinary page content.

The goal is not to remove every curve mechanically. It is to prevent curvature from becoming the default container language.

### P1 — Reduce nested cards and vertical waste

The current docs and spec pages frequently combine:

1. a rounded page-header card;
2. a rounded sidebar card;
3. a rounded content band;
4. a rounded body card;
5. multiple rounded feature or next-reading cards.

This makes the page feel like a component showcase and causes the first meaningful information to begin too far below the navbar. It also weakens hierarchy: a normative section, a recommendation, and a navigation link are visually treated as the same kind of object.

**Required outcome:** use layout, rules, typography, and whitespace to establish hierarchy. Reserve bordered panels for genuine boundaries, not for every section.

### P1 — Refactor the shared layout before redesigning individual pages

`src/layouts/DocsLayout.astro` currently contains shared markup and a very large global stylesheet. It is doing too much at once: shell, navigation, typography, cards, docs page styles, spec styles, responsive behavior, and page-specific exceptions.

This makes visual changes risky because a small token or selector change can affect unrelated pages. The redesign should first extract a small set of explicit layout primitives or style layers:

- global tokens and reset;
- site shell and top navigation;
- reading layout;
- index/sidebar layout;
- technical/reference layout;
- controls and link treatments;
- responsive and reduced-motion rules.

The exact file split is flexible; the important outcome is clear ownership and fewer broad selectors.

### P1 — Remove stale landing implementation after dependency confirmation

After the landing reset, the source still contains unused landing workflow/viewer components, fixtures, animation data, and related CSS selectors. The likely stale files include:

- `src/components/LandingWorkflow.astro`;
- `src/components/LandingStoryViewer.astro`;
- `src/lib/landing-fixture.ts`;
- `src/lib/hero-fixture.ts`;
- `src/lib/landing-hero.relgeo.yaml`;
- `src/lib/animation-story.ts`.

These should be removed or moved to an explicitly documented experimental area only after a repository-wide usage check. Dead CSS in `src/pages/[lang]/index.astro` should be deleted at the same time.

### P1 — Harden the Pages workflow

The current workflow has two known maintenance issues:

- it explicitly requests Node 20, and GitHub Actions now reports that Node 20 is being deprecated;
- the playground install uses `--no-frozen-lockfile`, which allows CI to silently resolve a dependency graph different from the committed lockfile.

The target is Node 24 after local compatibility verification and frozen-lockfile installation for every checked-in package that participates in the build. This is a delivery-quality change, not a visual feature, but it should be completed before the redesign is considered production-ready.

## 5. Target visual direction

### Core principle

**RelGeo should look like a precise editorial instrument, not a rounded SaaS dashboard.**

The visual language should combine:

- calm paper-like background;
- dark ink typography;
- restrained teal/coral accents;
- thin rules and alignment lines;
- a clear reading column;
- diagrams and static artwork as intentional illustrations;
- compact navigation;
- enough density to show the product’s substance without becoming cramped.

### Shape and border rules

- Do not use a large radius as the default page-container treatment.
- Use square corners for code, spec, documentation, and diagram surfaces unless a particular interaction needs a softer edge.
- Use a small radius for buttons, language toggles, or selected utility controls only when it improves recognition.
- Avoid putting a border, background, and radius around every text group.
- Use horizontal rules, vertical rails, indentation, and typography to separate related content.

### Spacing and density rules

- Keep the top of the page visually quiet but compact; remove unused air above the navbar.
- Make the primary message and first useful action visible in the first viewport at common laptop and desktop sizes.
- Use a consistent content max-width and predictable side gutters.
- Reduce repeated padding inside nested containers.
- Let long-form content breathe through line-height and section rhythm, not through oversized empty panels.

### Typography rules

- Use one consistent sans-serif treatment for the RelGeo brand and navigation.
- If a serif face is retained for editorial headlines, define it as an intentional display role and use it consistently, not accidentally as a brand treatment.
- Keep body copy readable with a controlled line length.
- Use monospace only for code, identifiers, metadata, version labels, and technical annotations.
- Make hierarchy depend on size, weight, and spacing rather than large decorative containers.

### Interaction rules

- Navigation should be compact and consistent across site pages.
- Active state should be unmistakable but restrained.
- Focus states must remain visible against the paper background.
- Hover effects should not change layout or create unnecessary motion.
- Respect `prefers-reduced-motion` for any remaining animation.

## 6. Target page system

### Shared shell

The shared shell should provide:

- one canonical desktop navigation model;
- one compact mobile navigation model;
- consistent brand treatment;
- one language switcher treatment;
- predictable page gutters and top offset;
- consistent footer and metadata treatment.

The shell should not decide that every child page is a card. It should provide the grid and rules that child pages can use.

### Gateway `/`

Keep the root gateway intentionally minimal: a clear language choice and a concise explanation. It should not compete with the localized landing pages or inherit an oversized rounded-card composition.

### Localized landing `/id/` and `/en/`

Keep the current strategic decisions:

- static art-directed hero artwork;
- no live renderer/highlighter/source-code proof in the hero;
- compact editorial hero;
- concise value propositions;
- clear route into docs and playground.

The landing page should be refined later only after the internal page system is stable. It is the brand entry point, but it should not become a separate design universe from the rest of the site.

### Why RelGeo

Replace the single giant article card with an editorial reading layout:

- compact page heading;
- section index or contents rail;
- readable main column;
- optional right-side margin rail for short principles or pull quotes;
- thin rules between major sections;
- restrained next-reading links at the end.

The page should feel like a manifesto or product essay, not a form inside a card.

### Documentation index

Use a clear documentation frame:

- narrow left navigation/sidebar;
- one primary reading column;
- a short orientation/introduction at the top;
- a single recommended reading path;
- grouped links with concise descriptions;
- usage surfaces and normative references separated by hierarchy, not repeated cards.

Avoid duplicating the same navigation in the sidebar, a “read in this order” panel, and multiple lower sections unless each repetition has a distinct job.

### Language-spec index

Treat the spec as a standards/reference surface:

- compact section navigation on the left;
- a strong but controlled title and version/status metadata;
- numbered content sections;
- stable anchors and linkable headings;
- minimal decorative treatment;
- no visual ambiguity between normative content and explanatory site content.

The “browse active contract” links should either become the authoritative sidebar navigation or be reduced to a compact orientation aid, not both at full size.

### Leaf pages

Use one consistent article template with:

- breadcrumb or section context;
- readable title and metadata;
- controlled body measure;
- stable heading anchors;
- previous/next or related reading links;
- no unnecessary nested card wrappers.

## 7. Content and localization plan

The visible Indonesian UI still contains several hard-coded English labels in `src/pages/[lang]/docs/index.astro`, including documentation titles, route labels, and link prompts.

Before changing copy, create a small terminology policy:

- which product names remain canonical in English;
- which navigation labels should be translated;
- which technical terms should remain unchanged for searchability and consistency;
- how `Language Spec`, `Playground`, `Current Capabilities`, and similar names appear in Indonesian navigation.

Then move visible labels into a single i18n map or content metadata source. This prevents the navbar and page body from drifting apart.

Content hierarchy should also be reviewed while preserving meaning:

- orientation copy should be short;
- normative content should remain sourced from the spec repository;
- navigation descriptions should not repeat the first paragraph of the target page;
- product claims should distinguish current capability from future direction.

## 8. Quality, accessibility, SEO, and performance plan

### Visual QA

Add a repeatable screenshot review matrix for at least:

- desktop wide: approximately 1440px;
- laptop/desktop constrained: approximately 1280×720;
- mobile: approximately 390×844;
- both Indonesian and English;
- landing, Why RelGeo, Docs index, Language Spec index, and one long leaf page.

The acceptance review should check first-viewport density, navbar alignment, text wrapping, link visibility, sidebar behavior, and footer proportions.

### Accessibility

Add automated or scripted checks for:

- every primary navigation link resolves;
- active route receives the correct `aria-current`;
- keyboard focus is visible;
- skip link works;
- heading order is sensible;
- interactive controls have accessible names;
- content remains usable at 200% text zoom;
- reduced-motion preference does not leave broken or hidden content;
- contrast remains readable for muted text and teal links.

### SEO and metadata

The current canonical, hreflang, robots, Open Graph, and Twitter metadata are a good base. Add only the missing essentials that have a clear purpose:

- favicon and touch icon;
- consistent page titles/descriptions for all localized routes;
- route-level verification that canonical and alternate links match the localized URL.

Do not add a speculative social preview image until a deliberate brand asset exists.

### Performance

The current hero PNG is approximately 2.3 MB and is loaded eagerly. Review it as a likely LCP cost:

- generate a correctly sized responsive derivative;
- prefer WebP or AVIF where browser support and visual quality allow;
- retain a safe fallback;
- keep eager loading only if measurement shows it benefits the first viewport.

The playground should remain lazy from the perspective of the main landing page; it belongs on its own route.

## 9. Phased implementation plan

### Phase 0 — Lock the contract

Deliverables:

- confirm this plan and the visual rules document;
- record baseline screenshots and current build evidence;
- decide the final navigation labels and whether technical surfaces may use any radius beyond a small utility radius;
- define the route and viewport acceptance matrix.

### Phase 1 — Foundation and navigation

Deliverables:

- refactor shared tokens and spacing;
- define surface shape rules;
- unify primary navigation data;
- fix active route detection and add route assertions;
- compact top offset, navbar, language switcher, and footer;
- preserve skip-link and focus behavior;
- add responsive/reduced-motion rules in the new structure.

This phase should be completed before page-specific redesign because every page depends on it.

### Phase 2 — Page shells

Deliverables:

- redesign Why RelGeo as an editorial reading layout;
- redesign Docs index as sidebar plus reading column;
- redesign Language Spec index as a standards/reference layout;
- simplify leaf-page framing;
- remove nested cards that do not communicate a real boundary.

### Phase 3 — Content and localization

Deliverables:

- centralize visible navigation and action labels;
- apply the terminology policy to Indonesian and English;
- remove redundant introduction and navigation copy;
- ensure the distinction between docs and normative spec remains explicit.

### Phase 4 — Landing polish and stale-code cleanup

Deliverables:

- re-evaluate the landing page against the now-stable shell;
- keep the static AI artwork and no-live-demo decision;
- remove dead landing components, fixtures, animation data, and unused CSS after usage checks;
- verify the landing build assertion still describes the intended contract.

### Phase 5 — Quality and delivery hardening

Deliverables:

- add visual screenshot review or a lightweight visual regression baseline;
- add route, active-nav, metadata, and accessibility checks;
- add favicon/touch icon;
- optimize the hero asset;
- move CI to Node 24 after local compatibility verification;
- make playground installation frozen and keep its lockfile synchronized;
- rerun full build, check, tests, and Pages artifact validation.

## 10. Recommended execution order

For the next implementation session, use this order:

1. shared tokens and compact shell;
2. canonical navigation and active-state fix;
3. Why RelGeo page;
4. Docs index;
5. Language Spec index;
6. leaf pages and localized labels;
7. stale-code cleanup;
8. visual/accessibility/performance checks;
9. CI hardening and final Pages build.

This order minimizes rework. Redesigning individual pages before fixing the shared shell would reproduce the same inconsistency in a new form.

## 11. Acceptance checklist

The redesign is ready for review when all of the following are true:

- [ ] the navbar has one coherent information architecture;
- [ ] Why RelGeo, Docs, Language Spec, Playground, and all primary routes have correct active states;
- [ ] the first viewport contains the page’s primary purpose and action at common desktop sizes;
- [ ] technical surfaces are square or use only a deliberately small radius;
- [ ] no ordinary content section is wrapped in a decorative rounded card without a clear reason;
- [ ] sidebar, article, and footer alignment is consistent across localized pages;
- [ ] Indonesian and English labels follow the terminology policy;
- [ ] the landing page remains static-art-led and does not reintroduce the live hero demo;
- [ ] dead landing implementation and CSS are removed or explicitly retained with a reason;
- [ ] keyboard navigation, focus, skip link, contrast, 200% zoom, and reduced motion are checked;
- [ ] favicon and localized metadata are present and correct;
- [ ] hero asset size and loading behavior are reviewed;
- [ ] `pnpm build`, `pnpm check`, and `pnpm test` pass;
- [ ] the Pages workflow uses a reproducible dependency installation path.

## 12. Non-goals

This plan does not propose:

- changing the RelGeo language or spec contract;
- changing package APIs or npm release policy;
- moving repository ownership or changing the multi-repo architecture;
- reintroducing a live renderer/highlighter into the landing page;
- adding authentication, search, comments, analytics, or a CMS;
- rewriting normative spec content inside the website.

## 13. Risks and rollback strategy

- Keep the foundation, page shells, cleanup, and CI changes in separate commits.
- Preserve the current baseline screenshots until the new layout is accepted.
- Do not delete stale files until repository-wide usage checks and a full build pass.
- If a page-specific redesign fails, revert that phase without undoing the navigation and token foundation.
- Keep the external spec-loading contract unchanged while changing its presentation.

## 14. Decisions to confirm before implementation

The recommended defaults are already reflected in this plan:

1. **Technical surfaces:** square by default; small radius only for selected utility controls.
2. **Navigation:** one canonical primary navigation, including Why RelGeo on internal pages.
3. **Spec relationship:** the website presents the spec, but the spec repository remains the normative source.
4. **Landing hero:** static art remains the primary visual; live renderer/highlighter stays in playground/docs.
5. **Localized terms:** translate ordinary navigation where natural, but preserve canonical technical/product names when changing them would reduce clarity or searchability.

If these defaults are accepted, implementation can begin directly at Phase 1.

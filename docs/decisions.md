# Decisions

A lightweight record of non-obvious choices for this repo. Not formal ADRs - a few lines each, enough that a recurring "why not X?" has a written answer.

## The spec defines Bartl; the derivation explains the design

The narrow technical contract lives in `src/content/spec.ts` and is rendered by `src/pages/[lang]/spec.astro`. It defines Bartl as an observed-state startup mechanism for a stateful application. The landing page summarizes that contract and links to the executable WordPress reference. The derivation explains the operating observations, design pressure, history, and compositions that led to the mechanism. It does not add requirements to the pattern.

The public definition is limited to:

- a versioned release;
- fully declared state;
- a valid backup;
- target configuration;
- the decision to initialize, restore, invoke product-specific migration, serve, or abort.

Target provisioning and external operating processes remain outside the pattern. A reference demonstrates only its own pinned product configuration.

The public information architecture has one canonical answer per question:

- landing page: what Bartl is and where to try it;
- derivation: why the mechanism has this form and what it may enable;
- technical spec: what an implementation must satisfy;
- executable reference: evidence for one pinned WordPress configuration.

Historical talks and product contexts provide provenance. They do not define a second version of Bartl.

## German and English pages share their structure

The landing route renders `src/components/Landing.astro` for both languages. Landing, derivation, and spec copy live in `src/content/landing.ts`, `src/content/derivation.ts`, and `src/content/spec.ts`; each page keeps one shared layout across languages. Copy remains language-specific, but section order, links, semantics, and claim boundaries cannot drift through separate page implementations.

## Astro over a single-binary static site generator

The site is mostly static prose plus one interactive component: the decision-tree pseudocode highlighter.

Astro was chosen because it sends no client-side JavaScript for static sections and keeps the small interaction local to its component. It also provides static routing, metadata, sitemap generation, and language-specific pages without a client application shell.

A single-binary static site generator would reduce dependency churn. It was considered and rejected because the interactive decision tree and shared component structure would otherwise require more custom wiring. This decision can be revisited if the interaction is removed.

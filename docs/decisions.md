# Decisions

A lightweight record of non-obvious choices for this repo. Not formal ADRs - a
few lines each, enough that a recurring "why not X?" has a written answer.

## The public thesis is the canonical Bartl definition

The argument and product boundary live in `src/thesis/derivation.de.md` and
`src/thesis/derivation.en.md`. Landing-page copy, reference implementations,
conference material, and GmbH business documents derive from that thesis; they
do not define a second version of Bartl.

The thesis separates five layers:

- the orientation: mission fulfilment creates resilience and sovereignty
  requirements for a named threat profile;
- the service-recovery contract: every required dependency must contribute an
  independently controlled and measured recovery or replacement path;
- the pattern: Bartl moves an accepted application release and its declared
  state through initialization, recovery, and migration until the product is
  ready for acceptance;
- the evidence ladder: Bartl conformance, recovery capability, and practical
  provider switchability are separate claims;
- the governance: the service owner decides among fulfilment, transformation,
  replacement, and a time-limited exception based on evidence from the
  accountable roles.

The public orientation can explain the complete chain without making the Bartl
mechanism responsible for target provisioning, supply-chain trust, identities,
reachability, write authority, activation, or functional acceptance.

## BSI 200-4 alignment is not a conformance claim

The terminology and outer service-recovery contract are designed to be
compatible with BSI Standard 200-4. Both start from the required service,
derive threat-specific continuity requirements, distinguish minimum continuity
operation from normal operation, and compare RTO/RPO objectives with measured
RTA/RPA results. The standard also permits alternate resources and procedures;
recovering the same application is therefore not the only valid continuity
strategy.

Never claim that Bartl alone is BSI-conformant. The pattern provides the
application-and-state part of recovery. Evidence that a particular
organizational scope meets the applicable BSI Standard 200-4 requirements also
requires the protection profile, roles, chained recovery contracts, target
environment, plans, functional acceptance, and executed exercises.

Use three distinct claims:

- `Bartl-conformant` for the versioned application-and-state contract;
- `recovery-capable for profile X` for the complete contract chain and recovery
  drill;
- `practically provider-switchable for profile X` only after the additional
  exit drill.

Sovereignty remains an organizational capability, never a provider or product
label.

## Astro over a single-binary static site generator

The site is mostly prose (the thesis in `src/thesis/`) plus a few interactive
components on the landing page (the decision-tree pseudocode highlighter and
friends).

Astro was chosen for its islands architecture: it ships zero JavaScript by
default and hydrates only the interactive pieces - the right fit for "mostly
static with a little interactivity". Markdown and i18n come first-class.

A single-binary SSG (Hugo, Zola) would be lower-maintenance - no `node_modules`
churn, no framework major upgrades. It was considered and rejected because the
interactive components would then have to be hand-rolled in vanilla JavaScript,
and the interactivity here genuinely warrants a framework. If the interactive
pieces are ever dropped and the site becomes pure prose, revisiting a
single-binary SSG would be reasonable.

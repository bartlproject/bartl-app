<!-- SPDX-License-Identifier: CC-BY-4.0 -->

# Bartl

A design pattern for the lifecycle of stateful applications. At startup, one mechanism decides from observed state, an externally available backup, and versions. It does not follow an operation requested by the operator.

Website: [bartl.app](https://bartl.app)

## Purpose and causal model

An organization fulfils its mission only when authorized users receive the required service. They must be able to reach the application, and the application must be able to reach its required dependencies. Application, state, and dependencies must be available, functionally correct, and trustworthy.

```text
mission
-> required service
-> accountable protection and operating objectives
-> required capabilities and evidence
```

Resilience is the ability to maintain a service under a named disruption or recover it within accountable loss limits. Switchability is the demonstrated operational ability to move the complete service chain to a different operating domain. Sovereignty is the organization's ability to decide independently and make that decision effective without an unacceptable external dependency. Sovereignty is not a property of a provider or product.

None of these capabilities generally follows from another. Provider-internal failover can be resilient without permitting an independent switch. A portable export can permit a switch without meeting RTO, RPO, or functional requirements. A named threat profile is what connects the requirements.

```text
threat profile "loss of the former provider domain"
-> resilience: recover the service within its protection limits
-> sovereignty: decide and execute the switch independently
-> shared condition: recovery without cooperation from the lost domain
```

A production outage raises three business questions. How many users are affected, when will the required service be available again, and which data state can be recovered? The Bartl path makes the product-side application-and-state part behind the last two answers repeatable. Actual RTO and RPO values also depend on backup cadence, target provisioning, transfer, reachability, and functional acceptance.

## The recovery decision

Every service receives a recovery decision with threat-specific protection profiles. Not every service needs the same RTO, RPO, target readiness, or drill depth. A hard-to-reverse operational or contractual dependency must not be entered, extended, or accepted again before the decision has been made.

The recovery decision identifies at least:

- the mission, service, and minimum function required during continuity operation;
- the threat profile and the operating or contractual domains that are lost or no longer trusted;
- RTO, RPO, blast radius, and the deadline for complete normal operation;
- required recovery contracts for the application, state, and every necessary dependency;
- accountable service, product, operations, security, and risk roles;
- current evidence and the next required drill;
- remaining gaps and exactly one accountable outcome.

Permitted outcomes are fulfilment, transformation of the existing application, replacement by another product or prepared alternate procedure, and a time-limited exception. An exception names the risk owner, compensating measures, expiry date, and next decision. "Partially fulfilled" is a finding, not a completed outcome.

The service owner determines the service, minimum function, and decision. Product, operations, and security provide their respective evidence. Only the mandated risk owner may accept an exception.

## Chained service-recovery contract

The service-recovery contract describes the complete service chain from the user to the functional outcome. It can be fulfilled by recovering the same application or by a previously qualified alternate procedure. An alternate procedure can support resilience and sovereign agency, but it is not Bartl-conformant.

In a Bartl recovery, the application's functional identity remains stable. An accepted release from the same product line is joined to a continuously attributable state lineage and passes functional acceptance. A verified migration during recovery is permitted. A functionally equivalent different product remains an alternate procedure.

Every dependency not transported by Bartl requires its own recovery or replacement contract. These dependencies can include databases, keys and HSMs, licensing and installation rights, network, identity, service address, and target capacity. The overall evidence is complete only when every contract required for the minimum function has been fulfilled.

A recovery set is independently controlled only if releases, state, keys, trust anchors, and procedural information remain accessible and usable after complete loss of the former operating and administration domain. Storage at another provider or multiple copies do not suffice when accounts, keys, or administration still share the same failure domain.

RTO and RPO are objectives. RTA and RPA record the recovery time and expected data loss actually achieved during the drill. The defined minimum function must pass functional acceptance within the RTO. Complete normal operation follows within a separately accountable restoration deadline.

## Evidence levels and claim boundaries

| Claim                                            | Minimum evidence                                                                                                                            | Does not demonstrate                                                     |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Bartl-conformant                                 | Versioned product contract, accepted release and recovery point, successful recovery or migration until the product is ready for acceptance | complete service, RTO/RPO, or a provider switch                          |
| Recovery-capable for a named protection profile  | Complete recovery-contract chain, technically unavailable source, RTA/RPA within limits, and functionally accepted minimum service          | production cutover and new write authority                               |
| Practically provider-switchable for that profile | In addition, an exit drill with a stable service address, fencing, exclusive write authority, and explicit forward or fallback decision     | general switchability of other applications, targets, or threat profiles |

Sovereignty remains a property of the organization. None of the three labels makes a provider, product, or individual drill "sovereign".

The Bartl and product evidence is renewed after material changes to the release, state contract, or migration logic. End-to-end evidence is renewed after changes to the protection profile, target, identity, network, or cutover, and periodically even without such changes. A successful run is not a certificate without an expiry condition.

During a recovery drill, source access, source administration, and source APIs are technically unavailable to the recovery team. The recovery set and evidence archive remain outside that domain. Every required request to the source is a finding. Only the additional exit drill tests user cutover, fencing, and write authority.

An exit can be aborted and an unchanged frozen source reactivated until the authority commit. After authoritative writes have occurred at the target, there is no return to the old generation. A subsequent failure creates a new recovery generation from an accepted state.

## The canonical Bartl boundary

### Principle

Recoverability is not an emergency add-on. It is a prerequisite for responsible operation. A separate, rarely used restore path decays. A shared mechanism used regularly for installation, recovery, upgrades, and migration keeps recovery capability in the normal lifecycle.

### Pattern

Bartl owns the pinned application release, declared state, and the path for initialization, recovery, and migration until `serving()`. It branches on observed facts at the target, not on operation names.

`serving()` means that release and state are compatible, internally consistent, and ready for acceptance through product-supplied checks. It demonstrates neither user reachability nor functionally accepted continuity operation.

The contract applies as a requirement to every application that claims this part of switchability. A reference does not prove conformance for other applications. Each product must implement and execute its own state inventory, migration logic, backup, and recovery.

### Surrounding service-recovery contract

The complete service also needs a qualified and provisionable target, trustworthy software and recovery supply chains, identities and authorization, user and dependency reachability, a stable service identity, exclusive write authority, activation, and functional acceptance. These conditions determine the end-to-end drill. They are not part of the Bartl mechanism.

## Contract with four inputs

The startup mechanism depends on four inputs supplied by the product and its environment.

| Input                                   | Meaning                                                                                                      |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Pinned and accepted application release | Immutable release including product-specific migration logic                                                 |
| Declared state inventory                | Portable mutable state including its state version                                                           |
| Durable, independently controlled store | Storage independently available from the source operation with a fully published and accepted recovery point |
| Target configuration                    | Configuration supplied by the target, such as endpoint and credentials                                       |

For the WordPress reference, the state inventory consists of the database and uploads. WordPress core, plugins, and themes belong to the application release. The target environment supplies endpoints and credentials. This separation is part of the contract. An image replaces neither database nor uploads, and credentials do not belong in the backup format.

Technical integrity verification and a trust decision are different. Checksums detect later modification, but not an already compromised build or a functionally incorrect recovery point. Product and operator must therefore decide which combination of release and recovery point is accepted. A supply-chain attack may revoke that acceptance without causing a checksum mismatch. Provenance, trust roots, key rotation, and the functional trust decision remain outside Bartl.

From these four inputs, the mechanism derives three observations for its branch: does valid local state exist, is a fully published and accepted recovery point available, and how does the engine version compare to the state version?

## Observed startup path

The mechanism checks local state first. If it exists, it compares engine and state versions. If it does not, the mechanism tries to fetch and verify an external backup. Only when neither local state nor a valid backup exists does it initialize fresh state.

```python
until serving():
    if local_state_exists():
        if engine_version == state_version: serving()
        elif engine_version > state_version: migrate()
        else: abort("downgrade")
    elif valid_external_backup(): restore()
    else: init()
```

After `init()`, `restore()`, or `migrate()`, the mechanism observes the state again. The code branches on facts at the target, not labels such as restore, upgrade, or migration. A failure is not repaired by choosing a different operation name. The application must be able to recognize whether local state is valid. Not every form of semantic corruption can be derived from its mere existence.

## Consequences of the mechanism

A restart with the same valid local state proceeds directly to service. Without local state, a valid external backup returns through `restore()` to the version comparison. Without either, `init()` creates fresh state.

An upgrade with a newer engine requires product-specific migration logic. Bartl provides the decision point, not a universal migration. An engine older than the state aborts.

Recovery, migration, and evacuation can use the same application-and-state path when the target is compatible with the application and an accepted recovery point is available externally. A target change alters provider, endpoint, and configuration, not the meaning of release, database, files, and state version.

After authoritative writes on a new target, an earlier recovery generation must not become active again. On another failure, the surrounding orchestration selects an accepted data state and activates a new generation at the next target. Bartl executes the same application-and-state path there. It manages neither global generations nor write authority or cutover.

The result is one execution path and fewer distinct operating procedures for this slice. It does not automatically provide recovery objectives, portable backups, correct migrations, a trustworthy supply chain, or a complete operating organization. Each of those properties must be proven and operated.

## Product requirements

For the pattern to work, the product must at least:

- declare which databases, directories, and metadata make up mutable state;
- version the state and determine that version reliably;
- produce a new state version through tested, product-specific migration logic;
- create a backup format and verify that it can be restored;
- initialize fresh, empty state unambiguously;
- handle partially created or damaged state so that the next startup can make a sound decision again;
- provide product-side technical and semantic checks for restored state.

The runtime supplies fulfilled preconditions such as a reachable database, storage, and network. Bartl does not replace those preconditions.

## Position within a provider switch

For a provider switch that preserves the same application and its state lineage, the Bartl path is a necessary application-and-state component, not a substitute for the whole undertaking. A qualified alternate procedure follows a different contract.

| Stage                       | Result                                                                            | Responsibility          |
| --------------------------- | --------------------------------------------------------------------------------- | ----------------------- |
| Decision and qualification  | Independent decision and suitable target                                          | Operator                |
| Prepare target              | Provisioned runtime, network, identity, storage, and configuration                | Operator and target     |
| Provide recovery set        | Accepted release and accepted recovery point outside the former source operation  | Operator and product    |
| Start application and state | Recovery, initialization, or migration based on observed state                    | Bartl and product logic |
| Activate service            | Stable address, exclusive write authority, fencing, acceptance, and forward rules | Operator                |

The table deliberately separates the reusable startup mechanism from the switching procedure. It promises neither a complete provider switch nor automatic reachability or trustworthiness.

## Reference and evidence boundaries

The executable [bartl-wordpress](https://codeberg.org/bartlapp/bartl-wordpress) reference makes the contract inspectable for WordPress. State, image contents, target configuration, and startup decision can be traced in code.

The reference demonstrates the application-and-state contract for this pinned application class. It does not demonstrate conformance for other products, fixed RPO or RTO values, or a complete end-to-end provider switch. Those proofs arise only from the respective product, an accepted recovery set, the target environment, and an executed drill.

## Terminology foundations and sources

The terminology follows established primary sources without treating their different scopes as interchangeable:

- The German IT Planning Council's [Strategy for Strengthening Digital Sovereignty](https://www.it-planungsrat.de/fileadmin/beschluesse/2021/Beschluss2021-09_Strategie_zur_Staerkung_der_digitalen_Souveraenitaet.pdf) treats sovereignty as independent, self-determined, and secure agency. The ability to switch, the ability to shape technology, and influence over providers are separate strategic objectives.
- [NIST Cyber Resiliency](https://csrc.nist.gov/glossary/term/cyber_resiliency) is the ability to anticipate, withstand, recover from, and adapt to adverse conditions so that mission or business objectives can be achieved.
- The [BSI Standard 200-4 for Business Continuity Management](https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Standards-und-Zertifizierung/IT-Grundschutz/BSI-Standards/BSI-Standard-200-4-Business-Continuity-Management/bsi-standard-200-4_Business_Continuity_Management_node.html) derives recovery requirements from time-critical business processes and distinguishes the minimum business continuity objective, RTO/RPO, RTA/RPA, recovery, and restoration. It also permits alternate resources and procedures for continuity operation.
- The [EU Data Act](https://eur-lex.europa.eu/eli/reg/2023/2854/oj/eng) defines switching between data-processing services of the same service type or to on-premises infrastructure. That legal switching concept requires neither the same application nor a successful disaster-recovery drill.
- [DORA](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32022R2554) describes digital operational resilience as continued operational integrity and reliability during disruption, including through ICT third-party providers. Resilience alone therefore does not demonstrate independent switchability.

The Bartl orientation is compatible with the terminology and requirements logic of BSI Standard 200-4. It starts with mission and service, uses threat-specific protection profiles, separates continuity from normal operation, and requires measured evidence. The Bartl pattern alone is neither a business continuity management system nor complete evidence of BSI conformance. Evidence that the applicable BSI Standard 200-4 requirements are met arises only within an organizational scope from the protection profile, roles, chained recovery contracts, target environment, plans, functional acceptance, and executed exercises.

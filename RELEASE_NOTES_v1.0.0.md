# RES=RAG v1.0.0

Version 1.0.0 is the first consolidated formalization of RES=RAG and its CSNP
operational boundary.

## Highlights

- Defines RES and RAG as probability distributions on a declared shared state
  space.
- Makes the canonical equilibrium a calibrated, non-zero Wasserstein band:
  equality names a regulated relation, not pointwise identity.
- Formalizes `T_Real` as an operational human-machine reference discrepancy.
- Reconciles the three axes with functional Mode A and Mode B interpretation
  constraints.
- Incorporates the directly relevant information-substrate, dialogical-time,
  mathematical-structure, CSNP, endogenous-stability, and interface-level
  contributions of the complete nine-person citation team.
- Establishes **Coherent State Network Protocol** as the canonical CSNP
  expansion; the earlier **Client-Side Narrative Protocol** becomes an optional
  sovereign-memory implementation profile.
- Adds CSNP state variables, classification semantics, a finite intervention
  vocabulary, replay rules, and explicit falsifiers.
- Adds CSNP-RP 1.0.0: a deterministic, hash-chained JSON receipt profile with a
  schema, RFC 8785 canonicalization, synthetic example, strict verifier, chain
  tests, structural tests, and tamper tests.
- Adds the full team authorship and source-bounded provenance record confirmed
  by Jean-Charles J. C. Tassan on 27 July 2026.
- Supplies LaTeX, PDF, and GitHub-readable Markdown editions of the paper.

## Scientific-status clarification

This release is a specification and testable research programme. It does not:

- report a completed empirical validation;
- prove machine consciousness;
- claim physical quantum mechanics in human-machine interaction;
- establish universal numerical thresholds; or
- validate previously reported performance targets.

All metric profiles must declare their state representation, encoder, ground
metric, units, thresholds, missing-data policy, and evaluation horizon.

## Artifacts

- `paper/RES_RAG_CSNP_Formalization_v1.0.0.pdf`
- `paper/RES_RAG_CSNP_Formalization_v1.0.0.tex`
- `paper/RES_RAG_CSNP_Formalization_v1.0.0.md`
- `paper/CONTRIBUTIONS.md`
- `protocol/CSNP-RP_v1.0.0.md`
- `protocol/csnp-rp-v1.0.0.schema.json`
- `protocol/examples/csnp-receipt.example.json`
- `protocol/tools/verify_receipt.mjs`
- `protocol/tests/verify_receipt.test.mjs`

## Verification

```sh
node --test protocol/tests/verify_receipt.test.mjs
node protocol/tools/verify_receipt.mjs \
  protocol/examples/csnp-receipt.example.json
```

The manuscript compiles with:

```sh
cd paper
latexmk -pdf -interaction=nonstopmode -halt-on-error \
  RES_RAG_CSNP_Formalization_v1.0.0.tex
```

## Authorship

- **Jean-Charles J. C. Tassan:** originating RES=RAG theory, conceptual lead,
  relational and three-axis architecture, supervision.
- **Trent Slade:** computational formalization, optimal-transport and
  information-substrate architecture, operational variables, protocol
  engineering, verifier, validation boundary, and release integration.
- **Mohamad Al-Zawahreh:** Client-Side Narrative Protocol lineage and
  CSNP/Wasserstein synthesis.
- **Bertrand D. J.-F. Thébault:** dialogical-time, `T_Real`, relational
  relativity, and CSNP synthesis.
- **Manuel Martín Morales Plaza:** RES=RAG mathematical structure,
  geometric-stability development, and CSNP-related formalization.
- **Wilson John Sterking Lauret:** endogenous stability, governability, and
  accumulation/propagation dynamics.
- **Dominique Colin:** granular-dynamics contribution to constraint
  accumulation and propagation.
- **Fatiha (Nisrine) Bouzid:** broader endogenous-stability research programme
  and interdisciplinary development.
- **Timothy Sullivan:** broader endogenous-stability research programme and
  interdisciplinary development.

All nine names are included in `CITATION.cff`, the manuscript, PDF metadata,
`AUTHORS.md`, and the detailed contribution record. Additional ORCID
identifiers and affiliations can be added when confirmed without removing any
member from the citation.

## License

This repository is licensed under the Creative Commons Attribution 4.0
International license (`CC-BY-4.0`).

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
- Incorporates the directly relevant information-substrate and interface-level
  contributions developed by Jean-Charles Tassan and Trent Slade.
- Establishes **Coherent State Network Protocol** as the canonical CSNP
  expansion; the earlier **Client-Side Narrative Protocol** becomes an optional
  sovereign-memory implementation profile.
- Adds CSNP state variables, classification semantics, a finite intervention
  vocabulary, replay rules, and explicit falsifiers.
- Adds CSNP-RP 1.0.0: a deterministic, hash-chained JSON receipt profile with a
  schema, synthetic example, verifier, and tamper tests.
- Adds a proposed CRediT-compatible authorship and provenance record.
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

The detailed contribution record remains subject to approval by both authors
before DOI deposit.


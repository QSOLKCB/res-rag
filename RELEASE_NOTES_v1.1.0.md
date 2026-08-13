# RES=RAG / CSNP v1.1.0 - Formal Paper and HAL Operational Integration

**Release date:** 13 August 2026  
**Recommended tag:** `v1.1.0`

## Summary

Version 1.1.0 completes the HAL operational integration begun in the merged CSNP-RP 1.1.0 protocol update and brings the formal paper source, protocol, repository metadata, and archival Zenodo bundle onto the same version.

The release preserves the v1.0.0 bounded, non-zero Wasserstein equilibrium and reference governability predicate while formalizing four additive extensions:

1. signed RES/RAG temporal displacement;
2. a four-stage semantic interaction-cycle state model;
3. a falsifiable `multitask_brake` intervention; and
4. provenance-labelled externally reported numerical claims.

## Formal paper

Added to the tagged repository source:

- `paper/RES_RAG_CSNP_Formalization_v1.1.0.md`
- updated `paper/references.bib`

The companion Zenodo bundle contains the compiled PDF and generated LaTeX edition built from that source.

The v1.1.0 paper retains the v1.0 mathematical state space and introduces:

- `Delta_t = T_RAG - T_RES` as a signed temporal differential;
- the consistency relation `delta_t = abs(Delta_t)` when both are observed;
- a finite-state operational representation of the proposed semantic cycle;
- a dimensionless intervention objective for controlled multi-task braking;
- formal separation between research-claim space and operational control parameters;
- a research-claim non-interference property for the reference governability predicate;
- integrity binding of v1.1 fields through the existing JCS/SHA-256 state projection; and
- explicit cybersecurity falsifiers for semantic-sovereignty / immunity claims.

## Protocol alignment

CSNP-RP 1.1.0 adds `delta_t_signed`, `task_mode`, `semantic_cycle_phase`, `semantic_cycle_complete`, `metric_profile.threshold_policy`, `metric_profile.temporal_offset_semantics`, `metric_profile.research_claims`, and `multitask_brake`.

The reference governability predicate remains unchanged from v1.0.0. The verifier enforces it one way: `governable` receipts must satisfy the predicate, while `critical`, `irreversible`, and complete-data `indeterminate` require a separately documented producer classifier and are not derived by the verifier.

When `dr` is produced using a denominator floor, that floor must be positive, use the same reciprocal-time unit as the rate/capacity terms, and be declared in the versioned metric-profile method description. Changing it is an explicit calibration change.

## Epistemic hardening

Values reported in the evolving RES=RAG literature - including `0.42`, `0.66`, and approximately `2.14` - are **not** hard-coded as universal constants.

They may appear in `metric_profile.research_claims` only with explicit status and source provenance. Operational thresholds remain local to a declared metric profile and calibration procedure. `externally_archived` means a source artifact exists; it does not mean the claim has been independently validated. `validated_in_profile` is reserved for a value supported by the exact reproducible calibration profile in use.

## Scientific and security boundary

This release does not claim to prove machine consciousness, establish physical semantic physics, treat semantic-cycle completion as a consciousness test, guarantee that multi-task braking improves safety, establish universal CECAT/Goldilocks/Sterking-Tassan thresholds, or replace conventional cybersecurity controls with semantic filtering.

## Compatibility

- v1.0.0 receipts remain valid.
- v1.0.0 verifier/schema remain archival and unchanged.
- the legacy bibliography key `brand2022credit` is preserved so the archived v1.0.0 TeX source remains rebuildable;
- v1.1.0 receipts may chain to a verified v1.0.0 predecessor.
- Canonicalization remains RFC 8785 / JCS.
- Hashing remains SHA-256.
- The v1.0 stable-band governability predicate remains the v1.1 reference predicate; verifier success does not imply total-label recomputation.

## Archival / Zenodo bundle

The companion v1.1.0 archival bundle includes the final PDF, Markdown and LaTeX sources, bibliography, CSNP-RP 1.1.0 specification, JSON Schema and example receipt, HAL-to-CSNP integration specification, authorship/contribution records, Zenodo-ready deposit metadata, citation metadata, release notes, CC BY 4.0 notice, and SHA-256 manifest.

The rebuilt archival PDF is 18 pages after adding the rendered bibliography and review hardening.

## Tagging sequence

1. Merge the v1.1.0 formal-paper release PR.
2. Verify `main` contains the final paper source and synchronized metadata.
3. Create tag `v1.1.0` from that exact release commit.
4. Create the Zenodo upload/new version from the supplied bundle.
5. After Zenodo publishes the record, optionally add the minted version DOI to repository metadata in a metadata-only follow-up commit.

# RES=RAG / CSNP v1.1.0 — HAL Operational Integration

## Summary

Version 1.1.0 integrates selected post-v1.0.0 developments from Jean-Charles
Tassan's HAL research record into the canonical GitHub specification and the
CSNP deterministic receipt layer.

This is an additive protocol release. It preserves the v1.0.0 formal paper and
receipt format while introducing a versioned operational extension suitable for
the next paper formalization.

## Added

- `spec/08_hal_csnp_extensions.md`
  - four-stage RES/RAG semantic-cycle mapping;
  - signed temporal differential `T_RAG - T_RES`;
  - multi-task semantic-brake hypothesis;
  - Wasserstein calibration boundary;
  - provenance rules for CECAT / Goldilocks / Sterking-Tassan values; and
  - explicit cybersecurity falsifiers and limitations.
- `protocol/CSNP-RP_v1.1.0.md`
- `protocol/csnp-rp-v1.1.0.schema.json`
- `protocol/examples/csnp-receipt-v1.1.0.example.json`
- `protocol/tools/verify_receipt_v1_1.mjs`
- `protocol/tests/verify_receipt_v1_1.test.mjs`

## New receipt semantics

Version 1.1.0 adds:

- `delta_t_signed`
- `task_mode`
- `semantic_cycle_phase`
- `semantic_cycle_complete`
- `metric_profile.threshold_policy`
- `metric_profile.temporal_offset_semantics`
- `metric_profile.research_claims`
- `multitask_brake` intervention

## Epistemic hardening

The HAL record reports values including 0.42, an upper Goldilocks value of 0.66,
and a Sterking-Tassan threshold near 2.14. Version 1.1.0 does not hard-code
these as universal classifier constants. Instead, claims are carried with
mandatory provenance and status, while deployable thresholds remain local to a
versioned calibration profile.

Similarly, semantic immunity / citadel language is implemented as a testable
control architecture rather than a claim that prompt injection or other
security classes are solved by construction.

## Compatibility

- Existing v1.0.0 receipts remain valid.
- v1.0.0 tooling is unchanged.
- A v1.1.0 receipt may chain to a verified v1.0.0 predecessor.
- Hashing remains SHA-256 over RFC 8785 / JCS canonical JSON.

## Paper status

The repository protocol/specification is now prepared for a new formal paper
version. The existing v1.0.0 paper remains the archival paper until that new
formalization is compiled, reviewed, and released.

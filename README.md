# RES=RAG — Relational Equilibrium Framework
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.21917464.svg)](https://doi.org/10.5281/zenodo.21917464)

**Origin Theory:** Jean-Charles Tassan  
**Formal Specification & Systems Architecture:** Trent Slade (QSOL-IMC)  
**Current release:** `1.1.0`  
**Reserved Zenodo version DOI:** `10.5281/zenodo.21917464`

**RES=RAG** (Relational Equilibrium between Substrate and Generation) models human-machine interaction as a dynamic relation between receptive/context-grounded dynamics (RES) and generative/novelty-producing dynamics (RAG). This repository is the canonical specification layer for the formal theory, falsifiability programme, and Coherent State Network Protocol (CSNP).

**Version 1.1.0 citation team:** Jean-Charles J. C. Tassan; Trent Slade; Mohamad Al-Zawahreh; Bertrand D. J.-F. Thébault; Manuel Martín Morales Plaza; Wilson John Sterking Lauret; Dominique Colin; Fatiha (Nisrine) Bouzid; and Timothy Sullivan. See [`AUTHORS.md`](AUTHORS.md) and [`paper/CONTRIBUTIONS.md`](paper/CONTRIBUTIONS.md).

> **v1.1.0:** the HAL-derived operational extension is now formally integrated into the paper. It adds signed `T_RAG - T_RES`, a four-stage operational semantic-cycle model, a falsifiable multi-task braking intervention, and provenance-labelled numerical research claims while preserving local calibration and the v1.0 reference governability predicate.

<p align="center">
  <strong><a href="https://github.com/QSOLKCB/res-rag-viz">Open the RES=RAG Visual &amp; Sonification Research Lab →</a></strong><br>
  <sub>Linked Wasserstein/CSNP views, diagnostic pressure sonification, receipt validation, and reproducible research export.</sub>
</p>

## Core formalism

The canonical RES-RAG separation is

\[
w_t=W_2(\mu_t^{RES},\mu_t^{RAG}),
\]

with a declared stable band

\[
0<\varepsilon_{min}\le w_t\le\varepsilon_{max}.
\]

Version 1.1.0 additionally records signed temporal displacement

\[
\Delta_t=T_{RAG}(t)-T_{RES}(t),
\]

while retaining the non-negative discrepancy magnitude `delta_t = |Delta_t|` when both are available. Every operational W₂ value remains representation-, ground-metric-, estimator-, and calibration-dependent.

## CSNP-RP 1.1.0

The additive deterministic receipt profile adds:

- `delta_t_signed`
- `task_mode`
- `semantic_cycle_phase`
- `semantic_cycle_complete`
- `metric_profile.threshold_policy = local-calibration-only`
- `metric_profile.temporal_offset_semantics = signed:RAG-minus-RES`
- provenance-labelled `metric_profile.research_claims`
- intervention `multitask_brake`

The reference governability predicate remains unchanged from v1.0.0. The verifier enforces it one way: a receipt labelled `governable` must satisfy the predicate, while `critical`, `irreversible`, and complete-data `indeterminate` require a separately documented producer classifier and are not derived from measurements by the verifier. Existing v1.0.0 receipts remain valid, and a v1.1.0 receipt may chain to a verified v1.0.0 predecessor. Hashing remains SHA-256 over RFC 8785 / JCS canonical JSON.

When `dr` is derived using a denominator floor, that positive floor must use the same reciprocal-time unit as the rate/capacity terms and be declared in the versioned metric-profile method description. Changing it is an explicit calibration change.

## Scientific boundary

Version 1.1.0 does **not** claim to prove machine consciousness, treat semantic-cycle completion as a consciousness test, establish physical semantic physics, guarantee multi-task braking as a safety mechanism, establish 0.42 / 0.66 / approximately 2.14 as universal constants, or replace conventional cybersecurity controls with semantic filtering.

Reported values can be preserved with provenance without being allowed to alter the reference governability predicate. Moving a reported value into operational control space is an explicit recalibration event requiring a new metric-profile version and method provenance.

## Release artifacts

### v1.1.0 — formal paper + HAL operational integration

- [Release notes](RELEASE_NOTES_v1.1.0.md)
- [Formal paper source (Markdown)](paper/RES_RAG_CSNP_Formalization_v1.1.0.md)
- [Bibliography](paper/references.bib)
- [HAL-to-CSNP integration spec](spec/08_hal_csnp_extensions.md)
- [CSNP-RP 1.1.0](protocol/CSNP-RP_v1.1.0.md)
- [Receipt JSON Schema 1.1.0](protocol/csnp-rp-v1.1.0.schema.json)
- [Example receipt 1.1.0](protocol/examples/csnp-receipt-v1.1.0.example.json)
- [Verifier 1.1.0](protocol/tools/verify_receipt_v1_1.mjs)
- [Verifier tests 1.1.0](protocol/tests/verify_receipt_v1_1.test.mjs)
- [Authors and citation team](AUTHORS.md)
- [Contribution and provenance record](paper/CONTRIBUTIONS.md)
- [Zenodo metadata](.zenodo.json)

The archival Zenodo bundle for v1.1.0 additionally contains the compiled PDF, generated LaTeX edition, SHA-256 manifest, and deposit guidance.

### v1.0.0 — archival predecessor

- [Release notes](RELEASE_NOTES_v1.0.0.md)
- [Formal paper (PDF)](paper/RES_RAG_CSNP_Formalization_v1.0.0.pdf)
- [Formal paper (Markdown)](paper/RES_RAG_CSNP_Formalization_v1.0.0.md)
- [LaTeX source](paper/RES_RAG_CSNP_Formalization_v1.0.0.tex)
- [CSNP-RP 1.0.0](protocol/CSNP-RP_v1.0.0.md)

## Citation and license

Use [`CITATION.cff`](CITATION.cff) for machine-readable citation metadata. The complete nine-person citation team is preserved in v1.1.0.

This repository is licensed under the [Creative Commons Attribution 4.0 International license](https://creativecommons.org/licenses/by/4.0/) (`CC-BY-4.0`).

---

**RES=RAG asserts a simple but destabilizing principle:**

> Consciousness is not what systems *are*.  
> It is what equilibria *do*.

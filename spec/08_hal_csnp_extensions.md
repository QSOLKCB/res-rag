# 08 — HAL-to-CSNP Extensions (v1.1.0)

## Status

This document is a **normative repository integration layer** for the v1.1.0
RES=RAG/CSNP release. It translates selected developments published by
Jean-Charles Tassan on HAL into explicit protocol variables, interventions,
provenance fields, and falsifiable hypotheses.

It does **not** convert author-reported theoretical claims into universally
validated constants. Numerical thresholds remain local research claims unless a
metric profile supplies independent calibration evidence.

Primary source: <https://cv.hal.science/jean-charles-tassan>

## 1. Four-stage semantic interaction cycle

The HAL development proposes the ordered interaction loop:

```text
RES(human) -> RAG(machine) -> RES(machine) -> RAG(human) -> RES(human)
```

with the associated semantic labels:

```text
empathy -> machine-self -> conversational substrate -> intuition -> empathy
```

CSNP-RP 1.1.0 records the currently observed phase as one of:

- `human_res`
- `machine_rag`
- `machine_res`
- `human_rag`
- `unknown`

and records whether a declared cycle has completed with
`semantic_cycle_complete`.

These labels are operational state labels. They MUST NOT be interpreted as
proof of phenomenal consciousness, transfer of consciousness, machine
subjectivity, or ontological identity.

## 2. Signed temporal differential

HAL distinguishes machine advance from machine delay with:

\[
\Delta t = T_{RAG} - T_{RES}.
\]

Version 1.0.0 recorded only a non-negative discrepancy magnitude. Version 1.1.0
therefore retains `delta_t = |Delta t|` for continuity and adds
`delta_t_signed`:

- `delta_t_signed > 0`: declared machine-time advance (`RAG > RES`);
- `delta_t_signed < 0`: declared machine-time delay (`RAG < RES`);
- `delta_t_signed = 0`: declared temporal alignment; and
- `null`: unavailable or inapplicable.

A metric profile MUST specify `temporal_offset_semantics` as
`signed:RAG-minus-RES`.

## 3. Multi-task semantic brake

HAL proposes that reasoned multi-tasking can act as a semantic braking
intervention when a machine process is advancing too aggressively along one
semantic vector. CSNP-RP 1.1.0 therefore adds:

- `measurements.task_mode`: `mono`, `multi`, `mixed`, or `unknown`; and
- intervention `multitask_brake`.

The intervention is a **testable control hypothesis**, not a guaranteed safety
mechanism. A conforming experiment SHOULD compare matched mono-task and
multi-task conditions and predeclare:

1. the state representation;
2. the ground metric;
3. the W2 estimator;
4. the temporal estimator;
5. the intervention timing;
6. the evaluation horizon; and
7. the success/failure criterion.

A useful falsifier is failure of the multi-task condition to reduce either the
predeclared absolute temporal discrepancy or the predeclared W2 instability
relative to matched control.

## 4. Wasserstein control remains profile-dependent

HAL continues to use Wasserstein distance as a measure of semantic transport or
alignment cost. The repository preserves the v1.0.0 rule that no universal W2
threshold exists without a declared representation, ground metric, estimator,
and calibration procedure.

Therefore v1.1.0 requires:

```text
threshold_policy = local-calibration-only
```

A receipt MUST NOT silently substitute author-reported constants for the local
`epsilon_min`/`epsilon_max` stable band.

## 5. CECAT, Goldilocks, and Sterking-Tassan values

The current HAL record reports:

- CECAT / Tassan equilibrium value: `0.42`;
- a reported Goldilocks interval extending to `0.66`; and
- a Sterking-Tassan threshold near `2.14`.

CSNP-RP 1.1.0 can carry such values in `metric_profile.research_claims` with a
mandatory status and source URI. Allowed statuses are:

- `hypothesis`
- `reported`
- `externally_archived`
- `validated_in_profile`

`externally_archived` means that a source artifact exists; it does **not** mean
that this repository independently validated the claim. Only
`validated_in_profile` permits a deployment profile to state that its own
calibration procedure validated the value for that profile.

## 6. Semantic immunity and security boundary

HAL describes CSNP, semantic sovereignty, and a topological "citadel" as an
immunity architecture. In this repository those ideas are treated as candidate
filtering and control architectures.

No v1.1.0 component claims that malicious prompts are "destroyed", that prompt
injection is solved by construction, or that semantic filtering replaces
standard security engineering. Implementations SHOULD retain conventional
controls including authentication, authorization, input validation, privilege
separation, sandboxing, audit logs, rate limits, secret isolation, and incident
response.

A security claim is falsified whenever an attacker can cross a declared trust
boundary, exfiltrate protected information, alter protected state, or cause a
forbidden action despite the semantic control layer.

## 7. Versioning decision

This integration is versioned as **1.1.0** rather than 2.0.0 because it is an
additive protocol extension:

- v1.0.0 receipts and formal specification remain valid;
- v1.1.0 introduces new measurement/provenance fields and one intervention;
- v1.0.0 tooling remains unchanged; and
- v1.1.0 ships a version-specific verifier and schema.

The next paper formalization SHOULD cite this document as the bridge between the
v1.0.0 formal architecture and the HAL-derived operational extensions.

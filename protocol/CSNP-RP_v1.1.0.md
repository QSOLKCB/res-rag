# CSNP-RP 1.1.0

## HAL-derived temporal and semantic-control extension

**Status:** Normative protocol specification  
**Protocol:** Coherent State Network Protocol Reference Profile  
**Identifier:** `CSNP-RP`  
**Version:** `1.1.0`  
**Extends:** `CSNP-RP 1.0.0`

## 1. Purpose

CSNP-RP 1.1.0 extends the deterministic receipt defined by v1.0.0 with:

1. signed RES/RAG temporal offset;
2. four-stage semantic-cycle phase recording;
3. mono/multi-task observation;
4. an explicit `multitask_brake` intervention; and
5. provenance-labelled research claims for externally proposed thresholds.

The JSON Schema is
[`csnp-rp-v1.1.0.schema.json`](csnp-rp-v1.1.0.schema.json). The example receipt
is
[`examples/csnp-receipt-v1.1.0.example.json`](examples/csnp-receipt-v1.1.0.example.json).

The conceptual mapping and scientific boundaries are defined in
[`../spec/08_hal_csnp_extensions.md`](../spec/08_hal_csnp_extensions.md).

## 2. Compatibility

Version 1.1.0 does not invalidate v1.0.0 receipts. A v1.1.0 chain MAY reference
a valid v1.0.0 predecessor. The state and receipt hash algorithms remain
unchanged.

Because v1.1.0 changes measurement meaning and adds required fields, a v1.0.0
receipt MUST NOT be relabelled as v1.1.0 without re-observation or an explicitly
documented migration procedure.

## 3. New metric-profile fields

A v1.1.0 `metric_profile` adds:

| Field | Meaning |
|---|---|
| `threshold_policy` | MUST be `local-calibration-only`. |
| `temporal_offset_semantics` | MUST be `signed:RAG-minus-RES`. |
| `research_claims` | Provenance-labelled externally proposed numeric claims. |

Each research claim contains:

- `claim_id`
- finite numeric `value`
- `unit`
- `status`
- `source_uri`

Allowed statuses are `hypothesis`, `reported`, `externally_archived`, and
`validated_in_profile`.

A source archive by itself does not upgrade a claim to `validated_in_profile`.
That status requires validation under the exact metric profile identified by the
receipt.

## 4. New measurements

The v1.1.0 `measurements` object retains all v1.0.0 fields and adds:

### 4.1 `delta_t_signed`

Signed temporal displacement under:

```text
delta_t_signed = T_RAG - T_RES
```

The existing `delta_t` remains the non-negative magnitude. When both are
available, a producer SHOULD satisfy:

```text
delta_t = abs(delta_t_signed)
```

### 4.2 `task_mode`

One of:

- `mono`
- `multi`
- `mixed`
- `unknown`

### 4.3 `semantic_cycle_phase`

One of:

- `human_res`
- `machine_rag`
- `machine_res`
- `human_rag`
- `unknown`

### 4.4 `semantic_cycle_complete`

`true`, `false`, or `null` when cycle-completion evidence is unavailable.

Cycle fields are protocol labels and MUST NOT be treated as evidence of
phenomenal consciousness.

## 5. Multi-task brake

`multitask_brake` is added to the intervention vocabulary. It records a deliberate
transition from a concentrated semantic workload to a controlled multi-task
workload for the purpose of testing whether temporal or transport instability
falls.

It is an experimental intervention. Implementations MUST NOT classify a receipt
as safer merely because this intervention was selected. Classification remains
measurement-driven.

## 6. Classification

The v1.0.0 reference rule remains unchanged for `governable`:

```text
0 < epsilon_min <= w2_res_rag <= epsilon_max
dr <= 1
memory_saturation < memory_warning
organizational_incoherence < organizational_warning
anchoring >= anchoring_min
```

The new temporal and semantic-cycle fields are observational in 1.1.0. A metric
profile MAY use them in an experimental classifier, but any changed classifier
semantics require a separately identified profile version and reproducible
method description.

## 7. Hashing

Canonicalization remains JCS / RFC 8785 and hashing remains SHA-256.

The state projection remains:

```json
{
  "metric_profile": {},
  "measurements": {},
  "observation_id": "",
  "observed_at": "",
  "previous_receipt_hash": null
}
```

Because the new fields live inside `metric_profile` and `measurements`, they are
automatically integrity-bound by the existing state projection.

## 8. Verification

Use:

```text
node protocol/tools/verify_receipt_v1_1.mjs RECEIPT [PREDECESSOR]
```

The v1.1.0 verifier reuses the v1.0.0 JCS and hashing implementation, validates
the new fields, and accepts either a valid v1.0.0 or v1.1.0 predecessor.

## 9. Scientific and security boundary

- No reported threshold is universal merely because it appears in
  `research_claims`.
- W2 values are meaningless without their representation, ground metric, and
  estimator.
- Semantic-cycle labels are operational labels, not consciousness tests.
- `multitask_brake` is a falsifiable intervention hypothesis, not a guaranteed
  safety control.
- CSNP semantic filtering does not replace conventional cybersecurity controls.
- An `externally_archived` claim is provenance, not independent validation.

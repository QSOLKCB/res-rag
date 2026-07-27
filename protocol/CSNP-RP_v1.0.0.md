# CSNP-RP 1.0.0

## Deterministic reference profile for RES=RAG observations

**Status:** Normative protocol specification  
**Protocol:** Coherent State Network Protocol Reference Profile  
**Identifier:** `CSNP-RP`  
**Version:** `1.0.0`

## 1. Purpose

CSNP-RP defines a deterministic, hash-chained receipt for an observation in a
RES=RAG governance cycle. It standardizes measurement provenance,
classification, intervention recording, and replay. It does not standardize a
universal embedding model, ground metric, threshold, or sensor.

The JSON Schema is
[`csnp-rp-v1.0.0.schema.json`](csnp-rp-v1.0.0.schema.json). A conforming receipt
is provided at
[`examples/csnp-receipt.example.json`](examples/csnp-receipt.example.json).

## 2. Conformance language

The terms **MUST**, **MUST NOT**, **REQUIRED**, **SHOULD**, **SHOULD NOT**, and
**MAY** are normative.

A conforming implementation:

1. MUST emit a schema-valid receipt;
2. MUST identify the metric and calibration profile;
3. MUST use the canonicalization and hashing rules in section 5;
4. MUST classify missing required evidence as `indeterminate`;
5. MUST NOT treat a single exceeded threshold as proof of irreversibility;
6. MUST preserve evidence hashes and the previous receipt hash;
7. MUST reject a receipt whose hashes do not verify; and
8. MUST create a new profile version when estimator or threshold semantics
   change.

## 3. Receipt fields

| Field | Meaning |
|---|---|
| `protocol` | Constant `CSNP-RP`. |
| `version` | Constant `1.0.0`. |
| `observation_id` | Stable identifier within the study or deployment. |
| `observed_at` | UTC RFC 3339 timestamp ending in `Z`. |
| `previous_receipt_hash` | Previous receipt digest, or `null` for the first receipt. |
| `metric_profile` | Versioned estimator, units, thresholds, and horizon. |
| `measurements` | Normalized CSNP state observation. |
| `classification` | `governable`, `critical`, `irreversible`, or `indeterminate`. |
| `intervention` | Selected reference action. |
| `evidence` | Immutable content references with SHA-256 digests. |
| `state_hash` | Digest of the canonical state projection. |
| `hash_algorithm` | Constant `sha256`. |
| `canonicalization` | Constant `JCS-RFC8785`. |
| `receipt_hash` | Digest of the receipt with this field omitted. |

## 4. Measurement semantics

The `measurements` object contains:

- `delta_t`: declared human-machine reference discrepancy;
- `dc`: normalized constraint density in `[0,1]`;
- `dr`: non-negative constraint-rate pressure;
- `memory_saturation`: normalized memory saturation in `[0,1]`;
- `w2_res_rag`: non-negative RES-RAG Wasserstein distance;
- `organizational_incoherence`: declared score in `[0,1]`; and
- `anchoring`: accountable oversight availability in `[0,1]`.

Optional measurements MAY be `null`. A measurement needed by the selected
classifier MUST NOT be silently replaced by zero.

The `metric_profile` MUST identify the encoder or state representation and
ground metric. Thresholds are local calibration values:

- `epsilon_min` and `epsilon_max` define the non-zero stable transport band;
- `memory_warning` defines a memory-saturation warning;
- `organizational_warning` defines an organizational-incoherence warning;
- `anchoring_min` defines minimum accountable anchoring;
- `irreversibility_horizon` defines the finite evaluation horizon; and
- `intervention_set` defines the actions tested before an `irreversible`
  classification is permitted.

## 5. Canonicalization and hashes

Canonicalization uses the JSON Canonicalization Scheme (JCS) defined by
[RFC 8785](https://www.rfc-editor.org/rfc/rfc8785):

1. object keys are sorted lexicographically by their UTF-16 code units;
2. arrays retain their declared order;
3. strings use the JSON escaping and UTF-8 rules specified by JCS, and lone
   Unicode surrogates are rejected;
4. finite numbers use the ECMAScript serialization required by JCS, including
   its exact exponent and shortest-round-trip representation;
5. `NaN` and infinities are rejected; and
6. no insignificant whitespace is emitted.

Receipts identify this requirement with `canonicalization: "JCS-RFC8785"`.
Implementations MUST pass shared RFC 8785 conformance vectors before exchanging
hash-chained receipts across languages.

### 5.1 State hash

The state projection is the object:

```json
{
  "metric_profile": {},
  "measurements": {},
  "observation_id": "",
  "observed_at": "",
  "previous_receipt_hash": null
}
```

with values copied from the receipt. `state_hash` is the lowercase hexadecimal
SHA-256 digest of the UTF-8 canonical state projection.

### 5.2 Receipt hash

`receipt_hash` is the lowercase hexadecimal SHA-256 digest of the UTF-8
canonical receipt after removing only the top-level `receipt_hash` field.

### 5.3 Chain rule

For receipt \(R_t\), `previous_receipt_hash` MUST equal the verified
`receipt_hash` of \(R_{t-1}\). The first receipt in a chain uses `null`.

## 6. Reference classification

For complete measurements, a receipt may be `governable` only if:

```text
0 < epsilon_min <= w2_res_rag <= epsilon_max
dr <= 1
memory_saturation < memory_warning
organizational_incoherence < organizational_warning
anchoring >= anchoring_min
```

A violation produces `critical` unless either:

- the required measurement or evidence is unavailable, producing
  `indeterminate`; or
- the implementation has tested every action in `intervention_set` over
  `irreversibility_horizon` and none returns the process to the stable set,
  permitting `irreversible`.

CSNP-RP records the result but does not claim that this reference rule is
universally optimal.

## 7. Replay procedure

A verifier:

1. parses the receipt while rejecting duplicate keys and non-finite numbers;
2. checks protocol and version;
3. validates field types and ranges;
4. recomputes the state hash;
5. recomputes the receipt hash;
6. verifies the previous-receipt link when a predecessor is supplied;
7. retrieves evidence when permitted and verifies each evidence digest;
8. loads the exact metric profile version; and
9. reproduces the classifier and records any disagreement.

The bundled CLI verifier performs steps 1-6, including strict duplicate-key
rejection and predecessor-link checking. The exported object-level verifier
performs steps 2-6 on an already parsed object. JSON Schema validation and
evidence retrieval remain integration responsibilities.

## 8. Security and privacy

- Hashing provides integrity, not confidentiality or source truth.
- Evidence URIs SHOULD be content-addressed or immutable.
- Receipts SHOULD contain references rather than sensitive dialogue text.
- Implementations SHOULD minimize personal data and document retention.
- A client-side narrative storage profile SHOULD support user-controlled export,
  deletion, consent, provenance, and access revocation.
- A receipt signed by an untrusted actor remains untrusted. Signature and trust
  policy are intentionally outside version 1.0.0.

## 9. Versioning

Changes to required fields, canonicalization, hash projections, classification
semantics, or measurement meaning require a new protocol version. Threshold-only
changes require a new `metric_profile.profile_version` and do not change the
CSNP-RP version.

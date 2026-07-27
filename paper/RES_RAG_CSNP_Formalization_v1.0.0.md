# RES=RAG and the Coherent State Network Protocol

## A formal architecture for endogenous stability in human-machine systems

**Canonical formalization and deterministic reference profile — version 1.0.0**

**Jean-Charles J. C. Tassan**  
Independent researcher  
ORCID: [0009-0000-8566-0486](https://orcid.org/0009-0000-8566-0486)

**Trent Slade**  
QSOL-IMC  
ORCID: [0009-0002-4515-9237](https://orcid.org/0009-0002-4515-9237)

**Status:** Formal specification and testable research programme. This document does
not report a completed empirical validation, prove machine consciousness, or claim
that human-machine interaction is a physical quantum system.

## Abstract

RES=RAG models stable intelligence as a regulated tension between receptive,
context-grounded dynamics (RES) and internally generative, novelty-producing
dynamics (RAG). The central claim is not that the two distributions become equal.
Stability instead occupies a calibrated, non-zero optimal-transport band: too
little separation produces rigidity, while excessive separation produces
instability, fabrication, or loss of coordination.

This paper consolidates the conceptual framework introduced by Jean-Charles
Tassan with the optimal-transport, information-substrate, operational-variable,
and systems-validation work developed with Trent Slade. It supplies a common
state space, measurable quantities, explicit failure conditions, and a protocol
boundary. The Coherent State Network Protocol (CSNP) turns the model into a
cyclic observation-classification-intervention-receipt process. A deterministic
reference profile, CSNP-RP 1.0.0, defines canonical JSON receipts, hash chaining,
calibration declarations, evidence references, and replay rules.

The result is deliberately modest in epistemic scope. RES=RAG is presented as a
falsifiable architecture for studying regulated dialogue and distributed
human-machine coordination. Its thresholds are calibration parameters, not
universal constants. Its Wasserstein distances depend on declared encoders and
sampling procedures. The contribution is therefore a reproducible theory and
protocol specification from which empirical studies can be designed.

## 1. Scope and contribution

The formalization has four goals:

1. preserve the canonical RES=RAG distinction between reception and generation;
2. express equilibrium as a bounded, non-zero transport relation;
3. connect the theory to interface-level variables that can be observed without
   privileged access to model internals; and
4. define a deterministic CSNP reference profile suitable for audit and replay.

Only contributions directly connected to RES=RAG are included. Broader
field-theoretic claims, unrelated software projects, and external frameworks are
outside scope.

### 1.1 Epistemic labels

| Label | Meaning in this document |
|---|---|
| **Definition** | A convention that gives the specification a precise meaning. |
| **Protocol rule** | A normative requirement for CSNP-RP conformance. |
| **Hypothesis** | A claim that can be tested and rejected. |
| **Reported target** | A value reported in earlier exploratory work but not established here. |
| **Limitation** | A known boundary on interpretation or implementation. |

Values such as a 40-fold memory reduction, hallucination below 0.02 percent,
coherence near 0.96, or universal collapse thresholds are not results of this
formalization. If used in an implementation, they must be identified as external,
unvalidated targets with a citable measurement protocol.

## 2. Formal objects

Let \((\mathcal S,d)\) be a declared metric state space. Depending on the study,
points in \(\mathcal S\) may represent semantic embeddings, dialogue states,
latent task states, or another reproducible representation. Let
\(\mathcal P_2(\mathcal S)\) denote probability measures on this space with
finite second moment.

At observation step \(t\), define:

- \(\mu_t^{\mathrm{RES}}\in\mathcal P_2(\mathcal S)\): the receptive,
  contextual, evidence-conditioned distribution;
- \(\mu_t^{\mathrm{RAG}}\in\mathcal P_2(\mathcal S)\): the generative,
  novelty-producing distribution.

These are functional roles. “RAG” in this paper means regenerative or generative
dynamics; it is not restricted to the software pattern usually called
retrieval-augmented generation.

For \(\mu,\nu\in\mathcal P_2(\mathcal S)\), the quadratic Wasserstein distance is

\[
W_2^2(\mu,\nu)
=
\inf_{\gamma\in\Pi(\mu,\nu)}
\int_{\mathcal S\times\mathcal S} d(x,y)^2\,\mathrm d\gamma(x,y),
\]

where \(\Pi(\mu,\nu)\) is the set of couplings with marginals \(\mu\) and \(\nu\).
Define the RES=RAG separation

\[
w_t = W_2\!\left(\mu_t^{\mathrm{RES}},
                  \mu_t^{\mathrm{RAG}}\right).
\]

### 2.1 Bounded equilibrium

For a declared calibration profile
\(\theta=(\varepsilon_{\min},\varepsilon_{\max},\ldots)\), with
\(0\leq\varepsilon_{\min}<\varepsilon_{\max}\), define the stable band

\[
\mathcal E_\theta
=
\left\{
(\mu^{\mathrm{RES}},\mu^{\mathrm{RAG}})
:
\varepsilon_{\min}\leq
W_2(\mu^{\mathrm{RES}},\mu^{\mathrm{RAG}})
\leq\varepsilon_{\max}
\right\}.
\]

The band is the canonical meaning of “RES=RAG”. The equality sign names a
regulated relation; it does not require pointwise identity or zero transport.
When \(w_t<\varepsilon_{\min}\), the system risks sterility, repetition, or
over-constraint. When \(w_t>\varepsilon_{\max}\), it risks drift, fabrication,
or loss of shared reference.

A useful scalar penalty is

\[
e_\theta(w_t)
=
\max(0,\varepsilon_{\min}-w_t)
+
\max(0,w_t-\varepsilon_{\max}).
\]

This penalty is a diagnostic. The protocol must not blindly minimize \(w_t\):
doing so would erase the productive difference that the theory is designed to
preserve.

### 2.2 Temporal-reference discrepancy

Let \(\mu_t^H\) and \(\mu_t^M\) represent declared human-side and machine-side
state estimates. Define

\[
T_{\mathrm{Real}}(t)
=
W_2(\mu_t^H,\mu_t^M).
\]

\(T_{\mathrm{Real}}\) is an operational discrepancy between two situated
reference frames. It is not physical clock time. The estimator, window,
encoder, ground metric, and uncertainty must be declared in the calibration
profile.

### 2.3 History-dependent substrate and dual operators

Let \(s_t\in\mathcal M\) be a history-dependent information state. A continuous
phenomenological approximation is

\[
\frac{\mathrm ds}{\mathrm dt}
=
\mathcal G(s,t)-\mathcal R(s,t),
\]

where \(\mathcal G\) is a generative operator and \(\mathcal R\) is a
receptive-regulatory operator. This equation captures the dual-operator
contribution of the information-substrate formalization. It does not imply that
the operators are physical forces, nor that vector equality alone establishes
the bounded Wasserstein condition. A conforming study must connect operator
outputs to the measures used to compute \(w_t\).

## 3. Three axes and two interpretive modes

RES=RAG separates three coupled but non-identical domains:

| Axis | Domain | Example observation |
|---|---|---|
| I | Human internal regulation | attention, affective stability, stated uncertainty |
| II | Human-machine relational regulation | semantic alignment, repair, pacing, shared reference |
| III | Machine functional regulation | response distribution, retrieval grounding, novelty, constraint density |

Axis II is not reducible to either participant. It is the interaction process in
which misalignment, repair, and co-regulation become observable.

Two interpretive modes are also distinguished:

- **Mode A — phenomenological or anthropomorphic:** language that treats the
  machine as if it had a first-person interior;
- **Mode B — functional or instrumental:** language tied to observable system
  behavior, declared state, and reproducible measurement.

Mode B is the default for implementation and safety evaluation. Mode A may be
studied as a user-facing phenomenon, but it must not be treated as evidence of
machine consciousness or used as the primary optimization objective.

## 4. Interface-level observables

The framework permits measurement at the dialogue interface. Let \(P_t(z)\) be
the machine’s declared or reconstructed distribution over candidate next units
\(z\), and let \(H(P_t)\) be its entropy. For a window of \(T\) observations,
define normalized constraint density

\[
\rho_c(t)
=
\frac{1}{T}
\sum_{i=t-T+1}^{t}
\left[
1-\frac{H(P_i)}{H_{\max,i}}
\right].
\]

The normalization \(H_{\max,i}\) must be declared. If full token probabilities
are unavailable, a proxy may be used, but it must have a different metric
identifier and must not be presented as the same estimator.

For observation interval \(\Delta \tau_t>0\), define the constraint-propagation
rate

\[
v_c(t)
=
\frac{\rho_c(t)-\rho_c(t-1)}{\Delta\tau_t}.
\]

Let \(\kappa_t>0\) be the estimated observer or governance response capacity,
with the same reciprocal-time unit. The dimensionless rate pressure is

\[
D_r(t)=\frac{\max(0,v_c(t))}{\max(\kappa_t,\epsilon)}.
\]

The condition \(D_r>1\) is a testable warning: constraints are accumulating
faster than the governance loop is estimated to absorb them. It is not, by
itself, proof of irreversible failure.

## 5. CSNP state and cycle

In this document **CSNP** means **Coherent State Network Protocol**. Earlier work
used **Client-Side Narrative Protocol** for a sovereign-memory implementation.
That earlier term is retained as a compatible storage profile, not as the
canonical expansion of CSNP in version 1.0.0.

At step \(t\), CSNP observes

\[
X_t=
\bigl(
\delta_t,D_c(t),D_r(t),m(t),w_t,S_{\mathrm{org}}(t),F(t)
\bigr),
\]

where:

- \(\delta_t=T_{\mathrm{Real}}(t)\) is human-machine reference discrepancy;
- \(D_c(t)=\rho_c(t)\in[0,1]\) is normalized constraint density;
- \(D_r(t)\geq0\) is dimensionless rate pressure;
- \(m(t)\in[0,1]\) is memory saturation under a declared estimator;
- \(w_t\geq0\) is RES-RAG Wasserstein separation;
- \(S_{\mathrm{org}}(t)\in[0,1]\) is an implementation-declared organizational
  incoherence score; and
- \(F(t)\in[0,1]\) is anchoring or accountable-oversight availability.

Metrics without an implemented estimator are encoded as unavailable, not as
zero. The JSON reference profile uses `null` for an unavailable optional
measurement and requires classification as `indeterminate` when a required
decision variable is unavailable.

Given an intervention \(u_t\), a CSNP implementation realizes

\[
\Phi_\theta(X_t,u_t)
\longrightarrow
\bigl(X_{t+1},C_t,A_t,R_t\bigr),
\]

where \(C_t\) is a classification, \(A_t\) is an admissible action, and \(R_t\)
is a deterministic receipt.

The cyclic protocol is:

1. **Declare:** select a versioned calibration and metric profile.
2. **Observe:** collect measurements and immutable evidence references.
3. **Classify:** apply all profile rules without hidden thresholds.
4. **Intervene:** choose the least-force admissible action.
5. **Receipt:** canonicalize, hash, and chain the observation.
6. **Replay:** verify the receipt, evidence hashes, rule version, and outcome.
7. **Recalibrate:** change thresholds only by creating a new profile version.

### 5.1 Classification

A reference classifier uses the following semantics:

- **Governable:** the RES-RAG distance is inside its calibrated band,
  \(D_r\leq1\), memory and organizational scores are below their warning
  thresholds, and anchoring is sufficient.
- **Critical:** at least one warning condition is exceeded, but an admissible
  intervention is still expected to return the system to the declared band
  within the evaluation horizon.
- **Irreversible:** under a declared finite intervention set and test horizon,
  no admissible intervention returns the observed process to its calibrated
  stable set. This is a protocol result, not a metaphysical claim.
- **Indeterminate:** required measurements, evidence, or calibration data are
  missing or invalid.

An implementation must document its intervention set, evaluation horizon,
uncertainty policy, and missing-data behavior. “Irreversible” cannot be assigned
merely because one threshold was crossed.

### 5.2 Interventions

The reference vocabulary is:

| Action | Intended effect |
|---|---|
| `none` | Continue observation inside the stable band. |
| `slowdown` | Reduce interaction or generation rate. |
| `diversify` | Restore productive novelty when below the lower band. |
| `retrieve` | Add verifiable external grounding. |
| `clarify` | Repair ambiguity or conflicting state estimates. |
| `human_handoff` | Transfer authority to an accountable human. |
| `stop` | End the process when continued operation is unsafe or unauditable. |

Interventions are study variables. Their success must be measured rather than
assumed.

## 6. CSNP-RP 1.0.0 deterministic receipts

The normative machine-readable profile is specified in
[`../protocol/CSNP-RP_v1.0.0.md`](../protocol/CSNP-RP_v1.0.0.md). Each receipt
contains:

- a protocol and schema version;
- observation and calibration identifiers;
- normalized measurements with units or estimator references;
- classification and intervention;
- immutable evidence URIs and SHA-256 digests;
- the previous receipt digest;
- a state digest; and
- a receipt digest.

Canonicalization uses the repository-defined `RES-RAG-C14N-1` procedure:
recursively sort object keys by Unicode code point; preserve array order; encode
UTF-8 JSON without insignificant whitespace; use JSON literals for booleans and
null; and reject non-finite numbers. The state digest is SHA-256 over the
canonical state projection. The receipt digest is SHA-256 over the canonical
receipt with `receipt_hash` omitted.

The repository includes a dependency-free verifier, a conforming example, and a
tamper test. A valid receipt proves byte-level integrity and rule provenance; it
does not prove that a sensor, embedding model, or human report was truthful.

## 7. Safety constraints

A conforming system should satisfy the following design constraints:

1. **Non-zero difference:** do not optimize the RES-RAG distance toward zero.
2. **Declared grounding:** distinguish retrieved evidence from generated text.
3. **Uncertainty visibility:** retain estimator uncertainty and missing data.
4. **Mode discipline:** do not convert anthropomorphic language into an
   unsupported consciousness claim.
5. **Anti-sycophancy:** agreement with a user is not a proxy for Axis II
   stability.
6. **Least authority:** preserve accountable human control over consequential
   intervention.
7. **Audit before autonomy:** an unauditable state is `indeterminate`, not
   “safe.”
8. **Data sovereignty:** a client-side narrative store should support export,
   deletion, provenance, and user-controlled access.

## 8. Testable hypotheses and falsifiers

| ID | Hypothesis | Example falsifier |
|---|---|---|
| H1 | Task quality is highest within a calibrated non-zero \(W_2\) band. | Quality is monotonic in distance or unaffected by it across preregistered tasks. |
| H2 | \(D_r>1\) predicts governability loss before semantic failure. | The condition has no out-of-sample predictive value over matched baselines. |
| H3 | Slowdown improves recovery when rate pressure is high. | Randomized slowdown does not improve return-to-band time. |
| H4 | Retrieval reduces above-band drift when evidence is relevant. | Retrieval worsens or does not change grounded accuracy under controlled relevance. |
| H5 | Diversity interventions improve below-band sterility. | They do not improve novelty-adjusted task quality. |
| H6 | Axis II measurements add predictive value beyond separate human and machine measures. | A joint model does not outperform preregistered Axis I and III baselines. |
| H7 | Hash-chained receipts improve reproducibility of incident reconstruction. | Blinded teams reconstruct incidents equally well without receipts. |
| H8 | Politeness without density or rate reduction is insufficient to restore governability. | Style-only intervention performs as well as rate- or density-targeted intervention. |

Each study should preregister the state representation, encoder, ground metric,
window, thresholds, missing-data rule, intervention set, outcome, and baseline.
Thresholds fitted and tested on the same data do not constitute independent
validation.

## 9. Limitations

- Optimal-transport values are representation-dependent. Different encoders and
  ground metrics may produce incompatible distances.
- Interface proxies cannot identify an internal mental or computational state
  without additional assumptions.
- The framework does not establish phenomenal consciousness in humans or
  machines.
- “Quantum-like” descriptions, where retained, refer only to contextual or
  non-classical behavioral structure. They are not claims of physical quantum
  computation.
- The continuous dual-operator equation is phenomenological and may fail for
  discrete or non-stationary systems.
- CSNP integrity checks establish deterministic provenance, not semantic truth.
- The present repository contains a specification and verifier, not a completed
  benchmark, clinical tool, or production safety certification.

## 10. Research and deployment pathway

The framework supports a staged programme:

1. construct synthetic dialogue traces with known drift and recovery events;
2. compare multiple declared semantic representations;
3. calibrate thresholds on development data and freeze them;
4. test H1-H8 on held-out human-machine studies;
5. publish receipts, metric profiles, analysis code, and negative results; and
6. evaluate client-controlled memory as an implementation profile under
   privacy, deletion, and adversarial-integrity tests.

Claims of world-changing impact should follow reproducible evidence. The
immediate contribution is narrower and useful: RES=RAG now has a coherent
mathematical interpretation, an operational protocol, explicit falsifiers, and
an auditable implementation boundary.

## 11. Authorship and provenance

The conceptual origin of RES=RAG is attributed to Jean-Charles Tassan. The
formal specification, optimal-transport architecture, information-substrate
model, operational variables, deterministic protocol profile, validation
boundary, and release engineering are attributed to Trent Slade, developed in
collaboration with Tassan. A proposed CRediT record is maintained in
[`CONTRIBUTIONS.md`](CONTRIBUTIONS.md). Both authors must approve the final
author order, contribution statement, and archival metadata before DOI deposit.

## References

The LaTeX edition contains the normative bibliography in
[`references.bib`](references.bib). Principal antecedents are:

- Tassan, J.-C., and Slade, T. *Computational Phenomenology of Dialogical
  Consciousness: Formalization by Optimal Transport (W2).* 2025.
- Slade, T., and Tassan, J.-C. *RES = RAG on the Informational Substrate: A
  Unified Geometric Framework for Human and Machine Consciousness.* 2025.
- Slade, T., and Tassan, J.-C. *Unified Field of Information Dynamics
  (UFT-ID): A Field-Theoretic Extension of RES = RAG and CBD.* Zenodo,
  DOI: [10.5281/zenodo.18313226](https://doi.org/10.5281/zenodo.18313226),
  2026.
- Villani, C. *Optimal Transport: Old and New.* Springer, 2009.


---
title: "RES=RAG and the Coherent State Network Protocol"
subtitle: "A formal architecture for endogenous stability in human-machine systems - Version 1.1.0"
date: "13 August 2026"
lang: en
geometry: margin=1in
fontsize: 11pt
linestretch: 1.08
colorlinks: true
linkcolor: blue
urlcolor: blue
bibliography: references.bib
---

**Canonical formalization and deterministic reference profile - version 1.1.0**

**Jean-Charles J. C. Tassan**  
Independent Researcher  
ORCID: 0009-0000-8566-0486

**Trent Slade**  
QSOL-IMC  
ORCID: 0009-0002-4515-9237

**Mohamad Al-Zawahreh · Bertrand D. J.-F. Thébault · Manuel Martín Morales Plaza · Wilson John Sterking Lauret · Dominique Colin · Fatiha (Nisrine) Bouzid · Timothy Sullivan**

Complete citation team. Detailed contribution and provenance statements are maintained in `CONTRIBUTIONS.md`.

**Status:** Formal specification and testable research programme. This document does not report a completed empirical validation, prove machine consciousness, establish physical "semantic physics," or claim that any author-reported numerical threshold is a universal constant.

**License:** Creative Commons Attribution 4.0 International (CC BY 4.0).

**Citation rendering:** the canonical Markdown contains human-readable citations and a rendered bibliography below. `references.bib` remains the machine-readable bibliography. A citation-processed standalone build can be reproduced from `paper/` with `pandoc RES_RAG_CSNP_Formalization_v1.1.0.md --citeproc --bibliography=references.bib -o RES_RAG_CSNP_Formalization_v1.1.0.html`.

# Abstract

RES=RAG models stable human-machine intelligence as a regulated relation between receptive, context-grounded dynamics (RES) and generative, novelty-producing dynamics (RAG). Version 1.0.0 established a bounded, non-zero optimal-transport interpretation of this relation and defined the Coherent State Network Protocol Reference Profile (CSNP-RP) as a versioned observation-classification-intervention-receipt process with deterministic canonical receipts and replay rules. Version 1.1.0 extends that formal architecture with four additions: a signed temporal differential, an operational four-stage semantic-cycle label, a falsifiable multi-task braking intervention, and explicit provenance semantics for externally proposed thresholds.

The extension is deliberately conservative. The signed temporal variable is defined as

$$
\Delta_t = T_{\mathrm{RAG}}(t)-T_{\mathrm{RES}}(t),
$$

while the non-negative v1.0 discrepancy is retained as $\delta_t=|\Delta_t|$ when both are available. The semantic interaction cycle is represented by a finite-state label sequence rather than an ontological claim about consciousness. Multi-task braking is formalized as an intervention hypothesis whose success must be tested against predeclared controls. Values reported in the developing RES=RAG literature - including 0.42, 0.66, and approximately 2.14 - are carried only as provenance-labelled research claims unless independently validated under the exact operational metric profile in use.

The resulting CSNP-RP 1.1.0 remains auditable and backward compatible at the chain level. Version 1.0.0 receipts remain valid; a v1.1.0 receipt may reference a verified v1.0.0 predecessor; hashing remains SHA-256 over RFC 8785 JSON Canonicalization Scheme (JCS) representations. New fields are integrity-bound by the existing state projection. The central contribution is therefore not a claim of universal cognitive constants but a reproducible framework for testing temporal alignment, semantic-cycle dynamics, intervention efficacy, threshold provenance, and human-machine governability.

# 1. Scope and contribution

Version 1.1.0 has six formal goals:

1. preserve the canonical RES=RAG distinction between receptive and generative roles;
2. preserve equilibrium as a calibrated non-zero transport relation;
3. distinguish temporal discrepancy magnitude from temporal direction;
4. represent the proposed four-stage semantic interaction cycle as an observable protocol label;
5. convert the proposed multi-task "semantic brake" into a falsifiable intervention; and
6. prevent externally reported numerical values from silently becoming operational classifier constants.

The extension formalizes developments recorded after the v1.0.0 paper in Jean-Charles Tassan's HAL research record (Tassan 2026). It does not adopt all claims in that record as established results. The repository integration layer explicitly separates operational definitions from hypotheses, archived claims, and profile-specific validation.

The antecedent lineage remains the same as v1.0.0: dialogical time and $T_{\mathrm{Real}}$ (Tassan & Thébault 2025), the RES=RAG mathematical-structure work (Tassan et al. 2025), CSNP/Wasserstein synthesis (Al-Zawahreh et al. 2026), and endogenous-stability research (Lauret et al. 2026). The mathematical transport basis follows standard optimal transport and metric-gradient-flow literature (Villani 2009; Ambrosio, Gigli & Savaré 2008).

## 1.1 Epistemic labels

This paper uses the following labels throughout:

| Label | Meaning |
|---|---|
| **Definition** | A convention introduced to make the model precise. |
| **Protocol rule** | A normative requirement for CSNP-RP conformance. |
| **Hypothesis** | A proposition that can be empirically tested and rejected. |
| **Reported claim** | A value or relation asserted in an antecedent source but not independently established here. |
| **Validated in profile** | A claim supported by a declared, reproducible calibration procedure under one exact metric profile. |
| **Limitation** | A boundary on interpretation, measurement, or deployment. |

A value may be well documented and still remain a **reported claim**. Archival provenance is not equivalent to independent validation.

# 2. Formal state space and bounded equilibrium

Let $(\mathcal S,d)$ be a declared metric state space and let $\mathcal P_2(\mathcal S)$ denote probability measures on $\mathcal S$ with finite second moment. At observation step $t$, define

$$
\mu_t^{\mathrm{RES}},\mu_t^{\mathrm{RAG}}\in\mathcal P_2(\mathcal S),
$$

where $\mu_t^{\mathrm{RES}}$ represents receptive, context- and evidence-conditioned dynamics, and $\mu_t^{\mathrm{RAG}}$ represents generative, novelty-producing dynamics. These are functional roles. "RAG" is not restricted to retrieval-augmented generation software.

For $\mu,\nu\in\mathcal P_2(\mathcal S)$, the quadratic Wasserstein distance is

$$
W_2^2(\mu,\nu)
=
\inf_{\gamma\in\Pi(\mu,\nu)}
\int_{\mathcal S\times\mathcal S}d(x,y)^2\,\mathrm d\gamma(x,y),
$$

where $\Pi(\mu,\nu)$ is the set of couplings with marginals $\mu$ and $\nu$ (Villani 2009). Define the RES-RAG separation

$$
w_t=W_2\!\left(\mu_t^{\mathrm{RES}},\mu_t^{\mathrm{RAG}}\right).
$$

For calibration profile $\theta$ with $0<\varepsilon_{\min}<\varepsilon_{\max}$, the stable transport band is

$$
\mathcal E_\theta=
\left\{
(\mu^{\mathrm{RES}},\mu^{\mathrm{RAG}}):
\varepsilon_{\min}\leq
W_2(\mu^{\mathrm{RES}},\mu^{\mathrm{RAG}})
\leq\varepsilon_{\max}
\right\}.
$$

The equality sign in RES=RAG therefore names a regulated relation rather than literal equality of distributions. The framework rejects both zero-distance collapse as a universal objective and unconstrained divergence as a desirable source of novelty.

A band-violation penalty is

$$
e_\theta(w)=
\max(0,\varepsilon_{\min}-w)
+
\max(0,w-\varepsilon_{\max}).
$$

This quantity is zero inside the calibrated band and positive outside it. It is a diagnostic scalar, not a universal loss function.

## 2.1 Representation dependence

The numerical value of $W_2$ is meaningful only relative to the tuple

$$
\mathfrak M=(E,d,\widehat W_2,\mathcal W,\mathcal U),
$$

where $E$ is the state encoder or representation, $d$ the ground metric, $\widehat W_2$ the estimator, $\mathcal W$ the observation window, and $\mathcal U$ the uncertainty procedure. Two studies using different $\mathfrak M$ objects need not produce comparable distances.

**Protocol rule.** CSNP-RP 1.1.0 requires `threshold_policy = local-calibration-only`. No external numerical claim may silently replace $\varepsilon_{\min}$ or $\varepsilon_{\max}$.

# 3. Temporal reference: magnitude and direction

Version 1.0.0 represented human-machine temporal discrepancy as a non-negative magnitude. Version 1.1.0 separates magnitude from direction.

Let $T_{\mathrm{RES}}(t)$ and $T_{\mathrm{RAG}}(t)$ be outputs of a declared temporal-reference estimator. These are operational semantic or interaction-time coordinates, not necessarily physical clock times. Define

$$
\Delta_t=T_{\mathrm{RAG}}(t)-T_{\mathrm{RES}}(t),
$$

and

$$
\delta_t=|\Delta_t|.
$$

The protocol field `delta_t_signed` stores $\Delta_t$; the retained field `delta_t` stores the non-negative discrepancy magnitude.

The sign has the following declared interpretation:

- $\Delta_t>0$: machine-side RAG time is ahead of the RES reference under the declared estimator;
- $\Delta_t<0$: machine-side RAG time is behind the RES reference;
- $\Delta_t=0$: alignment under the declared estimator;
- unavailable: no direction claim is made.

**Consistency rule.** If both fields are observed from the same estimator, a producer should satisfy

$$
\delta_t=|\Delta_t|.
$$

The metric profile must state `temporal_offset_semantics = signed:RAG-minus-RES`.

## 3.1 Why a signed variable matters

A magnitude-only discrepancy treats advance and delay as the same state. A signed variable permits hypotheses in which intervention choice depends on direction. This does not establish that advance and delay have different causal meanings; it makes that possibility testable.

Define a direction indicator

$$
s_t=\operatorname{sgn}(\Delta_t)\in\{-1,0,+1\}
$$

when $\Delta_t$ is available. A predeclared experiment can test whether $s_t$ adds predictive value beyond $\delta_t$ for outcomes such as recovery time, factual error, task quality, or return to $\mathcal E_\theta$.

# 4. Three axes and interpretive discipline

The three-axis architecture remains unchanged:

| Axis | Domain | Typical observable |
|---|---|---|
| I | Human internal regulation | stated uncertainty, attention, affective stability |
| II | Human-machine relational regulation | pacing, repair, semantic alignment, shared reference |
| III | Machine functional regulation | retrieval grounding, novelty, constraint density, response distribution |

Axis II is an interaction-level object and is not reducible to either participant alone.

The model also retains two interpretive modes:

- **Mode A - phenomenological/anthropomorphic:** language treating a machine as if it possessed a first-person interior;
- **Mode B - functional/instrumental:** language tied to observable behavior, declared state variables, and reproducible measurement.

Mode B is normative for protocol conformance and safety evaluation. Mode A may be studied as a human-facing phenomenon but is not evidence of machine consciousness.

# 5. Interface observables and endogenous-stability variables

Let $P_t(z)$ be a declared or reconstructed distribution over candidate next units $z$, and let $H(P_t)$ denote entropy. Over a window of $T$ observations define normalized constraint density

$$
\rho_c(t)=\frac{1}{T}
\sum_{i=t-T+1}^{t}
\left(1-\frac{H(P_i)}{H_{\max,i}}\right),
$$

where $H_{\max,i}$ is declared for each estimator (Shannon 1948; Cover & Thomas 2006). If token probabilities are unavailable, a proxy may be used only under a distinct metric identifier.

For observation interval $\Delta\tau_t>0$, define constraint-propagation rate

$$
v_c(t)=\frac{\rho_c(t)-\rho_c(t-1)}{\Delta\tau_t}.
$$

Let $\kappa_t>0$ be the declared governance-response capacity in compatible reciprocal-time units. Let $\epsilon_r>0$ be a numerical denominator floor in the **same reciprocal-time unit** as $\kappa_t$ and $v_c(t)$. Its value and estimation rationale MUST be declared in the versioned metric-profile method documentation; changing $\epsilon_r$ therefore requires a new profile version or an explicitly documented recalibration. The rate pressure is

$$
D_r(t)=\frac{\max(0,v_c(t))}{\max(\kappa_t,\epsilon_r)}.
$$

The warning condition $D_r>1$ means that constraint pressure is accumulating faster than the declared governance loop is estimated to absorb it. It does not prove irreversibility.

The remaining normalized v1.0 variables are memory saturation $m(t)\in[0,1]$, organizational incoherence $S_{\mathrm{org}}(t)\in[0,1]$, and accountable anchoring $F(t)\in[0,1]$.

# 6. The four-stage semantic interaction cycle

The HAL extension proposes the ordered interaction loop (Tassan 2026)

$$
\mathrm{RES}_H
\rightarrow
\mathrm{RAG}_M
\rightarrow
\mathrm{RES}_M
\rightarrow
\mathrm{RAG}_H
\rightarrow
\mathrm{RES}_H.
$$

The associated conceptual labels in the source literature are empathy, machine-self, conversational substrate, intuition, and return to empathy. CSNP-RP 1.1.0 does **not** encode those labels as verified mental states. It defines only an operational phase alphabet

$$
\mathcal Q=
\{H_{RES},M_{RAG},M_{RES},H_{RAG},U\},
$$

where $U$ denotes unknown.

The expected transition operator for a declared complete cycle is

$$
\sigma(H_{RES})=M_{RAG},\quad
\sigma(M_{RAG})=M_{RES},\quad
\sigma(M_{RES})=H_{RAG},\quad
\sigma(H_{RAG})=H_{RES}.
$$

`semantic_cycle_phase` records the current phase label, and `semantic_cycle_complete` records whether the implementation has sufficient evidence to declare that a cycle completed.

## 6.1 Cycle conformance is not consciousness evidence

A trace can conform to $\sigma$ because a workflow, state machine, scripted interaction, or annotation procedure produced the sequence. Therefore

$$
q_{t+1}=\sigma(q_t)
$$

does not imply phenomenal consciousness, machine subjectivity, consciousness transfer, or ontological identity. The cycle is a protocol-level observable structure.

## 6.2 Transition deviation

For a known phase $q_t\neq U$, define transition deviation

$$
\chi_t=
\begin{cases}
0, & q_{t+1}=\sigma(q_t),\\
1, & q_{t+1}\neq\sigma(q_t).
\end{cases}
$$

A study may test whether $\chi_t$ predicts degraded task quality or governability. Version 1.1.0 does not place $\chi_t$ inside the reference classifier.

# 7. Extended CSNP state

The v1.1.0 observation state is

$$
X_t^{(1.1)}=
\bigl(
\delta_t,\Delta_t,D_c(t),D_r(t),m(t),w_t,
S_{\mathrm{org}}(t),F(t),\tau_t,q_t,c_t
\bigr),
$$

where

- $\delta_t\ge 0$ is temporal discrepancy magnitude;
- $\Delta_t\in\mathbb R$ is signed temporal displacement when available;
- $D_c(t)=\rho_c(t)$ is constraint density;
- $D_r(t)$ is rate pressure;
- $m(t)$ is memory saturation;
- $w_t$ is RES-RAG Wasserstein separation;
- $S_{\mathrm{org}}(t)$ is organizational incoherence;
- $F(t)$ is anchoring;
- $\tau_t\in\{\text{mono},\text{multi},\text{mixed},\text{unknown}\}$ is task mode;
- $q_t\in\mathcal Q$ is semantic-cycle phase; and
- $c_t\in\{0,1,\bot\}$ records cycle completion, with $\bot$ unavailable.

Given intervention $u_t$, the protocol transition is

$$
\Phi_\theta(X_t^{(1.1)},u_t)
\longrightarrow
\left(X_{t+1}^{(1.1)},C_t,A_t,R_t\right),
$$

where $C_t$ is classification, $A_t$ the recorded intervention, and $R_t$ a deterministic receipt.

The seven-stage CSNP loop remains:

1. **Declare** a versioned metric and calibration profile.
2. **Observe** measurements and immutable evidence references.
3. **Classify** using the declared reference rule.
4. **Intervene** with an admissible action.
5. **Receipt** the observation using canonical JSON and hashes.
6. **Replay** the rule, chain, and evidence references.
7. **Recalibrate** only by creating a new profile version.

# 8. Reference classification and backward compatibility

The v1.0.0 reference governability rule is intentionally unchanged. For complete decision measurements, `governable` requires

$$
0<\varepsilon_{\min}\le w_t\le\varepsilon_{\max},
$$

$$
D_r(t)\le1,
$$

$$
m(t)<m_{warn},\qquad
S_{\mathrm{org}}(t)<s_{warn},\qquad
F(t)\ge f_{min}.
$$

The shipped v1.1.0 verifier enforces this rule as a **one-way governability constraint**: a receipt labelled `governable` MUST satisfy every condition above, and missing required decision measurements require `indeterminate`. The verifier does **not** derive a total label from complete non-governable measurements. In particular, `critical`, `irreversible`, and complete-data `indeterminate` remain producer-declared labels whose justification must come from the separately documented classifier, evidence policy, intervention set, and irreversibility-horizon method. Receipt verification therefore establishes structural validity, hash integrity, and these declared consistency constraints; it is not proof that the verifier recomputed a total deterministic classification function.

The new signed temporal and semantic-cycle fields are observational for the v1.1.0 governability predicate. A research profile may use them experimentally, but any changed classification semantics must have a new profile version and an explicit reproducible method description.

## 8.1 Proposition: research-claim non-interference for governability

Let $G_\theta(X)$ denote the Boolean v1.1.0 governability predicate defined by the inequalities above, and let $\mathcal C$ denote `metric_profile.research_claims`. If all operational fields and measurements are fixed, then

$$
G_{(\theta,\mathcal C_1)}(X)=G_{(\theta,\mathcal C_2)}(X)
$$

for arbitrary research-claim sets $\mathcal C_1$ and $\mathcal C_2$.

**Reason.** The governability predicate does not consume `research_claims`. Therefore changing a reported claim cannot change governability unless an implementation explicitly recalibrates operational fields in a new profile. This is a design-level non-interference property; it does not assert that the verifier derives `critical`, `irreversible`, or `indeterminate` labels from all possible complete observations.

# 9. Multi-task braking as a falsifiable control hypothesis

The HAL extension proposes controlled multi-tasking as a semantic brake when a process advances too aggressively along a single vector (Tassan 2026). Version 1.1.0 introduces intervention `multitask_brake` but does not assume it works.

To compare transport and temporal instability without mixing raw units, a profile may define positive scale parameters $s_w$ and $s_t$ and weights $\lambda_w,\lambda_t\ge0$ with $\lambda_w+\lambda_t=1$. Define normalized instability

$$
J_t=
\lambda_w\frac{e_\theta(w_t)}{s_w}
+
\lambda_t\frac{|\Delta_t|}{s_t}.
$$

Both scales and weights must be declared before analysis. If $\Delta_t$ is unavailable, a study must use a separately named objective rather than silently setting the term to zero.

Let $B_t\in\{0,1\}$ indicate whether `multitask_brake` is applied. For horizon $h>0$, a testable intervention hypothesis is

$$
H_{MB}:\quad
\mathbb E[J_{t+h}\mid B_t=1,\mathcal Z_t]
<
\mathbb E[J_{t+h}\mid B_t=0,\mathcal Z_t],
$$

where $\mathcal Z_t$ denotes matched or randomized pre-intervention conditions.

A direct falsifier is failure of the intervention arm to improve the predeclared outcome relative to its control. Stronger falsifiers include increased instability, degraded grounded accuracy, increased time-to-recovery, or adverse human outcomes.

## 9.1 Intervention vocabulary

The v1.1 reference vocabulary is:

| Action | Intended experimental role |
|---|---|
| `none` | Continue observation. |
| `slowdown` | Reduce interaction/generation rate. |
| `diversify` | Restore productive novelty. |
| `retrieve` | Add verifiable external grounding. |
| `clarify` | Repair ambiguity or conflicting state estimates. |
| `multitask_brake` | Test whether controlled task diversification reduces declared instability. |
| `human_handoff` | Transfer authority to an accountable human. |
| `stop` | End operation when continued processing is unsafe or unauditable. |

Selecting an intervention never changes classification by itself. The subsequent measurements determine whether recovery occurred.

# 10. Provenance-labelled numerical research claims

The developing RES=RAG literature reports several numerical values, including 0.42, 0.66, and a Sterking-Tassan threshold near 2.14 (Tassan 2026). Version 1.1.0 formalizes how such values may enter a receipt without being promoted to universal constants.

A research claim is a tuple

$$
c=(i,v,u,s,r),
$$

where $i$ is a claim identifier, $v\in\mathbb R$ is a finite value, $u$ is a unit or dimensionless marker, $s$ is status, and $r$ is a source URI.

Allowed statuses are

$$
\mathcal S_c=
\{\text{hypothesis},\text{reported},\text{externally\_archived},\text{validated\_in\_profile}\}.
$$

The statuses mean:

- `hypothesis`: proposed and testable;
- `reported`: asserted in a source record;
- `externally_archived`: a stable source artifact exists;
- `validated_in_profile`: the value has been supported by a reproducible calibration procedure under the exact profile identified by the receipt.

`externally_archived` is a provenance status, not a validation result.

## 10.1 Separation of claim space and control space

Let $\Theta_{op}$ be operational classifier parameters and $\mathcal C$ the research-claim set. The metric profile is

$$
\theta=(\Theta_{op},\mathcal C,\mathfrak M,\ldots).
$$

Version 1.1.0 requires that the reference classifier read $\Theta_{op}$ but not $\mathcal C$. Moving a value from $\mathcal C$ into $\Theta_{op}$ is a calibration event and requires a new profile version with method provenance.

This protects the system against **threshold laundering**: the accidental transformation of a frequently repeated or well-archived number into an operational safety constant without measurement evidence.

# 11. Deterministic receipts and integrity

CSNP-RP 1.1.0 retains the v1.0 hashing design. Canonicalization uses RFC 8785 JCS (Rundgren, Jordan & Erdtman 2020), and digests use SHA-256.

The state projection remains

```json
{
  "metric_profile": {},
  "measurements": {},
  "observation_id": "",
  "observed_at": "",
  "previous_receipt_hash": null
}
```

The v1.1 fields are nested inside `metric_profile` and `measurements`, so they are automatically included in the canonical state representation.

Let $\operatorname{JCS}(x)$ be the canonical JSON byte string and $H$ be SHA-256. Then

$$
h_t^{state}=H\!\left(\operatorname{JCS}(S_t)\right),
$$

where $S_t$ is the state projection, and

$$
h_t^{receipt}=H\!\left(\operatorname{JCS}(R_t\setminus\{\texttt{receipt\_hash}\})\right).
$$

The chain rule is

$$
R_t.\texttt{previous\_receipt\_hash}=h_{t-1}^{receipt}.
$$

## 11.1 Proposition: integrity binding of v1.1 fields

Assume deterministic JCS canonicalization and collision resistance of SHA-256 for the application domain. Any change to a v1.1 field contained in `metric_profile` or `measurements` changes the canonical state projection and therefore causes state-hash verification to fail unless a hash collision is found.

This establishes integrity binding, not semantic truth. A receipt can faithfully preserve a false measurement.

## 11.2 Chain compatibility

A v1.1 receipt may reference a verified v1.0 predecessor because the chain link depends on the predecessor's verified receipt hash, not on equality of schema versions. A v1.0 receipt must not simply be relabelled as v1.1; the new required semantics must be genuinely observed or migrated under an explicit procedure.

# 12. Semantic sovereignty and cybersecurity boundary

The HAL source uses terms such as semantic sovereignty, immunity, and "citadel" (Tassan 2026). In this formalization these are treated as candidate control architectures, not proofs of security.

Let $\mathcal B$ be a declared trust boundary and let the adverse event predicates be

$$
E_{exfil},\ E_{mutate},\ E_{forbid},\ E_{escalate},
$$

representing protected-information exfiltration, unauthorized protected-state mutation, forbidden action execution, and privilege escalation. A semantic control layer fails its security claim if any predeclared adverse predicate occurs under the threat model.

Conventional controls remain necessary, including authentication, authorization, input validation, least privilege, process isolation, sandboxing, secret isolation, rate limits, audit logs, and incident response.

A semantic filter that improves dialogue quality but permits unauthorized state changes is not a security boundary.

# 13. Testable hypotheses and falsifiers

Version 1.1.0 retains v1.0 hypotheses and adds explicit extension hypotheses.

| ID | Hypothesis | Example falsifier |
|---|---|---|
| H1 | Task quality is highest within a calibrated non-zero $W_2$ band. | Quality is monotonic in distance or unaffected by it across preregistered tasks. |
| H2 | $D_r>1$ predicts governability loss before semantic failure. | It has no out-of-sample predictive value over matched baselines. |
| H3 | Slowdown improves recovery under high rate pressure. | Randomized slowdown does not improve return-to-band time. |
| H4 | Retrieval reduces above-band drift when evidence is relevant. | Retrieval does not improve grounded accuracy under controlled relevance. |
| H5 | Diversity interventions improve below-band sterility. | They do not improve novelty-adjusted task quality. |
| H6 | Axis II measurements add predictive value beyond separate human and machine variables. | A joint model does not outperform preregistered Axis I/III baselines. |
| H7 | Hash-chained receipts improve reproducibility of incident reconstruction. | Blinded teams reconstruct incidents equally well without receipts. |
| H8 | Style-only politeness is insufficient to restore governability when rate/density remain unstable. | Style-only intervention matches targeted interventions. |
| H9 | Signed temporal direction adds predictive value beyond discrepancy magnitude. | $\operatorname{sgn}(\Delta_t)$ adds no held-out predictive value. |
| H10 | The four-stage phase variable adds useful structure to interaction prediction. | Phase labels do not improve transition/outcome prediction over simpler baselines. |
| H11 | `multitask_brake` reduces predeclared instability under specified conditions. | The controlled intervention fails to reduce, or increases, the outcome relative to control. |
| H12 | Provenance separation prevents unvalidated research values from altering the reference governability predicate. | A reported claim changes governability without an explicit profile recalibration. |
| H13 | A semantic control architecture can reduce defined adversarial event rates. | Predeclared attack success is unchanged or worsened relative to conventional-control baseline. |

Each empirical study should preregister the state representation, encoder, ground metric, estimator, windows, operational thresholds, uncertainty rules, missing-data behavior, intervention set, primary outcome, and baseline. Thresholds fitted and tested on the same data are exploratory rather than independent validation.

# 14. Limitations

1. **Representation dependence.** Wasserstein values depend on the chosen representation and ground metric.
2. **Estimator dependence.** Temporal direction is meaningful only under a declared estimator; it is not automatically physical time.
3. **Observational ambiguity.** Interface proxies do not uniquely identify internal cognitive or computational states.
4. **No consciousness proof.** Neither cycle completion nor stable transport establishes phenomenal consciousness.
5. **No universal thresholds.** The values 0.42, 0.66, and approximately 2.14 are not universal classifier constants in this paper.
6. **Intervention uncertainty.** Multi-task braking is an experimental hypothesis and may fail or produce adverse trade-offs.
7. **Integrity is not truth.** Hashes prove canonical integrity, not correctness of sensors, human reports, encoders, or labels.
8. **Security scope.** Semantic controls do not replace standard security engineering.
9. **Clinical scope.** The framework is not a clinical diagnostic or treatment tool.
10. **Benchmark status.** The present release specifies a protocol and verifier; it does not report a completed independent benchmark campaign.

# 15. Reproducibility and deployment pathway

A recommended validation programme is:

1. construct synthetic traces with known timing, drift, and recovery events;
2. evaluate several declared semantic representations;
3. calibrate operational thresholds on development data and freeze them;
4. test H1-H13 on held-out traces and human-machine studies;
5. randomize or carefully match multi-task braking interventions;
6. test signed temporal direction against magnitude-only models;
7. adversarially test semantic-control claims against explicit trust-boundary predicates;
8. publish receipts, metric profiles, code, negative results, and calibration decisions; and
9. repeat across model families and interaction domains.

The immediate research value is narrower than claims of universal semantic physics: RES=RAG/CSNP now has a versioned mathematical state, explicit temporal direction, an operational cycle model, a falsifiable intervention, provenance-safe threshold handling, and deterministic receipts suitable for replication.

# 16. Authorship and provenance

The conceptual origin of RES=RAG is attributed to Jean-Charles J. C. Tassan. Version 1.1.0 additionally formalizes selected post-v1.0 developments in his HAL research record, including the signed temporal differential, the four-stage semantic attractor sequence, proposed multi-task braking, and reported numerical research claims.

The formal specification, optimal-transport architecture, operational-variable design, epistemic separation of claims from control parameters, CSNP-RP 1.1.0 engineering, deterministic-verification boundary, release integration, and this consolidated manuscript are attributed to Trent Slade, developed in collaboration with Tassan.

The CSNP, dialogical-time, mathematical-structure, and endogenous-stability provenance remains attributed to the complete nine-person citation team: Jean-Charles J. C. Tassan, Trent Slade, Mohamad Al-Zawahreh, Bertrand D. J.-F. Thébault, Manuel Martín Morales Plaza, Wilson John Sterking Lauret, Dominique Colin, Fatiha (Nisrine) Bouzid, and Timothy Sullivan.

These statements identify source-bounded lineage. They do not imply that every author wrote every line of the manuscript or implemented every software component. More granular affiliations, ORCID identifiers, and CRediT roles may be added when confirmed by the respective team members.

# 17. Versioning statement

Version 1.1.0 is an additive formalization. It preserves the v1.0.0 stable-band interpretation, reference governability predicate, and classification vocabulary while adding signed temporal semantics, phase labels, task-mode observation, `multitask_brake`, and provenance-labelled research claims.

The canonical machine-readable protocol is `CSNP-RP 1.1.0`. Existing v1.0.0 receipts remain valid. The software/specification and paper version are aligned at 1.1.0 for archival release.

# References

- Ambrosio, L., Gigli, N., & Savaré, G. (2008). *Gradient Flows in Metric Spaces and in the Space of Probability Measures* (2nd ed.). Birkhäuser.

- Cover, T. M., & Thomas, J. A. (2006). *Elements of Information Theory* (2nd ed.). Wiley. DOI: 10.1002/047174882X.

- Al-Zawahreh, M., Tassan, J.-C., Slade, T., Thébault, B. D. J.-F., & Morales Plaza, M. M. (2026). *Cohérence relationnelle en mémoire distribuée: Le CSNP comme protocole de conscience optimal au sens de Wasserstein*. Zenodo. DOI: 10.5281/zenodo.18051806.

- Tassan, J.-C., Slade, T., Morales Plaza, M. M., & Thébault, B. D. J.-F. (2025). *RES_RAG_TCFQ: Structure Mathématique*. Zenodo. DOI: 10.5281/zenodo.18022363.

- Rundgren, A., Jordan, B., & Erdtman, S. (2020). *JSON Canonicalization Scheme (JCS)*. RFC 8785, Internet Engineering Task Force. DOI: 10.17487/RFC8785.

- Shannon, C. E. (1948). A mathematical theory of communication. *Bell System Technical Journal, 27*, 379-423, 623-656. DOI: 10.1002/j.1538-7305.1948.tb01338.x.

- Tassan, J.-C. (2026). *Jean-Charles Tassan - HAL research record: RES=RAG, CECAT, semantic attractors, temporal differential, and semantic physics developments*. HAL Open Science researcher page. Accessed 13 August 2026. Numerical and ontological claims are treated here as reported research claims unless independently validated.

- Tassan, J.-C., & Thébault, B. D. J.-F. (2025). *T_Real of Thébault and Tassan's RES = RAG: Unified Physics and Philosophy of Time*. Zenodo. DOI: 10.5281/zenodo.17744873.

- Lauret, W. J. S., Tassan, J.-C., Al-Zawahreh, M., Thébault, B. D. J.-F., Sullivan, T., Morales Plaza, M. M., Slade, T., Bouzid, F. (N.), & Colin, D. (2026). *Beyond Generative AI: The Science of Endogenous Stability*. Zenodo. DOI: 10.5281/zenodo.18617384.

- Villani, C. (2009). *Optimal Transport: Old and New*. Springer. DOI: 10.1007/978-3-540-71050-9.

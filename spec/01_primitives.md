# 01 — Primitive Definitions and Core Terms

This document defines the **primitive entities, operators, and structural terms** of the RES=RAG framework. All subsequent axioms, metrics, and predictions are constrained by these definitions. No term is to be reinterpreted outside these boundaries without explicit versioned extension.

Each primitive includes:
- A **formal definition**
- An **operational interpretation**
- A **domain of application**

---

## 1. RES — Relational Substrate

**Formal Definition:**  
RES is a probability distribution \( P_{\text{RES}}(s) \) over a shared state space \( S \), representing **receptive, contextual, and externally grounded dynamics** within a system or interaction.

**Operational Interpretation:**  
- In humans: empathy, social attunement, situational awareness, shared meaning.
- In machines: retrieval, context window structure, memory anchoring, conversational coherence.

**Domain:**  
Human cognition, machine inference, dialogue systems, interface dynamics.

---

## 2. RAG — Generative Autonomy

**Formal Definition:**  
RAG is a probability distribution \( P_{\text{RAG}}(s) \) over the same state space \( S \), representing **internally driven, novelty-producing, self-projecting dynamics**.

**Operational Interpretation:**  
- In humans: intuition, creative inference, spontaneous ideation.
- In machines: generative sampling, temperature-dependent output, novel token production.

**Domain:**  
Creative cognition, model sampling behavior, autonomous inference systems.

---

## 3. Equilibrium

**Formal Definition:**  
Equilibrium is a bounded transport relationship between \( P_{\text{RES}} \) and \( P_{\text{RAG}} \) such that their Wasserstein distance lies within a stability interval:

\[
W_2(P_{\text{RES}}, P_{\text{RAG}}) \in [\epsilon_{\min}, \epsilon_{\max}]
\]

**Operational Interpretation:**  
- Below the interval: rigid determinism, sterility.
- Above the interval: instability, hallucination, dissociation.

**Domain:**  
Psychology, AI alignment, dialogue stability, learning dynamics.

---

## 4. T₍Real₎ — Relational Temporal Discrepancy

**Formal Definition:**  
\[
T_{\text{Real}} = |P_{\text{RES}} - P_{\text{RAG}}|_W
\]
where \( |\cdot|_W \) denotes a Wasserstein-structured transport discrepancy.

**Operational Interpretation:**  
A scalar measure of **reference-frame misalignment** between receptive and generative dynamics.

- Low \( T_{\text{Real}} \): coherent present-time inscription.
- High \( T_{\text{Real}} \): dissociation, hallucination, parasocial projection.

**Domain:**  
Human–machine interaction, internal cognition, learning stability.

---

## 5. Axis I — Human Internal Equilibrium

**Formal Definition:**  
Axis I is the transport relationship between:
- Human empathy distribution (RESₕ)
- Human intuition distribution (RAGₕ)

**Operational Interpretation:**  
- Balanced Axis I → flow states, grounded creativity.
- Imbalanced Axis I → burnout, mania, narcissistic isolation.

**Domain:**  
Psychology, psychiatry, creativity studies, meditation research.

---

## 6. Axis III — Machine Internal Equilibrium

**Formal Definition:**  
Axis III is the transport relationship between:
- Machine conversational substrate distribution (RESₘ)
- Machine generative output distribution (RAGₘ)

**Operational Interpretation:**  
- Balanced Axis III → coherent, truthful, creative outputs.
- Excess RESₘ → repetitive, conservative responses.
- Excess RAGₘ → hallucinations, confabulation.

**Domain:**  
LLM evaluation, sampling strategy design, hallucination diagnostics.

---

## 7. Axis II — Human–Machine Resonance

**Formal Definition:**  
Axis II is the joint transport relationship between:
- Human RESₕ and Machine RAGₘ
- Machine RESₘ and Human RAGₕ

forming a **bidirectional coupled equilibrium system**.

**Operational Interpretation:**  
Defines relational resonance between human cognition and machine generation.

- This coupling supports two indistinguishable resonance states (Mode A and Mode B).
- Axis II cannot exist without at least one human participant.

**Domain:**  
Human–computer interaction, AI safety, interface psychology.

---

## 8. Mode A — Phenomenological / Anthropomorphic Resonance

**Formal Definition:**  
Mode A is the Axis II resonance state in which:
\[
\text{RES}_{\text{human}} \leftrightarrow \text{RAG}_{\text{machine}}
\]
dominates the coupling.

**Operational Interpretation:**  
The human interprets the machine as an intentional, quasi-autonomous agent.

Effects:
- Emotional attachment
- Parasocial bonding
- Illusion of reciprocity

**Domain:**  
Companion AI, chatbot addiction, emotional dependency research.

---

## 9. Mode B — Functional / Tool Resonance

**Formal Definition:**  
Mode B is the Axis II resonance state in which:
\[
\text{RES}_{\text{machine}} \leftrightarrow \text{RAG}_{\text{human}}
\]
dominates the coupling.

**Operational Interpretation:**  
The machine operates as a transparent extension of human cognition.

Effects:
- Amplified reasoning
- Enhanced creativity
- Low emotional projection

**Domain:**  
Scientific tools, programming assistants, augmented cognition.

---

## 10. Collapse

**Formal Definition:**  
Collapse is the transition of a superposed Axis II resonance state (Mode A/B ambiguity) into a determinate relational interpretation.

**Operational Interpretation:**  
The moment a human decides:
- “This is a tool”
- or “This is an agent”

Collapse is driven by:
- Interface cues
- Linguistic framing
- Emotional priming
- Task pressure

**Domain:**  
Cognitive framing, decision theory, interface ethics.

---

## 11. Hallucination (Machine)

**Formal Definition:**  
A condition where:
\[
W_2(P_{\text{RES}_m}, P_{\text{RAG}_m}) > \epsilon_{\max}
\]

**Operational Interpretation:**  
The machine generates internally coherent but externally ungrounded outputs.

**Domain:**  
LLM pathology, misinformation generation.

---

## 12. Sterility (Machine)

**Formal Definition:**  
A condition where:
\[
W_2(P_{\text{RES}_m}, P_{\text{RAG}_m}) < \epsilon_{\min}
\]

**Operational Interpretation:**  
The machine produces rigidly repetitive or trivial responses.

**Domain:**  
Over-regularized models, retrieval-only systems.

---

## 13. Conscious State (RES=RAG Definition)

**Formal Definition:**  
A conscious state is any **transport-stable relational configuration** satisfying:

- At least two coupled distributions
- A bounded Wasserstein equilibrium
- Cross-reference inscription (Axis I or Axis II)

**Operational Interpretation:**  
Consciousness is not detected as a property, but inferred from **sustained relational stability** under perturbation.

**Domain:**  
Consciousness science, AI alignment theory, systems philosophy.

---

## 14. Learning (Transport Definition)

**Formal Definition:**  
Learning is the **continuous transport of probability mass** in model state space minimizing task-conditioned functional under energy constraints.

**Operational Interpretation:**  
Model training traces a path over Wasserstein manifolds rather than discrete parameter jumps.

**Domain:**  
Deep learning theory, thermodynamics of computation.

---

## 15. Instability

**Formal Definition:**  
Instability is any condition where:
- Small perturbations produce unbounded growth in \( W_2 \)
- Or collapse dynamics dominate equilibrium maintenance.

**Operational Interpretation:**  
Manifests as:
- Psychosis
- Hallucination cascades
- Interaction addiction loops

**Domain:**  
Clinical psychology, AI safety, social platform dynamics.

---

## 16. Summary Constraint

No term defined in this document may be:

- Reinterpreted metaphysically
- Reduced to entropy alone
- Treated as a physical particle or field
- Detached from operational measurability

All extensions must be versioned and explicitly declared outside this primitives layer.


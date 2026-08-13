#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

import {
  calculateReceiptHash,
  calculateStateHash,
  canonicalize,
  parseStrictJson,
  verifyReceipt as verifyV1Receipt,
} from "./verify_receipt.mjs";

const HASH_PATTERN = /^[0-9a-f]{64}$/;
const CLASSIFICATIONS = new Set([
  "governable",
  "critical",
  "irreversible",
  "indeterminate",
]);
const INTERVENTIONS = new Set([
  "none",
  "slowdown",
  "diversify",
  "multitask_brake",
  "retrieve",
  "clarify",
  "human_handoff",
  "stop",
]);
const TASK_MODES = new Set(["mono", "multi", "mixed", "unknown"]);
const CYCLE_PHASES = new Set([
  "human_res",
  "machine_rag",
  "machine_res",
  "human_rag",
  "unknown",
]);
const CLAIM_STATUSES = new Set([
  "hypothesis",
  "reported",
  "externally_archived",
  "validated_in_profile",
]);

function requireObject(value, label) {
  if (value === null || Array.isArray(value) || typeof value !== "object") {
    throw new Error(`${label} must be an object`);
  }
}

function requireString(value, label) {
  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`${label} must be a non-empty string`);
  }
}

function requireNullableFinite(value, label) {
  if (value !== null && (typeof value !== "number" || !Number.isFinite(value))) {
    throw new Error(`${label} must be null or a finite number`);
  }
}

function requireNullableNonNegative(value, label) {
  requireNullableFinite(value, label);
  if (typeof value === "number" && value < 0) {
    throw new Error(`${label} must be null or non-negative`);
  }
}

function requireNullableUnitInterval(value, label) {
  requireNullableFinite(value, label);
  if (typeof value === "number" && (value < 0 || value > 1)) {
    throw new Error(`${label} must be null or in [0, 1]`);
  }
}

function requireRequiredUnitInterval(value, label) {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0 || value > 1) {
    throw new Error(`${label} must be a finite number in [0, 1]`);
  }
}

function requireUtcTimestamp(value) {
  requireString(value, "observed_at");
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?Z$/u.exec(value);
  if (!match) throw new Error("observed_at must be a valid UTC RFC 3339 timestamp");
  const [, y, m, d, hh, mm, ss] = match.map((item, index) => index === 0 ? item : Number(item));
  const leap = y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0);
  const dim = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (y === 0 || m < 1 || m > 12 || d < 1 || d > dim[m - 1] || hh > 23 || mm > 59 || ss > 59) {
    throw new Error("observed_at must be a real UTC calendar date and time");
  }
}

function requireUri(value, label) {
  requireString(value, label);
  try {
    new URL(value);
  } catch {
    throw new Error(`${label} must be a valid URI`);
  }
}

export function validateV11Structure(receipt) {
  requireObject(receipt, "receipt");
  if (receipt.protocol !== "CSNP-RP") throw new Error("Unsupported protocol");
  if (receipt.version !== "1.1.0") throw new Error("Unsupported version");
  if (receipt.hash_algorithm !== "sha256") throw new Error("Unsupported hash");
  if (receipt.canonicalization !== "JCS-RFC8785") throw new Error("Unsupported canonicalization");
  if (!CLASSIFICATIONS.has(receipt.classification)) throw new Error("Invalid classification");
  if (!INTERVENTIONS.has(receipt.intervention)) throw new Error("Invalid intervention");

  requireString(receipt.observation_id, "observation_id");
  if (!/^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/u.test(receipt.observation_id)) {
    throw new Error("Invalid observation_id");
  }
  requireUtcTimestamp(receipt.observed_at);
  if (receipt.previous_receipt_hash !== null && !HASH_PATTERN.test(receipt.previous_receipt_hash ?? "")) {
    throw new Error("Invalid previous_receipt_hash");
  }
  if (!HASH_PATTERN.test(receipt.state_hash ?? "")) throw new Error("Invalid state_hash");
  if (!HASH_PATTERN.test(receipt.receipt_hash ?? "")) throw new Error("Invalid receipt_hash");

  requireObject(receipt.metric_profile, "metric_profile");
  const profile = receipt.metric_profile;
  for (const field of ["profile_id", "profile_version", "state_representation", "ground_metric", "distance_unit", "time_unit"]) {
    requireString(profile[field], `metric_profile.${field}`);
  }
  if (profile.threshold_policy !== "local-calibration-only") {
    throw new Error("metric_profile.threshold_policy must be local-calibration-only");
  }
  if (profile.temporal_offset_semantics !== "signed:RAG-minus-RES") {
    throw new Error("metric_profile.temporal_offset_semantics must be signed:RAG-minus-RES");
  }
  for (const field of ["epsilon_min", "epsilon_max"]) {
    if (typeof profile[field] !== "number" || !Number.isFinite(profile[field])) {
      throw new Error(`metric_profile.${field} must be finite`);
    }
  }
  if (profile.epsilon_min <= 0 || profile.epsilon_max <= profile.epsilon_min) {
    throw new Error("The stable band must satisfy 0 < epsilon_min < epsilon_max");
  }
  for (const field of ["memory_warning", "organizational_warning", "anchoring_min"]) {
    requireRequiredUnitInterval(profile[field], `metric_profile.${field}`);
  }
  if (!Number.isInteger(profile.irreversibility_horizon) || profile.irreversibility_horizon < 1) {
    throw new Error("metric_profile.irreversibility_horizon must be a positive integer");
  }
  if (!Array.isArray(profile.intervention_set) || profile.intervention_set.length === 0 || new Set(profile.intervention_set).size !== profile.intervention_set.length || profile.intervention_set.some((item) => !INTERVENTIONS.has(item))) {
    throw new Error("metric_profile.intervention_set must contain unique valid actions");
  }
  if (!Array.isArray(profile.research_claims)) {
    throw new Error("metric_profile.research_claims must be an array");
  }
  for (const [index, claim] of profile.research_claims.entries()) {
    requireObject(claim, `metric_profile.research_claims[${index}]`);
    requireString(claim.claim_id, `metric_profile.research_claims[${index}].claim_id`);
    if (typeof claim.value !== "number" || !Number.isFinite(claim.value)) {
      throw new Error(`metric_profile.research_claims[${index}].value must be finite`);
    }
    requireString(claim.unit, `metric_profile.research_claims[${index}].unit`);
    if (!CLAIM_STATUSES.has(claim.status)) {
      throw new Error(`metric_profile.research_claims[${index}].status is invalid`);
    }
    requireUri(claim.source_uri, `metric_profile.research_claims[${index}].source_uri`);
  }

  requireObject(receipt.measurements, "measurements");
  const m = receipt.measurements;
  requireNullableNonNegative(m.delta_t, "measurements.delta_t");
  requireNullableFinite(m.delta_t_signed, "measurements.delta_t_signed");
  requireNullableUnitInterval(m.dc, "measurements.dc");
  requireNullableNonNegative(m.dr, "measurements.dr");
  requireNullableUnitInterval(m.memory_saturation, "measurements.memory_saturation");
  requireNullableNonNegative(m.w2_res_rag, "measurements.w2_res_rag");
  requireNullableUnitInterval(m.organizational_incoherence, "measurements.organizational_incoherence");
  requireNullableUnitInterval(m.anchoring, "measurements.anchoring");
  if (!TASK_MODES.has(m.task_mode)) throw new Error("measurements.task_mode is invalid");
  if (!CYCLE_PHASES.has(m.semantic_cycle_phase)) throw new Error("measurements.semantic_cycle_phase is invalid");
  if (m.semantic_cycle_complete !== null && typeof m.semantic_cycle_complete !== "boolean") {
    throw new Error("measurements.semantic_cycle_complete must be null or boolean");
  }

  if (!Array.isArray(receipt.evidence)) throw new Error("evidence must be an array");
  for (const [index, item] of receipt.evidence.entries()) {
    requireObject(item, `evidence[${index}]`);
    requireUri(item.uri, `evidence[${index}].uri`);
    if (!HASH_PATTERN.test(item.sha256 ?? "")) throw new Error(`Invalid evidence item at index ${index}`);
  }

  const decisionValues = [m.dr, m.memory_saturation, m.w2_res_rag, m.organizational_incoherence, m.anchoring];
  if (decisionValues.some((value) => value === null) && receipt.classification !== "indeterminate") {
    throw new Error("Missing decision measurements require indeterminate classification");
  }
  if (receipt.classification === "governable") {
    const isGovernable = m.w2_res_rag >= profile.epsilon_min
      && m.w2_res_rag <= profile.epsilon_max
      && m.dr <= 1
      && m.memory_saturation < profile.memory_warning
      && m.organizational_incoherence < profile.organizational_warning
      && m.anchoring >= profile.anchoring_min;
    if (!isGovernable) throw new Error("Measurements do not satisfy the governable reference rule");
  }

  canonicalize(receipt);
}

export function verifyV11Receipt(receipt, predecessor = null) {
  validateV11Structure(receipt);
  const expectedState = calculateStateHash(receipt);
  if (receipt.state_hash !== expectedState) {
    throw new Error(`State hash mismatch: expected ${expectedState}, received ${receipt.state_hash}`);
  }
  const expectedReceipt = calculateReceiptHash(receipt);
  if (receipt.receipt_hash !== expectedReceipt) {
    throw new Error(`Receipt hash mismatch: expected ${expectedReceipt}, received ${receipt.receipt_hash}`);
  }
  if (predecessor !== null) {
    if (predecessor.version === "1.0.0") verifyV1Receipt(predecessor);
    else if (predecessor.version === "1.1.0") verifyV11Receipt(predecessor);
    else throw new Error("Unsupported predecessor version");
    if (receipt.previous_receipt_hash !== predecessor.receipt_hash) {
      throw new Error("Previous receipt hash does not match predecessor");
    }
  }
  return { observation_id: receipt.observation_id, state_hash: expectedState, receipt_hash: expectedReceipt };
}

async function main() {
  const [, , receiptPath, predecessorPath] = process.argv;
  if (!receiptPath) throw new Error("Usage: node protocol/tools/verify_receipt_v1_1.mjs RECEIPT [PREDECESSOR]");
  const receipt = parseStrictJson(await readFile(receiptPath, "utf8"));
  const predecessor = predecessorPath ? parseStrictJson(await readFile(predecessorPath, "utf8")) : null;
  const result = verifyV11Receipt(receipt, predecessor);
  process.stdout.write(`${JSON.stringify({ valid: true, ...result }, null, 2)}\n`);
}

const invokedPath = process.argv[1] ? pathToFileURL(process.argv[1]).href : "";
if (import.meta.url === invokedPath) {
  main().catch((error) => {
    process.stderr.write(`CSNP-RP 1.1 verification failed: ${error.message}\n`);
    process.exitCode = 1;
  });
}

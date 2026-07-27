#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

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
  "retrieve",
  "clarify",
  "human_handoff",
  "stop",
]);

function compareCodePoints(left, right) {
  const a = Array.from(left, (character) => character.codePointAt(0));
  const b = Array.from(right, (character) => character.codePointAt(0));
  const length = Math.min(a.length, b.length);
  for (let index = 0; index < length; index += 1) {
    if (a[index] !== b[index]) return a[index] - b[index];
  }
  return a.length - b.length;
}

export function canonicalize(value) {
  if (value === null || typeof value === "boolean" || typeof value === "string") {
    return JSON.stringify(value);
  }

  if (typeof value === "number") {
    if (!Number.isFinite(value) || Object.is(value, -0)) {
      throw new Error("Canonical JSON rejects non-finite numbers and negative zero");
    }
    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    return `[${value.map((item) => canonicalize(item)).join(",")}]`;
  }

  if (typeof value === "object") {
    const keys = Object.keys(value).sort(compareCodePoints);
    const fields = keys.map(
      (key) => `${JSON.stringify(key)}:${canonicalize(value[key])}`,
    );
    return `{${fields.join(",")}}`;
  }

  throw new Error(`Unsupported JSON value type: ${typeof value}`);
}

export function sha256(value) {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

export function stateProjection(receipt) {
  return {
    metric_profile: receipt.metric_profile,
    measurements: receipt.measurements,
    observation_id: receipt.observation_id,
    observed_at: receipt.observed_at,
    previous_receipt_hash: receipt.previous_receipt_hash,
  };
}

export function calculateStateHash(receipt) {
  return sha256(canonicalize(stateProjection(receipt)));
}

export function calculateReceiptHash(receipt) {
  const unsigned = { ...receipt };
  delete unsigned.receipt_hash;
  return sha256(canonicalize(unsigned));
}

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

function requireUnitInterval(value, label) {
  if (value !== null && (
    typeof value !== "number"
    || !Number.isFinite(value)
    || value < 0
    || value > 1
  )) {
    throw new Error(`${label} must be null or a finite number in [0, 1]`);
  }
}

function requireFiniteNumber(value, label) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`${label} must be a finite number`);
  }
}

function requireNonNegative(value, label) {
  if (value !== null && (
    typeof value !== "number"
    || !Number.isFinite(value)
    || value < 0
  )) {
    throw new Error(`${label} must be null or a finite non-negative number`);
  }
}

export function validateStructure(receipt) {
  requireObject(receipt, "receipt");
  if (receipt.protocol !== "CSNP-RP") throw new Error("Unsupported protocol");
  if (receipt.version !== "1.0.0") throw new Error("Unsupported version");
  if (receipt.hash_algorithm !== "sha256") throw new Error("Unsupported hash");
  if (receipt.canonicalization !== "RES-RAG-C14N-1") {
    throw new Error("Unsupported canonicalization");
  }
  if (!CLASSIFICATIONS.has(receipt.classification)) {
    throw new Error("Invalid classification");
  }
  if (!INTERVENTIONS.has(receipt.intervention)) {
    throw new Error("Invalid intervention");
  }
  if (!HASH_PATTERN.test(receipt.state_hash ?? "")) {
    throw new Error("Invalid state_hash");
  }
  if (!HASH_PATTERN.test(receipt.receipt_hash ?? "")) {
    throw new Error("Invalid receipt_hash");
  }
  if (
    receipt.previous_receipt_hash !== null
    && !HASH_PATTERN.test(receipt.previous_receipt_hash ?? "")
  ) {
    throw new Error("Invalid previous_receipt_hash");
  }
  requireString(receipt.observation_id, "observation_id");
  if (!/^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/.test(receipt.observation_id)) {
    throw new Error("Invalid observation_id");
  }
  requireString(receipt.observed_at, "observed_at");
  if (
    !receipt.observed_at.endsWith("Z")
    || Number.isNaN(Date.parse(receipt.observed_at))
  ) {
    throw new Error("observed_at must be a valid UTC RFC 3339 timestamp");
  }

  requireObject(receipt.metric_profile, "metric_profile");
  const profile = receipt.metric_profile;
  requireString(profile.profile_id, "metric_profile.profile_id");
  requireString(profile.profile_version, "metric_profile.profile_version");
  requireString(
    profile.state_representation,
    "metric_profile.state_representation",
  );
  requireString(profile.ground_metric, "metric_profile.ground_metric");
  requireString(profile.distance_unit, "metric_profile.distance_unit");
  requireString(profile.time_unit, "metric_profile.time_unit");
  requireFiniteNumber(profile.epsilon_min, "metric_profile.epsilon_min");
  requireFiniteNumber(profile.epsilon_max, "metric_profile.epsilon_max");
  if (profile.epsilon_min < 0 || profile.epsilon_max <= profile.epsilon_min) {
    throw new Error("The stable band must satisfy 0 <= epsilon_min < epsilon_max");
  }
  requireUnitInterval(profile.memory_warning, "metric_profile.memory_warning");
  requireUnitInterval(
    profile.organizational_warning,
    "metric_profile.organizational_warning",
  );
  requireUnitInterval(profile.anchoring_min, "metric_profile.anchoring_min");
  if (
    !Number.isInteger(profile.irreversibility_horizon)
    || profile.irreversibility_horizon < 1
  ) {
    throw new Error("metric_profile.irreversibility_horizon must be a positive integer");
  }
  if (
    !Array.isArray(profile.intervention_set)
    || profile.intervention_set.length === 0
    || new Set(profile.intervention_set).size !== profile.intervention_set.length
    || profile.intervention_set.some((item) => !INTERVENTIONS.has(item))
  ) {
    throw new Error("metric_profile.intervention_set must contain unique valid actions");
  }

  requireObject(receipt.measurements, "measurements");
  requireNonNegative(receipt.measurements.delta_t, "measurements.delta_t");
  requireUnitInterval(receipt.measurements.dc, "measurements.dc");
  requireNonNegative(receipt.measurements.dr, "measurements.dr");
  requireUnitInterval(
    receipt.measurements.memory_saturation,
    "measurements.memory_saturation",
  );
  requireNonNegative(
    receipt.measurements.w2_res_rag,
    "measurements.w2_res_rag",
  );
  requireUnitInterval(
    receipt.measurements.organizational_incoherence,
    "measurements.organizational_incoherence",
  );
  requireUnitInterval(receipt.measurements.anchoring, "measurements.anchoring");

  if (!Array.isArray(receipt.evidence)) throw new Error("evidence must be an array");
  for (const [index, item] of receipt.evidence.entries()) {
    requireObject(item, `evidence[${index}]`);
    try {
      new URL(item.uri);
    } catch {
      throw new Error(`Invalid evidence URI at index ${index}`);
    }
    if (!HASH_PATTERN.test(item.sha256 ?? "")) {
      throw new Error(`Invalid evidence item at index ${index}`);
    }
  }

  const decisionValues = [
    receipt.measurements.dr,
    receipt.measurements.memory_saturation,
    receipt.measurements.w2_res_rag,
    receipt.measurements.organizational_incoherence,
    receipt.measurements.anchoring,
  ];
  if (
    decisionValues.some((value) => value === null)
    && receipt.classification !== "indeterminate"
  ) {
    throw new Error("Missing decision measurements require indeterminate classification");
  }
  if (receipt.classification === "governable") {
    const m = receipt.measurements;
    const isGovernable = (
      m.w2_res_rag >= profile.epsilon_min
      && m.w2_res_rag <= profile.epsilon_max
      && m.dr <= 1
      && m.memory_saturation < profile.memory_warning
      && m.organizational_incoherence < profile.organizational_warning
      && m.anchoring >= profile.anchoring_min
    );
    if (!isGovernable) {
      throw new Error("Measurements do not satisfy the governable reference rule");
    }
  }

  canonicalize(receipt);
}

export function verifyReceipt(receipt, predecessor = null) {
  validateStructure(receipt);
  const expectedState = calculateStateHash(receipt);
  if (receipt.state_hash !== expectedState) {
    throw new Error(
      `State hash mismatch: expected ${expectedState}, received ${receipt.state_hash}`,
    );
  }

  const expectedReceipt = calculateReceiptHash(receipt);
  if (receipt.receipt_hash !== expectedReceipt) {
    throw new Error(
      `Receipt hash mismatch: expected ${expectedReceipt}, received ${receipt.receipt_hash}`,
    );
  }

  if (predecessor !== null) {
    verifyReceipt(predecessor);
    if (receipt.previous_receipt_hash !== predecessor.receipt_hash) {
      throw new Error("Previous receipt hash does not match predecessor");
    }
  }

  return {
    observation_id: receipt.observation_id,
    state_hash: expectedState,
    receipt_hash: expectedReceipt,
  };
}

async function main() {
  const [, , receiptPath, predecessorPath] = process.argv;
  if (!receiptPath) {
    throw new Error(
      "Usage: node protocol/tools/verify_receipt.mjs RECEIPT [PREDECESSOR]",
    );
  }

  const receipt = JSON.parse(await readFile(receiptPath, "utf8"));
  const predecessor = predecessorPath
    ? JSON.parse(await readFile(predecessorPath, "utf8"))
    : null;
  const result = verifyReceipt(receipt, predecessor);
  process.stdout.write(`${JSON.stringify({ valid: true, ...result }, null, 2)}\n`);
}

const invokedPath = process.argv[1]
  ? new URL(`file://${process.argv[1]}`).href
  : "";
if (import.meta.url === invokedPath) {
  main().catch((error) => {
    process.stderr.write(`CSNP-RP verification failed: ${error.message}\n`);
    process.exitCode = 1;
  });
}

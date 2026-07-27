#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

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

function assertWellFormedUnicode(value, label = "JSON string") {
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    if (code >= 0xd800 && code <= 0xdbff) {
      const next = value.charCodeAt(index + 1);
      if (!(next >= 0xdc00 && next <= 0xdfff)) {
        throw new Error(`${label} contains an unpaired high surrogate`);
      }
      index += 1;
    } else if (code >= 0xdc00 && code <= 0xdfff) {
      throw new Error(`${label} contains an unpaired low surrogate`);
    }
  }
}

export function canonicalize(value) {
  if (value === null || typeof value === "boolean") {
    return JSON.stringify(value);
  }

  if (typeof value === "string") {
    assertWellFormedUnicode(value);
    return JSON.stringify(value);
  }

  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      throw new Error("RFC 8785 JSON canonicalization rejects non-finite numbers");
    }
    return JSON.stringify(value);
  }

  if (Array.isArray(value)) {
    return `[${value.map((item) => canonicalize(item)).join(",")}]`;
  }

  if (typeof value === "object") {
    const keys = Object.keys(value).sort();
    const fields = keys.map((key) => {
      assertWellFormedUnicode(key, "JSON object key");
      return `${JSON.stringify(key)}:${canonicalize(value[key])}`;
    });
    return `{${fields.join(",")}}`;
  }

  throw new Error(`Unsupported JSON value type: ${typeof value}`);
}

export function parseStrictJson(text) {
  if (typeof text !== "string") throw new Error("JSON input must be text");
  let cursor = 0;

  function skipWhitespace() {
    while (
      cursor < text.length
      && (
        text[cursor] === " "
        || text[cursor] === "\t"
        || text[cursor] === "\n"
        || text[cursor] === "\r"
      )
    ) {
      cursor += 1;
    }
  }

  function parseString() {
    if (text[cursor] !== "\"") throw new Error(`Expected string at byte ${cursor}`);
    const start = cursor;
    cursor += 1;
    while (cursor < text.length) {
      const character = text[cursor];
      if (character === "\"") {
        cursor += 1;
        const value = JSON.parse(text.slice(start, cursor));
        assertWellFormedUnicode(value);
        return value;
      }
      if (character === "\\") {
        cursor += 2;
      } else {
        cursor += 1;
      }
    }
    throw new Error(`Unterminated string at byte ${start}`);
  }

  function parseNumber() {
    const match = /-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/y;
    match.lastIndex = cursor;
    const result = match.exec(text);
    if (!result) throw new Error(`Invalid number at byte ${cursor}`);
    cursor = match.lastIndex;
  }

  function parseLiteral(literal) {
    if (text.slice(cursor, cursor + literal.length) !== literal) {
      throw new Error(`Invalid literal at byte ${cursor}`);
    }
    cursor += literal.length;
  }

  function parseArray() {
    cursor += 1;
    skipWhitespace();
    if (text[cursor] === "]") {
      cursor += 1;
      return;
    }
    while (true) {
      parseValue();
      skipWhitespace();
      if (text[cursor] === "]") {
        cursor += 1;
        return;
      }
      if (text[cursor] !== ",") throw new Error(`Expected comma at byte ${cursor}`);
      cursor += 1;
      skipWhitespace();
    }
  }

  function parseObject() {
    cursor += 1;
    const keys = new Set();
    skipWhitespace();
    if (text[cursor] === "}") {
      cursor += 1;
      return;
    }
    while (true) {
      const key = parseString();
      if (keys.has(key)) throw new Error(`Duplicate JSON object key: ${key}`);
      keys.add(key);
      skipWhitespace();
      if (text[cursor] !== ":") throw new Error(`Expected colon at byte ${cursor}`);
      cursor += 1;
      parseValue();
      skipWhitespace();
      if (text[cursor] === "}") {
        cursor += 1;
        return;
      }
      if (text[cursor] !== ",") throw new Error(`Expected comma at byte ${cursor}`);
      cursor += 1;
      skipWhitespace();
    }
  }

  function parseValue() {
    skipWhitespace();
    const character = text[cursor];
    if (character === "{") parseObject();
    else if (character === "[") parseArray();
    else if (character === "\"") parseString();
    else if (character === "t") parseLiteral("true");
    else if (character === "f") parseLiteral("false");
    else if (character === "n") parseLiteral("null");
    else parseNumber();
  }

  parseValue();
  skipWhitespace();
  if (cursor !== text.length) throw new Error(`Unexpected content at byte ${cursor}`);
  const parsed = JSON.parse(text);
  canonicalize(parsed);
  return parsed;
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

function requireRequiredUnitInterval(value, label) {
  if (
    typeof value !== "number"
    || !Number.isFinite(value)
    || value < 0
    || value > 1
  ) {
    throw new Error(`${label} must be a finite number in [0, 1]`);
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
  if (receipt.canonicalization !== "JCS-RFC8785") {
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
  const timestamp = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.\d+)?Z$/
    .exec(receipt.observed_at);
  if (!timestamp) {
    throw new Error("observed_at must be a valid UTC RFC 3339 timestamp");
  }
  const [, yearText, monthText, dayText, hourText, minuteText, secondText] =
    timestamp;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const hour = Number(hourText);
  const minute = Number(minuteText);
  const second = Number(secondText);
  const leapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const daysInMonth = [
    31,
    leapYear ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  if (
    year === 0
    || month < 1
    || month > 12
    || day < 1
    || day > daysInMonth[month - 1]
    || hour > 23
    || minute > 59
    || second > 59
  ) {
    throw new Error("observed_at must be a real UTC calendar date and time");
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
  if (profile.epsilon_min <= 0 || profile.epsilon_max <= profile.epsilon_min) {
    throw new Error("The stable band must satisfy 0 < epsilon_min < epsilon_max");
  }
  requireRequiredUnitInterval(
    profile.memory_warning,
    "metric_profile.memory_warning",
  );
  requireRequiredUnitInterval(
    profile.organizational_warning,
    "metric_profile.organizational_warning",
  );
  requireRequiredUnitInterval(
    profile.anchoring_min,
    "metric_profile.anchoring_min",
  );
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

  const receipt = parseStrictJson(await readFile(receiptPath, "utf8"));
  const predecessor = predecessorPath
    ? parseStrictJson(await readFile(predecessorPath, "utf8"))
    : null;
  const result = verifyReceipt(receipt, predecessor);
  process.stdout.write(`${JSON.stringify({ valid: true, ...result }, null, 2)}\n`);
}

const invokedPath = process.argv[1] ? pathToFileURL(process.argv[1]).href : "";
if (import.meta.url === invokedPath) {
  main().catch((error) => {
    process.stderr.write(`CSNP-RP verification failed: ${error.message}\n`);
    process.exitCode = 1;
  });
}

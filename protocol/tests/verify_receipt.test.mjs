import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  calculateReceiptHash,
  calculateStateHash,
  canonicalize,
  parseStrictJson,
  verifyReceipt,
} from "../tools/verify_receipt.mjs";

const exampleUrl = new URL("../examples/csnp-receipt.example.json", import.meta.url);
const cliUrl = new URL("../tools/verify_receipt.mjs", import.meta.url);

async function loadExample() {
  return parseStrictJson(await readFile(exampleUrl, "utf8"));
}

function clone(value) {
  return structuredClone(value);
}

function sign(receipt) {
  receipt.state_hash = calculateStateHash(receipt);
  receipt.receipt_hash = calculateReceiptHash(receipt);
  return receipt;
}

test("the repository example verifies", async () => {
  const receipt = await loadExample();
  const result = verifyReceipt(receipt);
  assert.equal(result.receipt_hash, receipt.receipt_hash);
});

test("RFC 8785 canonicalization fixes key and number serialization", () => {
  assert.equal(
    canonicalize({ b: 1e-7, a: -0 }),
    "{\"a\":0,\"b\":1e-7}",
  );
});

test("strict JSON parsing rejects duplicate decoded keys", () => {
  assert.throws(
    () => parseStrictJson("{\"a\":1,\"\\u0061\":2}"),
    /Duplicate JSON object key: a/,
  );
});

test("strict JSON parsing rejects values outside the finite JCS domain", () => {
  assert.throws(
    () => parseStrictJson("{\"n\":1e999}"),
    /rejects non-finite numbers/,
  );
});

test("measurement tampering is detected", async () => {
  const receipt = await loadExample();
  receipt.measurements.w2_res_rag = 0.5;
  assert.throws(() => verifyReceipt(receipt), /State hash mismatch/);
});

test("receipt metadata tampering is detected", async () => {
  const receipt = await loadExample();
  receipt.classification = "critical";
  assert.notEqual(calculateReceiptHash(receipt), receipt.receipt_hash);
  assert.throws(() => verifyReceipt(receipt), /Receipt hash mismatch/);
});

test("a valid two-receipt predecessor chain verifies", async () => {
  const predecessor = await loadExample();
  const receipt = clone(predecessor);
  receipt.observation_id = "study-a-0002";
  receipt.observed_at = "2026-07-27T00:00:01Z";
  receipt.previous_receipt_hash = predecessor.receipt_hash;
  sign(receipt);

  const result = verifyReceipt(receipt, predecessor);
  assert.equal(result.receipt_hash, receipt.receipt_hash);
});

test("a broken predecessor link is rejected", async () => {
  const predecessor = await loadExample();
  const receipt = clone(predecessor);
  receipt.observation_id = "study-a-0002";
  receipt.observed_at = "2026-07-27T00:00:01Z";
  receipt.previous_receipt_hash = "f".repeat(64);
  sign(receipt);

  assert.throws(
    () => verifyReceipt(receipt, predecessor),
    /Previous receipt hash does not match predecessor/,
  );
});

test("unsupported protocol and version are rejected", async () => {
  const cases = [
    ["protocol", "CSNP"],
    ["version", "0.0.0"],
  ];
  for (const [field, value] of cases) {
    const receipt = await loadExample();
    receipt[field] = value;
    assert.throws(() => verifyReceipt(receipt), /Unsupported/);
  }
});

test("invalid classification and intervention are rejected", async () => {
  const cases = [
    ["classification", "unsafe"],
    ["intervention", "continue_anyway"],
  ];
  for (const [field, value] of cases) {
    const receipt = await loadExample();
    receipt[field] = value;
    assert.throws(() => verifyReceipt(receipt), /Invalid/);
  }
});

test("missing decision data requires an indeterminate classification", async () => {
  const receipt = await loadExample();
  receipt.measurements.dr = null;
  assert.throws(
    () => verifyReceipt(receipt),
    /Missing decision measurements require indeterminate classification/,
  );
});

test("the stable band requires a strictly positive ordered lower bound", async () => {
  const cases = [
    [0, 0.6],
    [0.6, 0.6],
    [0.7, 0.6],
  ];
  for (const [minimum, maximum] of cases) {
    const receipt = await loadExample();
    receipt.metric_profile.epsilon_min = minimum;
    receipt.metric_profile.epsilon_max = maximum;
    assert.throws(
      () => verifyReceipt(receipt),
      /0 < epsilon_min < epsilon_max/,
    );
  }
});

test("calibration thresholds cannot be null", async () => {
  const fields = [
    "memory_warning",
    "organizational_warning",
    "anchoring_min",
  ];
  for (const field of fields) {
    const receipt = await loadExample();
    receipt.metric_profile[field] = null;
    assert.throws(
      () => verifyReceipt(receipt),
      new RegExp(`metric_profile\\.${field} must be a finite number`),
    );
  }
});

test("observed_at rejects impossible dates and non-RFC layouts", async () => {
  const invalidValues = [
    "2026-02-30T00:00:00Z",
    "2026-07-27 00:00:00Z",
    "2026-07-27T24:00:00Z",
    "0000-01-01T00:00:00Z",
  ];
  for (const value of invalidValues) {
    const receipt = await loadExample();
    receipt.observed_at = value;
    assert.throws(
      () => verifyReceipt(receipt),
      /observed_at must be/,
    );
  }
});

test("the CLI verifies the repository example end to end", () => {
  const result = spawnSync(
    process.execPath,
    [fileURLToPath(cliUrl), fileURLToPath(exampleUrl)],
    { encoding: "utf8" },
  );
  assert.equal(result.status, 0, result.stderr);
  assert.equal(JSON.parse(result.stdout).valid, true);
});

test("the CLI fails clearly when no receipt path is supplied", () => {
  const result = spawnSync(
    process.execPath,
    [fileURLToPath(cliUrl)],
    { encoding: "utf8" },
  );
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /^CSNP-RP verification failed:/);
});

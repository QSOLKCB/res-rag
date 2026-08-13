import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  calculateReceiptHash,
  calculateStateHash,
  parseStrictJson,
} from "../tools/verify_receipt.mjs";
import { verifyV11Receipt } from "../tools/verify_receipt_v1_1.mjs";

const exampleUrl = new URL("../examples/csnp-receipt-v1.1.0.example.json", import.meta.url);
const cliUrl = new URL("../tools/verify_receipt_v1_1.mjs", import.meta.url);

async function loadExample() {
  return parseStrictJson(await readFile(exampleUrl, "utf8"));
}

function sign(receipt) {
  receipt.state_hash = calculateStateHash(receipt);
  receipt.receipt_hash = calculateReceiptHash(receipt);
  return receipt;
}

test("the v1.1 repository example verifies", async () => {
  const receipt = await loadExample();
  assert.equal(verifyV11Receipt(receipt).receipt_hash, receipt.receipt_hash);
});

test("signed temporal offset preserves RAG/RES direction", async () => {
  const receipt = await loadExample();
  receipt.measurements.delta_t_signed = -0.18;
  receipt.measurements.delta_t = 0.18;
  sign(receipt);
  assert.equal(verifyV11Receipt(receipt).receipt_hash, receipt.receipt_hash);
});

test("research thresholds remain explicitly provenance-labelled", async () => {
  const receipt = await loadExample();
  receipt.metric_profile.research_claims[0].status = "universal_fact";
  sign(receipt);
  assert.throws(() => verifyV11Receipt(receipt), /status is invalid/);
});

test("the HAL profile requires local calibration policy", async () => {
  const receipt = await loadExample();
  receipt.metric_profile.threshold_policy = "universal";
  sign(receipt);
  assert.throws(() => verifyV11Receipt(receipt), /local-calibration-only/);
});

test("multitask brake is a valid recorded intervention", async () => {
  const receipt = await loadExample();
  assert.equal(receipt.intervention, "multitask_brake");
  assert.doesNotThrow(() => verifyV11Receipt(receipt));
});

test("measurement tampering is detected", async () => {
  const receipt = await loadExample();
  receipt.measurements.w2_res_rag = 0.5;
  assert.throws(() => verifyV11Receipt(receipt), /State hash mismatch/);
});

test("the v1.1 CLI verifies the example end to end", () => {
  const result = spawnSync(process.execPath, [fileURLToPath(cliUrl), fileURLToPath(exampleUrl)], { encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
  assert.equal(JSON.parse(result.stdout).valid, true);
});

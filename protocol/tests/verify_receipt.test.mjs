import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import {
  calculateReceiptHash,
  verifyReceipt,
} from "../tools/verify_receipt.mjs";

const exampleUrl = new URL("../examples/csnp-receipt.example.json", import.meta.url);

async function loadExample() {
  return JSON.parse(await readFile(exampleUrl, "utf8"));
}

test("the repository example verifies", async () => {
  const receipt = await loadExample();
  const result = verifyReceipt(receipt);
  assert.equal(result.receipt_hash, receipt.receipt_hash);
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

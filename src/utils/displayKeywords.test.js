import test from "node:test";
import assert from "node:assert/strict";
import { getDisplayKeywords } from "./displayKeywords.js";

test("Gloomspite command roles retain their limits without duplicate generic labels", () => {
  const keywords = ["Champion", "Standard Bearer", "Moonclan", "Musician", "Infantry", "Musician (1/20)", "Standard Bearer (1/20)"];
  assert.deepEqual(getDisplayKeywords(keywords), ["Champion", "Moonclan", "Infantry", "Musician (1/20)", "Standard Bearer (1/20)"]);
  assert.ok(keywords.includes("Musician"), "eligibility keywords remain unchanged");
});

test("keeps levels and distinct keywords while deduplicating case and whitespace", () => {
  assert.deepEqual(getDisplayKeywords(["Wizard", "WIZARD (2)", "Hero", " hero ", "Ward (4+)", "War Machine"]),
    ["WIZARD (2)", "hero", "Ward (4+)", "War Machine"]);
  assert.deepEqual(getDisplayKeywords(), []);
});

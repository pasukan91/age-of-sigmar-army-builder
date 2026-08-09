import assert from "node:assert/strict";
import test from "node:test";
import { shouldUseAosCommunityCatalogue } from "./aosCommunityCataloguePolicy.js";

test("Ogor Mawtribes can explicitly reject catalogue updates", () => {
  assert.equal(shouldUseAosCommunityCatalogue({ useAosCommunityCatalogue: false }), false);
});

test("other factions use catalogue updates by default", () => {
  assert.equal(shouldUseAosCommunityCatalogue({}), true);
});

import assert from "node:assert/strict";
import test from "node:test";

import { getEnhancementTiming, withEnhancementTiming } from "./enhancementTiming.js";

test("uses the timing of the SigDex ability nested inside an enhancement", () => {
  const abyssalDweller = {
    name: "Abyssal Dweller",
    abilities: [{
      name: "Abyssal Dweller",
      phase: "Once Per Battle, Any Hero Phase",
      type: "Ability",
    }],
  };

  assert.equal(
    getEnhancementTiming(abyssalDweller),
    "Once Per Battle, Any Hero Phase"
  );
  assert.equal(
    withEnhancementTiming(abyssalDweller).phase,
    "Once Per Battle, Any Hero Phase"
  );
});

test("prefers an explicit enhancement phase over its nested ability", () => {
  assert.equal(
    getEnhancementTiming({
      phase: "Deployment Phase",
      abilities: [{ phase: "Passive" }],
    }),
    "Deployment Phase"
  );
});

test("does not let a generic nested Passive hide a specific textual reaction", () => {
  assert.match(
    getEnhancementTiming({
      abilities: [{ phase: "Passive" }],
      description: "Reaction: Opponent declared a Redeploy command.",
    }),
    /Redeploy/i
  );
});

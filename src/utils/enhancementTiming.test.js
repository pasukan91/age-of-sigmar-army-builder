import assert from "node:assert/strict";
import test from "node:test";

import {
  getEnhancementAbilities,
  getEnhancementTiming,
  withEnhancementTiming,
} from "./enhancementTiming.js";

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

test("gives every nested enhancement ability its own timing", () => {
  const abilities = getEnhancementAbilities({
    id: "many-faces",
    name: "Many Faces",
    abilities: [
      { id: "hidden-blade", name: "Hidden Blade", phase: "Any Combat Phase" },
      { name: "Sudden Escape", description: "Reaction: Opponent declared a Fight ability." },
      { name: "Uncanny Resilience", description: "Effect: This unit has Ward (6+)." },
    ],
  });

  assert.deepEqual(
    abilities.map((ability) => ability.phase),
    ["Any Combat Phase", "Reaction: Opponent declared a Fight ability.", "Passive"],
  );
  assert.equal(abilities[1].id, "many-faces-ability-2");
});

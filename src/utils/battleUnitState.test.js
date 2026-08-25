import assert from "node:assert/strict";
import test from "node:test";
import {
  getBattleUnitState,
  getUnitStartingModels,
  normalizeBattleUnitStates,
} from "./battleUnitState.js";

test("uses configured models and clamps remaining models", () => {
  const unit = { configuredModels: 20, details: { models: 10 }, reinforced: true };

  assert.equal(getUnitStartingModels(unit), 20);
  assert.deepEqual(getBattleUnitState({ remainingModels: 30 }, unit), {
    remainingModels: 20,
    modifiers: [],
  });
});

test("keeps only supported positive modifiers in stored state", () => {
  assert.deepEqual(normalizeBattleUnitStates({
    "unit-1": {
      remainingModels: 8,
      modifiers: ["hit-plus-1", "unknown", "hit-plus-1", "crit-mortal-5"],
    },
  }), {
    "unit-1": {
      remainingModels: 8,
      modifiers: ["hit-plus-1", "crit-mortal-5"],
    },
  });
});

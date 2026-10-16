import assert from "node:assert/strict";
import test from "node:test";
import {
  clearBattleUnitModifiers,
  getBattleUnitState,
  getUnitForBattleReference,
  getUnitStartingModels,
  normalizeBattleUnitStates,
} from "./battleUnitState.js";

test("uses configured models and clamps remaining models", () => {
  const unit = { configuredModels: 20, details: { models: 10 }, reinforced: true };

  assert.equal(getUnitStartingModels(unit), 20);
  assert.deepEqual(getBattleUnitState({ remainingModels: 30 }, unit), {
    remainingModels: 20,
    modifiers: [],
    customModifiers: [],
    inCombat: false,
  });
});

test("passes the remaining models to battle damage calculations", () => {
  const unit = {
    id: "moonclan-stabbas",
    configuredModels: 20,
    details: { models: 20 },
  };

  assert.deepEqual(
    getUnitForBattleReference(unit, { remainingModels: 7 }),
    { ...unit, calculatorModels: 7 }
  );
  assert.equal(
    getUnitForBattleReference(unit, { remainingModels: 0 }).calculatorModels,
    0
  );
});

test("keeps only supported positive modifiers in stored state", () => {
  assert.deepEqual(normalizeBattleUnitStates({
    "unit-1": {
      remainingModels: 8,
      modifiers: ["hit-plus-1", "unknown", "hit-plus-1", "crit-mortal-5"],
      customModifiers: ["  Corre y carga  ", "corre y carga", "Ataques +2"],
      inCombat: true,
    },
  }), {
    "unit-1": {
      remainingModels: 8,
      modifiers: ["hit-plus-1", "crit-mortal-5"],
      customModifiers: ["Corre y carga", "Ataques +2"],
      inCombat: true,
    },
  });
});

test("clears round modifiers without restoring lost models", () => {
  assert.deepEqual(clearBattleUnitModifiers({
    "unit-1": {
      remainingModels: 4,
      modifiers: ["save-plus-1"],
      customModifiers: ["Ataca primero"],
      inCombat: true,
    },
  }), {
    "unit-1": {
      remainingModels: 4,
      modifiers: [],
      customModifiers: [],
      inCombat: true,
    },
  });
});

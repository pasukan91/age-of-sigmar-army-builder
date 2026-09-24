import assert from "node:assert/strict";
import test from "node:test";
import { calculateArmyPoints } from "./armyPoints.js";

test("applies the September 2026 cumulative auxiliary surcharge", () => {
  const list = {
    regiments: [],
    auxiliaries: [
      { points: 100 },
      { points: 100 },
      { points: 100, reinforced: true },
      { points: 100 },
    ],
  };

  assert.equal(calculateArmyPoints(list), 620);
});

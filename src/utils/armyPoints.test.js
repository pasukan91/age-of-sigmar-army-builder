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

test("adds every selected SigDex enhancement category", () => {
  const list = {
    regiments: [{
      hero: {
        points: 200,
        specialEnhancements: {
          "Big Names": { id: "big-name", points: 10 },
          "Monstrous Traits": { id: "monster-trait", points: 20 },
        },
      },
      units: [],
    }],
    auxiliaries: [],
  };

  assert.equal(calculateArmyPoints(list), 230);
});

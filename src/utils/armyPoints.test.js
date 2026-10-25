import assert from "node:assert/strict";
import test from "node:test";
import catalogue from "../data/sigdexAllFactions.generated.json" with { type: "json" };
import regimentsOfRenown from "../data/regimentsOfRenown.js";
import { calculateArmyPoints, getUnitPoints } from "./armyPoints.js";

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

test("every current warscroll has valid points and reinforcement arithmetic", () => {
  let checkedUnits = 0;
  let checkedReinforcements = 0;

  catalogue.factions.forEach((faction) => {
    faction.units.forEach((unit) => {
      assert.ok(Number.isFinite(unit.points), `${faction.name}: ${unit.name} points`);
      assert.ok(unit.points >= 0, `${faction.name}: ${unit.name} negative points`);
      assert.equal(getUnitPoints(unit), unit.points, `${faction.name}: ${unit.name}`);
      checkedUnits += 1;

      if (unit.rules?.canBeReinforced) {
        assert.equal(
          getUnitPoints({ ...unit, reinforced: true }),
          unit.points * 2,
          `${faction.name}: ${unit.name} reinforced`,
        );
        checkedReinforcements += 1;
      }
    });
  });

  assert.equal(checkedUnits, 761);
  assert.ok(checkedReinforcements > 0);
});

test("Regiments of Renown charge only their package price", () => {
  regimentsOfRenown.forEach((regiment) => {
    assert.ok(Number.isFinite(regiment.points), `${regiment.name}: points`);
    assert.ok(regiment.points >= 0, `${regiment.name}: negative points`);
    assert.equal(
      calculateArmyPoints({ regimentsOfRenown: [regiment] }),
      regiment.points,
      regiment.name,
    );
  });
});

import assert from "node:assert/strict";
import test from "node:test";

import {
  averageDiceExpression,
  calculateExpectedDamage,
  getWeaponCritType,
} from "./damageCalculator.js";

test("averages fixed and random attacks or damage", () => {
  assert.equal(averageDiceExpression(3), 3);
  assert.equal(averageDiceExpression("D3"), 2);
  assert.equal(averageDiceExpression("2D6+1"), 8);
  assert.equal(averageDiceExpression("D6-1"), 2.5);
});

test("detects the supported critical weapon abilities", () => {
  assert.equal(getWeaponCritType({ abilities: ["Crit (2 Hits)"] }), "2-hits");
  assert.equal(getWeaponCritType({ abilities: ["Crit (Auto-wound)"] }), "auto-wound");
  assert.equal(getWeaponCritType({ abilities: ["Crit (Mortal)"] }), "mortal");
});

test("matches the catalogue calculator for the Beast-skewer Killbow", () => {
  const bolts = calculateExpectedDamage({
    attacks: 2,
    models: 1,
    hit: "4+",
    wound: "2+",
    rend: 2,
    damage: "D6",
    critType: "auto-wound",
    save: 2,
  });
  const blades = calculateExpectedDamage({
    attacks: 3,
    models: 1,
    hit: "4+",
    wound: "3+",
    rend: 0,
    damage: 1,
    critType: "mortal",
    save: 2,
  });

  assert.equal(bolts.toFixed(2), "1.56");
  assert.equal(blades.toFixed(2), "0.61");
  assert.equal((bolts + blades).toFixed(2), "2.17");
});

test("ward applies to mortal and normal damage while ethereal ignores rend", () => {
  const base = {
    attacks: 6,
    models: 1,
    hit: "2+",
    wound: "2+",
    rend: 3,
    damage: 1,
    save: 2,
  };

  assert.ok(
    calculateExpectedDamage({ ...base, ethereal: true }) <
      calculateExpectedDamage(base)
  );
  assert.equal(
    calculateExpectedDamage({ ...base, ward: 4 }).toFixed(4),
    (calculateExpectedDamage(base) / 2).toFixed(4)
  );
});

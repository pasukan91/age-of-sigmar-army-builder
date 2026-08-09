import assert from "node:assert/strict";
import test from "node:test";

import { calculateArmyHealth, getUnitHealth } from "./armyHealth.js";

const unit = ({ id, health, models = 1, reinforced = false }) => ({
  id,
  profile: { health },
  details: { models },
  reinforced,
});

test("multiplies health by models and reinforcement", () => {
  assert.equal(getUnitHealth(unit({ id: "infantry", health: 2, models: 10 })), 20);
  assert.equal(
    getUnitHealth(unit({ id: "reinforced-infantry", health: 2, models: 10, reinforced: true })),
    40
  );
});

test("adds leaders, regiment units and every Regiment of Renown unit", () => {
  const leader = unit({ id: "leader", health: 7 });
  const infantry = unit({ id: "infantry", health: 2, models: 10, reinforced: true });
  const renownHero = unit({ id: "renown-hero", health: 6 });
  const renownTroops = unit({ id: "renown-troops", health: 3, models: 5 });
  const list = {
    regiments: [{ hero: leader, units: [infantry] }],
    regimentsOfRenown: [{ unitIds: ["renown-hero", "renown-troops", "renown-troops"] }],
  };
  const catalogue = [{ units: [renownHero, renownTroops] }];

  assert.equal(calculateArmyHealth(list, catalogue), 7 + 40 + 6 + 15 + 15);
});

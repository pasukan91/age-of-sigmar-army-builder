import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const catalogue = JSON.parse(
  readFileSync(new URL("../src/data/additionalBattletomeFactions.generated.json", import.meta.url), "utf8"),
);

const factions = new Map(catalogue.factions.map((faction) => [faction.id, faction]));

test("includes only the additional factions with a confirmed fourth-edition battletome", () => {
  assert.deepEqual(
    [...factions.keys()],
    ["stormcast", "idoneth", "kharadron", "nighthaunt", "flesheater"],
  );
  assert.equal(catalogue.factions.reduce((total, faction) => total + faction.units.length, 0), 166);
  assert.equal(catalogue.factions.reduce((total, faction) => total + faction.manifestations.length, 0), 10);
});

test("keeps the Scourge of Aqshy units and enhancements for every added faction", () => {
  for (const faction of catalogue.factions) {
    assert.ok(
      faction.units.some((unit) => unit.name.startsWith("Scourge of Aqshy:")),
      `${faction.name} has no Scourge of Aqshy warscroll`,
    );
    assert.ok(
      faction.aqshyEnhancements.length > 0 || faction.aqshyArtefacts.length > 0,
      `${faction.name} has no Aqshy enhancements`,
    );
  }
});

test("keeps complete profiles, weapons, abilities and descriptions", () => {
  const allUnits = catalogue.factions.flatMap((faction) => faction.units);
  for (const unit of allUnits) {
    assert.ok(unit.profile.health !== null && unit.profile.health !== undefined, `${unit.name}: health`);
    assert.ok(Array.isArray(unit.weapons), `${unit.name}: weapons`);
    assert.ok(Array.isArray(unit.abilities), `${unit.name}: abilities`);
    for (const weapon of unit.weapons) {
      assert.ok(weapon.name, `${unit.name}: unnamed weapon`);
      assert.notEqual(weapon.attacks, undefined, `${unit.name}/${weapon.name}: attacks`);
      assert.notEqual(weapon.damage, undefined, `${unit.name}/${weapon.name}: damage`);
    }
    for (const ability of unit.abilities) {
      assert.ok(ability.name, `${unit.name}: unnamed ability`);
      assert.ok(ability.effect || ability.declare || ability.description, `${unit.name}/${ability.name}: description`);
    }
  }
});

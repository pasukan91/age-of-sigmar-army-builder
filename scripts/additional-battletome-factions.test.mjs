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

test("includes every Army of Renown from the five generated faction catalogues", () => {
  assert.deepEqual(
    Object.fromEntries([...factions].map(([id, faction]) => [id, faction.armiesOfRenown.length])),
    { stormcast: 3, idoneth: 2, kharadron: 3, nighthaunt: 2, flesheater: 2 },
  );
  assert.deepEqual(
    factions.get("idoneth").armiesOfRenown.map((army) => army.name).sort(),
    ["The First Phalanx of Ionrach", "Wardens of the Chorrileum"],
  );
  assert.deepEqual(
    factions.get("kharadron").armiesOfRenown.map((army) => army.name).sort(),
    ["Grundstok Expeditionary Force", "Pioneer Outpost", "The Magnate's Crew"],
  );
});

test("includes all universal manifestation lores with their catalogue points", () => {
  assert.deepEqual(
    catalogue.universalManifestationLores.map((lore) => lore.name).sort(),
    [
      "Aetherwrought Machineries",
      "Forbidden Power",
      "Krondspine Incarnate",
      "Morbid Conjuration",
      "Primal Energy",
      "Twilit Sorceries",
    ],
  );
  assert.equal(catalogue.universalManifestations.length, 18);
  assert.equal(catalogue.universalManifestationLores.find((lore) => lore.name === "Morbid Conjuration").points, 20);
  assert.equal(catalogue.universalManifestationLores.find((lore) => lore.name === "Primal Energy").points, 10);
});

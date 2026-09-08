import test from "node:test";
import assert from "node:assert/strict";

import { importOfficialArmyList, OfficialListImportError } from "./officialListImport.js";

const units = [
  unit("gobsprakk", "Gobsprakk, the Mouth of Mork", 240, 1),
  unit("gutrippaz", "Gutrippaz", 150, 10),
  unit("aqshy-killaboss", "Scourge of Aqshy Killaboss with Stab-grot", 130, 1),
  unit("breaka-boss", "Breaka-boss on Mirebrute Troggoth", 180, 1),
  unit("hobgrots", "Hobgrot Slittaz", 70, 10),
  unit("shaman", "Swampcalla Shaman with Pot-grot", 120, 1),
  unit("killbow", "Beast-skewer Killbow", 130, 1),
  unit("boltboyz", "Man-skewer Boltboyz", 100, 3),
  unit("kragnos", "Kragnos, the End of Empires", 580, 1),
];

const kruleboyz = {
  id: "kruleboyz",
  name: "Kruleboyz",
  alliance: "destruction",
  units,
  armiesOfRenown: [],
  battleFormations: [{ id: "light-finga", name: "Light Finga", points: 0 }],
  heroicTraits: [{ id: "egomaniak", name: "Egomaniak", points: 10 }],
  monsterTraits: [{ id: "spittin-un", name: "Spittin' 'Un", points: 20 }],
  artefacts: [],
  aqshyArtefacts: [{ id: "tattermask", name: "Tattermask", points: 0 }],
  spellLores: [{ id: "swamp", name: "Lore of the Swamp", points: 0 }],
  prayerLores: [],
  manifestationLores: [{ id: "gorkamorka", name: "Manifestations of Gorkamorka", points: 0 }],
  terrain: [{ id: "skaregob", name: "Skaregob Totem", points: 0 }],
};

const exportedList = `Partepanaz 1980/2000 pts

Orruk Warclans | Kruleboyz
Light Finga
General's Handbook 2026-27
Drops: 4
Spell Lore - Lore of the Swamp
Manifestation Lore - Manifestations of Gorkamorka

General's Regiment
Gobsprakk, the Mouth of Mork (240)
&#x20;• General
Gutrippaz (300)
&#x20;• Reinforced
Scourge of Aqshy: Killaboss with Stab-grot (130)

Regiment 1
Breaka-boss on Mirebrute Troggoth (210)
&#x20;• Egomaniak - (10) Points&#x20;
&#x20;• Tattermask
&#x20;• Spittin' 'Un - (20) Points&#x20;
Hobgrot Slittaz (70)

Regiment 2
Swampcalla Shaman with Pot-grot (120)
Beast-skewer Killbow (130)
Man-skewer Boltboyz (200)
&#x20;• Reinforced

Regiment 4
Kragnos, the End of Empires (580)

Faction Terrain
Skaregob Totem

Created with Warhammer Age of Sigmar: The App
App: 1.37.0 | Data: 476`;

test("imports an official AoS App export without losing list configuration", () => {
  const result = importOfficialArmyList(exportedList, {
    factions: [kruleboyz],
    alliances: [{ id: "destruction", name: "Destrucción" }],
  });

  assert.equal(result.list.name, "Partepanaz");
  assert.equal(result.list.pointsLimit, 2000);
  assert.equal(result.list.faction.id, "kruleboyz");
  assert.equal(result.list.battleFormation.name, "Light Finga");
  assert.equal(result.list.spellLore.name, "Lore of the Swamp");
  assert.equal(result.list.manifestationLore.name, "Manifestations of Gorkamorka");
  assert.equal(result.list.terrain.name, "Skaregob Totem");
  assert.equal(result.list.regiments.length, 4);
  assert.equal(result.list.regiments[0].hero.name, "Gobsprakk, the Mouth of Mork");
  assert.equal(result.list.regiments[0].units[0].reinforced, true);
  assert.equal(result.list.regiments[0].units[1].name, "Scourge of Aqshy Killaboss with Stab-grot");

  const breakaBoss = result.list.regiments[1].hero;
  assert.equal(breakaBoss.heroicTrait.name, "Egomaniak");
  assert.equal(breakaBoss.artefact.name, "Tattermask");
  assert.equal(breakaBoss.monstrousTrait.name, "Spittin' 'Un");
  assert.deepEqual(result.warnings, []);
  assert.equal(result.source.declaredPoints, 1980);
  assert.equal(result.source.calculatedPoints, 1980);
  assert.equal(result.source.appVersion, "1.37.0");
  assert.equal(result.source.dataVersion, "476");
});

test("reports catalogue mismatches instead of silently inventing units", () => {
  const result = importOfficialArmyList(
    exportedList.replace("Hobgrot Slittaz (70)", "Unknown Mob (70)"),
    { factions: [kruleboyz], alliances: [] }
  );

  assert.ok(result.warnings.some((warning) => warning.includes("Unknown Mob")));
  assert.ok(result.warnings.some((warning) => warning.includes("1910 pts")));
});

test("rejects text that is not an official list-shaped export", () => {
  assert.throws(
    () => importOfficialArmyList("Kruleboyz list", { factions: [kruleboyz] }),
    OfficialListImportError
  );
});

function unit(id, name, points, models) {
  return { id, name, points, details: { models }, keywords: [] };
}

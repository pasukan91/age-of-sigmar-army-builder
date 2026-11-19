import assert from "node:assert/strict";
import test from "node:test";
import { createServer } from "vite";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { getRealmgateWarscrolls, getRealmgateEnhancements, getRealmgateManifestationAbilities, realmgateUniversalAbilities, realmgateUniversalCommands } from "../src/utils/realmgate.js";

test("Realmgate lists unique selected warscrolls including auxiliaries, renown, terrain and manifestations", () => {
  const unit = { id: "unit", name: "Unit" };
  const list = { regiments: [{ hero: { id: "hero", name: "Hero" }, units: [unit, { ...unit }] }], auxiliaries: [{ id: "aux", name: "Auxiliary" }], regimentsOfRenown: [{ resolvedUnits: [{ id: "renown", name: "Renown" }] }], terrain: { id: "terrain", name: "Terrain" }, manifestationLore: { manifestations: [{ id: "manifestation", name: "Manifestation" }] } };
  const before = JSON.stringify(list);
  const entries = getRealmgateWarscrolls(list);
  assert.equal(entries.length, 6);
  assert.equal(entries.filter((entry) => entry.item.id === "unit").length, 1);
  assert.ok(entries.slice(0, 4).every((entry) => entry.kind === "unit"));
  assert.deepEqual(entries.slice(-2).map((entry) => entry.kind), ["manifestation", "terrain"]);
  assert.deepEqual(new Set(entries.map((entry) => entry.kind)), new Set(["unit", "terrain", "manifestation"]));
  assert.equal(JSON.stringify(list), before);
});

test("Realmgate shows equipped enhancement rules once, including special categories and paid enhancements", () => {
  const item = { id: "artefact", name: "Artefact", points: 20, phase: "Passive", description: "Rule" };
  const list = { regiments: [{ hero: { id: "hero", name: "Hero", artefact: item, specialEnhancements: { special: { id: "special", name: "Special", abilities: [{ id: "effect", name: "Effect", phase: "Your Hero Phase" }] } } }, units: [{ id: "unit", name: "Unit", artefact: item }] }] };
  const rules = getRealmgateEnhancements(list);
  assert.equal(rules.length, 2);
  assert.equal(rules.find((rule) => rule.id === "artefact").points, 20);
  assert.equal(rules.find((rule) => rule.id === "effect").phase, "Your Hero Phase");
});

test("Realmgate universal rules include deployment, ward and all commands without duplicate core entries", () => {
  assert.equal(realmgateUniversalAbilities.length, 18);
  assert.equal(realmgateUniversalCommands.length, 11);
  assert.equal(realmgateUniversalAbilities.filter((ability) => ability.id === "fight").length, 1);
  assert.ok(realmgateUniversalAbilities.some((ability) => ability.id === "ward-save"));
  assert.equal(realmgateUniversalCommands.find((ability) => ability.id === "counter-charge").commandPoints, 2);
  const sacredRites = realmgateUniversalCommands.find((ability) => ability.id === "sacred-rites");
  assert.equal(sacredRites.commandPoints, null);
  assert.equal(sacredRites.chantingValue, 2);
});

test("Realmgate manifestation cards use the army-specific summon once", () => {
  const summon = { id: "shared-summon", name: "Shifting Manifestations", keywords: ["Summon"] };
  const abilities = getRealmgateManifestationAbilities({ summonSpell: summon, abilities: [{ id: "old-summon", name: "Summon Old Manifestation", keywords: ["Summon"] }, { id: "passive", name: "Passive Rule" }, summon] });
  assert.deepEqual(abilities.map((ability) => ability.id), ["shared-summon", "passive"]);
});

test("the battle-mode header opens Realmgate content for every faction even when the list has errors", async () => {
  const server = await createServer({ logLevel: "silent", server: { middlewareMode: true, hmr: false }, appType: "custom" });
  try {
    const { default: factions } = await server.ssrLoadModule("/src/data/factions.js");
    const { default: ArmyBuilder } = await server.ssrLoadModule("/src/pages/Armybuilder.jsx");
    for (const faction of factions) {
      const list = { id: "realmgate", faction, pointsLimit: 1, regiments: [{ id: "regiment", hero: faction.units[0], units: [] }], battleFormation: faction.battleFormations[0], spellLore: faction.spellLores[0], prayerLore: faction.prayerLores[0], manifestationLore: faction.manifestationLores[0] };
      const editing = renderToStaticMarkup(createElement(ArmyBuilder, { list, onSectionChange: () => {} }));
      assert.ok(editing.includes('aria-label="Abrir modo partida" aria-pressed="false"'), faction.name);
      const html = renderToStaticMarkup(createElement(ArmyBuilder, { list, section: "game", onSectionChange: () => {} }));
      assert.ok(html.includes("REALMGATE"), faction.name);
      assert.ok(html.includes('aria-label="Volver al constructor" aria-pressed="true"'), faction.name);
      for (const title of ["Warscrolls", "Battle Traits", "Universal Abilities", "Universal Commands"]) assert.ok(html.includes(title), `${faction.name}: ${title}`);
      if (list.spellLore || list.prayerLore || list.manifestationLore) assert.ok(html.includes("Lores"), faction.name);
      assert.ok(!html.includes('class="aos-official-points'), faction.name);
      assert.ok(html.includes("Ward Save"), faction.name);
    }
  } finally { await server.close(); }
});

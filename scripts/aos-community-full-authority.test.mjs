import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { createServer } from "vite";

const catalogue = JSON.parse(
  readFileSync("src/data/sigdexAllFactions.generated.json", "utf8")
);
const additionalCatalogue = JSON.parse(
  readFileSync("src/data/additionalBattletomeFactions.generated.json", "utf8")
);

test("SigDex is authoritative for every active faction and builder restriction", async () => {
  const server = await createServer({ logLevel: "silent", server: { middlewareMode: true }, appType: "custom" });
  try {
    const { default: factions } = await server.ssrLoadModule("/src/data/factions.js");
    assert.equal(catalogue.metadata.source, "https://sigdex.io/");
    assert.equal(catalogue.metadata.serverVersion, "3.1.11");
    assert.equal(catalogue.factions.length, 25);
    assert.equal(catalogue.factions.reduce((sum, faction) => sum + faction.units.length, 0), 761);

    for (const source of catalogue.factions) {
      const faction = factions.find((item) => item.id === source.id);
      assert.ok(faction, source.name);
      assert.equal(faction.catalogueDataVersion, catalogue.metadata.battleProfilesVersion, source.name);
      for (const field of [
        "battleTraits", "battleFormations", "heroicTraits", "artefacts",
        "aqshyArtefacts", "aqshyHeroicTraits", "aqshyEnhancements",
        "spellLores", "prayerLores", "terrain", "units", "armiesOfRenown",
      ]) {
        assert.deepEqual(faction[field].map((item) => item.name), source[field].map((item) => item.name), `${source.name}: ${field}`);
      }
      for (const field of ["manifestations", "manifestationLores"]) {
        const sourceNames = source[field].map((item) => item.name);
        assert.deepEqual(
          faction[field].slice(0, sourceNames.length).map((item) => item.name),
          sourceNames,
          `${source.name}: ${field}`,
        );
      }
      for (const expected of source.units) {
        const actual = faction.units.find((item) => item.name === expected.name);
        assert.ok(actual, `${source.name}: ${expected.name}`);
        assert.equal(actual.points, expected.points, `${expected.name}: points`);
        assert.deepEqual(actual.profile, expected.profile, `${expected.name}: profile`);
        assert.equal(actual.details.models, expected.details.models, `${expected.name}: models`);
        assert.deepEqual(actual.details.regimentOptions, expected.details.regimentOptions, `${expected.name}: regiment options`);
        assert.deepEqual(actual.details.canJoinRegimentAs, expected.details.canJoinRegimentAs, `${expected.name}: regiment roles`);
        assert.equal(actual.rules.canBeReinforced, expected.rules.canBeReinforced, `${expected.name}: reinforcement`);
      }
    }
  } finally {
    await server.close();
  }
});

test("every faction offers the complete universal manifestation lores", async () => {
  const server = await createServer({ logLevel: "silent", server: { middlewareMode: true }, appType: "custom" });
  try {
    const { default: factions } = await server.ssrLoadModule("/src/data/factions.js");
    const universalLoreNames = additionalCatalogue.universalManifestationLores.map((lore) => lore.name);

    for (const faction of factions) {
      const loreNames = faction.manifestationLores.map((lore) => lore.name);
      for (const loreName of universalLoreNames) {
        assert.ok(loreNames.includes(loreName), `${faction.name}: ${loreName}`);
        const lore = faction.manifestationLores.find((item) => item.name === loreName);
        assert.ok(lore.manifestations.length > 0, `${faction.name}: ${loreName} is empty`);
        assert.ok(
          lore.manifestations.every((manifestation) => !manifestation.dataPending),
          `${faction.name}: ${loreName} has incomplete manifestations`,
        );
      }
    }
  } finally {
    await server.close();
  }
});

test("includes the new Sons of Behemat battletome content", () => {
  const sons = catalogue.factions.find((faction) => faction.id === "behemat");
  assert.deepEqual(sons.armiesOfRenown.map((army) => army.name).sort(), ["King Brodd's Stomp", "Matriarch's Mob", "Stomper Tribe"]);
  assert.equal(sons.units.find((unit) => unit.id === "ma-maegran-chooser-of-the-mighty").points, 370);
  assert.equal(sons.units.find((unit) => unit.id === "boss-stompers").points, 370);
  assert.equal(sons.units.find((unit) => unit.id === "rock-hurlers").points, 380);
});

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { createServer } from "vite";

const catalogue = JSON.parse(
  readFileSync("src/data/sigdexAllFactions.generated.json", "utf8")
);

test("SigDex is authoritative for every active faction and builder restriction", async () => {
  const server = await createServer({ logLevel: "silent", server: { middlewareMode: true }, appType: "custom" });
  try {
    const { default: factions } = await server.ssrLoadModule("/src/data/factions.js");
    assert.equal(catalogue.metadata.source, "https://sigdex.io/");
    assert.equal(catalogue.metadata.serverVersion, "3.1.10");
    assert.equal(catalogue.factions.length, 25);
    assert.equal(catalogue.factions.reduce((sum, faction) => sum + faction.units.length, 0), 761);

    for (const source of catalogue.factions) {
      const faction = factions.find((item) => item.id === source.id);
      assert.ok(faction, source.name);
      assert.equal(faction.catalogueDataVersion, catalogue.metadata.battleProfilesVersion, source.name);
      for (const field of [
        "battleTraits", "battleFormations", "heroicTraits", "artefacts",
        "aqshyArtefacts", "aqshyHeroicTraits", "aqshyEnhancements",
        "spellLores", "prayerLores", "manifestations", "manifestationLores",
        "terrain", "units", "armiesOfRenown",
      ]) {
        assert.deepEqual(faction[field].map((item) => item.name), source[field].map((item) => item.name), `${source.name}: ${field}`);
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

test("includes the new Sons of Behemat battletome content", () => {
  const sons = catalogue.factions.find((faction) => faction.id === "behemat");
  assert.deepEqual(sons.armiesOfRenown.map((army) => army.name).sort(), ["King Brodd's Stomp", "Matriarch's Mob", "Stomper Tribe"]);
  assert.equal(sons.units.find((unit) => unit.id === "ma-maegran-chooser-of-the-mighty").points, 370);
  assert.equal(sons.units.find((unit) => unit.id === "boss-stompers").points, 370);
  assert.equal(sons.units.find((unit) => unit.id === "rock-hurlers").points, 380);
});

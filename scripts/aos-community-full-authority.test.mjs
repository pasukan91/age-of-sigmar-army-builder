import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { createServer } from "vite";

const catalogue = JSON.parse(
  readFileSync("src/data/aosCommunityAllFactions.generated.json", "utf8")
);
const regiments = JSON.parse(
  readFileSync("src/data/regimentsOfRenown.generated.json", "utf8")
);

test("the bot is authoritative for every active faction and reference collection", async () => {
  const server = await createServer({
    logLevel: "silent",
    server: { middlewareMode: true },
    appType: "custom",
  });

  try {
    const { default: factions } = await server.ssrLoadModule("/src/data/factions.js");
    assert.equal(catalogue.metadata.dataVersion, 476);
    assert.equal(catalogue.factions.length, 22);
    assert.equal(regiments.regiments.length, 76);

    for (const source of catalogue.factions) {
      const faction = factions.find((item) => item.id === source.id);
      assert.ok(faction, source.name);
      assert.equal(faction.catalogueDataVersion, 476, source.name);

      for (const field of [
        "battleTraits",
        "battleFormations",
        "heroicTraits",
        "artefacts",
        "spellLores",
        "prayerLores",
        "terrain",
        "units",
        "armiesOfRenown",
      ]) {
        const actualNames = new Set(faction[field].map((item) => item.name));
        assert.ok(
          source[field].every((item) => actualNames.has(item.name)),
          `${source.name}: ${field}`
        );
      }

      for (const unit of source.units) {
        const actual = faction.units.find((item) => item.name === unit.name);
        assert.deepEqual(actual.profile, unit.profile, `${source.name}: ${unit.name} profile`);
        assert.deepEqual(actual.weapons, unit.weapons, `${source.name}: ${unit.name} weapons`);
      }
    }
  } finally {
    await server.close();
  }
});

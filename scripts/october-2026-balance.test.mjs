import assert from "node:assert/strict";
import test from "node:test";
import { createServer } from "vite";

function findById(value, id) {
  if (Array.isArray(value)) {
    for (const item of value) {
      const match = findById(item, id);
      if (match) return match;
    }
  } else if (value && typeof value === "object") {
    if (value.id === id) return value;
    for (const item of Object.values(value)) {
      const match = findById(item, id);
      if (match) return match;
    }
  }
  return null;
}

test("applies the official 28 October 2026 matched-play changes over SigDex", async () => {
  const server = await createServer({ logLevel: "silent", server: { middlewareMode: true }, appType: "custom" });
  try {
    const { default: factions } = await server.ssrLoadModule("/src/data/factions.js");
    const faction = (id) => factions.find((item) => item.id === id);
    const get = (factionId, id) => findById(faction(factionId), id);

    assert.ok(factions.every((item) => item.balancePublicationDate === "2026-10-28"));
    assert.equal(get("skaven", "verminlord-corruptor").points, 260);

    const riverblades = get("lumineth", "ydrilan-riverblades");
    assert.ok(riverblades.keywords.includes("CHAMPION (1/10)"));
    assert.equal(riverblades.rules.canBeReinforced, true);

    const pyregheists = get("nighthaunt", "pyregheists");
    assert.ok(pyregheists.keywords.includes("CHAMPION (1/8)"));
    assert.equal(pyregheists.rules.canBeReinforced, true);

    const twistweald = get("sylvaneth", "the-twistweald");
    assert.ok(twistweald.keywords.includes("CHAMPION (1/8)"));
    assert.equal(twistweald.rules.canBeReinforced, true);

    assert.match(get("ogors", "eat-em-alive").description, /Faction Terrain.*Manifestations/i);

    const aqshyRuneson = get("fyreslayers", "scourge-of-aqshy-auric-runeson-on-magmadroth");
    assert.ok(aqshyRuneson.keywords.includes("KHAZALITE HOLDS"));
    assert.ok(aqshyRuneson.keywords.includes("GRIMMDRON"));
    assert.ok(!aqshyRuneson.keywords.includes("FYRESLAYERS"));
    assert.ok(!aqshyRuneson.keywords.includes("MAGMADROTH"));

    const aqshyFlameseekers = get("fyreslayers", "scourge-of-aqshy-vulkyn-flameseekers");
    assert.ok(aqshyFlameseekers.keywords.includes("KHAZALITE HOLDS"));
    assert.match(get("fyreslayers", "blazing-impetus").description, /GRIMMDRON/i);
    assert.match(get("fyreslayers", "aureate-hide").restrictionText, /GRIMMDRON MONSTERS/i);
  } finally {
    await server.close();
  }
});

test("adds the October regiment options for both Sons of Behemat Armies of Renown", async () => {
  const server = await createServer({ logLevel: "silent", server: { middlewareMode: true }, appType: "custom" });
  try {
    const { default: factions } = await server.ssrLoadModule("/src/data/factions.js");
    const { canUnitJoinRegiment, canUnitLeadRegiment } = await server.ssrLoadModule("/src/utils/regimentRules.js");
    const sons = factions.find((item) => item.id === "behemat");

    for (const armyId of ["matriarch-s-mob", "stomper-tribe"]) {
      const army = sons.armiesOfRenown.find((item) => item.id === armyId);
      assert.ok(army, armyId);
      for (const unitId of ["mancrusher-gargant", "scourge-of-aqshy-mancrusher-gargant"]) {
        const mancrusher = army.rules.units.find((unit) => unit.id === unitId);
        assert.equal(mancrusher.rules.canLeadRegiment, true, `${armyId}: ${unitId}`);
        assert.equal(mancrusher.rules.canLeadRegimentAsHero, true, `${armyId}: ${unitId}`);
        assert.equal(
          canUnitLeadRegiment({ faction: sons, armyOfRenown: army, regiments: [] }, mancrusher),
          true,
          `${armyId}: ${unitId} is selectable as a leader`,
        );
        assert.deepEqual(mancrusher.details.regimentOptionRules[0].keywords, ["Little"]);
        assert.equal(mancrusher.details.regimentOptionRules[0].max, -1);
        const littleUnit = army.rules.units.find((unit) => unit.id === "boss-stompers");
        assert.equal(
          canUnitJoinRegiment({
            list: { faction: sons, armyOfRenown: army, regiments: [] },
            regiment: { hero: mancrusher, units: [] },
            unit: littleUnit,
          }),
          true,
          `${armyId}: Little units can join the Mancrusher regiment`,
        );
      }
    }
  } finally {
    await server.close();
  }
});

test("replaces Lofnir Drothkeepers with the October rules", async () => {
  const server = await createServer({ logLevel: "silent", server: { middlewareMode: true }, appType: "custom" });
  try {
    const { default: factions } = await server.ssrLoadModule("/src/data/factions.js");
    const fyreslayers = factions.find((item) => item.id === "fyreslayers");
    const lofnir = fyreslayers.armiesOfRenown.find((item) => item.id === "lofnir-drothkeepers");

    assert.equal(lofnir.rules.name, "Khazalite Holds - Lofnir Drothkeepers");
    assert.deepEqual(
      lofnir.rules.battleTraits.map((trait) => trait.id),
      ["blazing-vengeance", "skilled-drothwranglers", "ferocious-heat", "daring-tamers"],
    );
    assert.equal(findById(lofnir.rules, "blazing-vengeance").phase, "Passive");
    assert.match(findById(lofnir.rules, "blazing-vengeance").description, /grudge mark/i);
    assert.equal(findById(lofnir.rules, "skilled-drothwranglers").phase, "Passive");
    assert.match(findById(lofnir.rules, "skilled-drothwranglers").description, /Packdroth/i);
  } finally {
    await server.close();
  }
});

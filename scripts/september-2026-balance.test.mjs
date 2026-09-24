import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { createServer } from "vite";

const catalogue = JSON.parse(readFileSync("src/data/aosCommunityAllFactions.generated.json", "utf8"));
const balance = JSON.parse(readFileSync("src/data/september2026Balance.generated.json", "utf8"));

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

test("applies every September 2026 profile and paid-option change", async () => {
  const server = await createServer({ logLevel: "silent", server: { middlewareMode: true }, appType: "custom" });
  try {
    const { applySeptember2026Balance } = await server.ssrLoadModule("/src/data/applySeptember2026Balance.js");
    assert.equal(balance.metadata.publicationDate, "2026-09-23");
    assert.equal(Object.values(balance.factions).reduce((sum, faction) => sum + Object.keys(faction.units).length, 0), 247);
    assert.equal(Object.values(balance.factions).reduce((sum, faction) => sum + Object.keys(faction.collections).length, 0), 14);

    for (const rawFaction of catalogue.factions) {
      const faction = applySeptember2026Balance(rawFaction);
      const patch = balance.factions[faction.id];
      assert.equal(faction.balancePublicationDate, "2026-09-23", faction.name);
      if (!patch) continue;
      for (const [id, expected] of Object.entries(patch.units)) {
        const unit = findById(faction.units, id) ?? findById(faction.armiesOfRenown, id);
        assert.ok(unit, `${faction.name}: ${expected.name}`);
        assert.equal(unit.points, expected.points, `${faction.name}: ${expected.name} points`);
        assert.deepEqual(unit.details.regimentOptions, expected.regimentOptions, `${faction.name}: ${expected.name} regiment options`);
        assert.equal(unit.rules.canBeReinforced, expected.canBeReinforced, `${faction.name}: ${expected.name} reinforcement`);
      }
      for (const expected of Object.values(patch.collections)) {
        const item = findById(faction[expected.field], expected.id);
        assert.ok(item, `${faction.name}: ${expected.name}`);
        assert.equal(item.points, expected.points, `${faction.name}: ${expected.name} points`);
      }
    }
  } finally {
    await server.close();
  }
});

test("includes the highlighted September rules changes", async () => {
  const server = await createServer({ logLevel: "silent", server: { middlewareMode: true }, appType: "custom" });
  try {
    const { default: factions } = await server.ssrLoadModule("/src/data/factions.js");
    const get = (factionId, id) => findById(factions.find((faction) => faction.id === factionId), id);

    assert.equal(get("cities", "alchemite-warforger").points, 140);
    assert.equal(get("daughters", "morathi-khaine").points, 770);
    assert.equal(get("fyreslayers", "auric-runesmiter").points, 110);
    assert.equal(get("seraphon", "skinks").points, 70);
    assert.equal(get("kruleboyz", "kruleboyz-monsta-killaz").points, 140);
    assert.equal(get("ogors", "gluttons").points, 210);
    assert.equal(get("ogors", "maw-cult-fanatics").points, 10);

    assert.equal(get("lumineth", "alarith-spirit-of-the-mountain").rules.canBeReinforced, false);
    assert.equal(get("sylvaneth", "treelord").rules.canBeReinforced, false);
    assert.equal(get("khorne", "skull-cannon").rules.canBeReinforced, false);

    assert.equal(get("nighthaunt", "shadowy-aura").phase, "Passive");
    assert.match(get("skaven", "lightning-master").description, /set the Attacks characteristic/i);
    assert.equal(get("skaven", "a-reputation-for-cunning").commandPoints, null);
    assert.match(get("fyreslayers", "blazing-impetus").description, /was not set up this turn/i);

    const gatebreaker = get("behemat", "scourge-of-aqshy-gatebreaker-mega-gargant");
    assert.equal(gatebreaker.profile.health, 25);
    assert.equal(gatebreaker.profile.control, "10");
    assert.ok(gatebreaker.abilities.some((ability) => ability.id === "fortcrusha-flail"));
    assert.ok(!gatebreaker.abilities.some((ability) => ability.id === "longshanks"));

    const doubleStomp = get("behemat", "double-stomp");
    assert.ok(doubleStomp.keywords.includes("Destructive Impulse"));
    assert.doesNotMatch(doubleStomp.description, /Almightier Stomp/);
    assert.match(get("behemat", "wrath-of-brodd").description, /as if it had \*\*FLY\*\*/);
  } finally {
    await server.close();
  }
});

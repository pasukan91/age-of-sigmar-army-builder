import assert from "node:assert/strict";
import test from "node:test";
import { createServer } from "vite";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import catalogue from "../src/data/sigdexAllFactions.generated.json" with { type: "json" };
import source from "../tmp/sigdex-api-main.json" with { type: "json" };
import { validateArmyList } from "../src/utils/armyValidation.js";

test("every faction and Army of Renown preserves its complete spell, prayer and manifestation lores", () => {
  for (const faction of catalogue.factions) {
    for (const [name, rules] of [[faction.name, faction], ...faction.armiesOfRenown.map((army) => [`${faction.name} - ${army.name}`, army.rules])]) {
      const rawArmy = source.armies[name];
      for (const [kind, field, contents] of [["spell", "spellLores", "spells"], ["prayer", "prayerLores", "prayers"], ["manifestation", "manifestationLores", "abilities"]]) {
        const expected = (rawArmy.upgrades.lores?.[kind] ?? []).filter((lore) => !/ghyran/i.test(lore.scourge));
        assert.deepEqual(rules[field].map((lore) => lore.sourceId), expected.map((lore) => lore.id), `${name}: ${kind}`);
        rules[field].forEach((lore, index) => {
          assert.equal(lore.points, Number(expected[index].points ?? 0), `${name}: ${lore.name}: points`);
          assert.deepEqual(lore[contents].map((ability) => [ability.sourceId, ability.declare, ability.effect]), expected[index].abilities.map((ability) => [ability.id, ability.declare ?? null, ability.effect ?? null]), `${name}: ${lore.name}: abilities`);
          if (kind === "prayer") {
            for (const prayer of lore.prayers) {
              assert.equal(prayer.type, "Prayer", `${name}: ${prayer.name}`);
              assert.equal(prayer.castingValue, null, prayer.name);
              assert.ok(prayer.chantingValue > 0, prayer.name);
            }
          }
        });
      }
    }
  }
});

test("associates each manifestation with its actual summoning ability, including shared AoR spells", () => {
  for (const faction of catalogue.factions) {
    for (const rules of [faction, ...faction.armiesOfRenown.map((army) => army.rules)]) {
      for (const lore of rules.manifestationLores) {
        for (const manifestation of lore.manifestations) {
          if (!manifestation.summonSpell) {
            assert.equal(manifestation.name, "Abyssal Tendril");
            continue;
          }
          const summon = manifestation.summonSpell;
          assert.ok(lore.abilities.some((ability) => ability.sourceId === summon.sourceId), `${lore.name}: ${manifestation.name}`);
          assert.ok([summon.name, summon.declare, summon.effect].join(" ").replace(/[*^]/g, "").toLowerCase().includes(manifestation.name.toLowerCase()), `${lore.name}: ${manifestation.name}: wrong summon`);
          if (summon.type === "Prayer") {
            assert.equal(manifestation.chantingValue, summon.chantingValue);
            assert.equal(manifestation.castingValue, null);
          }
        }
      }
    }
  }
  const idoneth = catalogue.factions.find((faction) => faction.id === "idoneth");
  const lore = idoneth.manifestationLores[0];
  assert.equal(lore.manifestations.find((unit) => unit.name === "Incarnate of the Deep").summonSpell.name, "Summon Incarnate of the Deep");
  assert.equal(lore.manifestations.find((unit) => unit.name === "Abyssal Tendril").summonSpell, null);
});

test("rejects spell, prayer and manifestation selections outside the effective army", () => {
  const result = validateArmyList({ faction: { spellLores: [], prayerLores: [], manifestationLores: [] }, regiments: [], spellLore: { id: "foreign" }, prayerLore: { id: "foreign" }, manifestationLore: { id: "foreign" } });
  for (const field of ["spellLore", "prayerLore", "manifestationLore"]) assert.ok(result.errors.some((issue) => issue.id === `ineligible-${field}`));
});

test("lore choices survive saving and loading, selectors show contents, and invocation sheets use chanting rules", async () => {
  const server = await createServer({ logLevel: "silent", server: { middlewareMode: true, hmr: false }, appType: "custom" });
  try {
    const { default: factions } = await server.ssrLoadModule("/src/data/factions.js");
    const storage = await server.ssrLoadModule("/src/storage/armyListStorage.js");
    const { calculateArmyPoints } = await server.ssrLoadModule("/src/utils/armyPoints.js");
    const { default: Selector } = await server.ssrLoadModule("/src/pages/OptionSelector.jsx");
    const { default: Warscroll } = await server.ssrLoadModule("/src/pages/RuleWarscroll.jsx");
    const values = new Map();
    globalThis.window = { localStorage: { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value) } };
    for (const faction of factions) {
      for (const army of [null, ...faction.armiesOfRenown]) {
        const rules = { ...faction, ...(army?.rules ?? {}) };
        for (const [property, field] of [["spellLore", "spellLores"], ["prayerLore", "prayerLores"], ["manifestationLore", "manifestationLores"]]) {
          for (const lore of rules[field]) {
            const list = { id: "lore-test", name: "Lore test", faction, armyOfRenown: army, regiments: [], [property]: lore };
            assert.equal(storage.saveArmyLists([list]), true);
            const restored = storage.loadArmyListsResult().lists[0];
            assert.equal(restored[property]?.id, lore.id, `${faction.name}: ${army?.name ?? "base"}: ${lore.name}`);
            assert.equal(calculateArmyPoints(restored), lore.points, lore.name);
            const html = renderToStaticMarkup(createElement(Selector, { options: [lore], variant: "lores", selectedOptions: [lore], onConfigure: () => {} }));
            assert.ok(html.includes('aria-pressed="true"'), lore.name);
            for (const ability of lore.spells ?? lore.prayers ?? lore.abilities ?? []) assert.ok(html.includes(ability.name.replace(/&/g, "&amp;").replace(/'/g, "&#x27;").replace(/"/g, "&quot;")), ability.name);
          }
        }
      }
    }
    const idoneth = factions.find((faction) => faction.id === "idoneth");
    const tendril = idoneth.manifestationLores[0].manifestations.find((unit) => unit.name === "Abyssal Tendril");
    const tendrilHtml = renderToStaticMarkup(createElement(Warscroll, { reference: { kind: "manifestation", item: tendril } }));
    assert.ok(!tendrilHtml.includes('class="aos-casting-card"'));
    assert.ok(!tendrilHtml.includes("Summon Abyssal Tendril"));
    const invocation = factions.find((faction) => faction.id === "khorne").manifestationLores[0].manifestations[0];
    const prayerHtml = renderToStaticMarkup(createElement(Warscroll, { reference: { kind: "manifestation", item: invocation } }));
    assert.ok(prayerHtml.includes("Canto"));
    assert.ok(prayerHtml.includes("D6"));
    assert.ok(!prayerHtml.includes("chanting roll of 2D6"));
  } finally {
    delete globalThis.window;
    await server.close();
  }
});

import assert from "node:assert/strict";
import test from "node:test";
import source from "../tmp/sigdex-api-main.json" with { type: "json" };
import catalogue from "../src/data/sigdexAllFactions.generated.json" with { type: "json" };
import { ghb2026BattleTacticsCards, ghb2026Battleplans } from "../src/data/ghb2026.js";
import sourceRules from "../tmp/sigdex-ghb26_battleplans.json" with { type: "json" };

function visit(value, callback) {
  if (!value || typeof value !== "object") return;
  callback(value);
  for (const nested of Object.values(value)) visit(nested, callback);
}

test("all generated unit weapons and characteristics match their current SigDex army", () => {
  let checked = 0;
  for (const faction of catalogue.factions) {
    const ruleSets = [[faction.name, faction], ...faction.armiesOfRenown.map((army) => [`${faction.name} - ${army.name}`, army.rules])];
    for (const [name, rules] of ruleSets) {
      const rawById = new Map(source.armies[name].units.map((unit) => [unit.id, unit]));
      for (const unit of [...rules.units, ...rules.manifestations, ...rules.terrain]) {
        const raw = rawById.get(unit.sourceId);
        assert.ok(raw, `${name}: ${unit.name}`);
        for (const key of ["move", "save", "control", "ward", "banishment"]) {
          assert.equal(unit.profile[key], raw[key], `${name}: ${unit.name}: ${key}`);
        }
        assert.equal(unit.points, Number(raw.points ?? raw.battleProfile?.points ?? 0), `${name}: ${unit.name}: points`);
        const weapons = new Map();
        for (const model of raw.models ?? []) {
          for (const section of ["basic", "advanced", "selected"]) {
            for (const choice of Object.values(model.weapons?.[section] ?? {})) {
              for (const weapon of choice.weapons ?? []) weapons.set(weapon.id, weapon);
            }
          }
        }
        assert.equal(unit.weapons.length, weapons.size, `${name}: ${unit.name}: weapon count`);
        for (const weapon of unit.weapons) {
          const expected = weapons.get(weapon.id);
          for (const key of ["name", "hit", "wound", "rend", "damage"]) assert.equal(weapon[key], expected[key], `${unit.name}: ${weapon.name}: ${key}`);
          assert.equal(weapon.attacks, expected.attack, `${unit.name}: attacks`);
          assert.deepEqual(weapon.abilities, expected.abilities ?? [], `${unit.name}: weapon abilities`);
        }
        checked += 1;
      }
    }
  }
  assert.ok(checked > 1_000);
});

test("spell, prayer and faction-resource costs are never shown as command points", () => {
  const raw = new Map();
  visit(source, (item) => { if (item.superType === "Ability") raw.set(item.id, item); });
  let checked = 0;
  visit(catalogue, (item) => {
    if (!Object.hasOwn(item, "commandPoints") || !item.sourceId) return;
    const expected = raw.get(item.sourceId);
    assert.ok(expected, item.name);
    assert.equal(item.commandPoints, expected.type === 3 ? Number(expected.cost) || null : null, item.name);
    if (expected.type === 2) assert.equal(item.castingValue, Number(expected.cost) || null, item.name);
    if (expected.type === 4) assert.equal(item.chantingValue, Number(expected.cost) || null, item.name);
    assert.equal(item.unlockCondition, expected.unlockCondition ?? null, item.name);
    if ([5, 6].includes(expected.type) && expected.cost != null) assert.equal(item.resourceCost.value, expected.cost, item.name);
    checked += 1;
  });
  assert.ok(checked > 3_000);
});

test("universal manifestation lores and all eighteen battle tactics match live SigDex", () => {
  assert.deepEqual(catalogue.universalManifestationLores.map((lore) => [lore.name, lore.points]), source.universal.map((lore) => [lore.name, lore.points]));
  const cards = source.generalsHandbook.find((book) => book.name === "General's Handbook 2026-27").battleTacticCards;
  assert.equal(ghb2026BattleTacticsCards.length, cards.length);
  for (const actual of ghb2026BattleTacticsCards) {
    const expected = cards.find((card) => card.name === actual.name);
    assert.ok(expected, actual.name);
    assert.equal(actual.setup, expected.text || null, actual.name);
    actual.tactics.forEach((tactic, index) => {
      const raw = expected[["affray", "strike", "domination"][index]];
      assert.equal(tactic.name, raw.name);
      assert.equal(tactic.condition, raw.description);
    });
  }
});

test("Khazalite Holds includes the new release and keeps the existing saved faction key", () => {
  const faction = catalogue.factions.find((item) => item.id === "fyreslayers");
  assert.equal(faction.name, "Khazalite Holds");
  for (const name of ["High Kyng Valankrom", "Hjulda Drakkblud", "Valayan Guardians with Runic Halberds", "Oathkeeper Cannon"]) {
    assert.ok(faction.units.some((unit) => unit.name === name), name);
  }
  assert.ok(!catalogue.factions.some((item) => item.name === "Fyreslayers"));
});

test("all twelve battleplans preserve the current SigDex twists, abilities and scoring", () => {
  assert.equal(ghb2026Battleplans.length, sourceRules.sections.length);
  ghb2026Battleplans.forEach((plan, index) => {
    const raw = sourceRules.sections[index];
    assert.equal(plan.name, raw.name);
    for (const component of raw.containers.flatMap((container) => container.components)) {
      if (component.text) assert.ok(plan.description.includes(component.text), `${plan.name}: ${component.contentType}`);
      for (const field of ["name", "declare", "effect", "usedBy"]) {
        if (component.ability?.[field]) assert.ok(plan.description.includes(component.ability[field]), `${plan.name}: ${field}`);
      }
    }
  });
});

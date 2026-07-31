import test from "node:test";
import assert from "node:assert/strict";

import { validateArmyList } from "./armyValidation.js";
import { createArmyPrintHtml, formatArmyListText, getArmyDrops } from "./armyExport.js";

function unit(overrides = {}) {
  return {
    id: "unit",
    name: "Unidad",
    points: 100,
    profile: { health: 2, save: "4+" },
    keywords: ["Infantry"],
    rules: { canBeReinforced: true },
    details: { regimentOptions: [], canJoinRegimentAs: [] },
    ...overrides,
  };
}

function list(overrides = {}) {
  const leader = unit({
    id: "leader",
    name: "General",
    keywords: ["Hero"],
    rules: { hero: true, canBeReinforced: false },
    details: { regimentOptions: ["Any Test"], canJoinRegimentAs: [] },
  });
  return {
    id: "list",
    name: "Lista de prueba",
    pointsLimit: 2000,
    faction: {
      id: "test",
      name: "Facción de prueba",
      units: [leader],
      battleFormations: [{ id: "formation", name: "Formación" }],
      spellLores: [],
      prayerLores: [],
      manifestationLores: [],
    },
    battleFormation: { id: "formation", name: "Formación", points: 0 },
    regiments: [{ id: "regiment", hero: leader, units: [] }],
    regimentsOfRenown: [],
    ...overrides,
  };
}

test("reports required formation and point limit errors", () => {
  const result = validateArmyList(list({
    pointsLimit: 50,
    battleFormation: null,
  }));

  assert.equal(result.isValid, false);
  assert.ok(result.errors.some((item) => item.id === "points-limit"));
  assert.ok(result.errors.some((item) => item.id === "missing-formation"));
});

test("reports duplicate unique units", () => {
  const unique = unit({
    id: "unique-unit",
    name: "Única",
    keywords: ["Unique", "Infantry"],
    rules: { unique: true, canBeReinforced: false },
  });
  const result = validateArmyList(list({
    faction: {
      id: "test",
      name: "Facción de prueba",
      units: [unique],
      battleFormations: [],
    },
    battleFormation: null,
    regiments: [
      { id: "one", hero: unit({ id: "hero-one", rules: { hero: true } }), units: [unique] },
      { id: "two", hero: unit({ id: "hero-two", rules: { hero: true } }), units: [unique] },
    ],
  }));

  assert.ok(result.errors.some((item) => item.id === "duplicate-unique-unique-unit"));
});

test("exports points, drops and regiment structure", () => {
  const army = list();
  const text = formatArmyListText(army);

  assert.equal(getArmyDrops(army), 1);
  assert.match(text, /Lista de prueba/);
  assert.match(text, /REGIMIENTO 1 — GENERAL/);
  assert.match(text, /100\/2000 pts · 1 drops/);
});

test("exports both selected battle tactics cards", () => {
  const text = formatArmyListText(list({
    battleTactics: [
      { id: "tactics-one", name: "Battle Tactics Card 1" },
      { id: "tactics-two", name: "Battle Tactics Card 2" },
    ],
  }));

  assert.match(
    text,
    /Battle tactics: Battle Tactics Card 1, Battle Tactics Card 2/
  );
});

test("escapes list names in printable HTML", () => {
  const html = createArmyPrintHtml(list({ name: "<Ataque & defensa>" }));
  assert.match(html, /&lt;Ataque &amp; defensa&gt;/);
  assert.doesNotMatch(html, /<Ataque & defensa>/);
});

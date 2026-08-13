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

test("accepts one alternative from an Army of Renown required unit group", () => {
  const required = unit({ id: "eidolon-sea", name: "Eidolon del Mar" });
  const base = list();
  const armyOfRenown = {
    name: "Wardens",
    requiredUnitGroups: [["eidolon-sea", "eidolon-storm"]],
  };
  const missing = validateArmyList({ ...base, armyOfRenown });
  assert.ok(missing.errors.some((item) => item.id === "missing-required-group-0"));

  const complete = validateArmyList({
    ...base,
    armyOfRenown,
    faction: { ...base.faction, units: [...base.faction.units, required] },
    regiments: [{ ...base.regiments[0], units: [required] }],
  });
  assert.ok(!complete.errors.some((item) => item.id === "missing-required-group-0"));
});

test("requires the correct alternative as an Army of Renown general", () => {
  const base = list();
  const armyOfRenown = {
    name: "Ruination Brotherhood",
    requiredGeneralUnitGroups: [["iridan", "iridan-aqshy"]],
  };
  const result = validateArmyList({ ...base, armyOfRenown });
  assert.ok(result.errors.some((item) => item.id === "missing-required-general-group-0"));
});

test("rejects armies with more than five regiments", () => {
  const regiments = Array.from({ length: 6 }, (_, index) => ({
    id: `regiment-${index + 1}`,
    hero: unit({
      id: `hero-${index + 1}`,
      name: `Héroe ${index + 1}`,
      keywords: ["Hero"],
      rules: { hero: true, canBeReinforced: false },
    }),
    units: [],
  }));
  const result = validateArmyList(list({ regiments }));

  assert.ok(result.errors.some((item) => item.id === "regiment-limit"));
});

test("rejects armies with more than one Regiment of Renown", () => {
  const result = validateArmyList(list({
    regimentsOfRenown: [
      { id: "renown-one", name: "Primero" },
      { id: "renown-two", name: "Segundo" },
    ],
  }));

  assert.ok(result.errors.some((item) => item.id === "regiment-of-renown-limit"));
});

test("uses four unit slots for the general and three for other regiments", () => {
  const regimentUnit = (id) => unit({ id, instanceId: id });
  const result = validateArmyList(list({
    regiments: [
      {
        id: "general-regiment",
        hero: unit({ id: "general", keywords: ["Hero"], rules: { hero: true } }),
        units: [1, 2, 3, 4].map((id) => regimentUnit(`general-unit-${id}`)),
      },
      {
        id: "other-regiment",
        hero: unit({ id: "other-hero", keywords: ["Hero"], rules: { hero: true } }),
        units: [1, 2, 3, 4].map((id) => regimentUnit(`other-unit-${id}`)),
      },
    ],
  }));

  assert.ok(!result.errors.some((item) => item.id === "slots-general-regiment"));
  assert.ok(result.errors.some((item) => item.id === "slots-other-regiment"));
});

test("exports points, deployments and regiment structure", () => {
  const army = list();
  const text = formatArmyListText(army);

  assert.equal(getArmyDrops(army), 1);
  assert.match(text, /Lista de prueba/);
  assert.match(text, /REGIMIENTO 1 — GENERAL/);
  assert.match(text, /100\/2000 pts · 1 despliegue/);
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
    /Tácticas de batalla: Battle Tactics Card 1, Battle Tactics Card 2/
  );
});

test("escapes list names in printable HTML", () => {
  const html = createArmyPrintHtml(list({ name: "<Ataque & defensa>" }));
  assert.match(html, /&lt;Ataque &amp; defensa&gt;/);
  assert.doesNotMatch(html, /<Ataque & defensa>/);
});

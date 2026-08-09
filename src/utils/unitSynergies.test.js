import assert from "node:assert/strict";
import test from "node:test";
import { heroicTraits as kruleboyzHeroicTraits } from "../data/kruleboyz/rules.js";
import { getPotentialSynergies } from "./unitSynergies.js";

const egomaniak = kruleboyzHeroicTraits.find(({ id }) => id === "egomaniak");
const inferredEgomaniak = {
  name: "Inferred Egomaniak",
  description: egomaniak.description,
};

function listWith(source, ...units) {
  return { regiments: [{ hero: source, units }] };
}

test("Egomaniak never treats its generic damage recipient as the Ward beneficiary", () => {
  const source = {
    id: "killaboss",
    name: "Killaboss",
    heroicTrait: inferredEgomaniak,
    keywords: ["Hero", "Infantry", "Kruleboyz"],
  };
  const gobbsprakk = {
    id: "gobsprakk-the-mouth-of-mork",
    name: "Gobsprakk, the Mouth of Mork",
    keywords: ["Warmaster", "Unique", "Hero", "Monster", "Kruleboyz"],
  };

  assert.deepEqual(
    getPotentialSynergies(listWith(source, gobbsprakk), gobbsprakk),
    [],
  );
});

test("Egomaniak only identifies non-Hero Kruleboyz Infantry", () => {
  const source = {
    id: "killaboss",
    name: "Killaboss",
    heroicTrait: egomaniak,
    keywords: ["Hero", "Infantry", "Kruleboyz"],
  };
  const gutrippaz = {
    id: "gutrippaz",
    name: "Gutrippaz",
    keywords: ["Infantry", "Kruleboyz"],
  };
  const infantryHero = {
    id: "swampcalla-shaman",
    name: "Swampcalla Shaman",
    keywords: ["Hero", "Infantry", "Kruleboyz"],
  };
  const foreignInfantry = {
    id: "foreign-infantry",
    name: "Foreign Infantry",
    keywords: ["Infantry", "Stormcast Eternals"],
  };
  const list = listWith(source, gutrippaz, infantryHero, foreignInfantry);

  assert.equal(getPotentialSynergies(list, gutrippaz).length, 1);
  assert.deepEqual(getPotentialSynergies(list, infantryHero), []);
  assert.deepEqual(getPotentialSynergies(list, foreignInfantry), []);
});

test("generic friendly targets still work when an ability explicitly picks them", () => {
  const source = {
    id: "support-hero",
    name: "Support Hero",
    keywords: ["Hero"],
    abilities: [{
      name: "Universal Aid",
      description: "Pick a visible friendly unit wholly within 12\" to be the target. Heal (D3) the target.",
    }],
  };
  const target = { id: "target", name: "Target", keywords: ["Monster"] };

  assert.equal(getPotentialSynergies(listWith(source, target), target).length, 1);
});

test("hyphenated non-Hero exclusions are honoured for ordinary abilities", () => {
  const source = {
    id: "commander",
    name: "Commander",
    keywords: ["Hero"],
    abilities: [{
      name: "Infantry Order",
      description: "Pick a friendly non-Hero Cities of Sigmar Infantry unit wholly within 12\". Add 1 to hit rolls for its attacks.",
    }],
  };
  const soldier = {
    id: "soldier",
    name: "Soldier",
    keywords: ["Cities of Sigmar", "Infantry"],
  };
  const hero = {
    id: "hero",
    name: "Hero",
    keywords: ["Cities of Sigmar", "Hero", "Infantry"],
  };
  const list = listWith(source, soldier, hero);

  assert.equal(getPotentialSynergies(list, soldier).length, 1);
  assert.deepEqual(getPotentialSynergies(list, hero), []);
});

test("arbitrary non-keyword exclusions and alternative roles are honoured", () => {
  const source = {
    id: "support",
    name: "Support",
    abilities: [
      {
        name: "Forge Support",
        description: "Pick a friendly non-Hobgrot Helsmiths of Hashut unit. Add 1 to its save rolls.",
      },
      {
        name: "Mounted Support",
        description: "Pick a friendly Khorne Cavalry or Monster unit. Add 1 to its charge rolls.",
      },
    ],
  };
  const hobgrot = {
    id: "hobgrot",
    name: "Hobgrot",
    keywords: ["Hobgrot", "Helsmiths of Hashut", "Infantry"],
  };
  const hashutWarMachine = {
    id: "hashut-war-machine",
    name: "Hashut War Machine",
    keywords: ["Helsmiths of Hashut", "War Machine"],
  };
  const khorneMonster = {
    id: "khorne-monster",
    name: "Khorne Monster",
    keywords: ["Khorne", "Monster"],
  };
  const list = listWith(source, hobgrot, hashutWarMachine, khorneMonster);

  assert.deepEqual(getPotentialSynergies(list, hobgrot), []);
  assert.equal(getPotentialSynergies(list, hashutWarMachine).length, 1);
  assert.equal(getPotentialSynergies(list, khorneMonster).length, 1);
});

test("named unit types joined by and are treated as alternatives", () => {
  const source = {
    id: "orruk-support",
    name: "Orruk Support",
    abilities: [{
      name: "Pig Support",
      description: "Pick a friendly Gore-gruntas and Maw-grunta unit. Add 1 to its Attacks characteristic.",
    }],
  };
  const goreGruntas = {
    id: "gore-gruntas",
    name: "Gore-gruntas",
    keywords: ["Gore-gruntas", "Ironjawz", "Cavalry"],
  };
  const mawGrunta = {
    id: "maw-grunta",
    name: "Maw-grunta",
    keywords: ["Maw-grunta", "Ironjawz", "Monster"],
  };
  const ardboyz = {
    id: "ardboyz",
    name: "Ardboyz",
    keywords: ["Ardboyz", "Ironjawz", "Infantry"],
  };
  const list = listWith(source, goreGruntas, mawGrunta, ardboyz);

  assert.equal(getPotentialSynergies(list, goreGruntas).length, 1);
  assert.equal(getPotentialSynergies(list, mawGrunta).length, 1);
  assert.deepEqual(getPotentialSynergies(list, ardboyz), []);
});

test("explicit rules match levelled keywords without weakening exclusions", () => {
  const source = {
    id: "wizard-support",
    name: "Wizard Support",
    abilities: [{
      name: "Arcane Support",
      description: "Support a friendly Wizard.",
      synergy: {
        includeKeywords: ["Wizard"],
        excludeKeywords: ["Hero"],
      },
    }],
  };
  const nonHeroWizard = {
    id: "wizard-unit",
    name: "Wizard Unit",
    keywords: ["Wizard (1)", "Infantry"],
  };
  const heroWizard = {
    id: "wizard-hero",
    name: "Wizard Hero",
    keywords: ["Wizard (2)", "Hero"],
  };
  const list = listWith(source, nonHeroWizard, heroWizard);

  assert.equal(getPotentialSynergies(list, nonHeroWizard).length, 1);
  assert.deepEqual(getPotentialSynergies(list, heroWizard), []);
});

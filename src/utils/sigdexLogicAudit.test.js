import test from "node:test";
import assert from "node:assert/strict";

import source from "../../tmp/sigdex-api-main.json" with { type: "json" };
import catalogue from "../data/sigdexAllFactions.generated.json" with { type: "json" };
import { canUnitJoinRegiment } from "./regimentRules.js";
import {
  ARTEFACTS_OF_POWER,
  HEROIC_TRAITS,
  canUnitTakeEnhancementCategory,
  getSpecialEnhancementGroups,
} from "./enhancementRules.js";

const clean = (value) => String(value ?? "")
  .replace(/\*\*\^\^|\^\^\*\*/g, "")
  .trim()
  .toLowerCase();
const baseName = (value) => String(value ?? "")
  .replace(/^Scourge of [^:]+:\s*/i, "")
  .replace(/\s*\(Scourge of [^)]+\)\s*$/i, "")
  .trim();
const hasKeyword = (unit, keyword) => (unit.keywords ?? []).some(
  (candidate) => clean(candidate) === clean(keyword)
);
const enhancementFields = [
  "heroicTraits",
  "artefacts",
  "aqshyHeroicTraits",
  "aqshyArtefacts",
  "aqshyEnhancements",
];

function rawEnhancements(army) {
  return Object.entries(army.upgrades?.enhancements ?? {}).flatMap(
    ([category, groups]) => groups
      .filter((group) => !/ghyran/i.test(String(group.scourge ?? "")))
      .flatMap((group) => (group.upgrades ?? []).map((enhancement) => ({
        enhancement,
        category,
        group,
      })))
  );
}

function generatedEnhancements(faction) {
  return enhancementFields.flatMap((field) => faction[field] ?? []);
}

function factionEnhancementRuleSets(faction) {
  return [
    {
      label: faction.name,
      rawArmy: source.armies[faction.name],
      generatedRules: faction,
    },
    ...(faction.armiesOfRenown ?? []).map((army) => ({
      label: `${faction.name} - ${army.name}`,
      rawArmy: source.armies[`${faction.name} - ${army.name}`],
      generatedRules: army.rules,
    })),
  ];
}

function expectedAbilityDescription(ability) {
  return [
    ability.usedBy && `Used By: ${ability.usedBy}`,
    ability.declare && `Declare: ${ability.declare}`,
    ability.effect && `Effect: ${ability.effect}`,
  ].filter(Boolean).join("\n\n") || ability.lore || "";
}

function visitObjects(value, visitor) {
  if (!value || typeof value !== "object") return;
  visitor(value);
  if (Array.isArray(value)) {
    value.forEach((item) => visitObjects(item, visitor));
    return;
  }
  Object.values(value).forEach((item) => visitObjects(item, visitor));
}

function rawAbilityIndex() {
  const result = new Map();
  visitObjects(source, (item) => {
    if (item.superType === "Ability" && item.id) result.set(item.id, item);
  });
  return result;
}

function generatedAbilities() {
  const result = [];
  visitObjects(catalogue, (item) => {
    if (
      item.sourceId &&
      Array.isArray(item.keywords) &&
      Object.hasOwn(item, "declare") &&
      Object.hasOwn(item, "effect")
    ) {
      result.push(item);
    }
  });
  return result;
}

function expectedOptionMatch(unit, option) {
  const names = option.unit_names ?? [];
  const roles = option.subhero_categories ?? [];
  const required = option.keywords ?? [];
  const excluded = option.nonKeywords ?? [];
  const excludedMatch = excluded.some((keyword) => hasKeyword(unit, keyword));
  const isHero = unit.rules?.hero === true;
  if (isHero && names.length === 0 && roles.length === 0) return false;
  if (excluded.length > 0 && names.length === 0 && roles.length === 0 && required.length === 0) {
    return !excludedMatch;
  }
  const namedMatch = names.some((name) => clean(baseName(unit.name)) === clean(baseName(name)));
  const roleMatch = roles.some((role) => (unit.details?.canJoinRegimentAs ?? [])
    .some((candidate) => clean(candidate) === clean(role)));
  const keywordMatch = required.length > 0 && required.every((keyword) => hasKeyword(unit, keyword));
  return (namedMatch || roleMatch || keywordMatch) && !excludedMatch;
}

test("all generated regiment choices follow SigDex option logic", () => {
  let combinations = 0;
  for (const faction of catalogue.factions) {
    for (const leader of faction.units.filter((unit) => unit.rules?.canLeadRegiment)) {
      const options = leader.details?.regimentOptionRules ?? [];
      const regiment = { id: `audit-${leader.id}`, hero: leader, units: [] };
      const list = { faction, regiments: [regiment] };
      for (const unit of faction.units) {
        const requiredLeaderMatches = !unit.details?.requiredLeader ||
          clean(baseName(leader.name)).split(",")[0] ===
            clean(baseName(unit.details.requiredLeader)).split(",")[0];
        const requiresAttachedUnit = [
          "freeguild-command-auxiliaries",
          "freeguild-command-corps-whisperblade",
        ].includes(unit.id);
        const expected = unit.id !== leader.id && requiredLeaderMatches && !requiresAttachedUnit &&
          options.some((option) => expectedOptionMatch(unit, option));
        const actual = canUnitJoinRegiment({ list, regiment, unit });
        assert.equal(actual, expected, `${faction.name}: ${leader.name} -> ${unit.name}`);
        combinations += 1;
      }
    }
  }
  assert.ok(combinations > 10_000, `only audited ${combinations} combinations`);
});

test("every unit keeps SigDex's exact enhancement categories", () => {
  let units = 0;
  for (const faction of catalogue.factions) {
    const rawArmy = source.armies[faction.name];
    assert.ok(rawArmy, faction.name);
    const generatedBySourceId = new Map(faction.units.map((unit) => [unit.sourceId, unit]));
    for (const rawUnit of rawArmy.units ?? []) {
      if (rawUnit.legends || /Scourge of Ghyran/i.test(rawUnit.name ?? "")) continue;
      if ((rawUnit.keywords ?? []).some((keyword) =>
        ["manifestation", "faction terrain"].includes(clean(keyword)))) continue;
      const generated = generatedBySourceId.get(rawUnit.id);
      assert.ok(generated, `${faction.name}: ${rawUnit.name}`);
      assert.deepEqual(
        [...(generated.details?.enhancementCategories ?? [])].sort(),
        Object.keys(rawUnit.enhancements ?? {}).sort(),
        `${faction.name}: ${rawUnit.name}`
      );
      units += 1;
    }
  }
  assert.equal(units, 761);
  for (const faction of catalogue.factions) {
    for (const enhancement of faction.aqshyEnhancements ?? []) {
      assert.ok(enhancement.enhancementCategory, `${faction.name}: ${enhancement.name}`);
    }
  }
});

test("keeps every SigDex enhancement name, group and timing in its original context", () => {
  let audited = 0;

  for (const faction of catalogue.factions) {
    for (const { label, rawArmy, generatedRules } of factionEnhancementRuleSets(faction)) {
      assert.ok(rawArmy, `${label}: raw rules`);
      const generatedBySourceId = new Map(
        generatedEnhancements(generatedRules).map((item) => [item.sourceId, item])
      );

      for (const { enhancement, category, group } of rawEnhancements(rawArmy)) {
        const generated = generatedBySourceId.get(enhancement.id);
        assert.ok(generated, `${label}: ${group.name}: ${enhancement.name}`);
        assert.equal(generated.name, enhancement.name, `${label}: ${enhancement.name}: name`);
        assert.equal(generated.enhancementCategory, category, `${label}: ${enhancement.name}: category`);
        assert.equal(generated.groupName, group.name || category, `${label}: ${enhancement.name}: group`);
        assert.equal(
          generated.restrictionText,
          String(group.restrictionText ?? ""),
          `${label}: ${enhancement.name}: restriction`
        );
        assert.equal(
          generated.source,
          /aqshy/i.test(String(group.scourge ?? "")) ? "Aqshy" : "Battletome",
          `${label}: ${enhancement.name}: publication`
        );
        assert.equal(
          generated.phase,
          enhancement.abilities?.[0]?.timing || undefined,
          `${label}: ${enhancement.name}: explicit timing`
        );
        audited += 1;
      }
    }
  }

  assert.ok(audited > 450, `only audited ${audited} enhancements`);
});

test("keeps the exact SigDex ability names and content for every enhancement", () => {
  let audited = 0;

  for (const faction of catalogue.factions) {
    for (const { label, rawArmy, generatedRules } of factionEnhancementRuleSets(faction)) {
      assert.ok(rawArmy, `${label}: raw rules`);
      const generatedBySourceId = new Map(
        generatedEnhancements(generatedRules).map((item) => [item.sourceId, item])
      );

      for (const { enhancement } of rawEnhancements(rawArmy)) {
        const generated = generatedBySourceId.get(enhancement.id);
        assert.equal(
          generated.abilities.length,
          enhancement.abilities.length,
          `${label}: ${enhancement.name}: ability count`
        );

        enhancement.abilities.forEach((ability, index) => {
          const actual = generated.abilities[index];
          assert.equal(actual.sourceId, ability.id, `${label}: ${enhancement.name}: ability id`);
          assert.equal(actual.name, ability.name, `${label}: ${enhancement.name}: ability name`);
          assert.equal(actual.phase, ability.timing || "Passive", `${label}: ${enhancement.name}: ability timing`);
          assert.equal(actual.declare, ability.declare ?? null, `${label}: ${enhancement.name}: declare`);
          assert.equal(actual.effect, ability.effect ?? null, `${label}: ${enhancement.name}: effect`);
          assert.equal(
            actual.description,
            expectedAbilityDescription(ability),
            `${label}: ${enhancement.name}: description`
          );
          audited += 1;
        });
      }
    }
  }

  assert.ok(audited > 450, `only audited ${audited} enhancement abilities`);
});

test("keeps the SigDex name, type and timing context for every generated ability", () => {
  const rawById = rawAbilityIndex();
  const abilities = generatedAbilities();

  for (const actual of abilities) {
    const expected = rawById.get(actual.sourceId);
    assert.ok(expected, `${actual.name}: raw ability ${actual.sourceId}`);
    const keywords = (expected.keywords ?? []).map((keyword) =>
      String(keyword).replace(/\*\*\^\^|\^\^\*\*/g, "").trim()
    ).filter(Boolean);
    const keywordNames = keywords.map((keyword) => keyword.toLowerCase());
    const expectedType = keywordNames.includes("spell")
      ? "Spell"
      : keywordNames.includes("prayer")
        ? "Prayer"
        : "Ability";

    assert.equal(actual.name, expected.name, `${actual.sourceId}: name`);
    assert.equal(actual.type, expectedType, `${actual.name}: type`);
    assert.equal(actual.phase, expected.timing || "Passive", `${actual.name}: timing`);
  }

  assert.ok(abilities.length > 3_000, `only audited ${abilities.length} abilities`);
});

test("keeps the exact SigDex declare, effect and formatted content for every generated ability", () => {
  const rawById = rawAbilityIndex();
  const abilities = generatedAbilities();

  for (const actual of abilities) {
    const expected = rawById.get(actual.sourceId);
    assert.equal(actual.declare, expected.declare ?? null, `${actual.name}: declare`);
    assert.equal(actual.effect, expected.effect ?? null, `${actual.name}: effect`);
    assert.equal(actual.usedBy, expected.usedBy ?? null, `${actual.name}: used by`);
    assert.equal(actual.description, expectedAbilityDescription(expected), `${actual.name}: description`);
  }

  assert.ok(abilities.length > 3_000, `only audited ${abilities.length} abilities`);
});

test("the builder exposes only enhancement groups assigned to each unit", () => {
  for (const faction of catalogue.factions) {
    const availableSpecialCategories = new Set(
      (faction.aqshyEnhancements ?? []).map((item) => item.enhancementCategory)
    );
    for (const unit of faction.units) {
      const assigned = new Set(unit.details.enhancementCategories ?? []);
      assert.equal(
        canUnitTakeEnhancementCategory(unit, HEROIC_TRAITS),
        assigned.has(HEROIC_TRAITS),
        `${faction.name}: ${unit.name} heroic traits`
      );
      assert.equal(
        canUnitTakeEnhancementCategory(unit, ARTEFACTS_OF_POWER),
        assigned.has(ARTEFACTS_OF_POWER),
        `${faction.name}: ${unit.name} artefacts`
      );
      const actualSpecial = getSpecialEnhancementGroups(unit, faction)
        .map((group) => group.category).sort();
      const expectedSpecial = [...assigned]
        .filter((category) => ![HEROIC_TRAITS, ARTEFACTS_OF_POWER].includes(category))
        .filter((category) => availableSpecialCategories.has(category))
        .sort();
      assert.deepEqual(actualSpecial, expectedSpecial, `${faction.name}: ${unit.name} special groups`);
    }
  }
});

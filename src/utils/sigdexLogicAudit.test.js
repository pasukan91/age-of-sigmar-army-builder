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

import test from "node:test";
import assert from "node:assert/strict";

import units from "./units.js";
import scourgeUnits from "./scourgeOfAqshy.js";
import {
  canUnitJoinRegiment,
  getAvailableUnitsForRegiment,
} from "../../utils/regimentRules.js";

const allUnits = [...units, ...scourgeUnits];
const byId = new Map(allUnits.map((unit) => [unit.id, unit]));

function makeList(leaderId, unitIds = []) {
  const regiment = {
    id: `regiment-${leaderId}`,
    hero: byId.get(leaderId),
    units: unitIds.map((id, index) => ({
      ...byId.get(id),
      instanceId: `${id}-${index}`,
    })),
  };

  return {
    list: {
      faction: { units: allUnits },
      regiments: [regiment],
    },
    regiment,
  };
}

function availableIds(leaderId) {
  const { list, regiment } = makeList(leaderId);
  return new Set(
    getAvailableUnitsForRegiment(list, regiment).map((unit) => unit.id)
  );
}

test("Bloodpelt Hunter leads the new Beastclaw hunting units", () => {
  const available = availableIds("bloodpelt-hunter");

  assert.equal(available.has("hunters-with-sabrefangs"), true);
  assert.equal(available.has("maulbeast-raiders"), true);
  assert.equal(available.has("ogor-gluttons"), false);
});

test("Butcher leads Mawseekers and can include one Scraplauncher", () => {
  const available = availableIds("butcher");

  assert.equal(available.has("cleavers"), true);
  assert.equal(available.has("gutseers"), true);
  assert.equal(available.has("gorger-mawpack"), true);
  assert.equal(available.has("gnoblar-scraplauncher"), true);
  assert.equal(available.has("gluttons"), false);
});

test("both Huskards can lead any Ogor Mawtribes units", () => {
  for (const leaderId of [
    "huskard-on-stonehorn",
    "huskard-on-thundertusk",
  ]) {
    const available = availableIds(leaderId);

    assert.equal(available.has("gluttons"), true);
    assert.equal(available.has("ironblaster"), true);
    assert.equal(available.has("cleavers"), true);
  }
});

test("Scourge of Aqshy Huskard keeps its Any Ogor Mawtribes option", () => {
  const available = availableIds("huskard-on-thundertusk-scourge-of-aqshy");

  assert.equal(available.has("gluttons"), true);
  assert.equal(available.has("ironblaster"), true);
  assert.equal(available.has("cleavers"), true);
});

test("Ogor regiments do not apply an extra hidden War Machine limit", () => {
  const { list, regiment } = makeList("morga-the-mighty", ["ironblaster"]);

  assert.equal(
    canUnitJoinRegiment({
      list,
      regiment,
      unit: byId.get("gnoblar-scraplauncher"),
    }),
    true
  );
});

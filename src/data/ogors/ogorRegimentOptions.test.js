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
  assert.equal(available.has("gluttons"), true);
  assert.equal(available.has("ironblaster"), false);
});

test("Butcher leads Infantry and can include one Maw Nomad", () => {
  const available = availableIds("butcher");

  assert.equal(available.has("cleavers"), true);
  assert.equal(available.has("gutseers"), true);
  assert.equal(available.has("gorger-mawpack"), true);
  assert.equal(available.has("gluttons"), true);
  assert.equal(available.has("gnoblar-scraplauncher"), false);
  assert.equal(available.has("grell-firefist"), true);
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
  assert.equal(available.has("grell-firefist"), false);
});

test("Ogor regiment options match the current SigDex catalogue", () => {
  const expected = {
    "morga-the-mighty": ["0-1 Maw Nomad", "Any Ogor Mawtribes"],
    "grell-firefist": ["Any Ogor Mawtribes"],
    "tyrant-on-glutthorn": ["0-1 Maw Nomad", "Any Ogor Mawtribes"],
    tyrant: ["Any Infantry"],
    "frostlord-on-stonehorn": ["0-1 Maw Nomad", "Any Ogor Mawtribes"],
    "frostlord-on-thundertusk": ["0-1 Maw Nomad", "Any Ogor Mawtribes"],
    "huskard-on-stonehorn": ["0-1 Maw Nomad", "Any Ogor Mawtribes"],
    "huskard-on-thundertusk": ["0-1 Maw Nomad", "Any Ogor Mawtribes"],
    "bloodpelt-hunter": ["Any Beastclaw", "Any Infantry"],
    mantrapper: ["Any Beastclaw", "Any Infantry"],
    "redd-the-maw": ["0-1 Maw Nomad", "Any Ogor Mawtribes"],
    butcher: ["0-1 Maw Nomad", "Any Infantry"],
    "huskard-on-thundertusk-scourge-of-aqshy": ["Any Ogor Mawtribes"],
    "frostlord-on-thundertusk-scourge-of-aqshy": ["0-1 Maw Nomad", "Any Ogor Mawtribes"],
  };

  for (const [unitId, options] of Object.entries(expected)) {
    assert.deepEqual(byId.get(unitId)?.details?.regimentOptions, options, unitId);
  }
});

test("only Maw Nomads can occupy the 0-1 hero slot", () => {
  const mawNomads = [
    "grell-firefist",
    "tyrant",
    "bloodpelt-hunter",
    "mantrapper",
  ];
  const available = availableIds("morga-the-mighty");

  for (const unitId of mawNomads) {
    assert.equal(available.has(unitId), true, unitId);
  }
  assert.equal(available.has("butcher"), false);
  assert.equal(available.has("huskard-on-stonehorn"), false);

  const { list, regiment } = makeList("morga-the-mighty", ["grell-firefist"]);
  assert.equal(canUnitJoinRegiment({ list, regiment, unit: byId.get("tyrant") }), false);
});

test("current Ogor base sizes are published and match the catalogue", () => {
  const expected = {
    "morga-the-mighty": "120 × 92mm",
    "grell-firefist": "50mm",
    "tyrant-on-glutthorn": "120 × 92mm",
    tyrant: "50mm",
    "maulbeast-cavalry": "90 × 52mm",
    gluttons: "40mm",
    ironguts: "40mm",
    ironblaster: "120 × 92mm",
    "gnoblar-scraplauncher": "120 × 92mm",
    "frostlord-on-stonehorn": "120 × 92mm",
    "frostlord-on-thundertusk": "120 × 92mm",
    "huskard-on-stonehorn": "120 × 92mm",
    "huskard-on-thundertusk": "120 × 92mm",
    "bloodpelt-hunter": "40mm",
    mantrapper: "40mm",
    "hunters-with-sabrefangs": "40mm [3], 60 × 35mm [2]",
    "maulbeast-raiders": "90 × 52mm",
    "stonehorn-beastriders": "120 × 92mm",
    "thundertusk-beastriders": "120 × 92mm",
    "redd-the-maw": "160mm",
    butcher: "50mm",
    cleavers: "40mm",
    gutseers: "40mm",
    "gorger-mawpack": "50mm",
    "huskard-on-thundertusk-scourge-of-aqshy": "120 × 92mm",
    "frostlord-on-thundertusk-scourge-of-aqshy": "120 × 92mm",
  };

  for (const [unitId, baseSize] of Object.entries(expected)) {
    assert.equal(byId.get(unitId)?.details?.baseSize, baseSize, unitId);
  }

  for (const unit of allUnits) {
    assert.notEqual(unit.details?.baseSize, "Pending publication", unit.id);
  }
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

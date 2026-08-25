import assert from "node:assert/strict";
import test from "node:test";
import { getListUnitInstances, getUniqueListUnits } from "./listWarscrolls.js";

test("returns one unit for each warscroll even when it has multiple instances", () => {
  const wardens = { id: "vanari-wardens", name: "Vanari Wardens" };
  const sentinels = { id: "vanari-sentinels", name: "Vanari Sentinels" };
  const list = {
    regiments: [
      {
        hero: { id: "scinari-cathallar", name: "Scinari Cathallar" },
        units: [
          { ...wardens, instanceId: "wardens-1" },
          { ...wardens, instanceId: "wardens-2", reinforced: true },
        ],
      },
      {
        hero: { id: "scinari-cathallar", name: "Scinari Cathallar", instanceId: "hero-2" },
        units: [sentinels],
      },
    ],
  };

  assert.deepEqual(
    getUniqueListUnits(list).map((unit) => unit.id),
    ["scinari-cathallar", "vanari-wardens", "vanari-sentinels"],
  );
});

test("returns repeated units as separate, stable game instances", () => {
  const list = {
    regiments: [
      {
        id: "regiment-a",
        hero: { id: "hero", name: "Hero", instanceId: "hero-1" },
        units: [
          { id: "wardens", name: "Wardens", instanceId: "wardens-1" },
          { id: "wardens", name: "Wardens", instanceId: "wardens-2" },
        ],
      },
    ],
  };

  const instances = getListUnitInstances(list);

  assert.deepEqual(instances.map((instance) => instance.key), [
    "hero-1",
    "wardens-1",
    "wardens-2",
  ]);
  assert.deepEqual(instances.slice(1).map(({ copyIndex, copyCount }) => ({ copyIndex, copyCount })), [
    { copyIndex: 1, copyCount: 2 },
    { copyIndex: 2, copyCount: 2 },
  ]);
});

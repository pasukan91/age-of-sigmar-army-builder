import assert from "node:assert/strict";
import test from "node:test";
import { getUniqueListUnits } from "./listWarscrolls.js";

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

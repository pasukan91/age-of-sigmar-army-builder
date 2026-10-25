import assert from "node:assert/strict";
import test from "node:test";
import {
  getManifestationLoreContents,
  getRegimentAbilityNames,
} from "./optionSummaries.js";

test("summarises the endless spells included in a manifestation lore", () => {
  assert.deepEqual(
    getManifestationLoreContents({
      manifestations: [
        { name: "Purple Sun of Shyish" },
        { name: "Malevolent Maelstrom" },
      ],
    }),
    ["Purple Sun of Shyish", "Malevolent Maelstrom"],
  );
});

test("summarises the named abilities of a Regiment of Renown", () => {
  assert.deepEqual(
    getRegimentAbilityNames({
      abilities: [{ name: "Duty Bound" }, { name: "Sigmar's Justice" }],
    }),
    ["Duty Bound", "Sigmar's Justice"],
  );
});

import test from "node:test";
import assert from "node:assert/strict";

import { ensureManifestationLoreCoverage } from "./ensureManifestationLoreCoverage.js";

test("adds a faction lore for manifestations missing from existing lores", () => {
  const factionManifestation = { id: "faction-spell", name: "Faction Spell" };
  const universalManifestation = { id: "universal-spell", name: "Universal Spell" };
  const lores = [{
    id: "universal-lore",
    name: "Universal Lore",
    manifestations: [universalManifestation],
  }];
  const result = ensureManifestationLoreCoverage({
    faction: {
      id: "test-faction",
      manifestationLoreName: "Faction Manifestations",
    },
    lores,
    manifestations: [factionManifestation, universalManifestation],
  });

  assert.equal(result[0].name, "Faction Manifestations");
  assert.deepEqual(result[0].manifestations, [factionManifestation]);
  assert.equal(result[1], lores[0]);
});

test("does not add a duplicate lore when every manifestation is covered", () => {
  const item = { id: "covered", name: "Covered" };
  const lores = [{ id: "existing", name: "Existing", manifestations: [item] }];

  assert.equal(
    ensureManifestationLoreCoverage({
      faction: { id: "test" },
      lores,
      manifestations: [item],
    }),
    lores
  );
});

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const catalogue = JSON.parse(
  readFileSync(new URL("../src/data/aosCommunityCatalogue.generated.json", import.meta.url)),
);

test("keeps the extracted catalogue version and update date", () => {
  assert.equal(catalogue.metadata.dataVersion, 459);
  assert.equal(catalogue.metadata.databaseUpdated, "2026-07-08");
});

test("uses the current Beast-skewer Killbow movement and Jaggedy Blades profile", () => {
  const killbow = catalogue.factions.Kruleboyz["beast skewer killbow"];
  const jaggedyBlades = killbow.weapons.find((weapon) => weapon.name === "Jaggedy Blades");

  assert.equal(killbow.profile.move, '5"');
  assert.equal(jaggedyBlades.attacks, "3");
  assert.deepEqual(jaggedyBlades.abilities, ["Crit (Mortal)"]);
});

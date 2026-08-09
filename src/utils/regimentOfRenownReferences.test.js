import assert from "node:assert/strict";
import test from "node:test";
import regimentsOfRenown from "../data/regimentsOfRenown.js";
import {
  createRegimentOfRenownReference,
  getRegimentEligibleFactionNames,
  getRegimentOrganisation,
} from "./regimentOfRenownReferences.js";

test("every Regiment of Renown has enough information for its reference sheet", () => {
  assert.equal(regimentsOfRenown.length, 30);

  regimentsOfRenown.forEach((regiment) => {
    const reference = createRegimentOfRenownReference(regiment);

    assert.equal(reference.kind, "regimentOfRenown");
    assert.equal(reference.item, regiment);
    assert.ok(regiment.name);
    assert.ok(Number.isFinite(regiment.points));
    assert.ok(getRegimentOrganisation(regiment).length > 0, regiment.name);
    assert.ok(regiment.abilities?.length > 0, regiment.name);
    assert.ok(getRegimentEligibleFactionNames(regiment).length > 0, regiment.name);
  });
});

test("reference sheets expose readable faction names", () => {
  const regiment = {
    sourceFaction: "ogors",
    eligibleFactionIds: ["kruleboyz", "cities"],
  };
  const reference = createRegimentOfRenownReference(regiment);

  assert.equal(reference.sourceName, "Ogor Mawtribes");
  assert.deepEqual(
    getRegimentEligibleFactionNames(regiment),
    ["Kruleboyz", "Cities of Sigmar"],
  );
});

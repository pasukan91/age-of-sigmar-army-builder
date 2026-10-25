import assert from "node:assert/strict";
import test from "node:test";
import regimentsOfRenown from "../data/regimentsOfRenown.js";
import { calculateArmyHealth } from "./armyHealth.js";
import {
  createRegimentOfRenownReference,
  getRegimentEligibleFactionNames,
  getRegimentOrganisation,
} from "./regimentOfRenownReferences.js";

test("every Regiment of Renown has enough information for its reference sheet", () => {
  assert.equal(regimentsOfRenown.length, 76);

  regimentsOfRenown.forEach((regiment) => {
    const reference = createRegimentOfRenownReference(regiment);

    assert.equal(reference.kind, "regimentOfRenown");
    assert.equal(reference.item, regiment);
    assert.ok(regiment.name);
    assert.ok(Number.isFinite(regiment.points));
    assert.ok(getRegimentOrganisation(regiment).length > 0, regiment.name);
    assert.ok(regiment.resolvedUnits?.length > 0, `${regiment.name}: resolved units`);
    regiment.resolvedUnits.forEach((unit) => {
      assert.ok(unit.name, `${regiment.name}: unnamed resolved unit`);
      assert.ok(unit.profile?.health != null, `${regiment.name}: ${unit.name} health`);
      assert.ok(Array.isArray(unit.weapons), `${regiment.name}: ${unit.name} weapons`);
      assert.ok(Array.isArray(unit.abilities), `${regiment.name}: ${unit.name} abilities`);
    });
    assert.ok(
      calculateArmyHealth({ regimentsOfRenown: [regiment] }) > 0,
      `${regiment.name}: army health`,
    );
    assert.ok(
      regiment.abilities?.length > 0 || regiment.rulesText,
      regiment.name
    );
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

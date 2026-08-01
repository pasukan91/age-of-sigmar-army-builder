import test from "node:test";
import assert from "node:assert/strict";

import {
  canUnitJoinRegiment,
  getAvailableRegimentLeaders,
  getAvailableUnitsForRegiment,
  getRegimentCompositionErrors,
  hasIllegalRegimentComposition,
} from "./regimentRules.js";

function hero(id, role = null) {
  return {
    id,
    name: id,
    keywords: ["Hero", "Kruleboyz"],
    rules: { hero: true },
    details: {
      canJoinRegimentAs: role ? [role] : [],
      regimentOptions: [],
    },
  };
}

function makeList(options, units = []) {
  const leader = {
    ...hero("regiment-leader"),
    name: "Regiment Leader",
    details: {
      canJoinRegimentAs: [],
      regimentOptions: options,
    },
  };

  return {
    faction: { units: [] },
    regiments: [{
      id: "regiment-1",
      hero: leader,
      units,
    }],
  };
}

test("limits a faction-specific hero role to the composition maximum", () => {
  const firstMobWrangler = {
    ...hero("killaboss", "mob-wrangler"),
    instanceId: "mob-1",
  };
  const secondMobWrangler = hero("murknob", "mob-wrangler");
  const swampBeast = hero("snatchaboss", "swamp-beast");
  const list = makeList(
    ["0-1 Mob Wrangler", "0-1 Swamp Beast", "Any Kruleboyz"],
    [firstMobWrangler]
  );

  assert.equal(
    canUnitJoinRegiment({
      list,
      regiment: list.regiments[0],
      unit: secondMobWrangler,
    }),
    false
  );
  assert.equal(
    canUnitJoinRegiment({
      list,
      regiment: list.regiments[0],
      unit: swampBeast,
    }),
    true
  );
});

test("reads arbitrary role names instead of relying on a hard-coded role list", () => {
  const firstOfficer = {
    ...hero("officer-a", "faction-specific-officer"),
    instanceId: "officer-1",
  };
  const secondOfficer = hero("officer-b", "faction-specific-officer");
  const list = makeList(
    ["0-1 Faction Specific Officer", "Any Kruleboyz"],
    [firstOfficer]
  );

  assert.equal(
    canUnitJoinRegiment({
      list,
      regiment: list.regiments[0],
      unit: secondOfficer,
    }),
    false
  );
});

test("supports typographic dashes in unit composition limits", () => {
  const firstSubcommander = {
    ...hero("subcommander-a", "legion-subcommander"),
    instanceId: "subcommander-1",
  };
  const secondSubcommander = hero(
    "subcommander-b",
    "legion-subcommander"
  );
  const list = makeList(
    ["0–1 Legion Subcommander", "Any Kruleboyz"],
    [firstSubcommander]
  );

  assert.equal(
    canUnitJoinRegiment({
      list,
      regiment: list.regiments[0],
      unit: secondSubcommander,
    }),
    false
  );
});

test("marks an already saved regiment as illegal when it exceeds a role limit", () => {
  const list = makeList(
    ["0-1 Mob Wrangler", "Any Kruleboyz"],
    [
      { ...hero("killaboss", "mob-wrangler"), instanceId: "mob-1" },
      { ...hero("murknob", "mob-wrangler"), instanceId: "mob-2" },
    ]
  );

  const errors = getRegimentCompositionErrors(list);

  assert.equal(hasIllegalRegimentComposition(list), true);
  assert.equal(errors.length, 1);
  assert.equal(errors[0].role, "mob-wrangler");
  assert.equal(errors[0].count, 2);
  assert.equal(errors[0].max, 1);
});

test("applies the Lumineth Paragon limit while still allowing Vanari units", () => {
  const leader = {
    ...hero("archmage-teclis"),
    keywords: ["Hero", "Lumineth Realm-lords"],
    details: {
      canJoinRegimentAs: [],
      regimentOptions: [
        "0-1 Lumineth Paragon",
        "Any Lumineth Realm-lords",
      ],
    },
  };
  const firstParagon = {
    ...hero("vanari-bannerblade", "lumineth-paragon"),
    keywords: ["Hero", "Lumineth Realm-lords", "Vanari"],
    instanceId: "paragon-1",
  };
  const secondParagon = {
    ...hero("vanari-lord-regent", "lumineth-paragon"),
    keywords: ["Hero", "Lumineth Realm-lords", "Vanari"],
  };
  const dawnriders = {
    id: "vanari-dawnriders",
    name: "Vanari Dawnriders",
    keywords: ["Lumineth Realm-lords", "Vanari", "Cavalry"],
    rules: { hero: false },
    details: { canJoinRegimentAs: [] },
  };
  const list = {
    faction: { units: [] },
    regiments: [{
      id: "regiment-lumineth",
      hero: leader,
      units: [firstParagon],
    }],
  };

  assert.equal(
    canUnitJoinRegiment({
      list,
      regiment: list.regiments[0],
      unit: secondParagon,
    }),
    false
  );
  assert.equal(
    canUnitJoinRegiment({
      list,
      regiment: list.regiments[0],
      unit: dawnriders,
    }),
    true
  );
});

test("supports the Nurgle regiment option labels used by Rotbringer heroes", () => {
  const list = makeList(["Any Rotbringers", "Any Maggotkin of Nurgle"]);
  const blightking = {
    id: "putrid-blightking",
    name: "Putrid Blightking",
    keywords: ["Rotbringers", "Maggotkin of Nurgle", "Infantry"],
    rules: {},
    details: { canJoinRegimentAs: [] },
  };

  assert.equal(canUnitJoinRegiment({
    list,
    regiment: list.regiments[0],
    unit: blightking,
  }), true);
});

test("resolves Karanak and Bloodbound aliases to their exact units or roles", () => {
  const karanakList = makeList(["Any Claws of Karanak", "Any Flesh Hounds"]);
  const claws = {
    id: "claws-of-karanak",
    name: "Claws of Karanak",
    keywords: ["Infantry"],
    rules: {},
    details: { canJoinRegimentAs: [] },
  };
  const warmongerList = makeList(["Any Bloodbound Warmonger"]);
  const warmonger = {
    ...hero("bloodstoker", "bloodbound-warmonger"),
    keywords: ["Hero", "Bloodbound"],
  };

  assert.equal(canUnitJoinRegiment({
    list: karanakList,
    regiment: karanakList.regiments[0],
    unit: claws,
  }), true);
  assert.equal(canUnitJoinRegiment({
    list: warmongerList,
    regiment: warmongerList.regiments[0],
    unit: warmonger,
  }), true);
});

test("restricts zero-point companion units to their required leaders", () => {
  const tollsCompanions = {
    id: "tolls-companions",
    name: "Toll's Companions",
    keywords: ["Unique", "Infantry", "Sigmarite"],
    rules: { unique: true },
    details: { canJoinRegimentAs: [] },
  };
  const wrongList = makeList(["Any Sigmarite"]);
  const callis = {
    ...hero("callis-and-toll"),
    keywords: ["Hero", "Sigmarite"],
    details: { regimentOptions: ["Any Sigmarite"], canJoinRegimentAs: [] },
  };
  const rightList = {
    faction: { units: [] },
    regiments: [{ id: "callis", hero: callis, units: [] }],
  };

  assert.equal(canUnitJoinRegiment({
    list: wrongList,
    regiment: wrongList.regiments[0],
    unit: tollsCompanions,
  }), false);
  assert.equal(canUnitJoinRegiment({
    list: rightList,
    regiment: rightList.regiments[0],
    unit: tollsCompanions,
  }), true);

  rightList.regiments[0].units.push({
    ...tollsCompanions,
    instanceId: "tolls-1",
  });
  assert.equal(canUnitJoinRegiment({
    list: rightList,
    regiment: rightList.regiments[0],
    unit: tollsCompanions,
  }), false);
});

test("requires Gunnar Brand for both Oathsworn dependent units", () => {
  const gunnar = {
    ...hero("gunnar-brand"),
    keywords: ["Hero", "Darkoath"],
    details: {
      regimentOptions: ["Singri Brand", "The Oathsworn Kin", "Any Darkoath"],
      canJoinRegimentAs: [],
    },
  };
  const list = {
    faction: { units: [] },
    regiments: [{ id: "gunnar", hero: gunnar, units: [] }],
  };
  const oathsworn = {
    id: "oathsworn-kin",
    name: "The Oathsworn Kin",
    keywords: ["Unique", "Infantry", "Darkoath"],
    rules: { unique: true },
    details: { canJoinRegimentAs: [] },
  };

  assert.equal(canUnitJoinRegiment({
    list,
    regiment: list.regiments[0],
    unit: oathsworn,
  }), true);

  const invalid = makeList(["Any Darkoath"], [oathsworn]);
  assert.equal(hasIllegalRegimentComposition(invalid), true);
});

test("requires Command Corps Adjutants and limits each free attachment", () => {
  const auxiliaries = {
    id: "freeguild-command-auxiliaries",
    name: "Freeguild Command Corps: Auxiliaries",
    keywords: ["Infantry", "Sigmarite"],
    rules: {},
    details: { canJoinRegimentAs: [] },
  };
  const adjutants = {
    id: "freeguild-command-adjutants",
    name: "Freeguild Command Corps: Adjutants",
    keywords: ["Infantry", "Sigmarite"],
    rules: {},
    details: { canJoinRegimentAs: [] },
  };
  const list = makeList(["Any Sigmarite"]);

  assert.equal(canUnitJoinRegiment({
    list,
    regiment: list.regiments[0],
    unit: auxiliaries,
  }), false);

  list.regiments[0].units.push(adjutants);
  assert.equal(canUnitJoinRegiment({
    list,
    regiment: list.regiments[0],
    unit: auxiliaries,
  }), true);

  list.regiments[0].units.push(auxiliaries);
  assert.equal(canUnitJoinRegiment({
    list,
    regiment: list.regiments[0],
    unit: auxiliaries,
  }), false);
});

test("excludes Legends units from matched-play leaders and regiment choices", () => {
  const leader = {
    ...hero("current-leader"),
    details: { regimentOptions: ["Any Kruleboyz"], canJoinRegimentAs: [] },
  };
  const legendLeader = {
    ...hero("legend-leader"),
    source: "Battletome Supplement / Legends",
    details: { regimentOptions: ["Any Kruleboyz"], canJoinRegimentAs: [] },
  };
  const legendUnit = {
    id: "legend-unit",
    name: "Legend Unit",
    source: "Legends",
    keywords: ["Kruleboyz", "Infantry"],
    rules: {},
    details: { canJoinRegimentAs: [] },
  };
  const list = {
    faction: { units: [leader, legendLeader, legendUnit] },
    regiments: [],
  };

  assert.deepEqual(
    getAvailableRegimentLeaders(list).map((unit) => unit.id),
    ["current-leader"]
  );
  assert.deepEqual(
    getAvailableUnitsForRegiment(list, { hero: leader, units: [] }),
    []
  );
});

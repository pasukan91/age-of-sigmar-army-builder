import test from "node:test";
import assert from "node:assert/strict";

import {
  canUnitJoinRegiment,
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

import units from "./units";
import manifestations from "./manifestations";
import terrain from "./terrain";

const rule = (id, name, type, phase, description, keywords = []) => ({
  id,
  name,
  type,
  phase,
  description,
  keywords,
});

const enhancement = (id, name, description, phase = null) => ({
  id,
  name,
  source: "Army of Renown",
  points: 0,
  phase,
  type: phase,
  description,
});

const getUnit = (id) => units.find((unit) => unit.id === id);
const hasKeyword = (unit, keyword) => unit.keywords.includes(keyword);
const jadeWinds = {
  id: "jade-winds",
  name: "Jade Winds",
  manifestations,
};

const lordsOfTheClanUnits = units.filter((unit) =>
  unit.id === "the-lady-of-vines" ||
  (hasKeyword(unit, "Forest Elder") && unit.rules?.unique !== true) ||
  (hasKeyword(unit, "Kurnothi") && hasKeyword(unit, "Infantry"))
);

const soulpodGuardiansUnits = units.filter((unit) =>
  ["grove-guardian", "branchwych"].includes(unit.id) ||
  hasKeyword(unit, "Revenant")
);

const evergreenUnitIds = [
  "belthanos-first-thorn-of-kurnoth",
  "arch-revenant",
  "revenant-seekers",
  "spiterider-lancers",
  "kurnoth-hunters-with-greatbows",
  "kurnoth-hunters-with-greatscythes",
  "kurnoth-hunters-with-greatswords",
];
const evergreenUnits = evergreenUnitIds.map(getUnit).filter(Boolean);

const armiesOfRenown = [
  {
    id: "lords-of-the-clan",
    name: "Lords of the Clan",
    roster: [
      "The Lady of Vines",
      "Any non-Unique Forest Elders",
      "Any Kurnothi Infantry units",
    ],
    requiredUnits: [],
    excludesRegimentsOfRenown: true,
    description: "The forest elders and Kurnothi elite awaken to reclaim the lost lands.",
    rules: {
      units: lordsOfTheClanUnits,
      battleTraits: [
        rule("dormant-heroes", "Dormant Heroes", "Ability", "Deployment Phase", "If there are more friendly Lords of the Clan units on the battlefield than in reserve, set up an undeployed friendly Lords of the Clan Monster in reserve as a dormant forest spirit.", ["Deploy"]),
        rule("elder-authority", "Elder Authority", "Once Per Turn (Army)", "Deployment Phase", "If there is a friendly Awakened Wyldwood, set up up to 2 additional single-tree Awakened Wyldwoods: the first more than 3\" from units, objectives and terrain; the second with the same restrictions and wholly outside enemy territory."),
        rule("our-reach-is-long", "Our Reach Is Long", "Passive", null, "The creeping overgrowth extends 6\" from each terrain feature with a friendly overgrown token, increased by 1\" for each friendly Lords of the Clan unit wholly outside friendly territory."),
        rule("roused-to-fury", "Roused to Fury", "Ability", "Enemy Movement Phase", "Pick an enemy within 9\" of a friendly Awakened Wyldwood. Set up a dormant friendly Lords of the Clan unit, or a replacement for a destroyed Lords of the Clan Monster with 6 damage allocated, within 9\" of that enemy, wholly within 6\" of the Wyldwood and not in combat; then remove that Wyldwood."),
      ],
      heroicTraits: [
        enhancement("ancient-might", "Ancient Might", "This unit can Charge while in combat. If that charge roll is 3 or less, it does not count as having charged.", "Passive"),
      ],
      artefacts: [
        enhancement("rejuvenating-companions", "Rejuvenating Companions", "Heal (3) this unit.", "End of Any Turn"),
      ],
      spellLores: [{
        id: "lords-of-the-clan-spell-lore",
        name: "Lords of the Clan Spell Lore",
        spells: [{
          id: "call-forth-the-forest",
          name: "Call Forth the Forest",
          castingValue: 6,
          keywords: ["Spell", "Unlimited"],
          description: "If there are fewer than 9 friendly Awakened Wyldwoods, set one up wholly within 24\" of the caster, more than 3\" from objectives and more than 1\" from enemies and terrain. If there are already 9, Heal (3) each friendly Awakened Wyldwood.",
        }],
      }],
      prayerLores: [{
        id: "lords-of-the-clan-prayer-lore",
        name: "Lords of the Clan Prayer Lore",
        prayers: [{
          id: "song-of-persistence",
          name: "Song of Persistence",
          chantingValue: 3,
          keywords: ["Prayer", "Unlimited"],
          description: "Pick a friendly Lords of the Clan Monster within the creeping overgrowth or visible and wholly within 12\". Ignore Battle Damaged on it until your next turn; on a 6+, it also has Ward (6+).",
        }],
      }],
      manifestations,
      manifestationLores: [jadeWinds],
      terrain,
    },
  },
  {
    id: "soulpod-guardians",
    name: "Soulpod Guardians",
    roster: ["Grove Guardian", "Branchwych", "Any Revenant units"],
    requiredUnits: [],
    excludesRegimentsOfRenown: true,
    description: "Revenant guardians who form and defend a Soulpod Grove of three Awakened Wyldwoods.",
    rules: {
      units: soulpodGuardiansUnits,
      battleTraits: [
        rule("the-sacred-groves", "The Sacred Groves", "Once Per Battle (Army)", "Deployment Phase", "Set up 3 single-tree Awakened Wyldwoods wholly within friendly territory, more than 1\" from other terrain and more than 3\" from objectives, with their crescent tips touching. They form 1 Soulpod Grove for the rest of the battle.", ["Deploy Terrain"]),
        rule("jade-haven", "Jade Haven", "Passive", null, "Your Soulpod Grove has Health 18 and the creeping overgrowth extends 12\" from it."),
        rule("vengeance-for-the-lost", "Vengeance for the Lost", "Passive", null, "If your Soulpod Grove has been demolished this battle, add 2 to the Attacks characteristic of friendly Soulpod Guardians units' melee weapons."),
        rule("heart-of-the-forest", "Heart of the Forest", "Passive", null, "No more than 10 damage points can be allocated per phase to a friendly Soulpod Guardians unit wholly within 12\" of your Soulpod Grove."),
      ],
      heroicTraits: [
        enhancement("devoted-protector", "Devoted Protector", "If this unit is destroyed wholly within 12\" of your Soulpod Grove, Heal (10) the Soulpod Grove before removing this unit.", "Passive"),
      ],
      artefacts: [
        enhancement("clarionbuds", "Clarionbuds", "Once per battle in your movement phase, if an enemy is wholly within 12\" of your Soulpod Grove, reposition up to 3 friendly Soulpod Guardians units wholly within 12\" of the Grove and more than 6\" from enemies.", "Once Per Battle, Your Movement Phase"),
      ],
      spellLores: [{
        id: "soulpod-guardians-spell-lore",
        name: "Soulpod Guardians Spell Lore",
        spells: [{
          id: "cradling-vines",
          name: "Cradling Vines",
          castingValue: 7,
          keywords: ["Spell", "Unlimited"],
          description: "Pick an objective within 18\" that has not been targeted by this spell this turn. Until your next turn, add 5 to friendly units' control scores while they contest it.",
        }],
      }],
      prayerLores: [{
        id: "soulpod-guardians-prayer-lore",
        name: "Soulpod Guardians Prayer Lore",
        prayers: [{
          id: "song-of-the-lost",
          name: "Song of the Lost",
          chantingValue: 3,
          keywords: ["Prayer", "Unlimited"],
          description: "Pick a visible friendly Soulpod Guardians unit wholly within 12\" and not in combat, or wholly within 12\" of the Soulpod Grove. Until your next turn, subtract 1 from wound rolls for attacks targeting it. On an 8+, also Heal (3) it or, if it is not a Monster, ignore all save modifiers.",
        }],
      }],
      manifestations,
      manifestationLores: [jadeWinds],
      terrain,
    },
  },
  {
    id: "the-evergreen-hunt",
    name: "The Evergreen Hunt",
    roster: [
      "Belthanos, First Thorn of Kurnoth (must be included and must be your general)",
      "Arch-Revenant",
      "Revenant Seekers",
      "Spiterider Lancers",
      "Kurnoth Hunters",
    ],
    requiredUnits: ["belthanos-first-thorn-of-kurnoth"],
    excludesRegimentsOfRenown: true,
    description: "Belthanos's hunt builds chords as it corners and brings down its prey.",
    rules: {
      units: evergreenUnits,
      battleTraits: [
        rule("rhythm-of-the-chase-evergreen", "Rhythm of the Chase", "Once Per Battle Round (Army)", "Start of Battle Round", "If there is no quarry, pick an enemy unit to be the quarry for the rest of the battle."),
        rule("opening-horn-blast", "Opening Horn Blast", "Once Per Battle Round (Army)", "Start of Battle Round", "Reset your chords to 0, then gain 1 for Belthanos being on the battlefield, for each friendly Evergreen Hunt unit wholly within the same large battlefield quarter as the quarry, and for each quarry destroyed so far."),
        rule("song-of-the-hunt", "Song of the Hunt", "Passive", null, "Cumulative effects by chords: 1, +1 run and charge in the quarry's quarter; 2, +1 hit and wound for combat attacks against enemies in that quarter; 3-5, +1 Attack to melee weapons while fighting the quarry; 6+, the quarry has Strike-last while fighting a friendly unit."),
        rule("a-prize-quarry-is-sighted", "A Prize Quarry Is Sighted", "Once Per Battle (Army)", "Your Hero Phase", "Pick an enemy within 9\" of a friendly Evergreen Hunt unit. It becomes the quarry and the previous quarry ceases to be one."),
        rule("abundant-growth", "Abundant Growth", "Once Per Turn (Army)", "Your Hero Phase", "Heal (1) each friendly Evergreen Hunt unit wholly within 3\" of a terrain feature."),
        rule("merciful-strike", "Merciful Strike", "Once Per Turn (Army)", "Any Combat Phase", "Pick a friendly Evergreen Hunt Monster that has not used a Rampage and an enemy in combat. Roll a die and add the target's allocated damage; if the result exceeds its Health, slay 1 model.", ["Rampage"]),
      ],
      heroicTraits: [
        enhancement("sapwood-leader", "Sapwood Leader", "If this unit is targeted by Abundant Growth, Heal (3) instead of Heal (1).", "Passive"),
      ],
      artefacts: [
        enhancement("heartwood-hunting-horn", "Heartwood Hunting Horn", "Once per battle in any hero phase, gain 1 chord.", "Once Per Battle (Army), Any Hero Phase"),
      ],
      spellLores: [],
      prayerLores: [],
      manifestations: [],
      manifestationLores: [],
      terrain,
    },
  },
];

export default armiesOfRenown;

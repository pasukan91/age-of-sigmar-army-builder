const rule = (id, name, type, phase, description, points = 0) => ({
  id,
  name,
  type,
  phase,
  description,
  points,
});

const enhancement = (id, name, phase, description, points = 0, source = "Battletome") => ({
  id,
  name,
  phase,
  description,
  points,
  source,
});

export const battleTraits = [
  rule(
    "depict-rune",
    "Depict Rune",
    "Once Per Battle Round (Army)",
    "Start of Battle Round",
    "Pick 1 rune to depict for the rest of the battle round; depicted runes remain on the battle scripture. Varinor targets up to 2 friendly units per instance and adds 1 to run and charge rolls, with River adding 1 to combat wound rolls and Wind allowing Shoot/Charge after Retreat. Alaithi grants Ward (5+), with Strength adding Anti-charge (+1 Rend) and River subtracting 1 from enemy wound rolls in combat. Ydriliqi subtracts 2 from enemy charge rolls within 12\", with Mountain ignoring negative hit/wound modifiers and Wind allowing an immediate 3\" move through enemy combat ranges. Oreali subtracts 1 from enemy hit rolls in combat, with Strength adding 4\" Move and Mountain adding 5 Control. Thalari adds 2 to casting rolls; with 4 unique runes depicted, friendly units gain 4\" Move and score critical hits on unmodified hit rolls of 5+."
  ),
];

export const battleFormations = [
  {
    id: "warhost-of-duality",
    name: "Warhost of Duality",
    points: 20,
    description: "The host fights in perfectly balanced pairs.",
    ability: rule(
      "strike-as-one",
      "Strike as One",
      "Passive",
      null,
      "When alternating Fight abilities, on your turn you can pick 2 friendly Lumineth Realm-lords units instead of 1 and resolve the second Fight immediately after the first."
    ),
  },
  {
    id: "aelementor-guardians",
    name: "Aelementor Guardians",
    points: 10,
    description: "Ancient elemental spirits shield the host.",
    ability: rule(
      "ancient-spirits",
      "Ancient Spirits",
      "Once Per Turn (Army)",
      "Any Hero Phase",
      "Pick a friendly Lumineth Realm-lords Monster. For the rest of the turn, ignore the first damage point allocated in each phase to each visible friendly Lumineth Realm-lords unit wholly within 12\" of it."
    ),
  },
  {
    id: "pilgrims-of-haixiah",
    name: "Pilgrims of Haixiah",
    points: 0,
    description: "Prismatic distortions confuse nearby enemies.",
    ability: rule(
      "trick-of-the-light",
      "Trick of the Light",
      "Passive",
      null,
      "Friendly Lumineth Realm-lords units can use Power Through even if they have not charged this turn."
    ),
  },
  {
    id: "scinari-council",
    name: "Scinari Council",
    points: 0,
    description: "A conclave of mages shares its arcane learning.",
    ability: rule(
      "arcane-focus",
      "Arcane Focus",
      "Passive",
      null,
      "Lore of Hysh and Lore of the Awakened Realms Spell abilities used by friendly Lumineth Realm-lords Wizards have Unlimited, but the same unit cannot be targeted by the same spell twice in one turn."
    ),
  },
];

export const heroicTraits = [
  enhancement(
    "masterful-tactician",
    "Masterful Tactician",
    "Reaction: You declared the Redeploy command",
    "If a visible friendly Lumineth Realm-lords unit wholly within 12\" rolls 1-3 for its Redeploy distance, use a value of 4 instead."
  ),
  enhancement(
    "flawless-commander",
    "Flawless Commander",
    "Deployment Phase",
    "Pick up to 3 visible friendly Lumineth Realm-lords Infantry units wholly within 18\". Each can make a Normal Move as if it were your movement phase."
  ),
  enhancement(
    "acolyte-of-the-runes",
    "Acolyte of the Runes",
    "Start of Battle Round",
    "Pick a friendly Lumineth Realm-lords Hero wholly within 12\". It can be picked as an additional target the next time you use Depict Rune."
  ),
  enhancement(
    "scholar-of-the-sigils",
    "Scholar of the Sigils",
    "Deployment Phase",
    "Pick 1 rune. Apply its listed effect to this unit for the rest of the battle, and that rune cannot be depicted: Varinor adds 1 to run and charge rolls; Alaithi grants Ward (5+); Ydriliqi gives melee Anti-charge (+1 Rend) and ranged Shoot in Combat; Oreali subtracts 1 from hit rolls for combat attacks targeting this unit; Thalari adds 1 to casting rolls.",
    0,
    "Aqshy"
  ),
  enhancement(
    "peerless-swordsman",
    "Peerless Swordsman",
    "Any Combat Phase",
    "Pick an enemy unit with a starting size of 1 in combat and one of this unit's non-Companion melee weapons. Roll dice equal to that weapon's Attacks: each 3+ subtracts 1 from the Attacks of the target's non-Companion melee weapons this turn; each 5+ also inflicts 1 mortal damage.",
    0,
    "Aqshy"
  ),
  enhancement(
    "dispassionate-soul",
    "Dispassionate Soul",
    "End of Your Turn",
    "Once per battle, if this unit is in combat with an enemy Hero, reduce your opponent's fury level by the number of unique runes depicted on your battle scripture.",
    0,
    "Aqshy"
  ),
];

export const artefacts = [
  enhancement(
    "phoenix-stone",
    "Phoenix Stone",
    null,
    "The first time this unit would be destroyed, roll. On a 3+, it is not destroyed, remaining damage has no effect, then Heal (D3)."
  ),
  enhancement(
    "silver-wand",
    "Silver Wand",
    null,
    "If this unit is not a Wizard, it can Unbind as Wizard (1); otherwise, add 1 to its casting rolls."
  ),
  enhancement(
    "waystone",
    "Waystone",
    "Your Movement Phase",
    "Remove this unit and set it up again wholly within friendly territory and more than 9\" from all enemies."
  ),
];

export const flawlessManoeuvres = [
  enhancement(
    "perfect-footwork",
    "Perfect Footwork",
    "Enemy Movement Phase",
    "If every model in this unit is contesting the same objective, it can move up to 6\", passing through enemy combat ranges but only ending in combat with units it started in combat with. Every model must end contesting that objective. Then it cannot Run this turn.",
    10,
    "Aqshy"
  ),
  enhancement(
    "patient-strike",
    "Patient Strike",
    "Enemy Combat Phase",
    "Pick an enemy in combat. Roll for each model in this unit in combat with it; each 4+ inflicts 1 mortal damage.",
    20,
    "Aqshy"
  ),
  enhancement(
    "dazzling-phalanx",
    "Dazzling Phalanx",
    "Reaction: Opponent declared a Charge ability",
    "If the charging unit finishes within 9\" and visible, spend 1 rage die. If your opponent's fury level is lower, increase it by 1 (maximum 7). For the rest of the turn, add 1 to wound rolls for this unit's combat attacks targeting that enemy.",
    10,
    "Aqshy"
  ),
];

export const spellLores = [
  {
    id: "lore-of-hysh",
    name: "Lore of Hysh",
    spells: [
      {
        id: "beacon-of-hysh",
        name: "Beacon of Hysh",
        castingValue: 6,
        keywords: ["Unlimited"],
        description: "Pick a visible friendly non-Monster Lumineth Realm-lords unit wholly within 12\". Until your next turn, unmodified hit rolls of 1-3 for attacks targeting it fail.",
      },
      {
        id: "overwhelming-heat",
        name: "Overwhelming Heat",
        castingValue: 7,
        description: "Pick a visible enemy within 18\". Halve its Move until your next turn, then roll; if the result equals or exceeds its Save, inflict D3 mortal damage.",
      },
      {
        id: "piercing-refraction",
        name: "Piercing Refraction",
        castingValue: 7,
        description: "Pick a visible enemy within 18\". Roll for each model in it; each 5+ inflicts 1 mortal damage.",
      },
    ],
  },
  {
    id: "lore-of-the-awakened-realms",
    name: "Lore of the Awakened Realms",
    spells: [
      {
        id: "focused-erosion",
        name: "Focused Erosion",
        castingValue: 6,
        keywords: ["Unlimited"],
        description: "Pick a visible enemy within 18\". Subtract 1 from the Rend characteristic of its weapons until your next turn.",
      },
      {
        id: "elemental-push",
        name: "Elemental Push",
        castingValue: 6,
        description: "Pick a visible friendly Lumineth Realm-lords unit wholly within 12\" that was not set up this turn; subtract 1 from the casting roll if it is in combat. It can move up to 5\", passing through enemy combat ranges but not ending in combat.",
      },
      {
        id: "realmshield",
        name: "Realmshield",
        castingValue: 7,
        description: "Until your next turn, friendly Lumineth Realm-lords units wholly within 12\" of the caster have Ward (5+).",
      },
    ],
  },
];

export const manifestationLores = [{
  id: "manifestations-of-hysh",
  name: "Manifestations of Hysh",
  manifestations: [
    "hyshian-twinstones",
    "sanctum-of-amyntok",
    "rune-of-petrification",
  ],
}];


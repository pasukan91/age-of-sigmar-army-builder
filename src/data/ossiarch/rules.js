export const battleTraits = [
  {
    id: "immortal-elite",
    name: "Immortal Elite",
    type: "Once Per Battle Round (Army)",
    phase: "Start of Battle Round",
    description:
      "If any friendly Ossiarch Bonereapers Heroes are on the battlefield, pick one. Gain relentless discipline points equal to its Relentless Discipline value. Unspent points are lost at the end of the battle round.",
  },
  {
    id: "remorseless-march",
    name: "Remorseless March",
    type: "Relentless Discipline",
    phase: "Your Movement Phase",
    description:
      "Spend 1 relentless discipline point (2 if the unit is reinforced and above half strength). Add 3\" to the Move of a unit that has not used a Relentless Discipline ability this phase; it cannot Run this turn.",
  },
  {
    id: "impassive-retreat",
    name: "Impassive Retreat",
    type: "Relentless Discipline",
    phase: "Your Movement Phase",
    description:
      "Spend 1 relentless discipline point (2 if reinforced and above half strength). The unit can Charge this turn even if it Retreated.",
  },
  {
    id: "ruthless-extermination",
    name: "Ruthless Extermination",
    type: "Relentless Discipline",
    phase: "Reaction: You declared a Shoot ability",
    description:
      "Spend 1 relentless discipline point (2 if reinforced and above half strength). Subtract 1 from ward rolls against damage inflicted by that Shoot ability.",
  },
  {
    id: "pitiless-assault",
    name: "Pitiless Assault",
    type: "Relentless Discipline",
    phase: "Reaction: You declared a Fight ability",
    description:
      "Spend 1 relentless discipline point (2 if reinforced and above half strength). Add 1 to wound rolls for attacks made as part of that Fight ability.",
  },
  {
    id: "inviolate-legions",
    name: "Inviolate Legions",
    type: "Relentless Discipline",
    phase: "Reaction: Opponent declared an Attack ability",
    description:
      "Spend 1 relentless discipline point (2 if reinforced and above half strength). The targeted unit has Ward (5+) against damage inflicted by that Attack ability. Friendly units can use this more than once per phase.",
  },
];

export const battleFormations = [
  {
    id: "border-guards",
    name: "Border Guards",
    description: "Defenders of the expanding borders of the Ossiarch Empire.",
    ability: {
      name: "Grim Sentinels",
      type: "Passive",
      phase: null,
      description:
        "Friendly units' melee weapons have Anti-charge (+1 Rend) while wholly within neutral territory or wholly within 6\" of both enemy and friendly territory.",
    },
  },
  {
    id: "the-inevitable-empire",
    name: "The Inevitable Empire",
    description: "The deathly silence of the Ossiarch Empire breaks enemy resolve.",
    ability: {
      name: "Silent Empire",
      type: "Once Per Turn (Army)",
      phase: "Your Hero Phase",
      description:
        "Pick an enemy unit and roll a die. On a 3+, until your next turn it has a maximum control score of 1 while in neutral or friendly territory.",
    },
  },
  {
    id: "ruthless-legion",
    name: "Ruthless Legion",
    description: "Charging cohorts form a lethal nadirite wedge.",
    ability: {
      name: "Nadirite Wedge",
      type: "Once Per Turn (Army)",
      phase: "Any Combat Phase",
      description:
        "Pick a friendly unit that charged this turn. On a 3+, its melee weapons, including Companion weapons, have Crit (2 Hits) for the rest of the turn.",
    },
  },
  {
    id: "remorseless-conquerors",
    name: "Remorseless Conquerors",
    description: "Ossiarch soldiers march without fatigue.",
    ability: {
      name: "Unfaltering Pace",
      type: "Reaction",
      phase: "You declared a Run ability",
      description:
        "When determining the unit's run distance, a roll of 1-3 can be treated as 4.",
    },
  },
];

export const heroicTraits = [
  {
    id: "manufactured-mind",
    name: "Manufactured Mind",
    source: "Battletome",
    points: 0,
    type: "Once Per Battle",
    phase: "Start of Battle Round",
    description:
      "When choosing the target of Immortal Elite this battle round, you may choose a friendly Ossiarch Bonereapers Hero that has been destroyed.",
  },
  {
    id: "immaculate-defender",
    name: "Immaculate Defender",
    source: "Battletome",
    points: 0,
    type: "Passive",
    phase: null,
    description:
      "Ignore the first damage point allocated in each combat phase to every friendly Ossiarch Bonereapers Infantry unit wholly within 12\".",
  },
  {
    id: "imperious-will",
    name: "Imperious Will",
    source: "Battletome",
    points: 20,
    type: "Reaction",
    phase: "You declared a Fight ability",
    description:
      "For a non-Hero unit wholly within 12\", pick an enemy in combat with it that did not charge. Roll D3; on 2+, inflict that much mortal damage. This can be used more than once per phase.",
  },
];

export const artefacts = [
  {
    id: "shard-of-the-necris",
    name: "Shard of the Necris",
    source: "Battletome",
    points: 0,
    type: "Passive",
    phase: null,
    description:
      "If an unmodified hit roll targeting this unit is 1-4 and this unit did not charge in the same turn, the attack fails.",
  },
  {
    id: "blade-of-the-nadir",
    name: "Blade of the Nadir",
    source: "Battletome",
    points: 0,
    type: "Deployment Phase",
    phase: "Deployment Phase",
    description:
      "Pick a non-Companion melee weapon. For the battle, each unmodified wound roll of 6 inflicts D3 mortal damage after the Fight ability is resolved.",
  },
  {
    id: "amulet-of-gnosis",
    name: "Amulet of Gnosis",
    source: "Battletome",
    points: 0,
    type: "Passive",
    phase: null,
    description:
      "Friendly Ossiarch Bonereapers units wholly within 12\" suffer no mortal damage from Retreat abilities.",
  },
];

export const aqshyArtefacts = [
  {
    id: "banner-of-old-ossia",
    name: "Banner of Old Ossia",
    source: "Aqshy",
    points: 0,
    type: "Reaction",
    phase: "You declared the Rally command",
    description:
      "Rally points can heal other visible friendly non-Hero units wholly within 12\", or return a slain model by spending rally points equal to that unit's Health.",
  },
  {
    id: "scarabaean-cloak",
    name: "Scarabaean Cloak",
    source: "Aqshy",
    points: 0,
    type: "Once Per Battle",
    phase: "Your Movement Phase",
    description:
      "Remove this unit from the battlefield and set it up again more than 9\" from all enemy units.",
  },
  {
    id: "soulweb-gem",
    name: "Soulweb Gem",
    source: "Aqshy",
    points: 0,
    type: "Once Per Battle",
    phase: "End of Any Turn",
    description:
      "If this unit was destroyed this turn, set up an identical replacement wholly within friendly territory and out of combat, then allocate damage equal to its Health minus 1 with no wards.",
  },
];

export const mortisanRefinements = [
  {
    id: "perpetually-empowered-weapons",
    name: "Perpetually Empowered Weapons",
    source: "Aqshy",
    points: 10,
    type: "Passive",
    phase: null,
    description:
      "This unit's melee weapons, including Companion weapons, have Crit (2 Hits).",
  },
  {
    id: "elongated-tibias",
    name: "Elongated Tibias",
    source: "Aqshy",
    points: 10,
    type: "Passive",
    phase: null,
    description: "Add 1 to charge rolls for this unit.",
  },
  {
    id: "utterly-unquestioning",
    name: "Utterly Unquestioning",
    source: "Aqshy",
    points: 10,
    type: "Passive",
    phase: null,
    description:
      "Each time this unit uses a Relentless Discipline ability, roll a die as a reaction. On a 5+, reduce its relentless discipline point cost by 1.",
  },
];

export const spellLores = [
  {
    id: "lore-of-ossian-sorcery",
    name: "Lore of Ossian Sorcery",
    description: "Deathly magic used to empower the Ossiarch legions.",
    spells: [
      {
        id: "empower-nadirite-weapons",
        name: "Empower Nadirite Weapons",
        castingValue: 5,
        keywords: ["Unlimited"],
        description:
          "A visible friendly unit wholly within 12\" gains Crit (2 Hits) on melee weapons until your next turn. If all non-Companion weapons already had it, combat attacks instead score critical hits on unmodified 5+. Units can be affected multiple times.",
      },
      {
        id: "immolating-flames",
        name: "Immolating Flames",
        castingValue: 6,
        description:
          "Until your next turn, whenever a model in a visible friendly unit wholly within 12\" is slain by a combat attack, roll dice equal to its Health; each 5+ inflicts 1 mortal damage on the attacker.",
      },
      {
        id: "drain-vitality",
        name: "Drain Vitality",
        castingValue: 7,
        description:
          "A visible enemy within 12\" subtracts 1 from hit rolls for its attacks and 1 from its save rolls until your next turn.",
      },
    ],
  },
];

const rule = (id, name, phase, description, type = "Ability", keywords = []) => ({
  id, name, phase, description, type, keywords,
});

const enhancement = (id, name, phase, description, type = "Ability") => ({
  id, name, phase, description, type, source: "Army of Renown", points: 0,
});

const spell = (id, name, castingValue, description, keywords = []) => ({
  id, name, castingValue, description, keywords,
});

const prayer = (id, name, chantingValue, description, keywords = []) => ({
  id, name, chantingValue, description, keywords,
});

const army = (id, name, roster, rules, options = {}) => ({
  id,
  name,
  roster,
  requiredUnits: [],
  excludesRegimentsOfRenown: true,
  source: "Rules of Renown - August 2026",
  rules,
  ...options,
});

const croneseersPariahs = army(
  "the-croneseers-pariahs",
  "The Croneseer's Pariahs",
  [
    "Krethusa the Croneseer (must be included and must be your general)",
    "Daughters of Khaine Aelf units",
    "You cannot include Morathi-Khaine or the Shadow Queen",
  ],
  {
    battleTraits: [
      rule("guided-by-morai-heg", "Guided by Morai-Heg", "Passive", "Add 1 to the Rend characteristic of combat attacks made by friendly non-Hero Infantry units while they are wholly within 9\" of a friendly Krethusa."),
      rule("plumes-of-auspicious-smoke", "Plumes of Auspicious Smoke", "Passive", "Friendly Slaughter Queen on Cauldron of Blood and Hag Queen on Cauldron of Blood units start empty. While full, they have Ward (4+) against shooting damage and shooting attacks targeting friendly Croneseer's Pariahs units wholly within 9\" of them suffer -1 to hit."),
      rule("laden-with-prophecy", "Laden with Prophecy", "End of Any Turn", "Pick a friendly empty Slaughter Queen on Cauldron of Blood or Hag Queen on Cauldron of Blood. If it slew any enemy models with combat attacks this turn, it becomes full."),
      rule("skilled-skirmishers", "Skilled Skirmishers", "Any Charge Phase", "Pick a friendly Croneseer's Pariahs Cavalry unit that has not charged and is in combat with an enemy unit that charged this turn. On a 3+, it can Retreat as if it were your movement phase without suffering mortal damage.", "Once Per Turn (Army)"),
      rule("the-blood-reveals-all", "The Blood Reveals All", "Your Hero Phase", "Pick a friendly Croneseer's Pariahs Hero within the combat range of a friendly empty Cauldron of Blood, then pick another unit within that Hero's combat range. Roll a dice and allocate that many damage points to the target; ward rolls cannot be made. The Cauldron becomes full.", "Once Per Battle (Army)"),
    ],
    heroicTraits: [
      enhancement("proselyte-of-morai-heg", "Proselyte of Morai-Heg", "Passive", "Enemy units cannot use commands while they are in combat with this unit."),
    ],
    artefacts: [
      enhancement("blade-of-prophetic-doom", "Blade of Prophetic Doom", "End of Any Turn", "Pick an enemy unit in combat and roll a dice. On a 2+, inflict 1 mortal damage if it is not damaged, or mortal damage equal to the roll if it is damaged.", "Once Per Turn"),
    ],
    prayerLores: [{
      id: "croneseers-pariahs-prayers",
      name: "Prayers of the Croneseer's Pariahs",
      prayers: [
        prayer("wings-of-the-crone-goddess", "Wings of the Crone Goddess", 3, "A visible friendly unit wholly within 12\" gains Fly and +2\" Move until your next turn; on an 8+, it gains +6\" Move instead.", ["Unlimited"]),
        prayer("augury-of-battle", "Augury of Battle", 5, "A visible friendly unit wholly within 18\" has Ward (5+) until your next turn; on a 10+, pick up to 2 targets."),
        prayer("auspicious-strike", "Auspicious Strike", 4, "Until your next turn, each unmodified hit roll of 1 against a visible friendly unit wholly within 12\" inflicts 1 mortal damage on the attacker after Fight; on a 10+, this triggers on 1-2."),
      ],
    }],
  },
);

const lofnirDrothkeepers = army(
  "lofnir-drothkeepers",
  "Lofnir Drothkeepers",
  [
    "Auric Runefather on Magmadroth",
    "Auric Runesmiter on Magmadroth",
    "Auric Runeson on Magmadroth",
    "Auric Runemaster",
    "Auric Runesmiter",
    "Auric Runeson",
    "Vulkyn Flameseekers",
  ],
  {
    battleTraits: [
      rule("skilled-drothwranglers", "Skilled Drothwranglers", "Reaction: You declared a non-Charge Move ability for a friendly Magmadroth", "A Magmadroth can carry a friendly Vulkyn Flameseekers unit and/or a friendly Drothkeepers Infantry Hero wholly within 6\". Set them up wholly within 6\" after the move and not in combat; they cannot charge that turn.", "Reaction"),
      rule("ferocious-heat", "Ferocious Heat", "Any Combat Phase", "Pick a friendly Drothkeepers Monster that has not used a Rampage and an enemy in combat. On a 3+, ward rolls cannot be made for that enemy for the rest of the turn.", "Once Per Turn (Army)", ["Rampage"]),
      rule("daring-tamers", "Daring Tamers", "Passive", "Enemy Monsters have Strike-last while in combat with 2 or more friendly Drothkeepers Vulkyn Flameseekers units."),
      rule("searing-claws", "Searing Claws", "Any Combat Phase", "Pick a friendly Drothkeepers Monster that has not used a Rampage and an enemy in combat. On a 3+, add 1 to the Rend of melee attacks targeting that enemy for the rest of the turn.", "Once Per Turn (Army)", ["Rampage"]),
      rule("rearing-strike", "Rearing Strike", "Any Combat Phase", "Pick a friendly Drothkeepers Monster that has not used a Rampage and an enemy in combat. Roll 2 dice, adding 2 to each if the target is a Monster. Each 5+ inflicts D3 mortal damage.", "Once Per Turn (Army)", ["Rampage"]),
    ],
    heroicTraits: [
      enhancement("raised-around-beasts", "Raised Around Beasts", "Passive", "Melee weapons used by friendly non-Monster units wholly within 9\" have Anti-Monster (+1 Rend)."),
    ],
    artefacts: [
      enhancement("mastery-over-monsters", "Mastery Over Monsters", "Passive", "While this unit contests an objective, enemy Monsters contesting it have a maximum control score of 2."),
    ],
    prayerLores: [{
      id: "drothkeepers-prayers",
      name: "Drothkeepers Prayers",
      prayers: [
        prayer("breath-of-vulcatrix", "Breath of Vulcatrix", 6, "A visible friendly Drothkeepers Magmadroth wholly within 12\" has Damage 3 instead of D3 for its Roaring Fyrestream until your next turn.", ["Unlimited"]),
      ],
    }],
    manifestations: [{
      id: "molten-infernoth",
      name: "Molten Infernoth",
      castingValue: 4,
      summonSpell: {
        name: "Summon Molten Infernoth",
        type: "Prayer",
        phase: "Your Hero Phase",
        chantingValue: 4,
        keywords: ["Prayer", "Summon"],
        description: "Set up a Molten Infernoth wholly within 12\" of and visible to the chanter, and more than 9\" from all enemy units.",
      },
    }],
    manifestationLores: [{
      id: "drothkeepers-manifestations",
      name: "Molten Infernoth",
      manifestations: ["molten-infernoth"],
    }],
  },
  { excludesFactionTerrain: true },
);

const grundstokExpeditionaryForce = army(
  "grundstok-expeditionary-force",
  "Grundstok Expeditionary Force",
  [
    "Arkanaut Admiral",
    "Aetheric Navigator",
    "Endrinmaster with Endrinharness",
    "Endrinmaster with Dirigible Suit",
    "Codewright",
    "Aether-Khemist",
    "Grundstok Thunderers",
    "Grundstok Gunhauler",
  ],
  {
    battleTraits: [
      rule("transport-skyfarers", "Transport Skyfarers", "Your Movement Phase", "A friendly Skyvessel using a non-Charge Move can transport units up to its Transport Capacity that are wholly within 6\". Set them up wholly within 6\" and not in combat after the move; transported units cannot charge that turn.", "Reaction"),
      rule("gun-butt-low-blow", "Gun Butt Low Blow", "Passive", "While a friendly Expeditionary Force Infantry unit contests an objective you control, its melee weapons have Crit (Mortal)."),
      rule("no-safe-haven", "No Safe Haven", "End of Any Turn", "Subtract 1 from an enemy unit's control score for each damage point allocated to it this turn by friendly Expeditionary Force shooting attacks, to a maximum of 10."),
      rule("grudgefire-rounds", "Grudgefire Rounds", "Any Shooting Phase", "Pick a friendly Expeditionary Force Infantry unit. On a 3+, add 1 to the Attacks characteristic of one of its ranged weapons for the rest of the phase.", "Once Per Turn (Army)"),
    ],
    heroicTraits: [
      enhancement("entrenchment-expert", "Entrenchment Expert", "Reaction: You declared the All-out Defence command", "The friendly unit wholly within 12\" targeted by All-out Defence has Ward (5+) for the rest of the turn.", "Reaction"),
    ],
    artefacts: [
      enhancement("aetheric-nullifier", "Aetheric Nullifier", "Reaction: Opponent declared a Shoot or Fight ability for a Manifestation within 9\"", "Roll 2D6. If the roll equals or exceeds the manifestation's banishment value, it is banished. The same manifestation cannot be targeted more than once per phase.", "Reaction"),
    ],
  },
);

const draconithSkywing = army(
  "draconith-skywing",
  "Draconith Skywing",
  ["Ionus Cryptborn", "Krondys, Son of Dracothion", "Karazai the Scarred", "Knight-Draconis", "Stormdrake Guard"],
  {
    battleTraits: [
      rule("exemplars-of-fury", "Exemplars of Fury", "Passive", "Add 1 to the Attacks characteristic of Companion weapons used by friendly Draconith Skywing Heroes while they are within 6\" of 2 or more friendly Stormdrake Guard units."),
      rule("shields-of-the-warden", "Shields of the Warden", "Passive", "While a friendly Stormdrake Guard unit is within Ionus Cryptborn's combat range, Ionus has Ward (4+). Each successful ward allocates 1 damage point to an eligible Stormdrake Guard unit; no ward can be made for that damage."),
      rule("thunderous-roar", "Thunderous Roar", "Any Combat Phase", "Pick up to 3 enemy units in combat with a friendly Monster that has not used a Rampage. For each, on a 3+, subtract 5 from its control score for the rest of the turn.", "Once Per Turn (Army)", ["Rampage"]),
      rule("aetheric-cyclone", "Aetheric Cyclone", "Any Combat Phase", "Pick an enemy in combat with a friendly Monster that has not used a Rampage. On a 3+, subtract 1 from wound rolls for its attacks for the rest of the turn.", "Once Per Turn (Army)", ["Rampage"]),
    ],
    heroicTraits: [
      enhancement("fearless-fliers", "Fearless Fliers", "End of Any Turn", "If this unit is not in combat, it can immediately move D6\" and can end that move in combat."),
    ],
    artefacts: [
      enhancement("celestium-ensign", "Celestium Ensign", "End of Any Turn", "Heal (3) each friendly Draconith Skywing unit wholly within 12\".", "Once Per Battle (Army)"),
    ],
    spellLores: [{
      id: "draconith-skywing-spells",
      name: "Draconith Skywing Spells",
      spells: [spell("regal-authority", "Regal Authority", 7, "Add 5 to the control score of a visible friendly Draconith Skywing unit wholly within 12\" for the rest of the turn.", ["Unlimited"])],
    }],
    prayerLores: [{
      id: "draconith-skywing-prayers",
      name: "Draconith Skywing Prayers",
      prayers: [
        prayer("sigmars-grace", "Sigmar's Grace", 4, "Heal (D3) a friendly Draconith Skywing unit wholly within 12\", or Heal (2D3) if the chanting roll was 8+.", ["Unlimited"]),
        prayer("sanctification", "Sanctification", 4, "Until your next turn, enemy Wizards within 30\" suffer -1 to casting rolls. On a 12+, the penalty lasts for the battle and this prayer cannot be used again."),
      ],
    }],
    manifestations: [{
      id: "everblaze-comet",
      name: "Everblaze Comet",
      castingValue: 8,
      summonSpell: {
        name: "Summon Everblaze Comet",
        type: "Spell",
        phase: "Your Hero Phase",
        castingValue: 8,
        keywords: ["Spell", "Summon"],
        description: "Set up an Everblaze Comet wholly within 18\" of the caster.",
      },
    }],
    manifestationLores: [{ id: "draconith-skywing-manifestations", name: "Everblaze Comet", manifestations: ["everblaze-comet"] }],
  },
);

const swordsOfChaos = army(
  "the-swords-of-chaos",
  "The Swords of Chaos",
  ["Archaon the Everchosen", "Abraxia, Spear of the Everchosen", "Varanguard"],
  {
    battleTraits: [
      rule("knights-of-the-first-circle", "Knights of the First Circle", "Deployment Phase", "If more friendly Swords of Chaos units are on the battlefield than in reserve, set up an undeployed friendly Swords of Chaos unit in reserve in the Ruinous Skies.", "Deploy"),
      rule("descent-from-ruinous-skies", "Descent from Ruinous Skies", "Your Movement Phase", "Set up a friendly Swords of Chaos unit from the Ruinous Skies more than 9\" from all enemy units."),
      rule("demands-of-the-dark-gods", "Demands of the Dark Gods", "Start of Battle Round", "Pick one demand: Khorne gives friendly units +1 melee Rend for the round; Tzeentch can inflict D6 mortal damage on a visible enemy within 9\" on a 3+; Nurgle heals each friendly unit D3 and gives one healed unit Ward (6+); Slaanesh gives friendly units +2\" Move until the next battle round.", "Once Per Turn (Army)"),
      rule("grimroot-order", "The Grimroot Order", "Passive", "First Circle Title (Varanguard only): Add 1 to this unit's Health characteristic.", "First Circle Title"),
      rule("tamers-of-haradhs-torment", "Tamers of Haradh's Torment", "Passive", "First Circle Title (Varanguard only): Add 1 to the Damage characteristic of this unit's Companion weapons.", "First Circle Title"),
      rule("hounds-apocalyptus", "The Hounds Apocalyptus", "Passive", "First Circle Title (Varanguard only): While wholly within enemy territory, add 1 to the Attacks characteristic of this unit's melee weapons.", "First Circle Title"),
      rule("blackstorm-apostates", "The Blackstorm Apostates", "Passive", "First Circle Title (Varanguard only): Add 3\" to this unit's Move characteristic.", "First Circle Title"),
      rule("betrayers-of-the-anvilking", "Betrayers of the Anvilking", "Passive", "First Circle Title (Varanguard only): This unit has Ward (6+).", "First Circle Title"),
    ],
  },
  {
    enhancementLimit: 3,
    enhancementLabel: "First Circle Titles",
    unitFilter: (unit) => ["archaon", "abraxia", "varanguard"].includes(unit.id),
  },
);

const tribesOfTheSnowPeaks = army(
  "tribes-of-the-snow-peaks",
  "Tribes of the Snow Peaks",
  ["Darkoath units"],
  {
    battleTraits: [
      rule("pledges-to-the-dark-gods", "Pledges to the Dark Gods", "Passive", "Gain 1 oath point each time a friendly unit resolves Oath of Bloodshed, Murder, Supremacy, the Marauder, the Raider, Conquest or Dark Sacrifice."),
      rule("speed-of-the-blood-crow", "Speed of the Blood Crow", "Your Charge Phase", "Spend 1 oath point. A friendly unit that has not used an Oath ability can Charge even if it Ran this turn.", "Once Per Phase (Army)", ["Oath"]),
      rule("hunger-of-sheshshan", "Hunger of Shesh'shan", "Your Combat Phase", "Spend 1 oath point. Add 1 to the Attacks characteristic of a friendly unit's melee weapons for the rest of the turn.", "Once Per Phase (Army)", ["Oath"]),
      rule("daemonfire-weapons", "Daemonfire Weapons", "Your Combat Phase", "Spend 1 oath point. Add 1 to the Rend characteristic of a friendly unit's melee weapons for the rest of the turn.", "Once Per Phase (Army)", ["Oath"]),
      rule("messengers-of-the-gods", "Messengers of the Gods", "End of Any Turn", "Spend 2 oath points. Replace a destroyed Darkoath Marauders or Fellriders unit at half strength wholly within 6\" of a battlefield edge and more than 3\" from enemies.", "Once Per Phase (Army)", ["Oath"]),
      rule("rage-of-arkhar", "Rage of Arkhar", "Your Combat Phase", "Spend 2 oath points. A friendly unit can use 2 Fight abilities this phase and has Strike-last after the first.", "Once Per Phase (Army)", ["Oath"]),
      rule("shroud-of-the-pale-elk", "Shroud of the Pale Elk", "Reaction: Opponent declared an Attack ability", "Spend 1 oath point. The targeted friendly unit has Ward (4+) for the rest of the turn.", "Once Per Phase (Army)", ["Oath"]),
    ],
    heroicTraits: [
      enhancement("oath-of-kinship", "Oath of Kinship", "Passive", "While within another friendly Snow Peaks unit's combat range, add 1 to hit rolls for this unit's attacks."),
    ],
    artefacts: [
      enhancement("grand-offering", "Grand Offering", "Any Movement Phase", "Pick a friendly Snow Peaks Wilderfiend within 9\" and give it D6 sacrifice points.", "Once Per Battle (Army)"),
    ],
  },
  { unitFilter: (unit) => unit.keywords?.includes("Darkoath") },
);

const scionsOfNulahmia = army(
  "scions-of-nulahmia",
  "Scions of Nulahmia",
  ["Sekhar, Fang of Nulahmia (must be included and must be your general)", "Coven Throne", "Bloodseeker Palanquin", "Vampire Lord", "Vampire Lord on Nightmare Steed", "Dire Wolves", "Fell Bats"],
  {
    battleTraits: [
      rule("seek-worthy-blood", "Seek Worthy Blood", "Your Hero Phase", "If no other Exquisite Plot was used this turn, a friendly unit's weapons gain Anti-Hero (+1 Rend) this turn. If it destroys an enemy Hero, they retain it for the battle.", "Once Per Turn (Army)", ["Exquisite Plot"]),
      rule("thaumic-realignment", "Thaumic Realignment", "Your Hero Phase", "If no other Exquisite Plot was used this turn, add 1 to casting rolls for a friendly Wizard this turn. If it casts a spell, add 1 to its power level for the battle.", "Once Per Turn (Army)", ["Exquisite Plot"]),
      rule("recruitment-drive", "Recruitment Drive", "Your Hero Phase", "If no other Exquisite Plot was used this turn, add 1 to hit rolls for a friendly hunter against an enemy with 5+ models. If the hunter destroys it, add 1 to its melee Attacks for the battle.", "Once Per Turn (Army)", ["Exquisite Plot"]),
      rule("the-queens-prize", "The Queen's Prize", "Your Hero Phase", "If no other Exquisite Plot was used this turn, add 5 to a friendly unit's control score this turn. If it captures an objective from your opponent, the bonus lasts for the battle.", "Once Per Turn (Army)", ["Exquisite Plot"]),
    ],
    heroicTraits: [
      enhancement("keeper-of-the-royal-menagerie", "Keeper of the Royal Menagerie", "Your Hero Phase", "Replace a destroyed Dire Wolves or Fell Bats unit at half strength wholly within 12\" and more than 9\" from enemies."),
    ],
    artefacts: [
      enhancement("amulet-of-leeches", "Amulet of Leeches", "Passive", "While within the combat range of friendly Dire Wolves or Fell Bats, this unit has Ward (5+). Each successful ward allocates 1 damage to an eligible nearby unit; no ward can be made for it."),
    ],
    spellLores: [{
      id: "scions-of-nulahmia-spells",
      name: "Scions of Nulahmia Spells",
      spells: [
        spell("invocation-of-nulahmia", "Invocation of Nulahmia", 7, "Return 1 slain model to a visible friendly Dire Wolves or Fell Bats unit wholly within 18\".", ["Unlimited"]),
        spell("thrall-drain", "Thrall Drain", 7, "Slay D3 models in a friendly unit wholly within 12\", then remove all damage points from the caster."),
        spell("scarlet-thirst", "Scarlet Thirst", 6, "Add 1 to the Attacks characteristic of melee weapons used by friendly Scions of Nulahmia Vampire units wholly within 12\" for the rest of the turn."),
      ],
    }],
  },
  {
    unitFilter: (unit) => [
      "sekhar",
      "coven-throne",
      "bloodseeker-palanquin",
      "vampire-lord",
      "vampire-lord-on-nightmare-steed",
      "dire-wolves",
      "fell-bats",
    ].includes(unit.id),
  },
);

const truggsTroggherd = army(
  "truggs-troggherd",
  "Trugg's Troggherd",
  ["Trugg the Troggoth King (must be included and must be your general)", "Dankhold Troggboss", "Dankhold Troggoth", "Fellwater Troggoths", "Rockgut Troggoths"],
  {
    battleTraits: [
      rule("moon-toughened-hide", "Moon-toughened Hide", "Passive", "In battle rounds 2 and 3, subtract 1 from the Rend characteristic of melee attacks targeting friendly Trugg's Troggherd units."),
      rule("aura-of-haywire-magic", "Aura of Haywire Magic", "Passive", "A friendly Trugg's Malfunctioning Leystone affects friendly Trugg's Troggherd units anywhere on the battlefield."),
      rule("herd-healing", "Herd Healing", "Passive", "Each time a friendly Troggoth unit uses a Fight ability, Heal (D3) it after that ability is resolved."),
      rule("living-landmark", "Living Landmark", "Deployment Phase", "Set up a friendly undeployed unit in reserve as a living landmark.", "Once Per Battle (Army), Deploy"),
      rule("broken-slumber", "Broken Slumber", "Your Movement Phase", "Set up a friendly living landmark wholly within 3\" of a terrain feature and more than 9\" from all enemy units."),
    ],
    heroicTraits: [
      enhancement("loonstone-teef", "Loonstone Teef", "Any Combat Phase", "This unit can use 2 Fight abilities this phase and has Strike-last after the first.", "Once Per Battle"),
    ],
    artefacts: [
      enhancement("crunchy-shinies", "Crunchy Shinies", "Any Movement Phase", "Add 3 to this unit's run and charge rolls for the rest of the turn.", "Once Per Battle"),
    ],
  },
  {
    excludesFactionTerrain: true,
    unitFilter: (unit) => unit.keywords?.includes("Troggoth"),
  },
);

const rovingMaw = army(
  "the-roving-maw",
  "The Roving Maw",
  ["Any non-Unique Mawseeker units", "Any non-Unique Gutbusters units", "Gorger Mawpacks"],
  {
    battleTraits: [
      rule("trampling-charge-roving-maw", "Trampling Charge", "Any Charge Phase", "Pick a friendly unit that charged and a visible enemy within 1\". Roll a D3; on a 2+, inflict mortal damage equal to the roll."),
      rule("driven-by-starvation", "Driven by Starvation", "Passive", "Friendly Gorger Mawpacks can Charge even if they Ran unless they are wholly within 3\" of a terrain feature."),
      rule("tasty-morsels", "Tasty Morsels", "Passive", "Gain 1 tasty morsel each time a model is slain by a friendly Mawpit's Hungry Sinkhole."),
      rule("the-realm-hungers", "The Realm Hungers", "Passive", "Units and manifestations are vulnerable to Mawpits unless wholly within 1\" of a non-Mawpit terrain feature. This does not affect Roving Maw units or units with Fly."),
      rule("mawpits-of-ghur", "Mawpits of Ghur", "Start of Battle Round", "Roll 2D6 plus your tasty morsels, apply the table for the battle round, then reset them: 4-5 gives vulnerable units -3 Control; 6-8 inflicts 1 mortal on each on a 3+; 9-11 prevents commands; 12+ inflicts D3 mortal damage on each on a 2+.", "Once Per Battle Round (Army)"),
    ],
    heroicTraits: [
      enhancement("prime-gutserver", "Prime Gutserver", "Start of Battle Round", "If this unit is within 1\" of a friendly Mawpit, gain 1 tasty morsel.", "Once Per Battle Round (Army)"),
    ],
    artefacts: [
      enhancement("flasks-of-congealed-maw-juices", "Flasks of Congealed Maw-juices", "Passive", "Friendly Mawpits within this unit's combat range have Ward (5+)."),
    ],
    spellLores: [{
      id: "roving-maw-spells",
      name: "Roving Maw Spells",
      spells: [
        spell("retcher", "Retcher", 7, "Add 2 to the Rend characteristic of the caster's melee weapons until your next turn."),
        spell("maw-meat", "Maw Meat", 6, "For the rest of the battle, units on or within 1\" of a visible terrain feature within 18\" are vulnerable to Mawpits, except Roving Maw units and units with Fly.", ["Unlimited"]),
      ],
    }],
  },
  {
    excludesFactionTerrain: true,
    unitFilter: (unit) =>
      unit.keywords?.includes("Mawseeker") ||
      unit.keywords?.includes("Gutbusters") ||
      unit.id === "gorger-mawpack",
  },
);

const krazoggsGruntaStampede = army(
  "krazoggs-grunta-stampede",
  "Krazogg's Grunta Stampede",
  ["Tuskboss on Maw-grunta", "Maw-grunta with Hakkin' Krew", "Maw-grunta Gougers", "Gore-gruntas"],
  {
    battleTraits: [
      rule("monstrous-momentum", "Monstrous Momentum", "Passive", "Add the current battle round number to the Move characteristic of friendly Grunta Stampede units."),
      rule("incessant-drive", "Incessant Drive", "End of the First Battle Round", "Add 1 to the momentum scores of friendly Maw-grunta units."),
      rule("eatin-on-da-hoof", "Eatin' on da Hoof", "Any Charge Phase", "Pick a friendly Monster that has not used a Rampage and a visible enemy in combat. Roll a dice and add the Monster's momentum score. If the result exceeds the target's Health, slay 1 model.", "Once Per Turn (Army)", ["Rampage"]),
      rule("grunta-waaagh", "Grunta Waaagh!", "Your Charge Phase", "Pick a friendly Hero. Friendly Grunta Stampede units wholly within 18\" re-roll charges, add 1 Attack to Maw-grunta's Trotters and roll D6 instead of D3 for Gore-grunta Charge mortal damage this turn.", "Once Per Battle (Army)"),
      rule("wall-of-hogflesh", "Wall of Hogflesh", "Deployment Phase", "Pick a friendly Grunta Stampede Hero. For the rest of the battle, subtract 1 from hit rolls for shooting attacks targeting it while it is wholly within 6\" of a friendly non-Hero Grunta Stampede unit.", "Once Per Battle (Army)"),
      rule("fast-and-furious", "Fast and Furious", "Deployment Phase", "Pick a friendly non-Hero Grunta Stampede unit. It can immediately use Normal Move.", "Once Per Battle (Army)"),
    ],
    heroicTraits: [
      enhancement("trophy-hunta", "Trophy Hunta", "Passive", "This unit's Pig-hacka has Anti-Monster (+1 Rend) and Anti-War Machine (+1 Rend)."),
    ],
    artefacts: [
      enhancement("da-boom-skull", "Da Boom Skull", "Reaction: You declared a command", "Pick an enemy in combat with the commanded friendly unit wholly within 18\". Roll a D3; on a 2+, inflict mortal damage equal to the roll.", "Reaction"),
    ],
  },
  {
    unitFilter: (unit) => [
      "tuskboss-on-maw-grunta",
      "maw-grunta-with-hakkin-krew",
      "maw-grunta-gougers",
      "gore-gruntas",
    ].includes(unit.id),
  },
);

const kingBroddsStomp = army(
  "king-brodds-stomp",
  "King Brodd's Stomp",
  ["King Brodd (must be included and must be your general)", "Mega-Gargant units", "Gargant units"],
  {
    battleTraits: [
      rule("world-titans-prophet", "The World Titan's Prophet", "Passive", "While another friendly Brodd's Stomp unit is within King Brodd's combat range, he has Ward (5+). Each successful ward allocates 1 damage to an eligible nearby unit; no ward can be made for it."),
      rule("timberrrrr", "Timberrrrr!", "Passive", "When a friendly Gargant is slain, roll off. The winner picks a point within 3\"; each unit within 3\" with lower Health suffers D3 mortal damage."),
      rule("wrath-of-brodd", "Wrath of Brodd", "Your Charge Phase", "Pick a friendly Mega-Gargant that has not used a Rampage. If it charged, on a 3+ it can move 3D6\" and must end in combat.", "Once Per Battle (Army)", ["Rampage"]),
      rule("smash-it-all-to-bits", "Smash It All to Bits", "Any Shooting Phase", "Pick a friendly Mega-Gargant that has not used a Rampage, a terrain feature in its combat range and an enemy within 18\". Units on the terrain suffer D3 mortal damage on a 2+; then the enemy suffers mortal damage equal to a dice roll on a 3+.", "Once Per Turn (Army)", ["Rampage"]),
      rule("double-stomp", "Double Stomp", "Any Combat Phase", "Pick a friendly Mega-Gargant that has not used a Rampage. Roll a D6; on a 3+, add the result to its Almighty Stomp or Almightier Stomp Attacks this turn.", "Once Per Turn (Army)", ["Rampage"]),
      rule("crafty-creepers", "Crafty Creepers", "Any Combat Phase", "Pick a friendly Mega-Gargant that has not used a Rampage and an enemy Hero in combat with an artefact. On a 3+, that Hero loses the artefact.", "Once Per Turn (Army)", ["Rampage"]),
      rule("watch-this", "Watch This!", "Any Combat Phase", "Pick a friendly Mega-Gargant that has not used a Rampage and an enemy in combat. Roll 6 dice against a Hero, Beast, Monster or War Machine, otherwise one per model. Each result equal to or greater than the target's Save inflicts 1 mortal damage. The Mega-Gargant has Strike-last.", "Once Per Turn (Army)", ["Rampage"]),
    ],
    heroicTraits: [
      enhancement("i-can-do-that-better", "I Can Do That Better", "Reaction: You declared Wrath of Brodd for a friendly unit", "This unit can use Wrath of Brodd immediately after the other unit, even if it already used another Rampage this turn.", "Once Per Battle (Army), Reaction"),
    ],
    artefacts: [
      enhancement("lucky-shiny-hat", "Lucky Shiny Hat", "Passive", "This unit has Ward (4+) against damage inflicted by Spell and Prayer abilities and abilities used by manifestations."),
    ],
    prayerLores: [{
      id: "brodds-stomp-prayers",
      name: "Brodd's Stomp Prayers",
      prayers: [
        prayer("high-expectations", "High Expectations", 4, "Until your next turn, add 1 to the Attacks characteristic of melee weapons used by friendly Brodd's Stomp units wholly within 12\", or add 2 if the chanting roll was 9+."),
      ],
    }],
  },
);

export const armiesOfRenownByFaction = {
  daughters: [croneseersPariahs],
  fyreslayers: [lofnirDrothkeepers],
  kharadron: [grundstokExpeditionaryForce],
  stormcast: [draconithSkywing],
  std: [swordsOfChaos, tribesOfTheSnowPeaks],
  soulblight: [scionsOfNulahmia],
  gloomspite: [truggsTroggherd],
  ogors: [rovingMaw],
  ironjawz: [krazoggsGruntaStampede],
  behemat: [kingBroddsStomp],
};

export default armiesOfRenownByFaction;

const greatGnawhordeRules = {
  battleTraits: [
    { id: "disciples-of-vizzik", name: "Disciples of Vizzik", type: "Passive", description: "While a friendly Vizzik Skour is within the combat range of another friendly Gnawhorde unit, Vizzik has Ward (4+). Each successful ward passes 1 damage point to a friendly Gnawhorde unit in its combat range." },
    { id: "unstoppable-warp-volley", name: "Unstoppable Warp-volley", type: "Once Per Turn (Army)", phase: "Any Shooting Phase", description: "If no Warpshatter Throes ability has been used this turn, pick up to 3 friendly Gnawhorde units. Add 3\" to their ranged weapons for the turn, but those units cannot use commands." },
    { id: "frenzied-momentum", name: "Frenzied Momentum", type: "Once Per Turn (Army)", phase: "Your Movement Phase", description: "If no Warpshatter Throes ability has been used this turn, pick up to 3 friendly Gnawhorde units. Add 2 to their run and charge rolls and subtract 1 from their control scores for the turn." },
    { id: "reckless-abandon", name: "Reckless Abandon", type: "Once Per Turn (Army)", phase: "Any Combat Phase", description: "If no Warpshatter Throes ability has been used this turn, pick up to 3 friendly Gnawhorde units. Add 1 to their melee weapon Attacks, but add 1 to hit rolls for combat attacks that target them." },
  ],
  battleFormations: [],
  heroicTraits: [{ id: "harbinger-of-the-great-ascendancy", name: "Harbinger of the Great Ascendancy", points: 0, source: "Army of Renown", description: "Once per battle, if this unit is not in combat, you can use 2 different Warpshatter Throes abilities this turn instead of 1." }],
  artefacts: [{ id: "icon-of-great-total-supremacy", name: "Icon of Great-total Supremacy", points: 0, source: "Army of Renown", description: "Once per battle, return up to D3 slain models to each friendly Gnawhorde Infantry unit with Health 3 or less." }],
  spellLores: [{ id: "deafening-frenzy-lore", name: "Deafening Frenzy", spells: [{ id: "deafening-frenzy", name: "Deafening Frenzy", castingValue: 7, description: "A friendly Gnawhorde Infantry unit gains Strike-first but cannot use commands until your next turn." }] }],
  prayerLores: [{ id: "reverberating-ritual-lore", name: "Reverberating Ritual", prayers: [{ id: "reverberating-ritual", name: "Reverberating Ritual", chantingValue: 4, description: "A friendly Gnawhorde Infantry unit can pile in an extra 3\"; on an 8+, also add 1 to its control score." }] }],
  manifestationLores: [{ id: "gnawhorde-manifestations", name: "Vermintide", description: "Esta formación puede invocar Vermintide." }],
  terrain: [],
};

const mutatedMenagerieRules = {
  battleTraits: [
    { id: "monstrous-entourage", name: "Monstrous Entourage", type: "Passive", description: "While a friendly Thanquol is within the combat range of another friendly Mutated Menagerie unit, Thanquol has Ward (4+). Each successful ward passes 1 damage point to a friendly Mutated Menagerie unit in his combat range." },
    { id: "more-more-mutation", name: "More-more Mutation!", type: "Once Per Turn (Army)", phase: "Your Hero Phase", description: "Pick a friendly non-Hero Mutated Menagerie unit that has not been picked before. For the battle it gains +2 Health, +2\" Move, +1 Attack on melee weapons and Ward (5+), but suffers D3+2 damage at the end of each turn." },
    { id: "spiteful-swarms", name: "Spiteful Swarms", type: "Once Per Turn (Army)", phase: "Any Combat Phase", description: "Pick an eligible non-Hero Mutated Menagerie Monster. It gains Strike-first, is destroyed at the end of the turn, and can permanently reduce nearby enemies' melee Attacks when destroyed." },
    { id: "rampaging-demise", name: "Rampaging Demise", type: "Once Per Turn (Army)", phase: "Any Combat Phase", description: "Pick an eligible non-Hero Mutated Menagerie Monster. It gains Strike-first and is destroyed at the end of the turn, inflicting possible mortal damage on nearby enemy units before removal." },
  ],
  battleFormations: [],
  heroicTraits: [{ id: "pack-tactics", name: "Pack Tactics", points: 0, source: "Army of Renown", description: "Once per battle, up to 2 friendly non-Hero Mutated Menagerie Monsters can use All-out Attack or All-out Defence even if already used this phase." }],
  artefacts: [{ id: "warpstone-innards", name: "Warpstone Innards", points: 0, source: "Army of Renown", description: "Once per battle, add 1 Attack permanently to a nearby non-Hero Mutated Menagerie Monster; it then suffers D3 damage at the end of each turn." }],
  spellLores: [{ id: "untapped-mutation-lore", name: "Untapped Mutation", spells: [{ id: "untapped-mutation", name: "Untapped Mutation", castingValue: 7, description: "Convert the end-of-turn damage from More-more Mutation! into extra control until your next turn." }] }],
  prayerLores: [],
  manifestationLores: [{ id: "menagerie-manifestations", name: "Warp Lightning Vortex", description: "Esta formación puede invocar Warp Lightning Vortex." }],
  terrain: [],
};

const armiesOfRenown = [
  {
    id: "the-great-grand-gnawhorde",
    name: "The Great-grand Gnawhorde",
    requiredUnits: ["vizzik-skour-prophet-of-the-horned-rat"],
    excludesRegimentsOfRenown: true,
    excludesFactionTerrain: true,
    rules: greatGnawhordeRules,
    roster: [
      "Vizzik Skour, Prophet of the Horned Rat",
      "Non-Unique Masterclan units",
      "Non-Unique Verminus units",
      "Non-Unique Skryre units",
      "Non-Unique Moulder units",
    ],
    description: "La comitiva de Vizzik reúne unidades no únicas de Masterclan, Verminus, Skryre y Moulder bajo las Warpshatter Throes.",
  },
  {
    id: "thanquols-mutated-menagerie",
    name: "Thanquol's Mutated Menagerie",
    requiredUnits: ["thanquol-on-boneripper"],
    excludesRegimentsOfRenown: true,
    excludesFactionTerrain: true,
    rules: mutatedMenagerieRules,
    roster: [
      "Thanquol on Boneripper",
      "Master Moulder",
      "Rat Ogors",
      "Hell Pit Abomination",
      "Brood Terror",
      "Stormfiends",
    ],
    description: "Thanquol dirige una colección restringida de mutantes Moulder y Stormfiends, potenciados con More-more Mutation!.",
  },
];

export default armiesOfRenown;

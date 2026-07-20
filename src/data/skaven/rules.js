export const battleTraits = [
  {
    id: "the-lurking-vermintide",
    name: "The Lurking Vermintide",
    type: "Deployment Phase",
    phase: "Deployment Phase",
    keywords: ["Deploy"],
    description: "Declare: Pick a friendly Skaven unit that has not been deployed.\n\nEffect: Set up that unit in reserve in the tunnels below. It has now been deployed.",
  },
  {
    id: "always-three-clawsteps-ahead",
    name: "Always Three Clawsteps Ahead",
    type: "Once Per Turn (Army)",
    phase: "Enemy Hero Phase",
    keywords: [],
    description: "Declare: Pick a friendly non-Monster Skaven unit that is not in combat and was not set up this turn.\n\nEffect: That unit can use the Normal Move ability as if it were your movement phase.",
  },
  {
    id: "too-quick-to-hit-hit",
    name: "Too Quick to Hit-Hit",
    type: "Passive",
    phase: null,
    keywords: [],
    description: "Effect: No mortal damage is inflicted on friendly Skaven Infantry and Cavalry units by Retreat abilities.",
  },
  {
    id: "splinters-of-the-vermindoom",
    name: "Splinters of the Vermindoom",
    type: "Once Per Battle Round (Army)",
    phase: "Start of Battle Round",
    keywords: [],
    description: "Declare: Use this ability if there are fewer than 3 friendly Gnawholes on the battlefield.\n\nEffect: Set up a Gnawhole more than 9\" from enemies, more than 1\" from friendly units and more than 3\" from objectives and other terrain.",
  },
  {
    id: "gnawhole-ambush",
    name: "Gnawhole Ambush",
    type: "Your Movement Phase",
    phase: "Your Movement Phase",
    keywords: [],
    description: "Declare: Pick a friendly Skaven unit in the tunnels below.\n\nEffect: Set it up wholly within 6\" of a friendly Gnawhole and more than 9\" from all enemy units.",
  },
];

export const battleFormations = [
  {
    id: "warpcog-convocation",
    name: "Warpcog Convocation",
    description: "Skryre Prototypes improves up to 3 Skryre units in your shooting phase, at the risk of a prototype exploding.",
    ability: {
      name: "Skryre Prototypes",
      type: "Once Per Turn (Army)",
      phase: "Your Shooting Phase",
      keywords: [],
      description: "Pick up to 3 friendly Skryre units and roll for each: on a 1, inflict D3 mortal damage; on 2-5, add 1 to wound rolls for shooting attacks; on a 6, also add 1 Rend to ranged weapons for the turn.",
    },
  },
  {
    id: "fleshmeld-menagerie",
    name: "Fleshmeld Menagerie",
    description: "Prized Creations drives up to 3 non-Hero Moulder units into a dangerous battle frenzy.",
    ability: {
      name: "Prized Creations",
      type: "Once Per Turn (Army)",
      phase: "Your Hero Phase",
      keywords: [],
      description: "Pick up to 3 friendly non-Hero Moulder units and roll for each: 1-2 inflicts D3 mortal damage; 3-4 adds 1 Attack to melee weapons; 5-6 also grants Ward (5+) until your next turn.",
    },
  },
  {
    id: "virulent-procession",
    name: "Virulent Procession",
    description: "Corrupted Earth lets Pestilens units pile in at the end of the turn and spread mortal damage.",
    ability: {
      name: "Corrupted Earth",
      type: "Once Per Turn (Army)",
      phase: "End of Any Turn",
      keywords: [],
      description: "Pick up to 3 friendly Pestilens units in combat. Each makes a pile-in move, then rolls a D3 for an enemy in combat; on a 2+, inflict mortal damage equal to the roll.",
    },
  },
  {
    id: "claw-horde",
    name: "Claw-horde",
    description: "Claw-picked increases the Rend of charging Verminus units.",
    ability: {
      name: "Claw-picked",
      type: "Once Per Turn (Army)",
      phase: "Your Combat Phase",
      keywords: [],
      description: "Pick up to 3 friendly Verminus units that charged this turn. Add 1 to the Rend characteristic of their melee weapons for the rest of the turn.",
    },
  },
];

export const heroicTraits = [
  {
    id: "scurry-away",
    name: "Scurry Away",
    source: "Battletome",
    points: 0,
    type: "Any Combat Phase",
    phase: "Any Combat Phase",
    keywords: [],
    description: "Effect: If this unit is in combat, roll a dice. On a 3+, it can immediately use the Retreat ability as if it were your movement phase.",
  },
  {
    id: "short-tempered",
    name: "Short-tempered",
    source: "Battletome",
    points: 0,
    type: "Passive",
    phase: null,
    keywords: [],
    description: "Effect: Add 1 to run rolls and charge rolls for friendly Skaven units while they are wholly within 13\" of this unit.",
  },
  {
    id: "skilled-manipulator",
    name: "Skilled Manipulator",
    source: "Battletome",
    points: 0,
    type: "Passive",
    phase: null,
    keywords: [],
    description: "While this unit is within the combat range of a friendly non-Hero Skaven Infantry unit, it has Ward (4+). Successful wards pass 1 damage point to a nearby eligible friendly unit.",
  },
  {
    id: "masterclan-connections",
    name: "Masterclan Connections",
    source: "Aqshy",
    points: 0,
    type: "Reaction",
    phase: "You declared a Spell or Unbind ability",
    keywords: [],
    description: "Effect: Add D3 to that casting roll or unbinding roll for a visible Skaven unit wholly within 13\" of this unit.",
  },
  {
    id: "master-of-the-swarm",
    name: "Master of the Swarm",
    source: "Aqshy",
    points: 20,
    type: "Passive",
    phase: null,
    keywords: [],
    description: "Each time an ability returns slain models to a friendly Skaven unit wholly within 13\" of this unit, return 1 additional slain model after resolving it.",
  },
  {
    id: "essence-of-the-gnaw",
    name: "Essence of the Gnaw",
    source: "Aqshy",
    points: 20,
    type: "Any Combat Phase",
    phase: "Any Combat Phase",
    keywords: [],
    description: "Declare: Pick another visible friendly Skaven unit wholly within 13\" and in combat.\n\nEffect: For the rest of the turn, this unit has Strike-first and the target has Strike-last.",
  },
];

export const moulderMutations = [
  {
    id: "transplanted-brains",
    name: "Transplanted Brains",
    source: "Aqshy",
    points: 10,
    description: "Any Hero Phase: choose Warpstone Addict's Brain (add 1 to hit rolls for combat attacks and maximum control 1) or Warlock Whelp's Brain (add 10 to this unit's control score) for the rest of the turn.",
  },
  {
    id: "anabolic-accelerators",
    name: "Anabolic Accelerators",
    source: "Aqshy",
    points: 10,
    description: "If this unit was set up this turn, add 1 dice to its charge roll, to a maximum of 3, then remove 1 dice of your choice and use the remaining dice.",
  },
  {
    id: "serrated-bone-protrusions",
    name: "Serrated Bone Protrusions",
    source: "Aqshy",
    points: 10,
    description: "For each unmodified hit roll of 1 for an enemy combat attack that targets this unit, inflict 1 mortal damage on the attacker after its Fight ability is resolved.",
  },
];

export const artefacts = [
  {
    id: "foulhide",
    name: "Foulhide",
    source: "Battletome",
    points: 0,
    type: "End of Any Turn",
    phase: "End of Any Turn",
    keywords: [],
    description: "Effect: Heal (D3) this unit.",
  },
  {
    id: "warpstone-charm",
    name: "Warpstone Charm",
    source: "Battletome",
    points: 0,
    type: "Any Combat Phase",
    phase: "Any Combat Phase",
    keywords: [],
    description: "Pick an enemy unit in combat with this unit. On a 3+, subtract 1 from save rolls for that target for the rest of the turn.",
  },
  {
    id: "skavenbrew",
    name: "Skavenbrew",
    source: "Battletome",
    points: 0,
    type: "Once Per Battle",
    phase: "Any Combat Phase",
    keywords: [],
    description: "Pick a friendly non-Hero Skaven Infantry unit wholly within 13\". Inflict D3 mortal damage on it, then add 1 to the Attacks of its melee weapons for the rest of the turn.",
  },
];

export const spellLores = [
  {
    id: "lore-of-ruin",
    name: "Lore of Ruin",
    description: "Magia ruinosa del Gran Rata Cornuda.",
    spells: [
      { id: "skitterleap", name: "Skitterleap", castingValue: 6, type: "Spell", phase: "Your Hero Phase", keywords: ["Spell", "Unlimited"], description: "Move a visible friendly Skaven Hero wholly within 13\" to a new position more than 9\" from enemies." },
      { id: "wither", name: "Wither", castingValue: 6, type: "Spell", phase: "Your Hero Phase", keywords: ["Spell"], description: "Pick a visible enemy unit within 13\" and inflict D3 mortal damage." },
      { id: "warpgale", name: "Warpgale", castingValue: 7, type: "Spell", phase: "Your Hero Phase", keywords: ["Spell"], description: "Pick a visible enemy unit within 18\". It has Strike-last for the rest of the turn." },
    ],
  },
];

export const prayerLores = [
  {
    id: "noxious-prayers",
    name: "Noxious Prayers",
    description: "Plegarias pestilentes de los Skaven.",
    prayers: [
      { id: "filth-crust", name: "Filth-crust", chantingValue: 4, phase: "Your Hero Phase", description: "Add 1 to wound rolls for a friendly Skaven Infantry unit's combat attacks. On an 8+, its melee weapons also gain Crit (Mortal)." },
      { id: "bile-torrent", name: "Bile-torrent", chantingValue: 4, phase: "Your Hero Phase", description: "Roll one dice per model in an enemy unit within 13\"; each 5+ inflicts 1 mortal damage, or each 4+ on an 8+ chant." },
      { id: "rabid-tough", name: "Rabid-tough", chantingValue: 5, phase: "Your Hero Phase", description: "Subtract 1 from wound rolls for attacks targeting a friendly Skaven Infantry unit; on an 8+, also add 1 to its save rolls." },
    ],
  },
];

export const manifestations = [
  {
    id: "manifestations-of-doom",
    name: "Manifestations of Doom",
    description: "Incluye Vermintide, Warp Lightning Vortex y Bell of Doom.",
    manifestations: ["vermintide", "warp-lightning-vortex", "bell-of-doom"],
  },
];

export const terrain = [
  {
    id: "gnawhole",
    name: "Gnawhole",
    image: "/images/units/skaven/gnawhole.jpg",
    profile: { move: "-", health: 12, control: "-", save: "4+", ward: "6+" },
    universalAbilities: ["Cover", "Impassable"],
    abilities: [
      { name: "Volatile Ground", type: "Passive", phase: null, description: "Models can pass through this terrain but cannot finish a move on it. Enemy units that pass through risk D3 mortal damage." },
      { name: "Tunnels Through Reality", type: "Your Movement Phase", phase: "Your Movement Phase", description: "Move a nearby friendly Skaven unit to another friendly Gnawhole, more than 9\" from enemies." },
      { name: "The Endless Vermintide", type: "Once Per Turn (Army)", phase: "End of Your Turn", description: "Return a destroyed non-Hero Skaven Infantry unit at half strength near a friendly Gnawhole and more than 3\" from enemies." },
    ],
    details: { models: 1, baseSize: null },
    keywords: ["Faction Terrain", "Chaos", "Skaven"],
  },
];

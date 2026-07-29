const weapon = (name, type, attacks, hit, wound, rend, damage, abilities = [], range = null) => ({
  name,
  type,
  ...(range ? { range } : {}),
  attacks,
  hit,
  wound,
  rend,
  damage,
  abilities,
});

const ability = (name, phase, description, type = "Ability", keywords = []) => ({
  name,
  phase,
  type,
  description,
  keywords,
  castingValue: null,
  lore: null,
});

const commonRules = {
  hero: false,
  unique: false,
  monster: false,
  wizard: 0,
  priest: 0,
  ward: null,
  warmaster: false,
  companion: false,
  canBeReinforced: true,
};

function createUnit({
  id,
  name,
  points,
  models = 1,
  move = '6"',
  health = 1,
  control = 1,
  save = "5+",
  ward = null,
  baseSize = null,
  keywords = [],
  weapons = [],
  abilities = [],
  regimentOptions = [],
  canJoinRegimentAs = [],
  notes = null,
  rules = {},
  imageAlias = null,
}) {
  const unitRules = {
    ...commonRules,
    ...rules,
  };

  return {
    id,
    name,
    image: `/images/units/skaven/${imageAlias ?? id}.jpg`,
    ...(imageAlias ? { imageAlias } : {}),
    points,
    profile: { move, health, control, save, ward },
    weapons,
    abilities,
    heroicTrait: null,
    monstrousTrait: null,
    artefact: null,
    moulderMutation: null,
    details: {
      models,
      baseSize,
      regimentOptions,
      canJoinRegimentAs,
      notes,
    },
    keywords: [
      ...keywords,
      "Chaos",
      "Skaven",
    ],
    rules: unitRules,
  };
}

const anySkaven = ["skaven-overclaw", "any-skaven"];

const units = [
  createUnit({
    id: "vizzik-skour-prophet-of-the-horned-rat",
    name: "Vizzik Skour, Prophet of the Horned Rat",
    points: 340,
    move: '10"', health: 15, control: 5, save: "5+", ward: "5+", baseSize: "130mm",
    regimentOptions: anySkaven,
    keywords: ["Warmaster", "Unique", "Hero", "Monster", "Priest (2)", "Ward (5+)", "Daemon", "Masterclan"],
    rules: { hero: true, unique: true, monster: true, priest: 2, ward: "5+", warmaster: true, canBeReinforced: false },
    weapons: [
      weapon("Unholy Gnawstaff", "Melee", 6, "4+", "2+", "1", "D6", ["Crit (Mortal)"]),
      weapon("Host of Vermin", "Melee", 10, "5+", "5+", "0", "1", ["Crit (Auto-wound)", "Companion"]),
    ],
    abilities: [
      ability("The Death Frenzy", "Any Hero Phase", "Chant on 8: weaken an enemy's melee attacks or allow a friendly Skaven Infantry unit to fight twice, gaining Strike-last after its first Fight ability.", "Prayer", ["Prayer"]),
      ability("Gaze of the Gnaw", "Any Combat Phase", "Pick an enemy in combat. On a 2+, it must direct its attacks at Vizzik while in combat with him and subtracts 1 from hit and wound rolls against him.", "Once Per Turn (Army)", ["Rampage"]),
      ability("Fissures in Reality", "Any Combat Phase", "Roll a D3 for each enemy in combat; on a 2+, inflict mortal damage equal to the roll."),
      ability("Prophet of the Horned Rat", "Your Hero Phase", "Once per battle, re-roll chanting rolls for this unit until your next turn."),
    ],
  }),
  createUnit({
    id: "thanquol-on-boneripper",
    name: "Thanquol on Boneripper",
    points: 310,
    move: '8"', health: 14, control: 5, save: "4+", ward: "5+", baseSize: "105 × 70mm",
    regimentOptions: anySkaven,
    keywords: ["Warmaster", "Unique", "Hero", "Monster", "Wizard (2)", "Ward (5+)", "Masterclan"],
    rules: { hero: true, unique: true, monster: true, wizard: 2, ward: "5+", warmaster: true, canBeReinforced: false },
    weapons: [
      weapon("Custom Warpfire Projectors", "Ranged", 6, "2+", "3+", "2", "1", ["Companion"], '10"'),
      weapon("Staff of the Horned Rat", "Melee", 4, "4+", "4+", "1", "D3"),
      weapon("Warpfire Braziers", "Melee", 6, "4+", "2+", "2", "3", ["Companion"]),
    ],
    abilities: [
      ability("Battle Damaged", null, "While this unit has 10 or more damage points, Warpfire Braziers has 4 Attacks.", "Passive"),
      ability("Staff of the Horned Rat", null, "Add 1 to casting rolls for this unit.", "Passive"),
      ability("Terrible Madness", "Your Hero Phase", "Spell: an enemy within 13\" cannot use commands until your next turn; roll one dice per model and inflict a mortal damage for each 6.", "Spell", ["Spell"]),
      ability("Boneripper Rampage", "Any Combat Phase", "On a 3-5 inflict D3 mortal damage on an enemy in combat; on a 6 inflict 2D3.", "Once Per Turn (Army)", ["Rampage"]),
      ability("Warp-amulet", "End of Any Turn", "Heal (D3) this unit."),
    ],
  }),
  createUnit({
    id: "lord-skreech-verminking",
    name: "Lord Skreech Verminking",
    points: 380,
    move: '10"', health: 13, control: 5, save: "4+", ward: "5+", baseSize: "120 × 92mm",
    regimentOptions: anySkaven,
    keywords: ["Warmaster", "Unique", "Hero", "Monster", "Wizard (2)", "Ward (5+)", "Daemon", "Masterclan", "Verminus", "Pestilens", "Eshin", "Skryre", "Moulder"],
    rules: { hero: true, unique: true, monster: true, wizard: 2, ward: "5+", warmaster: true, canBeReinforced: false },
    weapons: [weapon("Glaive of the Rat King", "Melee", 7, "3+", "2+", "2", "3", ["Crit (2 Hits)"])],
    abilities: [
      ability("The Thirteen-headed One", "Your Hero Phase", "Choose a different clan boon each battle round: improve Masterclan casting, Verminus charges, Skryre shooting, Eshin Rend, Pestilens chanting or heal Moulder units."),
      ability("The Dreaded Thirteenth Spell", "Your Hero Phase", "Spell: roll 13 dice against an enemy within 13\". Each 5+ inflicts 1 mortal damage and can return a Clanrat model.", "Spell", ["Spell"]),
      ability("Terrifying Monstrosity", "Any Combat Phase", "On a 3+, an enemy Infantry unit cannot use commands and loses control equal to the roll.", "Once Per Turn (Army)", ["Rampage"]),
    ],
  }),
  ...[
    ["verminlord-deceiver", "Verminlord Deceiver", 390, "Eshin", "Warpstiletto", "Burst from the Shadows"],
    ["verminlord-warbringer", "Verminlord Warbringer", 260, "Verminus", "Doom Glaive and Spike-fist", "Tyrant of Battle"],
    ["verminlord-corruptor", "Verminlord Corruptor", 260, "Pestilens", "Plaguereapers", "Lord of Great Plagues"],
    ["verminlord-warpseer", "Verminlord Warpseer", 300, "Masterclan", "Doom Glaive", "Divine the Future"],
  ].map(([id, name, points, clan, weaponName, signature]) => createUnit({
    id, name, points,
    imageAlias: id === "verminlord-deceiver" ? null : "verminlord-deceiver",
    move: '10"', health: 13, control: 5, save: "4+", ward: "5+", baseSize: "120 × 92mm",
    regimentOptions: anySkaven,
    keywords: ["Hero", "Monster", clan === "Pestilens" ? "Priest (1)" : clan === "Masterclan" ? "Wizard (2)" : "Wizard (1)", "Ward (5+)", "Daemon", clan],
    rules: { hero: true, monster: true, wizard: clan === "Pestilens" ? 0 : clan === "Masterclan" ? 2 : 1, priest: clan === "Pestilens" ? 1 : 0, ward: "5+", canBeReinforced: false },
    weapons: [
      ...(clan === "Eshin"
        ? [weapon("Doomstar", "Ranged", 6, "3+", "3+", "1", "2", ["Crit (Auto-wound)"], '13"')]
        : []),
      weapon(
        weaponName,
        "Melee",
        clan === "Eshin" || clan === "Pestilens" ? 8 : clan === "Verminus" ? 7 : 6,
        clan === "Masterclan" ? "4+" : "3+",
        "2+",
        clan === "Eshin" ? "3" : "2",
        clan === "Verminus" || clan === "Masterclan" ? "3" : "2",
        clan === "Eshin" || clan === "Verminus" ? ["Crit (Mortal)"] : clan === "Pestilens" ? ["Crit (Auto-wound)"] : [],
      ),
    ],
    abilities: [
      ability(signature, clan === "Masterclan" ? null : clan === "Pestilens" ? "Your Hero Phase" : "Any Combat Phase", clan === "Eshin"
        ? "Reposition through the shadows into combat with another enemy on a 4+."
        : clan === "Verminus"
          ? "Two nearby Verminus Infantry units can use All-out Attack or All-out Defence even if already used this phase."
          : clan === "Pestilens"
            ? "Manifest a Great Plague after an unmodified chanting roll of 6."
            : "Add 2\" to moves made with Always Three Clawsteps Ahead while this unit is on the battlefield.",
        clan === "Masterclan" ? "Passive" : "Once Per Turn (Army)",
        clan === "Eshin" || clan === "Verminus" ? ["Rampage"] : [],
      ),
      ...(clan === "Eshin"
        ? [ability("Lord of Assassins", "Reaction: You declared Redeploy for a friendly Eshin Infantry unit wholly within 13\"", "If the Redeploy roll is 1-3, use a value of 4 instead.", "Reaction")]
        : clan === "Verminus"
          ? [ability("Killing Blow", "End of Any Turn", "Pick a damaged enemy in combat. If a dice roll is lower than its allocated damage, inflict mortal damage equal to the roll.", "Once Per Turn (Army)")]
          : clan === "Pestilens"
            ? [ability("Plaguemaster", "Any Combat Phase", "Pick up to 3 enemies in combat. Roll a D3 for each; on a 2+, inflict that much mortal damage and give this unit 1 ritual point.", "Once Per Turn (Army)", ["Rampage"])]
            : [
                ability("Arch-manipulator", "Any Combat Phase", "On a 4+, an enemy in combat has Strike-last for the rest of the turn.", "Once Per Turn (Army)", ["Rampage"]),
                ability("Hurl Scry-orb", "Any Combat Phase", "Once per battle, disable Divine the Future and on a 2+ inflict mortal damage equal to the roll on an enemy in combat.", "Once Per Battle"),
                ability("Tectonic Splintering", "Your Hero Phase", "Spell: subtract 1 from the number of dice rolled for charge rolls made by a visible enemy within 18\" until your next turn.", "Spell", ["Spell"]),
              ]),
    ],
  })),
  createUnit({
    id: "grey-seer", name: "Grey Seer", points: 110,
    imageAlias: "grey-seer-on-screaming-bell",
    move: '6"', health: 5, control: 2, save: "6+", baseSize: "32mm",
    regimentOptions: anySkaven,
    keywords: ["Hero", "Wizard (1)", "Infantry", "Masterclan"],
    rules: { hero: true, wizard: 1, canBeReinforced: false },
    weapons: [weapon("Warpstone Staff", "Melee", 3, "4+", "4+", "1", "D3")],
    abilities: [ability("Warpstone Shards", "Your Hero Phase", "The next casting roll uses 3D6. A total of 13 is unbindable but inflicts D3 mortal damage; otherwise remove one die and use the remaining 2D6.")],
  }),
  createUnit({
    id: "grey-seer-on-screaming-bell", name: "Grey Seer on Screaming Bell", points: 310,
    move: '6"', health: 15, control: 5, save: "4+", ward: "5+", baseSize: "120 × 92mm",
    regimentOptions: anySkaven,
    keywords: ["Hero", "War Machine", "Wizard (2)", "Ward (5+)", "Masterclan"],
    rules: { hero: true, wizard: 2, ward: "5+", canBeReinforced: false },
    weapons: [
      weapon("Warpstone Staff", "Melee", 3, "4+", "4+", "1", "D3"),
      weapon("Rat Ogor's Tearing Claws", "Melee", 5, "4+", "3+", "1", "2", ["Companion"]),
      weapon("Crushing Bulk", "Melee", 6, "4+", "2+", "1", "2", ["Companion"]),
    ],
    abilities: [
      ability("Battle Damaged", null, "While this unit has 10 or more damage points, Crushing Bulk has 4 Attacks.", "Passive"),
      ability("Altar of the Horned Rat", null, "Friendly Skaven Infantry units have Ward (6+) while wholly within 13\".", "Passive"),
      ability("Peal of Doom", "Your Hero Phase", "Roll for magical backlash, a wall of unholy sound or apocalyptic mortal damage."),
      ability("Cracks Call", "Your Hero Phase", "Spell: if the casting roll exceeds an enemy's Move, inflict mortal damage equal to the difference.", "Spell", ["Spell"]),
    ],
  }),
  createUnit({
    id: "krittok-foulblade", name: "Krittok Foulblade", points: 140,
    move: '6"', health: 6, control: 2, save: "4+", baseSize: "40mm",
    regimentOptions: anySkaven,
    keywords: ["Warmaster", "Unique", "Hero", "Infantry", "Verminus"],
    rules: { hero: true, unique: true, warmaster: true, canBeReinforced: false },
    weapons: [weapon("Warplock Pistol", "Ranged", 2, "3+", "3+", "2", "D3", ["Crit (Auto-wound)"], '10"'), weapon("Doomfang", "Melee", 5, "3+", "3+", "2", "2", ["Crit (Mortal)"])],
    abilities: [
      ability("Doomfang", "Any Combat Phase", "This unit gains Strike-first but cannot use commands this phase."),
      ability("A Reputation for Cunning", "Enemy Hero Phase", "Pick two units for Always Three Clawsteps Ahead instead of one; at least one must be Verminus."),
      ability("Foster Competition", null, "Add 1 to wound rolls for friendly Stormvermin wholly within 13\".", "Passive"),
    ],
  }),
  ...[
    {
      id: "arch-warlock", name: "Arch-Warlock", points: 140, clan: "Skryre", options: ["clanrats", "any-skryre"],
      move: '5"', health: 6, save: "4+", base: "32mm", wizard: 1,
      weapons: [
        weapon("Warpfire Gauntlet", "Ranged", 3, "4+", "2+", "2", "1", ["Shoot in Combat"], '10"'),
        weapon("Stormcage Halberd", "Melee", 3, "3+", "4+", "1", "2"),
        weapon("Crushing Piston-claw", "Melee", 2, "4+", "2+", "2", "2"),
      ],
      abilities: [ability("Overseers of the Enginecovens", null, "Friendly Skryre units wholly within 13\" can use Covering Fire without spending a command point.", "Passive")],
    },
    {
      id: "warlock-galvaneer", name: "Warlock Galvaneer", points: 120, clan: "Skryre", options: ["clanrats", "any-skryre"],
      move: '6"', health: 5, save: "5+", base: "32mm",
      weapons: [
        weapon("Warpvolt Obliterator", "Ranged", 2, "3+", "3+", "2", "D3", ["Anti-Cavalry (+1 Rend)", "Crit (2 Hits)"], '18"'),
        weapon("Rusted Blade", "Melee", 3, "4+", "5+", "0", "1"),
      ],
      abilities: [
        ability("Lightning Master", "Your Shooting Phase", "Once per battle, on a 2+, set a nearby Warpvolt Scourgers unit's Attacks to 10 for the rest of the turn.", "Once Per Battle (Army)"),
        ability("More-more Warpvolt Doom!", "Any Shooting Phase", "After this unit damages an enemy, roll a D3 for each other enemy in that target's combat range; on a 2+, inflict mortal damage equal to the roll."),
      ],
    },
    {
      id: "warlock-bombardier", name: "Warlock Bombardier", points: 90, clan: "Skryre", options: ["clanrats", "any-skryre"],
      move: '6"', health: 5, save: "5+", base: "32mm",
      weapons: [
        weapon("Doomrocket", "Ranged", 2, "4+", "3+", "1", "D6", ["Anti-Infantry (+1 Rend)"], '18"'),
        weapon("Firing Pole", "Melee", 3, "4+", "4+", "0", "1"),
      ],
      abilities: [
        ability("Explosive Payload", null, "Add 1 to hit rolls for this unit's shooting attacks against units with 10 or more models.", "Passive"),
        ability("More-more Doom!", "Reaction: You declared a Shoot ability for this stationary unit", "On a 2+, Doomrocket Damage becomes D3+3 for the turn; on a 1, this unit suffers D3 mortal damage.", "Reaction"),
      ],
    },
    {
      id: "warlock-engineer", name: "Warlock Engineer", points: 100, clan: "Skryre", options: ["clanrats", "any-skryre"],
      move: '6"', health: 5, save: "5+", base: "32mm",
      weapons: [
        weapon("Warplock Musket", "Ranged", 2, "3+", "3+", "2", "D3", ["Crit (Auto-wound)"], '24"'),
        weapon("Warpforged Dagger", "Melee", 3, "4+", "4+", "0", "1"),
      ],
      abilities: [
        ability("Sniper-master", "Your Shooting Phase", "This unit and friendly Warplock Jezzails wholly within 13\" can ignore Guarded Hero when selecting shooting targets.", "Once Per Turn (Army)"),
        ability("More-more Warp Energy!", "Reaction: You declared a Shoot ability for this stationary unit", "On a 2+, Warplock Musket Damage becomes 3 for the turn; on a 1, this unit suffers D3 mortal damage.", "Reaction"),
      ],
    },
    {
      id: "master-moulder", name: "Master Moulder", points: 80, clan: "Moulder", options: ["clanrats", "any-moulder"],
      move: '6"', health: 5, save: "6+", base: "32mm",
      weapons: [
        weapon("Warpsyringe Pistol", "Ranged", "D6", "4+", "2+", "2", "1", ["Shoot in Combat"], '10"'),
        weapon("Arsenal of Mutation", "Melee", 4, "3+", "4+", "1", "1", ["Crit (2 Hits)"]),
      ],
      abilities: [
        ability("Lord of Flesh-grafting", "End of Any Turn", "Heal (3) another friendly Moulder unit wholly within 13\"."),
        ability("Tyrannical Packmaster", "Your Charge Phase", "Add 1 to charge rolls for another friendly Moulder unit in this unit's combat range for the rest of the turn."),
      ],
    },
    {
      id: "clawlord", name: "Clawlord", points: 70, clan: "Verminus", options: ["any-verminus"],
      move: '6"', health: 5, save: "4+", base: "32mm",
      weapons: [weapon("Warpforged Blade", "Melee", 6, "3+", "4+", "1", "2")],
      abilities: [
        ability("Cornered Rat", null, "While this unit is damaged, add 3 to the Attacks characteristic of its Warpforged Blade.", "Passive"),
        ability("Gnash-gnaw on Their Bones!", "Reaction: You declared a Fight ability for this unit", "A nearby non-Hero Verminus Infantry unit can fight immediately afterwards. If picked, add 1 to hit rolls for its attacks for the rest of the turn.", "Reaction"),
      ],
    },
    {
      id: "clawlord-on-gnaw-beast", name: "Clawlord on Gnaw-beast", points: 110, clan: "Verminus", options: ["any-verminus"],
      move: '9"', health: 7, save: "4+", base: "75 × 42mm", cavalry: true,
      weapons: [
        weapon("Ratling Pistol", "Ranged", "D6", "3+", "3+", "1", "1", ["Crit (Auto-wound)", "Shoot in Combat"], '10"'),
        weapon("Warpforged Halberd", "Melee", 5, "3+", "4+", "1", "2"),
        weapon("Gnaw-beast's Chisel Fangs", "Melee", 4, "4+", "3+", "1", "D3", ["Companion"]),
      ],
      abilities: [
        ability("Cornered Rat", null, "While this unit is damaged, add 3 to the Attacks characteristic of its Warpforged Halberd.", "Passive"),
        ability("Cruel Commander", "Your Hero Phase", "Inflict 1 mortal damage on a friendly non-Hero Verminus Infantry unit wholly within 13\", then add 5 to its control score until your next turn."),
      ],
    },
    {
      id: "deathmaster", name: "Deathmaster", points: 120, clan: "Eshin", options: ["clanrats", "any-eshin"],
      move: '7"', health: 5, save: "5+", ward: "6+", base: "32mm",
      weapons: [
        weapon("Eshin Throwing Stars", "Ranged", 3, "3+", "4+", "0", "D3", ["Crit (Auto-wound)", "Shoot in Combat"], '10"'),
        weapon("Weeping Blade", "Melee", 5, "3+", "4+", "1", "D3", ["Anti-Hero (+1 Rend)", "Crit (Mortal)"]),
      ],
      abilities: [
        ability("Shadowy Killers", null, "Unmodified hit rolls of 1-4 that target this unit fail.", "Passive"),
        ability("Running Death", null, "Friendly Eshin units wholly within 13\" can Shoot and/or Charge even if they used a Run ability in the same turn.", "Passive"),
      ],
    },
  ].map((entry) => createUnit({
    id: entry.id, name: entry.name, points: entry.points,
    imageAlias: entry.imageAlias ?? null,
    move: entry.move, health: entry.health, control: 2, save: entry.save, baseSize: entry.base,
    regimentOptions: entry.options,
    canJoinRegimentAs: ["clawlord", "clawlord-on-gnaw-beast", "deathmaster", "master-moulder", "warlock-bombardier", "warlock-engineer", "warlock-galvaneer"].includes(entry.id) ? ["skaven-overclaw"] : [],
    ward: entry.id === "deathmaster" ? "6+" : null,
    keywords: ["Hero", entry.cavalry ? "Cavalry" : "Infantry", entry.wizard ? `Wizard (${entry.wizard})` : null, entry.id === "deathmaster" ? "Ward (6+)" : null, entry.clan].filter(Boolean),
    rules: { hero: true, wizard: entry.wizard ?? 0, ward: entry.id === "deathmaster" ? "6+" : null, canBeReinforced: false },
    weapons: entry.weapons,
    abilities: entry.abilities,
  })),
  createUnit({
    id: "plague-priest-on-plague-furnace", name: "Plague Priest on Plague Furnace", points: 350,
    move: '6"', health: 15, control: 5, save: "4+", ward: "5+", baseSize: "120 × 92mm",
    regimentOptions: ["clanrats", "any-pestilens"],
    keywords: ["Hero", "Priest (1)", "War Machine", "Ward (5+)", "Pestilens"],
    rules: { hero: true, priest: 1, ward: "5+", canBeReinforced: false },
    weapons: [
      weapon("Great Plague Censer", "Melee", 4, "4+", "2+", "2", "3", ["Crit (Auto-wound)"]),
      weapon("Warpstone-tipped Staff", "Melee", 3, "4+", "4+", "1", "D3", ["Crit (Auto-wound)"]),
      weapon("Foetid Blades", "Melee", 6, "4+", "5+", "0", "1", ["Crit (Auto-wound)"]),
      weapon("Crushing Bulk", "Melee", 6, "4+", "2+", "1", "2", ["Companion"]),
    ],
    abilities: [
      ability("Battle Damaged", null, "While this unit has 10 or more damage points, Great Plague Censer has 2 Attacks.", "Passive"),
      ability("Altar of the Great Corruptor", null, "Friendly Pestilens units have Ward (6+) while wholly within 13\".", "Passive"),
      ability("Corrupting Influence", null, "Subtract 1 from Ward rolls for enemy units within 13\".", "Passive"),
    ],
  }),
  createUnit({
    id: "deathmaster-crixxit", name: "Deathmaster Crixxit", points: 150,
    move: '7"', health: 6, control: 2, save: "5+", ward: "5+", baseSize: "40mm",
    regimentOptions: ["any-eshin"], canJoinRegimentAs: ["skaven-overclaw"],
    keywords: ["Unique", "Hero", "Infantry", "Ward (5+)", "Eshin"],
    rules: { hero: true, unique: true, ward: "5+", canBeReinforced: false },
    weapons: [weapon("The Blades of Thirteen Cuts", "Melee", 13, "2+", "4+", "1", "1", ["Anti-Hero (+1 Rend)", "Crit (Mortal)"])],
    abilities: [
      ability("Master of Assassins", null, "Double the Damage characteristic of this unit's melee weapons for attacks that target an enemy Hero.", "Passive"),
      ability("Diversionary Assault", "Your Charge Phase", "Pick a visible friendly Gutter Runners unit wholly within 13\". Add 2 to its charge rolls for the rest of the turn."),
      ability("Shadowblood Cloak", "Any Combat Phase", "Pick a visible friendly Eshin unit with 2 or more models wholly within 18\". On a 3+, set this unit up wholly within 6\" of that unit; it can be set up in combat."),
    ],
    notes: "Profile from the Battletome Supplement: Skaven Eshin.",
  }),
  ...[
    { id: "stormfiends", name: "Stormfiends", points: 230, models: 3, move: '6"', health: 6, control: 2, save: "4+", base: "60mm", clans: ["Skryre", "Moulder", "Infantry"], weapons: [weapon("Ratling Cannons", "Ranged", "3D6", "4+", "3+", "1", "1", [], '15"'), weapon("Windlaunchers", "Ranged", 3, "4+", "3+", "2", "D3", [], '15"'), weapon("Warpfire Projectors", "Ranged", "2D6", "2+", "4+", "2", "1", ["Shoot in Combat"], '10"'), weapon("Doomflayer Gauntlets", "Melee", 5, "4+", "2+", "2", "D3", ["Charge (+1 Damage)"]), weapon("Grinderfists", "Melee", 4, "4+", "2+", "2", "2"), weapon("Shock Gauntlets", "Melee", 4, "4+", "2+", "1", "2"), weapon("Clubbing Blows", "Melee", 3, "4+", "2+", "1", "2")], abilityName: "Grinderfist Tunnellers", abilityPhase: "Any Movement Phase", abilityType: "Once Per Turn (Army)", abilityText: "If armed with Grinderfists and in the tunnels below, set this unit up more than 9\" from enemies.", extraAbilities: [ability("Shock Gauntlets", null, "Critical hits made with Shock Gauntlets score D6 hits instead of 1.", "Passive")] },
    { id: "acolyte-globadiers", name: "Acolyte Globadiers", points: 90, models: 5, move: '6"', health: 1, control: 1, save: "6+", base: "28.5mm", clans: ["Skryre", "Infantry", "Weapon Team", "Champion"], weapons: [weapon("Poisoned Wind Globes", "Ranged", 1, "3+", "3+", "1", "D3", ["Anti-Infantry (+1 Rend)", "Shoot in Combat"], '10"'), weapon("Rusty Knife", "Melee", 1, "4+", "5+", "0", "1")], abilityName: "Gas Clouds", abilityPhase: null, abilityType: "Passive", abilityText: "Add 1 Damage against enemy units with 10 or more models.", extraAbilities: [ability("Hidden Weapon Team", null, "Not visible beyond 13\" while sheltered by a Clanrats unit with 5 or more models and no other Weapon Team shares that combat range.", "Passive")] },
    { id: "doom-flayers", name: "Doom-Flayers", points: 100, models: 2, move: '2D6+3"', health: 4, control: 1, save: "4+", base: "50mm", clans: ["Skryre", "War Machine"], weapons: [weapon("Whirling Blades", "Melee", "2D6", "3+", "3+", "1", "1", ["Anti-Infantry (+1 Rend)", "Charge (+1 Damage)"])], abilityName: "Whirling Doom", abilityPhase: "Any Charge Phase", abilityText: "After charging, on a 2+ inflict mortal damage equal to a D3 roll on an enemy within 1\"." },
    { id: "doomwheel", name: "Doomwheel", points: 100, models: 1, move: '2D6+7"', health: 8, control: 1, save: "4+", base: "105 × 70mm", clans: ["Skryre", "War Machine"], weapons: [weapon("Warp Bolts", "Ranged", "D6", "3+", "3+", "1", "D3", ["Shoot in Combat"], '13"'), weapon("Grinding Wheels", "Melee", 6, "4+", "3+", "0", "1", ["Charge (+1 Damage)"])], abilityName: "Rolling Doom", abilityPhase: "Your Movement Phase", abilityText: "Move through models and enemy combat ranges, then roll for mortal damage against up to 3 crossed enemy units." },
    { id: "ratling-guns", name: "Ratling Guns", points: 170, models: 3, move: '6"', health: 3, control: 1, save: "6+", base: "60 × 35mm", clans: ["Skryre", "Infantry", "Weapon Team"], weapons: [weapon("Ratling Guns", "Ranged", "3D6", "4+", "4+", "1", "1", ["Crit (2 Hits)"], '15"'), weapon("Rusty Knives", "Melee", 2, "4+", "5+", "0", "1")], abilityName: "Hidden Weapon Team", abilityText: "Not visible beyond 13\" while sheltered by a Clanrats unit with 5 or more models and no other Weapon Team shares that combat range.", imageAlias: "ratling-gun" },
    { id: "ratling-warpblaster", name: "Ratling Warpblaster", points: 110, models: 1, move: '6"', health: 8, control: 2, save: "3+", base: "105 × 70mm", clans: ["Skryre", "War Machine"], weapons: [weapon("Hail of Warpstone Bullets", "Ranged", "3D6+3", "4+", "3+", "1", "1", ["Crit (Auto-wound)"], '20"'), weapon("Thrall-rats' Claws", "Melee", 4, "4+", "5+", "0", "1")], abilityName: "More-more Warpstone Bullets!", abilityPhase: "Your Shooting Phase", abilityType: "Once Per Turn (Army)", abilityText: "Near a Skryre Hero, use 6D6+3 Attacks; each unmodified hit roll of 1 inflicts 1 mortal damage on this unit.", extraAbilities: [ability("Overwhelming Fire", null, "Add 1 to hit rolls for this unit's shooting attacks against units with 10 or more models.", "Passive")] },
    { id: "warp-grinder", name: "Warp-Grinder", points: 100, models: 1, move: '5"', health: 8, control: 2, save: "4+", base: "90 × 52mm", clans: ["Skryre", "War Machine"], weapons: [weapon("Warpstone Drill-fang", "Melee", "D3", "4+", "2+", "3", "5"), weapon("Crew's Teeth and Knives", "Melee", "D6", "4+", "5+", "0", "1")], abilityName: "Tunnel Skulkers", abilityPhase: "Deployment Phase", abilityType: "Once Per Battle (Army)", abilityText: "Deploy this unit and one non-Monster Skaven unit in the tunnels below.", extraAbilities: [ability("Warp-ambush", "Your Movement Phase", "Declare: You can only use this ability if this unit is in the tunnels below.\n\nEffect: Roll a dice and pick one effect. On a 4+, pick an enemy more than 6\" from all other enemy units and set up this unit in combat with it and no other enemies; a friendly unit placed in the tunnels with Tunnel Skulkers can then be set up wholly within 6\" of this unit, in combat with that enemy and no others. Alternatively, set up this unit more than 9\" from all enemies, then set up that friendly unit wholly within 6\" of this unit and more than 9\" from all enemies.", "Ability")] },
    { id: "warp-lightning-cannon", name: "Warp Lightning Cannon", points: 120, models: 1, move: '3"', health: 8, control: 2, save: "6+", base: "120 × 92mm", clans: ["Skryre", "War Machine"], weapons: [weapon("Warp Lightning Blast", "Ranged", "2D6", "4+", "-", "-", "1 mortal", [], '20"'), weapon("Crew's Teeth and Knives", "Melee", "D6", "4+", "5+", "0", "1")], abilityName: "More-more Warp Lightning!", abilityPhase: "Your Shooting Phase", abilityType: "Once Per Turn (Army)", abilityText: "Near a Skryre Hero, add 6 Attacks; unmodified hit rolls of 1 inflict D3 mortal damage on the cannon." },
    { id: "warpfire-throwers", name: "Warpfire Throwers", points: 120, models: 3, move: '6"', health: 3, control: 1, save: "6+", base: "60 × 35mm", clans: ["Skryre", "Infantry", "Weapon Team"], weapons: [weapon("Warpfire Throwers", "Ranged", "2D6", "2+", "4+", "2", "1", ["Shoot in Combat"], '10"'), weapon("Rusty Knives", "Melee", 2, "4+", "5+", "0", "1")], abilityName: "Hidden Weapon Team", abilityText: "Not visible beyond 13\" while sheltered by a Clanrats unit with 5 or more models and no other Weapon Team shares that combat range.", imageAlias: "warp-fire-throwers" },
    { id: "warplock-jezzails", name: "Warplock Jezzails", points: 120, models: 3, move: '6"', health: 2, control: 1, save: "4+", base: "60 × 35mm", clans: ["Skryre", "Infantry", "Champion"], weapons: [weapon("Warplock Jezzails", "Ranged", 2, "4+", "3+", "2", "2", ["Crit (Auto-wound)"], '18"'), weapon("Rusty Knives", "Melee", 2, "4+", "5+", "0", "1")], abilityName: "Warpstone Snipers", abilityPhase: "Your Shooting Phase", abilityText: "If stationary and not set up this turn, add 6\" to the weapon's Range." },
    { id: "warpvolt-scourgers", name: "Warpvolt Scourgers", points: 170, models: 3, move: '6"', health: 3, control: 1, save: "6+", base: "60 × 35mm", clans: ["Skryre", "Infantry", "Weapon Team"], weapons: [weapon("Warpvolt Scourgers", "Ranged", "2D6", "2+", "4+", "1", "1", ["Anti-Cavalry (+1 Rend)", "Crit (2 Hits)"], '15"'), weapon("Rusty Knives", "Melee", 2, "4+", "5+", "0", "1")], abilityName: "Hidden Weapon Team", abilityText: "Not visible beyond 13\" while sheltered by a Clanrats unit with 5 or more models and no other Weapon Team shares that combat range." },
    { id: "clanrats", name: "Clanrats", points: 150, models: 20, move: '6"', health: 1, control: 1, save: "5+", base: "25mm", clans: ["Verminus", "Infantry", "Champion", "Musician (1/20)", "Standard Bearer (1/20)"], weapons: [weapon("Rusty Weapons", "Melee", 2, "4+", "5+", "0", "1", ["Crit (Auto-wound)"])], abilityName: "Seething Swarm", abilityPhase: "End of Any Turn", abilityText: "Return D3 slain models to this unit." },
    { id: "stormvermin", name: "Stormvermin", points: 110, models: 10, move: '6"', health: 1, control: 1, save: "4+", base: "28.5mm", clans: ["Verminus", "Infantry", "Champion", "Musician (1/10)", "Standard Bearer (1/10)"], weapons: [weapon("Stormvermin Weapons", "Melee", 3, "3+", "4+", "1", "1", ["Anti-Charge (+1 Rend)"])], abilityName: "Elite Bodyguard", abilityText: "Friendly Skaven Infantry Heroes have Ward (5+) while within this unit's combat range." },
    { id: "plaguepack", name: "Plaguepack", points: 130, models: 5, move: '6"', health: 2, control: 1, save: "6+", base: "Mixed", clans: ["Priest (1)", "Pestilens", "Infantry", "Champion (1/5)"], weapons: [weapon("Weapons of Corruption", "Melee", 2, "4+", "5+", "0", "1", ["Crit (Auto-wound)"]), weapon("Plague Censer", "Melee", 4, "4+", "3+", "1", "2", ["Crit (Auto-wound)"])], abilityName: "Enshrouding Fumes", abilityPhase: null, abilityType: "Passive", abilityText: "Subtract 1 from hit rolls for shooting attacks that target this unit.", extraAbilities: [ability("Plague Rat", null, "If this unit makes an unmodified chanting roll of 1, remove its Plague Rat token to re-roll that chanting roll.", "Passive")], reinforce: false },
    { id: "plagueclaw", name: "Plagueclaw", points: 100, models: 1, move: '3"', health: 8, control: 2, save: "4+", base: "120 × 92mm", clans: ["Pestilens", "War Machine"], weapons: [weapon("Plagueclaw Catapult", "Ranged", 2, "3+", "2+", "1", "D6", ["Anti-Infantry (+1 Rend)"], '24"'), weapon("Crew's Teeth and Knives", "Melee", "D6", "4+", "5+", "0", "1")], abilityName: "Bubonic Barrage", abilityPhase: null, abilityType: "Passive", abilityText: "After shooting one enemy, it can gain Strike-last depending on how many models the catapult slew." },
    { id: "plague-monks", name: "Plague Monks", points: 140, models: 20, move: '6"', health: 1, control: 1, save: "6+", base: "25mm", clans: ["Pestilens", "Infantry", "Champion", "Musician (1/20)", "Standard Bearer (1/20)"], weapons: [weapon("Foetid Weapons", "Melee", 2, "4+", "5+", "0", "1", ["Crit (Auto-wound)"])], abilityName: "Spreaders of Filth and Disease", abilityPhase: null, abilityType: "Passive", abilityText: "Each model slain in combat inflicts 1 mortal damage back on a 6+." },
    { id: "rat-ogors", name: "Rat Ogors", points: 140, models: 3, move: '6"', health: 4, control: 1, save: "5+", base: "50mm", clans: ["Moulder", "Infantry"], weapons: [weapon("Warpfire Gun", "Ranged", "2D6", "2+", "4+", "2", "1", ["Shoot in Combat"], '10"'), weapon("Claws, Blades and Fangs", "Melee", 5, "4+", "3+", "1", "2")], abilityName: "Unleashed Warp-fury", abilityPhase: "Any Combat Phase", abilityText: "Suffer D3 mortal damage to add 1 Attack to this unit's melee weapons for the rest of the turn." },
    { id: "hell-pit-abomination", name: "Hell Pit Abomination", points: 200, models: 1, move: 'D6+5"', health: 14, control: 5, save: "5+", base: "120 × 92mm", clans: ["Moulder", "Monster"], weapons: [weapon("Gnashing Teeth and Flailing Fists", "Melee", 13, "4+", "2+", "2", "2", ["Anti-Infantry (+1 Rend)", "Companion"])], abilityName: "Too Horrible to Die", abilityPhase: null, abilityType: "Passive", abilityText: "The first time it would be destroyed, roll to die, disgorge damaging rats or survive and Heal (D6).", extraAbilities: [ability("Battle Damaged", null, "While this unit has 10 or more damage points, Gnashing Teeth and Flailing Fists has 8 Attacks.", "Passive"), ability("Regenerating Monstrosity", "End of Any Turn", "Heal (D6) this unit."), ability("Avalanche of Flesh", "Any Combat Phase", "On a 3+, roll a dice for each model in an enemy Infantry unit in combat; each 5+ inflicts 1 mortal damage.", "Once Per Turn (Army)", ["Rampage"])] },
    { id: "brood-terror", name: "Brood Terror", points: 220, models: 1, move: '6"', health: 12, control: 5, save: "5+", base: "90mm", clans: ["Moulder", "Monster"], weapons: [weapon("Warpflame Scourger", "Ranged", "2D6", "4+", "2+", "1", "D3", ["Anti-Infantry (+1 Rend)", "Crit (Auto-wound)"], '15"'), weapon("Chain-flail", "Melee", 5, "4+", "2+", "2", "3", ["Crit (Mortal)"]), weapon("Bladed Limbs", "Melee", 3, "4+", "4+", "1", "2")], abilityName: "Regenerating Terror", abilityPhase: "End of Any Turn", abilityText: "Heal (D6) this unit.", extraAbilities: [ability("Warpstone Fumes", "Any Combat Phase", "On a 2+, subtract 1 from hit rolls for attacks made by enemy units within 6\" for the rest of the turn.", "Once Per Turn (Army)", ["Rampage"]), ability("Lend a Claw", "Any Combat Phase", "Add 1 to hit rolls for the targets' attacks for the rest of the phase, including those made with Companion weapons.", "Ability")] },
    { id: "night-runners", name: "Night Runners", points: 130, models: 10, move: '7"', health: 1, control: 1, save: "6+", ward: "6+", base: "28.5mm", clans: ["Eshin", "Infantry", "Champion", "Ward (6+)"], weapons: [weapon("Slings and Poisoned Stars", "Ranged", 2, "4+", "4+", "0", "1", ["Crit (Auto-wound)", "Shoot in Combat"], '10"'), weapon("Poisoned Blades", "Melee", 2, "4+", "5+", "0", "1", ["Crit (Mortal)"])], abilityName: "Grappling Hooks", abilityPhase: "Your Movement Phase", abilityType: "Once Per Turn (Army)", abilityText: "If this unit was not set up this turn, set it up wholly within 3\" of a terrain feature within 3\" and more than 3\" from all enemy units.", extraAbilities: [ability("Smoke Bombs", "Any Combat Phase", "If this unit is in combat or charged, it can pile in and fight. Then, on a 3+, it can move up to its Move through enemy combat ranges, ending only in combat with units it was fighting at the start or outside combat.", "Once Per Turn (Army)", ["Core", "Attack", "Fight"])], reinforce: false },
    { id: "gutter-runners", name: "Gutter Runners", points: 150, models: 10, move: '7"', health: 1, control: 1, save: "6+", ward: "6+", base: "Mixed", clans: ["Eshin", "Infantry", "Champion", "Ward (6+)"], weapons: [weapon("Saboteur Bombs", "Ranged", 2, "4+", "2+", "0", "D3", ["Anti-Infantry (+1 Rend)", "Shoot in Combat"], '10"'), weapon("Punch Dagger and Blade", "Melee", 3, "3+", "4+", "1", "1", ["Crit (Mortal)"])], abilityName: "Bomb Rats", abilityPhase: "Any Combat Phase", abilityType: "Once Per Turn (Army)", abilityText: "If fewer than 2 friendly Bomb Rats are next to enemies, place a Bomb Rat token next to an enemy in combat with this unit that does not already have one.", extraAbilities: [ability("Detonate", "End of Any Turn", "Even if this unit has been destroyed, roll a D3 for each enemy unit within the combat range of each enemy carrying a Bomb Rat. On a 2+, inflict mortal damage equal to the roll, then remove that Bomb Rat.")], reinforce: false },
  ].map((entry) => createUnit({
    id: entry.id, name: entry.name, points: entry.points, models: entry.models,
    imageAlias: entry.imageAlias ?? null,
    move: entry.move, health: entry.health, control: entry.control, save: entry.save, ward: entry.ward ?? null, baseSize: entry.base,
    keywords: entry.clans,
    rules: { monster: entry.clans.includes("Monster"), priest: entry.id === "plaguepack" ? 1 : 0, ward: entry.ward ?? null, canBeReinforced: entry.reinforce !== false },
    weapons: entry.weapons,
    abilities: [ability(entry.abilityName, entry.abilityPhase ?? (entry.abilityName.includes("Hidden") ? null : "Ability"), entry.abilityText, entry.abilityType ?? (entry.abilityName.includes("Hidden") ? "Passive" : "Ability")), ...(entry.extraAbilities ?? [])],
  })),
];

export default units;

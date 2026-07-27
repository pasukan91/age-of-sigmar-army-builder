import { ability, createUnit, weapon } from "./unitFactory";

const anyDaemon = ["any-daemon"];
const anyArcanite = ["any-arcanite"];
const anyTzeentch = ["any-disciples-of-tzeentch"];
const heroRules = (wizard = 1, extra = {}) => ({ hero: true, wizard, canBeReinforced: false, ...extra });

const units = [
  createUnit({
    id: "kairos-fateweaver", name: "Kairos Fateweaver", points: 400,
    move: '10"', health: 14, control: 5, save: "4+", ward: "5+", baseSize: "100mm",
    regimentOptions: ["0-1-tzeentchian-deceiver", "0-1-arcanite-cabalist", ...anyTzeentch],
    keywords: ["Warmaster", "Unique", "Hero", "Monster", "Wizard (3)", "Fly", "Ward (5+)", "Daemon"],
    rules: heroRules(3, { unique: true, monster: true, warmaster: true, ward: "5+" }),
    weapons: [
      weapon("Staff of Tomorrow", "Melee", 4, "3+", "2+", "1", "D3"),
      weapon("Curved Beaks", "Melee", 5, "4+", "3+", "1", "2", ["Companion"]),
    ],
    abilities: [
      ability("Battle Damaged", null, "While this unit has 10 or more damage points, subtract 1 from its power level.", "Passive"),
      ability("Master of Destiny", null, "Once each battle round, engineer an eligible visible friendly unit's D6 roll as an unmodifiable 6, or its 2D6 roll as an unmodifiable 9.", "Passive"),
      ability("Mastery of Magic", null, "When this unit makes a casting roll, change the lowest D6 to match the highest D6.", "Passive"),
      ability("Beacon of Sorcery", null, "Friendly Disciples of Tzeentch Wizards wholly within 12\" add 1 to casting and unbinding rolls; their Magical Intervention after an unbind costs no command point.", "Passive"),
      ability("Fateful Reverse", "Your Hero Phase", "Spell: until your next turn, friendly units fighting the target have Strike-first if it charged, and its weapons cannot benefit from Charge (+1 Damage).", "Spell", ["Spell"]),
    ],
  }),
  createUnit({
    id: "lord-of-change", name: "Lord of Change", points: 380,
    move: '10"', health: 14, control: 5, save: "4+", ward: "5+", baseSize: "100mm",
    regimentOptions: ["0-1-tzeentchian-deceiver", "0-1-arcanite-cabalist", ...anyTzeentch],
    keywords: ["Hero", "Monster", "Wizard (3)", "Fly", "Ward (5+)", "Daemon"],
    rules: heroRules(3, { monster: true, ward: "5+" }),
    weapons: [
      weapon("Staff of Tzeentch", "Melee", 5, "3+", "2+", "1", "D3"),
      weapon("Curved Beak", "Melee", 6, "4+", "3+", "1", "2", ["Companion"]),
    ],
    abilities: [
      ability("Battle Damaged", null, "While this unit has 10 or more damage points, subtract 1 from its power level.", "Passive"),
      ability("Summon Daemons of Tzeentch", "Your Movement Phase", "Return a destroyed friendly non-Hero Daemon unit at half strength wholly within 12\" and more than 9\" from enemies.", "Once Per Turn (Army)"),
      ability("Temporal Manipulation", "Your Hero Phase", "Spell: another visible friendly unit wholly within 18\" can make a Normal Move, ending closer to this unit.", "Spell", ["Spell"]),
      ability("Locus of Impossibility", null, "Add 1 to this unit's casting rolls. Subtract 1 from hit rolls that target friendly Daemon units wholly within 12\".", "Passive"),
    ],
  }),
  createUnit({
    id: "the-changeling", name: "The Changeling", points: 140,
    imageAlias: "changeling",
    move: '5"', health: 5, control: 2, save: "5+", ward: "5+", baseSize: "40mm",
    regimentOptions: anyDaemon, canJoinRegimentAs: ["tzeentchian-deceiver"],
    keywords: ["Unique", "Hero", "Wizard (2)", "Infantry", "Ward (5+)", "Daemon"],
    rules: heroRules(2, { unique: true, ward: "5+" }),
    weapons: [weapon("The Trickster's Staff", "Melee", 3, "3+", "3+", "0", "D3")],
    abilities: [
      ability("Puckish Misdirection", null, "Friendly units wholly within 12\" can use Redeploy even if they were set up in the same turn.", "Passive"),
      ability("Arch-deceiver", "Your Hero Phase", "While masked by illusion, this unit can cast a spell measuring range and visibility from a model in another friendly unit."),
      ability("Whispers of Treachery", "Your Hero Phase", "Spell: roll a die for each model in an enemy unit within 18\"; each 5+ inflicts 1 mortal damage.", "Spell", ["Spell"]),
    ],
  }),
  createUnit({
    id: "fateskimmer", name: "Fateskimmer", points: 140,
    move: '14"', health: 8, control: 2, save: "5+", ward: "6+", baseSize: "120 x 92mm",
    regimentOptions: ["0-1-tzeentchian-deceiver", ...anyDaemon],
    keywords: ["Hero", "Wizard (1)", "War Machine", "Fly", "Ward (6+)", "Daemon"],
    rules: heroRules(1, { ward: "6+" }),
    weapons: [
      weapon("Staff of Change and Ritual Dagger", "Melee", 3, "4+", "3+", "1", "D3"),
      weapon("Screamers' Lamprey Bites", "Melee", 6, "4+", "4+", "1", "1", ["Charge (+1 Damage)", "Companion"]),
    ],
    abilities: [
      ability("Spread the Inferno", null, "Companion weapons used by friendly units wholly within 12\" have Crit (2 Hits).", "Passive"),
      ability("Fuel for the Flames", "Any Hero Phase", "Pick a visible friendly unit wholly within 12\". If it is destroyed this turn, gain 1 fate point before removing it.", "Once Per Turn (Army)"),
    ],
  }),
  createUnit({
    id: "changecaster", name: "Changecaster", points: 140,
    move: '5"', health: 5, control: 2, save: "5+", ward: "6+", baseSize: "32mm",
    regimentOptions: anyDaemon, canJoinRegimentAs: ["tzeentchian-deceiver"],
    keywords: ["Hero", "Wizard (1)", "Infantry", "Ward (6+)", "Daemon"],
    rules: heroRules(1, { ward: "6+" }),
    weapons: [weapon("Staff of Change and Ritual Dagger", "Melee", 3, "4+", "3+", "1", "D3")],
    abilities: [
      ability("Locus of Command", null, "When a friendly Daemon unit wholly within 12\" uses Rally, make 3 additional rally rolls.", "Passive"),
      ability("Weapon Curse", "Your Hero Phase", "On a 3+ (add 1 if the target was set up this turn), weapon abilities other than Companion have no effect against a friendly Daemon unit wholly within 12\" until your next turn.", "Once Per Turn (Army)"),
    ],
  }),
  createUnit({
    id: "gaunt-summoner-on-disc", name: "Gaunt Summoner on Disc of Tzeentch", points: 210,
    imageAlias: "gaunt_summoner_disc", move: '14"', health: 7, control: 2, save: "4+", ward: "5+", baseSize: "40mm",
    regimentOptions: ["0-1-tzeentchian-deceiver", ...anyTzeentch],
    keywords: ["Hero", "Wizard (2)", "Cavalry", "Fly", "Ward (5+)", "Daemon"],
    rules: heroRules(2, { ward: "5+" }),
    weapons: [weapon("Warptongue Blade", "Melee", 3, "3+", "3+", "1", "2"), weapon("Disc's Teeth and Horns", "Melee", 2, "4+", "3+", "1", "D3", ["Companion"])],
    abilities: [
      ability("Masters of the Silver Towers", null, "Enemies cannot end a charge within 1/2\" of a friendly Argent Shard wholly within 12\" that was set up this turn.", "Passive"),
      ability("All Belongs to Tzeentch", "Start of Any Turn", "Once per battle, take control of an objective you controlled earlier in the battle.", "Once Per Battle (Army)"),
      ability("Arcane Imprisonment", "Your Hero Phase", "Spell: if the unmodified casting roll exceeds the Health of an enemy Hero in combat, it is destroyed and cannot be replaced.", "Spell", ["Spell"]),
    ],
  }),
  createUnit({
    id: "gaunt-summoner", name: "Gaunt Summoner", points: 180,
    move: '5"', health: 5, control: 2, save: "5+", ward: "5+", baseSize: "40mm",
    regimentOptions: ["0-1-tzeentchian-deceiver", ...anyTzeentch],
    keywords: ["Hero", "Wizard (2)", "Infantry", "Ward (5+)", "Daemon"],
    rules: heroRules(2, { ward: "5+" }),
    weapons: [weapon("Changestaff", "Ranged", 3, "4+", "3+", "1", "D3", ["Crit (Mortal)"], '12"'), weapon("Warptongue Blade", "Melee", 3, "3+", "3+", "1", "2")],
    abilities: [
      ability("Masters of the Silver Towers", null, "Enemies cannot end a charge within 1/2\" of a friendly Argent Shard wholly within 12\" that was set up this turn.", "Passive"),
      ability("All Belongs to Tzeentch", "Start of Any Turn", "Once per battle, take control of an objective you controlled earlier in the battle.", "Once Per Battle (Army)"),
      ability("Leaden Limbs", "Your Hero Phase", "Spell: halve the Move of an enemy within 18\" and suppress Fly until your next turn.", "Spell", ["Spell"]),
    ],
  }),
  createUnit({
    id: "fatemaster", name: "Fatemaster", points: 150,
    move: '5"', health: 6, control: 2, save: "4+", baseSize: "40mm",
    regimentOptions: ["0-1-chaos-spawn", ...anyArcanite], canJoinRegimentAs: ["arcanite-cabalist"],
    keywords: ["Hero", "Wizard (1)", "Infantry", "Arcanite"],
    rules: heroRules(1),
    weapons: [weapon("Cursewrought Glaive", "Melee", 4, "3+", "4+", "2", "2")],
    abilities: [
      ability("Long in the Planning", "Enemy Hero Phase", "Spend 2 fate points. The first time an enemy ends a charge within 3\" of a visible friendly Arcanite unit wholly within 12\", place that unit in reserve masked by illusion.", "Once Per Turn (Army)"),
      ability("Bound Return", "Your Movement Phase", "While masked, set this unit more than 9\" from enemies, then set up to 1 other friendly masked unit wholly within 6\" and more than 9\" from enemies.", "Once Per Turn (Army)"),
    ],
  }),
  ...[
    ["magister-on-disc", "Magister on Disc of Tzeentch", 150, "magister_disc", '14"', 7, "Cavalry", "50mm", true],
    ["magister", "Magister", 140, "magister", '5"', 6, "Infantry", "32mm", false],
  ].map(([id, name, points, imageAlias, move, health, troopType, baseSize, onDisc]) => createUnit({
    id, name, points, imageAlias, move, health, control: 2, save: "4+", baseSize,
    regimentOptions: onDisc ? ["0-1-arcanite-cabalist", ...anyArcanite] : anyArcanite,
    canJoinRegimentAs: onDisc ? [] : ["arcanite-cabalist"],
    keywords: ["Hero", "Wizard (1)", troopType, ...(onDisc ? ["Fly"] : []), "Arcanite"],
    rules: heroRules(1),
    weapons: [
      weapon("Tzeentchian Runestaff", "Ranged", 1, "3+", "4+", "0", "D3", [], '18"'),
      weapon("Warpsteel Sword", "Melee", 3, "3+", "4+", "0", "2"),
      ...(onDisc ? [weapon("Disc's Teeth and Horns", "Melee", 2, "4+", "3+", "1", "D3", ["Companion"])] : []),
    ],
    abilities: [
      ability("Spellmaster", "Reaction: You declared a Spell ability", "Once per turn, try to unbind your own spell with 2D6; if successful, the spell is unresolved and this unit adds 1 to casting rolls for the rest of the phase.", "Once Per Turn (Army)", ["Unbind"]),
      onDisc
        ? ability("Fates Converge", null, "While you have 6 or more fate points, friendly Arcanite units wholly within 12\" add 1 to the Attacks of their melee weapons.", "Passive")
        : ability("Imbued with Arcane Fire", "Any Combat Phase", "Spend 1 fate point: a visible friendly Arcanite unit wholly within 12\" gains Crit (Mortal) on melee weapons until your next turn.", "Once Per Turn (Army)"),
    ],
  })),
  createUnit({
    id: "ogroid-thaumaturge", name: "Ogroid Thaumaturge", points: 110,
    move: '6"', health: 8, control: 2, save: "5+", ward: "6+", baseSize: "50mm",
    regimentOptions: anyArcanite, canJoinRegimentAs: ["arcanite-cabalist"],
    keywords: ["Hero", "Wizard (1)", "Infantry", "Ward (6+)", "Arcanite"],
    rules: heroRules(1, { ward: "6+" }),
    weapons: [weapon("Thaumaturge Staff", "Ranged", 3, "3+", "4+", "0", "D3", ["Shoot in Combat"], '12"'), weapon("Great Horns and Cloven Hooves", "Melee", 6, "4+", "2+", "1", "2", ["Charge (+1 Damage)"])],
    abilities: [
      ability("Thaumaturgic Hunger", "Reaction: Opponent declared a Spell ability", "This unit can move 6\" toward the caster and may enter combat; if it started in combat, it must finish in combat.", "Reaction", ["Move"]),
      ability("Arcane Absorption", "End of Any Turn", "If an enemy Wizard or Priest damaged by this unit was destroyed this turn, Heal (7) and permanently add 1 to this unit's power level. This can accumulate."),
    ],
  }),
  createUnit({
    id: "curseling", name: "Curseling, Eye of Tzeentch", points: 170,
    move: '5"', health: 6, control: 2, save: "3+", baseSize: "32mm",
    regimentOptions: ["0-1-chaos-spawn", ...anyArcanite], canJoinRegimentAs: ["arcanite-cabalist"],
    keywords: ["Hero", "Wizard (2)", "Infantry", "Arcanite"],
    rules: heroRules(2),
    weapons: [weapon("Hurled Arcane Energy", "Ranged", "D6", "3+", "3+", "1", "1", [], '18"'), weapon("Staff of Tzeentch and Blazing Sword", "Melee", 5, "3+", "4+", "1", "2")],
    abilities: [
      ability("With Spell and Sword", "Any Combat Phase", "While in combat, cast one non-Summon spell as if it were your hero phase; treat Unlimited as absent and do not repeat a spell cast this turn.", "Once Per Turn (Army)"),
      ability("Armour-bane Curse", "Your Hero Phase", "Spell (6): subtract 1 from save rolls against combat attacks targeting an enemy within 12\" until your next turn.", "Spell", ["Spell"]),
    ],
  }),
  createUnit({
    id: "tzaangor-shaman", name: "Tzaangor Shaman", points: 130,
    move: '14"', health: 6, control: 2, save: "4+", baseSize: "40mm",
    regimentOptions: ["0-1-arcanite-cabalist", ...anyArcanite],
    keywords: ["Hero", "Wizard (1)", "Cavalry", "Fly", "Arcanite", "Warflock"],
    rules: heroRules(1),
    weapons: [weapon("Staff of Change and Ritual Dagger", "Melee", 3, "4+", "3+", "1", "D3"), weapon("Disc's Teeth and Horns", "Melee", 2, "4+", "3+", "1", "D3", ["Companion"])],
    abilities: [
      ability("Avian Swiftness", "Your Hero Phase", "On a 3+, a visible friendly Arcanite unit wholly within 12\" can charge after running until your next turn."),
      ability("Wit of Beasts", "Any Combat Phase", "An enemy Monster or Cavalry unit within 6\" gains Companion on its melee weapons for the turn.", "Once Per Turn (Army)"),
    ],
  }),
  createUnit({
    id: "burning-chariot", name: "Burning Chariot of Tzeentch", points: 120,
    move: '14"', health: 8, control: 1, save: "5+", ward: "6+", baseSize: "120 x 92mm",
    keywords: ["War Machine", "Fly", "Ward (6+)", "Daemon"], rules: { ward: "6+", canBeReinforced: true },
    weapons: [weapon("Wyrdflame Blast", "Ranged", 4, "2+", "4+", "0", "D3", ["Anti-Infantry (+1 Rend)", "Shoot in Combat"], '16"'), weapon("Flaming Maws and Blue Horrors' Jabs", "Melee", 6, "4+", "3+", "0", "1"), weapon("Screamers' Lamprey Bites", "Melee", 6, "4+", "4+", "1", "1", ["Charge (+1 Damage)", "Companion"])],
    abilities: [ability("Fiery Death from Above", "Any Charge Phase", "After charging, roll D3. On 1 gain a fate point. On 2+, inflict that much mortal damage on an enemy within 1\" and immediately Retreat without suffering mortal damage.", "Once Per Turn (Army)")],
  }),
  createUnit({
    id: "exalted-flamer", name: "Exalted Flamer of Tzeentch", points: 120,
    move: '9"', health: 4, control: 1, save: "5+", ward: "6+", baseSize: "75 x 42mm",
    keywords: ["Infantry", "Fly", "Ward (6+)", "Daemon"], rules: { ward: "6+" },
    weapons: [weapon("Wyrdflame Blast", "Ranged", 4, "2+", "4+", "0", "D3", ["Anti-Infantry (+1 Rend)", "Shoot in Combat"], '16"')],
    abilities: [
      ability("Heart of the Inferno", "Your Shooting Phase", "Up to 2 visible friendly Flamers units wholly within 12\" add 1 to wound rolls for shooting attacks this turn.", "Once Per Turn (Army)"),
      ability("Unnatural Heat", "Any Shooting Phase", "After this unit shoots a target, add damage caused to a die roll; on 5+, subtract 1 from that target's saves for the turn.", "Once Per Turn (Army)"),
    ],
  }),
  createUnit({
    id: "flamers", name: "Flamers of Tzeentch", points: 130, models: 3,
    move: '9"', health: 2, control: 1, save: "5+", ward: "6+", baseSize: "32mm",
    keywords: ["Infantry", "Champion", "Fly", "Ward (6+)", "Daemon"], rules: { ward: "6+" },
    weapons: [weapon("Warping Flames", "Ranged", 3, "2+", "4+", "0", "D3", ["Anti-Infantry (+1 Rend)", "Shoot in Combat"], '12"'), weapon("Flaming Maws", "Melee", 3, "3+", "4+", "0", "1")],
    abilities: [
      ability("Capricious Wyrdflame", "Any Shooting Phase", "An enemy damaged by this unit's shooting gains the Burning keyword for the rest of the battle.", "Once Per Turn (Army)"),
      ability("Lingering Burns", "End of Any Turn", "Once per battle, roll D3 for any number of Burning enemies: on 1 they cease Burning; on 2+ inflict mortal damage equal to the roll.", "Once Per Turn (Army)"),
    ],
  }),
  createUnit({
    id: "screamers", name: "Screamers of Tzeentch", points: 80, models: 3,
    move: '14"', health: 3, control: 1, save: "5+", ward: "6+", baseSize: "32mm",
    keywords: ["Beast", "Fly", "Ward (6+)", "Daemon"], rules: { ward: "6+" },
    weapons: [weapon("Lamprey Bite", "Melee", 3, "4+", "4+", "1", "1", ["Charge (+1 Damage)", "Companion"])],
    abilities: [
      ability("Beast", null, "This unit has a maximum control score of 1.", "Passive"),
      ability("Drawn to Magic", "Any Charge Phase", "If not in combat, make a charge roll and move that distance, passing through combat ranges but ending within 1/2\" of a Manifestation; if it charged, inflict D3 mortal damage on each Manifestation in combat.", "Once Per Turn (Army)", ["Core", "Move", "Charge"]),
    ],
  }),
  createUnit({
    id: "pink-horrors", name: "Pink Horrors", points: 170, models: 10,
    move: '5"', health: 1, control: 1, save: "6+", ward: "6+", baseSize: "32mm",
    keywords: ["Infantry", "Champion", "Musician (1/10)", "Standard Bearer (1/10)", "Ward (6+)", "Daemon"], rules: { ward: "6+" },
    weapons: [weapon("Magical Flames", "Ranged", 2, "4+", "4+", "0", "1", [], '12"'), weapon("Taloned Hands", "Melee", 2, "4+", "4+", "0", "1")],
    abilities: [ability("Lunatic Demise", null, "Each slain model either returns up to 2 slain Blue Horrors to a visible friendly Blue/Brimstone unit within 12\", or on a 5+ inflicts 1 mortal damage on an enemy in combat.", "Passive")],
  }),
  createUnit({
    id: "blue-horrors-and-brimstone-horrors", name: "Blue Horrors and Brimstone Horrors", points: 120, models: 10,
    move: '5"', health: 1, control: 1, save: "6+", ward: "6+", baseSize: "25mm",
    keywords: ["Infantry", "Ward (6+)", "Daemon"], rules: { ward: "6+" },
    weapons: [weapon("Magical Flames", "Ranged", 2, "4+", "4+", "0", "1", [], '12"'), weapon("Taloned Hands", "Melee", 2, "4+", "4+", "0", "1")],
    abilities: [ability("Split Again", "End of Any Turn", "For each slain Blue Horror, on a 3+ add 1 Brimstone Horrors model, respecting the unit's model limits.")],
  }),
  createUnit({
    id: "tzaangors", name: "Tzaangors", points: 170, models: 10,
    move: '6"', health: 2, control: 1, save: "5+", baseSize: "32mm",
    keywords: ["Infantry", "Champion", "Musician (1/10)", "Standard Bearer (1/10)", "Arcanite", "Warflock"],
    weapons: [weapon("Savage Blades and Vicious Beak", "Melee", 3, "4+", "3+", "1", "1", ["Crit (2 Hits)"])],
    abilities: [ability("Eldritch Raiders", null, "Add 1 to wound rolls for this unit's attacks while it is wholly within enemy territory.", "Passive")],
  }),
  createUnit({
    id: "tzaangor-enlightened", name: "Tzaangor Enlightened", points: 200, models: 3,
    move: '14"', health: 4, control: 1, save: "4+", baseSize: "40mm",
    keywords: ["Cavalry", "Champion", "Fly", "Arcanite", "Warflock"],
    weapons: [weapon("Tzeentchian Spear and Vicious Beak", "Melee", 3, "4+", "3+", "1", "2", ["Charge (+1 Damage)"]), weapon("Disc's Teeth and Horns", "Melee", 2, "4+", "3+", "1", "D3", ["Companion"])],
    abilities: [ability("All Too Predictable", "Any Combat Phase", "If this unit charged, choose Crit (2 Hits) or +1 Rend for its spear and beak for the rest of the turn.")],
  }),
  createUnit({
    id: "tzaangor-skyfires", name: "Tzaangor Skyfires", points: 160, models: 3,
    imageAlias: "tzaangor_enlightened", move: '14"', health: 4, control: 1, save: "4+", baseSize: "40mm",
    keywords: ["Cavalry", "Champion", "Fly", "Arcanite", "Warflock"],
    weapons: [weapon("Arrow of Fate", "Ranged", 2, "3+", "3+", "1", "D3", [], '18"'), weapon("Bow Stave and Vicious Beak", "Melee", 1, "4+", "3+", "1", "1"), weapon("Disc's Teeth and Horns", "Melee", 2, "4+", "3+", "1", "D3", ["Companion"])],
    abilities: [
      ability("Guided by the Future", null, "Ignore negative modifiers to hit and wound rolls for this unit's shooting attacks.", "Passive"),
      ability("Destined Quarry", "Your Shooting Phase", "After this unit damages an enemy, friendly Warflock units add 1 to hit rolls for combat attacks against it this turn."),
    ],
  }),
  createUnit({
    id: "kairic-acolytes", name: "Kairic Acolytes", points: 90, models: 10,
    move: '5"', health: 1, control: 1, save: "5+", baseSize: "32mm",
    keywords: ["Infantry", "Champion", "Arcanite"],
    weapons: [weapon("Kairic Blades", "Melee", 2, "4+", "3+", "1", "1")],
    abilities: [ability("Driven by Destiny", "Enemy Movement Phase", "If more than 6\" from all enemies, move a distance equal to your fate points; it cannot enter combat.", "Once Per Turn (Army)", ["Move"])],
  }),
  createUnit({
    id: "jade-obelisk", name: "Jade Obelisk", points: 100, models: 9,
    move: '5"', health: 1, control: 1, save: "5+", baseSize: "32mm / 28.5mm",
    keywords: ["Infantry", "Champion (1/9)", "Arcanite"], rules: { canBeReinforced: false },
    weapons: [weapon("Antithete Bow", "Ranged", 1, "4+", "3+", "1", "1", [], '18"'), weapon("Mason's Tools", "Melee", 2, "4+", "3+", "0", "1", ["Anti-Faction Terrain (+1 Rend)"])],
    abilities: [
      ability("Idolarc", null, "After first setup, place this unit's Idolarc token next to it.", "Passive"),
      ability("Silver Monoliths", null, "Subtract 1 Rend from weapons targeting this unit while wholly within 12\" of a friendly Argent Shard.", "Passive"),
      ability("Chosen by the Stone", "Your Shooting Phase", "On a 3+, place this unit's Idolarc by an enemy within 18\". That enemy loses 1\" Move per fate point, to a minimum of half its unmodified Move.", "Once Per Turn (Army)"),
    ],
  }),
  createUnit({
    id: "chaos-spawn", name: "Chaos Spawn of Tzeentch", points: 60,
    move: "2D6", health: 5, control: 1, save: "5+", baseSize: "50mm",
    keywords: ["Beast"],
    weapons: [weapon("Freakish Mutations", "Melee", "2D6", "5+", "4+", "0", "1")],
    abilities: [
      ability("Beast", null, "This unit has a maximum control score of 1.", "Passive"),
      ability("A Twisted Fate", "Deployment Phase", "This unit must be deployed in reserve masked by illusion.", "Deploy", ["Deploy"]),
      ability("Waves of Mutation", null, "Each time this unit is destroyed, set up an identical replacement in reserve masked by illusion. It can be replaced any number of times.", "Passive"),
    ],
  }),
];

export default units;

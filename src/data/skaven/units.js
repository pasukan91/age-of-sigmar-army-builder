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
    move: '10"', health: 14, control: 5, save: "4+", ward: "5+", baseSize: "130mm",
    regimentOptions: anySkaven,
    keywords: ["Warmaster", "Unique", "Hero", "Monster", "Priest (2)", "Ward (5+)", "Daemon", "Masterclan"],
    rules: { hero: true, unique: true, monster: true, priest: 2, ward: "5+", warmaster: true, canBeReinforced: false },
    weapons: [
      weapon("Unholy Gnawstaff", "Melee", 6, "4+", "2+", "1", "D6", ["Crit (Mortal)"]),
      weapon("Host of Vermin", "Melee", 10, "5+", "4+", "0", "1", ["Crit (Auto-wound)", "Companion"]),
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
      weapon("Custom Warpfire Projectors", "Ranged", 6, "2+", "4+", "2", "1", ["Companion", "Shoot in Combat"], '10"'),
      weapon("Staff of the Horned Rat", "Melee", 4, "3+", "3+", "1", "D3"),
      weapon("Warpfire Braziers", "Melee", 7, "4+", "2+", "2", "2", ["Companion"]),
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
    weapons: [weapon("Glaive of the Rat King", "Melee", 7, "2+", "3+", "2", "3", ["Crit (2 Hits)"])],
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
    keywords: ["Hero", "Monster", clan === "Pestilens" ? "Priest (1)" : "Wizard (1)", "Ward (5+)", "Daemon", clan],
    rules: { hero: true, monster: true, wizard: clan === "Pestilens" ? 0 : clan === "Masterclan" ? 2 : 1, priest: clan === "Pestilens" ? 1 : 0, ward: "5+", canBeReinforced: false },
    weapons: [weapon(weaponName, "Melee", clan === "Pestilens" ? 8 : 6, "3+", "2+", "2", clan === "Verminus" ? "3" : "2")],
    abilities: [
      ability(signature, clan === "Masterclan" ? null : "Any Combat Phase", clan === "Eshin"
        ? "Reposition through the shadows into combat with another enemy on a 4+."
        : clan === "Verminus"
          ? "Two nearby Verminus Infantry units can use All-out Attack or All-out Defence even if already used this phase."
          : clan === "Pestilens"
            ? "Manifest a Great Plague after an unmodified chanting roll of 6."
            : "Add 2\" to moves made with Always Three Clawsteps Ahead while this unit is on the battlefield.", "Once Per Turn (Army)", clan === "Masterclan" ? [] : ["Rampage"]),
    ],
  })),
  createUnit({
    id: "grey-seer", name: "Grey Seer", points: 110,
    imageAlias: "grey-seer-on-screaming-bell",
    move: '6"', health: 5, control: 2, save: "5+", baseSize: "32mm",
    regimentOptions: anySkaven,
    keywords: ["Hero", "Wizard (1)", "Infantry", "Masterclan"],
    rules: { hero: true, wizard: 1, canBeReinforced: false },
    weapons: [weapon("Warpstone Staff", "Melee", 3, "4+", "4+", "1", "D3")],
    abilities: [ability("Warpstone Shards", "Your Hero Phase", "The next casting roll uses 3D6. A total of 13 is unbindable but inflicts D3 mortal damage; otherwise remove one die and use the remaining 2D6.")],
  }),
  createUnit({
    id: "grey-seer-on-screaming-bell", name: "Grey Seer on Screaming Bell", points: 310,
    move: '5"', health: 15, control: 5, save: "4+", ward: "5+", baseSize: "120 × 92mm",
    regimentOptions: anySkaven,
    keywords: ["Hero", "War Machine", "Wizard (2)", "Ward (5+)", "Masterclan"],
    rules: { hero: true, wizard: 2, ward: "5+", canBeReinforced: false },
    weapons: [
      weapon("Warpstone Staff", "Melee", 3, "4+", "4+", "1", "D3"),
      weapon("Rat Ogor's Tearing Claws", "Melee", 5, "4+", "3+", "1", "2", ["Companion"]),
      weapon("Crushing Bulk", "Melee", 6, "4+", "2+", "1", "2", ["Charge (+1 Damage)", "Companion"]),
    ],
    abilities: [
      ability("Altar of the Horned Rat", null, "Friendly Skaven Infantry units have Ward (6+) while wholly within 6\".", "Passive"),
      ability("Peal of Doom", "Your Hero Phase", "Roll for magical backlash, a wall of unholy sound or apocalyptic mortal damage."),
      ability("Cracks Call", "Your Hero Phase", "Spell: if the casting roll exceeds an enemy's Move, inflict mortal damage equal to the difference.", "Spell", ["Spell"]),
    ],
  }),
  createUnit({
    id: "krittok-foulblade", name: "Krittok Foulblade", points: 140,
    move: '6"', health: 6, control: 2, save: "3+", baseSize: "40mm",
    regimentOptions: anySkaven,
    keywords: ["Warmaster", "Unique", "Hero", "Infantry", "Verminus"],
    rules: { hero: true, unique: true, warmaster: true, canBeReinforced: false },
    weapons: [weapon("Warplock Pistol", "Ranged", 2, "3+", "3+", "1", "D3", ["Crit (Auto-wound)"], '10"'), weapon("Doomfang", "Melee", 5, "3+", "3+", "2", "2", ["Crit (Mortal)"])],
    abilities: [
      ability("Doomfang", "Any Combat Phase", "This unit gains Strike-first but cannot use commands this phase."),
      ability("A Reputation for Cunning", "Enemy Hero Phase", "Pick two units for Always Three Clawsteps Ahead instead of one; at least one must be Verminus."),
      ability("Foster Competition", null, "Add 1 to wound rolls for friendly Stormvermin wholly within 13\".", "Passive"),
    ],
  }),
  ...[
    { id: "arch-warlock", name: "Arch-Warlock", points: 140, clan: "Skryre", options: ["clanrats", "any-skryre"], move: '5"', health: 6, save: "3+", base: "32mm", wizard: 1, ranged: "Warpfire Gauntlet", signature: "Overseers of the Enginecovens", desc: "A nearby Skryre unit can use Covering Fire without spending a command point." },
    { id: "warlock-galvaneer", name: "Warlock Galvaneer", points: 120, clan: "Skryre", options: ["clanrats", "any-skryre"], move: '6"', health: 5, save: "5+", base: "32mm", ranged: "Warpvolt Obliterator", signature: "Lightning Master", desc: "Once per battle, set a nearby Warpvolt Scourgers unit's Attacks to 10 for the turn.", imageAlias: "ratling-warpblaster" },
    { id: "warlock-bombardier", name: "Warlock Bombardier", points: 90, clan: "Skryre", options: ["clanrats", "any-skryre"], move: '6"', health: 5, save: "5+", base: "32mm", ranged: "Doomrocket", signature: "More-more Doom!", desc: "Overcharge the Doomrocket: on a 2+ its Damage becomes D3+3; on a 1 this unit suffers D3 mortal damage." },
    { id: "warlock-engineer", name: "Warlock Engineer", points: 100, clan: "Skryre", options: ["clanrats", "any-skryre"], move: '6"', health: 5, save: "5+", base: "32mm", ranged: "Warplock Musket", signature: "Sniper-master", desc: "This unit and nearby Warplock Jezzails can ignore Guarded Hero when shooting.", imageAlias: "spearhead-skaven" },
    { id: "master-moulder", name: "Master Moulder", points: 80, clan: "Moulder", options: ["clanrats", "any-moulder"], move: '6"', health: 5, save: "5+", base: "32mm", ranged: "Warpsyringe Pistol", signature: "Lord of Flesh-grafting", desc: "At the end of the turn, Heal (3) another friendly Moulder unit wholly within 13\".", imageAlias: "rat-ogors" },
    { id: "clawlord", name: "Clawlord", points: 70, clan: "Verminus", options: ["any-verminus"], move: '6"', health: 5, save: "4+", base: "32mm", signature: "Gnash-gnaw on Their Bones!", desc: "After this unit fights, a nearby non-Hero Verminus Infantry unit can fight immediately." },
    { id: "clawlord-on-gnaw-beast", name: "Clawlord on Gnaw-beast", points: 110, clan: "Verminus", options: ["any-verminus"], move: '10"', health: 7, save: "4+", base: "75 × 42mm", ranged: "Ratling Pistol", signature: "Cruel Commander", desc: "Damage a nearby non-Hero Verminus unit to add 5 to its control score until your next turn.", cavalry: true },
    { id: "deathmaster", name: "Deathmaster", points: 120, clan: "Eshin", options: ["clanrats", "any-eshin"], move: '7"', health: 5, save: "5+", base: "32mm", ranged: "Eshin Throwing Stars", signature: "Shadowy Killers", desc: "Unmodified hit rolls of 1-4 that target this unit fail." },
  ].map((entry) => createUnit({
    id: entry.id, name: entry.name, points: entry.points,
    imageAlias: entry.imageAlias ?? null,
    move: entry.move, health: entry.health, control: 2, save: entry.save, baseSize: entry.base,
    regimentOptions: entry.options,
    canJoinRegimentAs: ["clawlord", "clawlord-on-gnaw-beast", "deathmaster", "master-moulder", "warlock-bombardier", "warlock-engineer", "warlock-galvaneer"].includes(entry.id) ? ["skaven-overclaw"] : [],
    keywords: ["Hero", entry.cavalry ? "Cavalry" : "Infantry", entry.wizard ? `Wizard (${entry.wizard})` : null, entry.clan].filter(Boolean),
    rules: { hero: true, wizard: entry.wizard ?? 0, canBeReinforced: false },
    weapons: [
      ...(entry.ranged ? [weapon(entry.ranged, "Ranged", 2, "3+", "3+", "1", "D3", ["Shoot in Combat"], '12"')] : []),
      weapon(entry.cavalry ? "Warpforged Halberd and Chisel Fangs" : "Warpforged Blade", "Melee", 5, "3+", "3+", "1", "2"),
    ],
    abilities: [ability(entry.signature, entry.signature === "Shadowy Killers" ? null : "Your Hero Phase", entry.desc, entry.signature === "Shadowy Killers" ? "Passive" : "Ability")],
  })),
  createUnit({
    id: "plague-priest-on-plague-furnace", name: "Plague Priest on Plague Furnace", points: 350,
    move: '5"', health: 15, control: 5, save: "4+", ward: "5+", baseSize: "120 × 92mm",
    regimentOptions: ["clanrats", "any-pestilens"],
    keywords: ["Hero", "Priest (1)", "War Machine", "Ward (5+)", "Pestilens"],
    rules: { hero: true, priest: 1, ward: "5+", canBeReinforced: false },
    weapons: [weapon("Great Plague Censer", "Melee", 4, "4+", "2+", "2", "3", ["Crit (Auto-wound)"]), weapon("Crushing Bulk", "Melee", 6, "4+", "2+", "1", "2", ["Companion"])],
    abilities: [
      ability("Altar of the Great Corruptor", null, "Friendly Pestilens units have Ward (6+) while wholly within 6\".", "Passive"),
      ability("Corrupting Influence", null, "Subtract 1 from Ward rolls for enemy units within 6\".", "Passive"),
    ],
  }),
  createUnit({
    id: "deathmaster-crixxit", name: "Deathmaster Crixxit", points: 150,
    move: '7"', health: 6, control: 2, save: "4+", baseSize: "40mm",
    regimentOptions: ["any-eshin"], canJoinRegimentAs: ["skaven-overclaw"],
    keywords: ["Unique", "Hero", "Infantry", "Eshin"],
    rules: { hero: true, unique: true, canBeReinforced: false },
    weapons: [weapon("Crixxit's Weeping Blades", "Melee", 6, "2+", "3+", "2", "2", ["Anti-Hero (+1 Rend)", "Crit (Mortal)"])],
    abilities: [ability("The Shadow Creeps with Crixxit", "Any Combat Phase", "Crixxit uses smoke, speed and poisoned blades to isolate and execute enemy Heroes.", "Once Per Turn (Army)")],
    notes: "Perfil añadido en los Battle Profiles de junio de 2026.",
  }),
  ...[
    { id: "stormfiends", name: "Stormfiends", points: 230, models: 3, move: '6"', health: 6, control: 2, save: "4+", base: "60mm", clans: ["Skryre", "Moulder", "Infantry"], weapons: [weapon("Ratling Cannons", "Ranged", "3D6", "4+", "3+", "1", "1", [], '15"'), weapon("Doomflayer Gauntlets", "Melee", 5, "4+", "2+", "2", "2", ["Charge (+1 Damage)"])], abilityName: "Grinderfist Tunnellers", abilityText: "If armed with Grinderfists and in the tunnels below, set this unit up more than 9\" from enemies." },
    { id: "acolyte-globadiers", name: "Acolyte Globadiers", points: 90, models: 5, move: '6"', health: 1, control: 1, save: "5+", base: "28.5mm", clans: ["Skryre", "Infantry", "Weapon Team", "Champion"], weapons: [weapon("Poisoned Wind Globes", "Ranged", 1, "3+", "4+", "1", "1", ["Anti-Infantry (+1 Rend)", "Shoot in Combat"], '10"')], abilityName: "Gas Clouds", abilityText: "Add 1 Damage against enemy units with 10 or more models.", imageAlias: "ratling-warpblaster" },
    { id: "doom-flayers", name: "Doom-Flayers", points: 100, models: 2, move: '2D6+3"', health: 4, control: 1, save: "4+", base: "50mm", clans: ["Skryre", "War Machine"], weapons: [weapon("Whirling Blades", "Melee", 4, "3+", "3+", "2", "2", ["Anti-Infantry (+1 Rend)", "Charge (+1 Damage)"])], abilityName: "Whirling Doom", abilityText: "After charging, on a 2+ inflict mortal damage equal to a D3 roll on an enemy within 1\".", imageAlias: "krittok-foulblade" },
    { id: "doomwheel", name: "Doomwheel", points: 100, models: 1, move: '2D6+7"', health: 8, control: 3, save: "4+", base: "105 × 70mm", clans: ["Skryre", "War Machine"], weapons: [weapon("Warp Bolts", "Ranged", "D6", "3+", "3+", "2", "D3", ["Shoot in Combat"], '13"'), weapon("Grinding Wheels", "Melee", 6, "3+", "2+", "1", "2", ["Charge (+1 Damage)"])], abilityName: "Rolling Doom", abilityText: "Move through models and enemy combat ranges, then roll for mortal damage against up to 3 crossed enemy units." },
    { id: "ratling-guns", name: "Ratling Guns", points: 170, models: 3, move: '5"', health: 3, control: 1, save: "5+", base: "60 × 35mm", clans: ["Skryre", "Infantry", "Weapon Team"], weapons: [weapon("Ratling Guns", "Ranged", "3D6", "4+", "4+", "1", "1", ["Crit (2 Hits)"], '15"')], abilityName: "Hidden Weapon Team", abilityText: "Not visible beyond 13\" while sheltered by a Clanrats unit and no other Weapon Team shares that combat range.", imageAlias: "ratling-warpblaster" },
    { id: "ratling-warpblaster", name: "Ratling Warpblaster", points: 110, models: 1, move: '4"', health: 8, control: 2, save: "4+", base: "105 × 70mm", clans: ["Skryre", "War Machine"], weapons: [weapon("Hail of Warpstone Bullets", "Ranged", "3D6+3", "4+", "3+", "1", "1", ["Crit (Auto-wound)"], '20"')], abilityName: "More-more Warpstone Bullets!", abilityText: "Near a Skryre Hero, use 6D6+3 Attacks; each unmodified hit roll of 1 inflicts 1 mortal damage on this unit." },
    { id: "warp-grinder", name: "Warp-Grinder", points: 100, models: 1, move: '4"', health: 8, control: 2, save: "4+", base: "90 × 52mm", clans: ["Skryre", "War Machine"], weapons: [weapon("Warpstone Drill-fang", "Melee", 4, "4+", "2+", "2", "D3")], abilityName: "Tunnel Skulkers", abilityText: "Deploy this unit and one non-Monster Skaven unit in the tunnels below, then attempt a close-range warp ambush.", imageAlias: "warp-lightning-cannon" },
    { id: "warp-lightning-cannon", name: "Warp Lightning Cannon", points: 120, models: 1, move: '3"', health: 8, control: 2, save: "4+", base: "120 × 92mm", clans: ["Skryre", "War Machine"], weapons: [weapon("Warp Lightning Blast", "Ranged", "2D6", "4+", "-", "-", "1 mortal", [], '20"')], abilityName: "More-more Warp Lightning!", abilityText: "Near a Skryre Hero, add 6 Attacks; unmodified hit rolls of 1 inflict D3 mortal damage on the cannon." },
    { id: "warpfire-throwers", name: "Warpfire Throwers", points: 120, models: 3, move: '5"', health: 3, control: 1, save: "5+", base: "60 × 35mm", clans: ["Skryre", "Infantry", "Weapon Team"], weapons: [weapon("Warpfire Throwers", "Ranged", "2D6", "2+", "4+", "2", "1", ["Shoot in Combat"], '10"')], abilityName: "Hidden Weapon Team", abilityText: "Not visible beyond 13\" while sheltered by Clanrats and no other Weapon Team shares that combat range.", imageAlias: "ratling-warpblaster" },
    { id: "warplock-jezzails", name: "Warplock Jezzails", points: 120, models: 3, move: '5"', health: 2, control: 1, save: "4+", base: "60 × 35mm", clans: ["Skryre", "Infantry", "Champion"], weapons: [weapon("Warplock Jezzails", "Ranged", 2, "4+", "3+", "2", "2", ["Crit (Auto-wound)"], '18"')], abilityName: "Warpstone Snipers", abilityText: "If stationary and not set up this turn, add 6\" to the weapon's Range." },
    { id: "warpvolt-scourgers", name: "Warpvolt Scourgers", points: 170, models: 3, move: '5"', health: 3, control: 1, save: "5+", base: "60 × 35mm", clans: ["Skryre", "Infantry", "Weapon Team"], weapons: [weapon("Warpvolt Scourgers", "Ranged", "2D6", "2+", "3+", "2", "1", ["Anti-Cavalry (+1 Rend)"], '15"')], abilityName: "Hidden Weapon Team", abilityText: "Not visible beyond 13\" while sheltered by Clanrats and no other Weapon Team shares that combat range.", imageAlias: "ratling-warpblaster" },
    { id: "clanrats", name: "Clanrats", points: 150, models: 20, move: '6"', health: 1, control: 1, save: "5+", base: "25mm", clans: ["Verminus", "Infantry", "Champion", "Musician (1/20)"], weapons: [weapon("Rusty Weapons", "Melee", 2, "4+", "5+", "0", "1", ["Crit (Auto-wound)"])], abilityName: "Seething Swarm", abilityText: "At the end of any turn, return D3 slain models to this unit." },
    { id: "stormvermin", name: "Stormvermin", points: 110, models: 10, move: '6"', health: 1, control: 1, save: "4+", base: "28.5mm", clans: ["Verminus", "Infantry", "Champion", "Musician (1/10)"], weapons: [weapon("Stormvermin Weapons", "Melee", 3, "3+", "3+", "1", "1", ["Anti-Charge (+1 Rend)"])], abilityName: "Elite Bodyguard", abilityText: "Friendly Skaven Infantry Heroes have Ward (5+) while within this unit's combat range.", imageAlias: "krittok-foulblade" },
    { id: "plaguepack", name: "Plaguepack", points: 130, models: 5, move: '6"', health: 1, control: 1, save: "5+", base: "Mixed", clans: ["Priest (1)", "Pestilens", "Infantry", "Champion (1/5)"], weapons: [weapon("Weapons of Corruption", "Melee", 2, "4+", "4+", "1", "1", ["Crit (Auto-wound)"]), weapon("Plague Censer", "Melee", 4, "4+", "3+", "2", "2", ["Crit (Auto-wound)"])], abilityName: "Enshrouding Fumes", abilityText: "Subtract 1 from hit rolls for shooting attacks that target this unit.", reinforce: false },
    { id: "plagueclaw", name: "Plagueclaw", points: 100, models: 1, move: '3"', health: 8, control: 2, save: "4+", base: "120 × 92mm", clans: ["Pestilens", "War Machine"], weapons: [weapon("Plagueclaw Catapult", "Ranged", 1, "3+", "2+", "2", "D6", ["Anti-Infantry (+1 Rend)"], '24"')], abilityName: "Bubonic Barrage", abilityText: "After shooting one enemy, it can gain Strike-last depending on how many models the catapult slew." },
    { id: "plague-monks", name: "Plague Monks", points: 140, models: 20, move: '6"', health: 1, control: 1, save: "6+", base: "25mm", clans: ["Pestilens", "Infantry", "Champion", "Musician (1/20)", "Standard Bearer (1/20)"], weapons: [weapon("Foetid Weapons", "Melee", 2, "4+", "4+", "0", "1", ["Crit (Auto-wound)"])], abilityName: "Spreaders of Filth and Disease", abilityText: "Each model slain in combat inflicts 1 mortal damage back on a 6+." },
    { id: "rat-ogors", name: "Rat Ogors", points: 140, models: 3, move: '6"', health: 4, control: 1, save: "5+", base: "50mm", clans: ["Moulder", "Infantry"], weapons: [weapon("Warpfire Gun", "Ranged", 2, "4+", "3+", "2", "2", ["Shoot in Combat"], '10"'), weapon("Claws, Blades and Fangs", "Melee", 5, "4+", "2+", "2", "2")], abilityName: "Unleashed Warp-fury", abilityText: "Suffer D3 mortal damage to add 1 Attack to this unit's melee weapons for the rest of the turn." },
    { id: "hell-pit-abomination", name: "Hell Pit Abomination", points: 200, models: 1, move: '7"', health: 14, control: 5, save: "4+", base: "120 × 92mm", clans: ["Moulder", "Monster"], weapons: [weapon("Gnashing Teeth and Flailing Fists", "Melee", 13, "4+", "2+", "2", "2", ["Anti-Infantry (+1 Rend)", "Companion"])], abilityName: "Too Horrible to Die", abilityText: "The first time it would be destroyed, roll to die, disgorge damaging rats or survive and Heal (D6)." },
    { id: "brood-terror", name: "Brood Terror", points: 220, models: 1, move: '8"', health: 14, control: 5, save: "4+", base: "90mm", clans: ["Moulder", "Monster"], weapons: [weapon("Warpflame Scourger", "Ranged", "2D6", "4+", "3+", "2", "1", ["Anti-Infantry (+1 Rend)"], '15"'), weapon("Chain-flail", "Melee", 5, "3+", "2+", "2", "3", ["Crit (Mortal)"])], abilityName: "Regenerating Terror", abilityText: "At the end of any turn, Heal (D6) this unit." },
    { id: "night-runners", name: "Night Runners", points: 130, models: 10, move: '7"', health: 1, control: 1, save: "6+", base: "28.5mm", clans: ["Eshin", "Infantry", "Champion"], weapons: [weapon("Slings and Poisoned Stars", "Ranged", 2, "4+", "4+", "0", "1", ["Crit (Auto-wound)", "Shoot in Combat"], '10"'), weapon("Poisoned Blades", "Melee", 2, "4+", "5+", "1", "1", ["Crit (Mortal)"])], abilityName: "Slinking Advance", abilityText: "In the deployment phase, this unit can use a Normal Move ability.", reinforce: false, imageAlias: "gutter-runners" },
    { id: "gutter-runners", name: "Gutter Runners", points: 150, models: 10, move: '7"', health: 1, control: 1, save: "5+", base: "Mixed", clans: ["Eshin", "Infantry"], weapons: [weapon("Eshin Throwing Stars", "Ranged", 2, "3+", "4+", "1", "1", ["Crit (Auto-wound)", "Shoot in Combat"], '10"'), weapon("Poisoned Blades", "Melee", 3, "3+", "4+", "1", "1", ["Crit (Mortal)"])], abilityName: "Masters of Infiltration", abilityText: "Elite Eshin operatives that infiltrate ahead of the swarm and strike exposed targets.", reinforce: false },
  ].map((entry) => createUnit({
    id: entry.id, name: entry.name, points: entry.points, models: entry.models,
    imageAlias: entry.imageAlias ?? null,
    move: entry.move, health: entry.health, control: entry.control, save: entry.save, baseSize: entry.base,
    keywords: entry.clans,
    rules: { monster: entry.clans.includes("Monster"), priest: entry.id === "plaguepack" ? 1 : 0, canBeReinforced: entry.reinforce !== false },
    weapons: entry.weapons,
    abilities: [ability(entry.abilityName, entry.abilityName.includes("Hidden") ? null : "Ability", entry.abilityText, entry.abilityName.includes("Hidden") ? "Passive" : "Ability")],
  })),
];

export default units;

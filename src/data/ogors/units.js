import { ability, createOrrukUnit, weapon } from "../orrukWarclans/unitFactory";

const make = (config) => createOrrukUnit({ faction: "ogors", ...config });
const unpublished = "El escaneo no incluye un perfil de batalla con puntos o tamaño de peana para esta unidad.";
const noPoints = { points: null, baseSize: "Pendiente de publicación", notes: unpublished };

const units = [
  make({
    id: "morga-the-mighty", name: "Morga the Mighty", ...noPoints,
    move: '10"', health: 16, control: 10, save: "3+",
    regimentOptions: ["Any Ogor Mawtribes"],
    keywords: ["Warmaster", "Unique", "Hero", "Monster", "Destruction", "Ogor Mawtribes", "Ogor", "Gutbusters"],
    rules: { hero: true, unique: true, monster: true, warmaster: true, companion: true, canBeReinforced: false },
    weapons: [
      weapon("The Meatfist Masher", "Melee", 4, "3+", "2+", "2", "3", ["Crit (Mortal)"]),
      weapon("Grutta's Horn and Hooves", "Melee", 8, "4+", "2+", "2", "3", ["Charge (+1 Damage)", "Companion"]),
    ],
    abilities: [
      ability("Battle Damaged", null, "While this unit has 10 or more damage points, Grutta's Horn and Hooves has 5 Attacks.", "Passive"),
      ability("An Ogor's Ogor", null, "More than 1 effect of Eat 'Em Alive can apply to this unit at the same time, but each effect can only be applied once.", "Passive"),
      ability("A Light Snack", "Any Combat Phase", "Pick an enemy unit in combat and roll a dice. If the roll exceeds the target's Health characteristic, 1 model in it is slain.", "Once Per Turn (Army)", ["Rampage"]),
      ability("Been There, Ate That", "End of Any Turn", "If this unit's combat attacks destroyed a non-Monster enemy, Heal (D3). If they damaged and destroyed an enemy Monster, Heal (D3+3).", "Ability"),
      ability("Violent Encouragement", "Any Combat Phase", "Pick a visible friendly Ogor Mawtribes unit wholly within 12\". Until the end of the phase, before it is damaged its attackers suffer 1 mortal damage after fighting for each unmodified hit roll of 1; after it is damaged, add 1 Attack to its melee weapons.", "Ability"),
    ],
  }),
  make({
    id: "grell-firefist", name: "Grell Firefist", ...noPoints,
    move: '6"', health: 8, control: 3, save: "5+",
    keywords: ["Unique", "Hero", "Infantry", "Destruction", "Ogor Mawtribes", "Ogor", "Gutbusters"],
    rules: { hero: true, unique: true, canBeReinforced: false },
    weapons: [
      weapon("Blastbelch", "Ranged", "D3+2", "4+", "2+", "2", "2", [], '12"'),
      weapon("Maneater Cleaver", "Melee", 4, "4+", "2+", "2", "2", ["Crit (Mortal)"]),
    ],
    abilities: [
      ability("Ogor-made Ammunition", "Any Shooting Phase", "Pick a visible enemy within 6\". All this unit's shooting attacks must target it and Blastbelch has D6+2 Attacks for the phase.", "Ability"),
      ability("Thunderous Diversion", "Your Shooting Phase", "Pick a friendly Ogor Mawtribes unit in combat with an enemy damaged by Blastbelch this turn. It can Retreat and can still Charge later this turn; that Retreat inflicts no mortal damage.", "Ability"),
      ability("Oi! Pay Attention, Slobs!", "Reaction: Opponent declared a command", "For a visible enemy within 6\", allocate D3 damage to another visible friendly Ogor Mawtribes unit within 3\". The command has no effect, still counts as used, and its command points are refunded.", "Once Per Turn (Army)"),
    ],
  }),
  make({
    id: "tyrant-on-glutthorn", name: "Tyrant on Glutthorn", ...noPoints,
    move: '10"', health: 16, control: 8, save: "3+",
    keywords: ["Hero", "Monster", "Destruction", "Ogor Mawtribes", "Ogor", "Gutbusters"],
    rules: { hero: true, monster: true, companion: true, canBeReinforced: false },
    weapons: [
      weapon("Tyrant's Meatcleavers", "Melee", 4, "4+", "2+", "2", "2", ["Crit (Mortal)"]),
      weapon("Glutthorn's Horn and Hooves", "Melee", 7, "4+", "2+", "2", "2", ["Charge (+1 Damage)", "Companion"]),
    ],
    abilities: [
      ability("Battle Damaged", null, "While this unit has 10 or more damage points, Glutthorn's Horn and Hooves has 5 Attacks.", "Passive"),
      ability("Gathering Momentum", null, "You can re-roll 1 dice in charge rolls for this unit.", "Passive"),
      ability("Glutthorn Stampede", "Any Combat Phase", "If this unit charged, pick an enemy in combat and roll a dice. On a 3+, the target has Strike-last for the turn.", "Once Per Turn (Army)", ["Rampage"]),
    ],
  }),
  make({
    id: "tyrant", name: "Tyrant", points: 130,
    move: '6"', health: 10, control: 3, save: "3+", baseSize: "50mm",
    regimentOptions: ["0-1 Bloodpelt Hunter", "Any Ogor Mawtribes"],
    keywords: ["Hero", "Infantry", "Destruction", "Ogor Mawtribes", "Ogor", "Gutbusters"],
    rules: { hero: true, canBeReinforced: false },
    weapons: [weapon("Tyrant's Meatcleavers", "Melee", 4, "4+", "2+", "2", "3", ["Crit (Mortal)"])],
    abilities: [
      ability("Big Name", "Deployment Phase", "Choose Neck-wringer (enemy Infantry with Health 1 or 2 cannot contest objectives in combat with this unit), Steed-eater (enemy Cavalry cannot Retreat from this unit), or Giant-wrestler (enemy Monsters cannot use Rampages in combat with this unit).", "Ability"),
      ability("Bully of the First Degree", null, "Enemy units cannot use Retreat abilities while they are in combat with this unit.", "Passive"),
      ability("Command the Avalanche", "Reaction: You declared a Fight ability", "Pick a visible friendly non-Hero Ogor Mawtribes Infantry unit in this unit's combat range that has not fought. It can fight immediately after this unit and gains +1 to hit for the turn.", "Reaction"),
    ],
  }),
  make({
    id: "maulbeast-cavalry", name: "Maulbeast Cavalry", models: 2, ...noPoints,
    baseSize: "90 × 52mm",
    move: '10"', health: 5, control: 1, save: "3+",
    keywords: ["Cavalry", "Champion", "Destruction", "Ogor Mawtribes", "Ogor", "Gutbusters"],
    rules: { companion: true },
    weapons: [
      weapon("Gutbiter Weapons", "Melee", 3, "4+", "2+", "2", "3"),
      weapon("Maulbeast's Horns and Fangs", "Melee", 4, "4+", "2+", "1", "2", ["Charge (+1 Damage)", "Companion"]),
    ],
    abilities: [
      ability("Ravenous Counter-attack", null, "Enemy units do not count as having charged while they are in combat with this unit.", "Passive"),
      ability("Shock and Gore", "Any Combat Phase", "If this unit charged, pick an enemy in combat and roll a dice. On a 3+, subtract 1 from wound rolls for the target's attacks for the turn.", "Once Per Turn (Army)"),
    ],
  }),
  make({
    id: "gluttons", name: "Gluttons", models: 5, ...noPoints,
    move: '6"', health: 4, control: 2, save: "5+", baseSize: "40mm",
    keywords: ["Infantry", "Champion", "Musician (1/5)", "Destruction", "Ogor Mawtribes", "Ogor", "Gutbusters"],
    weapons: [weapon("Glutton Weapons", "Melee", 4, "4+", "2+", "1", "2")],
    abilities: [ability("Wall of Meat", null, "Add 1 to save rolls for this unit if it has not charged this turn.", "Passive")],
  }),
  make({
    id: "ironguts", name: "Ironguts", models: 3, ...noPoints,
    move: '4"', health: 4, control: 2, save: "4+", baseSize: "40mm",
    keywords: ["Infantry", "Champion", "Destruction", "Ogor Mawtribes", "Ogor", "Gutbusters"],
    weapons: [weapon("Irongut Weapon", "Melee", 3, "4+", "2+", "2", "3")],
    abilities: [
      ability("Down to the Ironguts", null, "Friendly Gutbusters Heroes have Ward (5+) while wholly within 6\" of this unit.", "Passive"),
      ability("Violent Reminder", "Any Charge Phase", "This unit can use Bull Charge even if another friendly unit has used it this turn.", "Once Per Turn (Army)"),
    ],
  }),
  make({
    id: "ironblaster", name: "Ironblaster", points: 160,
    move: '6"', health: 16, control: 2, save: "4+", baseSize: "120 × 92mm",
    keywords: ["War Machine", "Destruction", "Ogor Mawtribes", "Ogor", "Gutbusters"],
    rules: { companion: true, canBeReinforced: false },
    weapons: [
      weapon("Ironblaster Cannon Shot", "Ranged", 2, "4+", "2+", "2", "5", [], '18"'),
      weapon("Clubbers", "Melee", 2, "4+", "2+", "1", "2"),
      weapon("Rhinox's Sharp Horns", "Melee", 4, "4+", "2+", "1", "D3", ["Companion"]),
    ],
    abilities: [ability("Explosive Shells", "Any Shooting Phase", "After this unit shoots, pick the target and each other unit within 3\" of it. On a 3+, inflict mortal damage equal to the roll on the target and D3 mortal damage on each collateral target.", "Once Per Turn (Army)", ["Core", "Attack", "Shoot"])],
  }),
  make({
    id: "gnoblar-scraplauncher", name: "Gnoblar Scraplauncher", points: 120,
    move: '6"', health: 9, control: 2, save: "4+", baseSize: "120 × 92mm",
    keywords: ["War Machine", "Destruction", "Ogor Mawtribes"],
    rules: { companion: true, canBeReinforced: false },
    weapons: [
      weapon("Piles of Old Scrap", "Ranged", 12, "4+", "2+", "0", "1", ["Crit (2 Hits)"], '18"'),
      weapon("Rhinox's Sharp Horns and Crew's Weapons", "Melee", 3, "4+", "2+", "1", "D3", ["Companion"]),
    ],
    abilities: [ability("Rain of Crap", "Any Shooting Phase", "Pick an enemy damaged by this unit's shooting. Until your next turn, subtract the damage allocated by those attacks from its Move (minimum 1\"). On a 3+, it also cannot Run, Retreat or be removed and set up elsewhere.", "Once Per Turn (Army)")],
  }),
  make({
    id: "frostlord-on-stonehorn", name: "Frostlord on Stonehorn", points: 320,
    move: '10"', health: 15, control: 10, save: "4+", baseSize: "120 × 92mm",
    regimentOptions: ["0-1 Voice of the Everwinter", "Any Ogor Mawtribes"],
    keywords: ["Hero", "Monster", "Destruction", "Ogor Mawtribes", "Ogor", "Beastclaw"],
    rules: { hero: true, monster: true, companion: true, canBeReinforced: false },
    weapons: [
      weapon("Frost Spear", "Melee", 4, "4+", "2+", "2", "2", ["Charge (+1 Damage)"]),
      weapon("Stonehorn's Rock-hard Horns and Hooves", "Melee", 7, "4+", "2+", "2", "3", ["Charge (+1 Damage)", "Companion"]),
    ],
    abilities: [
      ability("Battle Damaged", null, "At 10 or more damage, Stonehorn's Rock-hard Horns and Hooves has 4 Attacks.", "Passive"),
      ability("Stone Skeleton", null, "Ignore the first damage point allocated to this unit in each phase.", "Passive"),
      ability("Enraged Roar", null, "While this unit is damaged, add 1 Attack to Companion weapons used by other friendly Ogor Mawtribes units in its combat range.", "Passive"),
      ability("Earth-shattering Charge", "Any Charge Phase", "If this unit charged and did not use Bull Charge, inflict D3 mortal damage on a visible enemy within 1\", roll 2D6 and move up to that distance through the target, ending in combat.", "Once Per Turn (Army)", ["Rampage"]),
    ],
  }),
  make({
    id: "frostlord-on-thundertusk", name: "Frostlord on Thundertusk", points: 230,
    move: '10"', health: 15, control: 10, save: "4+", baseSize: "120 × 92mm",
    regimentOptions: ["0-1 Voice of the Everwinter", "Any Ogor Mawtribes"],
    keywords: ["Hero", "Monster", "Destruction", "Ogor Mawtribes", "Ogor", "Beastclaw"],
    rules: { hero: true, monster: true, companion: true, canBeReinforced: false },
    weapons: [
      weapon("Ice Blast", "Ranged", 1, "4+", "2+", "1", "D3+2", ["Companion"], '12"'),
      weapon("Frost Spear", "Melee", 4, "4+", "2+", "2", "2", ["Charge (+1 Damage)"]),
      weapon("Thundertusk's Colossal Tusks", "Melee", 3, "4+", "2+", "1", "5", ["Anti-Infantry (+1 Rend)", "Companion"]),
    ],
    abilities: [
      ability("Battle Damaged", null, "At 10 or more damage, Thundertusk's Colossal Tusks has 2 Attacks.", "Passive"),
      ability("Blessed of the Old Ice", "Your Movement Phase", "On a 3+, a visible friendly Ogor Mawtribes unit wholly within 12\" can still Shoot and/or Charge after Retreating or Running this turn.", "Once Per Turn (Army)"),
      ability("Sweeping Tusks", "Any Movement Phase", "Pick an enemy in combat and roll a dice for each model in it. Each 5+ inflicts 1 mortal damage.", "Once Per Turn (Army)", ["Rampage"]),
    ],
  }),
  make({
    id: "huskard-on-stonehorn", name: "Huskard on Stonehorn", points: 290,
    move: '10"', health: 14, control: 10, save: "4+", baseSize: "120 × 92mm",
    regimentOptions: ["Any Beastclaw"], canJoinRegimentAs: ["voice-of-the-everwinter"],
    keywords: ["Hero", "Monster", "Priest (1)", "Destruction", "Ogor Mawtribes", "Ogor", "Beastclaw"],
    rules: { hero: true, monster: true, priest: 1, companion: true, canBeReinforced: false },
    weapons: [
      weapon("Chaintrap, Harpoon Launcher or Blood Vulture", "Ranged", 1, "4+", "3+", "1", "3", [], '15"'),
      weapon("Huskard's Punches and Kicks", "Melee", 4, "4+", "2+", "1", "1"),
      weapon("Stonehorn's Rock-hard Horns and Hooves", "Melee", 7, "4+", "2+", "2", "3", ["Charge (+1 Damage)", "Companion"]),
    ],
    abilities: [
      ability("Battle Damaged", null, "At 10 or more damage, Stonehorn's Rock-hard Horns and Hooves has 4 Attacks.", "Passive"),
      ability("Stone Skeleton", null, "Ignore the first damage point allocated to this unit in each phase.", "Passive"),
      ability("Primal Bellow", "Any Combat Phase", "Pick a friendly Ogor Mawtribes unit in combat range or an enemy in combat, and roll a dice (+2 if this unit charged). On a 4+, friendly Companion weapons gain Crit (2 Hits), or an enemy suffers -1 to hit, for the turn.", "Once Per Turn (Army)", ["Rampage"]),
    ],
  }),
  make({
    id: "huskard-on-thundertusk", name: "Huskard on Thundertusk", points: 220,
    move: '10"', health: 14, control: 10, save: "4+", baseSize: "120 × 92mm",
    regimentOptions: ["Any Beastclaw"], canJoinRegimentAs: ["voice-of-the-everwinter"],
    keywords: ["Hero", "Monster", "Priest (1)", "Destruction", "Ogor Mawtribes", "Ogor", "Beastclaw"],
    rules: { hero: true, monster: true, priest: 1, companion: true, canBeReinforced: false },
    weapons: [
      weapon("Chaintrap, Harpoon Launcher or Blood Vulture", "Ranged", 1, "4+", "3+", "1", "3", [], '15"'),
      weapon("Ice Blast", "Ranged", 1, "4+", "2+", "1", "D3+2", ["Companion"], '12"'),
      weapon("Huskard's Punches and Kicks", "Melee", 4, "4+", "2+", "1", "1"),
      weapon("Thundertusk's Colossal Tusks", "Melee", 3, "4+", "2+", "1", "5", ["Anti-Infantry (+1 Rend)", "Companion"]),
    ],
    abilities: [
      ability("Battle Damaged", null, "At 10 or more damage, Thundertusk's Colossal Tusks has 2 Attacks.", "Passive"),
      ability("Winter's Cruelty", "Any Shooting Phase", "Pick an enemy damaged by Ice Blast and roll. If the roll is no greater than the damage allocated, subtract 1 from the Damage of its weapons until your next turn.", "Once Per Turn (Army)"),
      ability("Freezing Aura", "Any Combat Phase", "If this unit did not charge, pick an enemy in combat. On a 3+, subtract 1 from the Attacks of its melee weapons for the turn.", "Once Per Turn (Army)", ["Rampage"]),
    ],
  }),
  make({
    id: "bloodpelt-hunter", name: "Bloodpelt Hunter", points: 110,
    move: '6"', health: 8, control: 3, save: "5+", baseSize: "40mm",
    regimentOptions: ["Any Gutbusters"], canJoinRegimentAs: ["tyrant-companion"],
    keywords: ["Hero", "Infantry", "Destruction", "Ogor Mawtribes", "Ogor", "Beastclaw"],
    rules: { hero: true, canBeReinforced: false },
    weapons: [
      weapon("Skullshatter Crossbow and Impaling Spear", "Ranged", 4, "4+", "3+", "1", "D3+1", ["Anti-Monster (+1 Rend)"], '15"'),
      weapon("Hacker-axe and Meatblade", "Melee", 5, "4+", "2+", "1", "2", ["Anti-Monster (+1 Rend)"]),
    ],
    abilities: [
      ability("Biggest-game Hunter", null, "Skullshatter Crossbow and Impaling Spear has Damage 4 when targeting a Monster.", "Passive"),
      ability("The First Shot's Mine!", "Your Shooting Phase", "Pick an enemy damaged by this unit's shooting. Friendly Beastclaw units gain +1 to hit with shooting attacks targeting it for the rest of the phase.", "Once Per Turn (Army)"),
    ],
  }),
  make({
    id: "mantrapper", name: "Mantrapper", points: 130,
    move: '6"', health: 8, control: 3, save: "5+", baseSize: "40mm [1], 50 × 25mm [1], 25mm [3]",
    regimentOptions: ["Any Beastclaw"], canJoinRegimentAs: ["voice-of-the-everwinter"],
    keywords: ["Hero", "Infantry", "Destruction", "Ogor Mawtribes", "Ogor", "Beastclaw"],
    rules: { hero: true, canBeReinforced: false },
    weapons: [
      weapon("Mantrap Launcher", "Ranged", 4, "3+", "3+", "1", "D3", ["Crit (Auto-wound)"], '15"'),
      weapon("Mantrapper's Hunting Knife", "Melee", 4, "4+", "2+", "1", "2"),
    ],
    abilities: [
      ability("Unlikely Entourage", null, "This unit begins with Sabrefang, Gnoblars and Trap accomplice tokens. Remove a token assigned to an enemy when that enemy is destroyed or removed.", "Passive"),
      ability("Just a Little Closer…", "Start of Battle Round", "Remove 1 accomplice token and place it next to a visible enemy unit.", "Once Per Turn (Army)"),
      ability("Trapped!", "Any Shooting Phase", "Pick an enemy damaged by this unit's shooting and roll D6, subtracting 1 per accomplice beside it. If lower than its Save, until your next turn it rolls 1 fewer charge dice (minimum 1) and loses Fly.", "Once Per Turn (Army)"),
    ],
  }),
  make({
    id: "hunters-with-sabrefangs", name: "Hunters with Sabrefangs", models: 5, ...noPoints,
    move: '6"', health: 4, control: 2, save: "5+",
    keywords: ["Infantry", "Champion", "Destruction", "Ogor Mawtribes", "Ogor", "Beastclaw"],
    rules: { companion: true },
    weapons: [
      weapon("Hunter's Crossbow", "Ranged", 3, "4+", "3+", "1", "2", ["Anti-Monster (+1 Rend)"], '15"'),
      weapon("Skinning Blades", "Melee", 2, "4+", "2+", "1", "2", ["Anti-Cavalry (+1 Rend)", "Anti-Monster (+1 Rend)"]),
      weapon("Sabrefang's Tusks and Claws", "Melee", 4, "4+", "3+", "1", "2", ["Companion"]),
    ],
    abilities: [
      ability("Through the Frosts", "Deployment Phase", "Remove this unit and set it up wholly within 3\" of terrain and more than 9\" from enemies. It cannot Move in the first turn of the first battle round.", "Once Per Battle (Army)"),
      ability("Ferocious Sabrefangs", "Any Combat Phase", "Pick an enemy in combat that charged this turn. Roll 2 dice per Sabrefang in this unit; each 3+ inflicts 1 mortal damage.", "Once Per Turn (Army)"),
    ],
  }),
  make({
    id: "maulbeast-raiders", name: "Maulbeast Raiders", models: 2, ...noPoints,
    baseSize: "90 × 52mm",
    move: '10"', health: 7, control: 3, save: "4+",
    keywords: ["Cavalry", "Champion", "Destruction", "Ogor Mawtribes", "Ogor", "Beastclaw"],
    rules: { companion: true },
    weapons: [
      weapon("Hunter Crossbow and Blood Vulture", "Ranged", 3, "4+", "3+", "1", "2", ["Shoot in Combat"], '15"'),
      weapon("Punches and Kicks", "Melee", 4, "4+", "2+", "1", "1"),
      weapon("Maulbeast's Horns and Fangs", "Melee", 4, "4+", "2+", "1", "2", ["Charge (+1 Damage)", "Companion"]),
    ],
    abilities: [ability("Relentless Predators", "Enemy Movement Phase", "If this unit is more than 9\" from all enemy units, it can move up to D6\". It cannot enter combat during that move.", "Once Per Turn (Army)")],
  }),
  make({
    id: "stonehorn-beastriders", name: "Stonehorn Beastriders", points: 260,
    move: '10"', health: 14, control: 10, save: "4+", baseSize: "120 × 92mm",
    keywords: ["Monster", "Destruction", "Ogor Mawtribes", "Ogor", "Beastclaw"],
    rules: { monster: true, companion: true, canBeReinforced: false },
    weapons: [
      weapon("Chaintrap, Harpoon Launcher or Blood Vulture", "Ranged", 1, "4+", "3+", "1", "3", [], '15"'),
      weapon("Punches and Kicks", "Melee", 4, "4+", "2+", "1", "1"),
      weapon("Stonehorn's Rock-hard Horns and Hooves", "Melee", 7, "4+", "2+", "2", "3", ["Charge (+1 Damage)", "Companion"]),
    ],
    abilities: [
      ability("Stone Skeleton", null, "Ignore the first damage point allocated to this unit in each phase.", "Passive"),
      ability("Stonehorn Avalanche", "Any Charge Phase", "If this unit charged and did not use Bull Charge, pick an enemy in combat or enemy terrain in combat range. On a 3+, inflict mortal damage.", "Once Per Turn (Army)", ["Rampage"]),
    ],
  }),
  make({
    id: "thundertusk-beastriders", name: "Thundertusk Beastriders", points: 180,
    move: '10"', health: 14, control: 10, save: "4+", baseSize: "120 × 92mm",
    keywords: ["Monster", "Destruction", "Ogor Mawtribes", "Ogor", "Beastclaw"],
    rules: { monster: true, companion: true, canBeReinforced: false },
    weapons: [
      weapon("Chaintrap, Harpoon Launcher or Blood Vulture", "Ranged", 1, "4+", "3+", "1", "3", [], '15"'),
      weapon("Ice Blast", "Ranged", 1, "4+", "2+", "1", "D3+2", ["Companion"], '12"'),
      weapon("Punches and Kicks", "Melee", 4, "4+", "2+", "1", "1"),
      weapon("Thundertusk's Colossal Tusks", "Melee", 3, "4+", "2+", "1", "5", ["Anti-Infantry (+1 Rend)", "Companion"]),
    ],
    abilities: [
      ability("Battle Damaged", null, "At 10 or more damage, Thundertusk's Colossal Tusks has 2 Attacks.", "Passive"),
      ability("Plough the Icepath", "Reaction: You declared a non-Charge Move", "Carry an eligible friendly Ogor Mawtribes Infantry unit wholly within 6\". After this move, set it up wholly within 6\" and out of combat; it cannot Charge this turn.", "Once Per Turn (Army)"),
      ability("Chilling Onslaught", "Any Combat Phase", "If this unit charged, pick an enemy in combat. On a 4+, subtract 1 from hit rolls for its attacks this turn.", "Once Per Turn (Army)", ["Rampage"]),
    ],
  }),
  make({
    id: "redd-the-maw", name: "Redd the Maw", ...noPoints,
    move: '6"', health: 18, control: 10, save: "5+", ward: "5+",
    keywords: ["Unique", "Hero", "Wizard (2)", "Infantry", "Ward (5+)", "Destruction", "Ogor Mawtribes", "Ogor", "Mawseekers"],
    rules: { hero: true, unique: true, wizard: 2, ward: "5+", canBeReinforced: false },
    weapons: [
      weapon("Redd's Ladle", "Melee", 5, "4+", "2+", "2", "3"),
      weapon("Mawseeker Acolytes' Blades and Gorger's Claws", "Melee", 8, "4+", "2+", "2", "2"),
    ],
    abilities: [
      ability("Battle Damaged", null, "At 10 or more damage, Mawseeker Acolytes' Blades and Gorger's Claws has 5 Attacks.", "Passive"),
      ability("Son of the Hungering One", null, "While wholly within 12\", friendly non-Mawseekers Ogor Mawtribes Infantry have Ward (6+) and friendly Mawseekers have Ward (5+).", "Passive"),
      ability("High Slaughtermaster", "Your Hero Phase", "Pick a visible friendly Ogor Mawtribes unit wholly within 12\". It can immediately use Eat 'Em Alive as if it were the end of the turn.", "Ability"),
      ability("The Maw Opens", "Your Hero Phase", "Cast on 7. Pick a visible friendly Ogor Mawtribes unit wholly within 12\". Out of combat it moves D3+3\" towards the nearest visible enemy without entering combat. In combat, inflict D3 mortals on each enemy and Heal (D3), or 3 and Heal (3) if it is Mawseekers.", "Spell", ["Spell"], 7),
    ],
  }),
  make({
    id: "butcher", name: "Butcher", points: 150,
    move: '6"', health: 8, control: 3, save: "6+", ward: "6+", baseSize: "50mm",
    regimentOptions: ["0-1 Gnoblar Scraplauncher", "Any Gutbusters", "Any Gnoblars", "Any Gorger Mawpack"],
    keywords: ["Hero", "Wizard (1)", "Infantry", "Ward (6+)", "Destruction", "Ogor Mawtribes", "Ogor", "Mawseekers"],
    rules: { hero: true, wizard: 1, ward: "6+", canBeReinforced: false },
    weapons: [weapon("Butcher's Tools", "Melee", 4, "4+", "2+", "2", "3")],
    abilities: [
      ability("Arcane Appetite", "Any Combat Phase", "If a friendly or enemy Wizard or Priest is within 6\", roll a dice. On a 3+, this unit's melee weapons gain Crit (2 Hits), or Crit (Mortal) if they already have it, for the turn.", "Ability"),
      ability("More Meat for the Pot…", "End of Any Turn", "Once per battle, if an enemy damaged by this unit's combat attacks or its manifestation was destroyed this turn, add 1 to this unit's power level for the rest of the battle.", "Once Per Battle (Army)"),
    ],
  }),
  make({
    id: "cleavers", name: "Cleavers", models: 5, ...noPoints,
    move: '6"', health: 4, control: 2, save: "5+", ward: "6+",
    keywords: ["Infantry", "Champion", "Ward (6+)", "Destruction", "Ogor Mawtribes", "Ogor", "Mawseekers"],
    rules: { ward: "6+" },
    weapons: [weapon("Cleaver's Tools", "Melee", 4, "4+", "2+", "2", "3")],
    abilities: [ability("Arcane Appetite", "Any Combat Phase", "If a friendly or enemy Wizard or Priest is within 6\", roll a dice. On a 3+, this unit's melee weapons gain Crit (2 Hits), or Crit (Mortal) if they already have it, for the turn.", "Ability")],
  }),
  make({
    id: "gutseers", name: "Gutseers", models: 3, ...noPoints,
    move: '6"', health: 5, control: 2, save: "6+", ward: "6+",
    keywords: ["Infantry", "Champion", "Ward (6+)", "Destruction", "Ogor Mawtribes", "Ogor", "Mawseekers"],
    rules: { ward: "6+" },
    weapons: [weapon("Gutseer's Tools", "Melee", 3, "4+", "2+", "2", "3")],
    abilities: [
      ability("Arcane Contortions", null, "Visible enemy Wizards and Priests within 12\" suffer -1 to casting and chanting rolls. Visible friendly Mawseekers Wizards wholly within 12\" gain +1 to casting rolls.", "Passive"),
      ability("Conduits of Gut Magic", "Any Hero Phase", "Measure range and visibility of the next spell used by a friendly Ogor Mawtribes Wizard wholly within 12\" and visible to this unit from this unit instead. This unit is treated as the caster for other effects.", "Once Per Turn (Army)"),
    ],
  }),
  make({
    id: "gorger-mawpack", name: "Gorger Mawpack", points: 240, models: 5,
    move: '9"', health: 6, control: 2, save: "5+", ward: "6+", baseSize: "50mm",
    keywords: ["Infantry", "Ward (6+)", "Destruction", "Ogor Mawtribes", "Ogor", "Mawseekers"],
    rules: { ward: "6+", canBeReinforced: false },
    weapons: [weapon("Clubs, Claws and Jaws", "Melee", 5, "4+", "2+", "1", "2", ["Anti-Infantry (+1 Rend)"])],
    abilities: [
      ability("Lurking on the Fringes", "Deployment Phase", "Set this unit in reserve instead of deploying it.", "Deploy"),
      ability("Driven by Hunger", "Your Movement Phase", "If lurking, set this unit up wholly within 9\" of a battlefield edge and more than 9\" from enemies.", "Ability"),
    ],
  }),
];

export default units;

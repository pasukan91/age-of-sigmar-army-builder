import { ability, createOrrukUnit, weapon } from "../orrukWarclans/unitFactory";

const make = (config) => createOrrukUnit({ faction: "ironjawz", ...config });
const anyIronjawz = ["any-ironjawz"];

const units = [
  make({
    id: "gordrakk-the-fist-of-gork", name: "Gordrakk, the Fist of Gork", points: 340,
    move: '10"', health: 20, control: 5, save: "3+", baseSize: "160mm",
    regimentOptions: ["0-1 Headstompa", "0-1 Tusk Wrangler", "Any Ironjawz"],
    keywords: ["Warmaster", "Unique", "Hero", "Monster", "Fly", "Destruction", "Ironjawz", "Maw-krusha"],
    rules: { hero: true, unique: true, monster: true, warmaster: true, companion: true, canBeReinforced: false },
    weapons: [
      weapon("Bigteef's Roar", "Ranged", 6, "2+", "3+", "1", "D3", ["Shoot in Combat", "Companion"], '8"'),
      weapon("Smasha and Kunnin'", "Melee", 8, "3+", "2+", "1", "2", ["Anti-Hero (+1 Rend)"]),
      weapon("Bigteef's Fists and Tail", "Melee", 8, "4+", "2+", "1", "3", ["Anti-Monster (+1 Rend)", "Companion"]),
    ],
    abilities: [
      ability("Battle Damaged", null, "While this unit has 10 or more damage points, Bigteef's Fists and Tail has 6 Attacks.", "Passive"),
      ability("Strength from Victory", "End of Any Turn", "If this unit's combat attacks helped destroy an enemy this turn, give it a Waaagh! token, to a maximum of 3. Until the end of the next turn, add 1 Attack to its weapons for each token.", "Ability"),
      ability("Monster Grapple", "Any Combat Phase", "Pick an enemy Monster in combat and roll. On a 3+, halve the Attacks of one of its weapons, choosing a Companion weapon if possible.", "Once Per Turn (Army)", ["Rampage"]),
      ability("Voice of Gork", "Reaction: Ironjawz Waaagh!", "Until your next turn, add 1 to hit rolls for combat attacks made by friendly Ironjawz units wholly within 18\".", "Once Per Battle"),
    ],
  }),
  make({
    id: "megaboss-on-maw-krusha", name: "Megaboss on Maw-krusha", points: 330,
    move: '10"', health: 18, control: 5, save: "3+", baseSize: "160mm",
    regimentOptions: ["0-1 Headstompa", "0-1 Tusk Wrangler", "Any Ironjawz"],
    keywords: ["Hero", "Monster", "Fly", "Destruction", "Ironjawz", "Maw-krusha"],
    rules: { hero: true, monster: true, companion: true, canBeReinforced: false },
    weapons: [
      weapon("Maw-krusha's Roar", "Ranged", 6, "2+", "3+", "1", "D3", ["Shoot in Combat", "Companion"], '8"'),
      weapon("Boss-choppa or Boss-hacka", "Melee", 8, "4+", "2+", "1", "2", ["Anti-Infantry (+1 Rend)"]),
      weapon("Maw-krusha's Fists and Tail", "Melee", 8, "4+", "2+", "1", "3", ["Anti-Infantry (+1 Rend)", "Companion"]),
    ],
    abilities: [
      ability("Battle Damaged", null, "While this unit has 10 or more damage points, Maw-krusha's Fists and Tail has 5 Attacks.", "Passive"),
      ability("Strength from Victory", "End of Any Turn", "Gain a Waaagh! token when this unit's combat attacks help destroy an enemy, to a maximum of 3. Each token adds 1 Attack until the end of the next turn.", "Ability"),
      ability("Destructive Bulk", "Any Combat Phase", "After charging, on a 2+ move 2D6\" through enemy combat ranges and into combat, then inflict mortal damage on one crossed enemy; double it against Infantry.", "Once Per Turn (Army)", ["Rampage"]),
    ],
  }),
  make({
    id: "megaboss", name: "Megaboss", points: 130,
    move: '4"', health: 8, control: 2, save: "3+", baseSize: "60mm",
    regimentOptions: ["0-1 Headstompa", "Any Ironjawz"], canJoinRegimentAs: ["headstompa"],
    keywords: ["Hero", "Infantry", "Destruction", "Ironjawz"],
    rules: { hero: true, canBeReinforced: false },
    weapons: [weapon("Boss-choppa", "Melee", 8, "4+", "2+", "1", "2")],
    abilities: [
      ability("Strength from Victory", "End of Any Turn", "Gain a Waaagh! token when this unit's combat attacks help destroy an enemy, to a maximum of 3. Each token adds 1 Attack until the end of the next turn.", "Ability"),
      ability("Lead Da Brutes", "Reaction: You declared a Fight ability", "Pick a friendly Brute unit in this unit's combat range that has not fought. It can fight immediately afterwards and gains +1 Attack for the turn.", "Reaction"),
    ],
  }),
  make({
    id: "tuskboss-on-maw-grunta", name: "Tuskboss on Maw-grunta", points: 270,
    move: '10"', health: 14, control: 5, save: "3+", baseSize: "120 × 92mm",
    regimentOptions: ["0-1 Headstompa", "Any Ironjawz"], canJoinRegimentAs: ["tusk-wrangler"],
    keywords: ["Hero", "Monster", "Destruction", "Ironjawz", "Maw-grunta"],
    rules: { hero: true, monster: true, companion: true, canBeReinforced: false },
    weapons: [
      weapon("Pig-hacka", "Melee", 7, "4+", "3+", "1", "2"),
      weapon("Kill-choppas", "Melee", 4, "3+", "4+", "1", "1"),
      weapon("Maw-grunta's Tusks", "Melee", 5, "4+", "2+", "2", "2", ["Companion"]),
      weapon("Maw-grunta's Trotters", "Melee", 4, "5+", "2+", "1", "D3", ["Companion"]),
    ],
    abilities: [
      ability("Battle Damaged", null, "While this unit has 10 or more damage points, Maw-grunta's Tusks has 3 Attacks.", "Passive"),
      ability("Unstoppable Momentum", null, "Gain 1 momentum point after a Charge and 2 after a Run, to a maximum of 3. Add momentum to the Damage of Maw-grunta's Tusks; lose 1 at each battle round's end.", "Passive"),
      ability("Head of the Stampede", "Any Charge Phase", "After this unit charges, up to 3 friendly Maw-grunta units wholly within 12\" that charged this turn gain 1 momentum point.", "Once Per Turn (Army)", ["Rampage"]),
    ],
  }),
  make({
    id: "zoggrok-anvilsmasha", name: "Zoggrok Anvilsmasha", points: 160,
    move: '4"', health: 7, control: 2, save: "3+", baseSize: "50mm [1], 25mm [1]",
    regimentOptions: anyIronjawz, canJoinRegimentAs: ["headstompa"],
    keywords: ["Unique", "Hero", "Infantry", "Destruction", "Ironjawz"],
    rules: { hero: true, unique: true, canBeReinforced: false },
    weapons: [
      weapon("Skull-crushing Basha", "Melee", 5, "4+", "2+", "1", "2"),
      weapon("Ward-smashing Choppa", "Melee", 3, "2+", "2+", "2", "2"),
      weapon("Grunta-tongs", "Melee", 4, "4+", "3+", "0", "1"),
    ],
    abilities: [
      ability("Power of Da Great Green God", "Your Hero Phase", "Pick an Ironjawz Infantry unit wholly within 12\" and make a forging roll. On a 4+, its melee weapons gain Crit (Mortal) until your next turn; Grunta-tongs add 1 to the roll.", "Ability"),
      ability("Klonk", null, "Klonk is a token. Re-roll forging rolls while it remains; remove it after an unmodified save roll of 1.", "Passive"),
      ability("Ward-smashing Choppa", null, "A unit hit by this weapon gains Ward-smashed for the battle and cannot make ward rolls.", "Passive"),
    ],
  }),
  make({
    id: "ardboy-big-boss", name: "Ardboy Big Boss", points: 90,
    move: '4"', health: 6, control: 2, save: "3+", baseSize: "40mm",
    regimentOptions: ["Any Infantry"], canJoinRegimentAs: ["headstompa"],
    keywords: ["Hero", "Infantry", "Destruction", "Ironjawz"],
    rules: { hero: true, canBeReinforced: false },
    weapons: [weapon("Boss-hacka and Choppa", "Melee", 7, "4+", "3+", "1", "2")],
    abilities: [
      ability("Iron-fisted Commander", null, "When a friendly Ardboyz unit wholly within 12\" uses Rally, make 3 additional rally rolls.", "Passive"),
      ability("Get Bashin'!", null, "Add 1 to shield bash rolls for friendly Ardboyz units wholly within 12\".", "Passive"),
    ],
  }),
  make({
    id: "warchanter", name: "Warchanter", points: 110,
    move: '4"', health: 6, control: 2, save: "4+", baseSize: "40mm",
    regimentOptions: anyIronjawz,
    keywords: ["Hero", "Priest (1)", "Infantry", "Destruction", "Ironjawz"],
    rules: { hero: true, priest: 1, canBeReinforced: false },
    weapons: [weapon("Gorkstikk and Morkstikk", "Melee", 6, "4+", "3+", "1", "D3")],
    abilities: [ability("Rhythm of Destruction", "End of Any Turn", "If enemy models were slain by this unit's combat attacks this turn, give this unit D3 ritual points.", "Ability")],
  }),
  make({
    id: "weirdnob-shaman", name: "Weirdnob Shaman", points: 110,
    move: '4"', health: 6, control: 2, save: "6+", baseSize: "40mm",
    regimentOptions: anyIronjawz,
    keywords: ["Hero", "Wizard (1)", "Infantry", "Destruction", "Ironjawz"],
    rules: { hero: true, wizard: 1, canBeReinforced: false },
    weapons: [
      weapon("Green Puke", "Ranged", 4, "2+", "4+", "1", "D3", ["Shoot in Combat"], '10"'),
      weapon("Waaagh! Staff", "Melee", 3, "4+", "3+", "1", "D3"),
    ],
    abilities: [ability("Brutal Power", null, "Add 1 to this unit's power level while a friendly Ironjawz unit with 10 or more models is wholly within 12\".", "Passive")],
  }),
  make({
    id: "ardboyz", name: "Ardboyz", points: 160, models: 10,
    move: '4"', health: 2, control: 1, save: "3+", baseSize: "32mm",
    keywords: ["Infantry", "Champion", "Standard Bearer (1/10)", "Destruction", "Ironjawz"],
    weapons: [weapon("Choppa or Stikka", "Melee", 2, "4+", "3+", "1", "1", ["Anti-Charge (+1 Rend)"])],
    abilities: [ability("Shield Bash", "Any Combat Phase", "Pick an enemy within 1\" and roll for each model in this unit within 3\" of it. Each 6+ inflicts 1 mortal damage.", "Ability")],
  }),
  make({
    id: "brutes", name: "Brutes", points: 160, models: 5,
    move: '4"', health: 3, control: 1, save: "3+", baseSize: "40mm",
    keywords: ["Infantry", "Champion", "Destruction", "Ironjawz", "Brute"],
    weapons: [
      weapon("Brute Weapons", "Melee", 3, "4+", "3+", "1", "2", ["Anti-Infantry (+1 Rend)"]),
      weapon("Gore-choppa", "Melee", 3, "4+", "3+", "2", "3"),
    ],
    abilities: [ability("You Messin'?", null, "Enemy units with Health 1 or 2 cannot contest objectives while in combat with this unit.", "Passive")],
  }),
  ...[
    { id: "weirdbrute-wrekkaz", name: "Weirdbrute Wrekkaz", points: 90, weaponName: "Chain-smasha", attacks: 6, ward: "5+", abilities: ["Anti-Infantry (+1 Rend)"], extra: [ability("Berserkers", null, "This unit can use Run abilities and still use Charge abilities later in the turn.", "Passive")] },
    { id: "brute-ragerz", name: "Brute Ragerz", points: 100, weaponName: "Rager Weapons", attacks: 3, ward: null, abilities: ["Anti-Monster (+1 Rend)"], extra: [ability("Berserkers", null, "This unit can use Run abilities and still use Charge abilities later in the turn.", "Passive"), ability("Unleashed Rage", null, "This unit has Strike-first if it charged in the same turn.", "Passive")] },
  ].map((entry) => make({
    id: entry.id, name: entry.name, points: entry.points, models: 3,
    move: '4"', health: 3, control: 1, save: "5+", ward: entry.ward, baseSize: "40mm",
    keywords: ["Infantry", ...(entry.ward ? [`Ward (${entry.ward})`] : []), "Destruction", "Ironjawz", "Brute"],
    weapons: [weapon(entry.weaponName, "Melee", entry.attacks, "4+", entry.id === "brute-ragerz" ? "2+" : "3+", "1", "2", entry.abilities)],
    abilities: entry.extra,
  })),
  make({
    id: "gore-gruntas", name: "Gore-gruntas", points: 160, models: 3,
    move: '9"', health: 5, control: 1, save: "3+", baseSize: "90 × 52mm",
    keywords: ["Cavalry", "Champion", "Destruction", "Ironjawz"],
    weapons: [
      weapon("Choppa or Hacka", "Melee", 4, "4+", "3+", "1", "1", ["Anti-Cavalry (+1 Rend)"]),
      weapon("Grunta's Tusks", "Melee", 4, "5+", "2+", "1", "1", ["Charge (+1 Damage)", "Companion"]),
    ],
    abilities: [ability("Gore-grunta Charge", "Any Charge Phase", "After charging, pick an enemy within 1\". On a 2+, inflict D3 mortal damage, adding 1 against Cavalry.", "Ability")],
  }),
  ...[
    { id: "maw-grunta-with-hakkin-krew", name: "Maw-grunta with Hakkin' Krew", points: 250, ability: ability("Carve a Path", "Your Movement Phase", "If in combat, move up to this unit's Move through models and combat ranges but not ending in combat. Roll a D3 for each crossed enemy; on a 2+, inflict that much mortal damage, then gain 2 momentum.", "Once Per Turn (Army)", ["Core", "Move", "Rampage"]) },
    { id: "maw-grunta-gougers", name: "Maw-grunta Gougers", points: 200, ability: ability("Flattened into the Mud", "Any Combat Phase", "After charging, pick an enemy within 1\", roll and add momentum. On a 5+, it has Strike-last for the rest of the turn.", "Once Per Turn (Army)", ["Rampage"]) },
  ].map((entry) => make({
    id: entry.id, name: entry.name, points: entry.points,
    move: '10"', health: 12, control: 5, save: "3+", baseSize: "120 × 92mm",
    keywords: ["Monster", "Destruction", "Ironjawz", "Maw-grunta"],
    rules: { monster: true, companion: true, canBeReinforced: false },
    weapons: [
      weapon("Choppas", "Melee", 4, "4+", "3+", "1", "2"),
      weapon("Maw-grunta's Tusks", "Melee", 5, "4+", "2+", "2", "2", ["Companion"]),
      weapon("Maw-grunta's Trotters", "Melee", 4, "5+", "2+", "1", "D3", ["Companion"]),
    ],
    abilities: [ability("Unstoppable Momentum", null, "Gain momentum after Run and Charge abilities, to a maximum of 3. Momentum adds to the Damage of the Maw-grunta's Tusks and drops by 1 each battle round.", "Passive"), entry.ability],
  })),
];

export default units;

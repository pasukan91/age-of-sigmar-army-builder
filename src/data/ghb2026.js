function createBattleplan(number, table, name, description) {
  return {
    id: `ghb-2026-battleplan-${number}`,
    name,
    number,
    table,
    season: "GHB 2026-27",
    image: `/images/battleplans/ghb-2026/battleplan-${number}.webp`,
    description: `Battleplan ${number} - Table ${table}\n${description}`,
  };
}

function createBattleTacticsCard(number, name, introduction, tactics) {
  return {
    id: `ghb-2026-battle-tactics-card-${number}`,
    name,
    number,
    season: "GHB 2026-27",
    tactics,
    description: [
      `Battle Tactics Card ${number}`,
      introduction,
      ...tactics.map((tactic) => `\n${tactic.type}: ${tactic.name}\n${tactic.condition}`),
    ].join("\n"),
  };
}

export const ghb2026Battleplans = [
  createBattleplan(
    1,
    1,
    "In the Flames",
    "Both armies gain Secure the Gate, while the underdog army gains Determined Defenders. Score by controlling one objective, two objectives, or more objectives than your opponent.",
  ),
  createBattleplan(
    2,
    1,
    "Bloody Ribs",
    "From the second battle round, Embershines and a temporary Hero enhancement come into play. The scoring conditions change after the first battle round.",
  ),
  createBattleplan(
    3,
    1,
    "Ash Avalanche",
    "The underdog can destabilise bridges and remove terrain features. Additional scoring conditions are tied to faction terrain.",
  ),
  createBattleplan(
    4,
    1,
    "The Caverns of Massacre",
    "Hidden passages allow terrain features to be removed and repositioned. Score by controlling one objective, two objectives, or more pairs of objectives than your opponent.",
  ),
  createBattleplan(
    5,
    1,
    "What's Yours Is Us",
    "A different desired objective pair is active each battle round. Once per battle, the underdog can change the active pair.",
  ),
  createBattleplan(
    7,
    2,
    "Deformed Ruins",
    "Neutral terrain features can be set ablaze and damage nearby units. The available ability changes depending on whether you are the underdog.",
  ),
  createBattleplan(
    8,
    2,
    "Curse of the Bitch",
    "Power Sites increase the instability of nearby units. The underdog can choose an objective and raise the instability of units contesting it.",
  ),
  createBattleplan(
    9,
    2,
    "Seize the Embers",
    "Units search objectives for Emberstone Nuggets and return them to their base camp to earn additional victory points.",
  ),
  createBattleplan(
    10,
    2,
    "Treacherous Terrain",
    "Objectives begin stable and can change between stable and unstable. Scoring depends on controlling stable objectives.",
  ),
  createBattleplan(
    11,
    2,
    "Flee the Coast",
    "Once per battle, the underdog can remove either the Golden Lions or the Soliphiles objective from the battlefield.",
  ),
  createBattleplan(
    12,
    2,
    "The Might of Kingdoms",
    "The Soliphiles objective is the primary objective and all others are secondary objectives. The underdog can destroy secondary objectives aligned with the primary objective.",
  ),
];

export const ghb2026BattleTacticsCards = [
  createBattleTacticsCard(1, "Flaming Assault", "The battle for control of a vital stronghold begins amid fire and smoke.", [
    {
      type: "Brawl",
      name: "Master of Weapons",
      condition: "The same enemy unit has taken at least 1 damage in 3 different phases this turn.",
    },
    {
      type: "Strike",
      name: "Break Their Defenses",
      condition: "You control the enemy lair at the end of your turn.",
    },
    {
      type: "Domination",
      name: "No Survivors",
      condition: "At least 2 enemy units were destroyed this turn and you control the enemy lair.",
    },
  ]),
  createBattleTacticsCard(2, "Siege of Ashes", "You hold a fort that blocks the enemy's path and must defend it to the death.", [
    {
      type: "Rift",
      name: "Form a Bulwark",
      condition: "At least 2 friendly units are entirely outside friendly territory, wholly within 6\" of it and within 3\" of each other.",
    },
    {
      type: "Strike",
      name: "Supply",
      condition: "You control an objective in enemy territory contested by a friendly unit that did not use a Move ability and another friendly unit that charged this turn.",
    },
    {
      type: "Domination",
      name: "Repel the Attackers",
      condition: "At least 3 friendly units are within 3\" of the centre of the battlefield and are not in combat.",
    },
  ]),
  createBattleTacticsCard(3, "Surrounded by Fire", "Flank and surround your enemies, leaving them no route of escape.", [
    {
      type: "Brawl",
      name: "Ambush",
      condition: "You control a combination of 2 objectives or terrain features, each contested by a different friendly unit wholly within 6\" of friendly territory that was not set up this turn.",
    },
    {
      type: "Strike",
      name: "Surround the Enemy",
      condition: "At least 2 friendly units set up this turn are each within 9\" of a different battlefield corner and entirely outside friendly territory.",
    },
    {
      type: "Domination",
      name: "Take What's Ours",
      condition: "There are 3 or more friendly units in enemy territory and at least 1 friendly Hero wholly within enemy territory.",
    },
  ]),
  createBattleTacticsCard(4, "Smokescreen", "Feign weakness and conceal your true strength in the smoke of battle.", [
    {
      type: "Chasing",
      name: "Keep the Enemy Close",
      condition: "You control an objective contested by at least 1 enemy unit.",
    },
    {
      type: "Strike",
      name: "Feign Weakness",
      condition: "More friendly units than enemy units were destroyed this turn.",
    },
    {
      type: "Domination",
      name: "Execute the Plan",
      condition: "You control all objectives located in enemy territory.",
    },
  ]),
  createBattleTacticsCard(6, "Legend of the Arid", "As a raging fire threatens to consume all, a hero rises and a legend is born.", [
    {
      type: "Brawl",
      name: "Daring Rescue",
      condition: "An enemy unit that was in melee at the start of the turn was destroyed by a combat attack made by a friendly unit that charged this turn.",
    },
    {
      type: "Strike",
      name: "Commanding on the Front",
      condition: "At least 2 friendly Heroes are on the battlefield, all within 9\" of a visible enemy unit, and none were killed this turn.",
    },
    {
      type: "Domination",
      name: "Legendary Hero",
      condition: "You control an objective wholly outside your territory that you did not control at the start of the turn, and a friendly Hero is contesting it.",
    },
  ]),
];

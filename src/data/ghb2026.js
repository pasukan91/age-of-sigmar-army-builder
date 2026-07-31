function section(label, text, title = null, timing = null) {
  return { label, title, timing, text };
}

function createBattleplan(number, table, name, sections, scoring) {
  const sectionText = sections.map((item) => [
    item.label,
    item.timing,
    item.title,
    item.text,
  ].filter(Boolean).join("\n"));

  return {
    id: `ghb-2026-battleplan-${number}`,
    name,
    number,
    table,
    season: "GHB 2026-27",
    image: `/images/battleplans/ghb-2026/battleplan-${number}.webp`,
    sections,
    scoring,
    description: [
      `Battle Plan ${number} (Table ${table})`,
      ...sectionText,
      "Each player scores victory points at the end of each of their turns as follows:",
      ...scoring,
    ].join("\n\n"),
  };
}

function createBattleTacticsCard(number, name, introduction, setup, tactics) {
  return {
    id: `ghb-2026-battle-tactics-card-${number}`,
    name,
    number,
    season: "GHB 2026-27",
    introduction,
    setup,
    tactics,
    description: [
      `Battle Tactics Card ${number}`,
      introduction,
      setup,
      ...tactics.map((tactic) => [
        `${tactic.type}: ${tactic.name}`,
        tactic.flavour,
        tactic.condition,
        `${tactic.points} Victory Points`,
      ].filter(Boolean).join("\n")),
    ].filter(Boolean).join("\n\n"),
  };
}

export const ghb2026Battleplans = [
  createBattleplan(1, 1, "In the Flames", [
    section("TWIST", "Both players' armies have the \"Secure the Gate\" ability. While you are the underdog, your army has the \"Determined Defenders\" ability."),
    section("ABILITY", "Effect: While you control the Power Site that is entirely within your territory, friendly units' melee weapons have Anti-Charge (+1 Perf.) while contesting an objective you control.", "SECURE THE GATE", "Passive"),
    section("ABILITY", "Effect: Add 3 to the control scores of friendly units while they are entirely outside enemy territory.", "DETERMINED DEFENDERS", "Passive"),
  ], [
    "Score 3 victory points if you control at least 1 objective.",
    "Score 3 victory points if you control at least 2 objectives.",
    "Score 4 victory points if you control more objectives than your opponent.",
  ]),

  createBattleplan(2, 1, "Bloody Ribs", [
    section("TWIST", "Starting in the 2nd round, both players may use the following abilities:"),
    section("ABILITY", "Announcement: Choose as your target a friendly unit that charged this turn and has one or more emberston shards.\n\nEffect: Choose 1 of the following effects to apply for the rest of the turn:\n\nAdd 1 to the target's hit rolls for melee attacks.\n\nAdd 1 to the target's wound rolls for melee attacks.\n\nThen, if you are the underdog, remove all emberston shards from the target. Otherwise, remove all emberston shards from all friendly units.", "EMBERSTONES", "Any Melee Phase"),
    section("ABILITY", "Announcement: Choose as your target a friendly unit contesting an objective you control.\n\nEffect: Give the target one Emberstone Shard.", "EMBERSTONES CACHE", "Once Per Turn (Army), Your Hero Phase"),
  ], [
    "Score 3 victory points if you control at least 1 objective.",
    "Score 3 victory points if you control at least 2 objectives.",
    "In the first battle round, score 4 victory points if you control more objectives than your opponent.",
    "From the second battle round onward, score 4 victory points if you control an objective your opponent controlled at the start of the turn.",
  ]),

  createBattleplan(3, 1, "Ash Avalanche", [
    section("TWIST", "If you are the underdog, you must use the following ability:"),
    section("ABILITY", "Announcement: Choose all objectives as targets. Then choose 1 of the targets to be the focus point.\n\nEffect: Roll one die for each target. Add 1 to the result for each unit (friend and foe) contesting it. If the target is the focus point, you may add 3 or subtract 3 from the roll. On 8 or higher, remove the target from the battlefield.", "UNSTABLE PASSAGE", "Once per Battle Round, Start of Battle Round"),
  ], [
    "Score 3 victory points if you control at least 1 objective.",
    "Score 3 victory points if you control at least 2 objectives.",
    "Score 4 victory points if you control more objectives than your opponent.",
    "Score 3 victory points if there is only one objective on the battlefield and you control a terrain feature other than a FACTION TERRAIN in enemy territory.",
    "Score 7 victory points if there are no objectives on the battlefield and you control more terrain features other than FACTION TERRAINS than your opponent.",
  ]),

  createBattleplan(4, 1, "The Caverns of Massacre", [
    section("TWIST", "If you are the underdog, you may use the \"Moving Passages\" ability. Both players may use the \"Negotiate Tunnels\" ability."),
    section("ABILITY", "Announcement: Target 2 terrain features other than FACTION TERRAINS.\n\nEffect: Remove all hidden passage tokens from the battlefield (if any). Then give each target a hidden passage token.", "MOVING PASSAGES", "Once per Battle Round, Start of Battle Round"),
    section("ABILITY", "Announcement: Target a friendly unit entirely within 6\" of a terrain feature that has a hidden passage token.\n\nEffect: Remove the target from the battlefield and replace it entirely 6\" away from any other terrain feature that has a hidden passage token, and more than 9\" away from enemy units.", "NEGOTIATE TUNNELS", "Once per Turn (Army), Your Movement Phase"),
  ], [
    "Score 3 victory points if you control at least 1 objective.",
    "Score 3 victory points if you control at least 2 objectives.",
    "Score 4 victory points if you control one or more pairs of objectives.",
  ]),

  createBattleplan(5, 1, "What's Yours Is Us", [
    section("TWIST", "If the current round number is odd, the Golden Lions' objective pair is the coveted objective pair.\n\nIf the current round number is even, the Soliphiles' objective pair is the coveted objective pair.\n\nIf you are the underdog, you may use the following ability:"),
    section("ABILITY", "Announcement: Choose one objective pair as your target.\n\nEffect: For the remainder of the battle round, the target is the coveted objective pair (instead of the other objective pair).", "UNLEASH YOUR FURY", "Once per Battle Round, Start of Battle Round"),
  ], [
    "Score 3 victory points if you control at least 1 objective.",
    "Score 3 victory points if you control the desired pair of objectives.",
    "Score 4 victory points if you control more objectives than your opponent.",
  ]),

  createBattleplan(7, 2, "Deformed Ruins", [
    section("SETUP", "Each terrain item other than a FACTION TERRAIN must be placed within 12\" of at least 1 other terrain item other than a FACTION TERRAIN."),
    section("TWIST", "If you are the underdog, you must use the ability opposite:"),
    section("ABILITY", "Announcement: If there are no burning terrain features on the battlefield, target any terrain feature other than a FACTION TERRAIN. Otherwise, target any terrain feature other than a FACTION TERRAIN that is not burning and is within 12\" of a burning terrain feature.\n\nEffect: The target is set on fire for the rest of the battle. Then deal D3 lethal damage to each unit (friend and foe) within 6\" of one or more burning terrain features.", "THE CURSE FLAME SPREADS", "Once per Battle Round, Start of Battle Round"),
  ], [
    "Score 3 victory points if you control at least 1 objective.",
    "Score 3 victory points if you control one or more pairs of objectives.",
    "Score 4 victory points if you control more objectives than your opponent.",
  ]),

  createBattleplan(8, 2, "Curse of the Bitch", [
    section("TWIST", "At the start of the battle, the instability level is 1. Each time either player uses the \"Power Site Activation\" ability, add 1 to the instability level, up to a maximum of 6.\n\nAfter deciding who will take the first turn, the underdog may use the following ability:"),
    section("ABILITY", "Announcement: Choose an objective as your target.\n\nEffect: Deal lethal damage to each unit (friend and foe) contesting the target equal to the instability level. Then reset the instability level to 1.", "TOWN ECHOES", "Once per Battle Round, Start of Battle Round"),
  ], [
    "Score 3 victory points if you control the Golden Lions' objective.",
    "Score 3 victory points if you control the Soliphiles' objective.",
    "Score 4 victory points if you control more objectives than your opponent.",
  ]),

  createBattleplan(9, 2, "Seize the Embers", [
    section("EVENT", "Both players may use the following abilities:"),
    section("ABILITY", "Announcement: Target a friendly unit that does not have an Emberstone Nugget and is contesting a Soliphiles objective.\n\nEffect: Give the target an Emberstone Nugget. If you are the underdog, the target may move immediately 6\", but cannot end that move in melee. The target cannot use the \"Return to Base Camp\" or \"Break In\" abilities for the rest of the turn.", "SEARCH THE RUBBLE", "End of Your Turn"),
    section("ABILITY", "Announcement: Target a friendly unit that has an Emberstone Nugget, has not been placed this turn, and is contesting a Golden Lions objective.\n\nEffect: Remove the Emberstone Nugget from the target.", "RETURN TO BASE CAMP", "Once Per Turn (Army), End of Your Turn"),
  ], [
    "Score 3 victory points if you control at least 1 objective.",
    "In the first battle round, score 3 victory points if you control at least 2 objectives.",
    "From the second battle round onward, score 3 victory points if you used the \"Return to Base Camp\" ability that turn.",
    "Score 4 victory points if you control more objectives than your opponent.",
  ]),

  createBattleplan(10, 2, "Treacherous Terrain", [
    section("TWIST", "At the start of the battle, all objectives are stable.\n\nBoth players must use the \"Advance Cautiously\" ability. Then, starting in the 2nd round, if you are the underdog, you may use the \"Violent Shake\" ability."),
    section("ABILITY", "Announcement: Choose an objective in friendly territory as your target.\n\nEffect: The target is no longer stable.", "ADVANCE CAUTIOUSLY", "Once per Battle (Army), Start of First Battle Round"),
    section("ABILITY", "Announcement: Choose a pair of objectives as your targets.\n\nEffect: The stable target objective is no longer stable. Instead, the other target objective is stable.", "VIOLENT SHAKE", "Once per Battle Round, Start of Battle Round"),
  ], [
    "Score 3 victory points if you control at least 1 stable objective.",
    "Score 3 victory points if you control at least 2 stable objectives.",
    "Score 4 victory points if you control more stable objectives than your opponent.",
  ]),

  createBattleplan(11, 2, "Flee the Coast", [
    section("TWIST", "If you are the underdog, you may use the following ability:"),
    section("ABILITY", "Announcement: Choose as your target the Heldenhain objective or the Soliphiles objective.\n\nEffect: Remove the target from the battlefield.", "TO THE SHIPS!", "Once per Battle Round, Start of Battle Round"),
  ], [
    "Score 3 victory points if you control at least 1 objective.",
    "Score 3 victory points if you control at least 2 objectives.",
    "Score 4 victory points if you control more objectives than your opponent.",
  ]),

  createBattleplan(12, 2, "The Might of Kingdoms", [
    section("EVENT", "At the start of the battle, the Soliphiles' objective is the primary objective, and the other objectives are secondary objectives.\n\nIf you are the underdog, you may use the following ability:"),
    section("ABILITY", "Announcement: Choose a Power Site you control as your target.\n\nEffect: Draw a straight line from the center of the primary objective to the target. If this line passes through any secondary objectives, the first secondary objective it passes through is now the primary objective, and all other objectives are now secondary objectives.", "MYSTIC CHARGE", "Once per Battle Round, Start of Battle Round"),
  ], [
    "Score 3 victory points if you control the primary objective.",
    "Score 3 victory points if you control at least 2 secondary objectives.",
    "Score 4 victory points if you control more objectives than your opponent.",
  ]),
];

export const ghb2026BattleTacticsCards = [
  createBattleTacticsCard(
    1,
    "Flaming Assault",
    "Inaugurated by a hurricane of fire and smoke, the battle for control of a vital stronghold erupts in earnest.",
    "At the start of the battle, after using all Deployment Phase abilities but before determining who goes first, your opponent must choose 1 piece of terrain other than a FACTION TERRAIN in their territory to be their Lair. The Lair cannot be removed from the battlefield during this battle.",
    [
      { type: "Brawl", name: "Master of Weapons", flavour: "Successfully invading requires skill in all aspects of warfare.", condition: "You execute this battle tactic at the end of your turn if the same enemy unit has taken at least 1 damage in 3 different phases this turn.", points: 5 },
      { type: "Strike", name: "Break Their Defenses", flavour: "The enemy won't be able to hide for long...", condition: "You execute this battle tactic at the end of your turn if you control the enemy lair.", points: 5 },
      { type: "Domination", name: "No Survivors", flavour: "Make sure the only stories of this battle are those of your victory.", condition: "You execute this battle tactic at the end of your turn if at least 2 enemy units were destroyed this turn and you control the enemy lair.", points: 5 },
    ],
  ),
  createBattleTacticsCard(
    2,
    "Siege of Ashes",
    "You hold a fort that blocks the enemy's path, and will defend it to the death.",
    null,
    [
      { type: "Rift", name: "Form a Bulldoz", flavour: "A good defense begins with solid foundations.", condition: "You execute this battle tactic at the end of your turn if at least 2 friendly units are entirely outside friendly territory, entirely within 6\" of friendly territory, and within 3\" of each other.", points: 5 },
      { type: "Strike", name: "Supply", flavour: "A good general must choose precisely where and when to send reinforcements.", condition: "You execute this battle tactic at the end of your turn if you control an objective in enemy territory and that objective is contested by:\n\nAt least 1 friendly unit that has not used any MOVEMENT ability this turn.\n\nAt least 1 other friendly unit that has charged this turn.", points: 5 },
      { type: "Domination", name: "Repel the Attackers", flavour: "Unleash your inner fury and clear the battlefield of all enemy presence.", condition: "You execute this battle tactic at the end of your turn if there are at least 3 friendly units within 3\" of the center of the battlefield that are not in melee.", points: 5 },
    ],
  ),
  createBattleTacticsCard(
    3,
    "Surrounded by Fire",
    "The plan is simple: flank and surround your enemies, and make sure none of them escape.",
    null,
    [
      { type: "Brawl", name: "Ambush", flavour: "Send scouts to ambush the enemy.", condition: "You execute this battle tactic at the end of your turn if you control a combination of at least 2 objectives or terrain features, and each of them is contested by a different friendly unit within 6\" of friendly territory that was not placed this turn.", points: 5 },
      { type: "Strike", name: "Surround the Enemy", flavour: "Surround your enemies like flames surround the condemned.", condition: "You execute this battle tactic at the end of your turn if at least 2 friendly units that were not placed this turn are each within 9\" of a different corner of the battlefield and entirely outside friendly territory.", points: 5 },
      { type: "Domination", name: "Take What Is Due", flavour: "These lands are yours; the enemy must be driven from them.", condition: "You execute this battle tactic at the end of your turn if there are more friendly units than enemy units in enemy territory, and if there is at least 1 friendly HERO wholly in enemy territory.", points: 5 },
    ],
  ),
  createBattleTacticsCard(
    4,
    "Smokescreen",
    "Lure the enemy by feigning weakness and concealing your true strength in the smoke of battle until the opportune moment.",
    null,
    [
      { type: "Chasing", name: "Keep the Enemy Close", flavour: "Mask your intentions, and the enemy will be unaware of their role in your plans.", condition: "You execute this battle tactic at the end of your turn if you control an objective contested by at least 1 enemy unit.", points: 5 },
      { type: "Strike", name: "Feign Weakness", flavour: "Allowing a few small victories distracts them from their task.", condition: "You execute this battle tactic at the end of your turn if more friendly units than enemy units were destroyed this turn.", points: 5 },
      { type: "Domination", name: "Execute the Plan", flavour: "Carry out your plan and watch the enemy army burn in flames.", condition: "You execute this battle tactic at the end of your turn if you control all objectives located in enemy territory.", points: 5 },
    ],
  ),
  createBattleTacticsCard(
    6,
    "Legend of the Arid",
    "As a raging fire threatens to consume all, a hero rises and a legend will be born.",
    null,
    [
      { type: "Brawl", name: "Daring Rescue", flavour: "The most respected warriors are those who willingly come to the aid of their allies.", condition: "You execute this battle tactic at the end of your turn if an enemy unit that was in melee at the start of the turn was destroyed by a melee attack made by a friendly unit that charged this turn.", points: 5 },
      { type: "Strike", name: "Commanding on the Front", flavour: "Commanders must work together to fuel the war machine.", condition: "You execute this battle tactic at the end of your turn if there are at least 2 friendly HEROES on the battlefield, if they are all within 9\" of a visible enemy unit, and if none of them were killed this turn.", points: 5 },
      { type: "Domination", name: "Legendary Hero", flavour: "Whoever completes a glorious quest has their name etched in history.", condition: "You execute this battle tactic at the end of your turn if you control an objective that is entirely outside your territory, that you did not control at the start of the turn, and that a friendly HERO is contesting.", points: 5 },
    ],
  ),
];

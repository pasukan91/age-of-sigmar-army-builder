const battleTraits = [
  {
    id: "paragons-of-slaanesh",

    name: "Paragons of Slaanesh",

    type: "Start of Your Turn",

    phase: "Start of Your Turn",

    keywords: [],

    description:
      "Declare: If there are fewer than 3 friendly PARAGONS on the battlefield, pick a friendly HEDONITES OF SLAANESH unit that does not have the PARAGON keyword and has not had the PARAGON keyword this battle to be the target.\n\nEffect: The target gains the PARAGON keyword.\n\nDesigner's Note: Friendly units with the PARAGON keyword on their warscroll count towards the number of friendly PARAGONS on the battlefield. If there are more than 3 friendly PARAGONS on the battlefield at the same time, you must immediately remove those units from the battlefield one at a time until there are only 3 friendly PARAGONS left on the battlefield.",
  },

  {
    id: "fall-from-grace",

    name: "Fall from Grace",

    type: "Passive",

    phase: null,

    keywords: [],

    description:
      "Effect: A friendly non-UNIQUE PARAGON immediately loses the PARAGON keyword when any of the following happen:\n\n• That PARAGON has 3 or more damage points allocated to it by the same use of a non-ATTACK ability.\n\n• That PARAGON uses a CHARGE ability and the unmodified charge roll is 5 or less, after any re-rolls.\n\n• A spell cast by that PARAGON is miscast, after any re-rolls.",
  },

  {
    id: "sensuous-arcana",

    name: "Sensuous Arcana",

    type: "Once Per Turn (Army)",

    phase: "Your Hero Phase",

    keywords: [
      "Temptation",
    ],

    description:
      "Declare: Pick a friendly non-UNIQUE PARAGON that has successfully cast a spell this turn and has not used a TEMPTATION ability this turn to use this ability.\n\nEffect: Until the start of your next turn, while the unit using this ability is a PARAGON, add 1 to casting rolls for visible friendly HEDONITES OF SLAANESH units while they are wholly within 12\" of the unit using this ability.",
  },

  {
    id: "cutting-barbs",

    name: "Cutting Barbs",

    type: "Once Per Turn (Army)",

    phase: "Any Movement Phase",

    keywords: [
      "Temptation",
    ],

    description:
      "Declare: Pick a friendly HEDONITES OF SLAANESH HERO that has not used a TEMPTATION ability this turn to use this ability. Then, pick an enemy unit in combat with that HERO to be the target.\n\nEffect: If the unit using this ability is a PARAGON, pick 1 of the effects below. Otherwise, your opponent must pick 1 of the effects below.\n\nRise to the Insults: For the rest of the turn, the target has a maximum control score of 1.\n\nTurn Aside from the Insults: For the rest of the turn, add 1 to hit rolls for attacks made by friendly HEDONITES OF SLAANESH units that target that enemy unit.",
  },

  {
    id: "beguiling-glance",

    name: "Beguiling Glance",

    type: "Once Per Turn (Army)",

    phase: "Any Shooting Phase",

    keywords: [
      "Temptation",
    ],

    description:
      "Declare: Pick a friendly HEDONITES OF SLAANESH HERO unit that has not used a TEMPTATION ability this turn to use this ability. Then, pick a visible enemy unit within 12\" of that HERO to be the target.\n\nEffect: If the unit using this ability is a PARAGON, pick 1 of the effects below. Otherwise, your opponent must pick 1 of the effects below.\n\nSuccumb: For the rest of the turn, when the target is using a CHARGE ability, it must end that charge move no further from the HERO using this ability.\n\nResist: For the rest of the turn, subtract 2 from charge rolls for the target.",
  },

  {
    id: "chief-of-revels",

    name: "Chief of Revels",

    type: "Once Per Turn (Army)",

    phase: "Your Charge Phase",

    keywords: [
      "Temptation",
    ],

    description:
      "Declare: Pick a friendly non-UNIQUE PARAGON that charged this turn and has not used a TEMPTATION ability this turn to use this ability.\n\nEffect: Until the start of your next turn, while the unit using this ability is a PARAGON, add 2 to charge rolls for friendly HEDONITES OF SLAANESH units while they are wholly within 12\" of the unit using this ability.",
  },

  {
    id: "enthralling-vanity",

    name: "Enthralling Vanity",

    type: "Once Per Turn (Army)",

    phase: "Any Combat Phase",

    keywords: [
      "Temptation",
    ],

    description:
      "Declare: Pick a friendly HEDONITES OF SLAANESH HERO unit that has not used a TEMPTATION ability this turn to use this ability. Then, pick a visible enemy unit within 12\" of that HERO to be the target.\n\nEffect: If the unit using this ability is a PARAGON, pick 1 of the effects below. Otherwise, your opponent must pick 1 of the effects below.\n\nMesmerised: For the rest of the turn, weapons used by friendly HEDONITES OF SLAANESH units for attacks that target that unit, including Companion weapons, have Crit (2 Hits).\n\nBreak Their Gaze: For the rest of the turn, other than the Companion ability, weapon abilities for combat attacks made by the target have no effect.",
  },

  {
    id: "excess-of-agility",

    name: "Excess of Agility",

    type: "Once Per Turn (Army)",

    phase: "Any Combat Phase",

    keywords: [
      "Temptation",
    ],

    description:
      "Declare: Pick a friendly non-UNIQUE PARAGON that has not used a TEMPTATION ability this turn to use this ability.\n\nEffect: For the rest of the turn, while the unit using this ability is a PARAGON and is in combat, subtract 1 from hit rolls for attacks that target visible friendly HEDONITES OF SLAANESH units while they are wholly within 12\" of the unit using this ability.",
  },
];

export default battleTraits;
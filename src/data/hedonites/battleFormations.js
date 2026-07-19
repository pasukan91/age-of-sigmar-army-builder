const battleFormations = [
  {
    id: "depraved-carnival",

    name: "Depraved Carnival",

    description:
      "Declare: Pick up to 3 friendly HEDONITES OF SLAANESH INFANTRY units to be the targets.\n\nEffect: Each target can move D6\". It can only end that move in combat with units it was in combat with at the start of that move.",

    ability: {
      type: "Once Per Turn (Army)",

      phase: "End of Any Turn",

      name: "In Search of Sin",

      keywords: [],

      description:
        "Declare: Pick up to 3 friendly HEDONITES OF SLAANESH INFANTRY units to be the targets.\n\nEffect: Each target can move D6\". It can only end that move in combat with units it was in combat with at the start of that move.",
    },
  },

  {
    id: "godseeker-cavalcade",

    name: "Godseeker Cavalcade",

    description:
      "Effect: While they are wholly within 9\" of a battlefield edge, friendly HEDONITES OF SLAANESH units can use CHARGE abilities even if they used a RUN ability in the same turn.",

    ability: {
      type: "Passive",

      phase: null,

      name: "Godly Spoor",

      keywords: [],

      description:
        "Effect: While they are wholly within 9\" of a battlefield edge, friendly HEDONITES OF SLAANESH units can use CHARGE abilities even if they used a RUN ability in the same turn.",
    },
  },

  {
    id: "artisans-of-torment",

    name: "Artisans of Torment",

    description:
      "Declare: Pick a friendly HEDONITES OF SLAANESH unit to use this ability, then pick an enemy unit in combat with that unit and that had any damage points allocated to it this turn to be the target.\n\nEffect: For the rest of the turn:\n\n• All of the combat attacks made by that friendly unit must target that enemy unit.\n\n• Add 1 to the Attacks characteristic of that friendly unit's melee weapons.",

    ability: {
      type: "Your Combat Phase",

      phase: "Your Combat Phase",

      name: "Sadistic Tendencies",

      commandPoints: 1,

      keywords: [],

      description:
        "Declare: Pick a friendly HEDONITES OF SLAANESH unit to use this ability, then pick an enemy unit in combat with that unit and that had any damage points allocated to it this turn to be the target.\n\nEffect: For the rest of the turn:\n\n• All of the combat attacks made by that friendly unit must target that enemy unit.\n\n• Add 1 to the Attacks characteristic of that friendly unit's melee weapons.",
    },
  },

  {
    id: "lurid-dreamers",

    name: "Lurid Dreamers",

    description:
      "Declare: Pick a friendly HEDONITES OF SLAANESH unit that had any damage points allocated to it this turn by an enemy ability to be the target.\n\nEffect: Remove the target from the battlefield, then set it up again on the battlefield more than 9\" from all enemy units.",

    ability: {
      type: "Once Per Turn (Army)",

      phase: "Enemy Shooting Phase",

      name: "Amidst the Phantasmagoria",

      keywords: [],

      description:
        "Declare: Pick a friendly HEDONITES OF SLAANESH unit that had any damage points allocated to it this turn by an enemy ability to be the target.\n\nEffect: Remove the target from the battlefield, then set it up again on the battlefield more than 9\" from all enemy units.",
    },
  },
];

export default battleFormations;
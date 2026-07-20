const artefacts = [
  {
    id: "bashful-visage",

    name: "Bashful Visage",

    source: "Battletome",

    points: 0,

    description:
      "Effect: While they are wholly within 6\" of this unit, friendly non-MONSTER non-WAR MACHINE HEDONITES OF SLAANESH units are not visible to enemy units more than 12\" from them.",

    type: "Passive",

    phase: null,

    keywords: [],
  },

  {
    id: "crown-of-the-ur-slaanesh",

    name: "Crown of the Ur-Slaanesh",

    source: "Battletome",

    points: 0,

    description:
      "Declare: Pick a friendly non-HERO HEDONITES OF SLAANESH INFANTRY unit that has been destroyed to be the target.\n\nEffect: Set up a replacement unit with half the number of models from the target unit, rounding up, wholly within 12\" of this unit and more than 9\" from all enemy units.",

    type: "Once Per Battle",

    phase: "Your Movement Phase",

    keywords: [],
  },

  {
    id: "the-rod-of-misrule",

    name: "The Rod of Misrule",

    source: "Battletome",

    points: 0,

    description:
      "Declare: Pick another visible friendly HEDONITES OF SLAANESH unit wholly within 12\" of this unit to be the target.\n\nEffect: For the rest of the turn, when the target uses the 'Power Through' command, you can pick an enemy target for that command that does not have a lower Health characteristic than the unit using that command.",

    type: "End of Any Turn",

    phase: "End of Any Turn",

    keywords: [],
  },
];

export default artefacts;

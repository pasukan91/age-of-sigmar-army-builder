const maskEligibility = [
  "cities", "daughters", "flesheater", "fyreslayers", "gloomspite", "hedonites",
  "hashut", "idoneth", "ironjawz", "kharadron", "kruleboyz", "lumineth", "nurgle",
  "nighthaunt", "ogors", "ossiarch", "seraphon", "skaven", "std", "soulblight",
  "stormcast", "sylvaneth",
];

const regimentsOfRenown = [
  {
    id: "seekers-of-silver", name: "Seekers of Silver", points: 380, sourceFaction: "tzeentch",
    eligibleFactionIds: ["hedonites", "hashut", "nurgle", "skaven", "std"],
    organisation: ["1 Gaunt Summoner on Disc of Tzeentch", "1 Magister on Disc of Tzeentch", "3 Screamers of Tzeentch"],
    unitIds: ["gaunt-summoner-on-disc", "magister-on-disc", "screamers"],
    abilities: [
      { name: "Splinters of Sorcery", phase: "Your Hero Phase", description: "Spell (6, Unlimited): give terrain within 12\" Place of Power for the battle; if it already has it, roll 9 dice and inflict 1 mortal damage per 5+ on an enemy within 12\"." },
      { name: "Bubbles of Unreality", phase: "Any Hero Phase", description: "Once per turn, the next Summon spell used by a Wizard in this regiment can measure range and visibility from terrain with Place of Power." },
    ],
  },
  {
    id: "mask-of-the-deceiver", name: "Mask of the Deceiver", points: 170, sourceFaction: "tzeentch",
    eligibleFactionIds: maskEligibility,
    organisation: ["1 Mask of the Deceiver (use The Changeling model)"],
    unitIds: ["the-changeling"],
    abilities: [
      { name: "Masked in Plain Sight", phase: "Deployment Phase", description: "Deploy this unit in reserve incognito. Incognito units are destroyed at the end of the fifth battle round." },
      { name: "Bait and Switch", phase: "Any Hero Phase", description: "Swap this incognito unit with a friendly Infantry Hero on the battlefield. If this unit is destroyed, deploy the swapped incognito Hero near a battlefield edge and out of combat." },
      { name: "Forceful Command", phase: "Your Hero Phase", description: "Spell (6): a friendly unit wholly within 12\" cannot use Move abilities and its melee weapons gain Anti-charge (+1 Rend) until your next turn." },
    ],
  },
];

export default regimentsOfRenown;

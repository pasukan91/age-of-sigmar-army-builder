const regimentsOfRenown = [
  {
    id: "da-hurtlin-hogz",
    name: "Da Hurtlin' Hogz",
    points: 430,
    sourceFaction: "ironjawz",
    eligibleFactionIds: ["gloomspite", "kruleboyz", "ogors", "behemat"],
    organisation: ["1 Tuskboss on Maw-grunta", "1 Maw-grunta Gougers"],
    unitIds: ["tuskboss-on-maw-grunta", "maw-grunta-gougers"],
    abilities: [
      { name: "Hurtlin' Through", phase: "Any Charge Phase", description: "After charging, units in this regiment can smash through and inflict mortal damage on enemy units they pass across." },
      { name: "Keep Up!", phase: "Your Movement Phase", description: "The Gore-gruntas can follow the Tuskboss's advance to keep the regiment together." },
    ],
  },
  {
    id: "da-kountin-krew",
    name: "Da Kountin' Krew",
    points: 320,
    sourceFaction: "kruleboyz",
    eligibleFactionIds: ["gloomspite", "ironjawz", "behemat"],
    organisation: ["1 Swampboss Skumdrekk", "2 Hobgrot Slittaz units (10 models each)"],
    unitIds: ["swampboss-skumdrekk", "hobgrot-slittaz", "hobgrot-slittaz"],
    abilities: [
      { name: "Kountin' the Tally", phase: "End of Any Turn", description: "The Krew counts its kills and gains bonuses as the tally increases." },
      { name: "Skumdrekk's Best Bet", phase: "Any Combat Phase", description: "Skumdrekk bets on an enemy unit and rewards the Krew when it manages to destroy it." },
      { name: "Snatch 'Em Up", type: "Once Per Turn (Army)", phase: "Enemy Hero Phase", description: "Pick an enemy unit in combat with this regiment's Swampboss Skumdrekk and roll a dice. If the result is at least double the target's Health characteristic, 1 model in that unit is slain." },
    ],
  },
];

export default regimentsOfRenown;

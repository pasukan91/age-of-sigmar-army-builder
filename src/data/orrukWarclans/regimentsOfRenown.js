const regimentsOfRenown = [
  {
    id: "da-hurtlin-hogz",
    name: "Da Hurtlin' Hogz",
    points: 430,
    sourceFaction: "kruleboyz",
    eligibleFactionIds: ["kruleboyz"],
    organisation: ["1 Tuskboss on Maw-grunta", "1 Gore-gruntas unit (3 models)"],
    unitIds: ["tuskboss-on-maw-grunta", "gore-gruntas"],
    abilities: [
      { name: "Hurtlin' Through", phase: "Any Charge Phase", description: "Tras cargar, las unidades del regimiento pueden abrirse paso e infligir daño mortal a los enemigos atravesados." },
      { name: "Keep Up!", phase: "Your Movement Phase", description: "Los Gore-gruntas pueden seguir el avance del Tuskboss para mantener unido el regimiento." },
    ],
  },
  {
    id: "da-kountin-krew",
    name: "Da Kountin' Krew",
    points: 320,
    sourceFaction: "ironjawz",
    eligibleFactionIds: ["ironjawz"],
    organisation: ["1 Swampboss Skumdrekk", "1 Hobgrot Slittaz unit (10 models)", "1 Man-skewer Boltboyz unit (3 models)"],
    unitIds: ["swampboss-skumdrekk", "hobgrot-slittaz", "man-skewer-boltboyz"],
    abilities: [
      { name: "Kountin' the Tally", phase: "End of Any Turn", description: "La Krew lleva la cuenta de sus bajas y obtiene bonificaciones a medida que aumenta la tally." },
      { name: "Skumdrekk's Best Bet", phase: "Any Combat Phase", description: "Skumdrekk apuesta por una unidad enemiga y recompensa a la Krew cuando consigue acabar con ella." },
    ],
  },
];

export default regimentsOfRenown;

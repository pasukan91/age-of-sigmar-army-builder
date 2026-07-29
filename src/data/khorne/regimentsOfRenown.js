const eligible = ["tzeentch","nurgle","hedonites","skaven","std"];

export default [
  {
    id:"the-exiled-one",name:"The Exiled One",points:390,sourceFaction:"khorne",
    eligibleFactionIds:eligible,organisation:["1 Skarbrand"],unitIds:["skarbrand"],
    abilities:[{name:"Hatred for All",phase:"Any Combat Phase",description:"Si Skarbrand no está en combate y hay otra unidad amiga visible en su alcance, debes elegir una y resolver contra ella los ataques de combate de Skarbrand."}],
  },
  {
    id:"the-red-revelation",name:"The Red Revelation",points:380,sourceFaction:"khorne",
    eligibleFactionIds:eligible,organisation:["1 Slaughterpriest","10 Bloodreavers","5 Skullreapers"],unitIds:["slaughterpriest","bloodreavers","skullreapers"],
    abilities:[
      {name:"Frenzied Violence",phase:"Your Hero Phase",description:"Prayer (4): una unidad del regimiento totalmente a 12\" tiene Ward (5+) mientras todas sus miniaturas estén en alcance de combate de un enemigo; con 10+, elige un segundo objetivo."},
      {name:"Glimpse the God",phase:"End of Any Turn",description:"Para cada unidad del regimiento que luchó, si dañó a un enemigo destruido este turno y ninguna unidad amiga externa al regimiento lo dañó en combate, +2 Ataques a sus armas Blood-hungry durante el resto de la batalla."},
    ],
  },
];

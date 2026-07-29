const rule = (id, name, phase, description, type = "Ability") => ({ id, name, phase, description, type, points: 0 });

export const battleTraits = [
  rule("blood-drenched", "Blood-drenched", "Any Hero Phase", "Una vez por batalla, si al menos la mitad de todas las unidades de ambos ejércitos han sido destruidas, elige un Hero Khorne amigo. Durante el resto de la batalla: ignora modificadores positivos a la salvación contra Khorne; las armas Blood-hungry de Bloodbound obtienen Crit (Mortal); las de Daemons no Monster obtienen +1 Rend; y las de Monsters obtienen +1 Damage.", "Once Per Battle (Army)"),
  rule("blood-for-the-blood-god", "Blood for the Blood God", "Passive", "Gana 1 punto de tributo de sangre cada vez que una unidad amiga o enemiga es destruida. Los puntos se gastan para desbloquear permanentemente habilidades de tributo."),
  rule("skulls-for-the-skull-throne", "Skulls for the Skull Throne", "Start of Any Turn", "Una vez por ronda de batalla, gasta los puntos indicados para desbloquear una habilidad de tributo de sangre disponible.", "Once Per Battle Round (Army)"),
  rule("murderlust", "Murderlust — 0", "Any Charge Phase", "Reacción a una carga amiga: sustituye uno de los dados de carga por una tirada nueva. Si lo haces, tras cargar la unidad sufre D3 daños mortales.", "Once Per Turn (Army), Blood Tithe"),
  rule("divine-scorn", "Divine Scorn — 1", "Start of Any Turn", "Elige hasta 3 Wizards o Priests enemigos a 6\" de unidades Khorne amigas. Con 3+, resta 1 a su nivel de poder hasta tu siguiente turno (mínimo 0).", "Blood Tithe"),
  rule("punish-the-pacifist", "Punish the Pacifist — 1", "Your Combat Phase", "Tira un dado por cada unidad y manifestación enemiga que no esté en combate y por cada unidad amiga que no esté en combate. Con 1-2, las amigas sufren 1 mortal; con 3+, las enemigas sufren 1 mortal.", "Blood Tithe"),
  rule("murder-the-mystic", "Murder the Mystic — 2", "Your Hero Phase", "Requiere Divine Scorn. Intenta desterrar hasta 4 manifestaciones enemigas. Cada una desterrada inflige D3 mortales a cada enemigo a 3\".", "Blood Tithe"),
  rule("glorious-combat-or-naught", "Glorious Combat or Naught — 2", "Passive", "Requiere Divine Scorn o Punish the Pacifist. Resta 1 a impactar con ataques de disparo que tengan como objetivo unidades Khorne amigas.", "Blood Tithe"),
  rule("revel-in-battle", "Revel in Battle — 3", "Passive", "Requiere Punish the Pacifist. Las habilidades de armas que no sean Companion no afectan a ataques de combate de unidades enemigas que cargaron contra Khorne.", "Blood Tithe"),
  rule("slaughter-triumphant", "Slaughter Triumphant — 4", "Passive", "Requiere Glorious Combat or Naught o Murder the Mystic. +1 Ataques a las armas de unidades Khorne amigas que cargaron este turno.", "Blood Tithe"),
  rule("cleave-wide-the-grin", "Cleave Wide the Grin — 4", "Passive", "Requiere Revel in Battle o Glorious Combat or Naught. +1 a impactar con ataques de combate Khorne amigos.", "Blood Tithe"),
];

export const battleFormations = [
  rule("khornate-legion", "Khornate Legion — Butchers of Nations", "Any Combat Phase", "Después de que luche un Daemon amigo, una unidad Bloodbound amiga totalmente a 12\" que no haya luchado puede hacerlo inmediatamente.", "Once Per Turn (Army), Reaction"),
  rule("brass-stampede", "Brass Stampede — Drawn to Carnage", "Passive", "Suma X a las cargas Khorne, donde X es el número de Cavalry o Monsters Khorne amigos totalmente a 12\" que ya cargaron esta fase."),
  rule("bloodbound-warhorde", "Bloodbound Warhorde — Tireless Conquerors", "Passive", "+1 a impactar en combate para Bloodbound contra enemigos que disputan un objetivo que no controlas."),
  rule("murderhost", "Murderhost — Eager Killers", "End of Your Turn", "Cada Daemon amigo que haya luchado y ya no esté en combate puede mover D6\", sin terminar en combate."),
];

export const heroicTraits = [
  rule("magical-scorn", "Magical Scorn", "Passive", "Wizards y Priests enemigos a 12\" tienen -1 a lanzar y cantar."),
  rule("frenzied-taskmaster", "Frenzied Taskmaster", "Your Movement Phase", "Una Infantry o Cavalry Khorne amiga dentro del alcance de combate que no esté en combate mueve D6\" sin acabar en combate; si termina dentro del alcance del portador, sufre tantos mortales como la tirada."),
  rule("skull-collector", "Skull Collector", "End of Any Turn", "Si el portador mató a un Hero enemigo con ataques de combate este turno, +1 Ataques a sus armas de combate durante el resto de la batalla. Acumulativo."),
];

export const artefacts = [
  rule("collar-of-contempt", "Collar of Contempt", "Passive", "El portador puede disipar como Wizard (1). Tras una disipación exitosa, el lanzador sufre D3 mortales."),
  rule("butchers-blade", "Butcher's Blade", "End of Your Turn", "Por cada enemigo dañado por los ataques de combate del portador este turno, con 2+ inflige D3 mortales."),
  rule("argath", "Ar'gath, the King of Blades", "Passive", "Los Heroes enemigos en combate con el portador no pueden hacer tiradas de ward."),
];

export const prayerLores = [{
  id: "blood-blessings-of-khorne", name: "Blood Blessings of Khorne", prayers: [
    { ...rule("uncontrollable-rage", "Uncontrollable Rage", "Your Hero Phase", "CV 4, Unlimited. Una unidad amiga totalmente a 12\" obtiene los efectos de Blood-drenched hasta tu siguiente turno; con 8+, ignora Wild-eyed Brutality."), chantingValue: 4 },
    { ...rule("blood-boil", "Blood Boil", "Your Hero Phase", "CV 4. Tira un dado por miniatura de un enemigo visible a 18\"; cada 5+ causa 1 mortal. Con 8+, además -1 a herir con sus ataques hasta tu siguiente turno."), chantingValue: 4 },
    { ...rule("final-act-of-violence", "Final Act of Violence", "Your Hero Phase", "CV 4. Hasta tu siguiente turno, cuando una miniatura de la unidad Khorne objetivo muera por un ataque de combate, tira un dado (2 con 8+); cada 5+ causa 1 mortal al atacante tras luchar."), chantingValue: 4 },
  ],
}];

export const aqshyPrayerLores = [{
  id: "proclamations-of-slaughter", name: "Proclamations of Slaughter", prayers: [
    { ...rule("fetters-of-blood", "Fetters of Blood", "Your Hero Phase", "CV 4. Un enemigo a 18\" no puede Run, Retreat ni ser retirado y redesplegado hasta tu siguiente turno; con 8+, elige un segundo objetivo."), chantingValue: 4 },
    { ...rule("stoke-the-flames", "Stoke the Flames", "Your Hero Phase", "CV 3, Unlimited. Hasta tu siguiente turno el rival no puede gastar rage dice para Fight Through the Pain contra la unidad objetivo. Si esta es destruida, gana 1 rage die, o 2 con 6+."), chantingValue: 3 },
    { ...rule("gift-of-apoplexy", "Gift of Apoplexy", "Your Hero Phase", "CV 3. Hasta tu siguiente turno, después de que el enemigo objetivo use una habilidad que no sea Move o Fight, sufre D3 mortales, o 3 con un cántico de 8+."), chantingValue: 3 },
  ],
}];

export const brazenMutations = [
  { id: "brass-flesh", name: "Brass Flesh", points: 20, phase: "Passive", description: "Las tiradas de salvación sin modificar de 5+ para esta unidad no pueden fallar." },
  { id: "blade-limbs", name: "Blade-limbs", points: 20, phase: "Passive", description: "Al usar Eruption of Fury, por cada 6 sin modificar para impactar inflige 3 mortales adicionales a cada enemigo en combate, en vez de D3." },
  { id: "scorpion-tails", name: "Scorpion Tails", points: 10, phase: "Any Combat Phase", description: "Un enemigo en combate sufre D3 mortales; si su tamaño inicial era 1, además -1 a herir en combate este turno." },
];

const rule = (id, name, phase, description, type = "Ability") => ({ id, name, phase, description, type, points: 0 });

export const battleTraits = [
  rule("harness-daemonic-power", "Harness Daemonic Power", "Start of Your Turn", "Retira todos tus puntos de poder demoníaco (DPP). Gana 1 DPP por cada ficha de desolación amiga y repártelos entre unidades Helsmiths of Hashut amigas que no sean Hobgrot, con un máximo de 3 por unidad. Los no asignados se pierden.", "Once Per Turn (Army)"),
  rule("reserves-daemonic-power", "Reserves of Daemonic Power", "Any Hero Phase", "Gasta 1 PC y elige una unidad Helsmiths of Hashut amiga que no sea Hobgrot y tenga 0 DPP. Si el total de DPP de tu ejército es 3 o menos, dale 2 DPP; de lo contrario, 1.", "Once Per Turn (Army), Command"),
  rule("leave-land-in-ruin", "Leave the Land in Ruin", "Start of Any Turn", "Elige un elemento de terreno u objetivo sin una ficha de desolación amiga, disputado por una unidad Helsmiths of Hashut amiga que no esté en combate, y coloca una ficha de desolación amiga.", "Once Per Turn (Army)"),
];

export const battleFormations = [
  rule("hashutite-host", "Hashutite Host — Amassed Legions", "Passive", "Cada vez que una unidad Infantry Helsmiths of Hashut amiga con 3 DPP usa Rally, haz 3 tiradas de rally adicionales."),
  rule("castigation-battery", "Castigation Battery — Experimental Munitions", "Passive", "Suma 1 a Ataques de las armas a distancia de War Machines Helsmiths of Hashut amigas con 3 DPP."),
  rule("bullfathers-horns", "Bullfather's Horns — Bulls of the Ziggurat", "Passive", "Suma 2\" al Movimiento de Cavalry y Monsters Helsmiths of Hashut amigos con 3 DPP."),
  rule("daemonsmith-cabal", "Daemonsmith Cabal — Arcane Dominance", "Passive", "Suma 1 a las tiradas de lanzamiento, disipación, destierro y cántico de Wizards y Priests Helsmiths of Hashut amigos con 3 DPP."),
];

export const heroicTraits = [
  rule("servile-automaton", "Servile Automaton", "Deployment Phase", "Elige un Automaton Helsmiths of Hashut amigo dentro del alcance de combate como guardaespaldas. Mientras esté cerca, obtiene Strike-first si el héroe está en combate y, si el héroe es Infantry, este tiene Ward (5+)."),
  rule("fire-you-worms", "Fire, You Worms!", "Enemy Charge Phase", "Elige Infantry Helsmiths of Hashut amiga que no esté en combate, totalmente a 12\", y que haya sido cargada: dispara contra la unidad que cargó, pero las tiradas de impacto sin modificar de 1-5 fallan."),
  rule("eye-for-weakness", "An Eye for Weakness", "Your Hero Phase", "Elige un enemigo a 18\". Hasta tu siguiente turno, suma 1 a herir con ataques de combate Helsmiths of Hashut amigos contra él."),
];

export const artefacts = [
  rule("scroll-petrification", "Scroll of Petrification", "Any Hero Phase", "Una vez por batalla, una unidad Helsmiths of Hashut amiga totalmente a 12\" tiene Ward (2+) este turno, pero no puede usar habilidades no pasivas ni ser objetivo amigo; el enemigo la ignora al mover, cargar y desplegarse."),
  rule("crucible-spite", "Crucible of Spite", "Your Hero Phase", "Una vez por batalla, da al portador hasta 3 DPP. No podrá recibir más DPP durante el resto de la batalla."),
  rule("gauntlets-punishment", "Gauntlets of Punishment", "Your Shooting Phase", "Elige un enemigo a 12\" y tira D3; con 2+, inflige tantos daños mortales como el resultado."),
];

export const spellLores = [{
  id: "lore-hashut", name: "Lore of Hashut", spells: [
    { ...rule("hateful-fractures", "Hateful Fractures", "Your Hero Phase", "CV 6, Unlimited. Enemigo a 18\": reduce a la mitad su Movimiento hasta tu siguiente turno."), castingValue: 6 },
    { ...rule("ashen-smog", "Ashen Smog", "Your Hero Phase", "CV 7. Terreno a 18\" con ficha de desolación: obtiene Obscuring hasta tu siguiente turno. Por cada enemigo que lo dispute, tira D3; con 2+, sufre ese daño mortal."), castingValue: 7 },
    { ...rule("molten-metal", "Molten Metal", "Your Hero Phase", "CV 8. Enemigo a 18\": tira tantos dados como el resultado sin modificar del lanzamiento; por cada resultado igual o mayor que su Save, inflige 1 daño mortal."), castingValue: 8 },
  ],
}];

export const prayerLores = [{
  id: "prayers-hashut", name: "Prayers of Hashut", prayers: [
    { ...rule("black-flames", "Black Flames", "Your Hero Phase", "CV 4, Unlimited. Enemigo a 12\": tira un dado por miniatura; cada 5+ causa 1 daño mortal, o cada 4+ si el cántico fue 8+."), chantingValue: 4 },
    { ...rule("furnace-blessing", "Furnace Blessing", "Your Hero Phase", "CV 4. Unidad Helsmiths of Hashut amiga totalmente a 12\": +1 Rend en combate este turno; con 8+, además Crit (Mortal)."), chantingValue: 4 },
    { ...rule("storm-obsidian-shards", "Storm of Obsidian Shards", "Your Hero Phase", "CV 5. Enemigo a 18\": D3 daños mortales y -3 Control este turno. Con 10+, elige un segundo objetivo."), chantingValue: 5 },
  ],
}];

export const aqshyArtefacts = [
  rule("gem-utorak", "Gem of Utorak", "Your Hero Phase", "Una vez por batalla: si no es Wizard, se convierte en Wizard (2) hasta tu siguiente turno; si ya lo es, +1 poder y +D3 a lanzar hasta tu siguiente turno."),
  rule("casque-belittlement", "Casque of Belittlement", "Any Combat Phase", "Elige un enemigo en combate y tira tantos dados como tu furia (+1 dado por cada carga realizada); cada 3+ inflige 1 daño mortal."),
  rule("horn-bullfather", "Horn of the Bullfather", "Deployment Phase", "Retira al portador y opcionalmente una unidad Hobgrot Vandalz visible; vuelve a desplegarlos totalmente a 7\" de un borde y a más de 9\" del enemigo."),
];

export const accursedDevices = [
  { id: "infernal-motivators", name: "Infernal Motivators", points: 20, phase: "Passive", description: "Suma 2\" al Movimiento de esta unidad." },
  { id: "earthwrack-stabilisers", name: "Earthwrack Stabilisers", points: 10, phase: "Passive", description: "Suma 1 al Rend de sus armas de combate si no cargó este turno." },
  { id: "bullfathers-scorn", name: "Bullfather's Scorn", points: 10, phase: "Your Shooting Phase", description: "Gasta furia: sus armas a distancia obtienen Crit (2 Hits); si ya lo tenían, los críticos se activan con 5+ hasta tu siguiente turno." },
];

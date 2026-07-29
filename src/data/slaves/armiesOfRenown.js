import manifestations from "./manifestations";
import baseUnits from "./units";
import { ability as a, createUnit as u, weapon as w } from "./unitFactory";

const r = (id, name, phase, description, type = "Ability") => ({
  id,
  name,
  phase,
  description,
  type,
  points: 0,
});

const daemon = (data, image) => ({
  ...u(data),
  image,
});

const firstPrinceDaemons = [
  daemon({
    id: "first-prince-bloodletters", name: "Legion of the First Prince Bloodletters", points: 170,
    models: 10, health: 2, save: "5+", ward: "6+", baseSize: "32mm",
    keywords: ["Infantry", "Champion", "Musician (1/10)", "Standard Bearer (1/10)", "Ward (6+)", "Legion of the First Prince", "Daemon"],
    weapons: [w("Hellblade", "Melee", 2, "3+", "3+", 1, 1, ["Crit (Mortal)"])],
    abilities: [a("The Thinning Veil", "End of Any Turn", "Si está en combate, devuelve D3 miniaturas eliminadas.")],
  }, "/images/units/blades/bloodletters.jpg"),
  daemon({
    id: "first-prince-bloodcrushers", name: "Legion of the First Prince Bloodcrushers", points: 150,
    models: 3, move: '8"', health: 5, control: 2, save: "4+", ward: "6+", baseSize: "90×52mm",
    keywords: ["Cavalry", "Champion", "Musician (1/3)", "Standard Bearer (1/3)", "Ward (6+)", "Legion of the First Prince", "Daemon"],
    weapons: [w("Bloodcrusher Hellblade", "Melee", 2, "3+", "3+", 1, 1, ["Anti-Infantry (+1 Rend)", "Crit (Mortal)"]), w("Juggernaut's Brazen Hooves", "Melee", 2, "4+", "3+", 1, "D3", ["Companion"])],
    abilities: [a("Slaughterous Charge", "Any Charge Phase", "Si cargó, enemigo a 1\": D3; con 2+, causa ese resultado en mortales.")],
  }, "/images/units/blades/bloodcrushers.jpg"),
  daemon({
    id: "first-prince-screamers", name: "Legion of the First Prince Screamers of Tzeentch", points: 80,
    models: 3, move: '14"', health: 2, save: "5+", ward: "6+", baseSize: "32mm",
    keywords: ["Beast", "Fly", "Ward (6+)", "Legion of the First Prince", "Daemon"],
    weapons: [w("Lamprey Bite", "Melee", 3, "4+", "3+", 1, 1, ["Anti-Monster (+1 Rend)", "Companion"])],
    abilities: [a("Slashing Fins", "Your Movement Phase", "Enemigo atravesado: tira por cada miniatura de esta unidad que lo atravesó; cada 4+ causa 1 mortal."), a("Beast", "Passive", "Control máximo 1.")],
  }, "/images/units/disciples/screamers.jpg"),
  daemon({
    id: "first-prince-flamers", name: "Legion of the First Prince Flamers of Tzeentch", points: 120,
    models: 3, move: '6"', health: 3, save: "5+", ward: "6+", baseSize: "32mm",
    keywords: ["Infantry", "Champion", "Fly", "Ward (6+)", "Legion of the First Prince", "Daemon"],
    weapons: [w("Warping Flames", "Ranged", 3, "3+", "4+", 0, "D3", ["Anti-Infantry (+1 Rend)"], '12"'), w("Flaming Maws", "Melee", 3, "3+", "4+", 0, 1)],
    abilities: [a("Wyrdflame of Tzeentch", "Your Shooting Phase", "Elige un enemigo: +1 a herir con disparos contra él; si todos los disparos lo atacan, sufre D3 mortales después.", "Once Per Turn (Army)")],
  }, "/images/units/disciples/flamers.jpg"),
  daemon({
    id: "first-prince-plaguebearers", name: "Legion of the First Prince Plaguebearers", points: 140,
    models: 10, move: '4"', health: 2, save: "6+", ward: "5+", baseSize: "32mm",
    keywords: ["Infantry", "Champion", "Musician (1/10)", "Standard Bearer (1/10)", "Ward (5+)", "Legion of the First Prince", "Daemon"],
    weapons: [w("Plaguesword", "Melee", 2, "4+", "3+", 0, 1, ["Crit (Mortal)"])],
    abilities: [a("Cloud of Flies", "Passive", "-1 a impactar con disparos contra esta unidad.")],
  }, "/images/factions/slaves.webp"),
  daemon({
    id: "first-prince-beast-of-nurgle", name: "Legion of the First Prince Beasts of Nurgle", points: 120,
    move: '5"', health: 8, save: "5+", ward: "5+", baseSize: "60mm",
    keywords: ["Beast", "Ward (5+)", "Legion of the First Prince", "Daemon"],
    weapons: [w("Filthy Claws and Slobbering Maw", "Melee", 5, "4+", "3+", 1, "D3", ["Companion"])],
    abilities: [a("Attention Seekers", "Any Charge Phase", "Carga 2D6 hacia el enemigo más cercano, atravesándolo si es necesario; termina a 1\" e inflige D3 mortales.", "Once Per Turn (Army)"), a("Beast", "Passive", "Control máximo 1.")],
  }, "/images/factions/slaves.webp"),
  daemon({
    id: "first-prince-fiends", name: "Legion of the First Prince Fiends", points: 140,
    models: 3, move: '10"', health: 4, control: 2, save: "5+", ward: "6+", baseSize: "75×42mm",
    keywords: ["Beast", "Champion", "Ward (6+)", "Legion of the First Prince", "Daemon"],
    weapons: [w("Deadly Pincers and Barbed Stinger", "Melee", 4, "4+", "3+", 1, "D3", ["Anti-Monster (+1 Rend)", "Companion"])],
    abilities: [a("Soporific Musk", "Any Combat Phase", "Enemigo en combate: con 4+ obtiene Strike-last este turno.", "Once Per Turn (Army)"), a("Disruptive Song", "Passive", "-1 a lanzar y disipar para Wizards enemigos a 12\"."), a("Beast", "Passive", "Control máximo 1.")],
  }, "/images/units/hedonitas/fiends.webp"),
  daemon({
    id: "first-prince-hellflayer", name: "Legion of the First Prince Hellflayer", points: 130,
    move: '10"', health: 7, save: "4+", ward: "6+", baseSize: "120×92mm",
    keywords: ["War Machine", "Ward (6+)", "Legion of the First Prince", "Daemon"],
    weapons: [w("Flensing Whips and Piercing Claws", "Melee", 6, "4+", "4+", 0, 1), w("Steeds' Poisoned Tongues", "Melee", 4, "3+", "4+", 0, 1, ["Companion"]), w("Axle Blades", "Melee", 4, "4+", "2+", 2, "D3", ["Anti-Infantry (+1 Rend)", "Companion"])],
    abilities: [a("Soul Scent", "Any Movement Phase", "Hasta 3 enemigos atravesados: D3 por cada uno; con 2+, sufren ese resultado en mortales. Si mata, obtiene Ward (5+) este turno."), a("Threshing Doom", "Passive", "Puede atravesar miniaturas y alcances de combate de Infantry enemiga al mover.")],
  }, "/images/factions/slaves.webp"),
];

const rosterIds = [
  "belakor",
  "daemon-prince",
  "eternus",
  "varanguard",
  "chaos-sorcerer-lord",
  "chaos-legionnaires",
  "chaos-furies",
  "centaurion-marshal",
];

const units = [
  ...baseUnits.filter((unit) => rosterIds.includes(unit.id)),
  ...firstPrinceDaemons,
];

export default [{
  id: "legion-of-the-first-prince",
  name: "Legion of the First Prince",
  excludesRegimentsOfRenown: false,
  description: "Todas las unidades del ejército obtienen la keyword Legion of the First Prince, salvo las incluidas en un Regiment of Renown.",
  roster: ["Be'lakor", "Daemon Prince", "Eternus", "Varanguard", "Chaos Sorcerer Lord", "Chaos Legionnaires", "Chaos Furies", "Centaurion Marshal", "Legion of the First Prince Daemons"],
  rules: {
    units,
    battleTraits: [
      r("first-damned-prince", "First-damned Prince", "Passive", "Mientras Be'lakor esté en combate junto a un Daemon Legion of the First Prince amigo no Hero, tiene Ward (4+). Después de resolver su secuencia de daño, cada ward exitosa asigna 1 daño a uno de esos daemons dentro de su alcance de combate; no se permiten wards contra ese daño."),
      r("daemonic-reinforcements", "Daemonic Reinforcements", "Any Movement Phase", "Elige una Infantry o Cavalry Daemon amiga no Hero destruida y despliega una unidad de reemplazo con la mitad de miniaturas totalmente a 12\" de Be'lakor y a más de 9\" del enemigo.", "Once Per Turn (Army)"),
      r("storm-blackened-blades", "Storm of Blackened Blades", "Your Combat Phase", "Una vez por batalla, Eternus y hasta 2 unidades amigas no Hero ni Daemon totalmente a 12\" suman 1 a Ataques de combate este turno.", "Once Per Battle (Army)"),
      r("bestow-favour", "Bestow Favour", "Your Hero Phase", "Si Be'lakor está en el campo, una unidad amiga no Hero obtiene +5 Control hasta tu siguiente turno y además +1 save si es Daemon o Ward (6+) si no lo es.", "Once Per Turn (Army)"),
    ],
    heroicTraits: [r("dread-marshal", "Dread Marshal", "Any Charge Phase", "Hasta 3 unidades amigas totalmente a 12\" suman 1 a sus cargas este turno.")],
    artefacts: [r("black-ritual-dagger", "Black Ritual Dagger", "Reaction: You declared a Spell ability", "Asigna 1 daño al portador para repetir la tirada de lanzamiento.")],
    spellLores: [{
      id: "first-prince-spells",
      name: "Spell Lore of the First Prince",
      spells: [
        { ...r("dark-cantrip", "Dark Cantrip", "Your Hero Phase", "CV 6, Unlimited. Hasta 3 enemigos visibles a 18\" sufren 1 mortal."), castingValue: 6 },
        { ...r("shroud-in-darkness", "Shroud in Darkness", "Your Hero Phase", "CV 7. Una unidad amiga visible totalmente a 12\" y fuera de combate mueve D6\" sin acabar en combate y no es visible desde más de 12\" hasta tu siguiente turno."), castingValue: 7 },
      ],
    }],
    manifestationLores: [{
      id: "first-prince-manifestations",
      name: "Manifestations of the First Prince",
      manifestations: ["eightfold-doom-sigil"],
    }],
    manifestations,
  },
}];

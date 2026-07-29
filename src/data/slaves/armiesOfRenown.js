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
    abilities: [a("The Thinning Veil", "End of Any Turn", "If this unit is in combat, return D3 slain models to it.")],
  }, "/images/units/blades/bloodletters.jpg"),
  daemon({
    id: "first-prince-bloodcrushers", name: "Legion of the First Prince Bloodcrushers", points: 150,
    models: 3, move: '8"', health: 5, control: 2, save: "4+", ward: "6+", baseSize: "90×52mm",
    keywords: ["Cavalry", "Champion", "Musician (1/3)", "Standard Bearer (1/3)", "Ward (6+)", "Legion of the First Prince", "Daemon"],
    weapons: [w("Bloodcrusher Hellblade", "Melee", 2, "3+", "3+", 1, 1, ["Anti-Infantry (+1 Rend)", "Crit (Mortal)"]), w("Juggernaut's Brazen Hooves", "Melee", 2, "4+", "3+", 1, "D3", ["Companion"])],
    abilities: [a("Slaughterous Charge", "Any Charge Phase", "If this unit charged this phase, pick an enemy unit within 1\" and roll a D3. On a 2+, inflict mortal damage equal to the roll.")],
  }, "/images/units/blades/bloodcrushers.jpg"),
  daemon({
    id: "first-prince-screamers", name: "Legion of the First Prince Screamers of Tzeentch", points: 80,
    models: 3, move: '14"', health: 2, save: "5+", ward: "6+", baseSize: "32mm",
    keywords: ["Beast", "Fly", "Ward (6+)", "Legion of the First Prince", "Daemon"],
    weapons: [w("Lamprey Bite", "Melee", 3, "4+", "3+", 1, 1, ["Anti-Monster (+1 Rend)", "Companion"])],
    abilities: [a("Slashing Fins", "Your Movement Phase", "Pick an enemy unit this unit passed across and roll a dice for each model in this unit that passed across it. For each 4+, inflict 1 mortal damage."), a("Beast", "Passive", "This unit's maximum control score is 1.")],
  }, "/images/units/disciples/screamers.jpg"),
  daemon({
    id: "first-prince-flamers", name: "Legion of the First Prince Flamers of Tzeentch", points: 120,
    models: 3, move: '6"', health: 3, save: "5+", ward: "6+", baseSize: "32mm",
    keywords: ["Infantry", "Champion", "Fly", "Ward (6+)", "Legion of the First Prince", "Daemon"],
    weapons: [w("Warping Flames", "Ranged", 3, "3+", "4+", 0, "D3", ["Anti-Infantry (+1 Rend)"], '12"'), w("Flaming Maws", "Melee", 3, "3+", "4+", 0, 1)],
    abilities: [a("Wyrdflame of Tzeentch", "Your Shooting Phase", "Pick an enemy unit. Add 1 to wound rolls for this unit's shooting attacks against it. If every shooting attack made by this unit targets it, inflict D3 mortal damage on it after resolving those attacks.", "Once Per Turn (Army)")],
  }, "/images/units/disciples/flamers.jpg"),
  daemon({
    id: "first-prince-plaguebearers", name: "Legion of the First Prince Plaguebearers", points: 140,
    models: 10, move: '4"', health: 2, save: "6+", ward: "5+", baseSize: "32mm",
    keywords: ["Infantry", "Champion", "Musician (1/10)", "Standard Bearer (1/10)", "Ward (5+)", "Legion of the First Prince", "Daemon"],
    weapons: [w("Plaguesword", "Melee", 2, "4+", "3+", 0, 1, ["Crit (Mortal)"])],
    abilities: [a("Cloud of Flies", "Passive", "Subtract 1 from hit rolls for shooting attacks that target this unit.")],
  }, "/images/factions/slaves.webp"),
  daemon({
    id: "first-prince-beast-of-nurgle", name: "Legion of the First Prince Beasts of Nurgle", points: 120,
    move: '5"', health: 8, save: "5+", ward: "5+", baseSize: "60mm",
    keywords: ["Beast", "Ward (5+)", "Legion of the First Prince", "Daemon"],
    weapons: [w("Filthy Claws and Slobbering Maw", "Melee", 5, "4+", "3+", 1, "D3", ["Companion"])],
    abilities: [a("Attention Seekers", "Any Charge Phase", "This unit charges 2D6\" towards the closest enemy unit, passing through it if necessary. End the move within 1\" of it and inflict D3 mortal damage on it.", "Once Per Turn (Army)"), a("Beast", "Passive", "This unit's maximum control score is 1.")],
  }, "/images/factions/slaves.webp"),
  daemon({
    id: "first-prince-fiends", name: "Legion of the First Prince Fiends", points: 140,
    models: 3, move: '10"', health: 4, control: 2, save: "5+", ward: "6+", baseSize: "75×42mm",
    keywords: ["Beast", "Champion", "Ward (6+)", "Legion of the First Prince", "Daemon"],
    weapons: [w("Deadly Pincers and Barbed Stinger", "Melee", 4, "4+", "3+", 1, "D3", ["Anti-Monster (+1 Rend)", "Companion"])],
    abilities: [a("Soporific Musk", "Any Combat Phase", "Pick an enemy unit in combat with this unit. On a 4+, that unit has Strike-last this turn.", "Once Per Turn (Army)"), a("Disruptive Song", "Passive", "Subtract 1 from casting and unbinding rolls for enemy Wizards within 12\"."), a("Beast", "Passive", "This unit's maximum control score is 1.")],
  }, "/images/units/hedonitas/fiends.webp"),
  daemon({
    id: "first-prince-hellflayer", name: "Legion of the First Prince Hellflayer", points: 130,
    move: '10"', health: 7, save: "4+", ward: "6+", baseSize: "120×92mm",
    keywords: ["War Machine", "Ward (6+)", "Legion of the First Prince", "Daemon"],
    weapons: [w("Flensing Whips and Piercing Claws", "Melee", 6, "4+", "4+", 0, 1), w("Steeds' Poisoned Tongues", "Melee", 4, "3+", "4+", 0, 1, ["Companion"]), w("Axle Blades", "Melee", 4, "4+", "2+", 2, "D3", ["Anti-Infantry (+1 Rend)", "Companion"])],
    abilities: [a("Soul Scent", "Any Movement Phase", "Pick up to 3 enemy units this unit passed across and roll a D3 for each. On a 2+, inflict mortal damage equal to the roll. If this ability slays a model, this unit has Ward (5+) this turn."), a("Threshing Doom", "Passive", "This unit can pass through enemy Infantry models and their combat ranges when it moves.")],
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
  description: "All units in the army gain the Legion of the First Prince keyword, except those included in a Regiment of Renown.",
  roster: ["Be'lakor", "Daemon Prince", "Eternus", "Varanguard", "Chaos Sorcerer Lord", "Chaos Legionnaires", "Chaos Furies", "Centaurion Marshal", "Legion of the First Prince Daemons"],
  rules: {
    units,
    battleTraits: [
      r("first-damned-prince", "First-damned Prince", "Passive", "While Be'lakor is in combat and within the combat range of a friendly non-Hero Legion of the First Prince Daemon, he has Ward (4+). After resolving his damage sequence, for each successful ward roll, allocate 1 damage point to one of those Daemons within his combat range; ward rolls cannot be made for that damage."),
      r("daemonic-reinforcements", "Daemonic Reinforcements", "Any Movement Phase", "Pick a friendly non-Hero Daemon Infantry or Cavalry unit that has been destroyed and set up a replacement unit with half the number of models wholly within 12\" of Be'lakor and more than 9\" from all enemy units.", "Once Per Turn (Army)"),
      r("storm-blackened-blades", "Storm of Blackened Blades", "Your Combat Phase", "Once per battle, add 1 to the Attacks characteristic of combat weapons used by Eternus and up to 2 friendly non-Hero, non-Daemon units wholly within 12\" this turn.", "Once Per Battle (Army)"),
      r("bestow-favour", "Bestow Favour", "Your Hero Phase", "If Be'lakor is on the battlefield, pick a friendly non-Hero unit. Add 5 to its control score until the start of your next turn. In addition, add 1 to save rolls for it if it is a Daemon, or it has Ward (6+) if it is not.", "Once Per Turn (Army)"),
    ],
    heroicTraits: [r("dread-marshal", "Dread Marshal", "Any Charge Phase", "Pick up to 3 friendly units wholly within 12\". Add 1 to their charge rolls this turn.")],
    artefacts: [r("black-ritual-dagger", "Black Ritual Dagger", "Reaction: You declared a Spell ability", "Allocate 1 damage point to the bearer to re-roll the casting roll.")],
    spellLores: [{
      id: "first-prince-spells",
      name: "Spell Lore of the First Prince",
      spells: [
        { ...r("dark-cantrip", "Dark Cantrip", "Your Hero Phase", "Casting value 6, Unlimited. Pick up to 3 visible enemy units within 18\". Each suffers 1 mortal damage."), castingValue: 6 },
        { ...r("shroud-in-darkness", "Shroud in Darkness", "Your Hero Phase", "Casting value 7. Pick a visible friendly unit wholly within 12\" that is not in combat. It can move D6\" but cannot end that move in combat, and it is not visible to units more than 12\" away until the start of your next turn."), castingValue: 7 },
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

import { ability, createUnit, weapon } from "./unitFactory";

export default [
  createUnit({
    id: "scourge-chaos-lord-on-karkadrak",
    name: "Scourge of Aqshy Chaos Lord on Karkadrak",
    source: "Scourge of Aqshy",
    points: 230,
    move: '9"',
    health: 10,
    control: 2,
    save: "3+",
    baseSize: "90×52mm",
    imageAlias: "chaos_lord_karkadrak",
    keywords: ["Hero", "Cavalry", "Warriors of Chaos"],
    regimentOptions: ["0-1 Ruinous Champion", "Any Slaves to Darkness"],
    canJoinRegimentAs: ["ruinous-champion"],
    weapons: [
      weapon("Hexed Weapons", "Melee", 5, "3+", "3+", 1, 2, ["Charge (+1 Damage)", "Crit (Mortal)"]),
      weapon("Karkadrak's Claws and Horn", "Melee", 4, "4+", "3+", 1, 2, ["Companion"]),
    ],
    abilities: [
      ability("Ferocious Influence", "Any Combat Phase", "Si cargó, elige un enemigo en combate. +1 Damage a las armas Companion de esta unidad contra él y +1 a impactar con armas Companion de Cavalry y War Machines Slaves to Darkness amigas totalmente a 12\".", "Once Per Turn (Army)"),
      ability("Wrathful Abandon", "End of Any Turn", "Si cargó, esta unidad y una Warriors of Chaos amiga no Hero que cargó y está totalmente a 12\" pueden mover tantas pulgadas como tu nivel de furia, manteniendo sus combates previos y sin entrar en otros.", "Once Per Turn (Army)"),
    ],
    rules: { hero: true, canBeReinforced: false },
  }),
  createUnit({
    id: "scourge-chaos-warriors",
    name: "Scourge of Aqshy Chaos Warriors",
    source: "Scourge of Aqshy",
    points: 200,
    models: 10,
    move: '5"',
    health: 2,
    control: 1,
    save: "3+",
    baseSize: "32mm",
    imageAlias: "chaos_warriors",
    keywords: ["Infantry", "Champion", "Musician (1/10)", "Standard Bearer (1/10)", "Warriors of Chaos"],
    weapons: [weapon("Rune-etched Weapons", "Melee", 2, "3+", "3+", 1, 1, ["Crit (Auto-wound)"])],
    abilities: [
      ability("For the Glory of the Dark Gods", "Your Hero Phase", "Hasta tu siguiente turno, aplica efectos acumulativos según tu furia: 1+, Ward (6+); 4+, Anti-charge (+1 Rend) en combate; 7, Strike-first mientras no haya cargado.", "Once Per Turn (Army)"),
    ],
  }),
];

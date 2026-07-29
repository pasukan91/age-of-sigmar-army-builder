const summon = (name, description) => ({
  name: `Summon ${name}`,
  type: "Spell",
  phase: "Your Hero Phase",
  castingValue: 7,
  keywords: ["Spell", "Summon"],
  description,
});

export default [
  {
    id: "darkfire-daemonrift",
    name: "Darkfire Daemonrift",
    image: "/images/units/slaves/darkfire-daemonrift.jpg",
    castingValue: 7,
    profile: { move: '9"', health: 6, control: "-", save: "6+", ward: "6+", banishment: "7+" },
    weapons: [
      { name: "Darkfire Torrent", type: "Ranged", range: '8"', attacks: "D6", hit: "2+", wound: "3+", rend: 1, damage: 1, abilities: ["Shoot in Combat"] },
      { name: "Daemonrift Maw", type: "Melee", attacks: 3, hit: "4+", wound: "2+", rend: 0, damage: "D3", abilities: [] },
    ],
    abilities: [{
      name: "Fuelled by Sorcery",
      phase: "Passive",
      description: "Cada spell lanzado por una unidad a 12\" le da 1 punto de energía ruinosa, hasta 6. Suma 1 a Ataques de Darkfire Torrent por cada punto; los pierde al ser retirado.",
    }],
    summonSpell: summon("Darkfire Daemonrift", "Despliega un Darkfire Daemonrift totalmente a 12\" del lanzador, visible y a más de 9\" del enemigo."),
    keywords: ["Manifestation", "Endless Spell", "Fly", "Ward (6+)", "Chaos", "Slaves to Darkness"],
  },
  {
    id: "realmscourge-rupture",
    name: "Realmscourge Rupture",
    image: "/images/units/slaves/realmscourge_rupture.jpg",
    castingValue: 7,
    profile: { move: '9"', health: 6, control: "-", save: "5+", ward: "6+", banishment: "7+" },
    weapons: [{ name: "Surging Spikes", type: "Melee", attacks: "2D3", hit: "4+", wound: "3+", rend: 1, damage: 1, abilities: ["Crit (2 Hits)"] }],
    abilities: [{
      name: "Debilitating Shockwave",
      phase: "Any Charge Phase",
      description: "Si cargó, elige un enemigo a 1\" y tira por cada miniatura; cada 6 causa 1 mortal. Si mata alguna, el objetivo tiene -1 a impactar este turno.",
    }],
    summonSpell: summon("Realmscourge Rupture", "Despliega una Realmscourge Rupture totalmente a 12\" del lanzador, visible y a más de 9\" del enemigo."),
    keywords: ["Manifestation", "Endless Spell", "Fly", "Ward (6+)", "Chaos", "Slaves to Darkness"],
  },
  {
    id: "eightfold-doom-sigil",
    name: "Eightfold Doom-Sigil",
    image: "/images/units/blades/Eightfold_Doom-Sigil.jpg",
    castingValue: 7,
    profile: { move: "-", health: 6, control: "-", save: "5+", ward: "6+", banishment: "7+" },
    weapons: [],
    abilities: [{
      name: "Empowered by Atrocity",
      phase: "Passive",
      description: "Si 2 o más unidades amigas o enemigas fueron destruidas este turno, +1 Ataques en combate para unidades Slaves to Darkness amigas totalmente a 12\" durante el resto del turno.",
    }],
    summonSpell: summon("Eightfold Doom-Sigil", "Despliega un Eightfold Doom-Sigil totalmente a 12\" del lanzador y visible."),
    keywords: ["Manifestation", "Endless Spell", "Ward (6+)", "Chaos", "Slaves to Darkness"],
  },
];

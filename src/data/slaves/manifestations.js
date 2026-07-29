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
      description: "Each spell successfully cast by a unit within 12\" gives this manifestation 1 ruinous energy point, to a maximum of 6. Add 1 to the Attacks characteristic of Darkfire Torrent for each point. All points are lost when this manifestation is removed from play.",
    }],
    summonSpell: summon("Darkfire Daemonrift", "Set up a Darkfire Daemonrift wholly within 12\" of and visible to the caster, and more than 9\" from all enemy units."),
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
      description: "If this manifestation charged this phase, pick an enemy unit within 1\" and roll a dice for each model in that unit. For each 6, inflict 1 mortal damage. If any models are slain, subtract 1 from hit rolls for that unit's attacks this turn.",
    }],
    summonSpell: summon("Realmscourge Rupture", "Set up a Realmscourge Rupture wholly within 12\" of and visible to the caster, and more than 9\" from all enemy units."),
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
      description: "If 2 or more friendly or enemy units were destroyed this turn, add 1 to the Attacks characteristic of combat weapons used by friendly Slaves to Darkness units wholly within 12\" for the rest of the turn.",
    }],
    summonSpell: summon("Eightfold Doom-Sigil", "Set up an Eightfold Doom-Sigil wholly within 12\" of and visible to the caster."),
    keywords: ["Manifestation", "Endless Spell", "Ward (6+)", "Chaos", "Slaves to Darkness"],
  },
];

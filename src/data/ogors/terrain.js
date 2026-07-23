const terrain = [{
  id: "mawpit",
  name: "Mawpit",
  image: "/images/units/ogors/mawpit.jpg",
  profile: { move: "-", health: 12, control: "-", save: "-", ward: "6+" },
  universalAbilities: ["Cover", "Impassable"],
  abilities: [
    { name: "Feed the Maw", type: "Your Hero Phase", phase: "Your Hero Phase", description: "If this feature has no Head Butcher, place a friendly Butcher within 3\" and not in combat on it. That unit becomes its Head Butcher." },
    { name: "Step Away from the Maw", type: "Your Movement Phase", phase: "Your Movement Phase", description: "If its Head Butcher was not placed this turn, set that Butcher up wholly within 3\" and not in combat. It is no longer the Head Butcher." },
    { name: "Hungry Sinkhole", type: "Once Per Turn (Army)", phase: "End of Any Turn", description: "Pick this Mawpit as a sinkhole and optionally one previously chosen terrain feature within range (12\", increasing by 3\" each round after the first, or by 6\" with a Head Butcher). For every enemy within 3\" of either sinkhole, roll D3; on a 2+, inflict mortal damage equal to the roll." },
  ],
  details: { models: 1, baseSize: null },
  keywords: ["Faction Terrain", "Ward (6+)", "Destruction", "Ogor Mawtribes"],
}];

export default terrain;

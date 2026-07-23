const terrain = [{
  id: "awakened-wyldwood",
  name: "Awakened Wyldwood",
  image: "/images/units/sylvaneth/awakened-wyldwood.jpg",
  profile: { move: "-", health: 8, control: "-", save: "4+", ward: null },
  universalAbilities: ["Cover", "Obscuring", "Unstable"],
  abilities: [
    { name: "Budding", type: "Passive", phase: null, description: "When this terrain feature is set up, give it a friendly overgrown token." },
    { name: "Ever Growing", type: "Once Per Turn (Army)", phase: "Start of Battle Round", description: "Pick the closest terrain feature that does not have a friendly overgrown token and is not controlled by your opponent, and give it a friendly overgrown token." },
    { name: "Vengeful Forest Spirits", type: "Once Per Turn (Army)", phase: "Any Combat Phase", description: "Roll a D3 for each enemy unit within 3\". On a 2+, inflict mortal damage equal to the roll." },
  ],
  details: { models: "1-3", baseSize: "Terrain feature" },
  keywords: ["Faction Terrain", "Order", "Sylvaneth"],
}];

export default terrain;

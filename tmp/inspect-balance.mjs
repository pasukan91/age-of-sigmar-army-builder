import data from "../src/data/aosCommunityAllFactions.generated.json" with { type: "json" };

const wanted = new Set([
  "Blazing Impetus", "Abyssal Dweller", "Frenzied Surge", "Brand of the Unaligned",
  "Oracular Visions", "Oath of Conquest", "A Reputation for Cunning", "Lightning Master",
  "There is No Escape", "Shadowy Aura", "Sentenced to Eternal Torment", "Spectral Alchemy",
  "Amassed Legions", "Bulls of the Ziggurat", "Arcane Dominance", "Experimental Munitions",
  "Smoke and Mirrors", "All Part of the Plan", "Lingering Burns",
  "Supreme Lord of the Bonereaper Legions", "Impossible to Destroy",
]);

function walk(value, path = []) {
  if (Array.isArray(value)) return value.forEach((item, index) => walk(item, [...path, index]));
  if (!value || typeof value !== "object") return;
  if (wanted.has(value.name)) {
    console.log(`\n${path.join(".")} :: ${value.name}`);
    console.log(JSON.stringify(value, null, 2));
  }
  for (const [key, nested] of Object.entries(value)) walk(nested, [...path, key]);
}

walk(data.factions);

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const catalogue = JSON.parse(
  readFileSync(new URL("../src/data/aosCommunityWording.generated.json", import.meta.url))
);

test("covers every playable battletome faction with bot wording", () => {
  assert.equal(catalogue.metadata.dataVersion, 476);
  assert.equal(Object.keys(catalogue.factions).length, 22);

  for (const [name, faction] of Object.entries(catalogue.factions)) {
    assert.ok(faction.formations.length > 0, `${name} has no battle formations`);
    assert.ok(Object.keys(faction.rules).length > 0, `${name} has no rules`);
  }
});

test("keeps exact bold, italic and typographic wording from the bot", () => {
  const kruleboyz = catalogue.factions.Kruleboyz;
  const lightFinga = kruleboyz.formations.find((item) => item.name === "Light Finga");
  assert.equal(
    lightFinga.description,
    "Effect: You can use the ‘Sneaky Sneakin'’ **DIRTY TRICK** ability twice per turn instead of only once per turn."
  );

  const hedonites = catalogue.factions["Hedonites of Slaanesh"];
  const cuttingBarbs = hedonites.rules["cutting barbs"][0];
  assert.match(cuttingBarbs.description, /\*\*\*Rise to the Insults\*\*\*/);
  assert.match(cuttingBarbs.description, /\*\*HEDONITES OF SLAANESH HERO\*\*/);
});

test("contains all current bot formations, including Ogor Mawtribes", () => {
  assert.equal(catalogue.factions["Ogor Mawtribes"].formations.length, 6);
  assert.ok(
    catalogue.factions["Ogor Mawtribes"].formations.some(
      (item) => item.name === "Greedy Eaters" && item.points === 10
    )
  );
});

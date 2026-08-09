import assert from "node:assert/strict";
import test from "node:test";
import armiesOfRenown from "./armiesOfRenown.js";
import scourgeUnits from "./scourgeOfAqshy.js";
import terrain from "./terrain.js";
import units from "./units.js";

const expectedPoints = {
  "morga-the-mighty": 430,
  "grell-firefist": 150,
  "tyrant-on-glutthorn": 400,
  tyrant: 150,
  "maulbeast-cavalry": 280,
  gluttons: 200,
  ironguts: 200,
  ironblaster: 180,
  "gnoblar-scraplauncher": 160,
  "frostlord-on-stonehorn": 340,
  "frostlord-on-thundertusk": 280,
  "huskard-on-stonehorn": 300,
  "huskard-on-thundertusk": 280,
  "bloodpelt-hunter": 130,
  mantrapper: 130,
  "hunters-with-sabrefangs": 160,
  "maulbeast-raiders": 230,
  "stonehorn-beastriders": 280,
  "thundertusk-beastriders": 240,
  "redd-the-maw": 400,
  butcher: 170,
  cleavers: 220,
  gutseers: 200,
  "gorger-mawpack": 240,
};

const unit = (id) => units.find((item) => item.id === id);

test("uses the supplied Ogor points table", () => {
  assert.deepEqual(
    Object.fromEntries(units.map(({ id, points }) => [id, points])),
    expectedPoints,
  );
});

test("keeps the corrected battletome profiles and warscroll rules", () => {
  assert.deepEqual(unit("tyrant").profile, { move: '6"', health: 10, control: 3, save: "3+", ward: null });
  assert.equal(unit("gluttons").details.models, 5);
  assert.equal(unit("ironguts").details.models, 3);
  assert.equal(unit("hunters-with-sabrefangs").weapons.find(({ name }) => name === "Skinning Blades").damage, "1");
  assert.equal(unit("hunters-with-sabrefangs").weapons.find(({ name }) => name === "Sabrefang's Tusks and Claws").damage, "1");
  assert.ok(unit("tyrant").abilities.some(({ name }) => name === "Brawlerguts"));
  assert.ok(unit("ironblaster").abilities.some(({ name }) => name === "Obliterating Blast"));
  assert.ok(unit("butcher").abilities.some(({ name }) => name === "Trogg-Guts"));
});

test("includes the complete battletome Armies of Renown corrections", () => {
  const meatfist = armiesOfRenown.find(({ id }) => id === "meatfist-mawtribe");
  const beastclaw = armiesOfRenown.find(({ id }) => id === "beastclaw-alfrostun");
  const gollop = armiesOfRenown.find(({ id }) => id === "mawseeker-gollop");

  assert.equal(meatfist.excludesRegimentsOfRenown, true);
  assert.ok(meatfist.rules.battleTraits.some(({ name }) => name === "The Unstoppable Feast"));
  assert.equal(beastclaw.rules.prayerLores[0].prayers.find(({ id }) => id === "keening-gale").chantingValue, 3);
  assert.equal(gollop.rules.spellLores[0].spells.find(({ id }) => id === "bloodgruel").castingValue, 7);
  assert.equal(gollop.rules.spellLores[0].spells.find(({ id }) => id === "the-cosmos-writhes").castingValue, 6);
});

test("matches the supplied Scourge of Aqshy warscroll wording and profiles", () => {
  const huskard = scourgeUnits.find(({ id }) => id.startsWith("huskard"));
  const frostlord = scourgeUnits.find(({ id }) => id.startsWith("frostlord"));

  assert.equal(huskard.profile.health, 14);
  assert.equal(huskard.weapons.find(({ name }) => name === "Punches and Kicks").attacks, 3);
  assert.ok(huskard.abilities.some(({ name }) => name === "Everwinter's Ire"));
  assert.equal(frostlord.profile.health, 15);
  assert.ok(frostlord.abilities.some(({ name }) => name === "Cold Fury"));
});

test("keeps the complete Mawpit warscroll", () => {
  const mawpit = terrain.find(({ id }) => id === "mawpit");
  assert.equal(mawpit.profile.save, "4+");
  assert.deepEqual(mawpit.weapons[0], {
    name: "Ever-hungry Pit",
    type: "Melee",
    attacks: "2D6",
    hit: "4+",
    wound: "2+",
    rend: "1",
    damage: "1",
    abilities: ["Crit (Mortal)"],
  });
});

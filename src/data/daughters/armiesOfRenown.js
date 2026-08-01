import units from "./units";
import manifestations from "./manifestations";
import terrain from "./terrain";

const rule = (id, name, type, phase, description, keywords = []) => ({ id, name, type, phase, description, keywords });
const enhancement = (id, name, description, phase = null) => ({ id, name, source: "Army of Renown", points: 0, phase, description });
const getUnits = (ids) => ids.map((id) => units.find((unit) => unit.id === id)).filter(Boolean);

function manifestationPrayer(manifestation, value, summoner, invocation = "Prayer") {
  const isPrayer = invocation === "Prayer";
  const range = manifestation.id === "heart-of-fury" ? '18"' : '12"';
  const enemyDistance = manifestation.id === "heart-of-fury" ? "" : ' and more than 9" from enemies';
  return {
    ...manifestation,
    summonSpell: {
      name: isPrayer ? "Violent Consecration" : "Manifestations of Murder",
      type: invocation,
      phase: "Your Hero Phase",
      ...(isPrayer ? { chantingValue: value } : { castingValue: value }),
      keywords: [invocation, "Summon", ...(isPrayer ? [] : ["Unlimited"])],
      description: `Declare: Pick a friendly ${summoner} to ${isPrayer ? "chant this prayer" : "cast this spell"}, then make a ${isPrayer ? "chanting" : "casting"} roll.\n\nEffect: Set up ${manifestation.name} wholly within ${range} of the ${isPrayer ? "chanter" : "caster"}, visible to them${enemyDistance}.`,
    },
  };
}

const championsIds = ["high-gladiatrix", "hag-queen", "slaughter-queen", "blood-hags", "sisters-of-slaughter", "witch-aelves"];
const zaintharIds = ["morathi-khaine", "the-shadow-queen", "melusai-ironscale", "blood-sisters", "blood-stalkers", "khinerai-heartrenders", "khinerai-lifetakers", "bloodwrack-medusa", "bloodwrack-shrine"];

const championsManifestations = manifestations
  .filter((item) => item.id !== "avatar-of-khaine")
  .map((item) => manifestationPrayer(item, 4, "Champions of the Arena Priest"));
const zaintharManifestations = manifestations
  .filter((item) => item.id !== "avatar-of-khaine")
  .map((item) => manifestationPrayer(item, 7, "Zainthar Kai Wizard", "Spell"));

const armiesOfRenown = [
  {
    id: "champions-of-the-arena",
    name: "Champions of the Arena",
    roster: ["High Gladiatrix", "Hag Queen", "Slaughter Queen", "Blood Hags", "Sisters of Slaughter", "Witch Aelves"],
    requiredUnits: [],
    excludesRegimentsOfRenown: true,
    description: "Khainite gladiators whose frenzy grows as casualties mount across the arena.",
    rules: {
      units: getUnits(championsIds),
      battleTraits: [
        rule("arena-of-slaughter", "Arena of Slaughter", "Passive", null, "Cumulative effects based on units destroyed this battle: 1 gives +1 run; 2 gives +1 charge; 3 gives +1 combat hit; 4 gives +1 combat wound; 5 gives +1 Attack to melee weapons."),
        rule("let-the-blood-flow", "Let the Blood Flow", "Passive", null, "Arena of Slaughter applies only while wholly within X of a friendly Shrine of Dark Tribute: 9\" in round 1, 12\" in round 2, 15\" in round 3, 18\" in round 4 and 21\" in round 5."),
        rule("frenzied-restoration", "Frenzied Restoration", "Once Per Battle (Army)", "End of Any Turn", "Pick a destroyed friendly Champions of the Arena Hero and set up a replacement wholly within 12\" of a friendly Shrine of Dark Tribute and more than 9\" from enemies."),
        rule("explosive-fury", "Explosive Fury", "Once Per Turn (Army)", "Any Combat Phase", "Pick a friendly Slaughter Queen, each friendly Blood Hags unit and each visible friendly Champions of the Arena unit wholly within 12\" of that Queen. Add 3\" to their pile-in moves this turn."),
      ],
      heroicTraits: [enhancement("hero-of-the-killing-games", "Hero of the Killing Games", "While in combat with any enemy Heroes, add 1 to the Attacks, Rend and Damage of this unit's melee weapons, and all its combat attacks must target the same enemy Hero.", "Any Combat Phase")],
      artefacts: [enhancement("death-razor", "Death Razor", "After this unit fights and slays any enemy models, pick a friendly Champions of the Arena Priest wholly within 12\". Its next Prayer this turn uses an unmodifiable chanting roll of 10, even if this unit has been destroyed.", "Reaction: You declared a Fight ability")],
      prayerLores: [{
        id: "champions-of-the-arena-prayers",
        name: "Prayers of the Arena",
        prayers: [
          { id: "divine-rush", name: "Divine Rush", chantingValue: 3, keywords: ["Prayer", "Unlimited"], description: "Pick a visible friendly Champions of the Arena unit wholly within 12\"; on a 6+, pick a second. A target not in combat moves D6\" without entering combat; a target in combat can pile in." },
          { id: "call-of-the-arena", name: "Call of the Arena", chantingValue: 3, keywords: ["Prayer"], description: "Friendly Champions of the Arena units wholly within 12\" gain +1 run this turn. On a 6+, they also gain +1 charge." },
          { id: "shield-of-blood", name: "Shield of Blood", chantingValue: 3, keywords: ["Prayer"], description: "Pick a visible friendly Champions of the Arena unit wholly within 12\"; on a 10+, pick up to 2 additional targets. Each has Ward (5+) until your next turn." },
        ],
      }],
      manifestations: championsManifestations,
      manifestationLores: [{ id: "violent-consecration", name: "Violent Consecration", manifestations: championsManifestations }],
      terrain,
    },
  },
  {
    id: "zainthar-kai",
    name: "Zainthar Kai",
    roster: ["Morathi-Khaine (must be included)", "The Shadow Queen (must be included)", "Melusai Ironscale", "Blood Sisters", "Blood Stalkers", "Khinerai Heartrenders", "Khinerai Lifetakers", "Bloodwrack Medusa", "Bloodwrack Shrine"],
    requiredUnits: ["morathi-khaine", "the-shadow-queen"],
    excludesRegimentsOfRenown: true,
    description: "Morathi-Khaine and her most devoted Scathborn unleash their cursed heritage.",
    rules: {
      units: getUnits(zaintharIds),
      battleTraits: [
        rule("dark-majesty", "Dark Majesty", "Passive", null, "Unmodified hit rolls of 1-4 for attacks made by non-Hero units that target Morathi-Khaine fail."),
        rule("the-blood-saints", "The Blood Saints", "Passive", null, "While the Shadow Queen is wholly within 6\" of a friendly non-Hero Zainthar Kai unit, both units have Ward (5+)."),
        rule("matriarch-of-the-zainthar-kai", "Matriarch of the Zainthar Kai", "Once Per Battle (Army)", "Your Hero Phase", "Pick Morathi-Khaine and choose: Move 12\" and Fly until next turn; use Iron Heart of Khaine as if a blood rite was performed; stop a visible enemy within 18\" scoring critical hits this turn; or replace a destroyed friendly non-Unique Zainthar Kai Hero within 3\"."),
        rule("cursed-heritage", "Cursed Heritage", "Once Per Turn (Army)", "End of Your Turn", "Inflict D3 mortal damage on each enemy in combat with any friendly non-Unique Zainthar Kai units."),
      ],
      heroicTraits: [enhancement("khaines-inheritor", "Khaine's Inheritor", "Pick a visible enemy within 12\" and roll a D3. On a 2+, inflict mortal damage equal to the roll and halve its Move until your next turn.", "Your Shooting Phase")],
      artefacts: [enhancement("amulet-of-the-bladed-queen", "Amulet of the Bladed Queen", "This unit has Ward (5+) and add 1 to its save rolls.")],
      spellLores: [{
        id: "zainthar-kai-spell-lore",
        name: "Sorceries of the Zainthar Kai",
        spells: [
          { id: "ethereal-grace", name: "Ethereal Grace", castingValue: 6, keywords: ["Spell", "Unlimited"], description: "Pick a visible friendly Zainthar Kai unit wholly within 12\". Add 2\" to its Move this turn." },
          { id: "on-wings-of-shadow", name: "On Wings of Shadow", castingValue: 7, keywords: ["Spell"], description: "Pick a visible friendly Zainthar Kai unit wholly within 12\". Reposition it more than 9\" from enemies." },
          { id: "speed-of-the-scathborn", name: "Speed of the Scathborn", castingValue: 7, keywords: ["Spell"], description: "Pick a visible friendly Zainthar Kai unit wholly within 12\". It has Strike-first this turn." },
        ],
      }],
      manifestations: zaintharManifestations,
      manifestationLores: [{ id: "manifestations-of-murder", name: "Manifestations of Murder", manifestations: zaintharManifestations }],
      terrain,
    },
  },
];

export default armiesOfRenown;

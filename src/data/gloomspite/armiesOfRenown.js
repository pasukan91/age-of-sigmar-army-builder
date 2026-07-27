import units from "./units";
import { manifestations } from "./rules";

const rule = (id, name, type, phase, description) => ({
  id,
  name,
  type,
  phase,
  description,
});

const heroicTrait = (id, name, description) => ({
  id,
  name,
  source: "Army of Renown",
  points: 0,
  description,
});

const gitmobUnits = units.filter((unit) =>
  unit.keywords.includes("Gitmob") || unit.id === "droggz-da-sunchompa"
);
const kingsGitzUnits = units.filter((unit) =>
  unit.keywords.includes("Moonclan") ||
  (unit.keywords.includes("Troggoth") && unit.rules.hero !== true)
);

const armiesOfRenown = [
  {
    id: "droggzs-gitmob",
    name: "Droggz's Gitmob",
    roster: ["Droggz Da Sunchompa", "Any Gitmob units"],
    requiredUnits: ["droggz-da-sunchompa"],
    excludesRegimentsOfRenown: true,
    description: "Droggz dirige una fuerza Gitmob rápida que rodea, deslumbra y abandona los combates desfavorables.",
    rules: {
      units: gitmobUnits,
      battleTraits: [
        rule("get-around-em", "Get Around 'Em", "Deployment Phase", "Deployment Phase", "Set up a friendly unit in reserve outflanking the enemy."),
        rule("surprise-ya-gitz", "Surprise, Ya Gitz!", "Ability", "Your Movement Phase", "Set up an outflanking unit wholly within 6\" of an edge and more than 9\" from enemies."),
        rule("glowering-light", "Glowering Light", "Once Per Turn (Army)", "Any Combat Phase", "On a 3+, an enemy in combat with a friendly unit that charged cannot pile in for the turn."),
        rule("this-fights-not-fer-me", "This Fight's Not Fer Me", "Once Per Turn (Army)", "Enemy Combat Phase", "On a 4+, a friendly unit engaged only by enemies that charged can immediately Retreat."),
      ],
      heroicTraits: [
        heroicTrait("stick-em-and-run", "Stick 'Em and Run", "Each time this unit Retreats or uses Frazzlegit's Flame Stream, on a 2+ inflict D3 mortal damage on an enemy in combat."),
        heroicTrait("plucky-git", "Plucky Git", "While undamaged, friendly Droggz's Gitmob units wholly within 9\" have Ward (6+)."),
      ],
      artefacts: [heroicTrait("glarefaces-grin", "Glareface's Grin", "Once per battle in your shooting phase, pick a point within 9\". Each enemy within 3\" suffers D3 mortal damage on a 2+.")],
      spellLores: [{
        id: "droggzs-gitmob-spells",
        name: "Droggz's Gitmob Spells",
        spells: [{
          id: "frazzleblast",
          name: "Frazzleblast",
          castingValue: 5,
          keywords: ["Unlimited"],
          description: "A visible friendly Droggz's Gitmob unit wholly within 12\" gains Crit (2 Hits) on melee weapons until your next turn.",
        }],
      }],
      manifestationLores: [{
        id: "droggzs-mushroom",
        name: "Mork's Mighty Mushroom",
        manifestations: [manifestations.find((item) => item.id === "morks-mighty-mushroom")],
      }],
    },
  },
  {
    id: "da-kings-gitz",
    name: "Da King's Gitz",
    roster: ["Skragrott, the Loonking", "Any Moonclan units", "0-1 Bad Moon Loonshrine", "0-2 non-Hero Troggoth units"],
    requiredUnits: ["skragrott-the-loonking"],
    excludesRegimentsOfRenown: true,
    description: "La corte de Skragrott combina hordas Moonclan con una guardia limitada de troggoths.",
    rules: {
      units: kingsGitzUnits,
      battleTraits: [
        rule("the-moon-and-the-loon", "The Moon and the Loon", "Passive", null, "While a friendly unit is wholly within 9\" of a friendly Skragrott, a friendly Malevolent Moon or a friendly Bad Moon Loonshrine, non-Squig Moonclan units gain +5 control and Squig units can use Move 4 instead of rolling."),
        rule("da-kings-guards", "Da King's Guards", "Passive", null, "A Hero in combat range of a friendly Troggoth has Ward (4+); successful wards allocate 1 damage to that Troggoth."),
      ],
      heroicTraits: [
        heroicTrait("da-loon-kings-court", "Da Loon King's Court", "Once per battle in deployment, give enhancements to up to D3 friendly non-Unique Heroes without enhancements."),
        heroicTrait("da-kings-adjutant", "Da King's Adjutant", "You cannot use this ability and the Bad Moon Loonshrine's Moonclan Lairs ability in the same turn. If this unit is within 12\" of a friendly Bad Moon Loonshrine, pick a destroyed friendly non-reinforced, non-Hero, non-Monster King's Gitz unit to be the target and set up its replacement."),
        heroicTrait("glarejester", "Glarejester", "Add D3 to a nearby Infantry unit's moves this phase; if it returns within 3\", this Hero suffers that many mortal damage."),
      ],
      artefacts: [
        heroicTrait("moonhoned-shiv", "Moonhoned Shiv", "Add 1 Attack to a non-Companion melee weapon in deployment and each time this unit Retreats. This unit can be affected by this ability multiple times and the effects are cumulative."),
        heroicTrait("loonstone-medallion", "Loonstone Medallion", "This unit has Ward (6+), improved to Ward (5+) while it alone contests an objective."),
        heroicTrait("wotnot-of-prestige", "Wotnot of Prestige", "At the end of any turn, enemies around a point within 9\" suffer D3 mortal damage on a 2+."),
      ],
      spellLores: [{
        id: "da-kings-gitz-spells",
        name: "Da King's Gitz Spells",
        spells: [
          { id: "da-loonkings-command", name: "Da Loonking's Command", castingValue: 5, keywords: ["Unlimited"], description: "A friendly unit wholly within 18\" improves its champions' melee Attacks, Rally rolls and control until your next turn." },
          { id: "right-gitz-in-da-right-place", name: "Right Gitz in da Right Place", castingValue: 6, description: "A visible friendly unit wholly within 18\" gains Anti-Hero (+1 Rend) until your next turn." },
        ],
      }],
      manifestationLores: [{
        id: "da-kings-moon",
        name: "Malevolent Moon",
        manifestations: [manifestations.find((item) => item.id === "malevolent-moon")],
      }],
    },
  },
];

export default armiesOfRenown;

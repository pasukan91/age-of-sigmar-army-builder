const rule = (id, name, type, phase, description) => ({
  id,
  name,
  type,
  phase,
  description,
});

const enhancement = (id, name, phase, description) => ({
  id,
  name,
  phase,
  description,
  points: 0,
  source: "Army of Renown",
});

const armiesOfRenown = [
  {
    id: "aelementiri-conclave",
    name: "Aelementiri Conclave",
    description: "A gathering of Alarith, Hurakan and Ydrilan warrior-monks and elemental spirits.",
    roster: ["Any Alarith units", "Any Hurakan units", "Any Ydrilan units", "No Regiments of Renown"],
    requiredUnits: [],
    excludesRegimentsOfRenown: true,
    unitFilter: (unit) =>
      ["Alarith", "Hurakan", "Ydrilan"].some((keyword) =>
        (unit?.keywords ?? []).includes(keyword)
      ),
    rules: {
      battleTraits: [
        rule("world-runes", "World Runes", "Once Per Battle (Army)", "Deployment Phase", "Add 1 Alaithi rune to your library for each friendly Alarith unit, 1 Oreali for each Hurakan unit and 1 Ydriliqi for each Ydrilan unit, to a maximum of 6 of each."),
        rule("depict-rune-aelementiri", "Depict Rune", "Once Per Battle Round (Army)", "Start of Battle Round", "Remove all runes from your battle scripture, then remove any number from your library and depict them. Those runes are removed for the rest of the battle."),
        rule("entreat-spirit", "Entreat Spirit", "Once Per Turn (Army)", "Your Movement Phase", "If you have at least 3 runes in your library, remove any 3 and set up a replacement of a destroyed friendly non-Unique Monster wholly within 6\" of terrain and more than 9\" from enemies, with 6 damage allocated."),
        rule("the-realms-fight-back", "The Realms Fight Back", "Once Per Turn (Army)", "Any Combat Phase", "Pick terrain and an enemy within 6\". Roll D3: 1 inflicts 3 mortal damage; 2 subtracts 5 Control; 3 gives Strike-last for the turn."),
      ],
      heroicTraits: [
        enhancement("world-mage", "World-mage", null, "Add 1 to casting rolls for this unit for each unique rune depicted on your battle scripture."),
      ],
      artefacts: [
        enhancement("aelementor-focus", "Aelementor Focus", "Any Hero Phase", "Pick terrain. Measure range and visibility for the next Spell ability used by this unit from that terrain instead of this unit."),
      ],
      spellLores: [{
        id: "aelementiri-conclave-spells",
        name: "Aelementiri Conclave Spell Lore",
        spells: [{
          id: "vexing-spirits",
          name: "Vexing Spirits",
          castingValue: 7,
          description: "Pick a visible enemy within 12\". It cannot use commands for the rest of the turn.",
        }],
      }],
      manifestationLores: [{
        id: "aelementiri-conclave-manifestations",
        name: "Aelementiri Conclave Manifestation Lore",
        manifestations: [
          "sanctum-of-amyntok",
          "hyshian-twinstones",
          "rune-of-petrification",
        ],
      }],
      prayerLores: [],
      terrain: [],
    },
  },
  {
    id: "vanari-paragons",
    name: "Vanari Paragons",
    description: "A Tyrionic host of martial exemplars pursuing sacred labours in the name of the Lord Phoenix.",
    roster: ["Any non-Unique Vanari units", "The Light of Eltharion", "No Regiments of Renown"],
    requiredUnits: [],
    excludesRegimentsOfRenown: true,
    unitFilter: (unit) =>
      unit?.id === "the-light-of-eltharion" ||
      (
        (unit?.keywords ?? []).includes("Vanari") &&
        unit?.rules?.unique !== true
      ),
    rules: {
      battleTraits: [
        rule("rewards-of-valour", "Rewards of Valour", "Once Per Battle (Army)", "Deployment Phase", "Pick a friendly non-Unique Vanari Hero without an artefact and give it 1 Vanari Paragons artefact of power for the battle."),
        rule("labour-of-control", "Labour of Control", "Once Per Battle (Army)", "End of Any Turn", "If a different friendly unit is within 6\" of each battlefield edge, complete this labour and add 2\" Move to friendly Lumineth Realm-lords units for the rest of the battle."),
        rule("labour-of-might", "Labour of Might", "Once Per Battle (Army)", "End of Any Turn", "If at least 3 enemy units have been destroyed, complete this labour and add 1 to wound rolls for friendly Lumineth Realm-lords combat attacks for the rest of the battle."),
        rule("labour-of-precision", "Labour of Precision", "Once Per Battle (Army)", "End of Any Turn", "If no enemy units with artefacts remain, complete this labour and add 10 to friendly Lumineth Realm-lords units' control scores for the rest of the battle."),
        rule("blessing-of-tyrion", "Blessing of Tyrion", "Once Per Battle (Army)", "End of Any Turn", "If you completed 3 labours, friendly Lumineth Realm-lords units have Ward (5+) for the rest of the battle."),
      ],
      heroicTraits: [
        enhancement("master-duellist", "Master Duellist", "Any Combat Phase", "Pick a visible enemy Hero in combat. On a 4+, it loses its artefact of power, if any, and has Strike-last for the rest of the turn."),
      ],
      artefacts: [
        enhancement("swiftfeather-talisman", "Swiftfeather Talisman", "Your Movement Phase", "Pick a friendly Lumineth Realm-lords unit wholly within 12\". Add 2\" to its Move for the rest of the turn."),
        enhancement("phoenix-blade", "Phoenix Blade", null, "This unit's combat attacks score critical hits on unmodified hit rolls of 5+."),
        enhancement("nullstone-beads", "Nullstone Beads", null, "This unit can use Unbind as if it had Wizard (1)."),
      ],
      spellLores: [],
      prayerLores: [],
      manifestationLores: [],
      terrain: [],
    },
  },
];

export default armiesOfRenown;


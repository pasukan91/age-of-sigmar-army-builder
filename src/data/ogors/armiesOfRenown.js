const trait = (id, name, description) => ({ id, name, source: "Army of Renown", points: 0, description });
const rule = (id, name, type, phase, description) => ({ id, name, type, phase, description });

const armiesOfRenown = [
  {
    id: "meatfist-mawtribe",
    name: "Meatfist Mawtribe",
    roster: ["Any Gutbusters units"],
    requiredUnits: [],
    excludesRegimentsOfRenown: false,
    description: "La mawtribe de Morga aplasta a sus enemigos mediante cargas masivas y una arrogancia brutal.",
    rules: {
      battleTraits: [
        rule("bloodthirsty-arrogance", "Bloodthirsty Arrogance", "Passive", null, "After a friendly Meatfist Infantry unit that did not charge is targeted by combat attacks, each unmodified save roll of 1 inflicts 1 mortal damage on the attacker after Fight is resolved."),
        rule("fleshy-stampede", "Fleshy Stampede", "Passive", null, "Add 2 to run rolls for friendly Meatfist units."),
        rule("gluttonous-conquerors", "Gluttonous Conquerors", "Passive", null, "Add 1 to the Control characteristic of friendly Meatfist units while they are in combat."),
        rule("meaty-charge", "Meaty Charge", "Ability", "Any Charge Phase", "For a Meatfist unit that charged, roll dice equal to its unmodified charge roll (+1 to each roll if it has more models than the target). Each 5+ inflicts 1 mortal damage."),
        rule("greedy-chompers", "Greedy Chompers", "Once Per Turn (Army)", "End of Your Turn", "Pick up to 3 friendly Meatfist units in combat. Roll D3 for each; on a 2+, Heal that amount."),
        rule("gruesome-devourers", "Gruesome Devourers", "Once Per Turn (Army)", "End of Any Turn", "On a 3+, an enemy damaged by Meatfist combat attacks cannot Retreat until your next turn."),
      ],
      heroicTraits: [
        trait("force-of-savage-personality", "Force of Savage Personality", "Enemy units and manifestations cannot be set up within 12\" of this unit."),
        trait("thick-blubber", "Thick Blubber", "Subtract 1 from wound rolls for shooting attacks targeting this unit."),
        trait("overpowering-mass", "Overpowering Mass", "Re-roll unmodified rolls of 1 when making meaty charge rolls for this unit."),
      ],
      artefacts: [
        trait("snott-gnoblar-thief", "Snott, Gnoblar Thief", "At the start of any turn, target an enemy Hero with artefacts. If a dice roll is no greater than the battle round, it loses all artefacts."),
        trait("rusty-leadbelcher-gun", "Rusty Leadbelcher Gun", "Once per battle in your shooting phase, damage an enemy within 12\" with Jagged Shrapnel (D3 mortals and possibly halve Move) or Lumpen Metal Scrap (D6 mortals)."),
        trait("trappers-arsenal", "Trapper's Arsenal", "Once per battle in combat, on a 4+ an enemy that charged and is in combat has Strike-last."),
      ],
      spellLores: [], prayerLores: [], manifestations: [], manifestationLores: [], terrain: [],
    },
  },
  {
    id: "beastclaw-alfrostun",
    name: "Beastclaw Alfrostun",
    roster: ["Any Beastclaw units"],
    requiredUnits: [],
    excludesRegimentsOfRenown: true,
    description: "Una cacería Beastclaw envuelta por la furia de la Everwinter.",
    rules: {
      battleTraits: [
        rule("masked-by-the-endless-white", "Masked by the Endless White", "Passive", null, "Friendly Alfrostun units are not visible to enemies more than 12\" away."),
        rule("a-clan-of-hunters", "A Clan of Hunters", "Once Per Battle (Army)", "Deployment Phase", "A second Hunters with Sabrefangs unit can use Through the Frosts this battle."),
        rule("grasp-of-the-everwinter", "Grasp of the Everwinter", "Once Per Turn (Army)", "Your Hero Phase", "Roll D3 for each enemy in combat with friendly Alfrostun units. On a 2+, inflict mortal damage equal to the roll."),
        rule("punish-the-fleeing", "Punish the Fleeing", "Passive", null, "After an enemy Retreats from combat with an Alfrostun unit, inflict D3 mortal damage."),
        rule("fearsome-breed", "Fearsome Breed", "Passive", null, "Enemy charge rolls suffer -1 within 12\" of an Alfrostun Monster, or -2 within 6\"."),
      ],
      heroicTraits: [trait("hard-bitten-chieftain", "Hard-bitten Chieftain", "Other than Companion, weapon abilities of attacks made by enemies that charged have no effect against this unit.")],
      artefacts: [trait("alvagr-rune-tokens", "Alvagr Rune-tokens", "Once per battle, add 1 to chanting rolls for friendly Alfrostun units wholly within 12\" until your next turn.")],
      spellLores: [],
      prayerLores: [{
        id: "alfrostun-prayers", name: "Alfrostun Prayers", prayers: [
          { id: "keening-gale", name: "Keening Gale", type: "Prayer", chantingValue: 4, phase: "Your Hero Phase", keywords: ["Prayer", "Unlimited"], description: "A friendly Alfrostun unit wholly within 12\" gains +2 to run rolls; on a 6+, also +2 to charge rolls until your next turn." },
          { id: "avalanche-voice", name: "Avalanche Voice", type: "Prayer", chantingValue: 4, phase: "Your Hero Phase", keywords: ["Prayer"], description: "An enemy within 18\" must spend 1 extra command point on a 5+ whenever it uses a command; on an 8+, add 2 to these rolls." },
          { id: "terrors-of-the-old-ice", name: "Terrors of the Old Ice", type: "Prayer", chantingValue: 4, phase: "Your Hero Phase", keywords: ["Prayer"], description: "Enemies contesting an objective or terrain within 18\" suffer -10 to control score; on an 8+, their maximum control score is 1." },
        ],
      }],
      manifestations: [], manifestationLores: [], terrain: [],
    },
  },
  {
    id: "mawseeker-gollop",
    name: "Mawseeker Gollop",
    roster: ["Any Mawseekers units"],
    requiredUnits: [],
    excludesRegimentsOfRenown: true,
    description: "Los Mawseekers cosechan ingredientes crudos y los convierten en festines de poder arcano.",
    rules: {
      battleTraits: [
        rule("prepare-the-feast", "Prepare the Feast", "Once Per Turn (Army)", "Start of Any Turn", "If there is no Feastmaster, pick a friendly Gollop Hero to be Feastmaster for the battle."),
        rule("ooh-that-looks-tasty", "Ooh, That Looks Tasty…", "Passive", null, "When an enemy is destroyed, gain raw ingredients equal to its Health multiplied by its starting models."),
        rule("gland-goulash", "Gland Goulash", "Once Per Turn (Army)", "Any Hero Phase", "Spend 10 ingredients: nearby Gollop units roll 1 extra casting/unbinding die, to a maximum of 3."),
        rule("fried-limbs", "Fried Limbs", "Once Per Turn (Army)", "Any Charge Phase", "Spend 10 ingredients: nearby Gollop units gain +3 to charge rolls."),
        rule("the-organ-platter", "The Organ Platter", "Once Per Turn (Army)", "Any Combat Phase", "Spend 20 ingredients: nearby Gollop melee weapons gain Crit (Mortal)."),
        rule("unwashed-innards", "Unwashed Innards", "Once Per Turn (Army)", "Any Movement Phase", "Spend 5 ingredients: nearby Gollop units gain +4 to run rolls."),
        rule("gore-offal-dumplings", "Gore-offal Dumplings", "Once Per Turn (Army)", "End of Any Turn", "Spend 10 ingredients: nearby Gollop units can Charge with 1 fewer charge die."),
        rule("nostalgic-morsels", "Nostalgic Morsels", "Once Per Turn (Army)", "Any Shooting Phase", "Spend 5 ingredients: Heal (D6) each nearby Gollop unit."),
      ],
      heroicTraits: [trait("indomitable-guts", "Indomitable Guts", "Add 1 to ward rolls for this unit.")],
      artefacts: [trait("overflowing-larder", "Overflowing Larder", "Once per battle, gain D6 raw ingredients, or D3+3 if the bearer is the Feastmaster.")],
      spellLores: [{
        id: "gollop-spells", name: "Mawseeker Gollop Spells", spells: [
          { id: "bonecruncher", name: "Bonecruncher", type: "Spell", castingValue: 5, phase: "Your Hero Phase", keywords: ["Spell", "Unlimited"], description: "Inflict D3 mortal damage on an enemy within 18\" and gain that many raw ingredients." },
          { id: "bloodgruel", name: "Bloodgruel", type: "Spell", castingValue: 6, phase: "Your Hero Phase", keywords: ["Spell"], description: "Return 1 slain model to, or Heal (D6), a friendly Gollop unit wholly within 12\"." },
          { id: "the-cosmos-writhes", name: "The Cosmos Writhes", type: "Spell", castingValue: 7, phase: "Your Hero Phase", keywords: ["Spell"], description: "Reposition a friendly Gollop unit wholly within 12\" more than 9\" from enemies." },
        ],
      }],
      prayerLores: [], manifestations: [], manifestationLores: [], terrain: [],
    },
  },
];

export default armiesOfRenown;

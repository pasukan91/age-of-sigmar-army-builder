const units = [
    {
        id: "shalaxi-helbane",

        name: "Shalaxi Helbane",

        image: "shalaxi-helbane.png",

        points: 0,

        profile: {
            move: '12"',
            health: 16,
            control: 5,
            save: "4+",
            ward: "5+",
        },

        weapons: [
            {
                name: "Soulpiercer",
                type: "Melee",
                attacks: 6,
                hit: "2+",
                wound: "3+",
                rend: "2",
                damage: "3",
                abilities: [
                    "Anti-Hero (+1 Rend)",
                ],
            },
            {
                name: "Impaling Claws",
                type: "Melee",
                attacks: 2,
                hit: "3+",
                wound: "3+",
                rend: "2",
                damage: "4",
                abilities: [],
            },
        ],

        abilities: [
            {
                type: "Passive",
                icon: "skull",
                color: "black",
                phase: null,
                castingValue: null,
                keywords: [],
                lore: null,
                name: "Battle Damaged",
                description:
                    "Effect: While this unit has 10 or more damage points, the Attacks characteristic of its Soulpiercer is 4.",
            },
            {
                type: "Passive",
                icon: "movement",
                color: "black",
                phase: null,
                castingValue: null,
                keywords: [],
                lore: null,
                name: "Supernatural Grace",
                description:
                    "Effect: This unit can use Charge abilities even if it used a Retreat ability in the same turn. In addition, no mortal damage is inflicted on this unit by Retreat abilities.",
            },
            {
                type: "Spell",
                icon: "spell",
                color: "gold",
                phase: "Your Hero Phase",
                castingValue: 8,
                keywords: [
                    "Spell",
                ],
                lore: null,
                name: "Refined Senses",
                description:
                    "Declare: Pick a visible friendly Hedonites of Slaanesh unit wholly within 12\" of this unit to be the target, then make a casting roll of 2D6. Add 1 to the casting roll if this unit is the target.\n\nEffect: The target has Strike-first for the rest of the turn.",
            },
            {
                type: "Once Per Turn",
                icon: "movement",
                color: "red",
                phase:
                    "Reaction: Opponent declared a Charge ability for a Hero within 12\" of this unit",
                castingValue: null,
                keywords: [
                    "Core",
                    "Move",
                    "Charge",
                    "Rampage",
                ],
                lore: null,
                name: "Paramount Hunter",
                description:
                    "Effect: If this unit is not in combat, it can immediately move up to 2D6\". It can pass through the combat ranges of enemy units but it must end that move within 1/2\" of that Hero. If it does so, this unit has charged and that Hero's Charge ability has no effect.",
            },
            {
                type: "Combat",
                icon: "combat",
                color: "red",
                phase: "Any Combat Phase",
                castingValue: null,
                keywords: [],
                lore: null,
                name: "An Exquisite Trophy",
                description:
                    "Declare: Pick an enemy Hero or Monster in combat with this unit to be the target.\n\nEffect: For the rest of the phase, this unit's combat attacks that target that enemy unit have Crit (2 Hits) and score critical hits on unmodified hit rolls of 5+. If the target is destroyed by this unit's combat attacks this phase, add 1 to the Attacks characteristic of melee weapons used by other friendly Hedonites of Slaanesh Daemon units while they are wholly within 12\" of and visible to this unit.",
            },
        ],

        heroicTrait: null,
        monstrousTrait: null,
        artefact: null,

        details: {
            models: 1,
            baseSize: null,
            regimentOptions: [],
            notes: null,
        },

        keywords: [
            "Warmaster",
            "Unique",
            "Hero",
            "Monster",
            "Wizard (2)",
            "Ward (5+)",
            "Chaos",
            "Hedonites of Slaanesh",
            "Daemon",
            "Paragon",
        ],

        rules: {
            hero: true,
            unique: true,
            monster: true,
            wizard: 2,
            priest: 0,
            ward: "5+",
            warmaster: true,
            companion: false,
        },
    },

    {
        id: "keeper-of-secrets",

        name: "Keeper of Secrets",

        image: "keeper-of-secrets.png",

        points: 0,

        profile: {
            move: '12"',
            health: 16,
            control: 5,
            save: "4+",
            ward: "5+",
        },

        weapons: [
            {
                name: "Elegant Greatblade",
                type: "Melee",
                attacks: 5,
                hit: "2+",
                wound: "3+",
                rend: "2",
                damage: "3",
                abilities: [],
            },
            {
                name: "Impaling Claws",
                type: "Melee",
                attacks: 2,
                hit: "3+",
                wound: "3+",
                rend: "2",
                damage: "4",
                abilities: [],
            },
        ],

        abilities: [
            {
                type: "Passive",
                icon: "skull",
                color: "black",
                phase: null,
                castingValue: null,
                keywords: [],
                lore: null,
                name: "Battle Damaged",
                description:
                    "Effect: While this unit has 10 or more damage points, the Attacks characteristic of its Elegant Greatblade is 3.",
            },
            {
                type: "Passive",
                icon: "movement",
                color: "black",
                phase: null,
                castingValue: null,
                keywords: [],
                lore: null,
                name: "Supernatural Grace",
                description:
                    "Effect: This unit can use Charge abilities even if it used a Retreat ability in the same turn. In addition, no mortal damage is inflicted on this unit by Retreat abilities.",
            },
            {
                type: "Hero",
                icon: "hero",
                color: "gold",
                phase: "Your Hero Phase",
                castingValue: null,
                keywords: [],
                lore: null,
                name: "Locus of Slaanesh",
                description:
                    "Declare: Pick a friendly non-Hero Hedonites of Slaanesh Daemon unit that started the battle with 3 or more models and has been destroyed to be the target.\n\nEffect: Set up a replacement unit with half the number of models from the target unit, rounding up, wholly within 12\" of this unit and more than 9\" from all enemy units.",
            },
            {
                type: "Spell",
                icon: "spell",
                color: "gold",
                phase: "Your Hero Phase",
                castingValue: 6,
                keywords: [
                    "Spell",
                ],
                lore: null,
                name: "Cacophonic Choir",
                description:
                    "Declare: Pick any number of visible enemy units within 12\" of this unit to be the targets, then make a casting roll of 2D6. Subtract 1 from the casting roll for each target picked after the first.\n\nEffect: Inflict D3 mortal damage on each target.",
            },
            {
                type: "Once Per Turn",
                icon: "combat",
                color: "red",
                phase: "Any Combat Phase",
                castingValue: null,
                keywords: [
                    "Rampage",
                ],
                lore: null,
                name: "Dark Temptations",
                description:
                    "Declare: Pick an enemy unit in combat with this unit to be the target.\n\nEffect: Pick 1 of the following musks. Its effects apply for the rest of the turn.\n\nAlluring Musk: This unit's weapons have Crit (2 Hits) for attacks that target that enemy unit. Add 1 to hit rolls for attacks made by that enemy unit that target this unit.\n\nPsychotropic Musk: Subtract 1 from wound rolls for attacks made by that enemy unit that target this unit. Subtract 1 from the Rend characteristic of this unit's melee weapons.",
            },
        ],

        heroicTrait: null,
        monstrousTrait: null,
        artefact: null,

        details: {
            models: 1,
            baseSize: null,
            regimentOptions: [],
            notes: null,
        },

        keywords: [
            "Hero",
            "Monster",
            "Wizard (1)",
            "Ward (5+)",
            "Chaos",
            "Hedonites of Slaanesh",
            "Daemon",
        ],

        rules: {
            hero: true,
            unique: false,
            monster: true,
            wizard: 1,
            priest: 0,
            ward: "5+",
            warmaster: false,
            companion: false,
        },
    },

    {
        id: "dexcessa-the-talon-of-slaanesh",

        name: "Dexcessa, the Talon of Slaanesh",

        image: "dexcessa.png",

        points: 0,

        profile: {
            move: '12"',
            health: 10,
            control: 5,
            save: "5+",
            ward: "5+",
        },

        weapons: [
            {
                name: "Impaling Talons",
                type: "Melee",
                attacks: 8,
                hit: "3+",
                wound: "3+",
                rend: "2",
                damage: "2",
                abilities: [
                    "Charge (+1 Damage)",
                ],
            },
        ],

        abilities: [
            {
                type: "Passive",
                icon: "movement",
                color: "black",
                phase: null,
                castingValue: null,
                keywords: [],
                lore: null,
                name: "Fleeting Dance of Death",
                description:
                    "Effect: This unit can use Charge abilities even if it is in combat.",
            },
            {
                type: "Reaction",
                icon: "combat",
                color: "red",
                phase: "You declared a Fight ability for this unit",
                castingValue: null,
                keywords: [],
                lore: null,
                name: "You! Amuse Us!",
                description:
                    "Effect: Pick a friendly Paragon that has not used a Fight ability this turn and is within this unit's combat range and visible to this unit to be the target. The target can be picked to use a Fight ability immediately after the Fight ability used by this unit has been resolved.",
            },
            {
                type: "End of Turn",
                icon: "hero",
                color: "purple",
                phase: "End of Any Turn",
                castingValue: null,
                keywords: [],
                lore: null,
                name: "Joyous Battle Fury",
                description:
                    "Effect: If any enemy models were slain by this unit's combat attacks this turn, Heal (D3) this unit and add 1 to the Attacks characteristic of this unit's Impaling Talons for the rest of the battle. This unit can be affected by this ability multiple times and the effects are cumulative.",
            },
            {
                type: "Once Per Turn",
                icon: "combat",
                color: "purple",
                phase: "End of Any Turn",
                castingValue: null,
                keywords: [
                    "Rampage",
                ],
                lore: null,
                name: "Redolence of Violence",
                description:
                    "Declare: Pick an enemy unit in combat with this unit to be the target.\n\nEffect: Roll 2D6. If this unit charged this turn, add 2 to the roll. If the roll exceeds the target's Health characteristic, 1 model in the target is automatically slain. If the target is a Manifestation and the roll exceeds its banishment value, it is banished.",
            },
        ],

        heroicTrait: null,
        monstrousTrait: null,
        artefact: null,

        details: {
            models: 1,
            baseSize: null,
            regimentOptions: [],
            notes: null,
        },

        keywords: [
            "Unique",
            "Hero",
            "Monster",
            "Fly",
            "Ward (5+)",
            "Chaos",
            "Hedonites of Slaanesh",
            "Daemon",
        ],

        rules: {
            hero: true,
            unique: true,
            monster: true,
            wizard: 0,
            priest: 0,
            ward: "5+",
            warmaster: false,
            companion: false,
        },
    },

    {
        id: "synessa-the-voice-of-slaanesh",

        name: "Synessa, the Voice of Slaanesh",

        image: "synessa.png",

        points: 0,

        profile: {
            move: '12"',
            health: 10,
            control: 5,
            save: "5+",
            ward: "5+",
        },

        weapons: [
            {
                name: "Staff of Slaanesh",
                type: "Ranged",
                range: '18"',
                attacks: 3,
                hit: "3+",
                wound: "3+",
                rend: "1",
                damage: "D3",
                abilities: [
                    "Shoot in Combat",
                ],
            },
            {
                name: "Unraveller's Talons",
                type: "Melee",
                attacks: 5,
                hit: "3+",
                wound: "3+",
                rend: "2",
                damage: "2",
                abilities: [],
            },
        ],

        abilities: [
            {
                type: "Start of Battle Round",
                icon: "hero",
                color: "black",
                phase: "Start of Battle Round",
                castingValue: null,
                keywords: [],
                lore: null,
                name: "Arcane Seductor",
                description:
                    "Declare: Pick a visible enemy Wizard or Priest within 18\" of this unit to be the target.\n\nEffect: Roll a dice. If the roll is higher than the target's power level, for the rest of the battle round, while the target is within 18\" of this unit, subtract 1 from casting rolls and chanting rolls for enemy units and add 1 to this unit's power level.",
            },
            {
                type: "Spell",
                icon: "spell",
                color: "gold",
                phase: "Your Hero Phase",
                castingValue: 7,
                keywords: [
                    "Spell",
                ],
                lore: null,
                name: "Whispers of Desire",
                description:
                    "Declare: Pick a visible enemy unit within 18\" of this unit to be the target, then make a casting roll of 2D6.\n\nEffect: For the rest of the turn, subtract 1 from the Attacks characteristic of the target's melee weapons.",
            },
            {
                type: "Once Per Turn",
                icon: "combat",
                color: "red",
                phase: "Any Combat Phase",
                castingValue: null,
                keywords: [
                    "Rampage",
                ],
                lore: null,
                name: "Enthralling Splendour",
                description:
                    "Declare: Pick an enemy unit with a lower Control characteristic than this unit, that charged this turn and is in combat with this unit to be the target.\n\nEffect: Subtract 1 from wound rolls for the target's attacks for the rest of the turn.",
            },
        ],

        heroicTrait: null,
        monstrousTrait: null,
        artefact: null,

        details: {
            models: 1,
            baseSize: null,
            regimentOptions: [],
            notes: null,
        },

        keywords: [
            "Unique",
            "Hero",
            "Monster",
            "Wizard (1)",
            "Fly",
            "Ward (5+)",
            "Chaos",
            "Hedonites of Slaanesh",
            "Daemon",
        ],

        rules: {
            hero: true,
            unique: true,
            monster: true,
            wizard: 1,
            priest: 0,
            ward: "5+",
            warmaster: false,
            companion: false,
        },
    },

    {
        id: "the-masque",

        name: "The Masque",

        image: "the-masque.png",

        points: 0,

        profile: {
            move: '8"',
            health: 5,
            control: 2,
            save: "5+",
            ward: "4+",
        },

        weapons: [
            {
                name: "Razor-edged Claws",
                type: "Melee",
                attacks: 6,
                hit: "3+",
                wound: "4+",
                rend: "1",
                damage: "2",
                abilities: [],
            },
        ],

        abilities: [
            {
                type: "Passive",
                icon: "movement",
                color: "black",
                phase: null,
                castingValue: null,
                keywords: [],
                lore: null,
                name: "Captive Audience",
                description:
                    "Effect: Enemy units cannot use Retreat abilities while they are in combat with this unit.",
            },
            {
                type: "Movement",
                icon: "movement",
                color: "black",
                phase: "Any Movement Phase",
                castingValue: null,
                keywords: [],
                lore: null,
                name: "The Endless Dance",
                description:
                    "Effect: Pick 1 of the following effects.\n\nThe Dance of Dreaming: Pick a visible enemy unit within 6\" of this unit to be the target. For the rest of the turn, if the unmodified hit roll for an attack made by that enemy unit that targets this unit is 1-4, the attack fails and the attack sequence ends.\n\nThe Pavane of Slaanesh: This unit can move 2D3\". It can move through the combat ranges of enemy units and can end that move in combat.\n\nThe Waltz of Lethargy: Pick a visible enemy unit within 6\" of this unit to be the target. For the rest of the turn, the target cannot use commands while it is in combat with this unit.",
            },
        ],

        heroicTrait: null,
        monstrousTrait: null,
        artefact: null,

        details: {
            models: 1,
            baseSize: null,
            regimentOptions: [],
            notes: null,
        },

        keywords: [
            "Unique",
            "Hero",
            "Infantry",
            "Ward (4+)",
            "Chaos",
            "Hedonites of Slaanesh",
            "Daemon",
        ],

        rules: {
            hero: true,
            unique: true,
            monster: false,
            wizard: 0,
            priest: 0,
            ward: "4+",
            warmaster: false,
            companion: false,
        },
    },

    {
        id: "syllesske-the-vengeful-alliance",

        name: "Syll'Esske, the Vengeful Alliance",

        image: "syllesske.png",

        points: 0,

        profile: {
            move: '8"',
            health: 9,
            control: 4,
            save: "4+",
            ward: "5+",
        },

        weapons: [
            {
                name: "Scourging Whip",
                type: "Melee",
                attacks: 6,
                hit: "2+",
                wound: "4+",
                rend: "1",
                damage: "2",
                abilities: [],
            },
            {
                name: "Axe of Dominion",
                type: "Melee",
                attacks: 4,
                hit: "3+",
                wound: "3+",
                rend: "2",
                damage: "3",
                abilities: [],
            },
        ],

        abilities: [
            {
                type: "Spell",
                icon: "spell",
                color: "gold",
                phase: "Your Hero Phase",
                castingValue: 7,
                keywords: [
                    "Spell",
                ],
                lore: null,
                name: "Unholy Symbiosis",
                description:
                    "Declare: Pick up to 1 visible friendly Sybarite unit and up to 1 visible friendly Hedonites of Slaanesh Daemon unit to be the targets, then make a casting roll of 2D6.\n\nEffect: If you picked a Sybarite target, subtract 1 from ward rolls for damage points inflicted by its combat attacks until the start of your next turn. If you picked a Daemon target, it has Ward (5+) until the start of your next turn.",
            },
            {
                type: "Passive",
                icon: "combat",
                color: "red",
                phase: null,
                castingValue: null,
                keywords: [],
                lore: null,
                name: "Champions of the Gilded Throne",
                description:
                    "Effect: When players are alternating picking units to use a Fight ability, when it is your turn to pick a unit, instead of picking 1 unit, you can pick a friendly non-Hero Hedonites of Slaanesh Daemon unit wholly within 18\" of this unit and a friendly non-Hero Sybarite unit wholly within 18\" of this unit. Resolve the second Fight ability immediately after the first.",
            },
            {
                type: "End of Turn",
                icon: "hero",
                color: "purple",
                phase: "End of Any Turn",
                castingValue: null,
                keywords: [],
                lore: null,
                name: "Violent Offerings",
                description:
                    "Effect: If any damage points were allocated by this unit's combat attacks to an enemy Wizard, Priest, Unique unit or unit with an artefact of power, and that enemy unit has not been destroyed, add 1 to this unit's power level for the rest of the battle. This unit can be affected by this ability multiple times and the effects are cumulative.",
            },
        ],

        heroicTrait: null,
        monstrousTrait: null,
        artefact: null,

        details: {
            models: 1,
            baseSize: null,
            regimentOptions: [],
            notes: null,
        },

        keywords: [
            "Unique",
            "Hero",
            "Wizard (1)",
            "Infantry",
            "Ward (5+)",
            "Chaos",
            "Hedonites of Slaanesh",
            "Daemon",
        ],

        rules: {
            hero: true,
            unique: true,
            monster: false,
            wizard: 1,
            priest: 0,
            ward: "5+",
            warmaster: false,
            companion: false,
        },
    },

    {
        id: "thricefold-discord",

        name: "Thricefold Discord",

        image: "thricefold-discord.png",

        points: 0,

        profile: {
            move: '6"',
            health: 3,
            control: 2,
            save: "5+",
            ward: "5+",
        },

        weapons: [
            {
                name: "Thricefold Arsenal",
                type: "Melee",
                attacks: 3,
                hit: "3+",
                wound: "4+",
                rend: "1",
                damage: "2",
                abilities: [
                    "Crit (2 Hits)",
                ],
            },
        ],

        abilities: [
            {
                type: "Once Per Turn",
                icon: "hero",
                color: "black",
                phase: "Start of Any Turn",
                castingValue: null,
                keywords: [],
                lore: null,
                name: "Thricefold Court",
                description:
                    "Effect: Pick 1 of the following effects that you did not pick in the previous turn. The effect applies for the rest of the turn.\n\nSins of Soul: While an enemy Wizard or Priest is visible to this unit, add 1 to this unit's power level.\n\nSins of Flesh: This unit's attacks score critical hits on unmodified hit rolls of 5+.\n\nSins of Mind: Each time a visible friendly Hedonites of Slaanesh unit wholly within 12\" of this unit uses the Rally command, you receive 3 additional rally points.",
            },
            {
                type: "Spell",
                icon: "spell",
                color: "gold",
                phase: "Your Hero Phase",
                castingValue: 7,
                keywords: [
                    "Spell",
                ],
                lore: null,
                name: "Gifts of Pain and Pleasure",
                description:
                    "Declare: Pick either a visible friendly Hedonites of Slaanesh Infantry unit wholly within 12\" of this unit or a visible enemy unit wholly within 12\" of this unit to be the target, then make a casting roll of 2D6.\n\nEffect: If the target is a friendly unit, add 2\" to its Move characteristic until the start of your next turn. If the target is an enemy unit, inflict X mortal damage on it, then Heal (X) this unit. X is equal to the number of models in this unit.",
            },
        ],

        heroicTrait: null,
        monstrousTrait: null,
        artefact: null,

        details: {
            models: 3,
            baseSize: null,
            regimentOptions: [],
            notes: null,
        },

        keywords: [
            "Hero",
            "Wizard (1)",
            "Infantry",
            "Ward (5+)",
            "Chaos",
            "Hedonites of Slaanesh",
            "Daemon",
        ],

        rules: {
            hero: true,
            unique: false,
            monster: false,
            wizard: 1,
            priest: 0,
            ward: "5+",
            warmaster: false,
            companion: false,
        },
    },

    {
        id: "infernal-enrapturess",

        name: "Infernal Enrapturess, Herald of Slaanesh",

        image: "infernal-enrapturess.png",

        points: 0,

        profile: {
            move: '6"',
            health: 5,
            control: 2,
            save: "5+",
            ward: "6+",
        },

        weapons: [
            {
                name: "Piercing Claw",
                type: "Melee",
                attacks: 5,
                hit: "3+",
                wound: "4+",
                rend: "1",
                damage: "2",
                abilities: [],
            },
        ],

        abilities: [
            {
                type: "Passive",
                icon: "spell",
                color: "black",
                phase: null,
                castingValue: null,
                keywords: [],
                lore: null,
                name: "Spell-Shredding Symphony",
                description:
                    "Effect: This unit can use Unbind and Banish abilities as if it had Wizard (1). In addition, each time this unit successfully unbinds a spell, inflict D3 mortal damage on the caster, and each time this unit successfully banishes a Manifestation, inflict D3 mortal damage on the unit that summoned that Manifestation.",
            },
            {
                type: "Once Per Turn",
                icon: "hero",
                color: "gold",
                phase: "Your Hero Phase",
                castingValue: null,
                keywords: [],
                lore: null,
                name: "Maestros of Discordance",
                description:
                    "Declare: Pick a visible enemy unit within 18\" of this unit to be the enemy target. Then, you can pick another visible friendly Hedonites of Slaanesh Daemon unit wholly within 12\" of this unit to be the friendly target.\n\nEffect: Roll a number of dice equal to the number of models in the enemy target unit. For each 6, inflict 1 mortal damage on the enemy target. Then, you can pick 1 of the following effects: Heal (X) the friendly target, where X is the number of enemy models slain by this ability this phase; or return a number of slain models to the friendly target unit with a total Health characteristic equal to or less than the number of enemy models slain by this ability this phase.",
            },
        ],

        heroicTrait: null,
        monstrousTrait: null,
        artefact: null,

        details: {
            models: 1,
            baseSize: null,
            regimentOptions: [],
            notes: null,
        },

        keywords: [
            "Hero",
            "Infantry",
            "Ward (6+)",
            "Chaos",
            "Hedonites of Slaanesh",
            "Daemon",
        ],

        rules: {
            hero: true,
            unique: false,
            monster: false,
            wizard: 0,
            priest: 0,
            ward: "6+",
            warmaster: false,
            companion: false,
        },
    },

    {
        id: "contorted-epitome",

        name: "Contorted Epitome",

        image: "contorted-epitome.png",

        points: 0,

        profile: {
            move: '9"',
            health: 7,
            control: 2,
            save: "5+",
            ward: "4+",
        },

        weapons: [
            {
                name: "Piercing Claws and Coiled Tentacles",
                type: "Melee",
                attacks: 7,
                hit: "3+",
                wound: "4+",
                rend: "1",
                damage: "2",
                abilities: [],
            },
        ],

        abilities: [
            {
                type: "Once Per Turn",
                icon: "movement",
                color: "black",
                phase: "Enemy Hero Phase",
                castingValue: null,
                keywords: [],
                lore: null,
                name: "The Mirror's Depths",
                description:
                    "Declare: Pick a visible enemy unit within 18\" of this unit to be the target.\n\nEffect: If the target is within 6\" of this unit, the target is gazing into eternity until the start of your next turn. Otherwise, roll a dice. On a 3+, the target is gazing into eternity until the start of your next turn. While the target is gazing into eternity, it must end all moves no further from this unit than it was at the start of the move and cannot be removed from the battlefield by an ability that would allow it to be set up again on the battlefield.",
            },
            {
                type: "Once Per Turn",
                icon: "hero",
                color: "purple",
                phase: "End of Any Turn",
                castingValue: null,
                keywords: [
                    "Banish",
                ],
                lore: null,
                name: "Swallow Energy",
                description:
                    "Declare: Pick a visible Manifestation within 12\" of this unit that was not summoned this turn to be the target, then make a banishment roll of 2D6.\n\nEffect: If the banishment roll equals or exceeds the banishment value on the target's warscroll, it is banished and removed from play. The next time a visible friendly unit wholly within 12\" of this unit uses a Summon ability, roll an additional D6, to a maximum of 3, when making the casting roll for that ability.",
            },
        ],

        heroicTrait: null,
        monstrousTrait: null,
        artefact: null,

        details: {
            models: 1,
            baseSize: null,
            regimentOptions: [],
            notes: null,
        },

        keywords: [
            "Hero",
            "Wizard (1)",
            "Infantry",
            "Ward (4+)",
            "Chaos",
            "Hedonites of Slaanesh",
            "Daemon",
        ],

        rules: {
            hero: true,
            unique: false,
            monster: false,
            wizard: 1,
            priest: 0,
            ward: "4+",
            warmaster: false,
            companion: false,
        },
    },

    {
        id: "glutos-orscollion",

        name: "Glutos Orscollion, Lord of Gluttony",

        image: "glutos-orscollion.png",

        points: 0,

        profile: {
            move: '8"',
            health: 18,
            control: 5,
            save: "3+",
            ward: "6+",
        },

        weapons: [
            {
                name: "Leerstave of Loth'shar",
                type: "Ranged",
                range: '12"',
                attacks: 3,
                hit: "3+",
                wound: "3+",
                rend: "1",
                damage: "3",
                abilities: [
                    "Shoot in Combat",
                ],
            },
            {
                name: "Glutos's Choking Tentacles",
                type: "Melee",
                attacks: 2,
                hit: "4+",
                wound: "2+",
                rend: "2",
                damage: "3",
                abilities: [],
            },
            {
                name: "Kyazu's Greatblade and Mutants' Claws",
                type: "Melee",
                attacks: 6,
                hit: "3+",
                wound: "3+",
                rend: "1",
                damage: "3",
                abilities: [
                    "Crit (Mortal)",
                    "Companion",
                ],
            },
        ],

        abilities: [
            {
                type: "Passive",
                icon: "skull",
                color: "black",
                phase: null,
                castingValue: null,
                keywords: [],
                lore: null,
                name: "Battle Damaged",
                description:
                    "Effect: While this unit has 10 or more damage points, the Attacks characteristic of its Kyazu's Greatblade and Mutants' Claws is 4.",
            },
            {
                type: "Spell",
                icon: "spell",
                color: "gold",
                phase: "Your Hero Phase",
                castingValue: 7,
                keywords: [
                    "Spell",
                ],
                lore: null,
                name: "Crippling Famishment",
                description:
                    "Declare: Pick a visible enemy unit within 18\" of this unit to be the target, then make a casting roll of 2D6.\n\nEffect: Until the start of your next turn, halve the target's Move characteristic and halve run rolls and charge rolls for the target.",
            },
            {
                type: "Start of Turn",
                icon: "hero",
                color: "black",
                phase: "Start of Any Turn",
                castingValue: null,
                keywords: [],
                lore: null,
                name: "Paragon of Gluttony",
                description:
                    "Effect: Pick 1 of the following delicacies for Glutos to savour. You cannot pick a delicacy that you picked in the previous turn. The effect applies for the rest of the turn.\n\nHeart of a Shadow Daemon: While they are wholly within 12\" of this unit, friendly non-Monster Hedonites of Slaanesh units are not visible to enemy units more than 12\" from them.\n\nBlood of an Aelven Princeling: Each time a friendly Hedonites of Slaanesh unit wholly within 12\" of this unit uses a Run ability, if you roll a 1-3 when determining the distance that unit can move, you can use a value of 4 instead.\n\nCrushed Incarnate's Core: Add 1 to unbinding rolls and banishment rolls for this unit.\n\nUnspeakable Viscera: Inflict D6 mortal damage on each other unit, friendly and enemy, within this unit's combat range.",
            },
            {
                type: "End of Turn",
                icon: "hero",
                color: "purple",
                phase: "End of Enemy Turn",
                castingValue: null,
                keywords: [],
                lore: null,
                name: "Gorge on Excess",
                description:
                    "Declare: Pick a friendly Sybarite unit wholly within 12\" of this unit to be the target.\n\nEffect: Heal (6) the target or return a number of slain models to the target with a combined Health characteristic of up to 3.",
            },
        ],

        heroicTrait: null,
        monstrousTrait: null,
        artefact: null,

        details: {
            models: 1,
            baseSize: null,
            regimentOptions: [],
            notes: null,
        },

        keywords: [
            "Warmaster",
            "Unique",
            "Hero",
            "War Machine",
            "Wizard (2)",
            "Ward (6+)",
            "Chaos",
            "Hedonites of Slaanesh",
            "Sybarite",
            "Paragon",
        ],

        rules: {
            hero: true,
            unique: true,
            monster: false,
            wizard: 2,
            priest: 0,
            ward: "6+",
            warmaster: true,
            companion: true,
        },
    },

    {
        id: "sigvald-prince-of-slaanesh",

        name: "Sigvald, Prince of Slaanesh",

        image: "sigvald.png",

        points: 0,

        profile: {
            move: '6"',
            health: 7,
            control: 2,
            save: "3+",
            ward: "4+",
        },

        weapons: [
            {
                name: "Shardslash",
                type: "Melee",
                attacks: 6,
                hit: "2+",
                wound: "3+",
                rend: "2",
                damage: "2",
                abilities: [
                    "Crit (2 Hits)",
                ],
            },
        ],

        abilities: [
            {
                type: "Passive",
                icon: "combat",
                color: "red",
                phase: null,
                castingValue: null,
                keywords: [],
                lore: null,
                name: "Shardslash",
                description:
                    "Effect: Subtract 1 from ward rolls for damage points inflicted by this unit's combat attacks.",
            },
            {
                type: "Passive",
                icon: "combat",
                color: "red",
                phase: null,
                castingValue: null,
                keywords: [],
                lore: null,
                name: "Paragon of Vainglory",
                description:
                    "Effect: If this unit charged this turn and the unmodified charge roll was 6+, for the rest of the turn this unit has Strike-first, the Attacks characteristic of this unit's Shardslash is equal to the unmodified charge roll, and melee weapons, including Companion weapons, used by other friendly Hedonites of Slaanesh units have Crit (2 Hits) while they are wholly within 12\" of and visible to this unit.",
            },
            {
                type: "Temptation",
                icon: "hero",
                color: "gold",
                phase: "Any Combat Phase",
                castingValue: null,
                keywords: [
                    "Temptation",
                ],
                lore: null,
                name: "Gaze Upon My Magnificence and Weep!",
                description:
                    "Declare: If this unit has not used a Temptation ability this turn, pick an enemy unit in combat with this unit to be the target.\n\nEffect: Your opponent must decide whether the target will adulate or reject Sigvald.\n\nAdulate: Until the start of your next turn, while the target is in combat with this unit, it must pick this unit to be the target of pile-in moves it makes.\n\nReject: Inflict D3+3 mortal damage on the target, then Heal (X) this unit, where X is the number of damage points inflicted on the target this turn by this ability.",
            },
        ],

        heroicTrait: null,
        monstrousTrait: null,
        artefact: null,

        details: {
            models: 1,
            baseSize: null,
            regimentOptions: [],
            notes: null,
        },

        keywords: [
            "Warmaster",
            "Unique",
            "Hero",
            "Infantry",
            "Ward (4+)",
            "Chaos",
            "Hedonites of Slaanesh",
            "Sybarite",
            "Paragon",
        ],

        rules: {
            hero: true,
            unique: true,
            monster: false,
            wizard: 0,
            priest: 0,
            ward: "4+",
            warmaster: true,
            companion: false,
        },
    },

    {
        id: "lord-of-hysteria",

        name: "Lord of Hysteria",

        image: "lord-of-hysteria.png",

        points: 0,

        profile: {
            move: '6"',
            health: 5,
            control: 2,
            save: "4+",
            ward: null,
        },

        weapons: [
            {
                name: "Ceremonial Weapons",
                type: "Melee",
                attacks: 5,
                hit: "3+",
                wound: "4+",
                rend: "2",
                damage: "2",
                abilities: [],
            },
        ],

        abilities: [
            {
                type: "Once Per Turn",
                icon: "hero",
                color: "gold",
                phase: "Your Hero Phase",
                castingValue: null,
                keywords: [
                    "Temptation",
                ],
                lore: null,
                name: "Master of the Revels",
                description:
                    "Declare: If this unit has not used a Temptation ability this turn, pick a visible friendly Sybarite unit wholly within 12\" of this unit to be the target.\n\nEffect: If the target is a Paragon, apply the following effect to the target. Otherwise, roll a dice. On a 3+, apply the following effect to the target: for the rest of the turn, while the target is wholly within 12\" of this unit, add 1 to the Attacks characteristic of the target's melee weapons.",
            },
            {
                type: "Passive",
                icon: "combat",
                color: "red",
                phase: null,
                castingValue: null,
                keywords: [],
                lore: null,
                name: "Slaughterous Celebrants",
                description:
                    "Effect: While they are wholly within 12\" of and visible to this unit, melee weapons used by friendly Hedonites of Slaanesh Infantry units have Anti-charge (+1 Rend).",
            },
        ],

        heroicTrait: null,
        monstrousTrait: null,
        artefact: null,

        details: {
            models: 1,
            baseSize: null,
            regimentOptions: [],
            notes: null,
        },

        keywords: [
            "Hero",
            "Infantry",
            "Chaos",
            "Hedonites of Slaanesh",
            "Sybarite",
        ],

        rules: {
            hero: true,
            unique: false,
            monster: false,
            wizard: 0,
            priest: 0,
            ward: null,
            warmaster: false,
            companion: false,
        },
    },
    /*
   * =====================================================
   * TROPAS NORMALES
   * =====================================================
   */

    {
        id: "slaangor-fiendbloods",

        name: "Slaangor Fiendbloods",

        image: "slaangor-fiendbloods.png",

        points: 0,

        profile: {
            move: '8"',
            health: 3,
            control: 1,
            save: "5+",
            ward: null,
        },

        weapons: [
            {
                name: "Razor-sharp Claws and Gilded Weapons",
                type: "Melee",
                attacks: 4,
                hit: "4+",
                wound: "3+",
                rend: "1",
                damage: "2",
                abilities: [
                    "Anti-Infantry (+1 Rend)",
                ],
            },
        ],

        abilities: [
            {
                type: "Deployment",
                icon: "movement",
                color: "black",
                phase: "Deployment Phase",
                castingValue: null,
                keywords: [
                    "Deploy",
                ],
                lore: null,
                name: "Veiled Threat",
                description:
                    "Effect: Set up this unit in reserve waiting in ambush. It has now been deployed.",
            },
            {
                type: "Movement",
                icon: "movement",
                color: "black",
                phase: "Any Movement Phase",
                castingValue: null,
                keywords: [],
                lore: null,
                name: "Bestial Onslaught",
                description:
                    "Declare: Pick this unit if it is waiting in ambush.\n\nEffect: Set up this unit on the battlefield wholly within 9\" of a battlefield edge and more than 9\" from all enemy units.",
            },
            {
                type: "Once Per Turn",
                icon: "movement",
                color: "black",
                phase:
                    "Reaction: Opponent declared a command for a unit within 12\" of this unit",
                castingValue: null,
                keywords: [],
                lore: null,
                name: "Instinctive Advance",
                description:
                    "Effect: This unit can move 3\" immediately after that command has been resolved, unless that command is a reaction, in which case this unit can move after the ability that it was reacting to has been resolved. It can pass through the combat ranges of enemy units and can end that move in combat. If this unit was in combat at the start of the move, it must end that move in combat with the units it was already in combat with at the start of the move.",
            },
        ],

        heroicTrait: null,
        monstrousTrait: null,
        artefact: null,

        details: {
            models: 3,
            baseSize: "40mm",
            regimentOptions: [],
            notes: null,
        },

        keywords: [
            "Infantry",
            "Champion",
            "Chaos",
            "Hedonites of Slaanesh",
            "Sybarite",
        ],

        rules: {
            hero: false,
            unique: false,
            monster: false,
            wizard: 0,
            priest: 0,
            ward: null,
            warmaster: false,
            companion: false,
            canBeReinforced: true,
        },
    },

    {
        id: "myrmidesh-painbringers",

        name: "Myrmidesh Painbringers",

        image: "myrmidesh-painbringers.png",

        points: 0,

        profile: {
            move: '6"',
            health: 2,
            control: 1,
            save: "3+",
            ward: null,
        },

        weapons: [
            {
                name: "Wicked Scimitar",
                type: "Melee",
                attacks: 3,
                hit: "3+",
                wound: "4+",
                rend: "1",
                damage: "1",
                abilities: [],
            },
        ],

        abilities: [
            {
                type: "Passive",
                icon: "defence",
                color: "black",
                phase: null,
                castingValue: null,
                keywords: [],
                lore: null,
                name: "False Serenity",
                description:
                    "Effect: While this unit has not charged this turn, it has Ward (5+).",
            },
            {
                type: "Once Per Turn",
                icon: "combat",
                color: "red",
                phase: "Any Combat Phase",
                castingValue: null,
                keywords: [],
                lore: null,
                name: "Dance of the Wailing Blade",
                description:
                    "Declare: Pick an enemy unit in combat with this unit to be the target.\n\nEffect: For the rest of the turn, for each unmodified hit roll of 1 for a combat attack made by that enemy unit that targets this unit, inflict 1 mortal damage on the target after the Fight ability has been resolved.",
            },
        ],

        heroicTrait: null,
        monstrousTrait: null,
        artefact: null,

        details: {
            models: 5,
            baseSize: "32mm",
            regimentOptions: [],
            notes: null,
        },

        keywords: [
            "Infantry",
            "Champion",
            "Chaos",
            "Hedonites of Slaanesh",
            "Sybarite",
        ],

        rules: {
            hero: false,
            unique: false,
            monster: false,
            wizard: 0,
            priest: 0,
            ward: null,
            warmaster: false,
            companion: false,
            canBeReinforced: true,
        },
    },

    {
        id: "symbaresh-twinsouls",

        name: "Symbaresh Twinsouls",

        image: "symbaresh-twinsouls.png",

        points: 0,

        profile: {
            move: '6"',
            health: 2,
            control: 1,
            save: "3+",
            ward: null,
        },

        weapons: [
            {
                name: "Merciless Weapons",
                type: "Melee",
                attacks: 3,
                hit: "3+",
                wound: "4+",
                rend: "1",
                damage: "1",
                abilities: [],
            },
        ],

        abilities: [
            {
                type: "Passive",
                icon: "combat",
                color: "black",
                phase: null,
                castingValue: null,
                keywords: [],
                lore: null,
                name: "Pah! Unworthy!",
                description:
                    "Effect: While this unit is damaged or has fewer than half its starting models, add 1 to the Rend characteristic of its melee weapons.",
            },
            {
                type: "Once Per Battle",
                icon: "combat",
                color: "red",
                phase: "Any Combat Phase",
                castingValue: null,
                keywords: [],
                lore: null,
                name: "Ego-driven Excess",
                description:
                    "Effect: For the rest of the turn, add 1 to the Damage characteristic of this unit's melee weapons for attacks that target an enemy unit that has a higher Control characteristic than this unit.",
            },
        ],

        heroicTrait: null,
        monstrousTrait: null,
        artefact: null,

        details: {
            models: 5,
            baseSize: "32mm",
            regimentOptions: [],
            notes: null,
        },

        keywords: [
            "Infantry",
            "Champion",
            "Chaos",
            "Hedonites of Slaanesh",
            "Sybarite",
        ],

        rules: {
            hero: false,
            unique: false,
            monster: false,
            wizard: 0,
            priest: 0,
            ward: null,
            warmaster: false,
            companion: false,
            canBeReinforced: true,
        },
    },

    {
        id: "slickblade-seekers",

        name: "Slickblade Seekers",

        image: "slickblade-seekers.png",

        points: 0,

        profile: {
            move: '14"',
            health: 4,
            control: 1,
            save: "5+",
            ward: null,
        },

        weapons: [
            {
                name: "Slickblade Glaive",
                type: "Melee",
                attacks: 3,
                hit: "3+",
                wound: "4+",
                rend: "1",
                damage: "1",
                abilities: [
                    "Charge (+1 Damage)",
                ],
            },
            {
                name: "Exalted Steed's Poisoned Tongue",
                type: "Melee",
                attacks: 3,
                hit: "3+",
                wound: "4+",
                rend: "0",
                damage: "1",
                abilities: [
                    "Companion",
                ],
            },
        ],

        abilities: [
            {
                type: "Once Per Turn",
                icon: "movement",
                color: "red",
                phase:
                    "Reaction: You declared a Charge ability for this unit",
                castingValue: null,
                keywords: [],
                lore: null,
                name: "Unrivalled Velocity",
                description:
                    "Effect: You can re-roll the charge roll.",
            },
        ],

        heroicTrait: null,
        monstrousTrait: null,
        artefact: null,

        details: {
            models: 5,
            baseSize: "75 × 42mm",
            regimentOptions: [],
            notes: null,
        },

        keywords: [
            "Cavalry",
            "Champion",
            "Chaos",
            "Hedonites of Slaanesh",
            "Sybarite",
        ],

        rules: {
            hero: false,
            unique: false,
            monster: false,
            wizard: 0,
            priest: 0,
            ward: null,
            warmaster: false,
            companion: true,
            canBeReinforced: true,
        },
    },

    {
        id: "blissbarb-archers",

        name: "Blissbarb Archers",

        image: "blissbarb-archers.png",

        points: 0,

        profile: {
            move: '6"',
            health: 1,
            control: 1,
            save: "6+",
            ward: null,
        },

        weapons: [
            {
                name: "Blissbarb Bow",
                type: "Ranged",
                range: '15"',
                attacks: 2,
                hit: "3+",
                wound: "4+",
                rend: "1",
                damage: "1",
                abilities: [],
            },
            {
                name: "Sybarite Blade",
                type: "Melee",
                attacks: 1,
                hit: "3+",
                wound: "4+",
                rend: "0",
                damage: "1",
                abilities: [],
            },
        ],

        abilities: [
            {
                type: "Passive",
                icon: "defence",
                color: "black",
                phase: null,
                castingValue: null,
                keywords: [],
                lore: null,
                name: "Blissbrew Homonculus",
                description:
                    "Effect: This unit's Blissbrew Homonculi are tokens. There is 1 Blissbrew Homonculus for every 10 models in this unit.\n\nThis unit has Ward (6+) while it has any Blissbrew Homonculi. If you make an unmodified ward roll of 1 for this unit, remove 1 of this unit's Blissbrew Homonculi from the battlefield; the damage point is still inflicted.",
            },
            {
                type: "Once Per Turn",
                icon: "shooting",
                color: "blue",
                phase: "Your Shooting Phase",
                castingValue: null,
                keywords: [],
                lore: null,
                name: "The Thrill of Combat",
                description:
                    "Declare: Pick a visible enemy unit in combat to be the target.\n\nEffect: For the rest of the turn, this unit's ranged weapons have Shoot in Combat and they also have Crit (Auto-wound) for attacks that target that enemy unit.",
            },
        ],

        heroicTrait: null,
        monstrousTrait: null,
        artefact: null,

        details: {
            models: 11,
            baseSize: "10 × 28.5mm; 1 × 25mm",
            regimentOptions: [],
            notes:
                "La unidad está formada por 10 Blissbarb Archers y 1 Blissbrew Homonculus. El Homonculus se trata como un token a efectos de reglas.",
        },

        keywords: [
            "Infantry",
            "Champion",
            "Chaos",
            "Hedonites of Slaanesh",
            "Sybarite",
        ],

        rules: {
            hero: false,
            unique: false,
            monster: false,
            wizard: 0,
            priest: 0,
            ward: null,
            warmaster: false,
            companion: false,
            canBeReinforced: true,
        },
    },
];

export default units;
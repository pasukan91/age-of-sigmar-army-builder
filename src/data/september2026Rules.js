const ABILITY_PATCHES = {
  cities: {
    "impossible-to-destroy": {
      phase: "Once Per Turn (Army), End of Any Turn",
      description: "Effect: **Heal (6)** this unit.",
    },
  },
  tzeentch: {
    "smoke-and-mirrors": {
      description: "Declare: Pick a friendly non-**MONSTER DISCIPLES OF TZEENTCH** unit that was not set up on the battlefield this turn and was not set up on the battlefield using this ability in the previous turn to be the target, then pick a friendly unit that is **masked by illusion** to be the substitute.\n\nEffect: Set up the substitute wholly within 6\" of the target and not in combat. Then, remove the target from the battlefield and set it up in reserve **masked by illusion**.",
    },
    "all-part-of-the-plan": {
      description: "Effect: You start the battle with 0 **fate points**. You can have a maximum of 9 **fate points**.\n\nGain 1 **fate point** each time:\n\n• You lose the priority roll.\n• A spell cast by a friendly **DISCIPLES OF TZEENTCH** unit is unbound.\n• A friendly **DISCIPLES OF TZEENTCH** unit miscasts a spell.\n• Your opponent gains control of an objective that you controlled at the start of the turn.\n• A friendly **Argent Shard** is **demolished**.",
    },
    "lingering-burns": {
      description: "Declare: This unit can use this ability even if it has been destroyed or is in reserve. Pick any number of **BURNING** enemy units to be the targets.\n\nEffect: Roll a D3 for each target. On a 1, the target no longer has the **BURNING** keyword. On a 2+, inflict an amount of mortal damage on the target equal to the roll.",
    },
  },
  hashut: {
    "amassed-legions": {
      description: "Effect: Each time a friendly **HELSMITHS OF HASHUT** unit within the combat range of a friendly **HELSMITHS OF HASHUT INFANTRY** unit with 1 or more **daemonic power points** uses the ‘Rally’ command, you can make 3 additional rally rolls of D6.",
    },
    "bulls-of-the-ziggurat": {
      description: "Effect: Add 1\" to the Move characteristic of friendly **HELSMITHS OF HASHUT** units for each **daemonic power point** that unit has.",
    },
    "arcane-dominance": {
      description: "Effect: Add 1 to casting rolls, chanting rolls, unbinding rolls and banishment rolls for friendly **HELSMITHS OF HASHUT WIZARDS** and **PRIESTS** while they are wholly within 12\" of another friendly **HELSMITHS OF HASHUT WIZARD** or **PRIEST** with 1 or more **daemonic power points**.",
    },
    "experimental-munitions": {
      description: "Effect: Ranged weapons used by friendly **HELSMITHS OF HASHUT** units have **Crit (2 Hits)** while they have 2 or more **daemonic power points**.",
    },
  },
  skaven: {
    "a-reputation-for-cunning": { commandPoints: null },
    "lightning-master": {
      description: "Declare: Pick a friendly **Warpvolt Scourgers** unit within this unit's combat range to be the target.\n\nEffect: Set the Attacks characteristic of the target's **Warpvolt Scourgers** to 10 for the rest of the turn.",
    },
  },
  std: {
    "brand-of-the-unaligned": {
      description: "Declare: This unit cannot use this ability if it has an **Ensorcelled Banner**.\n\nEffect: Remove all of this unit’s **Pledge to Chaos** keywords. Then, pick 1 of the following **Pledge to Chaos** keywords. You cannot pick a keyword you picked for this unit earlier in the battle.\n\n**• Pledged to Khorne**\n**• Pledged to Tzeentch**\n**• Pledged to Nurgle**\n**• Pledged to Slaanesh**\n\nThis unit has that keyword for the rest of the battle.",
    },
    "feral-ruin": {
      id: "you-will-serve",
      name: "You Will Serve!",
      phase: "Once Per Turn (Army), End of Your Turn",
      description: "Declare: Pick a friendly **Daemon Prince** to use this ability. Then, pick a visible friendly non-**DAEMON**, non-**UNIQUE SLAVES TO DARKNESS** unit that does not have an **Ensorcelled Banner** wholly within 12\" of this unit to be the target.\n\nEffect: Remove any **Pledge to Chaos** keywords the target has. Then, the target gains any **Pledge to Chaos** keywords this unit has.",
    },
    "oracular-visions": {
      description: "Declare: Pick a friendly **WARRIORS OF CHAOS** unit wholly within 12\" of this unit to be the target.\n\nEffect: If this unit successfully cast a spell this phase, the target has **WARD (5+)** until the start of your next turn. Otherwise, the target has **WARD (6+)** until the start of your next turn.",
    },
    "oath-of-conquest": {
      description: "Effect: If this unit is contesting an objective you control that is not within friendly territory, this unit has **WARD (5+)** for the rest of the battle.",
    },
  },
  nighthaunt: {
    "there-is-no-escape": {
      phase: "Once Per Turn (Army), Any Hero Phase",
      description: "Declare: If there is not a **condemned** enemy unit on the battlefield, pick an enemy unit to be **condemned**.\n\nEffect: For the rest of the battle, add 1 to the Rend characteristic of melee weapons used for attacks made by friendly **NIGHTHAUNT** units that target the **condemned** enemy unit.",
    },
    "shadowy-aura": {
      phase: "Passive",
      description: "Effect: While they are wholly within 6\" of this unit, friendly **NIGHTHAUNT INFANTRY** and **CAVALRY** units are not visible to enemy units more than 9\" from them.",
    },
    "sentenced-to-eternal-torment": {
      description: "Declare: Pick a visible enemy unit within 18\" of this unit to be the target.\n\nEffect: Roll a dice. On a 3+, inflict 1 mortal damage on the target and the target has the **SENTENCED** keyword for the rest of the battle.",
    },
    "spectral-alchemy": {
      description: "Declare: Pick an enemy unit within 10\" of this unit to be the target.\n\nEffect: If this unit’s shooting attacks inflicted damage on the target this turn, apply 1 of the following effects. Otherwise, roll a dice. On a 3+, apply 1 of the following effects:\n\n**Phantasmal Solvent:** If the target has a Move characteristic of ‘-’, inflict 6 mortal damage on the target.\n\n**Acidic Fug:** Inflict D3 mortal damage on the target.\n\n**Corrosive Mist:** Inflict 1 mortal damage on each enemy unit within the target’s combat range.\n\n**Choking Vapours:** If the target is a **WIZARD**, subtract 1 from its power level until the start of your next turn.\n\n**Fear-laced Hallucinogen:** If the target is a **PRIEST**, remove D3 ritual points from it.\n\n**Unholy Prescription:** Ward rolls cannot be made for the target for the rest of the turn.",
    },
  },
  soulblight: {
    "frenzied-surge": {
      phase: "Once Per Turn (Army), Any Charge Phase",
      keywords: [],
      description: "Declare: You can pick another visible friendly non-**HERO SOULBLIGHT GRAVELORDS INFANTRY** or **MONSTER** unit wholly within 12\" of this unit to be the target.\n\nEffect: This unit can move up to X\", where X is your **fury level**. It must end that move in combat.\n\nThen, the target can move up to X\", where X is your **fury level**. It can move through enemy models and the combat ranges of enemy units during that move but must end that move in combat with an enemy unit that this unit is in combat with.",
    },
  },
};

const DISCIPLINE_TRAITS = new Set([
  "impassive-retreat", "ruthless-extermination", "pitiless-assault",
  "remorseless-march", "inviolate-legions",
]);

export function applySeptember2026Rules(faction) {
  if (!faction) return faction;
  const patches = ABILITY_PATCHES[faction.id] ?? {};
  let result = deepPatch(faction, patches);
  if (faction.id === "ossiarch") result = patchOssiarch(result);
  if (faction.id === "idoneth") result = patchAbyssalDweller(result);
  if (faction.id === "fyreslayers") result = patchBlazingImpetus(result);
  if (faction.id === "behemat") result = patchBehemat(result);
  return result;
}

function deepPatch(value, patches) {
  if (Array.isArray(value)) return value.map((item) => deepPatch(item, patches));
  if (!value || typeof value !== "object") return value;
  const nested = Object.fromEntries(
    Object.entries(value).map(([key, item]) => [key, deepPatch(item, patches)]),
  );
  const patch = patches[value.id];
  return patch ? { ...nested, ...patch, balanceSource: "2026-09-23" } : nested;
}

function patchOssiarch(faction) {
  return mapObjects(faction, (item) => {
    if (!DISCIPLINE_TRAITS.has(item.id) && item.id !== "supreme-lord-of-the-bonereaper-legions") return item;
    return {
      ...item,
      description: String(item.description ?? "")
        .replace(/\s*If the target is reinforced[^.]*\.?/i, "")
        .replace(/\s*If that unit is reinforced[^.]*\.?/i, ""),
      balanceSource: "2026-09-23",
    };
  });
}

function patchAbyssalDweller(faction) {
  return mapObjects(faction, (item) => item.id === "abyssal-dweller"
    ? {
        ...item,
        description: "Declare: Pick an objective within 18\" of this unit to be the target.\n\nEffect: For the rest of the battle, enemy units contesting the target objective cannot use **RUN**, **RETREAT** or **CHARGE** abilities.",
        balanceSource: "2026-09-23",
      }
    : item);
}

function patchBlazingImpetus(faction) {
  return mapObjects(faction, (item) => item.id === "blazing-impetus" && !item.description.includes("was not set up this turn")
    ? {
        ...item,
        description: item.description.replace(
          "unit wholly within 12\" of them to be the target",
          "unit that was not set up this turn and that is wholly within 12\" of them to be the target",
        ),
        balanceSource: "2026-09-23",
      }
    : item);
}

function patchBehemat(faction) {
  return mapObjects(faction, (item) => {
    const destructiveImpulseAbilities = new Set([
      "smash-it-all-to-bits",
      "wrath-of-brodd",
      "crafty-creepers",
      "double-stomp",
      "watch-this",
    ]);
    if (destructiveImpulseAbilities.has(item.id)) {
      let description = String(item.description ?? "")
        .replace(/has not used a \*\*RAMPAGE\*\* ability this turn/gi, "has not used a **DESTRUCTIVE IMPULSE** ability this turn")
        .replace(/using this \*\*RAMPAGE\*\*/gi, "using this **DESTRUCTIVE IMPULSE** ability");
      if (item.id === "double-stomp") {
        description = description.replace(/ or \*\*Almightier Stomp\*\*/i, "");
      }
      if (item.id === "wrath-of-brodd" && !description.includes("as if it had **FLY**")) {
        description += " When it does so, it can pass through terrain features and enemy models as if it had **FLY**.";
      }
      return {
        ...item,
        description,
        keywords: [...new Set([...(item.keywords ?? []), "Destructive Impulse"])],
        balanceSource: "2026-09-23",
      };
    }
    if (item.id === "i-can-do-that-better") {
      return {
        ...item,
        description: String(item.description ?? "").replace(
          /even if it has used another \*\*RAMPAGE\*\* ability this turn/i,
          "even if it has used another **DESTRUCTIVE IMPULSE** ability this turn",
        ),
        balanceSource: "2026-09-23",
      };
    }
    if (item.id === "king-brodd-s-stomp") {
      return {
        ...replaceBroddKeywords(item),
        rosterText: "King Brodd (must be included and must be your general); any Big units; any non-Unique Little units; no Regiments of Renown.",
        balanceSource: "2026-09-23",
      };
    }
    if (item.id === "scourge-of-aqshy-mancrusher-gargant") {
      return {
        ...item,
        keywords: item.keywords.map((keyword) => keyword === "Gargant" ? "Little" : keyword),
        balanceSource: "2026-09-23",
      };
    }
    if (item.id !== "scourge-of-aqshy-gatebreaker-mega-gargant") return item;
    const abilities = item.abilities
      .filter((ability) => !["longshanks", "son-of-behemat"].includes(ability.id))
      .map((ability) => ability.id === "battle-damaged"
        ? {
            ...ability,
            description: "Effect: While this unit has 15 or more damage points, the Attacks characteristic of its **Fortcrusha Flail** is 11 for Calamitous Sweep and 4 for Crushing Blow.",
          }
        : ability.id === "it-s-goin-down"
          ? { ...ability, phase: "Once Per Battle (Army), Your Hero Phase" }
          : ability);
    abilities.push({
      id: "fortcrusha-flail",
      name: "Fortcrusha Flail",
      phase: "Passive",
      type: "Ability",
      description: "Effect: Each time this unit uses a **FIGHT** ability, pick either the Calamitous Sweep or Crushing Blow weapon characteristics for all the attacks it makes with its **Fortcrusha Flail**.",
      keywords: [],
      points: 0,
      castingValue: null,
      chantingValue: null,
      balanceSource: "2026-09-23",
    });
    return {
      ...item,
      profile: { ...item.profile, health: 25, control: "10" },
      keywords: item.keywords.map((keyword) => keyword === "Mega-Gargant" ? "Big" : keyword),
      weapons: [
        { name: "Hurled Boulder", type: "Ranged", range: "18\"", attacks: "1", hit: "3+", wound: "2+", rend: "2", damage: "4", abilities: [] },
        { name: "Fortcrusha Flail: Calamitous Sweep", type: "Melee", attacks: "16", hit: "3+", wound: "3+", rend: "1", damage: "1", abilities: ["Crit (Auto-wound)"] },
        { name: "Fortcrusha Flail: Crushing Blow", type: "Melee", attacks: "6", hit: "4+", wound: "2+", rend: "2", damage: "4", abilities: [] },
        { name: "Almighty Stomp", type: "Melee", attacks: "3", hit: "4+", wound: "2+", rend: "2", damage: "D3", abilities: [] },
      ],
      abilities,
      balanceSource: "2026-09-23",
    };
  });
}

function replaceBroddKeywords(value) {
  if (Array.isArray(value)) return value.map(replaceBroddKeywords);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(
    Object.entries(value).map(([key, nested]) => {
      if (key === "description" && typeof nested === "string") {
        return [key, nested
          .replace(/MEGA[-‐‑–—]GARGANT/gi, (match) => match === match.toUpperCase() ? "BIG" : "Big")
          .replace(/(?<!MEGA[-‐‑–—])GARGANT/gi, (match) => match === match.toUpperCase() ? "LITTLE" : "Little")];
      }
      return [key, replaceBroddKeywords(nested)];
    }),
  );
}

function mapObjects(value, mapper) {
  if (Array.isArray(value)) return value.map((item) => mapObjects(item, mapper));
  if (!value || typeof value !== "object") return value;
  const nested = Object.fromEntries(
    Object.entries(value).map(([key, item]) => [key, mapObjects(item, mapper)]),
  );
  return mapper(nested);
}

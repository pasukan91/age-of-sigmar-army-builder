import assert from "node:assert/strict";
import test from "node:test";

import {
  getAbilityPhaseTone,
  groupAbilitiesByPhase,
  parseAbilityDescription,
  parseFormattedText,
} from "./abilityFormatting.js";

test("maps common timings to official-style phase colour groups", () => {
  assert.equal(getAbilityPhaseTone({ phase: "Passive" }), "passive");
  assert.equal(getAbilityPhaseTone({ phase: "Your Hero Phase" }), "hero");
  assert.equal(getAbilityPhaseTone({ phase: "Any Combat Phase" }), "combat");
  assert.equal(getAbilityPhaseTone({ phase: "End of Any Turn" }), "turn");
});

test("groups abilities in a stable phase order", () => {
  const groups = groupAbilitiesByPhase([
    { name: "Fight", phase: "Any Combat Phase" },
    { name: "Move", phase: "Your Movement Phase" },
    { name: "Ward", phase: "Passive" },
    { name: "Spell", phase: "Your Hero Phase" },
  ]);

  assert.deepEqual(groups.map((group) => group.id), [
    "passive",
    "hero",
    "movement",
    "combat",
  ]);
});

test("separates declare and effect sections in English or Spanish", () => {
  assert.deepEqual(
    parseAbilityDescription("Declare: Pick a unit. Effect: Roll a D3."),
    {
      introduction: "",
      sections: [
        { title: "Declarar", text: "Pick a unit." },
        { title: "Efecto", text: "Roll a D3." },
      ],
    },
  );
  assert.equal(
    parseAbilityDescription("Declara: Elige una unidad. Efecto: Cura 1.").sections.length,
    2,
  );
});

test("turns bullet markers into a structured list", () => {
  assert.deepEqual(parseFormattedText("Con 2+:\n• Inflige D3 daños.\n• Resta 1 a herir."), {
    lead: "Con 2+:",
    bullets: ["Inflige D3 daños.", "Resta 1 a herir."],
  });
});

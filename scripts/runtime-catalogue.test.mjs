import assert from "node:assert/strict";
import test from "node:test";
import { createServer } from "vite";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { packCatalogue, unpackCatalogue } from "./catalogue-codec.mjs";

test("catalogue codec retains values and shares identical rules", () => {
  const rules = [{ name: "Ward", value: "6+" }, { name: "Ward", value: "6+" }, null, false, 2, "2"];
  const decoded = unpackCatalogue(JSON.parse(JSON.stringify(packCatalogue(rules))));
  assert.deepEqual(decoded, rules);
  assert.equal(decoded[0], decoded[1]);
  assert.throws(() => packCatalogue({ runtimeCallback() {} }), /Cannot compile catalogue function/);
});

test("production catalogue preserves all factions, renown armies, rules and list validation", async () => {
  const server = await createServer({ configFile: false, logLevel: "silent", server: { middlewareMode: true, hmr: false }, appType: "custom" });
  try {
    const { default: factions } = await server.ssrLoadModule("/src/data/factions.js");
    const raw = JSON.stringify(factions);
    const packed = JSON.stringify(packCatalogue(factions));
    const start = performance.now();
    const compiled = unpackCatalogue(JSON.parse(packed));
    console.log(`Runtime catalogue: ${raw.length} → ${packed.length} bytes; decoded in ${Math.round(performance.now() - start)} ms`);
    assert.equal(JSON.stringify(compiled), raw);
    assert.ok(packed.length < raw.length * 0.5, "shared rules should halve catalogue size");
    const { validateArmyList } = await server.ssrLoadModule("/src/utils/armyValidation.js");
    const { getAvailableUnitsForRegiment } = await server.ssrLoadModule("/src/utils/regimentRules.js");
    for (const [index, faction] of factions.entries()) {
      const makeList = (value) => ({ faction: value, pointsLimit: 2000, regiments: [{ id: "regiment", hero: value.units[0], units: value.units.slice(1, 5) }] });
      const original = makeList(faction);
      const optimized = makeList(compiled[index]);
      assert.deepEqual(validateArmyList(optimized), validateArmyList(original), faction.name);
      assert.deepEqual(getAvailableUnitsForRegiment(optimized, optimized.regiments[0]).map((unit) => unit.id), getAvailableUnitsForRegiment(original, original.regiments[0]).map((unit) => unit.id), faction.name);
    }
    const ghb = await server.ssrLoadModule("/src/data/ghb2026.js");
    const data = Object.fromEntries(Object.entries(ghb).filter(([key]) => !key.startsWith("__")));
    assert.equal(JSON.stringify(unpackCatalogue(packCatalogue(data))), JSON.stringify(data));
    const { default: DeferredDetails } = await server.ssrLoadModule("/src/components/DeferredDetails.jsx");
    function ExpensiveRule() { throw new Error("Closed rule mounted prematurely"); }
    const closed = renderToStaticMarkup(createElement(DeferredDetails, { summary: "Rule" }, createElement(ExpensiveRule)));
    assert.ok(closed.includes("<summary>Rule</summary>"));
    const open = renderToStaticMarkup(createElement(DeferredDetails, { summary: "Rule", defaultOpen: true }, "Rule content"));
    assert.ok(open.includes("Rule content"));
  } finally {
    await server.close();
  }
});

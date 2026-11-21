import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";
import regiments, { getEligibleRegimentsOfRenown } from "../src/data/regimentsOfRenown.js";
import { getRegimentOfRenownAddError } from "../src/utils/armyComposition.js";
import { calculateArmyPoints } from "../src/utils/armyPoints.js";

const list = { faction: { id: "kruleboyz" }, pointsLimit: 2000, regiments: [], regimentsOfRenown: [] };
const options = getEligibleRegimentsOfRenown(list.faction.id);

test("renown selection enforces faction, army restrictions and one regiment without counting included units twice", () => {
  const regiment = options[0];
  assert.equal(getRegimentOfRenownAddError(list, regiment), null);
  assert.ok(getRegimentOfRenownAddError({ ...list, faction: { id: "unavailable" } }, regiment));
  assert.ok(getRegimentOfRenownAddError({ ...list, armyOfRenown: { excludesRegimentsOfRenown: true } }, regiment));
  const selected = { ...list, regimentsOfRenown: [{ ...regiment, instanceId: "included" }] };
  assert.ok(getRegimentOfRenownAddError(selected, regiment));
  assert.ok(getRegimentOfRenownAddError(selected, options[1]));
  assert.equal(calculateArmyPoints(selected), regiment.points);
});

test("renders available and selected regiments, their rules and locked units throughout the catalogue", async () => {
  const server = await createServer({ appType: "custom", logLevel: "error", server: { middlewareMode: true, hmr: false } });
  try {
    const { default: Options } = await server.ssrLoadModule("/src/components/RenownOptions.jsx");
    const { default: Roster } = await server.ssrLoadModule("/src/components/armybuilder/RenownSection.jsx");
    const { default: Reference } = await server.ssrLoadModule("/src/pages/RegimentOfRenownWarscroll.jsx");
    const noop = () => {};
    const availableHtml = renderToStaticMarkup(createElement(Options, { options, list, onAdd: noop, onView: noop }));
    assert.equal((availableHtml.match(/aos-renown-option__add/g) ?? []).length, options.length);
    assert.doesNotMatch(availableHtml, /disabled=""/);
    const fullHtml = renderToStaticMarkup(createElement(Options, { options, list: { ...list, regimentsOfRenown: [options[0]] }, onAdd: noop }));
    assert.equal((fullHtml.match(/disabled=""/g) ?? []).length, options.length);
    for (const regiment of regiments) {
      const selected = { ...regiment, instanceId: `selected-${regiment.id}` };
      const roster = renderToStaticMarkup(createElement(Roster, { selected: [selected], onViewUnit: noop, onView: noop, onRemove: noop }));
      assert.match(roster, /Remove Regiment/);
      assert.doesNotMatch(roster, /Configure |Explorar regimientos|ADD REGIMENT OF RENOWN/);
      const preview = renderToStaticMarkup(createElement(Reference, { regiment, list, onBack: noop }));
      assert.match(preview, /Regiment Details/);
      assert.match(preview, /Regiment Abilities/);
      for (const unit of regiment.resolvedUnits) {
        const name = renderToStaticMarkup(createElement("span", null, unit.name)).slice(6, -7);
        assert.ok(roster.includes(name), `${regiment.name}: ${unit.name} roster`);
        assert.ok(preview.includes(name), `${regiment.name}: ${unit.name} preview`);
      }
      assert.doesNotMatch(preview, /\[object Object\]/);
    }
  } finally { await server.close(); }
});

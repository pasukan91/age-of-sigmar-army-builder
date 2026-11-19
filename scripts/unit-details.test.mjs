import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";
import { formatRegimentOption } from "../src/utils/regimentRules.js";

test("formats regiment labels and limits for structured and legacy options", () => {
  assert.equal(formatRegimentOption({ min: 0, max: 1, label: "Swamp Beast" }), "0-1 Swamp Beast");
  assert.equal(formatRegimentOption({ min: 0, max: -1, label: "Any Kruleboyz" }), "Any Kruleboyz");
  assert.equal(formatRegimentOption("0-1 Mob Wrangler"), "0-1 Mob Wrangler");
  assert.equal(formatRegimentOption("Any Kruleboyz"), "Any Kruleboyz");
});

test("renders open Unit Details for every catalogue unit without object-child errors", async () => {
  const server = await createServer({ logLevel: "error", server: { middlewareMode: true }, appType: "custom" });
  try {
    const { default: UnitDetails } = await server.ssrLoadModule("/src/components/UnitDetails.jsx");
    const { default: factions } = await server.ssrLoadModule("/src/data/factions.js");
    let structuredOptions = 0;
    for (const faction of factions) {
      for (const unit of [...(faction.units ?? []), ...(faction.terrain ?? [])]) {
        const html = renderToStaticMarkup(createElement(UnitDetails, { unit, models: unit.details?.models ?? 1, points: unit.points ?? 0 }));
        assert.ok(html.includes("Points"), unit.name);
        assert.ok(!html.includes("[object Object]"), unit.name);
        for (const option of unit.details?.regimentOptions ?? []) {
          if (typeof option === "object") structuredOptions += 1;
          assert.ok(typeof formatRegimentOption(option) === "string", unit.name);
        }
      }
    }
    assert.ok(structuredOptions > 0, "must exercise the structured options that caused the crash");
  } finally {
    await server.close();
  }
});

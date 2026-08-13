import assert from "node:assert/strict";
import test from "node:test";

import { createServer } from "vite";

test("shooting and anti-monster presets reserve space for screens and other roles", async () => {
  const server = await createServer({
    appType: "custom",
    logLevel: "silent",
    server: { middlewareMode: true },
  });

  try {
    const { default: factions } = await server.ssrLoadModule("/src/data/factions.js");
    const { getPredefinedListSummary } = await server.ssrLoadModule(
      "/src/data/predefinedLists.js"
    );
    const faction = factions.find((item) => item.id === "kruleboyz");
    const shooting = getPredefinedListSummary(faction, "shooting");
    const hunters = getPredefinedListSummary(faction, "anti-monsters");

    assert.ok(shooting.composition.screen >= 2);
    assert.ok(shooting.composition.ranged < shooting.composition.coreUnits);
    assert.ok(shooting.composition.specialistShare <= 0.58);
    assert.ok(hunters.composition.screen >= 2);
    assert.ok(hunters.composition.hunter < hunters.composition.coreUnits);
    assert.ok(hunters.composition.specialistShare <= 0.58);
  } finally {
    await server.close();
  }
});

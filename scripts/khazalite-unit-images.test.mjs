import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import { createServer } from "vite";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import images from "../src/data/khazaliteUnitImages.generated.json" with { type: "json" };
import catalogue from "../src/data/sigdexAllFactions.generated.json" with { type: "json" };

const faction = catalogue.factions.find((item) => item.id === "fyreslayers");

test("every Khazalite warscroll resolves to an existing miniature photograph", () => {
  for (const unit of faction.units) {
    const image = images[unit.id] ?? unit.image;
    assert.match(image, /^\/images\/(units|catalogue)\//, unit.name);
    assert.ok(existsSync(`public${image}`), `${unit.name}: ${image}`);
  }
  for (const image of Object.values(images)) {
    const bytes = readFileSync(`public${image}`);
    assert.equal(bytes.toString("ascii", 0, 4), "RIFF", image);
    assert.equal(bytes.toString("ascii", 8, 12), "WEBP", image);
  }
  assert.equal(new Set([images["high-kyng-valankrom"], images["hjulda-drakkblud"], images["ormyr-and-ashtongue"], images.runewright]).size, 4);
});

test("unit cards and warscrolls replace generic images even in existing lists", async () => {
  const server = await createServer({ configFile: false, logLevel: "silent", server: { middlewareMode: true, hmr: false }, appType: "custom" });
  try {
    const { default: UnitArtwork } = await server.ssrLoadModule("/src/components/UnitArtwork.jsx");
    for (const [id, image] of Object.entries(images)) {
      for (const variant of ["card", "warscroll"]) {
        const unit = { id, name: id, image: "/images/alliances/order.webp", keywords: ["Khazalite Holds"] };
        const html = renderToStaticMarkup(createElement(UnitArtwork, { unit, variant }));
        assert.ok(html.includes(`src="${image}"`), `${id}: ${variant}`);
        assert.ok(!html.includes("aos-unit-artwork--fallback"), id);
      }
    }
  } finally {
    await server.close();
  }
});

import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  FACTION_MECHANIC_ILLUSTRATIONS,
  getFactionMechanicIllustration,
} from "./factionMechanicIllustrations.js";

test("includes every illustrated matched-play faction mechanic from the catalogue", () => {
  assert.deepEqual(
    Object.keys(FACTION_MECHANIC_ILLUSTRATIONS).sort(),
    ["blood-for-the-blood-god", "dirty-tricks", "the-faces-of-the-bad-moon"],
  );
});

test("illustrated mechanics have a local image and useful accessible text", () => {
  for (const illustration of Object.values(FACTION_MECHANIC_ILLUSTRATIONS)) {
    assert.match(illustration.src, /^\/images\/rule-illustrations\/.+\.webp$/);
    assert.ok(illustration.caption.length > 10);
    assert.ok(illustration.alt.length > 40);
    assert.ok(illustration.sourceName.length > 0);
    assert.equal(
      existsSync(fileURLToPath(new URL(`../../public${illustration.src}`, import.meta.url))),
      true,
      `Missing local illustration: ${illustration.src}`,
    );
  }
});

test("resolves illustrations by the stable ability id", () => {
  assert.equal(
    getFactionMechanicIllustration({ id: "The-Faces-of-the-Bad-Moon" })?.sourceName,
    "Gloomspite Gitz Battle Traits",
  );
  assert.equal(getFactionMechanicIllustration({ id: "ordinary-rule" }), null);
});


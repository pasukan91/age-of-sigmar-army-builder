import assert from "node:assert/strict";
import test from "node:test";

import { getFactionArtworkPosition } from "./factionArtwork.js";

const reframedFactionIds = [
  "cities",
  "daughters",
  "flesheater",
  "gloomspite",
  "hashut",
  "idoneth",
  "ironjawz",
  "kharadron",
  "khorne",
  "kruleboyz",
  "lumineth",
  "nighthaunt",
  "nurgle",
  "ogors",
  "ossiarch",
  "skaven",
  "soulblight",
  "stormcast",
  "std",
  "sylvaneth",
  "tzeentch",
];

test("every playable faction except Hedonites has focal points for each crop", () => {
  for (const id of reframedFactionIds) {
    for (const context of ["card", "page", "list"]) {
      assert.match(
        getFactionArtworkPosition({ id }, context),
        /^\d+% \d+%$/,
        `${id} is missing its ${context} focal point`
      );
    }
  }
});

test("Hedonites keeps its previous framing", () => {
  assert.equal(getFactionArtworkPosition({ id: "hedonites" }, "card"), null);
  assert.equal(getFactionArtworkPosition({ id: "hedonites" }, "page"), null);
  assert.equal(getFactionArtworkPosition({ id: "hedonites" }, "list"), null);
});

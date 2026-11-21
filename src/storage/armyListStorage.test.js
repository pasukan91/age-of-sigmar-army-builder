import assert from "node:assert/strict";
import test from "node:test";

import { createServer } from "vite";

function createMemoryStorage(initialValue) {
  const values = new Map(initialValue ? [["storm-forge.army-lists.v1", initialValue]] : []);
  return {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    values,
  };
}

test("restores Fyreslayers lists as Khazalite Holds and migrates both Hearthguard weapon variants", async () => {
  const server = await createServer({ appType: "custom", logLevel: "silent", server: { middlewareMode: true, hmr: false } });
  try {
    const storageModule = await server.ssrLoadModule("/src/storage/armyListStorage.js");
    const payload = JSON.stringify({ version: 1, lists: [{
      id: "legacy-fyreslayers", factionId: "fyreslayers", allianceId: "order", name: "Saved army",
      regiments: [{ id: "regiment-1", hero: { id: "auric-runefather", instanceId: "hero-1" }, units: [
        { id: "hearthguard-berzerkers-with-berzerker-broadaxes", instanceId: "unit-1", reinforced: true },
        { id: "hearthguard-berzerkers-with-flamestrike-poleaxes", instanceId: "unit-2" },
      ] }],
    }] });
    globalThis.window = { localStorage: createMemoryStorage(payload) };
    const result = storageModule.loadArmyListsResult();
    assert.equal(result.status, "loaded");
    const list = result.lists[0];
    assert.equal(list.faction.name, "Khazalite Holds");
    assert.equal(list.regiments[0].hero.instanceId, "hero-1");
    assert.deepEqual(list.regiments[0].units.map((unit) => unit.id), ["hearthguard-berzerkers", "hearthguard-berzerkers"]);
    assert.equal(list.regiments[0].units[0].reinforced, true);
    assert.equal(list.regiments[0].units[1].instanceId, "unit-2");
  } finally {
    delete globalThis.window;
    await server.close();
  }
});

test("isolates a malformed list and preserves the original payload", async () => {
  const server = await createServer({
    appType: "custom",
    logLevel: "silent",
    server: { middlewareMode: true },
  });

  try {
    const storageModule = await server.ssrLoadModule("/src/storage/armyListStorage.js");
    const payload = JSON.stringify({
      version: 1,
      lists: [
        {
          id: "valid-list",
          name: "Lista válida",
          allianceId: "destruction",
          factionId: "kruleboyz",
          regiments: [],
        },
        {
          id: "broken-list",
          name: "Lista dañada",
          allianceId: "destruction",
          factionId: "kruleboyz",
          regiments: {},
        },
      ],
    });
    const localStorage = createMemoryStorage(payload);
    globalThis.window = { localStorage };

    const originalConsoleError = console.error;
    console.error = () => {};
    const result = storageModule.loadArmyListsResult();
    console.error = originalConsoleError;

    assert.equal(result.status, "recovered");
    assert.equal(result.lists.length, 1);
    assert.equal(result.lists[0].id, "valid-list");
    assert.equal(result.rejectedCount, 1);
    assert.equal(
      localStorage.values.get(storageModule.RECOVERY_STORAGE_KEY),
      payload
    );
  } finally {
    delete globalThis.window;
    await server.close();
  }
});

test("keeps SigDex enhancement categories after saving and reloading", async () => {
  const server = await createServer({
    appType: "custom",
    logLevel: "silent",
    server: { middlewareMode: true },
  });

  try {
    const storageModule = await server.ssrLoadModule("/src/storage/armyListStorage.js");
    const { default: factions } = await server.ssrLoadModule("/src/data/factions.js");
    const faction = factions.find((item) => item.id === "gloomspite");
    const leader = faction.units.find((unit) => unit.id === "loonboss");
    const unit = faction.units.find((candidate) => candidate.id === "moonclan-stabbas");
    const enhancement = faction.aqshyEnhancements.find((item) => item.id === "fizzcap");
    const localStorage = createMemoryStorage();
    globalThis.window = { localStorage };

    assert.equal(storageModule.saveArmyLists([{
      id: "enhancement-list",
      name: "Enhancements",
      generalRegimentId: null,
      battlepack: { id: "ghb-2026-27", name: "General's Handbook 2026-27" },
      allianceId: "destruction",
      faction,
      regiments: [{
        id: "regiment-1",
        hero: { ...leader, instanceId: "leader-1" },
        units: [{
          ...unit,
          instanceId: "unit-1",
          specialEnhancements: { "Special Knick-knacks": enhancement },
        }],
      }],
    }]), true);

    const [restored] = storageModule.loadArmyLists();
    assert.equal(restored.generalRegimentId, null);
    assert.equal(restored.battlepack.id, "ghb-2026-27");
    const restoredUnit = restored.regiments[0].units[0];
    assert.equal(restoredUnit.specialEnhancements["Special Knick-knacks"].id, "fizzcap");
  } finally {
    delete globalThis.window;
    await server.close();
  }
});

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
    const restoredUnit = restored.regiments[0].units[0];
    assert.equal(restoredUnit.specialEnhancements["Special Knick-knacks"].id, "fizzcap");
  } finally {
    delete globalThis.window;
    await server.close();
  }
});

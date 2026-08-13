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

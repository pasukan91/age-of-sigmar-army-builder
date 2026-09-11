import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import vm from "node:vm";
import { pwaBuildVersion } from "./pwa-build-version.mjs";

test("data-only releases change the worker version; identical builds stay stable", () => {
  const dir = mkdtempSync(join(tmpdir(), "storm-forge-pwa-"));
  try {
    const build = (code) => {
      writeFileSync(join(dir, "sw.js"), 'const CACHE_VERSION = "v8";');
      pwaBuildVersion().writeBundle({ dir }, { "app.js": { type: "chunk", code } });
      return readFileSync(join(dir, "sw.js"), "utf8");
    };
    const previous = build('const traits = ["old", "old"];');
    const updated = build('const traits = ["new"];');
    assert.notEqual(previous, updated);
    assert.equal(updated, build('const traits = ["new"];'));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("offline navigation prefers the updated runtime shell over the installed shell", async () => {
  const events = {};
  const context = vm.createContext({
    self: { addEventListener: (name, handler) => { events[name] = handler; }, location: { origin: "https://example.test" } },
    URL,
    fetch: async () => { throw new Error("offline"); },
    caches: { open: async (name) => ({ match: async (key) => key === "/index.html" ? (name.includes("runtime") ? "new" : "old") : undefined }) },
  });
  vm.runInContext(readFileSync("public/sw.js", "utf8"), context);
  let response;
  events.fetch({ request: { method: "GET", mode: "navigate", url: "https://example.test/army" }, respondWith: (promise) => { response = promise; } });
  assert.equal(await response, "new");
});

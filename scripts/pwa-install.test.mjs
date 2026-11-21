import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import test from "node:test";

function client() {
  const events = new Map();
  const dispatched = [];
  const window = {
    isSecureContext: true,
    addEventListener: (name, handler) => events.set(name, handler),
    dispatchEvent: (event) => dispatched.push(event),
  };
  const context = vm.createContext({ window, navigator: {}, console, CustomEvent: class { constructor(type, options) { this.type = type; this.detail = options.detail; } } });
  vm.runInContext(readFileSync("src/pwa/pwaClient.js", "utf8").replace(/export /g, "").replace("import.meta.env.DEV", "false"), context);
  context.initializePwa();
  return { context, events, dispatched };
}

test("the protected manifest is requested with the user's access session", () => {
  assert.match(readFileSync("index.html", "utf8"), /<link\s+rel="manifest"[^>]*crossorigin="use-credentials"/);
});

test("an install opportunity remains available for the visible install action", async () => {
  const { context, events, dispatched } = client();
  let prevented = false;
  let prompts = 0;
  events.get("beforeinstallprompt")({ preventDefault: () => { prevented = true; }, prompt: async () => prompts++, userChoice: Promise.resolve({ outcome: "accepted" }) });
  assert.equal(prevented, true);
  assert.equal(context.canRequestPwaInstall(), true);
  assert.equal(await context.requestPwaInstall(), true);
  assert.equal(prompts, 1);
  assert.equal(context.canRequestPwaInstall(), false);
  assert.equal(dispatched.at(-1).detail, false);
});

test("dismissed or failed install prompts can fall back to manual installation", async () => {
  const { context, events } = client();
  assert.equal(await context.requestPwaInstall(), false);
  events.get("beforeinstallprompt")({ preventDefault() {}, prompt: async () => {}, userChoice: Promise.resolve({ outcome: "dismissed" }) });
  assert.equal(await context.requestPwaInstall(), false);
  events.get("beforeinstallprompt")({ preventDefault() {}, prompt: async () => { throw new Error("unsupported"); } });
  await assert.rejects(context.requestPwaInstall(), /unsupported/);
  assert.equal(context.canRequestPwaInstall(), false);
});

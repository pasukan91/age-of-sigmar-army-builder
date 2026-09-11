import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

// A data/code release must update the worker even if sw.js was not edited.
export function pwaBuildVersion() {
  return {
    name: "storm-forge-pwa-version",
    apply: "build",
    writeBundle(options, bundle) {
      const hash = createHash("sha256");
      for (const name of Object.keys(bundle).sort()) {
        const item = bundle[name];
        hash.update(name);
        hash.update(item.type === "chunk" ? item.code : item.source);
      }
      const workerPath = resolve(options.dir, "sw.js");
      const worker = readFileSync(workerPath, "utf8");
      hash.update(worker);
      const version = hash.digest("hex").slice(0, 16);
      writeFileSync(workerPath, worker.replace(
        /const CACHE_VERSION = "[^"]+";/,
        `const CACHE_VERSION = "${version}";`
      ));
    },
  };
}

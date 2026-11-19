import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import { packCatalogue } from "./catalogue-codec.mjs";

export function runtimeCataloguePlugin() {
  const root = fileURLToPath(new URL("../", import.meta.url));
  const sources = new Map(["factions", "ghb2026"].map((name) => [path.resolve(root, `src/data/${name}`), name]));
  const prefix = "\0compiled-catalogue:";
  return {
    name: "compiled-faction-catalogue",
    apply: "build",
    enforce: "pre",
    resolveId(source, importer) {
      if (!importer || !source.startsWith(".")) return;
      const resolved = path.resolve(path.dirname(importer), source).replace(/\.js$/, "");
      if (sources.has(resolved)) return prefix + sources.get(resolved);
    },
    async load(id) {
      if (!id.startsWith(prefix)) return;
      const name = id.slice(prefix.length);
      // Run the existing authoritative pipeline during the build, rather than
      // making every phone merge and normalize all historical catalogues.
      const server = await createServer({ root, configFile: false, logLevel: "silent", server: { middlewareMode: true, hmr: false }, appType: "custom" });
      try {
        const exports = await server.ssrLoadModule(`/src/data/${name}.js`);
        const data = Object.fromEntries(Object.entries(exports).filter(([key]) => !key.startsWith("__")));
        const packed = JSON.stringify(packCatalogue(data));
        this.info(`Compiled ${name}: ${(packed.length / 1024).toFixed(0)} KiB of shared rules`);
        const codecPath = path.resolve(root, "scripts/catalogue-codec.mjs").replaceAll("\\", "/");
        const declarations = Object.keys(data).map((key) => key === "default" ? "export default data.default;" : `export const ${key} = data.${key};`).join("\n");
        return `import { unpackCatalogue } from ${JSON.stringify(codecPath)}; const data = unpackCatalogue(JSON.parse(${JSON.stringify(packed)})); ${declarations}`;
      } finally {
        await server.close();
      }
    },
  };
}

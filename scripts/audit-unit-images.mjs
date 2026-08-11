import { createServer } from "vite";
import { existsSync } from "node:fs";
import path from "node:path";

const server = await createServer({
  logLevel: "silent",
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  const { default: factions } = await server.ssrLoadModule("/src/data/factions.js");
  const report = factions
    .filter((faction) => (faction.units ?? []).length > 0)
    .map((faction) => ({
      faction: faction.id,
      units: faction.units.length,
      missing: faction.units.filter((unit) => {
        if (!unit.image?.startsWith("/images/")) return true;
        return !existsSync(path.join(process.cwd(), "public", unit.image.slice(1)));
      }).map((unit) => ({ id: unit.id, name: unit.name, image: unit.image ?? null })),
    }))
    .filter((faction) => faction.missing.length > 0);

  console.log(JSON.stringify(report, null, 2));
} finally {
  await server.close();
}

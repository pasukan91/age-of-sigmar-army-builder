import { writeFileSync } from "node:fs";
import { createServer } from "vite";

const outputArgument = process.argv.find((argument) => argument.startsWith("--output="));

if (!outputArgument) {
  throw new Error("Usage: node scripts/export-warscroll-data.mjs --output=<file>");
}

const server = await createServer({
  logLevel: "error",
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  const { default: factions } = await server.ssrLoadModule("/src/data/factions.js");
  const result = factions
    .filter((faction) => faction.units.length > 0)
    .map((faction) => ({
      faction: faction.name,
      units: faction.units,
    }));
  writeFileSync(
    outputArgument.slice("--output=".length),
    `${JSON.stringify(result, null, 2)}\n`,
    "utf8",
  );
} finally {
  await server.close();
}

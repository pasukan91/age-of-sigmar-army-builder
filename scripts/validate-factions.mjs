import { createServer } from "vite";

const server = await createServer({
  logLevel: "silent",
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  const { default: factions } = await server.ssrLoadModule("/src/data/factions.js");
  const { getFactionValidationErrors } = await server.ssrLoadModule(
    "/src/data/normalizeFaction.js"
  );

  const failures = factions.flatMap((faction) =>
    getFactionValidationErrors(faction).map((error) => `${faction.id}: ${error}`)
  );

  if (failures.length > 0) {
    throw new Error(`Datos de facción inválidos:\n${failures.join("\n")}`);
  }

  console.log(
    `Datos válidos: ${factions.length} facciones, ` +
    `${factions.reduce((total, faction) => total + faction.units.length, 0)} unidades.`
  );
} finally {
  await server.close();
}

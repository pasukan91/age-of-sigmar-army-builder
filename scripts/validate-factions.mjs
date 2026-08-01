import { createServer } from "vite";
import { existsSync } from "node:fs";
import path from "node:path";

const intentionallyUnavailableRegimentOptions = new Set([
  "cities:freeguild-cavalier-marshal:any allies of the free cities",
  "cities:freeguild-marshal-and-relic-envoy:any allies of the free cities",
  "cities:fusil-major-on-ogor-warhulk:any allies of the free cities",
  "cities:cannonade-cogfort:any allies of the free cities",
  "cities:conqueror-cogfort:any allies of the free cities",
  "kruleboyz:hobgrot-slittaboss:monster",
  "ogors:butcher:any gnoblars",
]);

function regimentOptionLabel(option) {
  return String(option)
    .trim()
    .toLowerCase()
    .replace(/^\d+\s*[-–—]\s*\d+(?:\s+|-)\s*/, "");
}

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
  const {
    getAvailableRegimentLeaders,
    getAvailableUnitsForRegiment,
  } = await server.ssrLoadModule("/src/utils/regimentRules.js");

  const failures = factions.flatMap((faction) =>
    getFactionValidationErrors(faction).map((error) => `${faction.id}: ${error}`)
  );

  factions.forEach((faction) => {
    faction.units.forEach((unit) => {
      if (!unit.image?.startsWith("/images/")) {
        return;
      }

      const imagePath = path.join(process.cwd(), "public", unit.image.slice(1));
      if (!existsSync(imagePath)) {
        failures.push(`${faction.id}: missing image asset for ${unit.id}: ${unit.image}`);
      }
    });

    const list = { faction, regiments: [] };
    getAvailableRegimentLeaders(list).forEach((leader) => {
      const regiment = { id: `validation-${leader.id}`, hero: leader, units: [] };
      if (getAvailableUnitsForRegiment(list, regiment).length === 0) {
        failures.push(`${faction.id}: regiment leader has no available units: ${leader.id}`);
      }

      leader.details.regimentOptions.forEach((option) => {
        const optionLeader = {
          ...leader,
          details: { ...leader.details, regimentOptions: [option] },
        };
        const optionRegiment = { ...regiment, hero: optionLeader };
        const label = regimentOptionLabel(option);
        const optionKey = `${faction.id}:${leader.id}:${label}`;

        if (
          !intentionallyUnavailableRegimentOptions.has(optionKey) &&
          getAvailableUnitsForRegiment(list, optionRegiment).length === 0
        ) {
          failures.push(
            `${faction.id}: unresolved regiment option on ${leader.id}: ${option}`
          );
        }
      });
    });
  });

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

import { createServer } from "vite";

const server = await createServer({
  logLevel: "silent",
  server: { middlewareMode: true },
  appType: "custom",
});

try {
  const { default: factions } = await server.ssrLoadModule("/src/data/factions.js");
  const { default: regiments } = await server.ssrLoadModule("/src/data/regimentsOfRenown.js");
  const missions = await server.ssrLoadModule("/src/data/ghb2026.js");
  const universal = await server.ssrLoadModule("/src/data/universalRules.js");
  const issues = [];
  let collections = 0;
  let namedEntries = 0;
  const normalize = (value) => String(value).normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]/g, "");
  function visit(value, path) {
    if (Array.isArray(value)) {
      collections += 1;
      const ids = new Set();
      const names = new Set();
      value.forEach((item, index) => {
        if (item?.name) {
          namedEntries += 1;
          // A weapon can legitimately have separate ranged and melee profiles.
          const name = normalize(item.name) + (path.endsWith(".weapons") ? `:${item.type}` : "");
          if (names.has(name)) issues.push({ path, type: "duplicate-name", name: item.name });
          names.add(name);
        }
        if (item?.id) {
          if (ids.has(item.id)) issues.push({ path, type: "duplicate-id", id: item.id });
          ids.add(item.id);
        }
        visit(item, `${path}[${index}]`);
      });
    } else if (value && typeof value === "object") {
      if (value.sourcePublications?.length && value.sourcePublications.every((name) => /^Spearhead:/i.test(name))) {
        issues.push({ path, type: "spearhead-in-main-catalogue", name: value.name });
      }
      Object.entries(value).forEach(([key, item]) => visit(item, `${path}.${key}`));
    }
  }
  visit({ factions, regiments, missions, universal }, "catalogue");
  console.log(JSON.stringify({ factions: factions.length, collections, namedEntries, issues }, null, 2));
  if (issues.length) process.exitCode = 1;
} finally {
  await server.close();
}

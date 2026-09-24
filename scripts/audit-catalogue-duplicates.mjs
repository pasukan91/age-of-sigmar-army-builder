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
  function visit(value, path) {
    if (Array.isArray(value)) {
      collections += 1;
      const signatures = new Set();
      value.forEach((item, index) => {
        if (item?.name) {
          namedEntries += 1;
          const signature = JSON.stringify(item);
          if (signatures.has(signature)) {
            issues.push({ path, type: "duplicate-entry", name: item.name, id: item.id });
          }
          signatures.add(signature);
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

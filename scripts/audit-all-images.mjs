import { createServer } from "vite";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const server = await createServer({
  logLevel: "silent",
  server: { middlewareMode: true },
  appType: "custom",
});

function imageStatus(image) {
  if (!image) return "missing";
  if (/^https?:\/\//i.test(image)) return "remote";
  if (!image.startsWith("/images/")) return "invalid";
  return existsSync(path.join(process.cwd(), "public", image.slice(1)))
    ? "local"
    : "missing-file";
}

function collect(items, faction, kind, output) {
  for (const item of items ?? []) {
    const status = kind.endsWith("unit") && item?.image?.startsWith("/images/factions/")
      ? "generic-unit-image"
      : imageStatus(item?.image);
    if (status !== "local") {
      output.push({ faction, kind, id: item?.id, name: item?.name, image: item?.image ?? null, status });
    }
  }
}

try {
  const { default: factions } = await server.ssrLoadModule("/src/data/factions.js");
  const { default: regimentsOfRenown } = await server.ssrLoadModule(
    "/src/data/regimentsOfRenown.js"
  );
  const issues = [];

  // Inspect nested lore entries and army cards too, even in factions without units.
  function inspectNested(value, location) {
    if (Array.isArray(value)) return value.forEach((item, index) => inspectNested(item, `${location}[${index}]`));
    if (!value || typeof value !== "object") return;
    if (value.image || (value.name && value.profile)) {
      collect([value], location, "nested-reference", issues);
    }
    Object.entries(value).forEach(([key, item]) => inspectNested(item, `${location}.${key}`));
  }
  inspectNested(factions, "factions");
  inspectNested(regimentsOfRenown, "regiments");

  for (const faction of factions.filter((item) => item.units?.length > 0)) {
    const factionStatus = imageStatus(faction.image);
    if (factionStatus !== "local") {
      issues.push({ faction: faction.name, kind: "faction", id: faction.id, name: faction.name, image: faction.image ?? null, status: factionStatus });
    }
    collect(faction.units, faction.name, "unit", issues);
    collect(faction.terrain, faction.name, "terrain", issues);
    collect(faction.manifestations, faction.name, "manifestation", issues);
    for (const army of faction.armiesOfRenown ?? []) {
      collect(army.rules?.units, faction.name, `army:${army.name}:unit`, issues);
      collect(army.rules?.terrain, faction.name, `army:${army.name}:terrain`, issues);
      collect(army.rules?.manifestations, faction.name, `army:${army.name}:manifestation`, issues);
    }
  }
  collect(regimentsOfRenown, "Regiments of Renown", "regiment", issues);

  console.log(JSON.stringify({ total: issues.length, issues }, null, 2));
  if (issues.length) process.exitCode = 1;
  const manifestPath = process.argv[2];
  if (manifestPath) {
    const generated = JSON.parse(
      readFileSync("src/data/aosCommunityAllFactions.generated.json", "utf8")
    );
    const generatedRegiments = JSON.parse(
      readFileSync("src/data/regimentsOfRenown.generated.json", "utf8")
    );
    const sources = new Map();
    const visit = (value) => {
      if (Array.isArray(value)) return value.forEach(visit);
      if (!value || typeof value !== "object") return;
      if (/^https?:\/\//i.test(value.image ?? "")) {
        const key = value.image.split("/").at(-1);
        sources.set(key, value.image);
      }
      if (/^https?:\/\//i.test(value.imageSource ?? "")) {
        const key = value.imageSource.split("/").at(-1);
        sources.set(key, value.imageSource);
      }
      Object.values(value).forEach(visit);
    };
    visit(generated);
    visit(generatedRegiments);
    const downloads = [...new Map(issues.flatMap((issue) => {
      const match = String(issue.image ?? "").match(
        /^\/images\/catalogue\/([a-z0-9-]+)\.webp$/i
      );
      if (!match || !sources.has(match[1])) return [];
      return [[issue.image, {
        path: `public${issue.image}`,
        url: sources.get(match[1]),
      }]];
    })).values()];
    writeFileSync(manifestPath, `${JSON.stringify(downloads, null, 2)}\n`);
    console.log(`Manifest: ${downloads.length} images -> ${manifestPath}`);
  }
} finally {
  await server.close();
}

import { readFileSync, writeFileSync } from "node:fs";

const source = JSON.parse(readFileSync(process.argv[2] ?? "tmp/sigdex-api-main.json", "utf8"));
const previous = JSON.parse(readFileSync("src/data/regimentsOfRenown.generated.json", "utf8"));
const factionCatalogue = JSON.parse(readFileSync("src/data/sigdexAllFactions.generated.json", "utf8"));
const outputPath = process.argv[3] ?? "src/data/regimentsOfRenown.generated.json";
const imageByName = new Map(previous.regiments.map((item) => [item.name, item.image]));
const imageByUnitName = new Map(factionCatalogue.factions.flatMap((faction) =>
  faction.units.filter((unit) => unit.image).map((unit) => [unit.name, unit.image])
));

const IDS = new Map([
  ["Blades of Khorne", "khorne"], ["Cities of Sigmar", "cities"], ["Daughters of Khaine", "daughters"],
  ["Disciples of Tzeentch", "tzeentch"], ["Flesh-eater Courts", "flesheater"], ["Fyreslayers", "fyreslayers"],
  ["Gloomspite Gitz", "gloomspite"], ["Hedonites of Slaanesh", "hedonites"], ["Helsmiths of Hashut", "hashut"],
  ["Idoneth Deepkin", "idoneth"], ["Ironjawz", "ironjawz"], ["Kharadron Overlords", "kharadron"],
  ["Kruleboyz", "kruleboyz"], ["Lumineth Realm-lords", "lumineth"], ["Maggotkin of Nurgle", "nurgle"],
  ["Nighthaunt", "nighthaunt"], ["Ogor Mawtribes", "ogors"], ["Ossiarch Bonereapers", "ossiarch"],
  ["Seraphon", "seraphon"], ["Skaven", "skaven"], ["Slaves to Darkness", "std"], ["Sons of Behemat", "behemat"],
  ["Soulblight Gravelords", "soulblight"], ["Stormcast Eternals", "stormcast"], ["Sylvaneth", "sylvaneth"],
]);
const slug = (value = "") => String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[‘’‛`´]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const clean = (value) => String(value ?? "").replace(/\*\*\^\^|\^\^\*\*/g, "").trim();
const describe = (item) => [item.usedBy && `Used By: ${item.usedBy}`, item.declare && `Declare: ${item.declare}`, item.effect && `Effect: ${item.effect}`].filter(Boolean).join("\n\n") || item.lore || "";
const makeAbility = (item) => {
  const keywords = (item.keywords ?? []).map(clean);
  const spell = keywords.some((keyword) => keyword.toLowerCase() === "spell");
  const prayer = keywords.some((keyword) => keyword.toLowerCase() === "prayer");
  return {
    id: slug(item.name), sourceId: item.id, name: item.name, phase: item.timing || "Passive",
    type: spell ? "Spell" : prayer ? "Prayer" : "Ability", description: describe(item),
    declare: item.declare ?? null, effect: item.effect ?? null, lore: item.lore ?? null, keywords,
    castingValue: spell && Number.isFinite(Number(item.cost)) ? Number(item.cost) : null,
    chantingValue: prayer && Number.isFinite(Number(item.cost)) ? Number(item.cost) : null,
  };
};

const regiments = source.regimentsOfRenown.filter((item) => !item.legends).map((item) => {
  const units = item.units.map((entry) => ({
    id: slug(entry.unit.name), name: entry.unit.name, minCount: Number(entry.count ?? 1),
    maxCount: Number(entry.max ?? entry.count ?? 1), points: entry.points ?? null,
  }));
  const organisation = item.units.map((entry) => {
    const models = Number(entry.unit.battleProfile?.unit_size ?? entry.unit.models?.[0]?.min ?? 1) * Number(entry.count ?? 1);
    return `${models} ${entry.unit.name}`;
  });
  const abilities = item.upgrades.flatMap((upgrade) => upgrade.abilities ?? []).map(makeAbility);
  return {
    id: slug(item.name), sourceId: item.id, name: item.name, points: Number(item.points ?? 0),
    sourceFaction: IDS.get(item.sourceArmies?.[0]) ?? slug(item.sourceArmies?.[0]),
    eligibleFactionIds: (item.selectableIn ?? []).map((name) => IDS.get(name)).filter(Boolean),
    organisation, unitIds: [...new Set(units.map((unit) => unit.id))], units, abilities,
    lore: item.lore ?? item.publication?.title ?? "", rulesText: `Organisation:\n${organisation.map((line) => `• ${line}`).join("\n")}`,
    restrictionText: null,
    image: imageByName.get(item.name) ?? imageByUnitName.get(item.units[0]?.unit?.name) ?? null,
    catalogueSource: { id: item.id, dataVersion: source.version?.battleProfiles ?? source.version?.bsdata },
  };
});

writeFileSync(outputPath, `${JSON.stringify({
  metadata: { source: "https://sigdex.io/", generatedAt: new Date().toISOString(), serverVersion: source.version?.server, bsdataVersion: source.version?.bsdata },
  regiments,
}, null, 2)}\n`);
console.log(`Wrote ${outputPath}: ${regiments.length} regiments of renown`);

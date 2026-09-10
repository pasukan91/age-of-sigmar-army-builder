import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const [cataloguePath, outputPath] = process.argv.slice(2);
if (!cataloguePath || !outputPath) {
  throw new Error("Usage: node scripts/generate-regiments-of-renown-from-catalogue.mjs <catalogue.json> <output.json>");
}

const catalogue = JSON.parse(readFileSync(cataloguePath, "utf8"));
const data = catalogue.datasets;
const factionIds = new Map([
  ["Kruleboyz", "kruleboyz"], ["Ironjawz", "ironjawz"],
  ["Hedonites of Slaanesh", "hedonites"], ["Skaven", "skaven"],
  ["Ogor Mawtribes", "ogors"], ["Sylvaneth", "sylvaneth"],
  ["Gloomspite Gitz", "gloomspite"], ["Cities of Sigmar", "cities"],
  ["Disciples of Tzeentch", "tzeentch"], ["Ossiarch Bonereapers", "ossiarch"],
  ["Soulblight Gravelords", "soulblight"], ["Helsmiths of Hashut", "hashut"],
  ["Blades of Khorne", "khorne"], ["Slaves to Darkness", "std"],
  ["Maggotkin of Nurgle", "nurgle"], ["Lumineth Realm-lords", "lumineth"],
  ["Daughters of Khaine", "daughters"], ["Stormcast Eternals", "stormcast"],
  ["Idoneth Deepkin", "idoneth"], ["Kharadron Overlords", "kharadron"],
  ["Nighthaunt", "nighthaunt"], ["Flesh-eater Courts", "flesheater"],
  ["Seraphon", "seraphon"], ["Fyreslayers", "fyreslayers"],
  ["Sons of Behemat", "behemat"],
]);

const factionById = new Map(data.faction_keyword.map((item) => [item.id, item]));
const warscrollById = new Map(data.warscroll.map((item) => [item.id, item]));
const keywordById = new Map(data.keyword.map((item) => [item.id, item.name]));

function linked(rows, key, id) {
  return rows.filter((row) => row[key] === id);
}

function slug(value = "") {
  return String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[‘’‛`´]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function localImage(url) {
  const key = String(url ?? "").split("/").at(-1);
  return key && /^https?:\/\//i.test(url) ? `/images/catalogue/${key}.webp` : url;
}

function description(ability) {
  const sections = [];
  if (ability.usedBy) sections.push(`Used By: ${ability.usedBy}`);
  if (ability.declare) sections.push(`Declare: ${ability.declare}`);
  if (ability.effect) sections.push(`Effect: ${ability.effect}`);
  if (ability.additionalRulesText) sections.push(ability.additionalRulesText);
  return sections.join("\n\n") || ability.lore || "";
}

function organisation(text = "") {
  const section = String(text).split(/\*\*Organisation\*\*/i)[1] ?? "";
  return section.split("\n").map((line) => line.trim())
    .filter((line) => /^[•*-]\s+/.test(line))
    .map((line) => line.replace(/^[•*-]\s+/, ""));
}

const regiments = data.ability_group
  .filter((group) => group.abilityGroupType === "regimentOfRenown" && !group.isLegends)
  .map((group) => {
    const sourceImage = group.image ??
      warscrollById.get(group.regimentOfRenownRowImageWarscrollId)?.rowImage ??
      warscrollById.get(group.regimentOfRenownRowImageWarscrollId)?.bannerImage;
    const unitLinks = linked(
      data.ability_group_regiment_of_renown_linked_warscroll,
      "abilityGroupId",
      group.id
    );
    const abilities = linked(data.ability, "abilityGroupId", group.id)
      .sort((left, right) => (left.displayOrder ?? 0) - (right.displayOrder ?? 0))
      .map((ability) => ({
        id: slug(ability.name),
        sourceId: ability.id,
        name: ability.name,
        phase: ability.phaseDetails || "Passive",
        type: "Ability",
        description: description(ability),
        lore: ability.lore ?? null,
        commandPoints: ability.cpCost ?? null,
        keywords: linked(data.ability_keyword, "abilityId", ability.id)
          .sort((left, right) => (left.displayOrder ?? 0) - (right.displayOrder ?? 0))
          .map((item) => keywordById.get(item.keywordId)).filter(Boolean),
      }));
    const sourceFaction = factionIds.get(factionById.get(group.factionId)?.name) ?? null;
    const eligibleFactionIds = linked(
      data.ability_group_regiment_of_renown_permitted_faction_keyword,
      "abilityGroupId",
      group.id
    ).map((link) => factionIds.get(factionById.get(link.factionKeywordId)?.name))
      .filter(Boolean);
    return {
      id: slug(group.name),
      sourceId: group.id,
      name: group.name,
      points: group.regimentOfRenownPointsCost,
      sourceFaction,
      eligibleFactionIds: [...new Set(eligibleFactionIds)],
      organisation: organisation(group.subsectionRulesText),
      unitIds: unitLinks.map((link) => slug(warscrollById.get(link.warscrollId)?.name)).filter(Boolean),
      units: unitLinks.map((link) => ({
        id: slug(warscrollById.get(link.warscrollId)?.name),
        name: warscrollById.get(link.warscrollId)?.name,
        minCount: link.minCount,
        maxCount: link.maxCount,
        points: link.warscrollCost,
      })),
      abilities,
      lore: group.subsectionLore ?? null,
      rulesText: group.subsectionRulesText ?? null,
      restrictionText: group.restrictionText ?? null,
      image: localImage(sourceImage),
      imageSource: sourceImage,
      catalogueSource: { id: group.id, dataVersion: catalogue.dataVersion },
    };
  });

const output = {
  metadata: { source: catalogue.source, dataVersion: catalogue.dataVersion, generatedAt: new Date().toISOString() },
  regiments,
};
mkdirSync(dirname(resolve(outputPath)), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify({ regiments: regiments.length, withImages: regiments.filter((item) => item.image).length }, null, 2));

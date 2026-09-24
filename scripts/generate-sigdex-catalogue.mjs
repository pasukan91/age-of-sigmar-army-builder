import { existsSync, readFileSync, writeFileSync } from "node:fs";

const [sourcePath = "tmp/sigdex-api-main.json", outputPath = "src/data/sigdexAllFactions.generated.json"] = process.argv.slice(2);
const source = JSON.parse(readFileSync(sourcePath, "utf8"));
const previous = JSON.parse(readFileSync("src/data/aosCommunityAllFactions.generated.json", "utf8"));

const TARGETS = [
  ["Blades of Khorne", "khorne"], ["Cities of Sigmar", "cities"], ["Daughters of Khaine", "daughters"],
  ["Disciples of Tzeentch", "tzeentch"], ["Flesh-eater Courts", "flesheater"], ["Fyreslayers", "fyreslayers"],
  ["Gloomspite Gitz", "gloomspite"], ["Hedonites of Slaanesh", "hedonites"], ["Helsmiths of Hashut", "hashut"],
  ["Idoneth Deepkin", "idoneth"], ["Ironjawz", "ironjawz"], ["Kharadron Overlords", "kharadron"],
  ["Kruleboyz", "kruleboyz"], ["Lumineth Realm-lords", "lumineth"], ["Maggotkin of Nurgle", "nurgle"],
  ["Nighthaunt", "nighthaunt"], ["Ogor Mawtribes", "ogors"], ["Ossiarch Bonereapers", "ossiarch"],
  ["Seraphon", "seraphon"], ["Skaven", "skaven"], ["Slaves to Darkness", "std"],
  ["Sons of Behemat", "behemat"], ["Soulblight Gravelords", "soulblight"], ["Stormcast Eternals", "stormcast"],
  ["Sylvaneth", "sylvaneth"],
];
const idByName = new Map(TARGETS);
const previousByName = new Map(previous.factions.map((faction) => [faction.name, faction]));
const FACTION_FALLBACKS = {
  kruleboyz: "/images/factions/kruleboyz.webp", ironjawz: "/images/factions/ironjawz.webp",
  hedonites: "/images/factions/hedonites.webp", skaven: "/images/factions/skaven.webp",
  ogors: "/images/factions/ogormawtribes.webp", sylvaneth: "/images/factions/sylvaneth.webp",
  gloomspite: "/images/factions/gloomspite.webp", cities: "/images/factions/citiesofsigmar.webp",
  tzeentch: "/images/factions/disciples.webp", ossiarch: "/images/factions/ossiarchs.webp",
  soulblight: "/images/factions/soulblight.webp", hashut: "/images/factions/hashut.webp",
  khorne: "/images/factions/blades.webp", std: "/images/factions/slaves.webp",
  nurgle: "/images/factions/maggotkin.webp", lumineth: "/images/factions/lumineth.webp",
  daughters: "/images/factions/dok.webp", stormcast: "/images/factions/stormcast.webp",
  idoneth: "/images/factions/Idoneth.webp", kharadron: "/images/factions/kharadron.webp",
  nighthaunt: "/images/factions/nighthaunt.webp", flesheater: "/images/factions/flesheater.webp",
  seraphon: "/images/alliances/order.webp", fyreslayers: "/images/alliances/order.webp",
  behemat: "/images/alliances/destruction.webp",
};

const slug = (value = "") => String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  .replace(/[‘’‛`´]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const cleanKeyword = (value) => String(value ?? "").replace(/\*\*\^\^|\^\^\*\*/g, "").trim();
const uniqueBy = (items, key) => [...new Map(items.map((item) => [key(item), item])).values()];
const isAqshy = (value) => /aqshy/i.test(String(value ?? ""));
const isCurrent = (value) => !/ghyran/i.test(String(value?.scourge ?? ""));
const displayUnitName = (value = "") => String(value).replace(
  /^(.*) \(Scourge of Aqshy\)$/i,
  "Scourge of Aqshy: $1",
);
const globalImageByUnitName = new Map(previous.factions.flatMap((faction) =>
  (faction.units ?? []).flatMap((item) => {
    const image = localImage(item.image);
    return image ? [[slug(item.name), image]] : [];
  })
));
const IMAGE_NAME_ALIASES = {
  "legion-of-the-first-prince-beasts-of-nurgle": "beast-of-nurgle",
  "legion-of-the-first-prince-hellflayer": "hellflayer",
  "legion-of-the-first-prince-plaguebearers": "plaguebearers",
};

function description(item) {
  return [item.usedBy && `Used By: ${item.usedBy}`, item.declare && `Declare: ${item.declare}`, item.effect && `Effect: ${item.effect}`]
    .filter(Boolean).join("\n\n") || item.lore || "";
}

function ability(item) {
  const keywords = (item.keywords ?? []).map(cleanKeyword).filter(Boolean);
  const spell = keywords.some((keyword) => keyword.toLowerCase() === "spell");
  const prayer = keywords.some((keyword) => keyword.toLowerCase() === "prayer");
  return {
    id: slug(item.name), sourceId: item.id, name: item.name, phase: item.timing || "Passive",
    type: spell ? "Spell" : prayer ? "Prayer" : "Ability", description: description(item),
    declare: item.declare ?? null, effect: item.effect ?? null, usedBy: item.usedBy ?? null,
    keywords, castingValue: spell ? numberOrNull(item.cost) : null,
    chantingValue: prayer ? numberOrNull(item.cost) : null, commandPoints: numberOrNull(item.cost),
  };
}

function numberOrNull(value) {
  return value !== null && value !== "" && Number.isFinite(Number(value)) ? Number(value) : null;
}

function weaponProfiles(unit) {
  const result = [];
  for (const model of unit.models ?? []) {
    for (const section of ["basic", "advanced", "selected"]) {
      for (const choice of Object.values(model.weapons?.[section] ?? {})) {
        for (const profile of choice.weapons ?? []) {
          result.push({
            id: profile.id, name: profile.name, type: Number(profile.type) === 1 ? "Ranged" : "Melee",
            ...(profile.range ? { range: profile.range } : {}), attacks: profile.attack, hit: profile.hit,
            wound: profile.wound, rend: profile.rend, damage: profile.damage, abilities: profile.abilities ?? [],
          });
        }
      }
    }
  }
  return uniqueBy(result, (item) => item.id ?? JSON.stringify(item));
}

function regimentOptionText(option) {
  const names = option.unit_names ?? [];
  if (names.length) return names.join(" or ");
  const keywords = option.keywords ?? [];
  const roles = option.subhero_categories ?? [];
  if (roles.length && !keywords.length) return roles.join(" or ");
  if (keywords.length) return `Any ${keywords.join(" ")}`;
  return "Any unit";
}

function unit(item, factionId, imageIndex = new Map(), fallbackImage = `/images/factions/${factionId}.webp`) {
  const name = displayUnitName(item.name);
  const imageKey = slug(name);
  const image = imageIndex.get(imageKey) ?? imageIndex.get(IMAGE_NAME_ALIASES[imageKey]);
  const keywords = (item.keywords ?? []).map(cleanKeyword);
  const profile = item.battleProfile ?? {};
  const models = numberOrNull(profile.unit_size) ?? ((item.models ?? []).reduce((total, model) => total + Number(model.min ?? 0), 0) || 1);
  const regimentRules = profile.regiment_options ?? [];
  return {
    id: slug(name), sourceId: item.id, name,
    image: image ?? fallbackImage, points: Number(item.points ?? profile.points ?? 0),
    profile: { move: item.move, health: numberOrNull(item.health) ?? item.health, control: item.control, save: item.save, ward: item.ward, banishment: item.banishment },
    weapons: weaponProfiles(item), abilities: (item.abilities ?? []).map(ability), keywords,
    details: {
      models, baseSize: profile.base_size ?? item.models?.[0]?.baseSize ?? null,
      regimentOptions: regimentRules.map((rule) => ({
        ...rule,
        label: regimentOptionText(rule),
      })),
      regimentOptionRules: regimentRules,
      canJoinRegimentAs: profile.subhero_categories ?? [], notes: profile.notes ?? [],
      requiredLeader: profile.requiredLeader || null, undersizeCondition: profile.undersizeCondition || null,
      retiringOn: profile.retiringOn || null, exclusiveWith: profile.exclusiveWith || null,
      armyOfRenown: profile.armyOfRenown || null, optionSets: item.optionSets ?? [], prices: profile.prices ?? null,
    },
    rules: {
      hero: profile.hero === true || keywords.some((keyword) => keyword.toLowerCase() === "hero"),
      unique: keywords.some((keyword) => keyword.toLowerCase() === "unique"),
      monster: keywords.some((keyword) => keyword.toLowerCase() === "monster"),
      wizard: keywordLevel(keywords, "wizard"), priest: keywordLevel(keywords, "priest"), ward: item.ward,
      warmaster: item.isWarmaster === true, canBeReinforced: item.canBeReinforced === true && profile.reinforceable !== false,
      canLeadRegiment: regimentRules.length > 0,
    },
    lore: item.lore ?? null,
    catalogueSource: { id: item.id, dataVersion: source.version?.battleProfiles ?? source.version?.bsdata ?? null },
  };
}

function keywordLevel(keywords, name) {
  const match = keywords.find((keyword) => keyword.toLowerCase().startsWith(`${name} (`))?.match(/\((\d+)\)/);
  return Number(match?.[1] ?? 0);
}

function upgrade(item, group, scourge, restrictionText) {
  const abilities = (item.abilities ?? []).map(ability);
  const restriction = String(restrictionText ?? "");
  const eligibility = restriction.match(/given to\s+(.+?)[.!]/i)?.[1]
    ?? restriction.match(/^(.+?)\s+units?\s+only[.!]/i)?.[1]
    ?? "";
  const tokens = [...eligibility.matchAll(/((?:non-)?)\*\*\^\^([^\^]+)\^\^\*\*/gi)]
    .map((match) => ({ excluded: Boolean(match[1]), value: cleanKeyword(match[2]) }))
    .filter((token) => token.value);
  return {
    id: slug(item.name), sourceId: item.id, name: item.name, points: Number(item.points ?? 0),
    description: abilities.map((entry) => entry.description).filter(Boolean).join("\n\n"), abilities,
    groupName: group, restrictionText: restriction, source: isAqshy(scourge) ? "Aqshy" : "Battletome",
    requiredKeywords: tokens.filter((token) => !token.excluded).map((token) => token.value),
    excludedKeywords: tokens.filter((token) => token.excluded).map((token) => token.value),
  };
}

function upgradesFor(army, category) {
  return Object.entries(army.upgrades?.enhancements ?? {}).flatMap(([group, collections]) => {
    if (category === "heroic" && group !== "Heroic Traits") return [];
    if (category === "artefact" && group !== "Artefacts of Power") return [];
    if (category === "other" && ["Heroic Traits", "Artefacts of Power"].includes(group)) return [];
    return collections.filter(isCurrent).flatMap((collection) => collection.upgrades.map((item) => upgrade(item, collection.name || group, collection.scourge, collection.restrictionText)));
  });
}

function ruleItems(groups) {
  return (groups ?? []).filter(isCurrent).flatMap((group) => (group.abilities ?? []).map((item) => ({ ...ability(item), groupName: group.name })));
}

function formations(groups) {
  return (groups ?? []).filter(isCurrent).map((group) => {
    const abilities = (group.abilities ?? []).map(ability);
    return { id: slug(group.name), sourceId: group.id, name: group.name, points: Number(group.points ?? 0), description: abilities.map((item) => item.description).join("\n\n"), abilities };
  });
}

function lores(army, kind, factionId, imageIndex, fallbackImage) {
  return (army.upgrades?.lores?.[kind] ?? []).filter(isCurrent).map((lore) => ({
    id: slug(lore.name), sourceId: lore.id, name: lore.name, points: Number(lore.points ?? 0), source: isAqshy(lore.scourge) ? "Aqshy" : "Battletome",
    ...(kind === "spell" ? { spells: (lore.abilities ?? []).map(ability) } : {}),
    ...(kind === "prayer" ? { prayers: (lore.abilities ?? []).map(ability) } : {}),
    ...(kind === "manifestation" ? { manifestations: (lore.units ?? []).map((item, index) => {
      const manifestation = unit(item, factionId, imageIndex, fallbackImage);
      const summonSpell = lore.abilities?.[index] ? ability(lore.abilities[index]) : null;
      return summonSpell ? {
        ...manifestation,
        castingValue: summonSpell.castingValue ?? summonSpell.chantingValue,
        summonSpell: { ...summonSpell, keywords: [...new Set([...summonSpell.keywords, "Summon"])] },
      } : manifestation;
    }) } : {}),
  }));
}

function factionFromArmy(army, id, { nested = false } = {}) {
  const old = previousByName.get(army.name);
  const imageIndex = new Map(globalImageByUnitName);
  (old?.units ?? []).forEach((item) => {
    const image = localImage(item.image);
    if (image) imageIndex.set(slug(item.name), image);
  });
  const fallbackImage = localImage(old?.image) ?? FACTION_FALLBACKS[id];
  const convertedUnits = uniqueBy(
    (army.units ?? []).filter((item) => !item.legends && isCurrentUnit(item)),
    (item) => item.id ?? `${item.name}:${JSON.stringify(item.battleProfile ?? {})}`,
  );
  const manifestationLores = lores(army, "manifestation", id, imageIndex, fallbackImage);
  const summonsByName = new Map(manifestationLores.flatMap((lore) => lore.manifestations.map((item) => [item.name, item])));
  const manifestations = convertedUnits.filter((item) => hasKeyword(item, "manifestation")).map((item) => {
    const converted = unit(item, id, imageIndex, fallbackImage);
    const loreManifestation = summonsByName.get(converted.name);
    return loreManifestation
      ? { ...converted, ...loreManifestation }
      : {
          ...converted,
          details: {
            ...converted.details,
            standaloneManifestation: true,
          },
        };
  });
  const terrain = convertedUnits.filter((item) => hasKeyword(item, "faction terrain")).map((item) => unit(item, id, imageIndex, fallbackImage));
  const units = convertedUnits.filter((item) => !hasKeyword(item, "manifestation") && !hasKeyword(item, "faction terrain")).map((item) => unit(item, id, imageIndex, fallbackImage));
  const heroic = upgradesFor(army, "heroic");
  const artefacts = upgradesFor(army, "artefact");
  const other = upgradesFor(army, "other");
  const result = {
    id, alliance: String(army.alliance ?? old?.alliance ?? "").toLowerCase(), name: army.name,
    image: fallbackImage, sourcePublication: army.publication?.name ?? army.publication?.title,
    battleTraits: ruleItems(army.upgrades?.battleTraits), battleFormations: formations(army.upgrades?.battleFormations),
    heroicTraits: heroic.filter((item) => item.source !== "Aqshy"),
    artefacts: artefacts.filter((item) => item.source !== "Aqshy"),
    aqshyHeroicTraits: heroic.filter((item) => item.source === "Aqshy"),
    aqshyArtefacts: artefacts.filter((item) => item.source === "Aqshy"), aqshyEnhancements: other,
    spellLores: lores(army, "spell", id, imageIndex, fallbackImage),
    prayerLores: lores(army, "prayer", id, imageIndex, fallbackImage), manifestations,
    manifestationLores, terrain, units,
    armiesOfRenown: [], catalogueDataVersion: source.version?.battleProfiles ?? source.version?.bsdata ?? "sigdex",
    sigdexSource: { armyId: army.id, revision: army.revision, bsdata: source.version?.bsdata, battleProfiles: source.version?.battleProfiles },
  };
  if (nested) delete result.armiesOfRenown;
  return result;
}

function imageExists(image) {
  return String(image ?? "").startsWith("/images/") && existsSync(`public${image}`);
}

function localImage(image) {
  if (imageExists(image)) return image;
  const match = String(image ?? "").match(/^https:\/\/dhss9aar8ocw\.cloudfront\.net\/([a-z0-9-]+)/i);
  if (!match) return null;
  const local = `/images/catalogue/${match[1]}.webp`;
  return imageExists(local) ? local : null;
}

function hasKeyword(item, expected) {
  return (item.keywords ?? []).some((keyword) => cleanKeyword(keyword).toLowerCase() === expected);
}

function isCurrentUnit(item) {
  const name = String(item.name ?? "");
  return !/Scourge of Ghyran/i.test(name);
}

const factions = TARGETS.map(([name, id]) => {
  const army = source.armies[name];
  if (!army) throw new Error(`Missing SigDex army: ${name}`);
  const faction = factionFromArmy(army, id);
  const prefix = `${name} - `;
  faction.armiesOfRenown = Object.values(source.armies)
    .filter((candidate) => candidate.isArmyOfRenown && !candidate.legends && candidate.name.startsWith(prefix))
    .map((candidate) => ({ id: slug(candidate.name.slice(prefix.length)), name: candidate.name.slice(prefix.length), rules: factionFromArmy(candidate, id, { nested: true }) }));
  return faction;
});

const output = {
  metadata: {
    source: "https://sigdex.io/", api: "https://api.sigdex.io/blob?name=main", generatedAt: new Date().toISOString(),
    serverVersion: source.version?.server, bsdataVersion: source.version?.bsdata, battleProfilesVersion: source.version?.battleProfiles,
  },
  factions,
};
writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(`Wrote ${outputPath}: ${factions.length} factions, ${factions.reduce((sum, faction) => sum + faction.units.length, 0)} units`);

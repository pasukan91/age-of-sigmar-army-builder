import catalogue from "./additionalBattletomeFactions.generated.json";
import additionalUnitImages from "./additionalUnitImages.generated.json";

const CURATED_LOCAL_IMAGES = {
  stormcast: {
    faction: "/images/factions/stormcast.webp",
    terrain: {
      "stormreach-portal": "stormreach-portal.webp",
    },
  },
  idoneth: {
    faction: "/images/factions/Idoneth.webp",
    terrain: {
      "gloomtide-shipwreck": "gloomtide-shipwreck.webp",
    },
    units: {
      "akhelian-allopex": "akhelian_allopex.jpg",
      "akhelian-ishlaen-guard": "akhelian_ishlaen_guard.jpg",
      "akhelian-king": "akhelian_king.jpg",
      "akhelian-leviadon": "akhelian_leviadon.jpg",
      "akhelian-morrsarr-guard": "akhelian_morrsarr_guard.jpg",
      "akhelian-thrallmaster": "akhelian_thrallmaster.jpg",
      "eidolon-of-mathlann-aspect-of-the-sea": "eidolon-sea.jpg",
      "eidolon-of-mathlann-aspect-of-the-storm": "eidolon-storm.jpg",
      "gloomtide-shipwreck": "gloomtide_shipwreck.jpg",
      "ikon-of-the-sea": "ikon-sea.jpg",
      "ikon-of-the-storm": "ikon_storm.jpg",
      "incarnate-of-the-deep": "incarnate_of_the_abyss.jpg",
      "isharann-soulrender": "isharann_soulrender.jpg",
      "isharann-soulscryer": "isharann_soulscryer.jpg",
      "isharann-tidecaster": "isharann_tidecaster.jpg",
      "lotann-warden-of-the-soul-ledgers": "lotann.jpg",
      "mathaela-oracle-of-the-abyss": "mathaela.jpg",
      "namarti-reavers": "namarti_reavers.jpg",
      "namarti-thralls": "namarti_thralls.jpg",
      "volturnos-high-king-of-the-deep": "volturnos.jpg",
    },
  },
  kharadron: {
    faction: "/images/factions/kharadron.webp",
    terrain: {
      "zontari-endrin-dock": "zontari-endrin-dock.webp",
    },
    units: {
      "aetheric-navigator": "Navigator.jpg",
      "arkanaut-admiral": "ArkanautAdmiral.jpg",
      "arkanaut-company": "arkanaut_company.jpg",
      "arkanaut-frigate": "arkanaut_frigate.jpg",
      "arkanaut-ironclad": "arkanaut_ironclad.jpg",
      "brokk-grungsson-lord-magnate-of-barak-nar": "brokk.jpg",
      codewright: "Codewright.jpg",
      "drekki-flynt": "drekki.jpg",
      "endrinmaster-with-dirigible-suit": "EndrinmasterDirigibleSuitLead.jpg",
      "endrinmaster-with-endrinharness": "Endrinmaster_with_endrinharness.jpg",
      endrinriggers: "endrinriggers.jpg",
      "grundstok-gunhauler": "GrundstokGunhauler.jpg",
      "grundstok-thunderers": "grundstok_thunderers.jpg",
      "null-khemist": "NullKhemist.jpg",
      skywardens: "skywardens.jpg",
      "vongrim-harpoon-crew": "vongrim_harpoon_crew.jpg",
      "zontari-endrin-dock": "zontari_endrin_dock.jpg",
    },
  },
  nighthaunt: {
    faction: "/images/factions/nighthaunt.webp",
    terrain: {
      "nexus-of-grief": "nexus-of-grief.webp",
    },
  },
  flesheater: {
    faction: "/images/factions/flesheater.webp",
    terrain: {
      "charnel-throne": "charnel-throne.webp",
    },
  },
};

const LOCAL_IMAGES = Object.fromEntries(
  [...new Set([
    ...Object.keys(additionalUnitImages),
    ...Object.keys(CURATED_LOCAL_IMAGES),
  ])].map((factionId) => [factionId, {
    ...(CURATED_LOCAL_IMAGES[factionId] ?? {}),
    units: {
      ...(additionalUnitImages[factionId] ?? {}),
      ...(CURATED_LOCAL_IMAGES[factionId]?.units ?? {}),
    },
    terrain: CURATED_LOCAL_IMAGES[factionId]?.terrain ?? {},
  }])
);

function withLocalImages(items, factionId, imageMap) {
  return (items ?? []).map((item) => ({
    ...item,
    image: imageMap[item.id]
      ? `/images/units/${factionId}/${imageMap[item.id]}`
      : item.image,
  }));
}

function withLocalTerrainImages(items, factionId, imageMap) {
  return (items ?? []).map((item) => ({
    ...item,
    image: imageMap[item.id]
      ? `/images/terrain/${factionId}/${imageMap[item.id]}`
      : item.image,
  }));
}

function withLocalManifestationImages(items) {
  return (items ?? []).map((item) => ({
    ...item,
    image: /^https?:\/\//i.test(item.image ?? "")
      ? `/images/manifestations/catalogue/${item.id}.webp`
      : item.image,
  }));
}

function withLocalManifestationLoreImages(lores) {
  return (lores ?? []).map((lore) => ({
    ...lore,
    manifestations: withLocalManifestationImages(lore.manifestations),
  }));
}

function applyLocalImages(faction) {
  const local = LOCAL_IMAGES[faction.id];
  if (!local) return faction;
  const updateRules = (rules = {}) => ({
    ...rules,
    units: withLocalImages(rules.units, faction.id, local.units),
    manifestations: withLocalManifestationImages(
      withLocalImages(rules.manifestations, faction.id, local.units)
    ),
    manifestationLores: withLocalManifestationLoreImages(rules.manifestationLores),
    terrain: withLocalTerrainImages(rules.terrain, faction.id, local.terrain),
  });
  return {
    ...faction,
    image: local.faction,
    units: withLocalImages(faction.units, faction.id, local.units),
    manifestations: withLocalManifestationImages(
      withLocalImages(faction.manifestations, faction.id, local.units)
    ),
    manifestationLores: withLocalManifestationLoreImages(faction.manifestationLores),
    terrain: withLocalTerrainImages(faction.terrain, faction.id, local.terrain),
    armiesOfRenown: (faction.armiesOfRenown ?? []).map((army) => ({
      ...army,
      rules: updateRules(army.rules),
    })),
  };
}

const hydratedFactions = catalogue.factions.map((faction) =>
  applyLocalImages({
    ...faction,
    manifestations: withLocalManifestationImages(faction.manifestations),
    manifestationLores: withLocalManifestationLoreImages(faction.manifestationLores),
    armiesOfRenown: (faction.armiesOfRenown ?? []).map((army) => ({
      ...army,
      rules: army.rules
        ? {
            ...army.rules,
            manifestations: withLocalManifestationImages(army.rules.manifestations),
            manifestationLores: withLocalManifestationLoreImages(
              army.rules.manifestationLores
            ),
          }
        : army.rules,
    })),
  })
);
const factions = Object.fromEntries(
  hydratedFactions.map((faction) => [faction.id, faction])
);

export const universalManifestations = withLocalManifestationImages(
  catalogue.universalManifestations
);
export const universalManifestationLores = withLocalManifestationLoreImages(
  catalogue.universalManifestationLores
);
export const stormcast = factions.stormcast;
export const idoneth = factions.idoneth;
export const kharadron = factions.kharadron;
export const nighthaunt = factions.nighthaunt;
export const flesheater = factions.flesheater;

export default hydratedFactions;

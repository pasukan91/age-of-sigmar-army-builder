import catalogue from "./additionalBattletomeFactions.generated.json";

const LOCAL_IMAGES = {
  idoneth: {
    faction: "/images/factions/Idoneth.webp",
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
};

function withLocalImages(items, factionId, imageMap) {
  return (items ?? []).map((item) => ({
    ...item,
    image: imageMap[item.id]
      ? `/images/units/${factionId}/${imageMap[item.id]}`
      : item.image,
  }));
}

function applyLocalImages(faction) {
  const local = LOCAL_IMAGES[faction.id];
  if (!local) return faction;
  const updateRules = (rules = {}) => ({
    ...rules,
    units: withLocalImages(rules.units, faction.id, local.units),
    manifestations: withLocalImages(rules.manifestations, faction.id, local.units),
    terrain: withLocalImages(rules.terrain, faction.id, local.units),
  });
  return {
    ...faction,
    image: local.faction,
    units: withLocalImages(faction.units, faction.id, local.units),
    manifestations: withLocalImages(faction.manifestations, faction.id, local.units),
    terrain: withLocalImages(faction.terrain, faction.id, local.units),
    armiesOfRenown: (faction.armiesOfRenown ?? []).map((army) => ({
      ...army,
      rules: updateRules(army.rules),
    })),
  };
}

const hydratedFactions = catalogue.factions.map(applyLocalImages);
const factions = Object.fromEntries(
  hydratedFactions.map((faction) => [faction.id, faction])
);

export const universalManifestations = catalogue.universalManifestations ?? [];
export const universalManifestationLores = catalogue.universalManifestationLores ?? [];
export const stormcast = factions.stormcast;
export const idoneth = factions.idoneth;
export const kharadron = factions.kharadron;
export const nighthaunt = factions.nighthaunt;
export const flesheater = factions.flesheater;

export default hydratedFactions;

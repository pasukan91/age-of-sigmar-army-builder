const HEDONITES_UNIT_IDS = new Set([
  "shalaxi-helbane",
  "keeper-of-secrets",
  "dexcessa-the-talon-of-slaanesh",
  "synessa-the-voice-of-slaanesh",
  "the-masque",
  "syllesske-the-vengeful-alliance",
  "thricefold-discord",
  "infernal-enrapturess",
  "contorted-epitome",
  "glutos-orscollion",
  "sigvald-prince-of-slaanesh",
  "lord-of-hysteria",
  "slaangor-fiendbloods",
  "myrmidesh-painbringers",
  "symbaresh-twinsouls",
  "slickblade-seekers",
  "blissbarb-archers",
  "daemonettes",
  "seekers",
  "fiends",
  "shardspeaker-of-slaanesh",
  "lord-of-pain",
  "lord-of-hubris",
  "blissbarb-seekers",
]);

const IMAGE_ALIASES = {
  "infernal-enrapturess-scourge-of-aqshy": "infernal-enrapturess",
  "blissbarb-seekers-scourge-of-aqshy": "blissbarb-seekers",
};

function UnitArtwork({ unit, className = "", variant = "card" }) {
  const artworkId = IMAGE_ALIASES[unit?.id] ?? unit?.imageAlias ?? unit?.id;
  const keywords = (unit?.keywords ?? []).map((keyword) =>
    String(keyword).trim().toLowerCase()
  );
  const explicitSource = String(unit?.image ?? "").startsWith("/")
    ? unit.image
    : null;
  const hasOfficialImage = Boolean(explicitSource) || HEDONITES_UNIT_IDS.has(artworkId);
  const fallbackSource = keywords.includes("ironjawz")
    ? "/images/factions/ironjawz.webp"
    : keywords.includes("hedonites of slaanesh")
      ? "/images/factions/hedonites.webp"
      : keywords.includes("skaven")
        ? "/images/factions/skaven.webp"
        : "/images/factions/kruleboyz.webp";
  const source = explicitSource ?? (hasOfficialImage
    ? `/images/units/hedonitas/${artworkId}.webp`
    : fallbackSource);
  const classes = [
    "aos-unit-artwork",
    `aos-unit-artwork--${variant}`,
    !hasOfficialImage ? "aos-unit-artwork--fallback" : "",
    className,
  ].filter(Boolean).join(" ");

  return (
    <img
      className={classes}
      src={source}
      alt={hasOfficialImage
        ? `${unit.name}, miniatura oficial de Warhammer`
        : `Imagen genérica de ${unit?.name ?? "unidad"}`}
      loading={variant === "warscroll" ? "eager" : "lazy"}
      decoding="async"
      onError={(event) => {
        if (!event.currentTarget.src.endsWith(fallbackSource)) {
          event.currentTarget.src = fallbackSource;
          event.currentTarget.classList.add("aos-unit-artwork--fallback");
        }
      }}
    />
  );
}

export default UnitArtwork;

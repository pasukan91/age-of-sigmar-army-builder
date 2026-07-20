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

function UnitArtwork({ unit, className = "", variant = "card" }) {
  const hasOfficialImage = HEDONITES_UNIT_IDS.has(unit?.id);
  const source = hasOfficialImage
    ? `/images/units/${unit.id}.webp`
    : "/images/factions/kruleboyz.webp";
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
    />
  );
}

export default UnitArtwork;

export const FACTION_MECHANIC_ILLUSTRATIONS = Object.freeze({
  "the-faces-of-the-bad-moon": {
    src: "/images/rule-illustrations/gloomspite-bad-moon.webp",
    caption: "Las cuatro caras de la Bad Moon",
    alt: "Diagrama circular con las cuatro caras de la Bad Moon en orden: Grinnin’, Scowlin’, Sulkin’ y Cacklin’. Entre Grinnin’ y Scowlin’ aparece Troggoth; entre Scowlin’ y Sulkin’, Squig; entre Sulkin’ y Cacklin’, Gitmob; y entre Cacklin’ y Grinnin’, non-Squig Moonclan y Spiderfang.",
    sourceName: "Gloomspite Gitz Battle Traits",
  },
  "blood-for-the-blood-god": {
    src: "/images/rule-illustrations/khorne-blood-tithe.webp",
    caption: "Árbol de desbloqueo del Blood Tithe",
    alt: "Árbol de ocho habilidades de Blood Tithe. Murderlust comienza desbloqueada. Después se pueden desbloquear Divine Scorn o Punish the Pacifist; estas dan acceso a Murder the Mystic, Glorious Combat or Naught y Revel in Battle; la última fila contiene Slaughter Triumphant y Cleave Wide the Grin of Khorne.",
    sourceName: "Blades of Khorne Battle Traits",
  },
  "dirty-tricks": {
    src: "/images/rule-illustrations/kruleboyz-dirty-tricks.webp",
    caption: "Dificultad acumulativa de Dirty Tricks",
    alt: "Tabla de tiradas de Dirty Trick: la primera necesita 2+, la segunda 3+, la tercera 4+ y la cuarta o posteriores 5+.",
    sourceName: "Dirty Tricks",
  },
  "depict-rune": {
    src: "/images/rule-illustrations/lumineth-battle-scripture.webp",
    caption: "Runas de la Battle Scripture",
    alt: "Cuatro glifos de runa Lumineth dispuestos en una cuadrícula de dos por dos.",
    sourceName: "Depict Rune",
  },
});

export function getFactionMechanicIllustration(ability) {
  const key = String(ability?.id ?? "").trim().toLowerCase();
  return FACTION_MECHANIC_ILLUSTRATIONS[key] ?? null;
}


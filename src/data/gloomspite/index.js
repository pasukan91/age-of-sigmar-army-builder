import { kragnos as sharedKragnos } from "../orrukWarclans/shared";
import armiesOfRenown from "./armiesOfRenown";
import scourgeUnits from "./scourgeOfAqshy";
import units from "./units";
import {
  artefacts,
  battleFormations,
  battleTraits,
  heroicTraits,
  manifestationLores,
  manifestations,
  specialKnickKnacks,
  spellLores,
  terrain,
} from "./rules";

const kragnos = {
  ...sharedKragnos,
  image: "/images/units/kruleboyz/kragnos.jpg",
  details: {
    ...sharedKragnos.details,
    regimentOptions: ["0-1 Top Dog", "0-1 Moonclan Agitator", "Any Gloomspite Gitz"],
  },
  keywords: ["Warmaster", "Unique", "Hero", "Monster", "Ward (5+)", "Destruction", "Gloomspite Gitz"],
};

const gloomspite = {
  id: "gloomspite",
  alliance: "destruction",
  name: "Gloomspite Gitz",
  image: "/images/factions/gloomspite.webp",
  battleTraits,
  battleFormations,
  heroicTraits,
  monsterTraits: [],
  artefacts,
  aqshyArtefacts: [],
  specialKnickKnacks,
  spellLores,
  prayerLores: [],
  manifestations,
  manifestationLores,
  terrain,
  units: [kragnos, ...units, ...scourgeUnits],
  armiesOfRenown,
  regimentsOfRenown: [],
};

export default gloomspite;

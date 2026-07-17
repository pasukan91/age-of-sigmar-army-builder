import BuilderHeader from "../components/ArmyBuilder/BuilderHeader";
import BuilderOption from "../components/ArmyBuilder/BuilderOption";
import RegimentSection from "../components/ArmyBuilder/RegimentSection";
import EmptyState from "../components/ArmyBuilder/EmptyState";

import { useArmy } from "../context/ArmyContext";

function ArmyBuilder() {

  const {
    currentList,
    setCurrentList,
    setSelector,
    setPage,
  } = useArmy();

  return (
    <div>

      <BuilderHeader list={currentList} />

      <BuilderOption
        title="Battle Formation"
        value={currentList.battleFormation?.name}
        onClick={() => {
          setSelector({
            title: "Battle Formation",
            property: "battleFormation",
            options: currentList.faction.battleFormations,
          });

          setPage("selector");
        }}
      />

      <BuilderOption
        title="Spell Lore"
        value={currentList.spellLore?.name}
      />

      <BuilderOption
        title="Prayer Lore"
        value={currentList.prayerLore?.name}
      />

      <BuilderOption
        title="Manifestation Lore"
        value={currentList.manifestationLore?.name}
      />

      <RegimentSection />

      <EmptyState />

    </div>
  );
}

export default ArmyBuilder;
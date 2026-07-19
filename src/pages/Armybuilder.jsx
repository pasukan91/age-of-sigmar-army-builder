import BuilderHeader from "../components/ArmyBuilder/BuilderHeader";
import BuilderOption from "../components/ArmyBuilder/BuilderOption";
import RegimentSection from "../components/ArmyBuilder/RegimentSection";
import EmptyState from "../components/ArmyBuilder/EmptyState";

function ArmyBuilder({
  list,
  setSelector,
  setPage,
}) {
  return (
    <div>
      <BuilderHeader list={list} />

      <BuilderOption
        title="Battle Formation"
        value={list.battleFormation?.name || "No seleccionada"}
        onClick={() => {
          setSelector({
            title: "Battle Formation",
            property: "battleFormation",
            options: list.faction.battleFormations,
          });

          setPage("selector");
        }}
      />

      <BuilderOption
        title="Spell Lore"
        value={list.spellLore?.name || "No seleccionada"}
      />

      <BuilderOption
        title="Prayer Lore"
        value={list.prayerLore?.name || "No seleccionada"}
      />

      <BuilderOption
        title="Manifestation Lore"
        value={list.manifestationLore?.name || "No seleccionada"}
      />

      <RegimentSection
        list={list}
        setSelector={setSelector}
        setPage={setPage}
      />

      <EmptyState />
    </div>
  );
}

export default ArmyBuilder;
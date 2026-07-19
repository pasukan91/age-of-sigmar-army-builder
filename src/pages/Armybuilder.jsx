import BuilderHeader from "../components/ArmyBuilder/BuilderHeader";
import BuilderOption from "../components/ArmyBuilder/BuilderOption";
import RegimentSection from "../components/ArmyBuilder/RegimentSection";
import EmptyState from "../components/ArmyBuilder/EmptyState";
import BackButton from "../components/BackButton";

function ArmyBuilder({
  list,
  setSelector,
  setPage,
}) {
  const battleFormations = Array.isArray(
    list.faction?.battleFormations
  )
    ? list.faction.battleFormations
    : [];

  const spellLores = Array.isArray(
    list.faction?.spellLores
  )
    ? list.faction.spellLores
    : [];

  const prayerLores = Array.isArray(
    list.faction?.prayerLores
  )
    ? list.faction.prayerLores
    : [];

  const factionTerrain = Array.isArray(
    list.faction?.terrain
  )
    ? list.faction.terrain
    : [];

  const factionManifestations = Array.isArray(
    list.faction?.manifestations
  )
    ? list.faction.manifestations
    : [];

  const manifestationLores = Array.isArray(
    list.faction?.manifestationLores
  )
    ? list.faction.manifestationLores
    : [];

  const manifestationOptions =
    manifestationLores.length > 0
      ? manifestationLores
      : factionManifestations.length > 0
        ? [
            {
              id: `${list.faction.id}-manifestation-lore`,

              name:
                list.faction.id === "hedonites"
                  ? "Manifestations of Depravity"
                  : "Manifestation Lore",

              points: 0,

              description:
                "Esta manifestación incluye:\n\n" +
                factionManifestations
                  .map(
                    (manifestation) =>
                      `• ${manifestation.name}`
                  )
                  .join("\n"),

              manifestations:
                factionManifestations,
            },
          ]
        : [];

  function openSelector({
    title,
    property,
    options,
  }) {
    setSelector({
      title,
      property,
      regimentId: null,
      options,
    });

    setPage("selector");
  }

  return (
    <div>
      <div style={{ padding: "20px 20px 0" }}>
        <BackButton
          onClick={() => setPage("lists")}
          label="Mis listas"
        />
      </div>

      <BuilderHeader list={list} />

      <BuilderOption
        title="Battle Formation"
        value={
          list.battleFormation?.name ||
          "No seleccionada"
        }
        onClick={() =>
          openSelector({
            title: "Battle Formation",
            property: "battleFormation",
            options: battleFormations,
          })
        }
      />

      <BuilderOption
        title="Spell Lore"
        value={
          list.spellLore?.name ||
          "No seleccionada"
        }
        onClick={() =>
          openSelector({
            title: "Spell Lore",
            property: "spellLore",
            options: spellLores,
          })
        }
      />

      {prayerLores.length > 0 && (
        <BuilderOption
          title="Prayer Lore"
          value={
            list.prayerLore?.name ||
            "No seleccionada"
          }
          onClick={() =>
            openSelector({
              title: "Prayer Lore",
              property: "prayerLore",
              options: prayerLores,
            })
          }
        />
      )}

      <BuilderOption
        title="Manifestation Lore"
        value={
          list.manifestationLore?.name ||
          "No seleccionada"
        }
        onClick={() =>
          openSelector({
            title: "Manifestation Lore",
            property: "manifestationLore",
            options: manifestationOptions,
          })
        }
      />

      {factionTerrain.length > 0 && (
        <BuilderOption
          title="Faction Terrain"
          value={
            list.terrain?.name ||
            "No seleccionado"
          }
          onClick={() =>
            openSelector({
              title: "Faction Terrain",
              property: "terrain",
              options: factionTerrain,
            })
          }
        />
      )}

      <RegimentSection
        list={list}
        setSelector={setSelector}
        setPage={setPage}
      />

      {list.regiments.length === 0 && (
        <EmptyState />
      )}
    </div>
  );
}

export default ArmyBuilder;
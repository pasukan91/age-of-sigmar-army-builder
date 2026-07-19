import BuilderHeader from "../components/ArmyBuilder/BuilderHeader";
import BuilderOption from "../components/ArmyBuilder/BuilderOption";
import RegimentSection from "../components/ArmyBuilder/RegimentSection";
import EmptyState from "../components/ArmyBuilder/EmptyState";

import {
  calculateArmyPoints,
} from "../utils/armyPoints";

import "../styles/aos-app.css";

function ArmyBuilder({
  list,
  setSelector,
  navigate,
  onBack,
  onViewWarscroll,
  onConfigureUnit,
  onRemoveUnit,
  onRemoveRegiment,
}) {
  const faction =
    list?.faction ?? {};

  const battleFormations =
    getArray(
      faction.battleFormations
    );

  const spellLores =
    getArray(faction.spellLores);

  const prayerLores =
    getArray(faction.prayerLores);

  const terrain =
    getArray(faction.terrain);

  const manifestations =
    getArray(faction.manifestations);

  const manifestationLores =
    getArray(
      faction.manifestationLores
    );

  const regiments =
    getArray(list?.regiments);

  const manifestationOptions =
    manifestationLores.length > 0
      ? manifestationLores
      : createManifestationOptions({
          faction,
          manifestations,
        });

  const currentPoints =
    calculateArmyPoints(list);

  const pointsLimit =
    Number(
      list?.pointsLimit ??
        list?.points
    ) || 0;

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

    navigate("selector");
  }

  function openNewRegimentSelector() {
    const heroes =
      getArray(faction.units).filter(
        (unit) =>
          unit.rules?.hero === true
      );

    setSelector({
      title:
        "Selecciona el líder del regimiento",
      property: "newRegiment",
      regimentId: null,
      options: heroes,
    });

    navigate("selector");
  }

  return (
    <main className="aos-page aos-builder-page">
      <header className="aos-topbar">
        <button
          type="button"
          className="aos-icon-button"
          onClick={onBack}
          aria-label="Volver"
        >
          ‹
        </button>

        <h1 className="aos-topbar__title">
          {list?.name ?? "Army Builder"}
        </h1>

        <span aria-hidden="true" />
      </header>

      <BuilderHeader list={list} />

      <section className="aos-builder-options">
        <BuilderOption
          title="Battle Formation"
          value={
            list.battleFormation?.name ??
            "No seleccionada"
          }
          onClick={() =>
            openSelector({
              title:
                "Battle Formation",
              property:
                "battleFormation",
              options:
                battleFormations,
            })
          }
        />

        <BuilderOption
          title="Spell Lore"
          value={
            list.spellLore?.name ??
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
              list.prayerLore?.name ??
              "No seleccionada"
            }
            onClick={() =>
              openSelector({
                title:
                  "Prayer Lore",
                property:
                  "prayerLore",
                options:
                  prayerLores,
              })
            }
          />
        )}

        <BuilderOption
          title="Manifestation Lore"
          value={
            list.manifestationLore
              ?.name ??
            "No seleccionada"
          }
          onClick={() =>
            openSelector({
              title:
                "Manifestation Lore",
              property:
                "manifestationLore",
              options:
                manifestationOptions,
            })
          }
        />

        {terrain.length > 0 && (
          <BuilderOption
            title="Faction Terrain"
            value={
              list.terrain?.name ??
              "No seleccionado"
            }
            onClick={() =>
              openSelector({
                title:
                  "Faction Terrain",
                property: "terrain",
                options: terrain,
              })
            }
          />
        )}
      </section>

      <h2 className="aos-builder-section-title">
        Regimientos
      </h2>

      <RegimentSection
        list={list}
        setSelector={setSelector}
        setPage={navigate}
        onViewWarscroll={
          onViewWarscroll
        }
        onConfigureUnit={
          onConfigureUnit
        }
        onRemoveUnit={
          onRemoveUnit
        }
        onRemoveRegiment={
          onRemoveRegiment
        }
      />

      {regiments.length === 0 && (
        <EmptyState />
      )}

      <footer className="aos-builder-footer">
        <div className="aos-points-summary">
          <div className="aos-points-summary__icon">
            ✓
          </div>

          <div>
            <div className="aos-points-summary__value">
              {currentPoints}

              <span className="aos-points-summary__limit">
                /{pointsLimit}
              </span>
            </div>

            <span className="aos-points-summary__label">
              Puntos totales
            </span>
          </div>
        </div>

        <button
          type="button"
          className="aos-floating-add"
          onClick={
            openNewRegimentSelector
          }
          aria-label="Añadir regimiento"
        >
          +
        </button>
      </footer>
    </main>
  );
}

function getArray(value) {
  return Array.isArray(value)
    ? value
    : [];
}

function createManifestationOptions({
  faction,
  manifestations,
}) {
  if (manifestations.length === 0) {
    return [];
  }

  return [
    {
      id:
        `${faction.id}-` +
        "manifestation-lore",

      name:
        faction.id === "hedonites"
          ? "Manifestations of Depravity"
          : "Manifestation Lore",

      points: 0,

      description:
        "Esta manifestación incluye:\n\n" +
        manifestations
          .map(
            (item) =>
              `• ${item.name}`
          )
          .join("\n"),

      manifestations,
    },
  ];
}

export default ArmyBuilder;
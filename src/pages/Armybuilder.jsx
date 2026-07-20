import BuilderHeader from "../components/armybuilder/BuilderHeader";
import BuilderOption from "../components/armybuilder/BuilderOption";
import RegimentSection from "../components/armybuilder/RegimentSection";
import RenownSection from "../components/armybuilder/RenownSection";
import ArmyRulesReference from "../components/armybuilder/ArmyRulesReference";
import { getEligibleRegimentsOfRenown } from "../data/regimentsOfRenown";

import {
  calculateArmyPoints,
} from "../utils/armyPoints";
import {
  getAvailableRegimentLeaders,
} from "../utils/regimentRules";

import "../styles/aos-app.css";

function ArmyBuilder({
  list,
  storageStatus,
  setSelector,
  navigate,
  onBack,
  onViewWarscroll,
  onConfigureUnit,
  onRemoveUnit,
  onRemoveRegiment,
  onAddRegimentOfRenown,
  onRemoveRegimentOfRenown,
}) {
  const baseFaction =
    list?.faction ?? {};

  const faction = {
    ...baseFaction,
    ...(list?.armyOfRenown?.rules ?? {}),
  };

  const battleFormations =
    getArray(
      faction.battleFormations
    );

  const battleTraits =
    getArray(faction.battleTraits);

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

  const manifestationOptions =
    manifestationLores.length > 0
      ? manifestationLores
      : createManifestationOptions({
          faction,
          manifestations,
        });

  const currentPoints =
    calculateArmyPoints(list);

  const eligibleRegimentsOfRenown = list?.armyOfRenown?.excludesRegimentsOfRenown
    ? []
    : getEligibleRegimentsOfRenown(baseFaction.id);

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
      getAvailableRegimentLeaders(list);

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

      <BuilderHeader
        list={list}
        storageStatus={storageStatus}
      />

      <section className="aos-builder-options">
        {battleFormations.length > 0 && (
        <BuilderOption
          title="Formación de batalla"
          value={
            list.battleFormation?.name ??
            "No seleccionada"
          }
          onClick={() =>
            openSelector({
              title:
                "Formación de batalla",
              property:
                "battleFormation",
              options:
                battleFormations,
            })
          }
        />
        )}

        {spellLores.length > 0 && (
        <BuilderOption
          title="Saber de hechizos"
          value={
            list.spellLore?.name ??
            "No seleccionada"
          }
          onClick={() =>
            openSelector({
              title: "Saber de hechizos",
              property: "spellLore",
              options: spellLores,
            })
          }
        />
        )}

        {prayerLores.length > 0 && (
          <BuilderOption
            title="Saber de plegarias"
            value={
              list.prayerLore?.name ??
              "No seleccionada"
            }
            onClick={() =>
              openSelector({
                title:
                  "Saber de plegarias",
                property:
                  "prayerLore",
                options:
                  prayerLores,
              })
            }
          />
        )}

        {manifestationOptions.length > 0 && (
        <BuilderOption
          title="Saber de manifestaciones"
          value={
            list.manifestationLore
              ?.name ??
            "No seleccionada"
          }
          onClick={() =>
            openSelector({
              title:
                "Saber de manifestaciones",
              property:
                "manifestationLore",
              options:
                manifestationOptions,
            })
          }
        />
        )}

        {terrain.length > 0 && (
          <BuilderOption
            title="Terreno de facción"
            value={
              list.terrain?.name ??
              "No seleccionado"
            }
            onClick={() =>
              openSelector({
                title:
                  "Terreno de facción",
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

      <RenownSection
        available={eligibleRegimentsOfRenown}
        selected={getArray(list.regimentsOfRenown)}
        onAdd={onAddRegimentOfRenown}
        onRemove={onRemoveRegimentOfRenown}
      />

      <ArmyRulesReference
        battleTraits={battleTraits}
        battleFormation={list.battleFormation}
      />

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

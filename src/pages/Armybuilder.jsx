import BuilderHeader from "../components/armybuilder/BuilderHeader";
import BuilderOption from "../components/armybuilder/BuilderOption";
import RegimentSection from "../components/armybuilder/RegimentSection";
import RenownSection from "../components/armybuilder/RenownSection";
import ArmySharePanel from "../components/armybuilder/ArmySharePanel";
import ArmyValidationPanel from "../components/armybuilder/ArmyValidationPanel";
import GameMode from "../components/armybuilder/GameMode";
import ArmyQuickSearch from "../components/armybuilder/ArmyQuickSearch";
import ArmyRulesReference from "../components/armybuilder/ArmyRulesReference";
import SelectedRulesLibrary from "../components/armybuilder/SelectedRulesLibrary";
import { getEligibleRegimentsOfRenown } from "../data/regimentsOfRenown";
import {
  ghb2026Battleplans,
  ghb2026BattleTacticsCards,
} from "../data/ghb2026";
import { validateArmyList } from "../utils/armyValidation";

import {
  calculateArmyPoints,
} from "../utils/armyPoints";
import "../styles/aos-app.css";
import "../styles/builder-navigation.css";

function ArmyBuilder({
  list,
  storageStatus,
  setSelector,
  navigate,
  onBack,
  onViewWarscroll,
  onConfigureUnit,
  onRemoveUnit,
  onDuplicateUnit,
  onRemoveRegiment,
  onAddRegimentOfRenown,
  onRemoveRegimentOfRenown,
  onCommandPointsChange,
  onFuryPointsChange,
  onViewRule,
  onBrowseUnit,
  section = "units",
  onSectionChange,
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

  const manifestationLores =
    getArray(
      faction.manifestationLores
    );

  const currentPoints =
    calculateArmyPoints(list);
  const validation = validateArmyList(list);

  const eligibleRegimentsOfRenown = list?.armyOfRenown?.excludesRegimentsOfRenown
    ? []
    : getEligibleRegimentsOfRenown(baseFaction.id);

  const pointsLimit =
    Number(
      list?.pointsLimit ??
        list?.points
    ) || 0;

  const commandPoints = Math.max(
    0,
    Number(list?.commandPoints ?? 4) || 0
  );

  const furyPoints = Math.min(
    7,
    Math.max(0, Number(list?.furyPoints ?? 0) || 0)
  );

  function openSelector({
    title,
    property,
    options,
    ui,
  }) {
    setSelector({
      title,
      property,
      regimentId: null,
      options,
      ui,
    });

    navigate("selector");
  }

  function navigateToIssue(issue) {
    onSectionChange?.(normalizeBuilderSection(issue.section));
    window.requestAnimationFrame(() => {
      const target = issue.targetId
        ? document.getElementById(issue.targetId)
        : document.getElementById("army-validation-panel");
      target?.scrollIntoView({ behavior: "smooth", block: "center" });
      target?.focus?.({ preventScroll: true });
    });
  }

  function showValidation() {
    onSectionChange?.("army");
    window.requestAnimationFrame(() => {
      document.getElementById("army-validation-panel")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
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

      <nav className="aos-builder-tabs" aria-label="Secciones de la lista">
        {[
          ["army", "Ejército", "♜"],
          ["units", "Unidades", "⚔"],
          ["rules", "Reglas", "▤"],
          ["game", "Partida", "◉"],
          ["search", "Buscar", "⌕"],
        ].map(([id, label, icon]) => (
          <button
            key={id}
            type="button"
            className={section === id ? "is-active" : ""}
            onClick={() => onSectionChange?.(id)}
            aria-current={section === id ? "page" : undefined}
          >
            <span aria-hidden="true">{icon}</span>
            <small>{label}</small>
          </button>
        ))}
      </nav>

      {section === "army" && (
        <>

      <BuilderHeader
        list={list}
        storageStatus={storageStatus}
        onShowValidation={showValidation}
      />

      <ArmyValidationPanel
        validation={validation}
        onNavigateIssue={navigateToIssue}
      />

      <section className="aos-builder-options">
        <BuilderOption
          id="battleplan-option"
          title="Battleplan"
          value={list.battleplan?.name ?? "No seleccionado"}
          image={list.battleplan?.image}
          onClick={() =>
            openSelector({
              title: "Battleplan",
              property: "battleplan",
              options: ghb2026Battleplans,
            })
          }
        />

        <BuilderOption
          id="battle-tactics-option"
          title="Tácticas de batalla"
          value={formatBattleTactics(list.battleTactics)}
          onClick={() =>
            openSelector({
              title: "Tácticas de batalla",
              property: "battleTactics",
              options: ghb2026BattleTacticsCards,
              ui: { maxSelections: 2, variant: "battleTactics" },
            })
          }
        />

        {battleFormations.length > 0 && (
        <BuilderOption
          id="battle-formation-option"
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
          id="spellLore-option"
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
            id="prayerLore-option"
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

        {manifestationLores.length > 0 && (
        <BuilderOption
          id="manifestationLore-option"
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
                manifestationLores,
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

      <ArmySharePanel list={list} />

        </>
      )}

      {section === "units" && (
        <>

      <h2 id="regiments-section" className="aos-builder-section-title">
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
        onDuplicateUnit={
          onDuplicateUnit
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

        </>
      )}

      {section === "game" && (
        <GameMode
          list={list}
          onViewUnit={onBrowseUnit}
          onViewRule={onViewRule}
        />
      )}

      {section === "rules" && (
        <section className="aos-builder-reference-section">
          <ArmyRulesReference
            battleTraits={battleTraits}
            battleFormation={list.battleFormation}
          />
          <SelectedRulesLibrary list={list} onViewRule={onViewRule} />
        </section>
      )}

      {section === "search" && (
        <ArmyQuickSearch
          list={list}
          battleTraits={battleTraits}
          battleFormation={list.battleFormation}
          onViewUnit={onBrowseUnit}
          onViewRule={onViewRule}
        />
      )}

      <footer className="aos-builder-footer">
        <div className="aos-builder-footer__meters">
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
                Puntos
              </span>
            </div>
          </div>

          <div className="aos-command-counter" aria-label="Puntos de mando">
            <button
              type="button"
              onClick={() => onCommandPointsChange(commandPoints - 1)}
              disabled={commandPoints === 0}
              aria-label="Gastar un punto de mando"
            >
              −
            </button>

            <div aria-live="polite">
              <strong>{commandPoints}</strong>
              <span>PC</span>
            </div>

            <button
              type="button"
              onClick={() => onCommandPointsChange(commandPoints + 1)}
              aria-label="Añadir un punto de mando"
            >
              +
            </button>
          </div>
        </div>

        <div className="aos-fury-counter" aria-label="Puntos de furia">
          <button
            type="button"
            onClick={() => onFuryPointsChange(furyPoints - 1)}
            disabled={furyPoints === 0}
            aria-label="Gastar un punto de furia"
          >
            −
          </button>

          <div aria-live="polite">
            <strong>{furyPoints}</strong>
            <span>Furia</span>
          </div>

          <button
            type="button"
            onClick={() => onFuryPointsChange(furyPoints + 1)}
            disabled={furyPoints === 7}
            aria-label="Añadir un punto de furia"
          >
            +
          </button>
        </div>
      </footer>
    </main>
  );
}

function getArray(value) {
  return Array.isArray(value)
    ? value
    : [];
}

function normalizeBuilderSection(section) {
  return {
    list: "army",
    regiments: "units",
  }[section] ?? section ?? "army";
}

function formatBattleTactics(value) {
  const selected = Array.isArray(value)
    ? value
    : value
      ? [value]
      : [];

  return selected.length > 0
    ? selected.map((card) => card.name).join(" + ")
    : "Ninguna seleccionada";
}

export default ArmyBuilder;

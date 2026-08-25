import { useEffect, useRef, useState } from "react";

import BuilderHeader from "../components/armybuilder/BuilderHeader";
import BuilderOption from "../components/armybuilder/BuilderOption";
import RegimentSection from "../components/armybuilder/RegimentSection";
import RenownSection from "../components/armybuilder/RenownSection";
import ArmySharePanel from "../components/armybuilder/ArmySharePanel";
import ArmyValidationPanel from "../components/armybuilder/ArmyValidationPanel";
import GameMode, { BattleMission } from "../components/armybuilder/GameMode";
import ArmyRulesReference from "../components/armybuilder/ArmyRulesReference";
import SelectedRulesLibrary from "../components/armybuilder/SelectedRulesLibrary";
import { getEligibleRegimentsOfRenown } from "../data/regimentsOfRenown";
import {
  ghb2026Battleplans,
  ghb2026BattleTacticsCards,
} from "../data/ghb2026";
import { validateArmyList } from "../utils/armyValidation";
import { createRegimentOfRenownReference } from "../utils/regimentOfRenownReferences";

import {
  calculateArmyPoints,
} from "../utils/armyPoints";
import "../styles/aos-app.css";
import "../styles/builder-navigation.css";

const BUILDER_TABS = [
  {
    id: "army",
    label: "Ejército",
    icon: "♜",
    title: "Configuración del ejército",
    description: "Elige formación, cartas, saberes y escenario. Aquí también puedes comprobar si la lista es legal.",
  },
  {
    id: "units",
    label: "Unidades",
    icon: "⚔",
    title: "Regimientos y unidades",
    description: "Añade primero un líder a cada regimiento y después completa sus plazas con unidades compatibles.",
  },
  {
    id: "rules",
    label: "Reglas",
    icon: "▤",
    title: "Biblioteca de reglas",
    description: "Consulta en un solo lugar las reglas de facción, formación, saberes y mejoras seleccionadas.",
  },
  {
    id: "game",
    label: "Partida",
    icon: "◉",
    title: "Herramientas de partida",
    description: "Controla la ronda, el turno, los puntos de mando y los eventos mientras juegas.",
  },
  {
    id: "mission",
    label: "Misión",
    icon: "⌖",
    title: "Objetivos y tácticas",
    description: "Marca las tácticas completadas y consulta las condiciones de puntuación durante la partida.",
  },
];

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
  onBattleMissionToggle,
  onBattleRoundChange,
  onBattleTurnChange,
  onBattleInitiativeResolve,
  onBattleLogAdd,
  onBattleLogRemove,
  onBattleUnitStateChange,
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
  const [validationExpanded, setValidationExpanded] = useState(
    () => validation.errors.length > 0
  );
  const resetScrollOnSectionChange = useRef(false);
  const activeTab = BUILDER_TABS.find((tab) => tab.id === section) ?? BUILDER_TABS[0];
  const isBattleSection = section === "game" || section === "mission";

  useEffect(() => {
    if (!resetScrollOnSectionChange.current) return;

    resetScrollOnSectionChange.current = false;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [section]);

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
  const pointsDifference = pointsLimit - currentPoints;

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
    setValidationExpanded(true);
    onSectionChange?.(normalizeBuilderSection(issue.section));
    window.requestAnimationFrame(() => {
      const target = issue.targetId
        ? document.getElementById(issue.targetId)
        : document.getElementById("army-validation-panel");
      target?.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "center",
      });
      target?.focus?.({ preventScroll: true });
    });
  }

  function showValidation() {
    setValidationExpanded(true);
    onSectionChange?.("army");
    window.requestAnimationFrame(() => {
      document.getElementById("army-validation-panel")?.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "start",
      });
    });
  }

  function changeSection(nextSection) {
    if (!nextSection || nextSection === section) return;

    resetScrollOnSectionChange.current = true;
    onSectionChange?.(nextSection);
    window.requestAnimationFrame(() => {
      document.getElementById("builder-section-title")?.focus({ preventScroll: true });
    });
  }

  return (
    <main
      className="aos-page aos-builder-page"
    >
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
        {BUILDER_TABS.map(({ id, label, icon, description }) => (
          <button
            key={id}
            type="button"
            className={section === id ? "is-active" : ""}
            onClick={() => changeSection(id)}
            aria-current={section === id ? "page" : undefined}
            aria-label={`${label}: ${description}`}
            title={description}
          >
            <span aria-hidden="true">{icon}</span>
            <small>{label}</small>
          </button>
        ))}
      </nav>

      <section className="aos-builder-section-guide" aria-labelledby="builder-section-title">
        <div>
          <span className="aos-builder-section-guide__eyebrow">Estás en</span>
          <h2 id="builder-section-title" tabIndex="-1">{activeTab.title}</h2>
          <p>{activeTab.description}</p>
        </div>
        <span className={`aos-builder-section-guide__status is-${section}`}>
          {getSectionStatus({ section, list, validation, currentPoints })}
        </span>
      </section>

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
        expanded={validationExpanded}
        onExpandedChange={setValidationExpanded}
      />

      <section className="aos-builder-options">
        <BuilderOption
          id="battleplan-option"
          title="Plan de batalla"
          value={list.battleplan?.name ?? "No seleccionado"}
          description="Escenario, reglas especiales y forma de puntuar esta partida."
          image={list.battleplan?.image}
          onClick={() =>
            openSelector({
              title: "Plan de batalla",
              property: "battleplan",
              options: ghb2026Battleplans,
            })
          }
        />

        <BuilderOption
          id="battle-tactics-option"
          title="Tácticas de batalla"
          value={formatBattleTactics(list.battleTactics)}
          description="Escoge hasta dos cartas; cada una contiene tres misiones puntuables."
          recommended
          onClick={() =>
            openSelector({
              title: "Tácticas de batalla",
              property: "battleTactics",
              options: ghb2026BattleTacticsCards,
              ui: { maxSelections: 2 },
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
          description="Regla global que define el estilo de juego del ejército."
          required
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
          description="Hechizos disponibles para todos los magos que puedan usarlos."
          recommended
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
            description="Plegarias disponibles para los sacerdotes del ejército."
            recommended
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
          description="Manifestaciones que tus magos o sacerdotes podrán invocar."
          recommended
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
            description="Elemento de terreno propio y sus reglas durante la batalla."
            recommended
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

      {list.preset && (
        <aside className="aos-builder-preset-note">
          <span aria-hidden="true">★</span>
          <div>
            <strong>{list.preset.name}</strong>
            <p>
              Esta plantilla ya está completa, pero puedes cambiar cualquier unidad,
              refuerzo o mejora. Los puntos y la legalidad se recalculan automáticamente.
            </p>
          </div>
        </aside>
      )}

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
        onView={(regiment) => onViewRule?.(
          createRegimentOfRenownReference(regiment)
        )}
      />

        </>
      )}

      {section === "game" && (
        <GameMode
          list={list}
          onViewUnit={onBrowseUnit}
          onViewRule={onViewRule}
          onGoToUnits={() => changeSection("units")}
          onGoToArmy={() => changeSection("army")}
          onRoundChange={onBattleRoundChange}
          onTurnChange={onBattleTurnChange}
          onInitiativeResolve={onBattleInitiativeResolve}
          onLogAdd={onBattleLogAdd}
          onLogRemove={onBattleLogRemove}
          onUnitStateChange={onBattleUnitStateChange}
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

      {section === "mission" && (
        <BattleMission
          list={list}
          onToggleMission={onBattleMissionToggle}
          onGoToArmy={() => changeSection("army")}
        />
      )}

      <footer className={`aos-builder-footer ${isBattleSection ? "is-battle-tools" : "is-build-tools"}`}>
        {!isBattleSection && (
        <div className="aos-builder-footer__meters aos-builder-footer__meters--points">
          <div className="aos-points-summary">
            <div className={`aos-points-summary__icon${validation.errors.length > 0 ? " is-error" : ""}`}>
              {validation.errors.length > 0 ? "!" : validation.warnings.length > 0 ? "·" : "✓"}
            </div>

            <div>
              <div className="aos-points-summary__value">
                {currentPoints}

                <span className="aos-points-summary__limit">
                  /{pointsLimit}
                </span>
              </div>

              <span className="aos-points-summary__label">
                {validation.errors.length > 0
                  ? currentPoints > pointsLimit
                    ? `+${Math.abs(pointsDifference)} sobre el límite`
                    : `${validation.errors.length} ${validation.errors.length === 1 ? "error" : "errores"}`
                  : validation.warnings.length > 0
                    ? `${validation.warnings.length} ${validation.warnings.length === 1 ? "pendiente" : "pendientes"} · faltan ${Math.max(0, pointsDifference)} pts`
                    : "Puntos · Lista legal"}
              </span>
            </div>
          </div>
        </div>
        )}

        {isBattleSection && (
        <div className="aos-builder-footer__meters aos-builder-footer__meters--battle">
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
        )}

        {isBattleSection && (
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
        )}
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

function getSectionStatus({ section, list, validation, currentPoints }) {
  if (section === "army") {
    if (validation.errors.length > 0) {
      return `${validation.errors.length} ${validation.errors.length === 1 ? "error" : "errores"}`;
    }
    if (validation.warnings.length > 0) {
      return `${validation.warnings.length} ${validation.warnings.length === 1 ? "pendiente" : "pendientes"}`;
    }
    return "Lista legal";
  }

  if (section === "units") {
    const regimentCount = list?.regiments?.length ?? 0;
    return `${regimentCount} ${regimentCount === 1 ? "regimiento" : "regimientos"} · ${currentPoints} pts`;
  }

  if (section === "rules") {
    const selectedRules = [
      list?.battleFormation,
      list?.spellLore,
      list?.prayerLore,
      list?.manifestationLore,
      list?.terrain,
    ].filter(Boolean).length;
    return `${selectedRules} ${selectedRules === 1 ? "selección" : "selecciones"}`;
  }

  if (section === "game") return `Ronda ${list?.battleRound ?? 1}`;

  const completed = list?.completedBattleMissions?.length ?? 0;
  return `${completed} completadas`;
}

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

export default ArmyBuilder;

import { useState } from "react";

import MainNav from "../components/MainNav";
import OfficialIcon from "../components/OfficialIcon";
import ArmyValidationPanel from "../components/armybuilder/ArmyValidationPanel";
import RegimentSection from "../components/armybuilder/RegimentSection";
import RenownSection from "../components/armybuilder/RenownSection";
import { getEligibleRegimentsOfRenown } from "../data/regimentsOfRenown";
import { ghb2026BattleTacticsCards } from "../data/ghb2026";
import { calculateArmyPoints } from "../utils/armyPoints";
import { validateArmyList } from "../utils/armyValidation";
import { getFactionArtwork, getFactionArtworkPosition } from "../utils/factionArtwork";
import { createRegimentOfRenownReference } from "../utils/regimentOfRenownReferences";

import "../styles/aos-app.css";
import "../styles/official-app.css";

function ArmyBuilder({
  list,
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
  onRemoveAuxiliary,
  onViewRule,
  onRules,
  onLists,
  onSettings,
}) {
  const [validationExpanded, setValidationExpanded] = useState(false);
  const baseFaction = list?.faction ?? {};
  const faction = { ...baseFaction, ...(list?.armyOfRenown?.rules ?? {}) };
  const validation = validateArmyList(list);
  const points = calculateArmyPoints(list);
  const pointsLimit = Number(list?.pointsLimit ?? list?.points) || 0;
  const artwork = getFactionArtwork(baseFaction);
  const eligibleRegimentsOfRenown = list?.armyOfRenown?.excludesRegimentsOfRenown
    ? []
    : getEligibleRegimentsOfRenown(baseFaction.id);

  function openSelector({ title, property, options, ui, regimentId = null }) {
    setSelector({ title, property, regimentId, options, ui });
    navigate("selector");
  }

  const selectionGroups = [
    {
      title: "Battle Formation",
      property: "battleFormation",
      options: faction.battleFormations,
      value: list.battleFormation?.name,
    },
    {
      title: "Spell Lore",
      property: "spellLore",
      options: faction.spellLores,
      value: list.spellLore?.name,
    },
    {
      title: "Prayer Lore",
      property: "prayerLore",
      options: faction.prayerLores,
      value: list.prayerLore?.name,
    },
    {
      title: "Manifestation Lore",
      property: "manifestationLore",
      options: faction.manifestationLores,
      value: list.manifestationLore?.name,
    },
  ].filter((group) => (group.options ?? []).length > 0);

  return (
    <main className="aos-official-page aos-official-builder">
      <header className="aos-official-header">
        <button type="button" onClick={onBack} aria-label="Back"><OfficialIcon name="back" size={25} strokeWidth={2.5} /></button>
        <h1>{list?.name ?? "STORM FORGE"}</h1>
        <div className="aos-official-header__actions">
          <OfficialIcon name="profile" size={28} strokeWidth={1.8} />
          <OfficialIcon name="menu" size={28} strokeWidth={2.4} />
        </div>
      </header>

      {artwork && (
        <div
          className="aos-official-builder-hero"
          style={{
            "--official-faction-art": `url("${artwork}")`,
            "--official-faction-position": getFactionArtworkPosition(baseFaction, "builder") ?? "center",
          }}
        />
      )}

      <div className="aos-official-builder-content">
        <OfficialSection title="Regiments" open action="plus">
          <RegimentSection
            list={list}
            setSelector={setSelector}
            setPage={navigate}
            onViewWarscroll={onViewWarscroll}
            onConfigureUnit={onConfigureUnit}
            onRemoveUnit={onRemoveUnit}
            onDuplicateUnit={onDuplicateUnit}
            onRemoveRegiment={onRemoveRegiment}
          />
        </OfficialSection>

        <OfficialSection title="Regiments of Renown" action="plus">
          <RenownSection
            available={eligibleRegimentsOfRenown}
            selected={list.regimentsOfRenown ?? []}
            regularRegimentCount={list.regiments?.length ?? 0}
            onAdd={onAddRegimentOfRenown}
            onRemove={onRemoveRegimentOfRenown}
            onViewUnit={onViewWarscroll}
            onView={(regiment) => onViewRule?.(createRegimentOfRenownReference(regiment))}
          />
        </OfficialSection>

        <OfficialSection
          title="Auxiliary Units"
          action="plus"
          onAction={() => openSelector({
            title: "Add Auxiliary Unit",
            property: "newAuxiliary",
            options: faction.units ?? [],
          })}
        >
          <div className="aos-official-auxiliaries">
            {(list.auxiliaries ?? []).map((unit) => (
              <article key={unit.instanceId ?? unit.id}>
                <button type="button" onClick={() => onViewWarscroll(unit)}>{unit.name}</button>
                <strong>{unit.points} pts</strong>
                <button type="button" onClick={() => onRemoveAuxiliary?.(unit.instanceId)} aria-label={`Remove ${unit.name}`}>⋮</button>
              </article>
            ))}
          </div>
        </OfficialSection>

        <OfficialSection title="Lores" action="settings">
          <div className="aos-official-selection-list">
            {selectionGroups.map((group) => (
              <button
                key={group.property}
                type="button"
                onClick={() => openSelector(group)}
              >
                <span>{group.title}</span><strong>{group.value ?? "Not selected"}</strong>
              </button>
            ))}
          </div>
        </OfficialSection>

        <OfficialSection title="Battle Tactics" action="settings">
          <button
            type="button"
            className="aos-official-current-selection"
            onClick={() => openSelector({
              title: "Battle Tactics",
              property: "battleTactics",
              options: ghb2026BattleTacticsCards,
              ui: { maxSelections: 2, variant: "battleTactics" },
            })}
          >
            {formatSelection(list.battleTactics)}
          </button>
        </OfficialSection>

        {(faction.terrain ?? []).length > 0 && (
          <OfficialSection title="Faction Terrain" action="settings">
            <button
              type="button"
              className="aos-official-current-selection"
              onClick={() => openSelector({
                title: "Faction Terrain",
                property: "terrain",
                options: faction.terrain,
              })}
            >
              {list.terrain?.name ?? "Not selected"}
            </button>
          </OfficialSection>
        )}

        <ArmyValidationPanel
          validation={validation}
          expanded={validationExpanded}
          onExpandedChange={setValidationExpanded}
        />
      </div>

      <button
        type="button"
        className={`aos-official-points${validation.errors.length ? " is-invalid" : ""}`}
        onClick={() => setValidationExpanded((open) => !open)}
      >
        <span>{validation.errors.length ? <OfficialIcon name="warning" size={24} strokeWidth={2.4} /> : "✓"}</span>
        <strong>{points}/{pointsLimit}</strong>
        <small>POINTS</small>
      </button>

      <MainNav
        active="storm-forge"
        onReference={onRules}
        onStormForge={onLists}
        onProfile={onSettings}
      />
    </main>
  );
}

function OfficialSection({ title, action, onAction, open = false, children }) {
  return (
    <details className="aos-official-builder-section" open={open}>
      <summary>
        <span className="aos-official-builder-section__chevron" aria-hidden="true"><OfficialIcon name="chevronDown" size={19} strokeWidth={3} /></span>
        <strong>{title}</strong>
        {action && (
          <button
            type="button"
            onClick={(event) => { event.preventDefault(); onAction?.(); }}
            aria-label={`${title} options`}
          ><OfficialIcon name={action} size={action === "plus" ? 32 : 24} strokeWidth={2.8} /></button>
        )}
      </summary>
      <div>{children}</div>
    </details>
  );
}

function formatSelection(value) {
  const selected = Array.isArray(value) ? value : value ? [value] : [];
  return selected.length ? selected.map((item) => item.name).join(" + ") : "Not selected";
}

export default ArmyBuilder;

import { useEffect, useMemo, useRef, useState } from "react";

import ArmyListActions from "../components/ArmyListActions";
import OfficialIcon from "../components/OfficialIcon";
import MainNav from "../components/MainNav";
import AbilityCard from "../components/AbilityCard";
import UnitArtwork from "../components/UnitArtwork";
import ArmyValidationPanel from "../components/armybuilder/ArmyValidationPanel";
import RegimentSection from "../components/armybuilder/RegimentSection";
import RenownSection from "../components/armybuilder/RenownSection";
import Realmgate from "../components/armybuilder/Realmgate";
import { getEligibleRegimentsOfRenown } from "../data/regimentsOfRenown";
import { ghb2026BattleTacticsCards } from "../data/ghb2026";
import { calculateArmyPoints } from "../utils/armyPoints";
import { validateArmyList } from "../utils/armyValidation";
import { getFactionArtwork, getFactionArtworkPosition } from "../utils/factionArtwork";
import { createRegimentOfRenownReference } from "../utils/regimentOfRenownReferences";
import { getAvailableRegimentLeaders } from "../utils/regimentRules";
import { canAddRegiment, canAddRegimentOfRenown } from "../utils/armyComposition";

import "../styles/aos-app.css";
import "../styles/official-app.css";

function ArmyBuilder({
  list,
  onUpdateList,
  setSelector,
  navigate,
  onBack,
  onViewWarscroll,
  onConfigureUnit,
  onRemoveUnit,
  onDuplicateUnit,
  onRemoveRegiment,
  onRemoveRegimentOfRenown,
  onRemoveAuxiliary,
  onViewRule,
  onRules,
  onLists,
  onSettings,
  section = "units",
  onSectionChange,
}) {
  const [actionsOpen, setActionsOpen] = useState(false);
  const [validationExpanded, setValidationExpanded] = useState(false);
  const [loreSettingsOpen, setLoreSettingsOpen] = useState(false);
  const baseFaction = list?.faction ?? {};
  const faction = { ...baseFaction, ...(list?.armyOfRenown?.rules ?? {}) };
  const validation = useMemo(() => validateArmyList(list), [list]);
  const points = useMemo(() => calculateArmyPoints(list), [list]);
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
  ].filter((group) => (group.options ?? []).length > 0)
    .map((group) => ({ ...group, ui: { variant: "lores" } }));

  const tacticsSelector = { title: "Battle Tactics", property: "battleTactics", options: ghb2026BattleTacticsCards, ui: { maxSelections: 2, variant: "battleTactics" } };
  const terrainSelector = { title: "Faction Terrain", property: "terrain", options: faction.terrain ?? [] };
  const playing = section === "game";
  const canBrowseRenown = eligibleRegimentsOfRenown.length > 0 && canAddRegimentOfRenown(list);
  function browseRenown() {
    openSelector({ title: "Add Regiment of Renown", property: "newRegimentOfRenown", options: eligibleRegimentsOfRenown, ui: { variant: "renown" } });
  }

  function changeMode(nextSection) {
    onSectionChange?.(nextSection);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  return (
    <main className="aos-official-page aos-official-builder">
      {actionsOpen && <ArmyListActions list={list} onUpdate={onUpdateList} onClose={() => setActionsOpen(false)} onSettings={onSettings} />}
      <header className="aos-official-header">
        <button type="button" onClick={playing ? () => changeMode("units") : onBack} aria-label="Back"><OfficialIcon name="back" size={25} strokeWidth={2.5} /></button>
        <h1>{playing ? "REALMGATE" : list?.name ?? "STORM FORGE"}</h1>
        <div className="aos-official-header__actions">
          <button type="button" className={playing ? "is-active" : ""} onClick={() => changeMode(playing ? "units" : "game")} aria-label={playing ? "Volver al constructor" : "Abrir modo partida"} aria-pressed={playing}><OfficialIcon name="battleMode" size={28} strokeWidth={1.8} /></button>
          <button type="button" aria-label="Opciones del ejército" onClick={() => setActionsOpen(true)}><OfficialIcon name="menu" size={28} strokeWidth={2.4} /></button>
        </div>
      </header>

      {!playing && artwork && (
        <div
          className="aos-official-builder-hero"
          style={{
            "--official-faction-art": `url("${artwork}")`,
            "--official-faction-position": getFactionArtworkPosition(baseFaction, "builder") ?? "center",
          }}
        />
      )}

      {playing ? <Realmgate list={list} onViewUnit={onViewWarscroll} onViewRule={onViewRule} /> : <div className="aos-official-builder-content">
        <OfficialSection
          title="Regiments"
          open
          action="plus"
          disabled={!canAddRegiment(list)}
          onAction={() => {
            if (!canAddRegiment(list)) return;
            openSelector({
              title: "Add Hero",
              property: "newRegiment",
              options: getAvailableRegimentLeaders(list),
              ui: { variant: "units" },
            });
          }}
        >
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

        <OfficialSection title="Regiments of Renown" action="plus" open={Boolean(list.regimentsOfRenown?.length)} disabled={!canBrowseRenown} onAction={browseRenown}>
          <RenownSection
            selected={list.regimentsOfRenown ?? []}
            onBrowse={browseRenown}
            canBrowse={canBrowseRenown}
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
            ui: { variant: "units" },
          })}
        >
          <div className="aos-official-auxiliaries">
            {(list.auxiliaries ?? []).map((unit) => (
              <article key={unit.instanceId ?? unit.id}>
                <button type="button" onClick={() => onViewWarscroll(unit)}>{unit.name}</button>
                <strong>{unit.points} pts</strong>
                <details className="aos-official-action-menu"><summary aria-label={`Opciones de ${unit.name}`}>⋮</summary><div><button type="button" onClick={() => onRemoveAuxiliary?.(unit.instanceId)}>Remove</button></div></details>
              </article>
            ))}
          </div>
        </OfficialSection>

        <OfficialSection title="Lores" action="settings" open onAction={() => setLoreSettingsOpen(true)} disabled={selectionGroups.length === 0}>
          <div className="aos-official-lore-list">
            {selectionGroups.map((group) => (
              <LoreGroup key={group.property} group={group} selected={list[group.property]} onChoose={() => openSelector(group)} onViewRule={onViewRule} />
            ))}
          </div>
        </OfficialSection>

        <OfficialSection title="Battle Tactics" action="settings" onAction={() => openSelector(tacticsSelector)}>
          <button
            type="button"
            className="aos-official-current-selection"
            onClick={() => openSelector(tacticsSelector)}
          >
            {formatSelection(list.battleTactics)}
          </button>
        </OfficialSection>

        {(faction.terrain ?? []).length > 0 && (
          <OfficialSection title="Faction Terrain" action="settings" open onAction={() => openSelector(terrainSelector)}>
            {list.terrain ? (
              <article className="aos-official-terrain-row">
                <button type="button" className="aos-official-terrain-row__view" onClick={() => onViewWarscroll(list.terrain)} aria-label={`View ${list.terrain.name} warscroll`}>
                  <UnitArtwork unit={list.terrain} />
                  <strong>{list.terrain.name}</strong>
                </button>
                <details className="aos-official-action-menu">
                  <summary aria-label={`${list.terrain.name} options`}><OfficialIcon name="menu" /></summary>
                  <div>
                    <button type="button" onClick={() => onViewWarscroll(list.terrain)}>View Warscroll</button>
                    <button type="button" onClick={() => openSelector(terrainSelector)}>Change Terrain</button>
                  </div>
                </details>
              </article>
            ) : (
              <button type="button" className="aos-official-current-selection" onClick={() => openSelector(terrainSelector)}>Choose Faction Terrain</button>
            )}
          </OfficialSection>
        )}

        {validationExpanded && (
          <ArmyValidationPanel
            validation={validation}
            expanded
            onExpandedChange={setValidationExpanded}
          />
        )}
      </div>}

      {!playing && <button
        type="button"
        className={`aos-official-points${validation.errors.length ? " is-invalid" : ""}`}
        onClick={() => setValidationExpanded((open) => !open)}
      >
        <span>{validation.errors.length ? <OfficialIcon name="warning" size={24} strokeWidth={2.4} /> : "✓"}</span>
        <strong>{points}/{pointsLimit}</strong>
        <small>POINTS</small>
      </button>}

      <MainNav
        active="storm-forge"
        onReference={onRules}
        onStormForge={onLists}
        onProfile={onSettings}
      />

      {loreSettingsOpen && <LoreSettings groups={selectionGroups} onClose={() => setLoreSettingsOpen(false)} onChoose={(group) => { setLoreSettingsOpen(false); openSelector(group); }} />}

    </main>
  );
}

function OfficialSection({ title, action, onAction, open = false, disabled = false, children }) {
  return (
    <details className="aos-official-builder-section" open={open}>
      <summary>
        <span className="aos-official-builder-section__chevron" aria-hidden="true"><OfficialIcon name="chevronDown" size={19} strokeWidth={3} /></span>
        <strong>{title}</strong>
        {action && (
          <button
            type="button"
            disabled={disabled}
            onClick={(event) => {
              event.preventDefault();
              if (onAction) onAction();
              else event.currentTarget.closest("details").open = !event.currentTarget.closest("details").open;
            }}
            aria-label={`${title} options`}
          ><OfficialIcon name={action} size={action === "plus" ? 32 : 24} strokeWidth={2.8} /></button>
        )}
      </summary>
      <div>{children}</div>
    </details>
  );
}

function LoreGroup({ group, selected, onChoose, onViewRule }) {
  const items = selected?.spells ?? selected?.prayers ?? selected?.manifestations ?? [];
  return (
    <details className="aos-official-lore-group">
      <summary><strong>{group.title}</strong><OfficialIcon name="chevronDown" size={20} /></summary>
      <div className="aos-official-lore-group__content">
        {selected && <strong>{selected.name}</strong>}
        {group.property === "manifestationLore" && (selected?.abilities ?? []).map((ability) => <AbilityCard key={ability.id ?? ability.name} ability={ability} />)}
        {items.map((item) => group.property === "manifestationLore" ? (
          <button key={item.id ?? item.name} type="button" className="aos-official-current-selection" onClick={() => onViewRule?.({ item, kind: "manifestation", sourceName: selected.name })}>{item.name}<OfficialIcon name="chevronRight" size={18} /></button>
        ) : <AbilityCard key={item.id ?? item.name} ability={item} />)}
        <button type="button" className="aos-official-lore-choose" onClick={onChoose}>{selected ? "Change" : "Choose"} {group.title}</button>
      </div>
    </details>
  );
}

function LoreSettings({ groups, onClose, onChoose }) {
  const dialogRef = useRef(null);
  useEffect(() => { dialogRef.current?.showModal(); }, []);
  return (
    <dialog ref={dialogRef} className="aos-official-lore-settings" aria-labelledby="lore-settings-title" onCancel={onClose} onClose={onClose}>
      <header><h2 id="lore-settings-title">Lores</h2><button type="button" onClick={onClose} aria-label="Close lore settings">×</button></header>
      {groups.map((group) => <button type="button" key={group.property} onClick={() => onChoose(group)}><strong>{group.title}</strong><OfficialIcon name="chevronRight" size={20} /></button>)}
    </dialog>
  );
}

function formatSelection(value) {
  const selected = Array.isArray(value) ? value : value ? [value] : [];
  return selected.length ? selected.map((item) => item.name).join(" + ") : "Not selected";
}

export default ArmyBuilder;

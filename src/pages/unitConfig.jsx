import { useState } from "react";

import ArmyValidationPanel from "../components/armybuilder/ArmyValidationPanel";
import { validateArmyList } from "../utils/armyValidation";
import { getGeneralRegimentId } from "../utils/armyComposition";
import BackButton from "../components/BackButton";
import MainNav from "../components/MainNav";
import OfficialIcon from "../components/OfficialIcon";
import AbilityCard from "../components/AbilityCard";
import FormattedRulesText from "../components/FormattedRulesText";
import {
  ARTEFACTS_OF_POWER,
  HEROIC_TRAITS,
  canUnitTakeEnhancementCategory,
  getSpecialEnhancementGroups,
  hasAuthoritativeEnhancementEligibility,
} from "../utils/enhancementRules";
import {
  getEnhancementAbilities,
  getEnhancementTiming,
} from "../utils/enhancementTiming";
import { isUniqueUnit } from "../utils/unitIdentity";
import { calculateArmyPoints, getUnitPoints } from "../utils/armyPoints";

function UnitConfig({
  unit,
  faction,
  enhancementOwners = {},
  findSpecialEnhancementOwner = () => null,
  mode,
  list,
  isGeneral = false,
  canBeGeneral = true,
  regimentId,
  goBack,
  onConfirm,
  onView,
  onRules,
  onLists,
  onSettings,
}) {
  const [validationOpen, setValidationOpen] = useState(false);
  const [general, setGeneral] = useState(Boolean(isGeneral));

  const [reinforced, setReinforced] =
    useState(
      Boolean(unit?.reinforced)
    );

  const [heroicTrait, setHeroicTrait] =
    useState(
      unit?.heroicTrait ?? null
    );

  const [monstrousTrait, setMonstrousTrait] =
    useState(
      unit?.monstrousTrait ?? null
    );

  const [artefact, setArtefact] =
    useState(unit?.artefact ?? null);

  const [allConsumingObsession, setAllConsumingObsession] =
    useState(unit?.allConsumingObsession ?? null);

  const [moulderMutation, setMoulderMutation] =
    useState(unit?.moulderMutation ?? null);

  const [mortisanRefinement, setMortisanRefinement] =
    useState(unit?.mortisanRefinement ?? null);

  const [originOfTerrifyingFolkTale, setOriginOfTerrifyingFolkTale] =
    useState(unit?.originOfTerrifyingFolkTale ?? null);

  const [visionOfFate, setVisionOfFate] =
    useState(unit?.visionOfFate ?? null);

  const [specialKnickKnack, setSpecialKnickKnack] =
    useState(unit?.specialKnickKnack ?? null);

  const [flawlessManoeuvre, setFlawlessManoeuvre] =
    useState(unit?.flawlessManoeuvre ?? null);

  const [plaguefathersPox, setPlaguefathersPox] =
    useState(unit?.plaguefathersPox ?? null);

  const [decorationForValour, setDecorationForValour] =
    useState(unit?.decorationForValour ?? null);

  const [ironweldInnovation, setIronweldInnovation] =
    useState(unit?.ironweldInnovation ?? null);
  const [accursedDevice, setAccursedDevice] =
    useState(unit?.accursedDevice ?? null);
  const [brazenMutation, setBrazenMutation] =
    useState(unit?.brazenMutation ?? null);
  const [brandOfDarkGod, setBrandOfDarkGod] =
    useState(unit?.brandOfDarkGod ?? null);
  const [ensorcelledBanner, setEnsorcelledBanner] =
    useState(unit?.ensorcelledBanner ?? null);
  const [boonOfShadow, setBoonOfShadow] =
    useState(unit?.boonOfShadow ?? null);
  const [aqshyEnhancement, setAqshyEnhancement] =
    useState(unit?.aqshyEnhancement ?? null);
  const [specialEnhancements, setSpecialEnhancements] = useState(() => {
    if (unit?.specialEnhancements) return unit.specialEnhancements;
    const legacy = unit?.aqshyEnhancement;
    return legacy?.enhancementCategory
      ? { [legacy.enhancementCategory]: legacy }
      : {};
  });

  if (!unit) {
    return (
      <main className="aos-shell">
        <header className="aos-screen-header">
          <BackButton
            onClick={goBack}
            light
            compact
          />
          <h1 className="aos-screen-header__title">
            Configuración
          </h1>
          <span aria-hidden="true" />
        </header>

        <div className="aos-screen-content">
          <p className="aos-empty-message">
            No hay ninguna unidad seleccionada.
          </p>
        </div>
      </main>
    );
  }

  const keywords = Array.isArray(
    unit.keywords
  )
    ? unit.keywords.map((keyword) =>
        String(keyword)
          .trim()
          .toLowerCase()
      )
    : [];

  const baseModels =
    Number(unit.details?.models) || 1;

  const basePoints =
    Number(unit.points) || 0;

  const isHero =
    unit.rules?.hero === true ||
    keywords.includes("hero");

  const isUnique = isUniqueUnit(unit);

  const isMonster =
    unit.rules?.monster === true ||
    keywords.includes("monster");

  const isWarMachine =
    keywords.includes("war machine");

  const isChampion =
    keywords.includes("champion") ||
    keywords.some((keyword) => keyword.startsWith("champion ("));

  const isCogfort =
    [
      "cannonade-cogfort",
      "conqueror-cogfort",
      "immolator-cogfort",
      "linebreaker-cogfort",
    ].includes(unit.id);

  const hasExactEnhancementEligibility =
    hasAuthoritativeEnhancementEligibility(unit);

  const isHedonitesFaction =
    faction?.id === "hedonites" ||
    faction?.name === "Hedonites of Slaanesh" ||
    keywords.includes("hedonites of slaanesh");

  const canBeReinforced =
    !isHero &&
    baseModels > 1 &&
    unit.rules?.canBeReinforced !== false;

  const canSelectArtefact =
    hasExactEnhancementEligibility
      ? canUnitTakeEnhancementCategory(unit, ARTEFACTS_OF_POWER)
      : isHero && !isUnique &&
        (!isCogfort || faction?.allowCogfortHeroEnhancements === true);

  const canSelectHeroicTrait =
    hasExactEnhancementEligibility
      ? canUnitTakeEnhancementCategory(unit, HEROIC_TRAITS)
      : isHero && !isUnique &&
        (!isCogfort || faction?.allowCogfortHeroEnhancements === true);

  const rawMonstrousTraitOptions =
    faction?.monsterTraits ?? [];

  const monstrousTraitOptions =
    Array.isArray(rawMonstrousTraitOptions)
      ? rawMonstrousTraitOptions
      : Object.values(rawMonstrousTraitOptions).flat();

  const canSelectMonstrousTrait =
    !isHedonitesFaction &&
    isHero &&
    isMonster &&
    !isUnique &&
    monstrousTraitOptions.length > 0;

  const canSelectAllConsumingObsession =
    !isUnique &&
    !isHero &&
    (keywords.includes("infantry") ||
      keywords.includes("cavalry")) &&
    (faction?.allConsumingObsessions?.length ?? 0) > 0;

  const canSelectMoulderMutation =
    !isUnique &&
    !isHero &&
    !isWarMachine &&
    keywords.includes("skaven") &&
    (faction?.moulderMutations?.length ?? 0) > 0;

  const canSelectMortisanRefinement =
    !isUnique &&
    !isHero &&
    (faction?.mortisanRefinements?.length ?? 0) > 0;

  const canSelectOriginOfTerrifyingFolkTale =
    !isUnique &&
    !isHero &&
    keywords.includes("infantry") &&
    keywords.includes("soulblight gravelords") &&
    (faction?.originsOfTerrifyingFolkTales?.length ?? 0) > 0;

  const canSelectVisionOfFate =
    !isUnique &&
    !isHero &&
    !keywords.includes("beast") &&
    (faction?.visionsOfFate?.length ?? 0) > 0;

  const canSelectSpecialKnickKnack =
    !isUnique &&
    !isHero &&
    (faction?.specialKnickKnacks?.length ?? 0) > 0;

  const canSelectFlawlessManoeuvre =
    !isHero &&
    !isMonster &&
    (faction?.flawlessManoeuvres?.length ?? 0) > 0;

  const canSelectPlaguefathersPox =
    !isUnique &&
    !isHero &&
    (faction?.plaguefathersPoxes?.length ?? 0) > 0;

  const canSelectDecorationForValour =
    !isUnique &&
    !isHero &&
    isChampion &&
    (faction?.decorationsForValour?.length ?? 0) > 0;

  const canSelectIronweldInnovation =
    !isUnique &&
    isCogfort &&
    (faction?.ironweldInnovations?.length ?? 0) > 0;

  const canSelectAccursedDevice =
    !isUnique &&
    !isHero &&
    isWarMachine &&
    (faction?.accursedDevices?.length ?? 0) > 0;

  const canSelectBrazenMutation =
    !isUnique &&
    !isHero &&
    (keywords.includes("infantry") || keywords.includes("cavalry")) &&
    (faction?.brazenMutations?.length ?? 0) > 0;

  const canSelectBrandOfDarkGod =
    !isUnique &&
    !isHero &&
    keywords.includes("infantry") &&
    keywords.includes("slaves to darkness") &&
    (faction?.brandsOfTheDarkGods?.length ?? 0) > 0;

  const canSelectEnsorcelledBanner =
    !isUnique &&
    (keywords.includes("infantry") || keywords.includes("cavalry")) &&
    keywords.some((keyword) => keyword.startsWith("standard bearer")) &&
    (faction?.ensorcelledBanners?.length ?? 0) > 0;

  const canSelectBoonOfShadow =
    !isUnique &&
    !isHero &&
    (faction?.boonsOfShadow?.length ?? 0) > 0;

  const aqshyEnhancementOptions = (faction?.aqshyEnhancements ?? []).filter(
    (option) => {
      const required = (option.requiredKeywords ?? []).map((keyword) =>
        String(keyword).trim().toLowerCase()
      );
      const excluded = (option.excludedKeywords ?? []).map((keyword) =>
        String(keyword).trim().toLowerCase()
      );
      const matchesToken = (token) => {
        const normalizedUnitName = String(unit.name ?? "").trim().toLowerCase();
        const singularToken = token.endsWith("s") ? token.slice(0, -1) : token;
        const singularName = normalizedUnitName.endsWith("s")
          ? normalizedUnitName.slice(0, -1)
          : normalizedUnitName;
        return keywords.includes(token) || singularName === singularToken;
      };
      const hasRequired = required.length === 0 ||
        (option.requireAnyKeyword
          ? required.some(matchesToken)
          : required.every(matchesToken));
      return hasRequired && !excluded.some(matchesToken);
    }
  );
  const canSelectAqshyEnhancement = aqshyEnhancementOptions.length > 0;
  const specialEnhancementGroups = getSpecialEnhancementGroups(unit, faction);

  const artefactOptions = [
    ...(faction?.artefacts ?? []),
    ...(faction?.aqshyArtefacts ?? []),
  ];

  const heroicTraitOptions = [
    ...(faction?.heroicTraits ?? []),
    ...(faction?.aqshyHeroicTraits ?? []),
  ];

  const allConsumingObsessionOptions =
    faction?.allConsumingObsessions ?? [];

  const moulderMutationOptions =
    faction?.moulderMutations ?? [];

  const mortisanRefinementOptions =
    faction?.mortisanRefinements ?? [];

  const originOfTerrifyingFolkTaleOptions =
    faction?.originsOfTerrifyingFolkTales ?? [];

  const visionOfFateOptions =
    faction?.visionsOfFate ?? [];

  const specialKnickKnackOptions =
    faction?.specialKnickKnacks ?? [];

  const flawlessManoeuvreOptions =
    faction?.flawlessManoeuvres ?? [];

  const plaguefathersPoxOptions =
    faction?.plaguefathersPoxes ?? [];

  const decorationForValourOptions =
    faction?.decorationsForValour ?? [];

  const ironweldInnovationOptions =
    faction?.ironweldInnovations ?? [];

  const accursedDeviceOptions =
    faction?.accursedDevices ?? [];
  const brazenMutationOptions =
    faction?.brazenMutations ?? [];
  const brandOfDarkGodOptions =
    faction?.brandsOfTheDarkGods ?? [];
  const ensorcelledBannerOptions =
    faction?.ensorcelledBanners ?? [];
  const boonOfShadowOptions =
    faction?.boonsOfShadow ?? [];

  const artefactOwner = enhancementOwners.artefact?.unit ?? null;
  const heroicTraitOwner = enhancementOwners.heroicTrait?.unit ?? null;
  const monstrousTraitOwner = enhancementOwners.monstrousTrait?.unit ?? null;
  const aqshyEnhancementOwner = enhancementOwners.aqshyEnhancement?.unit ?? null;

  const totalModels =
    canBeReinforced && reinforced
      ? baseModels * 2
      : baseModels;

  const totalPoints =
    (canBeReinforced && reinforced
      ? basePoints * 2
      : basePoints) +
    Number(artefact?.points ?? 0) +
    Number(heroicTrait?.points ?? 0) +
    Number(monstrousTrait?.points ?? 0) +
    Number(allConsumingObsession?.points ?? 0) +
    Number(moulderMutation?.points ?? 0) +
    Number(mortisanRefinement?.points ?? 0) +
    Number(originOfTerrifyingFolkTale?.points ?? 0) +
    Number(visionOfFate?.points ?? 0) +
    Number(specialKnickKnack?.points ?? 0) +
    Number(flawlessManoeuvre?.points ?? 0) +
    Number(plaguefathersPox?.points ?? 0) +
    Number(decorationForValour?.points ?? 0) +
    Number(ironweldInnovation?.points ?? 0) +
    Number(accursedDevice?.points ?? 0) +
    Number(brazenMutation?.points ?? 0) +
    Number(brandOfDarkGod?.points ?? 0) +
    Number(ensorcelledBanner?.points ?? 0) +
    Number(boonOfShadow?.points ?? 0) +
    Number(hasExactEnhancementEligibility ? 0 : aqshyEnhancement?.points ?? 0) +
    Object.values(specialEnhancements).reduce(
      (total, enhancement) => total + Number(enhancement?.points ?? 0),
      0
    );

  function handleConfirm() { onConfirm?.(configuredUnit()); }
  function configuredUnit() {
    return {
      ...unit,

      isGeneral: general,

      reinforced:
        canBeReinforced &&
        reinforced,

      configuredModels:
        totalModels,

      artefact:
        canSelectArtefact
          ? artefact
          : null,

      heroicTrait:
        canSelectHeroicTrait
          ? heroicTrait
          : null,

      monstrousTrait:
        canSelectMonstrousTrait
          ? monstrousTrait
          : null,

      allConsumingObsession:
        canSelectAllConsumingObsession
          ? allConsumingObsession
          : null,

      moulderMutation:
        canSelectMoulderMutation
          ? moulderMutation
          : null,

      mortisanRefinement:
        canSelectMortisanRefinement
          ? mortisanRefinement
          : null,

      originOfTerrifyingFolkTale:
        canSelectOriginOfTerrifyingFolkTale
          ? originOfTerrifyingFolkTale
          : null,

      visionOfFate:
        canSelectVisionOfFate
          ? visionOfFate
          : null,

      specialKnickKnack:
        canSelectSpecialKnickKnack
          ? specialKnickKnack
          : null,

      flawlessManoeuvre:
        canSelectFlawlessManoeuvre
          ? flawlessManoeuvre
          : null,

      plaguefathersPox:
        canSelectPlaguefathersPox
          ? plaguefathersPox
          : null,

      decorationForValour:
        canSelectDecorationForValour
          ? decorationForValour
          : null,

      ironweldInnovation:
        canSelectIronweldInnovation
          ? ironweldInnovation
          : null,

      accursedDevice:
        canSelectAccursedDevice
          ? accursedDevice
          : null,

      brazenMutation:
        canSelectBrazenMutation
          ? brazenMutation
          : null,

      brandOfDarkGod:
        canSelectBrandOfDarkGod
          ? brandOfDarkGod
          : null,

      ensorcelledBanner:
        canSelectEnsorcelledBanner
          ? ensorcelledBanner
          : null,

      boonOfShadow:
        canSelectBoonOfShadow
          ? boonOfShadow
          : null,

      aqshyEnhancement:
        !hasExactEnhancementEligibility && canSelectAqshyEnhancement
          ? aqshyEnhancement
          : null,

      specialEnhancements:
        hasExactEnhancementEligibility
          ? specialEnhancements
          : unit?.specialEnhancements ?? {},
    };
  }

  function toggleExclusiveOption(
    setter,
    option
  ) {
    setter((previous) =>
      previous?.id === option.id
        ? null
        : option
    );
  }

  const selectionGroups = [];

  function addSelectionGroup(condition, config) {
    if (condition && (config.options ?? []).length > 0) {
      selectionGroups.push(config);
    }
  }

  addSelectionGroup(canSelectArtefact, {
    id: "artefacts",
    title: faction?.artefactLabel ?? "ARTEFACTS OF POWER",
    options: artefactOptions,
    selected: artefact,
    disabled: Boolean(artefactOwner),
    lockedMessage: artefactOwner
      ? `${artefactOwner.name} already has ${artefactOwner.artefact?.name}.`
      : null,
    onToggle: (option) => toggleExclusiveOption(setArtefact, option),
  });

  addSelectionGroup(canSelectHeroicTrait, {
    id: "heroic-traits",
    title: faction?.heroicTraitLabel ?? "HEROIC TRAITS",
    options: heroicTraitOptions,
    selected: heroicTrait,
    disabled: Boolean(heroicTraitOwner),
    lockedMessage: heroicTraitOwner
      ? `${heroicTraitOwner.name} already has ${heroicTraitOwner.heroicTrait?.name}.`
      : null,
    onToggle: (option) => toggleExclusiveOption(setHeroicTrait, option),
  });

  addSelectionGroup(canSelectMonstrousTrait, {
    id: "monstrous-traits",
    title: "MONSTROUS TRAITS",
    options: monstrousTraitOptions,
    selected: monstrousTrait,
    disabled: Boolean(monstrousTraitOwner),
    onToggle: (option) => toggleExclusiveOption(setMonstrousTrait, option),
  });

  [
    [canSelectAllConsumingObsession, "ALL-CONSUMING OBSESSIONS", allConsumingObsessionOptions, allConsumingObsession, setAllConsumingObsession],
    [canSelectMoulderMutation, "MOULDER MUTATIONS", moulderMutationOptions, moulderMutation, setMoulderMutation],
    [canSelectMortisanRefinement, "MORTISAN REFINEMENTS", mortisanRefinementOptions, mortisanRefinement, setMortisanRefinement],
    [canSelectOriginOfTerrifyingFolkTale, "ORIGINS OF TERRIFYING FOLK TALES", originOfTerrifyingFolkTaleOptions, originOfTerrifyingFolkTale, setOriginOfTerrifyingFolkTale],
    [canSelectVisionOfFate, "VISIONS OF FATE", visionOfFateOptions, visionOfFate, setVisionOfFate],
    [canSelectSpecialKnickKnack, "SPECIAL KNICK-KNACKS", specialKnickKnackOptions, specialKnickKnack, setSpecialKnickKnack],
    [canSelectFlawlessManoeuvre, faction?.flawlessManoeuvreLabel ?? "FLAWLESS MANOEUVRES", flawlessManoeuvreOptions, flawlessManoeuvre, setFlawlessManoeuvre],
    [canSelectPlaguefathersPox, "PLAGUEFATHER'S POX", plaguefathersPoxOptions, plaguefathersPox, setPlaguefathersPox],
    [canSelectDecorationForValour, "DECORATIONS FOR VALOUR", decorationForValourOptions, decorationForValour, setDecorationForValour],
    [canSelectIronweldInnovation, faction?.ironweldInnovationLabel ?? "IRONWELD INNOVATIONS", ironweldInnovationOptions, ironweldInnovation, setIronweldInnovation],
    [canSelectAccursedDevice, "ACCURSED DEVICES", accursedDeviceOptions, accursedDevice, setAccursedDevice],
    [canSelectBrazenMutation, "BRAZEN MUTATIONS", brazenMutationOptions, brazenMutation, setBrazenMutation],
    [canSelectBrandOfDarkGod, "BRANDS OF THE DARK GODS", brandOfDarkGodOptions, brandOfDarkGod, setBrandOfDarkGod],
    [canSelectEnsorcelledBanner, "ENSORCELLED BANNERS", ensorcelledBannerOptions, ensorcelledBanner, setEnsorcelledBanner],
    [canSelectBoonOfShadow, "BOONS OF SHADOW", boonOfShadowOptions, boonOfShadow, setBoonOfShadow],
  ].forEach(([condition, title, options, selected, setter]) => {
    addSelectionGroup(condition, {
      id: String(title).toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title,
      options,
      selected,
      onToggle: (option) => toggleExclusiveOption(setter, option),
    });
  });

  addSelectionGroup(!hasExactEnhancementEligibility && canSelectAqshyEnhancement, {
    id: "aqshy-enhancement",
    title: aqshyEnhancementOptions[0]?.groupName ?? "AQSHY ENHANCEMENTS",
    options: aqshyEnhancementOptions,
    selected: aqshyEnhancement,
    disabled: Boolean(aqshyEnhancementOwner),
    onToggle: (option) => toggleExclusiveOption(setAqshyEnhancement, option),
  });

  specialEnhancementGroups.forEach(({ category, options }) => {
    addSelectionGroup(true, {
      id: category,
      title: category,
      options,
      selected: specialEnhancements[category] ?? null,
      isOptionDisabled: (option) => Boolean(findSpecialEnhancementOwner(category, option.id)),
      onToggle: (option) => setSpecialEnhancements((previous) => ({
        ...previous,
        [category]: previous[category]?.id === option.id ? null : option,
      })),
    });
  });

  const listPoints = list
    ? calculateArmyPoints(list) +
      (mode === "editUnit" ? totalPoints - getUnitPoints(unit) : totalPoints)
    : totalPoints;
  const pointsLimit = Number(list?.pointsLimit ?? list?.points) || 0;
  const edited = configuredUnit();
  const editedRegiment = list?.regiments?.find((r) => r.hero?.instanceId === unit.instanceId);
  let previewList = list ? { ...list,
    generalRegimentId: editedRegiment ? general ? editedRegiment.id : getGeneralRegimentId(list) === editedRegiment.id ? null : getGeneralRegimentId(list) : getGeneralRegimentId(list),
    regiments: list.regiments.map((r) => ({ ...r, hero: r.hero?.instanceId === unit.instanceId ? edited : r.hero, units: r.units.map((u) => u.instanceId === unit.instanceId ? edited : u) })),
    auxiliaries: (list.auxiliaries ?? []).map((u) => u.instanceId === unit.instanceId ? edited : u),
  } : null;
  if (previewList && mode === "newRegiment") {
    const draftId = "draft-regiment";
    previewList = { ...previewList, generalRegimentId: general ? draftId : getGeneralRegimentId(list), regiments: [...previewList.regiments, { id: draftId, hero: { ...edited, instanceId: "draft-hero" }, units: [] }] };
  } else if (previewList && mode === "newUnit") {
    previewList = { ...previewList, regiments: previewList.regiments.map((r) => r.id === regimentId ? { ...r, units: [...r.units, { ...edited, instanceId: "draft-unit" }] } : r) };
  } else if (previewList && mode === "newAuxiliary") {
    previewList = { ...previewList, auxiliaries: [...previewList.auxiliaries, { ...edited, instanceId: "draft-auxiliary" }] };
  }
  const validation = validateArmyList(previewList);
  const hasIssues = validation.errors.length > 0 || validation.warnings.length > 0;
  const weapons = Array.isArray(unit.weapons) ? unit.weapons : [];

  function saveAndGoBack() {
    handleConfirm();
  }

  return (
    <main className="aos-official-page aos-official-unit-config">
      <header className="aos-official-header">
        <button type="button" onClick={saveAndGoBack} aria-label="Back">
          <OfficialIcon name="back" size={25} strokeWidth={2.5} />
        </button>
        <h1>{unit.name}</h1>
        <span aria-hidden="true" />
      </header>

      <section className="aos-official-config-summary">
        <strong>{unit.name}</strong>
        <span>{totalPoints}pts</span>
        <button type="button" onClick={onView} aria-label={`View ${unit.name} warscroll`}>
          <OfficialIcon name="reference" size={34} strokeWidth={1.8} />
        </button>
      </section>

      <div className="aos-official-config-content">
        {isHero && canBeGeneral && (
          <label className="aos-official-config-toggle">
            <strong>GENERAL</strong>
            <input
              type="checkbox"
              checked={general}
              onChange={(event) => setGeneral(event.target.checked)}
            />
            <span aria-hidden="true" />
          </label>
        )}

        <OfficialConfigPanel title="UNIT SIZE">
          <div className="aos-official-config-box">
            <strong>TOTAL MODELS: {totalModels}</strong>
            {canBeReinforced && (
              <label className="aos-official-config-toggle aos-official-config-toggle--nested">
                <strong>REINFORCED</strong>
                <input
                  type="checkbox"
                  checked={reinforced}
                  onChange={() => setReinforced((value) => !value)}
                />
                <span aria-hidden="true" />
              </label>
            )}
          </div>
        </OfficialConfigPanel>

        <OfficialConfigPanel title="WEAPONS">
          {weapons.length > 0 ? (
            <div className="aos-official-config-subgroups">
              {weapons.map((weapon) => (
                <details className="aos-official-config-subgroup" key={weapon.id ?? weapon.name}>
                  <summary>
                    <OfficialIcon name="chevronDown" size={22} strokeWidth={3} />
                    <strong>{weapon.name}</strong>
                  </summary>
                  <div className="aos-official-weapon-profile">
                    <span>Attacks <strong>{weapon.attacks ?? "-"}</strong></span>
                    <span>Hit <strong>{weapon.hit ?? "-"}</strong></span>
                    <span>Wound <strong>{weapon.wound ?? "-"}</strong></span>
                    <span>Rend <strong>{weapon.rend ?? "-"}</strong></span>
                    <span>Damage <strong>{weapon.damage ?? "-"}</strong></span>
                  </div>
                </details>
              ))}
            </div>
          ) : (
            <p className="aos-official-config-empty">No weapon options</p>
          )}
        </OfficialConfigPanel>

        {selectionGroups.map((group) => (
          <OfficialSelectionPanel key={group.id} {...group} />
        ))}
      </div>

      <button
        type="button"
        className={`aos-official-points aos-official-config-points${hasIssues ? " is-invalid" : ""}`}
        aria-label={`${listPoints} of ${pointsLimit} points. Ver validación`}
        onClick={() => setValidationOpen((open) => !open)}
        aria-expanded={validationOpen}
      >
        <span>{hasIssues ? <OfficialIcon name="warning" size={24} strokeWidth={2.4} /> : "✓"}</span>
        <strong>{listPoints}/{pointsLimit || "—"}</strong>
        <small>POINTS</small>
      </button>

      {validationOpen && <div className="aos-dialog-backdrop" onClick={() => setValidationOpen(false)}><section className="aos-action-dialog" role="dialog" aria-modal="true" aria-label="Validación del ejército" onClick={(event) => event.stopPropagation()}>
        <header><h2>Validación del ejército</h2><button type="button" onClick={() => setValidationOpen(false)} aria-label="Cerrar">×</button></header>
        <ArmyValidationPanel validation={validation} expanded onExpandedChange={() => setValidationOpen(false)} />
      </section></div>}
      <MainNav
        active="storm-forge"
        onReference={onRules}
        onStormForge={saveAndGoBack}
        onProfile={onSettings}
        onLists={onLists}
      />
    </main>
  );
}

function OfficialConfigPanel({ title, children }) {
  return (
    <details className="aos-official-config-panel">
      <summary>
        <strong>{title}</strong>
        <OfficialIcon name="chevronDown" size={22} strokeWidth={3} />
      </summary>
      <div className="aos-official-config-panel__body">{children}</div>
    </details>
  );
}

function OfficialSelectionPanel({
  title,
  options = [],
  selected,
  disabled = false,
  lockedMessage,
  isOptionDisabled = () => false,
  onToggle,
}) {
  const groups = options.reduce((result, option) => {
    const label = option.groupName ?? option.source ?? title;
    const existing = result.find((group) => group.label === label);
    if (existing) existing.options.push(option);
    else result.push({ label, options: [option] });
    return result;
  }, []);

  return (
    <OfficialConfigPanel title={String(title).toUpperCase()}>
      {lockedMessage && <p className="aos-enhancement-lock" role="status">{lockedMessage}</p>}
      <div className="aos-official-config-subgroups">
        {groups.map((group) => (
          <details className="aos-official-config-subgroup" key={group.label}>
            <summary>
              <strong>{group.label}</strong>
              <OfficialIcon name="chevronDown" size={20} strokeWidth={3} />
            </summary>
            {group.options[0]?.restrictionText && (
              <p className="aos-official-config-restriction">
                <span><FormattedRulesText text={group.options[0].restrictionText} /></span>
              </p>
            )}
            <div className="aos-official-config-options">
              {group.options.map((option) => (
                <OfficialEnhancementOption
                  key={option.id ?? option.name}
                  option={option}
                  checked={selected?.id === option.id}
                  disabled={disabled || isOptionDisabled(option)}
                  onChange={() => onToggle(option)}
                />
              ))}
            </div>
          </details>
        ))}
      </div>
    </OfficialConfigPanel>
  );
}

function OfficialEnhancementOption({ option, checked, disabled, onChange }) {
  const nestedAbilities = getEnhancementAbilities(option);
  const abilities = nestedAbilities.length > 0 ? nestedAbilities : [{
    ...option,
    phase: getEnhancementTiming(option),
  }];

  return (
    <article className="aos-official-config-option">
      <details open={checked}>
        <summary>
          <OfficialIcon name="chevronDown" size={20} strokeWidth={3} />
          <span>
            <strong>{option.name}</strong>
            {Number(option.points) > 0 && <small>{option.points} Points</small>}
          </span>
        </summary>
        <div className="aos-official-config-option__rules">
          {abilities.map((ability) => (
            <AbilityCard ability={ability} variant="enhancement" key={ability.id ?? ability.name} />
          ))}
        </div>
      </details>
      <label>
        <span className="aos-visually-hidden">Select {option.name}</span>
        <input type="checkbox" checked={checked} disabled={disabled} onChange={onChange} />
        <span aria-hidden="true" />
      </label>
    </article>
  );
}

export default UnitConfig;

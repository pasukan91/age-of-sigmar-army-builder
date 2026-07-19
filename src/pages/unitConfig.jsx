import { useState } from "react";

import Accordion from "../components/Accordion";
import BackButton from "../components/BackButton";

function UnitConfig({
  unit,
  faction,
  mode,
  goBack,
  onConfirm,
}) {
  const [reinforced, setReinforced] =
    useState(unit?.reinforced ?? false);

  const [heroicTrait, setHeroicTrait] =
    useState(unit?.heroicTrait ?? null);

  const [monstrousTrait, setMonstrousTrait] =
    useState(unit?.monstrousTrait ?? null);

  const [artefact, setArtefact] =
    useState(unit?.artefact ?? null);

  if (!unit) {
    return (
      <div style={{ padding: 20 }}>
        <BackButton onClick={goBack} />

        <p>
          No se ha seleccionado ninguna unidad.
        </p>
      </div>
    );
  }

  const keywords = Array.isArray(unit.keywords)
    ? unit.keywords.map((keyword) =>
        String(keyword).toLowerCase()
      )
    : [];

  const baseModels =
    Number(unit.details?.models) || 1;

  const isHero =
    unit.rules?.hero === true ||
    keywords.includes("hero");

  const isUnique =
    unit.rules?.unique === true ||
    keywords.includes("unique");

  const isMonster =
    unit.rules?.monster === true ||
    keywords.includes("monster");

  /*
   * Una unidad solamente puede reforzarse cuando:
   *
   * 1. No es Hero.
   * 2. Su tamaño inicial es mayor de 1.
   * 3. No está marcada explícitamente como no reforzable.
   */
  const canBeReinforced =
    !isHero &&
    baseModels > 1 &&
    unit.rules?.canBeReinforced !== false;

  const canSelectHeroicTrait =
    isHero && !isUnique;

  const canSelectArtefact =
    isHero && !isUnique;

  const canSelectMonsterTrait =
    isMonster && !isUnique;

  const artefactOptions = [
    ...(faction?.artefacts ?? []),
    ...(faction?.aqshyArtefacts ?? []),
  ];

  const totalModels = canBeReinforced && reinforced
    ? baseModels * 2
    : baseModels;

  const basePoints =
    Number(unit.points) || 0;

  const totalPoints =
    canBeReinforced && reinforced
      ? basePoints * 2
      : basePoints;

  function handleConfirm() {
    onConfirm({
      ...unit,

      reinforced:
        canBeReinforced && reinforced,

      heroicTrait: canSelectHeroicTrait
        ? heroicTrait
        : null,

      monstrousTrait: canSelectMonsterTrait
        ? monstrousTrait
        : null,

      artefact: canSelectArtefact
        ? artefact
        : null,

      configuredModels: totalModels,
    });
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 20,
        backgroundColor: "#eeeeee",
        color: "#111111",
      }}
    >
      <BackButton onClick={goBack} />

      <h1>{unit.name}</h1>

      <Accordion
        title="Resumen"
        defaultOpen
      >
        <p>
          <strong>Puntos:</strong>{" "}
          {totalPoints}
        </p>

        <p>
          <strong>Modelos:</strong>{" "}
          {totalModels}
        </p>

        <p>
          <strong>Salud:</strong>{" "}
          {unit.profile?.health ?? "-"}
        </p>

        <p>
          <strong>Salvación:</strong>{" "}
          {unit.profile?.save ?? "-"}
        </p>

        {isHero && (
          <p>
            <strong>Tipo:</strong> Héroe
          </p>
        )}

        {isUnique && (
          <p>
            <strong>Tipo:</strong> Única
          </p>
        )}
      </Accordion>

      {canBeReinforced && (
        <Accordion
          title="Tamaño de unidad"
          subtitle={
            reinforced
              ? `${totalModels} miniaturas`
              : `${baseModels} miniaturas`
          }
          defaultOpen
        >
          <label
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
              padding: 12,
              border: "1px solid #cccccc",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            <div>
              <strong>Unidad reforzada</strong>

              <p
                style={{
                  margin: "5px 0 0",
                  color: "#555555",
                }}
              >
                Duplica el tamaño y el coste de la
                unidad.
              </p>
            </div>

            <input
              type="checkbox"
              checked={reinforced}
              onChange={(event) =>
                setReinforced(
                  event.target.checked
                )
              }
              style={{
                width: 28,
                height: 28,
              }}
            />
          </label>

          <div
            style={{
              marginTop: 14,
              padding: 12,
              borderRadius: 8,
              backgroundColor: "#f3f3f3",
            }}
          >
            <p style={{ marginTop: 0 }}>
              <strong>
                Tamaño inicial:
              </strong>{" "}
              {baseModels} miniaturas
            </p>

            <p>
              <strong>
                Tamaño seleccionado:
              </strong>{" "}
              {totalModels} miniaturas
            </p>

            <p style={{ marginBottom: 0 }}>
              <strong>
                Coste seleccionado:
              </strong>{" "}
              {totalPoints} puntos
            </p>
          </div>
        </Accordion>
      )}

      {!isHero &&
        baseModels <= 1 && (
          <Accordion title="Tamaño de unidad">
            <p style={{ margin: 0 }}>
              Esta unidad tiene un tamaño inicial
              de una miniatura y no puede
              reforzarse.
            </p>
          </Accordion>
        )}

      {canSelectArtefact && (
        <SelectionSection
          title="Artefacto de poder"
          options={artefactOptions}
          selected={artefact}
          onSelect={setArtefact}
        />
      )}

      {canSelectHeroicTrait && (
        <SelectionSection
          title="Rasgo heroico"
          options={
            faction?.heroicTraits ?? []
          }
          selected={heroicTrait}
          onSelect={setHeroicTrait}
        />
      )}

      {canSelectMonsterTrait && (
        <SelectionSection
          title="Rasgo monstruoso"
          options={
            faction?.monsterTraits ?? []
          }
          selected={monstrousTrait}
          onSelect={setMonstrousTrait}
        />
      )}

      {isUnique && (
        <Accordion
          title="Mejoras"
          defaultOpen
        >
          <p style={{ margin: 0 }}>
            Esta unidad es{" "}
            <strong>Unique</strong> y no puede
            recibir artefactos ni rasgos.
          </p>
        </Accordion>
      )}

      <button
        type="button"
        onClick={handleConfirm}
        style={{
          width: "100%",
          padding: 16,
          border: "none",
          borderRadius: 10,
          backgroundColor: "#000000",
          color: "#ffffff",
          fontSize: 18,
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        {mode === "newRegiment"
          ? "Crear regimiento"
          : "Añadir unidad"}
      </button>
    </div>
  );
}

function SelectionSection({
  title,
  options = [],
  selected,
  onSelect,
}) {
  return (
    <Accordion
      title={title}
      subtitle={
        selected
          ? selected.name
          : "Ninguno seleccionado"
      }
    >
      {options.length === 0 && (
        <p>No hay opciones disponibles.</p>
      )}

      <button
        type="button"
        onClick={() => onSelect(null)}
        style={{
          width: "100%",
          padding: 12,
          marginBottom: 10,
          border: "1px solid #cccccc",
          borderRadius: 8,
          backgroundColor:
            selected === null
              ? "#e5e5e5"
              : "#ffffff",
          color: "#111111",
          textAlign: "left",
          cursor: "pointer",
        }}
      >
        Ninguno
      </button>

      {options.map((option) => (
        <div
          key={option.id}
          style={{
            marginBottom: 10,
            border: "1px solid #cccccc",
            borderRadius: 8,
            overflow: "hidden",
            backgroundColor: "#ffffff",
          }}
        >
          <label
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              padding: 12,
              backgroundColor:
                selected?.id === option.id
                  ? "#e5e5e5"
                  : "#ffffff",
              cursor: "pointer",
            }}
          >
            <div>
              <strong>{option.name}</strong>

              {Number(option.points) > 0 && (
                <p
                  style={{
                    margin: "4px 0 0",
                  }}
                >
                  {Number(option.points)} puntos
                </p>
              )}
            </div>

            <input
              type="radio"
              name={title}
              checked={
                selected?.id === option.id
              }
              onChange={() =>
                onSelect(option)
              }
              style={{
                width: 24,
                height: 24,
              }}
            />
          </label>

          {option.description && (
            <div
              style={{
                padding: "0 10px 10px",
              }}
            >
              <Accordion title="Descripción">
                <p
                  style={{
                    margin: 0,
                    whiteSpace: "pre-line",
                  }}
                >
                  {option.description}
                </p>
              </Accordion>
            </div>
          )}
        </div>
      ))}
    </Accordion>
  );
}

export default UnitConfig;
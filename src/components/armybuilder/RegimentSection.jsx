function RegimentSection({
  list,
  setSelector,
  setPage,
}) {
  const factionUnits = Array.isArray(list.faction?.units)
    ? list.faction.units
    : [];

  const availableHeroes = factionUnits.filter(
    (unit) => unit.rules?.hero === true
  );

  function isWarmaster(unit) {
    return (
      unit.rules?.warmaster === true ||
      unit.keywords?.includes("Warmaster")
    );
  }

  function getRegimentLimit(regimentIndex) {
    return regimentIndex === 0 ? 4 : 3;
  }

  function unitMatchesOption(unit, option) {
    const normalizedOption = option
      .toLowerCase()
      .trim();

    const keywords = Array.isArray(unit.keywords)
      ? unit.keywords.map((keyword) =>
          keyword.toLowerCase()
        )
      : [];

    if (
      normalizedOption === "any faction unit" ||
      normalizedOption === "any kruleboyz" ||
      normalizedOption === "any hedonites of slaanesh"
    ) {
      return true;
    }

    if (
      normalizedOption.includes("kruleboyz") &&
      keywords.includes("kruleboyz")
    ) {
      return true;
    }

    if (
      normalizedOption.includes("hedonites of slaanesh") &&
      keywords.includes("hedonites of slaanesh")
    ) {
      return true;
    }

    return keywords.some((keyword) =>
      normalizedOption.includes(keyword)
    );
  }

  function getAvailableUnits(regiment) {
    const regimentOptions =
      regiment.hero.details?.regimentOptions ?? [];

    return factionUnits.filter((unit) => {
      /*
       * El líder del regimiento no puede volver
       * a añadirse dentro del mismo regimiento.
       */
      if (unit.id === regiment.hero.id) {
        return false;
      }

      /*
       * Los Warmaster no pueden añadirse como
       * unidades subordinadas.
       */
      if (isWarmaster(unit)) {
        return false;
      }

      /*
       * Hasta que rellenemos las opciones de
       * regimiento, permitimos cualquier unidad
       * de la facción excepto las bloqueadas arriba.
       */
      if (regimentOptions.length === 0) {
        return true;
      }

      return regimentOptions.some((option) =>
        unitMatchesOption(unit, option)
      );
    });
  }

  return (
    <div
      style={{
        padding: 20,
      }}
    >
      <h2>Regimientos</h2>

      {list.regiments.length === 0 && (
        <p>No hay ningún regimiento añadido.</p>
      )}

      {list.regiments.map(
        (regiment, regimentIndex) => {
          const regimentLimit =
            getRegimentLimit(regimentIndex);

          const occupiedSlots =
            regiment.units.length;

          const availableSlots =
            regimentLimit - occupiedSlots;

          const isGeneralRegiment =
            regimentIndex === 0;

          const regimentIsFull =
            availableSlots <= 0;

          const selectableUnits =
            getAvailableUnits(regiment);

          return (
            <div
              key={regiment.id}
              style={{
                border: "1px solid gray",
                borderRadius: 8,
                padding: 15,
                marginBottom: 20,
              }}
            >
              <h3>
                Regimiento {regimentIndex + 1}
                {isGeneralRegiment
                  ? " — General"
                  : ""}
              </h3>

              <p>
                Unidades: {occupiedSlots}/
                {regimentLimit}
              </p>

              <div
                style={{
                  border: "1px solid lightgray",
                  borderRadius: 8,
                  padding: 12,
                  marginBottom: 15,
                }}
              >
                <strong>
                  {regiment.hero.name}
                </strong>

                <p style={{ marginBottom: 0 }}>
                  {regiment.hero.points} pts
                </p>

                {isWarmaster(regiment.hero) && (
                  <p>
                    <strong>Warmaster</strong>
                  </p>
                )}

                {regiment.hero.heroicTrait && (
                  <p>
                    Rasgo heroico:{" "}
                    {regiment.hero.heroicTrait.name}
                  </p>
                )}

                {regiment.hero.artefact && (
                  <p>
                    Artefacto:{" "}
                    {regiment.hero.artefact.name}
                  </p>
                )}

                {regiment.hero.monstrousTrait && (
                  <p>
                    Rasgo monstruoso:{" "}
                    {
                      regiment.hero
                        .monstrousTrait.name
                    }
                  </p>
                )}
              </div>

              <div>
                <h4>Unidades</h4>

                {regiment.units.length === 0 && (
                  <p>
                    No hay unidades en este
                    regimiento.
                  </p>
                )}

                {regiment.units.map((unit) => (
                  <div
                    key={unit.instanceId}
                    style={{
                      border:
                        "1px solid lightgray",
                      borderRadius: 8,
                      padding: 12,
                      marginBottom: 10,
                    }}
                  >
                    <strong>{unit.name}</strong>

                    <p style={{ marginBottom: 0 }}>
                      {unit.points} pts
                    </p>

                    {unit.rules?.hero && (
                      <p style={{ marginBottom: 0 }}>
                        Héroe
                      </p>
                    )}

                    {unit.reinforced && (
                      <p style={{ marginBottom: 0 }}>
                        Reforzada
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <button
                type="button"
                disabled={
                  regimentIsFull ||
                  selectableUnits.length === 0
                }
                onClick={() => {
                  setSelector({
                    title: `Añadir unidad a ${regiment.hero.name}`,

                    property: "newUnit",

                    regimentId: regiment.id,

                    options: selectableUnits,
                  });

                  setPage("selector");
                }}
                style={{
                  opacity:
                    regimentIsFull ||
                    selectableUnits.length === 0
                      ? 0.5
                      : 1,

                  cursor:
                    regimentIsFull ||
                    selectableUnits.length === 0
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                {regimentIsFull
                  ? "Regimiento completo"
                  : selectableUnits.length === 0
                    ? "No hay unidades disponibles"
                    : `+ Añadir Unidad (${availableSlots} plazas)`}
              </button>
            </div>
          );
        }
      )}

      <button
        type="button"
        onClick={() => {
          setSelector({
            title: "Selecciona un héroe",

            property: "newRegiment",

            regimentId: null,

            options: availableHeroes,
          });

          setPage("selector");
        }}
        disabled={availableHeroes.length === 0}
      >
        + Añadir Regimiento
      </button>

      {availableHeroes.length === 0 && (
        <p>
          Esta facción todavía no tiene héroes
          disponibles en su archivo units.js.
        </p>
      )}
    </div>
  );
}

export default RegimentSection;
import BackButton from "../components/BackButton";

import {
  createArmyList,
} from "../models/ArmyList";

function NewListConfig({
  army,
  setArmy,
  setLists,
  setCurrentList,
  setPage,
  onBack,
}) {
  function handleCreateList() {
    if (!army.faction) {
      window.alert(
        "Debes seleccionar una facción."
      );

      return;
    }

    const newList = createArmyList({
      name:
        army.name.trim() ||
        "Nueva Lista",

      faction: army.faction,
      alliance: army.alliance,
      pointsLimit: army.points,
      armyOfRenown: army.armyOfRenown,
    });

    setLists((previousLists) => [
      ...previousLists,
      newList,
    ]);

    setCurrentList(newList);
    setPage("builder");
  }

  return (
    <main className="aos-shell">
      <header className="aos-screen-header">
        <BackButton
          onClick={onBack}
          light
          compact
        />

        <h1 className="aos-screen-header__title">
          Nueva lista
        </h1>

        <span aria-hidden="true" />
      </header>

      <div className="aos-screen-content">
        <header className="aos-form-intro">
          <p className="aos-kicker">
            Storm Forge
          </p>

          <h2 className="aos-heading">
            {army.faction?.name ??
              "Selecciona una facción"}
          </h2>
        </header>

        <section className="aos-panel aos-form-panel">
          {army.faction?.armiesOfRenown?.length > 0 && (
            <label className="aos-field">
              <span className="aos-field__label">
                Tipo de ejército
              </span>

              <select
                autoFocus
                value={army.armyOfRenown?.id ?? "standard"}
                onChange={(event) => {
                  const selectedId = event.target.value;
                  const selectedArmy = army.faction.armiesOfRenown.find(
                    (option) => option.id === selectedId
                  ) ?? null;

                  setArmy((previousArmy) => ({
                    ...previousArmy,
                    armyOfRenown: selectedArmy,
                  }));
                }}
                className="aos-field__control"
              >
                <option value="standard">
                  Ejército estándar — {army.faction.name}
                </option>

                {army.faction.armiesOfRenown.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>

              <small className="aos-field__hint">
                La selección determina qué unidades estarán disponibles al crear los regimientos.
              </small>
            </label>
          )}

          <label className="aos-field">
            <span className="aos-field__label">
              Nombre de la lista
            </span>

            <input
              type="text"
              value={army.name}
              placeholder="Nueva Lista"
              onChange={(event) =>
                setArmy((previousArmy) => ({
                  ...previousArmy,
                  name: event.target.value,
                }))
              }
              className="aos-field__control"
            />
          </label>

          <label className="aos-field">
            <span className="aos-field__label">
              Límite de puntos
            </span>

            <select
              value={army.points}
              onChange={(event) =>
                setArmy((previousArmy) => ({
                  ...previousArmy,

                  points: Number(
                    event.target.value
                  ),
                }))
              }
              className="aos-field__control"
            >
              <option value={1000}>
                1000 puntos
              </option>

              <option value={1500}>
                1500 puntos
              </option>

              <option value={2000}>
                2000 puntos
              </option>

              <option value={2500}>
                2500 puntos
              </option>

              <option value={3000}>
                3000 puntos
              </option>
            </select>
          </label>
        </section>

        <button
          type="button"
          onClick={handleCreateList}
          className="aos-primary-action"
          style={{ marginTop: 16 }}
        >
          Crear lista
        </button>
      </div>
    </main>
  );
}

export default NewListConfig;

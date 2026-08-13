import BackButton from "../components/BackButton";
import ContextNote from "../components/ContextNote";
import StepProgress from "../components/StepProgress";

import {
  createArmyList,
} from "../models/ArmyList";

function NewListConfig({
  army,
  setArmy,
  setLists,
  setCurrentList,
  setPage,
  onListCreated,
  onBack,
}) {
  const suggestedName = `${army.faction?.name ?? "Age of Sigmar"} · ${army.points} pts`;

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
        suggestedName,

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
    onListCreated?.();
    setPage("builder", { listId: newList.id, resetToLists: true });
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
          <StepProgress
            steps={["Alianza", "Facción", "Tipo", "Detalles"]}
            current={4}
          />
          <p className="aos-kicker">
            Storm Forge
          </p>

          <h2 className="aos-heading">
            {army.faction?.name ??
              "Selecciona una facción"}
          </h2>
        </header>

        <ContextNote title="Último paso">
          Ponle un nombre reconocible y elige el tamaño de partida. Después podrás
          añadir regimientos, unidades y reglas desde el constructor.
        </ContextNote>

        <section className="aos-panel aos-form-panel">
          <div className="aos-new-list-summary" aria-label="Tipo de ejército elegido">
            <span>Tipo de ejército</span>
            <strong>{army.armyOfRenown?.name ?? `Ejército estándar — ${army.faction?.name}`}</strong>
          </div>

          <label className="aos-field">
            <span className="aos-field__label">
              Nombre de la lista
            </span>

            <input
              autoFocus
              type="text"
              value={army.name}
              placeholder={suggestedName}
              onChange={(event) =>
                setArmy((previousArmy) => ({
                  ...previousArmy,
                  name: event.target.value,
                }))
              }
              className="aos-field__control"
            />
            <small className="aos-field__hint">
              Si lo dejas vacío, usaremos “{suggestedName}”.
            </small>
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

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
    });

    setLists((previousLists) => [
      ...previousLists,
      newList,
    ]);

    setCurrentList(newList);
    setPage("builder");
  }

  function handleGoHome() {
    setCurrentList(null);

    setArmy({
      alliance: null,
      faction: null,
      points: 2000,
      name: "",
    });

    setPage("home");
  }

  return (
    <main style={styles.page}>
      <div style={styles.container}>
        <BackButton onClick={handleGoHome} />

        <header style={styles.header}>
          <p style={styles.eyebrow}>
            Nueva lista
          </p>

          <h1 style={styles.title}>
            {army.faction?.name ??
              "Selecciona una facción"}
          </h1>
        </header>

        <section style={styles.card}>
          <label style={styles.label}>
            Nombre de la lista
          </label>

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
            style={styles.input}
          />

          <label style={styles.label}>
            Límite de puntos
          </label>

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
            style={styles.select}
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
        </section>

        <button
          type="button"
          onClick={handleCreateList}
          style={styles.createButton}
        >
          Crear lista
        </button>
      </div>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: 20,
    backgroundColor: "#eeeeee",
    color: "#111111",
  },

  container: {
    width: "100%",
    maxWidth: 720,
    margin: "0 auto",
  },

  header: {
    marginBottom: 20,
    textAlign: "center",
  },

  eyebrow: {
    margin: "0 0 5px",
    color: "#666666",
    fontSize: 13,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },

  title: {
    margin: 0,
  },

  card: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#ffffff",
  },

  label: {
    display: "block",
    marginBottom: 7,
    fontWeight: 700,
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: 13,
    marginBottom: 20,
    border: "1px solid #bbbbbb",
    borderRadius: 8,
    fontSize: 16,
  },

  select: {
    width: "100%",
    boxSizing: "border-box",
    padding: 13,
    border: "1px solid #bbbbbb",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    fontSize: 16,
  },

  createButton: {
    width: "100%",
    padding: 16,
    marginTop: 18,
    border: "none",
    borderRadius: 10,
    backgroundColor: "#000000",
    color: "#ffffff",
    fontSize: 18,
    fontWeight: 700,
    cursor: "pointer",
  },
};

export default NewListConfig;
function Home({
  onNewList,
  onMyLists,
}) {
  return (
    <main style={styles.page}>
      <section style={styles.content}>
        <p style={styles.eyebrow}>
          Warhammer Age of Sigmar
        </p>

        <h1 style={styles.title}>
          Army Builder
        </h1>

        <button
          type="button"
          onClick={onMyLists}
          style={styles.secondaryButton}
        >
          <span aria-hidden="true">
            📜
          </span>

          Mis listas
        </button>

        <button
          type="button"
          onClick={onNewList}
          style={styles.primaryButton}
        >
          <span aria-hidden="true">
            ＋
          </span>

          Nueva lista
        </button>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    background:
      "linear-gradient(180deg, #851c13 0%, #68120c 42%, #171b1c 42%)",
    color: "#ffffff",
  },

  content: {
    width: "100%",
    maxWidth: 420,
    padding: 28,
    border:
      "1px solid rgba(255,255,255,0.18)",
    borderRadius: 8,
    backgroundColor:
      "rgba(17, 21, 22, 0.94)",
    boxShadow:
      "0 16px 40px rgba(0,0,0,0.38)",
    textAlign: "center",
  },

  eyebrow: {
    margin: "0 0 7px",
    color: "#d8b354",
    fontSize: 13,
    fontWeight: 800,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  },

  title: {
    margin: "0 0 30px",
    fontFamily:
      '"Oswald", "Arial Narrow", sans-serif',
    fontSize: 38,
    textTransform: "uppercase",
  },

  primaryButton: {
    width: "100%",
    minHeight: 58,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: 15,
    border: "none",
    borderRadius: 4,
    backgroundColor: "#8e1b13",
    color: "#ffffff",
    fontSize: 18,
    fontWeight: 800,
    textTransform: "uppercase",
    cursor: "pointer",
  },

  secondaryButton: {
    width: "100%",
    minHeight: 58,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: 15,
    marginBottom: 12,
    border: "1px solid #d8b354",
    borderRadius: 4,
    backgroundColor: "#f3f1eb",
    color: "#1d2324",
    fontSize: 18,
    fontWeight: 800,
    textTransform: "uppercase",
    cursor: "pointer",
  },
};

export default Home;
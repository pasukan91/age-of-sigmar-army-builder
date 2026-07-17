function Home({ onNewList, onMyLists }) {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Age of Sigmar Army Builder</h1>

      <button
        onClick={onMyLists}
        style={{
          display: "block",
          margin: "20px auto",
          padding: "20px",
          width: "250px",
        }}
      >
        📜 Mis listas
      </button>

      <button
        onClick={onNewList}
        style={{
          display: "block",
          margin: "20px auto",
          padding: "20px",
          width: "250px",
        }}
      >
        ➕ Nueva lista
      </button>
    </div>
  );
}

export default Home;
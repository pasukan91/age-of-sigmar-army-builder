function MyLists({ goBack }) {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Mis listas</h1>

      <p>Aún no tienes listas guardadas.</p>

      <button onClick={goBack}>Volver</button>
    </div>
  );
}

export default MyLists;
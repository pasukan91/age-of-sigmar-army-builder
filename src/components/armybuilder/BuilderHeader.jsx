function BuilderHeader({ list }) {
  return (
    <div
      style={{
        padding: 20,
        borderBottom: "1px solid #ccc",
        textAlign: "center",
      }}
    >
      <h1>{list.name}</h1>

      <h2>{list.faction.name}</h2>

      <h3>
        0 / {list.pointsLimit} pts
      </h3>
    </div>
  );
}

export default BuilderHeader;
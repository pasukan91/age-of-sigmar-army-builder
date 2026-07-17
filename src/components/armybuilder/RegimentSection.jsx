function RegimentSection({
  list,
  setSelector,
  setPage,
}) {

  return (
    <div
      style={{
        padding: 20,
      }}
    >
      <button
        onClick={() => {

          setSelector({

            title: "Seleccionar General",

            property: "newRegiment",

            options: list.faction.units.filter(
              unit => unit.keywords.includes("Hero")
            )

          });

          setPage("selector");

        }}
      >
        + Añadir Regimiento
      </button>
    </div>
  );
}

export default RegimentSection;
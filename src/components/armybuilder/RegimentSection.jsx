

function RegimentSection({
  list,
  setSelector,
  setPage,
}) {
  console.log(list.regiments);
  return (
    <div
      style={{
        padding: 20,
      }}
    >
      <h2>Regiments</h2>

      {list.regiments.map((regiment) => (
        <div
          key={regiment.id}
          style={{
            border: "1px solid gray",
            padding: 15,
            marginBottom: 20,
          }}
        >
          <h3>{regiment.hero.name}</h3>

          <p>{regiment.hero.points} pts</p>

          <button
            onClick={() => {
              setSelector({
                title: "Add Unit",
                property: "newUnit",
                regimentId: regiment.id,
                options: units.filter(
                  (unit) =>
                    !unit.rules.hero &&
                    regiment.hero.details.regimentOptions.some((option) =>
                      option === "Any Kruleboyz"
                        ? unit.keywords.includes("Kruleboyz")
                        : unit.keywords.includes(option)
                    )
                ),
              });

              setPage("selector");
            }}
          >
            + Añadir Unidad
          </button>
        </div>
      ))}

      <button
        onClick={() => {
          setSelector({
            title: "Selecciona un héroe",
            property: "newRegiment",
            options: units.filter((unit) => unit.rules.hero),
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
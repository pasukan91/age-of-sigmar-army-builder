import Accordion from "../components/Accordion";
import BackButton from "../components/BackButton";

function UnitWarscroll({
  unit,
  goBack,
  onConfigure,
}) {
  if (!unit) {
    return (
      <div style={{ padding: 20 }}>
        <BackButton onClick={goBack} />

        <p>
          No se ha seleccionado ninguna unidad.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#eeeeee",
        color: "#111111",
      }}
    >
      <header
        style={{
          padding: 20,
          backgroundColor: "#841c13",
          color: "#ffffff",
        }}
      >
        <button
          type="button"
          onClick={goBack}
          style={{
            border: "none",
            background: "transparent",
            color: "#ffffff",
            fontSize: 18,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          ← Volver
        </button>

        <h1 style={{ marginBottom: 0 }}>
          {unit.name}
        </h1>
      </header>

      <main style={{ padding: 20 }}>
        <section
          style={{
            padding: 18,
            marginBottom: 20,
            borderRadius: 10,
            backgroundColor: "#ffffff",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              alignItems: "center",
              gap: 20,
              flexWrap: "wrap",
            }}
          >
            <h2 style={{ margin: 0 }}>
              {unit.name}
            </h2>

            <strong
              style={{
                padding: "6px 12px",
                borderRadius: 6,
                backgroundColor: "#841c13",
                color: "#ffffff",
              }}
            >
              {unit.points} pts
            </strong>
          </div>
        </section>

        <Accordion
          title="Perfil"
          defaultOpen
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(120px, 1fr))",
              gap: 12,
            }}
          >
            <Stat
              label="Movimiento"
              value={unit.profile?.move}
            />

            <Stat
              label="Salud"
              value={unit.profile?.health}
            />

            <Stat
              label="Control"
              value={unit.profile?.control}
            />

            <Stat
              label="Salvación"
              value={unit.profile?.save}
            />

            <Stat
              label="Ward"
              value={unit.profile?.ward}
            />
          </div>
        </Accordion>

        <Accordion
          title="Armas"
          subtitle={`${unit.weapons?.length ?? 0} perfiles`}
        >
          {(!unit.weapons ||
            unit.weapons.length === 0) && (
            <p>
              Esta unidad no tiene armas
              registradas.
            </p>
          )}

          {unit.weapons?.map(
            (weapon, index) => (
              <Accordion
                key={`${weapon.name}-${index}`}
                title={weapon.name}
                subtitle={
                  weapon.type || "Melee"
                }
              >
                {weapon.type ===
                  "Ranged" && (
                  <p>
                    <strong>
                      Alcance:
                    </strong>{" "}
                    {weapon.range}
                  </p>
                )}

                <p>
                  <strong>Ataques:</strong>{" "}
                  {weapon.attacks}
                </p>

                <p>
                  <strong>
                    Impactar:
                  </strong>{" "}
                  {weapon.hit}
                </p>

                <p>
                  <strong>Herir:</strong>{" "}
                  {weapon.wound}
                </p>

                <p>
                  <strong>Rend:</strong>{" "}
                  {weapon.rend}
                </p>

                <p>
                  <strong>Daño:</strong>{" "}
                  {weapon.damage}
                </p>

                {weapon.abilities?.length >
                  0 && (
                  <Accordion title="Habilidades del arma">
                    {weapon.abilities.map(
                      (
                        weaponAbility,
                        abilityIndex
                      ) => (
                        <p
                          key={`${weaponAbility}-${abilityIndex}`}
                          style={{
                            margin:
                              abilityIndex === 0
                                ? 0
                                : "10px 0 0",
                          }}
                        >
                          {weaponAbility}
                        </p>
                      )
                    )}
                  </Accordion>
                )}
              </Accordion>
            )
          )}
        </Accordion>

        <Accordion
          title="Habilidades"
          subtitle={`${unit.abilities?.length ?? 0} habilidades`}
        >
          {(!unit.abilities ||
            unit.abilities.length === 0) && (
            <p>
              Esta unidad no tiene habilidades
              registradas.
            </p>
          )}

          {unit.abilities?.map(
            (ability, index) => (
              <Accordion
                key={`${ability.name}-${index}`}
                title={ability.name}
                subtitle={
                  ability.phase ||
                  ability.type
                }
              >
                {ability.castingValue && (
                  <p>
                    <strong>
                      Valor de lanzamiento:
                    </strong>{" "}
                    {ability.castingValue}
                  </p>
                )}

                <Accordion
                  title="Descripción"
                  defaultOpen
                >
                  <p
                    style={{
                      margin: 0,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {ability.description}
                  </p>
                </Accordion>

                {ability.keywords?.length >
                  0 && (
                  <Accordion title="Keywords">
                    <p style={{ margin: 0 }}>
                      {ability.keywords.join(
                        ", "
                      )}
                    </p>
                  </Accordion>
                )}
              </Accordion>
            )
          )}
        </Accordion>

        <Accordion title="Detalles">
          <p>
            <strong>Modelos:</strong>{" "}
            {unit.details?.models ?? "-"}
          </p>

          <p>
            <strong>Peana:</strong>{" "}
            {unit.details?.baseSize ?? "-"}
          </p>

          {unit.details?.notes && (
            <Accordion title="Notas">
              <p
                style={{
                  margin: 0,
                  whiteSpace: "pre-line",
                }}
              >
                {unit.details.notes}
              </p>
            </Accordion>
          )}
        </Accordion>

        <Accordion title="Keywords">
          <p style={{ margin: 0 }}>
            {unit.keywords?.join(", ")}
          </p>
        </Accordion>

        <button
          type="button"
          onClick={() => onConfigure(unit)}
          style={{
            width: "100%",
            padding: 16,
            border: "none",
            borderRadius: 10,
            backgroundColor: "#000000",
            color: "#ffffff",
            fontSize: 18,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Añadir a la lista
        </button>
      </main>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div
      style={{
        padding: 12,
        borderRadius: 8,
        backgroundColor: "#222222",
        color: "#ffffff",
        textAlign: "center",
      }}
    >
      <strong
        style={{
          display: "block",
          marginBottom: 4,
          fontSize: 20,
        }}
      >
        {value ?? "-"}
      </strong>

      <span>{label}</span>
    </div>
  );
}

export default UnitWarscroll;
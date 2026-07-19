import Accordion from "../components/Accordion";
import BackButton from "../components/BackButton";

function OptionSelector({
    title,
    options = [],
    onView,
    onConfigure,
    goBack,
}) {
    function hasWarscroll(option) {
        return Boolean(
            option.rules ||
            option.details ||
            option.weapons
        );
    }

    function hasConfiguration(option) {
        return Boolean(onConfigure);
    }

    function getDescription(option) {
        if (option.description) {
            return option.description;
        }

        if (option.ability?.description) {
            return option.ability.description;
        }

        return null;
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                padding: 20,
                backgroundColor: "#f2f2f2",
                color: "#111111",
            }}
        >
            <BackButton onClick={goBack} />

            <h1
                style={{
                    marginTop: 0,
                    marginBottom: 24,
                    color: "#111111",
                }}
            >
                {title}
            </h1>

            {options.length === 0 && (
                <div
                    style={{
                        padding: 20,
                        borderRadius: 10,
                        backgroundColor: "#ffffff",
                        color: "#111111",
                    }}
                >
                    No hay opciones disponibles.
                </div>
            )}

            {options.map((option) => {
                const description =
                    getDescription(option);

                return (
                    <article
                        key={option.id}
                        style={{
                            padding: 16,
                            marginBottom: 14,
                            border:
                                "1px solid #d0d0d0",
                            borderRadius: 10,
                            backgroundColor: "#ffffff",
                            color: "#111111",
                            boxShadow:
                                "0 2px 6px rgba(0, 0, 0, 0.08)",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "flex-start",
                                justifyContent:
                                    "space-between",
                                gap: 16,
                                marginBottom:
                                    description ? 14 : 0,
                            }}
                        >
                            <div
                                style={{
                                    flex: 1,
                                    minWidth: 0,
                                }}
                            >
                                <h2
                                    style={{
                                        margin: "0 0 8px",
                                        color: "#111111",
                                        fontSize: 22,
                                    }}
                                >
                                    {option.name}
                                </h2>

                                {typeof option.points ===
                                    "number" && (
                                        <p
                                            style={{
                                                margin: "0 0 6px",
                                                color: "#7f1d14",
                                                fontWeight: 700,
                                            }}
                                        >
                                            {option.points} pts
                                        </p>
                                    )}

                                {option.profile && (
                                    <p
                                        style={{
                                            margin: 0,
                                            color: "#444444",
                                            lineHeight: 1.5,
                                        }}
                                    >
                                        Movimiento:{" "}
                                        {option.profile.move ??
                                            "-"}{" "}
                                        · Salud:{" "}
                                        {option.profile.health ??
                                            "-"}{" "}
                                        · Control:{" "}
                                        {option.profile.control ??
                                            "-"}{" "}
                                        · Salvación:{" "}
                                        {option.profile.save ??
                                            "-"}
                                    </p>
                                )}
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 8,
                                    flexShrink: 0,
                                }}
                            >
                                {hasWarscroll(option) &&
                                    onView && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                onView(option)
                                            }
                                            style={{
                                                minWidth: 130,
                                                padding:
                                                    "10px 14px",
                                                border:
                                                    "1px solid #222222",
                                                borderRadius: 8,
                                                backgroundColor:
                                                    "#ffffff",
                                                color: "#111111",
                                                fontWeight: 700,
                                                cursor: "pointer",
                                            }}
                                        >
                                            Ver warscroll
                                        </button>
                                    )}

                                {hasConfiguration(
                                    option
                                ) && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                onConfigure(option)
                                            }
                                            style={{
                                                minWidth: 130,
                                                padding:
                                                    "10px 14px",
                                                border:
                                                    "1px solid #000000",
                                                borderRadius: 8,
                                                backgroundColor:
                                                    "#000000",
                                                color: "#ffffff",
                                                fontWeight: 700,
                                                cursor: "pointer",
                                            }}
                                        >
                                            Seleccionar
                                        </button>
                                    )}
                            </div>
                        </div>

                        {description && (
                            <Accordion title="Descripción">
                                <p
                                    style={{
                                        margin: 0,
                                        whiteSpace:
                                            "pre-line",
                                    }}
                                >
                                    {description}
                                </p>
                            </Accordion>
                        )}
                    </article>
                );
            })}
        </div>
    );
}

export default OptionSelector;
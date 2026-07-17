function OptionSelector({
    title,
    options,
    onSelect,
    goBack
}) {
    return (
        <div style={{ padding: 20 }}>

            <button onClick={goBack}>
                ← Volver
            </button>

            <h1>{title}</h1>

            {options.map(option => (

                <div
                    key={option.id}
                    onClick={() => onSelect(option)}
                    style={{
                        border: "1px solid gray",
                        marginBottom: 15,
                        padding: 15,
                        cursor: "pointer"
                    }}
                >

                    <h2>{option.name}</h2>

                    <p>{option.description}</p>

                </div>

            ))}

        </div>
    );
}

export default OptionSelector;
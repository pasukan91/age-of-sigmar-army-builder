import ChevronIcon from "../ChevronIcon";

function SelectedRulesLibrary({ list, onViewRule }) {
  const groups = [
    {
      title: "Hechizos",
      sourceName: list?.spellLore?.name,
      kind: "spell",
      items: list?.spellLore?.spells,
    },
    {
      title: "Plegarias",
      sourceName: list?.prayerLore?.name,
      kind: "prayer",
      items: list?.prayerLore?.prayers,
    },
    {
      title: "Manifestaciones",
      sourceName: list?.manifestationLore?.name,
      kind: "manifestation",
      items: list?.manifestationLore?.manifestations,
    },
    {
      title: "Escenografía de facción",
      sourceName: "Terreno de facción",
      kind: "terrain",
      items: list?.terrain ? [list.terrain] : [],
    },
  ].filter((group) => Array.isArray(group.items) && group.items.length > 0);

  if (groups.length === 0) {
    return null;
  }

  return (
    <section className="aos-selected-rules" aria-labelledby="selected-rules-title">
      <header className="aos-selected-rules__header">
        <span className="aos-eyebrow">Biblioteca de batalla</span>
        <h2 id="selected-rules-title">Warscrolls y reglas seleccionadas</h2>
        <p>Abre cada ficha para consultar sus requisitos, fase y efecto durante la partida.</p>
      </header>

      {groups.map((group) => (
        <div className="aos-selected-rules__group" key={group.kind}>
          <div className="aos-selected-rules__group-title">
            <h3>{group.title}</h3>
            {group.sourceName && <span>{group.sourceName}</span>}
          </div>

          <div className="aos-selected-rules__grid">
            {group.items.map((rawItem) => {
              const item = normalizeItem(rawItem);

              return (
                <button
                  type="button"
                  className="aos-rule-link-card"
                  key={item.id}
                  onClick={() => onViewRule?.({
                    kind: group.kind,
                    item,
                    sourceName: group.sourceName,
                  })}
                >
                  {item.image && (
                    <img
                      className="aos-rule-link-card__image"
                      src={item.image}
                      alt=""
                      loading="lazy"
                    />
                  )}
                  <span>
                    <small>{getKindLabel(group.kind)}</small>
                    <strong>{item.name}</strong>
                    <em>{getRuleSummary(group.kind, item)}</em>
                  </span>
                  <i aria-hidden="true"><ChevronIcon direction="right" size={8} /></i>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}

function normalizeItem(item) {
  if (typeof item !== "string") {
    return {
      ...item,
      image: resolveManifestationImage(item.id, item.image),
    };
  }

  return {
    id: item,
    name: item
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" "),
    image: resolveManifestationImage(item),
    dataPending: true,
  };
}

function resolveManifestationImage(id, image) {
  const manifestationImages = {
    "dreadful-visage": "/images/manifestations/dreadful-visage.webp",
    "mesmerising-mirror": "/images/manifestations/mesmerising-mirror.webp",
    "wheels-of-excruciation": "/images/manifestations/wheels-of-excruciation.webp",
    vermintide: "/images/manifestations/skaven-manifestations.webp",
    "warp-lightning-vortex": "/images/manifestations/warp-lightning-vortex.webp",
    "bell-of-doom": "/images/manifestations/skaven-manifestations.webp",
  };

  return manifestationImages[id] ?? image;
}

function getKindLabel(kind) {
  return {
    spell: "Hechizo",
    prayer: "Plegaria",
    manifestation: "Manifestación",
    terrain: "Escenografía",
  }[kind] ?? "Regla";
}

function getRuleSummary(kind, item) {
  if (item.dataPending) {
    return "Perfil pendiente de incorporar";
  }

  if (kind === "manifestation") {
    return `Invocación ${item.castingValue ?? "-"}+ · Destierro ${item.profile?.banishment ?? "-"}`;
  }

  if (kind === "spell") {
    return `Lanzamiento ${item.castingValue ?? "-"}+ · ${item.phase ?? "Fase indicada"}`;
  }

  if (kind === "prayer") {
    return `Canto ${item.chantingValue ?? item.castingValue ?? "-"}+ · ${item.phase ?? "Fase indicada"}`;
  }

  return `${item.profile?.health ?? "-"} heridas · Salvación ${item.profile?.save ?? "-"}`;
}

export default SelectedRulesLibrary;

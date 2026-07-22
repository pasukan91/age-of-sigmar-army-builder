function MainNav({ active, onLists, onCreate, onSettings }) {
  const items = [
    { id: "lists", label: "Mis listas", icon: "☰", onClick: onLists },
    { id: "create", label: "Crear", icon: "+", onClick: onCreate },
    { id: "settings", label: "Ajustes", icon: "⚙", onClick: onSettings },
  ];

  return (
    <nav className="aos-main-nav" aria-label="Navegación principal">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={active === item.id ? "is-active" : ""}
          onClick={item.onClick}
          aria-current={active === item.id ? "page" : undefined}
        >
          <span aria-hidden="true">{item.icon}</span>
          {item.label}
        </button>
      ))}
    </nav>
  );
}

export default MainNav;

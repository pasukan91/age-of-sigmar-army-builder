function MainNav({
  active,
  onReference,
  onStormForge,
  onProfile,
  onRules,
  onLists,
  onSettings,
}) {
  const items = [
    {
      id: "reference",
      label: "Reference",
      icon: "▤",
      onClick: onReference ?? onRules,
    },
    {
      id: "storm-forge",
      label: "Storm Forge",
      icon: "✺",
      onClick: onStormForge ?? onLists,
    },
    {
      id: "profile",
      label: "Profile",
      icon: "◎",
      onClick: onProfile ?? onSettings,
    },
  ];

  return (
    <nav className="aos-main-nav aos-official-nav" aria-label="Navegación principal">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className={active === item.id ? "is-active" : ""}
          onClick={item.onClick}
          disabled={!item.onClick}
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

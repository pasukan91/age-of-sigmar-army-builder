import OfficialIcon from "./OfficialIcon";

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
      icon: "reference",
      onClick: onReference ?? onRules,
    },
    {
      id: "storm-forge",
      label: "Storm Forge",
      icon: "forge",
      onClick: onStormForge ?? onLists,
    },
    {
      id: "profile",
      label: "Profile",
      icon: "profile",
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
          <OfficialIcon name={item.icon} size={25} strokeWidth={1.7} />
          <strong>{item.label}</strong>
        </button>
      ))}
    </nav>
  );
}

export default MainNav;

function OfficialIcon({ name, size = 24, strokeWidth = 2, className = "" }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    "aria-hidden": true,
  };

  const paths = {
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    chevronRight: <path d="m9 18 6-6-6-6"/>,
    chevronDown: <path d="m6 9 6 6 6-6"/>,
    back: <path d="m15 18-6-6 6-6"/>,
    plus: <path d="M12 5v14M5 12h14"/>,
    menu: <><circle cx="12" cy="5" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="19" r="1" fill="currentColor" stroke="none"/></>,
    profile: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="9" r="3"/><path d="M6.7 18c1.2-2.3 3-3.5 5.3-3.5s4.1 1.2 5.3 3.5"/></>,
    reference: <><path d="M6 3h10a2 2 0 0 1 2 2v14H8a2 2 0 0 1-2-2V3Z"/><path d="M6 17a2 2 0 0 1 2-2h10M9 7h6M9 10h6"/><path d="M4 5h2M4 9h2M4 13h2"/></>,
    forge: <><path d="m12 2 1.7 5.1L19 5l-2.1 5.3L22 12l-5.1 1.7L19 19l-5.3-2.1L12 22l-1.7-5.1L5 19l2.1-5.3L2 12l5.1-1.7L5 5l5.3 2.1L12 2Z"/><circle cx="12" cy="12" r="3"/></>,
    combatPhase: <><path d="m5 3 2 5-1 5c0 4 3 7 6 8 3-1 6-4 6-8l-1-5 2-5-5 2-2-3-2 3-5-2Z" fill="currentColor" stroke="none"/><path d="m10 7 2 2-2 3 3 2-1 3M14 7l-2 2" stroke="var(--ability-phase)"/></>,
    warning: <><path d="M12 3 2.8 20h18.4L12 3Z"/><path d="M12 9v5M12 17h.01"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6 1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z"/></>,
    document: <><path d="M5 3h11l3 3v15H5V3Z"/><path d="M16 3v4h4M8 11h8M8 15h6"/><path d="m8 19 1.5 1.5L12 18"/></>,
    lock: <><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/></>,
    report: <><circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 17h.01"/><path d="m4.5 6 2 1M17.5 17l2 1M18 5.5l-1 2M7 16.5l-1 2"/></>,
    logout: <><path d="M10 4H5v16h5M14 8l4 4-4 4M8 12h10"/></>,
    deleteUser: <><circle cx="10" cy="8" r="3"/><path d="M4.5 18c.7-3 2.5-4.5 5.5-4.5 1 0 1.8.2 2.5.5M15 15l5 5M20 15l-5 5"/></>,
    subscriptions: <path d="M5 12c0-3 1.7-5 4.5-5 4 0 4.5 5 1 5-3.5 0-3 5 1 5 2.8 0 4.5-2 4.5-5s-1.7-5-4.5-5c-4 0-4.5 5-1 5 3.5 0 3-5-1-5C6.7 7 5 9 5 12Z"/>,
  };

  return <svg {...common}>{paths[name] ?? null}</svg>;
}

export default OfficialIcon;

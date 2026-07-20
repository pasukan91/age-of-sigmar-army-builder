const ROTATION_BY_DIRECTION = {
  right: -45,
  down: 45,
  left: 135,
  up: 225,
};

function ChevronIcon({
  direction = "right",
  size = 9,
  thickness = 2,
  className = "",
}) {
  return (
    <span
      aria-hidden="true"
      className={className}
      style={{
        width: size,
        height: size,
        display: "inline-block",
        flexShrink: 0,
        borderRight: `${thickness}px solid currentColor`,
        borderBottom: `${thickness}px solid currentColor`,
        transform: `rotate(${ROTATION_BY_DIRECTION[direction] ?? -45}deg)`,
        transition: "transform 170ms ease",
      }}
    />
  );
}

export default ChevronIcon;

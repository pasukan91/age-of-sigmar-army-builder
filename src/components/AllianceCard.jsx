function AllianceCard({ alliance, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "300px",
        padding: "20px",
        margin: "10px",
        fontSize: "22px",
        cursor: "pointer",
      }}
    >
      {alliance.name}
    </button>
  );
}

export default AllianceCard;
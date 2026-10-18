import { getFactionMechanicIllustration } from "../data/factionMechanicIllustrations";

function FactionMechanicIllustration({ ability }) {
  const illustration = getFactionMechanicIllustration(ability);

  if (!illustration) return null;

  return (
    <figure className="aos-rule-illustration">
      <img
        src={illustration.src}
        alt={illustration.alt}
        loading="lazy"
        decoding="async"
      />
      <figcaption>{illustration.caption}</figcaption>
    </figure>
  );
}

export default FactionMechanicIllustration;


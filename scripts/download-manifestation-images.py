from io import BytesIO
import json
from pathlib import Path
from urllib.request import Request, urlopen

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
CATALOGUE = ROOT / "src" / "data" / "additionalBattletomeFactions.generated.json"
OUTPUT_ROOT = ROOT / "public" / "images" / "manifestations" / "catalogue"


def iter_manifestations(catalogue):
    yield from catalogue.get("universalManifestations", [])
    for faction in catalogue.get("factions", []):
        yield from faction.get("manifestations", [])
        for army in faction.get("armiesOfRenown", []):
            yield from (army.get("rules") or {}).get("manifestations", [])


def main():
    catalogue = json.loads(CATALOGUE.read_text(encoding="utf-8"))
    sources = {
        item["id"]: item["image"]
        for item in iter_manifestations(catalogue)
        if str(item.get("image", "")).startswith(("http://", "https://"))
    }
    OUTPUT_ROOT.mkdir(parents=True, exist_ok=True)
    failures = []

    for index, (item_id, source) in enumerate(sorted(sources.items()), start=1):
        destination = OUTPUT_ROOT / f"{item_id}.webp"
        try:
            request = Request(source, headers={
                "Accept": "image/avif,image/webp,image/*,*/*;q=0.8",
                "User-Agent": "Mozilla/5.0 StormForgeImageSync/1.0",
            })
            with urlopen(request, timeout=45) as response:
                payload = response.read()
            with Image.open(BytesIO(payload)) as image:
                image.thumbnail((900, 900), Image.Resampling.LANCZOS)
                converted = image.convert("RGBA" if "A" in image.getbands() else "RGB")
                converted.save(destination, "WEBP", quality=84, method=6)
            print(f"[{index}/{len(sources)}] {destination.relative_to(ROOT).as_posix()}")
        except Exception as error:
            failures.append((item_id, str(error)))
            print(f"ERROR {item_id}: {error}")

    if failures:
        details = "\n".join(f"- {item_id}: {error}" for item_id, error in failures)
        raise RuntimeError(f"No se pudieron descargar {len(failures)} imágenes:\n{details}")


if __name__ == "__main__":
    main()

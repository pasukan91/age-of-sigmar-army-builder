from io import BytesIO
import json
from pathlib import Path
from urllib.request import Request, urlopen

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "scripts" / "additional-unit-image-sources.json"
OUTPUT_ROOT = ROOT / "public" / "images" / "units"


def download_image(entry):
    destination = OUTPUT_ROOT / entry["faction"] / entry["file"]
    destination.parent.mkdir(parents=True, exist_ok=True)
    source = entry["source"]
    if entry["official"]:
        source = f"{source}?fm=webp&w=720&h=744"

    request = Request(source, headers={
        "Accept": "image/avif,image/webp,image/*,*/*;q=0.8",
        "User-Agent": "Mozilla/5.0 StormForgeImageSync/1.0",
    })
    with urlopen(request, timeout=45) as response:
        payload = response.read()

    with Image.open(BytesIO(payload)) as image:
        image.thumbnail((720, 744), Image.Resampling.LANCZOS)
        converted = image.convert("RGBA" if "A" in image.getbands() else "RGB")
        converted.save(destination, "WEBP", quality=84, method=6)

    return destination.relative_to(ROOT).as_posix()


def main():
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    failures = []
    for index, entry in enumerate(manifest["images"], start=1):
        try:
            path = download_image(entry)
            print(f"[{index}/{len(manifest['images'])}] {path}")
        except Exception as error:  # Continue so one retired product does not discard the rest.
            failures.append((entry["faction"], entry["id"], str(error)))
            print(f"ERROR {entry['faction']}:{entry['id']}: {error}")

    if failures:
        details = "\n".join(f"- {faction}:{unit_id}: {error}" for faction, unit_id, error in failures)
        raise RuntimeError(f"No se pudieron descargar {len(failures)} imágenes:\n{details}")


if __name__ == "__main__":
    main()

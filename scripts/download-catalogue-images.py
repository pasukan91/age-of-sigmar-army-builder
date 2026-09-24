from io import BytesIO
import json
from pathlib import Path
from urllib.request import Request, urlopen

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
CATALOGUE = ROOT / "src" / "data" / "aosCommunityAllFactions.generated.json"
OUTPUT = ROOT / "public" / "images" / "catalogue"
HOST = "https://dhss9aar8ocw.cloudfront.net/"
CATALOGUE_ONLY_FACTIONS = {"seraphon", "fyreslayers", "behemat"}


def collect_images(value, result):
    if isinstance(value, list):
        for item in value:
            collect_images(item, result)
    elif isinstance(value, dict):
        image = value.get("image")
        if isinstance(image, str) and image.startswith(HOST):
            result[image.removeprefix(HOST).split("?", 1)[0]] = image
        for item in value.values():
            collect_images(item, result)


def download(identifier, source):
    destination = OUTPUT / f"{identifier}.webp"
    if destination.exists():
        return False
    request = Request(
        f"{source}?fm=webp&w=720&h=744",
        headers={"User-Agent": "Mozilla/5.0 StormForgeCatalogueSync/1.0"},
    )
    with urlopen(request, timeout=45) as response:
        payload = response.read()
    with Image.open(BytesIO(payload)) as image:
        image.thumbnail((720, 744), Image.Resampling.LANCZOS)
        converted = image.convert("RGBA" if "A" in image.getbands() else "RGB")
        converted.save(destination, "WEBP", quality=84, method=6)
    return True


def main():
    catalogue = json.loads(CATALOGUE.read_text(encoding="utf-8"))
    sources = {}
    for faction in catalogue["factions"]:
        if faction.get("id") in CATALOGUE_ONLY_FACTIONS:
            collect_images(faction.get("units", []), sources)
    OUTPUT.mkdir(parents=True, exist_ok=True)
    downloaded = 0
    failures = []
    for index, (identifier, source) in enumerate(sources.items(), start=1):
        try:
            if download(identifier, source):
                downloaded += 1
                print(f"[{index}/{len(sources)}] {identifier}.webp")
        except Exception as error:
            failures.append((identifier, str(error)))
    print(f"Downloaded {downloaded}; available {len(sources) - len(failures)} of {len(sources)}")
    if failures:
        details = "\n".join(f"- {identifier}: {error}" for identifier, error in failures)
        raise RuntimeError(f"Could not download {len(failures)} images:\n{details}")


if __name__ == "__main__":
    main()

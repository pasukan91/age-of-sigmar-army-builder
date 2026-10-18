from io import BytesIO
from pathlib import Path
from urllib.request import Request, urlopen

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "images" / "rule-illustrations"
SOURCES = {
    "gloomspite-bad-moon.webp": "https://dhss9aar8ocw.cloudfront.net/e20e20bf-face-4469-b362-42de737c0857",
    "khorne-blood-tithe.webp": "https://dhss9aar8ocw.cloudfront.net/a13d1d74-0c0e-4b37-a444-fbb33153023e",
    "kruleboyz-dirty-tricks.webp": "https://dhss9aar8ocw.cloudfront.net/3d883924-20ce-42b5-82e0-181ad43b7920",
    "lumineth-battle-scripture.webp": "https://dhss9aar8ocw.cloudfront.net/66e88246-caa2-4fc5-904f-6124b36f8b38",
}


def download(filename, source):
    request = Request(
        f"{source}?fm=webp&w=1100",
        headers={"User-Agent": "Mozilla/5.0 StormForgeCatalogueSync/1.0"},
    )
    with urlopen(request, timeout=45) as response:
        payload = response.read()

    destination = OUTPUT / filename
    with Image.open(BytesIO(payload)) as image:
        image.thumbnail((1100, 1400), Image.Resampling.LANCZOS)
        converted = image.convert("RGBA" if "A" in image.getbands() else "RGB")
        converted.save(destination, "WEBP", quality=88, method=6)
    print(f"Saved {destination.relative_to(ROOT)} ({destination.stat().st_size} bytes)")


def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for filename, source in SOURCES.items():
        download(filename, source)


if __name__ == "__main__":
    main()


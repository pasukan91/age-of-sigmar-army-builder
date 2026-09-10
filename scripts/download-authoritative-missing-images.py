from io import BytesIO
import json
from pathlib import Path
import sys
from urllib.request import Request, urlopen

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
IMAGES = {
    "public/images/factions/stormcast.webp": "https://dhss9aar8ocw.cloudfront.net/51747a5d-44b8-4064-abb2-3b815df8dc71",
    "public/images/factions/nighthaunt.webp": "https://dhss9aar8ocw.cloudfront.net/5e0b1ddc-20a7-4f3c-989f-97993a94b826",
    "public/images/factions/flesheater.webp": "https://dhss9aar8ocw.cloudfront.net/a96a6456-497e-487e-9e73-366424bb2da7",
    "public/images/terrain/stormcast/stormreach-portal.webp": "https://dhss9aar8ocw.cloudfront.net/b049f311-e7d1-41dd-8abd-6abfb488b319",
    "public/images/terrain/nighthaunt/nexus-of-grief.webp": "https://dhss9aar8ocw.cloudfront.net/4448b9d2-44e1-43f5-b1b0-255b5df55876",
    "public/images/terrain/flesheater/charnel-throne.webp": "https://dhss9aar8ocw.cloudfront.net/19732562-2771-442e-b84e-2422bea7efcc",
    "public/images/terrain/idoneth/gloomtide-shipwreck.webp": "https://dhss9aar8ocw.cloudfront.net/6f9f83b8-cc4a-4b80-b8c0-ca756a615cb0",
    "public/images/terrain/kharadron/zontari-endrin-dock.webp": "https://dhss9aar8ocw.cloudfront.net/16ac60b5-2c17-4706-aa43-a94ba8326072",
}

if len(sys.argv) > 1:
    manifest = json.loads((ROOT / sys.argv[1]).read_text(encoding="utf-8"))
    IMAGES.update({item["path"]: item["url"] for item in manifest})


for relative_path, url in IMAGES.items():
    output = ROOT / relative_path
    output.parent.mkdir(parents=True, exist_ok=True)
    request = Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urlopen(request, timeout=30) as response:
        content = response.read()
    with Image.open(BytesIO(content)) as image:
        image.convert("RGB").save(output, "WEBP", quality=88, method=6)
    print(f"{relative_path}: {output.stat().st_size} bytes")

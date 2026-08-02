import argparse
import asyncio
import json
import re
import unicodedata
from pathlib import Path

import pypdfium2 as pdfium
from pypdf import PdfReader
from winsdk.windows.graphics.imaging import BitmapDecoder
from winsdk.windows.media.ocr import OcrEngine
from winsdk.windows.storage import FileAccessMode, StorageFile


def normalize(value):
    text = unicodedata.normalize("NFKD", str(value or ""))
    text = "".join(character for character in text if not unicodedata.combining(character))
    return re.sub(r"[^a-z0-9]+", " ", text.lower()).strip()


def name_score(name, text):
    name_tokens = normalize(name).split()
    page_text = normalize(text)
    if not name_tokens:
        return 0
    exact = " ".join(name_tokens) in page_text
    coverage = sum(token in page_text for token in name_tokens) / len(name_tokens)
    return min(1.0, coverage + (0.25 if exact else 0))


def extract_pdf_text(pdf_path):
    reader = PdfReader(str(pdf_path))
    return [(page.extract_text() or "").strip() for page in reader.pages]


class WindowsOcr:
    def __init__(self, scratch_directory):
        self.engine = OcrEngine.try_create_from_user_profile_languages()
        self.loop = asyncio.new_event_loop()
        self.scratch_path = Path(scratch_directory) / "winocr-page.png"
        self.scratch_path.parent.mkdir(parents=True, exist_ok=True)

    async def _recognize(self):
        storage_file = await StorageFile.get_file_from_path_async(str(self.scratch_path.resolve()))
        stream = await storage_file.open_async(FileAccessMode.READ)
        decoder = await BitmapDecoder.create_async(stream)
        bitmap = await decoder.get_software_bitmap_async()
        return await self.engine.recognize_async(bitmap)

    def recognize(self, image):
        image.save(self.scratch_path)
        return self.loop.run_until_complete(self._recognize()).text


def ocr_page(document, page_number, engine, scale=1.0):
    image = document[page_number].render(scale=scale).to_pil().convert("RGB")
    return engine.recognize(image)


def scanned_page_candidates(page_count):
    if page_count <= 60:
        return list(range(page_count)), False
    start = int(page_count * 0.38)
    return list(range(start, page_count, 3)), True


def build_index(pdf_path, cache_path, unit_names, engine):
    if cache_path.exists():
        return json.loads(cache_path.read_text(encoding="utf-8"))

    extracted = extract_pdf_text(pdf_path)
    readable_pages = sum(len(text) >= 150 for text in extracted)
    if readable_pages >= max(2, len(extracted) // 3):
        pages = {str(index): text for index, text in enumerate(extracted) if text}
        method = "embedded-text"
    else:
        document = pdfium.PdfDocument(str(pdf_path))
        candidates, sampled = scanned_page_candidates(len(document))
        sampled_text = {}
        for position, page_number in enumerate(candidates, 1):
            sampled_text[page_number] = ocr_page(document, page_number, engine, scale=0.9)
            print(
                f"OCR index {pdf_path.name}: {position}/{len(candidates)} (page {page_number + 1})",
                flush=True,
            )

        if sampled:
            hits = [
                page_number
                for page_number, text in sampled_text.items()
                if "warscroll" in normalize(text)
                or any(name_score(name, text) >= 0.9 for name in unit_names)
            ]
            if hits:
                first = max(0, min(hits) - 4)
                last = min(len(document) - 1, max(hits) + 4)
                full_range = range(first, last + 1)
            else:
                full_range = range(int(len(document) * 0.45), len(document))
            pages = {}
            for position, page_number in enumerate(full_range, 1):
                text = sampled_text.get(page_number)
                if text is None:
                    text = ocr_page(document, page_number, engine, scale=1.0)
                    print(
                        f"OCR detail {pdf_path.name}: {position}/{len(full_range)} (page {page_number + 1})",
                        flush=True,
                    )
                pages[str(page_number)] = text
        else:
            pages = {str(page): text for page, text in sampled_text.items()}
        method = "rapidocr"

    result = {
        "source": pdf_path.name,
        "method": method,
        "pageCount": len(extracted),
        "pages": pages,
    }
    cache_path.parent.mkdir(parents=True, exist_ok=True)
    cache_path.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    return result


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--downloads", required=True)
    parser.add_argument("--manifest", required=True)
    parser.add_argument("--app-data", required=True)
    parser.add_argument("--cache", required=True)
    parser.add_argument("--output", required=True)
    args = parser.parse_args()

    downloads = Path(args.downloads)
    manifest = json.loads(Path(args.manifest).read_text(encoding="utf-8"))
    app_data = json.loads(Path(args.app_data).read_text(encoding="utf-8"))
    units_by_faction = {
        item["faction"]: [unit["name"] for unit in item["units"]]
        for item in app_data
    }
    source_units = {}
    for faction, sources in manifest.items():
        for source in sources:
            source_units.setdefault(source, set()).update(units_by_faction.get(faction, []))

    missing_sources = [name for name in source_units if not (downloads / name).exists()]
    if missing_sources:
        raise FileNotFoundError(f"Missing battletomes: {missing_sources}")

    engine = WindowsOcr(Path(args.cache).parent)
    indexes = {}
    for source, unit_names in source_units.items():
        safe_name = re.sub(r"[^a-z0-9]+", "-", source.lower()).strip("-")
        indexes[source] = build_index(
            downloads / source,
            Path(args.cache) / f"{safe_name}.json",
            sorted(unit_names),
            engine,
        )

    matches = []
    for faction, unit_names in units_by_faction.items():
        for unit_name in unit_names:
            lookup_name = re.sub(r"^Scourge of Aqshy\s+", "", unit_name, flags=re.IGNORECASE)
            candidates = []
            for source in manifest[faction]:
                for page_number, text in indexes[source]["pages"].items():
                    score = name_score(lookup_name, text)
                    if score >= 0.5:
                        candidates.append({
                            "source": source,
                            "page": int(page_number) + 1,
                            "score": round(score, 3),
                            "method": indexes[source]["method"],
                        })
            candidates.sort(key=lambda item: (-item["score"], len(item["source"]), item["page"]))
            matches.append({
                "faction": faction,
                "unit": unit_name,
                "matches": candidates[:5],
            })

    output = {
        "sources": [
            {
                "name": source,
                "method": index["method"],
                "pageCount": index["pageCount"],
                "indexedPages": len(index["pages"]),
            }
            for source, index in indexes.items()
        ],
        "units": matches,
    }
    Path(args.output).write_text(json.dumps(output, ensure_ascii=False, indent=2), encoding="utf-8")
    found = sum(bool(item["matches"]) for item in matches)
    print(f"Matched {found}/{len(matches)} warscrolls", flush=True)


if __name__ == "__main__":
    main()

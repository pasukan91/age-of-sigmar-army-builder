import argparse
import asyncio
import json
import math
import re
import unicodedata
from pathlib import Path

import pypdfium2 as pdfium
from winsdk.windows.graphics.imaging import BitmapDecoder
from winsdk.windows.media.ocr import OcrEngine
from winsdk.windows.storage import FileAccessMode, StorageFile


def normalize(value):
    text = unicodedata.normalize("NFKD", str(value or ""))
    text = "".join(character for character in text if not unicodedata.combining(character))
    return re.sub(r"[^a-z0-9]+", " ", text.lower()).strip()


def tokens(value):
    return [token for token in normalize(value).split() if len(token) > 1]


def phrase_score(phrase, text):
    wanted = tokens(phrase)
    haystack = normalize(text)
    if not wanted:
        return 0.0
    exact = " ".join(wanted) in haystack
    coverage = sum(token in haystack for token in wanted) / len(wanted)
    return min(1.0, coverage + (0.25 if exact else 0.0))


def content_score(unit, text):
    score = phrase_score(unit["name"], text) * 8
    for weapon in unit.get("weapons", []):
        score += phrase_score(weapon["name"], text) * 2
    for ability in unit.get("abilities", []):
        score += phrase_score(ability["name"], text)
    return score


class WindowsOcr:
    def __init__(self, scratch_directory):
        self.engine = OcrEngine.try_create_from_user_profile_languages()
        self.loop = asyncio.new_event_loop()
        self.scratch_path = Path(scratch_directory) / "winocr-detail.png"
        self.scratch_path.parent.mkdir(parents=True, exist_ok=True)

    async def _recognize(self):
        storage_file = await StorageFile.get_file_from_path_async(str(self.scratch_path.resolve()))
        stream = await storage_file.open_async(FileAccessMode.READ)
        decoder = await BitmapDecoder.create_async(stream)
        bitmap = await decoder.get_software_bitmap_async()
        return await self.engine.recognize_async(bitmap)

    def recognize(self, image):
        image.save(self.scratch_path)
        result = self.loop.run_until_complete(self._recognize())
        lines = []
        for line in result.lines:
            words = []
            for word in line.words:
                rect = word.bounding_rect
                words.append({
                    "text": word.text,
                    "x": round(rect.x, 1),
                    "y": round(rect.y, 1),
                    "w": round(rect.width, 1),
                    "h": round(rect.height, 1),
                })
            lines.append({"text": line.text, "words": words})
        return {"text": result.text, "lines": lines, "width": image.width, "height": image.height}


def safe_name(value):
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")


def select_candidate_pages(unit, sources, indexes, limit=5):
    ranked = []
    for source in sources:
        for page, text in indexes[source]["pages"].items():
            ranked.append((content_score(unit, text), source, int(page)))
    ranked.sort(reverse=True)
    return ranked[:limit]


def build_detail_cache(downloads, cache_dir, requests, engine):
    cache_dir.mkdir(parents=True, exist_ok=True)
    documents = {}
    details = {}
    for position, (source, page) in enumerate(sorted(requests), 1):
        key = f"{safe_name(source)}-p{page + 1}.json"
        cache_path = cache_dir / key
        if cache_path.exists():
            details[(source, page)] = json.loads(cache_path.read_text(encoding="utf-8"))
            continue
        document = documents.setdefault(source, pdfium.PdfDocument(str(downloads / source)))
        image = document[page].render(scale=2.0).to_pil().convert("RGB")
        overlap = 35
        middle = image.width // 2
        crops = {
            "left": image.crop((0, 0, middle + overlap, image.height)),
            "right": image.crop((middle - overlap, 0, image.width, image.height)),
        }
        detail = {side: engine.recognize(crop) for side, crop in crops.items()}
        cache_path.write_text(json.dumps(detail, ensure_ascii=False), encoding="utf-8")
        details[(source, page)] = detail
        print(f"Detailed OCR {position}/{len(requests)}: {source}, page {page + 1}", flush=True)
    return details


def best_column(unit, candidates, details, embedded_indexes):
    ranked = []
    for _, source, page in candidates:
        detail = details.get((source, page))
        if detail:
            for side in ("left", "right"):
                text = detail[side]["text"]
                ranked.append((content_score(unit, text), source, page, side, detail[side]))
        else:
            text = embedded_indexes[source]["pages"].get(str(page), "")
            ranked.append((content_score(unit, text), source, page, "full", {"text": text, "lines": []}))
    ranked.sort(key=lambda item: item[0], reverse=True)
    return ranked[0] if ranked else None


def nearby_words(detail, needle, y_radius=70):
    needle_tokens = set(tokens(needle))
    candidates = []
    for line in detail.get("lines", []):
        line_tokens = set(tokens(line["text"]))
        overlap = len(needle_tokens & line_tokens) / max(1, len(needle_tokens))
        if overlap >= 0.5:
            ys = [word["y"] for word in line["words"]]
            if ys:
                candidates.append((overlap, sum(ys) / len(ys)))
    if not candidates:
        return []
    _, center_y = max(candidates)
    words = []
    for line in detail.get("lines", []):
        for word in line["words"]:
            if abs(word["y"] - center_y) <= y_radius:
                words.append(word)
    return words


def expected_weapon_values(weapon):
    values = []
    if weapon.get("range"):
        values.append(str(weapon["range"]).replace('"', ""))
    values.extend([
        str(weapon.get("attacks", "")),
        str(weapon.get("hit", "")).replace("+", ""),
        str(weapon.get("wound", "")).replace("+", ""),
        str(weapon.get("rend", "")).replace("0", "-") if str(weapon.get("rend", "")) == "0" else str(weapon.get("rend", "")),
        str(weapon.get("damage", "")),
    ])
    return [normalize(value) for value in values if value != ""]


def audit_unit(unit, best):
    if not best:
        return {"status": "manual", "reason": "No se localizó el warscroll"}
    score, source, page, side, detail = best
    text = detail["text"]
    result = {
        "source": source,
        "page": page + 1,
        "side": side,
        "matchScore": round(score, 2),
        "profile": "manual",
        "weapons": [],
        "abilities": [],
        "keywords": "manual",
    }
    # A high name score is required so neighbouring warscrolls cannot validate a unit.
    if phrase_score(unit["name"], text) < 0.7:
        result["status"] = "manual"
        result["reason"] = "Nombre no reconocido con suficiente confianza"
        return result

    normalized_text = normalize(text)
    profile = unit.get("profile", {})
    profile_values = [
        normalize(str(profile.get("move", "")).replace('"', "")),
        normalize(profile.get("health", "")),
        normalize(str(profile.get("save", "")).replace("+", "")),
        normalize(profile.get("control", "")),
    ]
    result["profile"] = "evidence" if all(value and value in normalized_text for value in profile_values) else "manual"

    for weapon in unit.get("weapons", []):
        name_score = phrase_score(weapon["name"], text)
        words = nearby_words(detail, weapon["name"])
        local_text = normalize(" ".join(word["text"] for word in words))
        expected = expected_weapon_values(weapon)
        found_values = sum(value in local_text for value in expected)
        if name_score < 0.55:
            status = "manual"
            reason = "nombre no reconocido"
        elif detail.get("lines") and found_values >= max(3, len(expected) - 2):
            status = "evidence"
            reason = f"{found_values}/{len(expected)} valores visibles cerca de la fila"
        else:
            status = "manual"
            reason = f"{found_values}/{len(expected)} valores reconocidos"
        result["weapons"].append({
            "name": weapon["name"],
            "status": status,
            "reason": reason,
            "nameScore": round(name_score, 2),
            "expected": expected,
            "ocrNearby": local_text,
        })

    for ability in unit.get("abilities", []):
        name_score = phrase_score(ability["name"], text)
        description_tokens = set(tokens(ability.get("description", "")))
        recognized_tokens = set(tokens(text))
        description_score = len(description_tokens & recognized_tokens) / max(1, len(description_tokens))
        status = "evidence" if name_score >= 0.7 and description_score >= 0.45 else "manual"
        result["abilities"].append({
            "name": ability["name"],
            "status": status,
            "nameScore": round(name_score, 2),
            "descriptionScore": round(description_score, 2),
        })

    keyword_scores = [phrase_score(keyword, text) for keyword in unit.get("keywords", [])]
    result["keywords"] = "evidence" if keyword_scores and min(keyword_scores) >= 0.7 else "manual"
    result["status"] = "evidence" if (
        result["profile"] == "evidence"
        and all(item["status"] == "evidence" for item in result["weapons"])
        and all(item["status"] == "evidence" for item in result["abilities"])
        and result["keywords"] == "evidence"
    ) else "manual"
    return result


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--downloads", required=True)
    parser.add_argument("--manifest", required=True)
    parser.add_argument("--app-data", required=True)
    parser.add_argument("--index-dir", required=True)
    parser.add_argument("--detail-cache", required=True)
    parser.add_argument("--output", required=True)
    args = parser.parse_args()

    downloads = Path(args.downloads)
    manifest = json.loads(Path(args.manifest).read_text(encoding="utf-8"))
    app_data = json.loads(Path(args.app_data).read_text(encoding="utf-8"))
    indexes = {}
    for sources in manifest.values():
        for source in sources:
            cache = Path(args.index_dir) / f"{safe_name(source)}.json"
            indexes[source] = json.loads(cache.read_text(encoding="utf-8"))

    units = [(army["faction"], unit) for army in app_data for unit in army["units"]]
    candidate_map = {}
    detail_requests = set()
    for faction, unit in units:
        lookup = dict(unit)
        lookup["name"] = re.sub(r"^Scourge of Aqshy\s+", "", unit["name"], flags=re.I)
        candidates = select_candidate_pages(lookup, manifest[faction], indexes)
        candidate_map[(faction, unit["id"])] = candidates
        for _, source, page in candidates[:3]:
            if indexes[source]["method"] != "embedded-text":
                detail_requests.add((source, page))

    engine = WindowsOcr(Path(args.detail_cache).parent)
    details = build_detail_cache(downloads, Path(args.detail_cache), detail_requests, engine)
    results = []
    for faction, unit in units:
        lookup = dict(unit)
        lookup["name"] = re.sub(r"^Scourge of Aqshy\s+", "", unit["name"], flags=re.I)
        best = best_column(lookup, candidate_map[(faction, unit["id"])], details, indexes)
        result = audit_unit(lookup, best)
        result.update({"faction": faction, "id": unit["id"], "unit": unit["name"]})
        results.append(result)

    output = {
        "authority": "Battletomes and supplied supplements for warscroll data; Battle Profiles only for points, unit size and bases.",
        "units": results,
    }
    Path(args.output).write_text(json.dumps(output, ensure_ascii=False, indent=2), encoding="utf-8")
    confirmed = sum(item["status"] == "evidence" for item in results)
    print(f"Complete OCR evidence: {confirmed}/{len(results)}; manual review: {len(results) - confirmed}", flush=True)


if __name__ == "__main__":
    main()

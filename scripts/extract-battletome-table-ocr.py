import argparse
import json
import re
import unicodedata
from collections import defaultdict
from pathlib import Path

import pypdfium2 as pdfium
from PIL import ImageEnhance, ImageOps
from rapidocr_onnxruntime import RapidOCR


def normalize(value):
    text = unicodedata.normalize("NFKD", str(value or ""))
    text = "".join(character for character in text if not unicodedata.combining(character))
    return re.sub(r"[^a-z0-9+]+", "", text.lower())


def word_tokens(value):
    return re.sub(r"[^a-z0-9]+", " ", str(value or "").lower()).split()


def phrase_score(phrase, text):
    if normalize(phrase) and normalize(phrase) in normalize(text):
        return 1.0
    wanted = word_tokens(phrase)
    have = set(word_tokens(text))
    if not wanted:
        return 0
    return sum(token in have for token in wanted) / len(wanted)


def safe_name(value):
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")


def serialize(output):
    items = []
    for box, text, confidence in output or []:
        xs = [point[0] for point in box]
        ys = [point[1] for point in box]
        items.append({
            "text": text,
            "confidence": round(float(confidence), 3),
            "x1": round(min(xs), 1),
            "y1": round(min(ys), 1),
            "x2": round(max(xs), 1),
            "y2": round(max(ys), 1),
        })
    return items


def center(item):
    return ((item["x1"] + item["x2"]) / 2, (item["y1"] + item["y2"]) / 2)


def expected_values(weapon, include_zero_rend=False):
    values = []
    if weapon.get("range"):
        values.append(str(weapon["range"]).replace('"', ""))
    values.extend([
        str(weapon.get("attacks", "")),
        str(weapon.get("hit", "")),
        str(weapon.get("wound", "")),
        "-" if include_zero_rend and str(weapon.get("rend", "")) == "0" else ("" if str(weapon.get("rend", "")) == "0" else str(weapon.get("rend", ""))),
        str(weapon.get("damage", "")),
    ])
    return [normalize(value) for value in values if normalize(value)]


def is_subsequence(parts, text):
    offset = 0
    for part in parts:
        position = text.find(part, offset)
        if position < 0:
            return False
        offset = position + len(part)
    return True


def analyze_weapon(weapon, items, width):
    name_items = sorted(
        ((phrase_score(weapon["name"], item["text"]), item) for item in items),
        key=lambda pair: (-pair[0], pair[1]["y1"]),
    )
    score, name_item = name_items[0] if name_items else (0, None)
    if not name_item or score < 0.5:
        return {"status": "manual", "reason": "nombre de arma no reconocido", "ocr": ""}
    _, row_y = center(name_item)
    stat_items = []
    for item in items:
        item_x, item_y = center(item)
        if item_x >= width * 0.52 and abs(item_y - row_y) <= 45:
            stat_items.append(item)
    stat_items.sort(key=lambda item: item["x1"])
    recognized = normalize(" ".join(item["text"] for item in stat_items))
    expected = expected_values(weapon)
    recognized_tokens = []
    for item in stat_items:
        recognized_tokens.extend(re.findall(r"\d*d\d+(?:\+\d+)?|\d+\+|\d+|-", item["text"].lower()))
    variants = [expected]
    if str(weapon.get("rend", "")) == "0":
        variants.append(expected_values(weapon, include_zero_rend=True))
    matched = is_subsequence(expected, recognized) or recognized_tokens in variants
    candidate_difference = not matched and any(len(recognized_tokens) == len(variant) for variant in variants)
    return {
        "status": "confirmed" if matched else ("candidate-difference" if candidate_difference else "manual"),
        "reason": "perfil completo reconocido" if matched else ("fila completa con valores distintos" if candidate_difference else "valores no legibles de forma inequívoca"),
        "expected": expected,
        "ocr": recognized,
        "ocrTokens": recognized_tokens,
        "nameConfidence": round(score, 2),
    }


def numeric_text(item):
    text = normalize(item["text"])
    match = re.fullmatch(r"(\d+|\d+\+|d\d+)", text)
    return match.group(1) if match else None


def analyze_profile(profile, items, width):
    headers = [item for item in items if "weapons" in normalize(item["text"])]
    if not headers:
        return {"status": "manual", "reason": "cabecera de armas no reconocida"}
    table_y = min(center(item)[1] for item in headers)
    candidates = []
    for item in items:
        x, y = center(item)
        value = numeric_text(item)
        if value and x < width * 0.52 and table_y - 430 <= y <= table_y - 60:
            candidates.append((x, y, value))
    anchors = {
        "move": (width * 0.27, table_y - 330),
        "health": (width * 0.12, table_y - 245),
        "save": (width * 0.42, table_y - 245),
        "control": (width * 0.27, table_y - 150),
    }
    parsed = {}
    remaining = list(candidates)
    for key, (anchor_x, anchor_y) in anchors.items():
        if not remaining:
            break
        nearest = min(remaining, key=lambda item: (item[0] - anchor_x) ** 2 + (item[1] - anchor_y) ** 2)
        distance = ((nearest[0] - anchor_x) ** 2 + (nearest[1] - anchor_y) ** 2) ** 0.5
        if distance <= 150:
            parsed[key] = nearest[2]
            remaining.remove(nearest)
    expected = {
        "move": normalize(str(profile.get("move", "")).replace('"', "")),
        "health": normalize(profile.get("health", "")),
        "save": normalize(profile.get("save", "")),
        "control": normalize(profile.get("control", "")),
    }
    comparable = {key: value for key, value in parsed.items() if key in expected}
    differences = {
        key: {"app": expected[key], "book": value}
        for key, value in comparable.items()
        if value != expected[key]
    }
    if differences:
        status = "candidate-difference"
    elif len(comparable) == 4:
        status = "confirmed"
    else:
        status = "manual"
    return {"status": status, "expected": expected, "parsed": parsed, "differences": differences}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--downloads", required=True)
    parser.add_argument("--app-data", required=True)
    parser.add_argument("--audit", required=True)
    parser.add_argument("--cache", required=True)
    parser.add_argument("--output", required=True)
    parser.add_argument("--shard-index", type=int)
    parser.add_argument("--shard-count", type=int)
    args = parser.parse_args()

    downloads = Path(args.downloads)
    app_data = json.loads(Path(args.app_data).read_text(encoding="utf-8"))
    unit_lookup = {
        (army["faction"], unit["id"]): unit
        for army in app_data
        for unit in army["units"]
    }
    audit = json.loads(Path(args.audit).read_text(encoding="utf-8"))
    groups = defaultdict(list)
    for result in audit["units"]:
        if result.get("side") in {"left", "right"} and result.get("source"):
            groups[(result["source"], result["page"], result["side"])].append(result)

    cache_dir = Path(args.cache)
    cache_dir.mkdir(parents=True, exist_ok=True)
    all_groups = sorted(groups.items())
    if args.shard_index is not None and args.shard_count:
        selected_groups = [item for index, item in enumerate(all_groups) if index % args.shard_count == args.shard_index]
    else:
        selected_groups = all_groups
    engine = RapidOCR()
    documents = {}
    cached = {}
    for position, ((source, page, side), _) in enumerate(selected_groups, 1):
        cache_path = cache_dir / f"{safe_name(source)}-p{page}-{side}.json"
        if cache_path.exists():
            cached[(source, page, side)] = json.loads(cache_path.read_text(encoding="utf-8"))
            continue
        document = documents.setdefault(source, pdfium.PdfDocument(str(downloads / source)))
        image = document[page - 1].render(scale=2.0).to_pil().convert("RGB")
        middle = image.width // 2
        overlap = 30
        if side == "left":
            image = image.crop((0, int(image.height * 0.08), middle + overlap, int(image.height * 0.52)))
        else:
            image = image.crop((middle - overlap, int(image.height * 0.08), image.width, int(image.height * 0.52)))
        image = ImageEnhance.Contrast(ImageOps.grayscale(image)).enhance(1.8)
        output, _ = engine(image)
        data = {"width": image.width, "height": image.height, "items": serialize(output)}
        cache_path.write_text(json.dumps(data, ensure_ascii=False), encoding="utf-8")
        cached[(source, page, side)] = data
        print(f"Table OCR {position}/{len(selected_groups)}: {source}, page {page}, {side}", flush=True)

    results = []
    for source_page_side, units in groups.items():
        data = cached.get(source_page_side)
        if data is None:
            continue
        for result in units:
            unit = unit_lookup[(result["faction"], result["id"])]
            results.append({
                "faction": result["faction"],
                "id": result["id"],
                "unit": result["unit"],
                "source": result["source"],
                "page": result["page"],
                "side": result["side"],
                "profile": analyze_profile(unit["profile"], data["items"], data["width"]),
                "weapons": [analyze_weapon(weapon, data["items"], data["width"]) | {"name": weapon["name"]} for weapon in unit.get("weapons", [])],
            })
    Path(args.output).write_text(json.dumps({"units": results}, ensure_ascii=False, indent=2), encoding="utf-8")
    profiles = sum(item["profile"]["status"] == "confirmed" for item in results)
    weapons = [weapon for item in results for weapon in item["weapons"]]
    weapon_count = sum(item["status"] == "confirmed" for item in weapons)
    print(f"Confirmed profiles {profiles}/{len(results)}; weapons {weapon_count}/{len(weapons)}", flush=True)


if __name__ == "__main__":
    main()

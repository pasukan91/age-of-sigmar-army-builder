import json
import re
import sys

import pdfplumber


FACTION_PAGES = {
    "Cities of Sigmar": range(3, 7),
    "Daughters of Khaine": range(7, 9),
    "Lumineth Realm-lords": range(15, 17),
    "Sylvaneth": range(23, 25),
    "Blades of Khorne": range(25, 27),
    "Disciples of Tzeentch": range(27, 29),
    "Hedonites of Slaanesh": range(29, 31),
    "Helsmiths of Hashut": range(31, 33),
    "Maggotkin of Nurgle": range(33, 35),
    "Skaven": range(35, 37),
    "Slaves to Darkness": range(37, 40),
    "Ossiarch Bonereapers": range(44, 46),
    "Soulblight Gravelords": range(46, 48),
    "Gloomspite Gitz": range(48, 50),
    "Ironjawz": range(50, 52),
    "Kruleboyz": range(52, 54),
    "Ogor Mawtribes": range(54, 56),
}


def clean_name(value):
    text = str(value or "").replace("\u00ad", "")
    text = re.sub(r"\b(?:NEW|UPDATED)\b", " ", text, flags=re.IGNORECASE)
    text = text.replace("✹", " ")
    return re.sub(r"\s+", " ", text).strip()


def clean_value(value):
    return re.sub(r"\s+", " ", str(value or "")).strip()


def extract_profiles(pdf_path):
    profiles = []
    with pdfplumber.open(pdf_path) as document:
        for faction, page_numbers in FACTION_PAGES.items():
            for page_number in page_numbers:
                page = document.pages[page_number - 1]
                for table in page.extract_tables():
                    if not table or not table[0]:
                        continue
                    header = [clean_value(cell).upper() for cell in table[0]]
                    if "UNIT SIZE" not in header or "POINTS" not in header or "BASE SIZE" not in header:
                        continue
                    name_index = 0
                    size_index = header.index("UNIT SIZE")
                    points_index = header.index("POINTS")
                    base_index = header.index("BASE SIZE")
                    for row in table[1:]:
                        if not row or len(row) <= max(name_index, size_index, points_index, base_index):
                            continue
                        name = clean_name(row[name_index])
                        unit_size = clean_value(row[size_index])
                        points_text = clean_value(row[points_index])
                        base_size = clean_value(row[base_index])
                        points_match = re.match(r"(\d+)", points_text)
                        if not name or not unit_size or not points_match:
                            continue
                        profiles.append({
                            "faction": faction,
                            "name": name,
                            "unitSize": int(unit_size) if unit_size.isdigit() else unit_size,
                            "points": int(points_match.group(1)),
                            "baseSize": base_size,
                            "page": page_number,
                        })
    return profiles


if len(sys.argv) != 3:
    raise SystemExit("Usage: extract-battle-profiles.py <battle-profiles.pdf> <output.json>")

with open(sys.argv[2], "w", encoding="utf-8") as output_file:
    json.dump(extract_profiles(sys.argv[1]), output_file, ensure_ascii=False, indent=2)
    output_file.write("\n")

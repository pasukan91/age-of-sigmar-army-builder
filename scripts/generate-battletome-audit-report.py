import argparse
import json
import re
import unicodedata
from collections import defaultdict
from pathlib import Path


def slug(value):
    text = unicodedata.normalize("NFKD", value)
    text = "".join(character for character in text if not unicodedata.combining(character))
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")


def weapon_profile(weapon):
    values = []
    if weapon.get("range"):
        values.append(f"Rng {weapon['range']}")
    values.extend([
        f"Atk {weapon.get('attacks', '—')}",
        f"Hit {weapon.get('hit', '—')}",
        f"Wnd {weapon.get('wound', '—')}",
        f"Rnd {weapon.get('rend', '—')}",
        f"Dmg {weapon.get('damage', '—')}",
    ])
    if weapon.get("abilities"):
        values.append("; ".join(weapon["abilities"]))
    return ", ".join(values)


def profile_text(profile):
    return (
        f"Move {profile.get('move', '—')}; Health {profile.get('health', '—')}; "
        f"Save {profile.get('save', '—')}; Control {profile.get('control', '—')}; "
        f"Ward {profile.get('ward') or '—'}"
    )


def escape_cell(value):
    return str(value).replace("|", "\\|").replace("\n", " ")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--app-data", required=True)
    parser.add_argument("--audit", required=True)
    parser.add_argument("--table-audit", required=True)
    parser.add_argument("--manifest", required=True)
    parser.add_argument("--verified", required=True)
    parser.add_argument("--report", required=True)
    parser.add_argument("--templates", required=True)
    args = parser.parse_args()

    app_data = json.loads(Path(args.app_data).read_text(encoding="utf-8"))
    audit = json.loads(Path(args.audit).read_text(encoding="utf-8"))
    table_audit = json.loads(Path(args.table_audit).read_text(encoding="utf-8"))
    manifest = json.loads(Path(args.manifest).read_text(encoding="utf-8"))
    verified = json.loads(Path(args.verified).read_text(encoding="utf-8"))

    audit_by_key = {(item["faction"], item["id"]): item for item in audit["units"]}
    table_by_key = {(item["faction"], item["id"]): item for item in table_audit["units"]}
    errors_by_key = defaultdict(list)
    for item in verified:
        errors_by_key[(item["faction"], item["unit"])].append(item)

    total_units = sum(len(army["units"]) for army in app_data)
    total_weapons = sum(len(unit.get("weapons", [])) for army in app_data for unit in army["units"])
    total_abilities = sum(len(unit.get("abilities", [])) for army in app_data for unit in army["units"])
    located = sum(not item.get("reason") for item in audit["units"])
    profile_evidence = set()
    weapon_evidence = set()
    ability_evidence = set()
    keyword_evidence = set()
    semantic_doubts = []
    for item in audit["units"]:
        key = (item["faction"], item["id"])
        if item.get("profile") == "evidence":
            profile_evidence.add(key)
        if item.get("keywords") == "evidence":
            keyword_evidence.add(key)
        for weapon in item.get("weapons", []):
            if weapon.get("status") == "evidence":
                weapon_evidence.add((key, weapon["name"]))
        for ability in item.get("abilities", []):
            if ability.get("status") == "evidence":
                ability_evidence.add((key, ability["name"]))
            elif ability.get("nameScore", 0) >= 0.7 and ability.get("descriptionScore", 1) < 0.45:
                semantic_doubts.append({
                    "faction": item["faction"],
                    "unit": item["unit"],
                    "ability": ability["name"],
                    "source": item.get("source", "—"),
                    "page": item.get("page", "—"),
                })
    for item in table_audit["units"]:
        key = (item["faction"], item["id"])
        if item["profile"]["status"] == "confirmed":
            profile_evidence.add(key)
        for weapon in item["weapons"]:
            if weapon["status"] == "confirmed":
                weapon_evidence.add((key, weapon["name"]))

    report = [
        "# Auditoría oficial de warscrolls · 2 de agosto de 2026",
        "",
        "> Autoridad usada: exclusivamente los battletomes y suplementos aportados. El Battle Profiles queda reservado a puntos, tamaño de unidad y peanas; no se ha usado para decidir características, armas, habilidades o keywords.",
        "",
        "## Resultado",
        "",
        f"- Warscrolls de la app inventariados: **{total_units}** en **{len(app_data)} ejércitos**.",
        f"- Warscrolls localizados con confianza suficiente en los PDF: **{located}/{total_units}**; quedan **{total_units - located}** localizaciones manuales.",
        f"- Perfiles de arma inventariados: **{total_weapons}**; filas con evidencia OCR compatible: **{len(weapon_evidence)}**.",
        f"- Habilidades inventariadas: **{total_abilities}**; descripciones con evidencia textual compatible: **{len(ability_evidence)}**.",
        f"- Perfiles generales con evidencia compatible: **{len(profile_evidence)}/{total_units}**.",
        f"- Keywords con evidencia compatible: **{len(keyword_evidence)}/{total_units}**.",
        f"- Discrepancias de arma confirmadas visualmente: **{len(verified)}**.",
        "",
        "La evidencia OCR compatible no equivale a una certificación visual completa. Los campos no confirmados están preparados en las plantillas por ejército para revisión manual.",
        "",
        "## Comprobaciones solicitadas",
        "",
        "- **Beast-skewer Killbow:** el battletome confirma Move 5\" y Jaggedy Blades con 3 ataques. La app ya contiene ambos valores correctos.",
        "- La selección de battleplan y de hasta 2 battle tactics ya está disponible en la pestaña Ejército; la pestaña Misión las muestra después como consulta.",
        "",
        "## Discrepancias confirmadas",
        "",
        "| Ejército | Unidad | Campo | App | Battletome | Fuente |",
        "|---|---|---|---|---|---|",
    ]
    for item in verified:
        report.append(
            f"| {escape_cell(item['faction'])} | {escape_cell(item['unit'])} | {escape_cell(item['field'])} | "
            f"{escape_cell(item['app'])} | {escape_cell(item['official'])} | {escape_cell(item['source'])}, PDF p. {item['page']} |"
        )

    report.extend([
        "",
        "## Dudas de localización que requieren búsqueda manual",
        "",
        "Estas unidades no quedaron emparejadas con suficiente confianza con una mitad concreta del PDF. No se ha inferido ningún dato.",
        "",
        "| Ejército | Unidad | Fuente candidata | Página candidata |",
        "|---|---|---|---|",
    ])
    for item in audit["units"]:
        if item.get("reason"):
            report.append(
                f"| {escape_cell(item['faction'])} | {escape_cell(item['unit'])} | "
                f"{escape_cell(item.get('source', '—'))} | {escape_cell(item.get('page', '—'))} |"
            )

    report.extend([
        "",
        "## Habilidades para contraste semántico manual",
        "",
        "El nombre aparece, pero el resumen de la app comparte menos del 45 % de los términos reconocidos. Puede ser una paráfrasis correcta o un cambio real.",
        "",
        "| Ejército | Unidad | Habilidad | Fuente candidata |",
        "|---|---|---|---|",
    ])
    for item in semantic_doubts:
        report.append(
            f"| {escape_cell(item['faction'])} | {escape_cell(item['unit'])} | {escape_cell(item['ability'])} | "
            f"{escape_cell(item['source'])}, PDF p. {escape_cell(item['page'])} |"
        )

    report.extend([
        "",
        "## Fuentes por ejército",
        "",
    ])
    for faction, sources in manifest.items():
        report.append(f"### {faction}")
        report.append("")
        report.extend(f"- `{source}`" for source in sources)
        report.append("")

    report_path = Path(args.report)
    report_path.parent.mkdir(parents=True, exist_ok=True)
    report_path.write_text("\n".join(report).rstrip() + "\n", encoding="utf-8")

    templates_dir = Path(args.templates)
    templates_dir.mkdir(parents=True, exist_ok=True)
    index_lines = [
        "# Plantillas de warscroll por ejército",
        "",
        "Cada archivo contiene todos los warscrolls actuales de ese ejército, con los valores de la app y espacios para copiar el dato oficial del battletome.",
        "",
    ]
    for army in app_data:
        faction = army["faction"]
        file_name = f"{slug(faction)}.md"
        index_lines.append(f"- [{faction}]({file_name}) · {len(army['units'])} warscrolls")
        lines = [
            f"# {faction} · plantilla de warscrolls",
            "",
            "Rellena únicamente la columna/campo **Battletome** cuando quieras corregir o certificar un dato. La columna **App** es una fotografía de los datos actuales.",
            "",
            "Fuentes asignadas:",
            "",
        ]
        lines.extend(f"- `{source}`" for source in manifest[faction])
        lines.append("")
        for unit in army["units"]:
            key = (faction, unit["id"])
            result = audit_by_key[key]
            table_result = table_by_key.get(key)
            page = result.get("page", "—")
            source = result.get("source", "—")
            location = "dudosa" if result.get("reason") else "localizada"
            lines.extend([
                f"## {unit['name']}",
                "",
                f"- Fuente candidata: `{source}` · PDF p. {page} · **{location}**",
                f"- ID de la app: `{unit['id']}`",
                "",
                "### Perfil",
                "",
                f"- App: {profile_text(unit.get('profile', {}))}",
                "- Battletome: Move ___; Health ___; Save ___; Control ___; Ward ___",
                "",
                "### Armas",
                "",
            ])
            if unit.get("weapons"):
                lines.extend(["| Arma | App | Battletome |", "|---|---|---|"])
                for weapon in unit["weapons"]:
                    lines.append(f"| {escape_cell(weapon['name'])} | {escape_cell(weapon_profile(weapon))} | ___ |")
            else:
                lines.append("- Sin armas registradas en la app.")
            lines.extend(["", "### Habilidades", ""])
            if unit.get("abilities"):
                for ability in unit["abilities"]:
                    prefix = " · ".join(value for value in [ability.get("phase"), ability.get("type")] if value)
                    lines.append(f"- **{ability['name']}**{f' ({prefix})' if prefix else ''}")
                    lines.append(f"  - App: {ability.get('description') or '—'}")
                    lines.append("  - Battletome: ___")
            else:
                lines.append("- Sin habilidades registradas en la app.")
            lines.extend([
                "",
                "### Keywords",
                "",
                f"- App: {', '.join(unit.get('keywords', [])) or '—'}",
                "- Battletome: ___",
                "",
                "### Observaciones/corrección",
                "",
                "___",
                "",
                "---",
                "",
            ])
        (templates_dir / file_name).write_text("\n".join(lines).rstrip() + "\n", encoding="utf-8")
    (templates_dir / "README.md").write_text("\n".join(index_lines).rstrip() + "\n", encoding="utf-8")
    print(f"Generated report and {len(app_data)} army templates", flush=True)


if __name__ == "__main__":
    main()

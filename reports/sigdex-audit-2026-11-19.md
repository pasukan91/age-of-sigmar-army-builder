# Auditoría de SigDex — 19 de noviembre de 2026

Fuente consultada en directo: [SigDex](https://sigdex.io/) y [catálogo público](https://api.sigdex.io/blob?name=main).

Servidor: **4.1.1**. Revisión BSData: `bce805b3a31df9f5df1a7304aefaf023aec1b52d`. Battle Profiles: `latest`. FAQ: **2026-11-13**.

SHA-256 del catálogo descargado: `28743b3938e899ed1e294765fc1ab84be3c0185c6dc721006f74a502c3466ca9`.

## Resultado

25 facciones activas, 776 unidades, 61 ejércitos de renombre y 78 regimientos de renombre. Khazalite Holds reemplaza a Fyreslayers conservando el identificador interno de las listas guardadas. No se crea una segunda facción duplicada. Beasts of Chaos y Bonesplitterz siguen marcadas como Legends en SigDex y se mantienen fuera del catálogo de juego equilibrado.

| Contenido | Antes | Ahora |
|---|---:|---:|
| units | 761 | 776 |
| terrain | 24 | 24 |
| battleTraits | 133 | 137 |
| battleFormations | 105 | 105 |
| heroicTraits | 78 | 78 |
| artefacts | 78 | 78 |
| aqshyHeroicTraits | 24 | 24 |
| aqshyArtefacts | 36 | 36 |
| aqshyEnhancements | 95 | 95 |
| spellLores | 26 | 28 |
| prayerLores | 17 | 17 |
| manifestationLores | 18 | 18 |
| armiesOfRenown | 58 | 61 |
| regimentsOfRenown | 76 | 78 |

## Cobertura por facción

| Facción | Unidades | Ejércitos de renombre |
|---|---:|---:|
| Blades of Khorne | 28 | 2 |
| Cities of Sigmar | 65 | 2 |
| Daughters of Khaine | 22 | 3 |
| Disciples of Tzeentch | 28 | 2 |
| Flesh-eater Courts | 27 | 2 |
| Khazalite Holds | 35 | 4 |
| Gloomspite Gitz | 40 | 3 |
| Hedonites of Slaanesh | 30 | 2 |
| Helsmiths of Hashut | 18 | 2 |
| Idoneth Deepkin | 20 | 2 |
| Ironjawz | 18 | 3 |
| Kharadron Overlords | 21 | 3 |
| Kruleboyz | 19 | 2 |
| Lumineth Realm-lords | 27 | 2 |
| Maggotkin of Nurgle | 35 | 2 |
| Nighthaunt | 27 | 2 |
| Ogor Mawtribes | 36 | 4 |
| Ossiarch Bonereapers | 26 | 2 |
| Seraphon | 36 | 0 |
| Skaven | 43 | 2 |
| Slaves to Darkness | 41 | 3 |
| Sons of Behemat | 13 | 3 |
| Soulblight Gravelords | 35 | 3 |
| Stormcast Eternals | 63 | 3 |
| Sylvaneth | 23 | 3 |

## Cambios y correcciones

- Catálogo, perfiles, armas, habilidades, mejoras, elegibilidad y saberes contrastados con el snapshot actual de SigDex. Se incluyen también las reglas propias de los ejércitos de renombre.
- Nuevos regimientos: Fjori's Vengeance y Thengin's Grudgesettlers.
- Los seis saberes universales de manifestaciones se regeneran de la fuente actual, conservando las imágenes locales disponibles.
- Las seis cartas y dieciocho tácticas del GHB 2026-27, y los doce planes de batalla, usan el texto actual de SigDex. Se conservan sus identificadores y mapas para no cambiar selecciones guardadas. El texto reglamentario actualizado está en el idioma original de la fuente.
- Actualizadas reglas básicas, reglas avanzadas, battlepack y FAQ; añadidos los planes de batalla al visor de documentos.
- Corregida la importación de costes: lanzamiento, plegarias, Blood Tithe y Fate Points no se presentan como puntos de mando. Se conservan las condiciones de desbloqueo.
- Las variantes antiguas de Hearthguard Berzerkers se migran a la ficha unificada actual manteniendo instancia y refuerzo.
- El generador descubre todas las facciones activas de la fuente; las nuevas dejan de depender de una lista cerrada de nombres.

## Discrepancias documentadas

1. **The Twistweald**: SigDex 4.1.1 conserva la palabra CHAMPION sin proporción. Se mantiene la corrección oficial de 28/10/2026 CHAMPION (1/8). Las antiguas sustituciones completas de Khazalite Holds y Lofnir ya no se aplican al catálogo 4.x, para no borrar sus reglas nuevas.
2. El análisis de 25.102 campos de texto detectó 29 incidencias de énfasis. Se corrigió la interpretación de marcadores de palabra clave dentro de frases en negrita, reduciéndolas a **15 incidencias de delimitadores mal cerrados en la propia fuente** (incluye repeticiones del mismo texto). No se altera el texto reglamentario para disimular esas erratas. Detalle: [sigdex-formatting-2026-11-19.json](sigdex-formatting-2026-11-19.json).
3. Las miniaturas nuevas sin imagen local específica utilizan la imagen de facción o alianza existente. La auditoría reglamentaria no implica disponer de fotografías nuevas de cada miniatura.

## Verificación

- 133 pruebas automáticas correctas, incluida migración de listas, comparación de armas y costes con SigDex, tácticas y planes de batalla.
- Validación de datos: 25 facciones y 776 unidades válidas.
- Duplicados: ninguna incidencia en las colecciones auditadas.
- ESLint y compilación de producción comprobados antes de publicar.

## Repetir la actualización

```powershell
node --use-system-ca scripts/fetch-sigdex.mjs
node scripts/generate-sigdex-catalogue.mjs
node scripts/generate-sigdex-regiments.mjs
node scripts/generate-sigdex-rules.mjs
node --test
node scripts/validate-factions.mjs
```

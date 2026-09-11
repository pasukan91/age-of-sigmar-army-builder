# Auditoría de catálogo y duplicados — 11/09/2026

## Corrección

La segunda capa de carga (`applyAosCommunityWording`) reconstruía colecciones ya seleccionadas por el catálogo completo a partir de un índice más amplio. Este índice incluye Spearhead y varias publicaciones estacionales. Se detectaron 16 colisiones de identificador y nombre en rasgos de batalla, rasgos heroicos y artefactos.

Casos: Always Three Clawsteps Ahead, Gnawhole Ambush, The Lurking Vermintide, Glamourweave, Under the Light of the Bad Moon, Cosmopolitan Leader, The Hunger, The Rising Dead, Immortal Ego, Murderlust, Blood-drenched, Eye of the Gods, Flawless Commander, Ethereal, Feeding Frenzy y Summon Loyal Subjects.

La capa de texto ahora conserva las colecciones y el texto de la publicación seleccionada por el catálogo completo, también en ejércitos de renombre. Las mejoras locales adicionales siguen recibiendo texto; si existen varios candidatos, ya no se elige arbitrariamente por fase. Se conserva el identificador de cada opción para las listas guardadas.

## Verificación

- 25 facciones y 732 unidades: validación de datos superada.
- 44.075 colecciones y 19.348 entradas con nombre, incluyendo facciones, ejércitos de renombre, regimientos de renombre, planes de batalla, tácticas y reglas universales: sin colisiones de ID/nombre ni reglas exclusivamente de Spearhead.
- Los perfiles de armas de disparo y combate con igual nombre se distinguen por tipo y se conservan.
- 25.795 campos de texto: cero incidencias del auditor de formato.
- Auditor de imágenes: cero incidencias.
- Suite completa: 98 pruebas superadas. Después se amplió y volvió a ejecutar la prueba de autoridad del catálogo: superada, con comprobación de cantidades, descripciones, trasfondo y grupos para impedir que otras publicaciones se reintroduzcan.
- ESLint completo y comprobación posterior de archivos modificados: sin errores.
- Compilación de producción: correcta.
- Persistencia: las listas guardadas resuelven la facción desde el catálogo al restaurarse.

Control repetible añadido: `npm run audit:duplicates`.

## Alcance y limitaciones

Auditoría técnica del catálogo local y sus transformaciones. Se contrastaron las 22 facciones del catálogo completo con su versión local 476; la validación estructural también abarca las otras tres facciones de la app. No es una nueva verificación de todas las reglas contra las publicaciones oficiales más recientes ni una comprobación visual de cada pantalla.

Permanece el aviso de tamaño del paquete JavaScript (10,58 MB sin comprimir; 2,23 MB gzip), relevante para el tiempo de carga. No se ha desplegado la aplicación.

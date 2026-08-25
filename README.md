# Storm Forge — AoS Army Builder

## Publicar en el Apache local

La carpeta pública compartida de Apache está mapeada como `Z:\`. El virtual host sirve `Z:\html\dist` y está disponible en `http://10.100.100.101/`.

Desde el terminal integrado de Visual Studio, ejecuta un único comando:

```powershell
npm run deploy:apache
```

Este comando:

1. Compila la aplicación con Vite.
2. Genera la versión de producción en `dist\`.
3. Crea `Z:\html\dist` si todavía no existe.
4. Limpia únicamente los archivos web generados anteriormente en `Z:\html\dist`.
5. Copia `dist\` a `Z:\html\dist` y comprueba el `index.html` publicado.

El script no intenta borrar `node_modules`, el código fuente ni otras carpetas del servidor. Si algún archivo antiguo está protegido, muestra un aviso y continúa intentando publicar la versión nueva.

También puedes ejecutar `PUBLICAR-EN-APACHE.cmd` con doble clic. Realiza el mismo proceso y mantiene la ventana abierta para mostrar el resultado.

Después de publicarla, abre desde un móvil conectado a la misma red:

```text
http://10.100.100.101/
```

Si `Z:\` no está disponible en el terminal, vuelve a conectar la unidad de red en esa misma sesión o ejecuta el script indicando la ruta compartida real:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\deploy-apache.ps1 -TargetRoot "\\servidor\recurso\html\dist"
```

## Desarrollo

```powershell
npm run dev
```

## Comprobaciones

```powershell
npm run lint
npm run build
```

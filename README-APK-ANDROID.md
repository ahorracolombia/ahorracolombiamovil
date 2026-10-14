# Ahorrá Colombia — generar APK Android instalable

Este proyecto conserva la interfaz existente y agrega un flujo de compilación de Android. El APK se genera en GitHub Actions; este entorno de trabajo no incluye Android SDK y no puede compilarlo directamente.

## Cómo obtener el APK

1. Sube el contenido de este ZIP a la raíz del repositorio GitHub donde mantienes Ahorrá Colombia. Asegúrate de incluir también la carpeta oculta `.github/workflows/`.
2. En GitHub, abre **Settings → Secrets and variables → Actions → Variables** y crea `AHORRA_API_BASE_URL` con la URL HTTPS real de tu proyecto Vercel (por ejemplo, `https://tu-proyecto.vercel.app`). Debe ser el despliegue donde funcione `/api/catalogo`. No uses una URL que devuelva 404.
3. En el repositorio, abre **Actions → Compilar APK Android → Run workflow**. También se inicia al hacer push a `main` o `master`.
4. Cuando termine en verde, abre la ejecución, baja hasta **Artifacts** y descarga `ahorra-colombia-debug-apk`.
5. Descomprime el artefacto y copia `app-debug.apk` al teléfono Android. Ábrelo para instalarlo; Android puede pedir autorización para instalar desde esa fuente.

## Importante

- Es un APK **debug** instalable para pruebas, no un APK firmado de publicación para Google Play.
- La app abre como aplicación Android independiente con su icono, no como una pestaña del navegador. Para consultar precios remotos necesita que `AHORRA_API_BASE_URL` apunte a una API desplegada y funcional.
- El APK se genera en los servidores de GitHub; no se incluye un APK compilado en este ZIP porque este entorno no tiene Android SDK ni acceso a los servidores de descarga de Google para instalarlo.
- Para conservar el sitio de Vercel, revisa que el repositorio incluya `index.html`, `api/catalogo.js` y `vercel.json` si tu despliegue lo necesita. Este ZIP mantiene el archivo `api/catalogo.js`.

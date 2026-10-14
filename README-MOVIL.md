# Ahorrá Colombia — app móvil + PWA

Este paquete envuelve el catálogo y comparativa existentes, no los sustituye por una demo. Conserva el carrito, el buscador, las listas y el generador de mercado que ya estaban en `index.html`. Añade instalación como PWA, iconos y estructura Capacitor para preparar builds Android/iOS.

## Probar primero en el celular (sin tienda)

1. Despliega estos archivos en el mismo proyecto de Vercel que tiene `api/catalogo.js`.
2. Abre la URL HTTPS del despliegue desde Chrome Android o Safari iPhone.
3. Android: menú ⋮ → **Instalar aplicación** / **Añadir a pantalla de inicio**. iPhone: Compartir → **Añadir a pantalla de inicio**.
4. La app requiere conexión a Internet para consultar catálogos; el shell puede abrirse con conexión limitada, pero los precios/API no se consultan sin red.

Archivos PWA añadidos: `manifest.webmanifest`, `sw.js`, `icons/`, `mobile-config.js`.

## Preparar APK/AAB Android y app iOS

Requisitos: Node.js 20+, Android Studio y SDK para Android. Para iOS se necesita macOS con Xcode y cuenta Apple Developer para distribución.

```bash
npm install
```

### Backend de precios

La app nativa necesita que la API se aloje en HTTPS. Publica `api/catalogo.js` en Vercel y configura la URL pública en `mobile-config.js`, por ejemplo:

```js
window.AHORRA_API_BASE_URL = 'https://TU-PROYECTO.vercel.app';
window.ahorraApiUrl = function(path) {
  const base = String(window.AHORRA_API_BASE_URL || '').replace(/\/$/, '');
  return base + (path.startsWith('/') ? path : '/' + path);
};
```

No uses una URL de ejemplo: reemplázala por la URL real del proyecto que despliegues. La misma API se comparte entre web y móvil, de modo que las reglas de precios no se duplican.

### Android

```bash
npx cap add android
npx cap sync android
npx cap open android
```

En Android Studio prueba en un dispositivo/emulador. Para compartir con testers, genera APK firmado; para Play Store, genera Android App Bundle (`.aab`) firmado.

### iOS

En macOS:

```bash
npx cap add ios
npx cap sync ios
npx cap open ios
```

Prueba en simulador/dispositivo con Xcode y distribuye mediante TestFlight antes de enviar a App Store.

## Precios reales: aclaración esencial

Que sea una app móvil **no hace que los precios sean automáticamente más reales**. Los precios los suministran los supermercados a través del backend. Esta app reutiliza la API web para evitar que cada teléfono intente saltarse CORS; los precios pueden variar por ciudad, sucursal, sesión, promociones y disponibilidad. Algunas tiendas no tienen API pública estable y pueden bloquear la consulta. No se deben presentar valores aproximados como confirmados. Para una integración fiable por tienda se requieren endpoints oficiales/autorizados, acuerdos o proveedores de datos.

## Antes de publicar

- Cambiar `co.ahorracolombia.app` si tienes otro identificador de paquete reservado.
- Revisar permisos, política de privacidad y contacto de soporte.
- Probar catálogo, carrito, almacenamiento local, búsqueda y comparación en pantallas pequeñas.
- Confirmar derechos de uso de marcas/logotipos y cumplir las condiciones de cada supermercado.
- Configurar analítica/errores y límites de uso en API; no exponer credenciales secretas en el frontend.
- Las tiendas pueden exigir que la app aporte funcionalidad nativa suficiente; una PWA instalada es ideal para probar, pero no garantiza aprobación automática en App Store/Play Store.

## Validación

Este paquete es código fuente listo para desplegar/probar. No incluye APK/AAB firmado ni archivo IPA: esos artefactos requieren SDK/firmas y, para iOS, Xcode/macOS. No se ha probado aún contra una compra real de cada supermercado.

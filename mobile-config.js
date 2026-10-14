/* Configuración móvil de Ahorrá Colombia.
   En web se usa la misma web de origen. En una app nativa, define la URL HTTPS de tu backend Vercel. */
window.AHORRA_API_BASE_URL = window.AHORRA_API_BASE_URL || '';
window.ahorraApiUrl = function (path) {
  const base = String(window.AHORRA_API_BASE_URL || '').replace(/\/$/, '');
  return base + (path.startsWith('/') ? path : '/' + path);
};

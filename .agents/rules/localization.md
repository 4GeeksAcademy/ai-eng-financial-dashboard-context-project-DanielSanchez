# Idioma y formatos

**Nombre:** Formato coherente de idioma y moneda

**Alcance:** Textos visibles, etiquetas temporales y formato de importes o porcentajes del dashboard.

**Justificacion:** `frontend/src/lib/financial-utils.ts` fija `en-US` y `USD`; `frontend/src/components/dashboard/dashboard-header.tsx` usa textos en ingles, mientras que `frontend/src/App.tsx` presenta el error de carga en espanol.

**Guia especifica del proyecto:**
- Mantén idioma, locale y moneda coherentes con la configuracion elegida para el dashboard; evita introducir formatos locales directamente en componentes.
- Centraliza los valores de locale y moneda junto a los formateadores financieros y actualiza las pruebas de formato cuando cambien.
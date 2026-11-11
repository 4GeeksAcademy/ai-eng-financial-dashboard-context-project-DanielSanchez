# Fechas y periodos

**Nombre:** Fechas de calendario y periodos financieros

**Alcance:** Generacion de `create_date` en el backend y presentacion o agrupacion de fechas en el frontend.

**Justificacion:** `backend/app/routes.py` asigna el ano de cada movimiento segun `date.today()`. A la vez, `frontend/src/App.tsx` muestra el periodo fijo `2024 - Full Year`. El tipo del backend es `date`, pero `frontend/src/lib/financial-utils.ts` convierte el valor ISO a `Date` y agrupa con getters locales.

**Guia especifica del proyecto:**
- Deriva el periodo mostrado de las fechas efectivamente incluidas en los movimientos; no agregues etiquetas de ano fijas.
- Trata `create_date` como fecha de calendario sin hora. Agrupa por ano y mes sin que la zona horaria local pueda mover un movimiento al mes anterior.
- Al modificar el generador o la agrupacion, cubre limites de ano y movimientos en el primer dia del mes con pruebas.
# Reglas propuestas

Estado: borrador para revision; estas reglas no se consideran aprobadas hasta que el equipo las adopte.

## Fechas y periodos

**Regla:** Deriva las etiquetas de periodo de las fechas que devuelve la API; no fijes un ano en la interfaz si los datos se generan dinamicamente.

**Hecho del repo:** `frontend/src/App.tsx` pasa `2024 - Full Year` a la cabecera, mientras que `backend/app/routes.py` asigna el ano de cada movimiento segun `date.today()`.

**Regla:** Trata `create_date` como fecha de calendario sin hora y agrupa meses de forma independiente de la zona horaria local.

**Hecho del repo:** El backend modela `create_date` como `date`; `frontend/src/lib/financial-utils.ts` crea un `Date` y usa getters locales para obtener el ano y el mes.

## Contratos e integracion

**Regla:** Al cambiar tipos, categorias o campos financieros, actualiza el modelo Pydantic, los tipos TypeScript y las pruebas correspondientes en el mismo cambio.

**Hecho del repo:** Los valores `Literal` y `FinancialMovement` estan en `backend/app/routes.py`; sus equivalentes de TypeScript estan en `frontend/src/lib/financial-types.ts`.

**Regla:** Al agregar una ruta, define si sera consumida por la interfaz; si lo sera, implementa y prueba el recorrido completo desde el cliente hasta la API.

**Hecho del repo:** `backend/app/routes.py` declara rutas de resumen, facetas, alertas y comparacion, mientras que `frontend/src/App.tsx` solo solicita `/api/metrics`.

## Configuracion y ejecucion

**Regla:** Limita CORS a los origenes requeridos por cada entorno; no uses comodines para una implementacion desplegada.

**Hecho del repo:** `backend/app/main.py` permite cualquier origen, metodo y header, y habilita credenciales.

**Regla:** Documenta por separado la conexion de desarrollo en Docker Compose y la ejecucion directa en el host; no asumas que el nombre DNS de Compose existe fuera de Compose.

**Hecho del repo:** `frontend/vite.config.ts` configura el proxy hacia `http://backend:8000`; `README.es.md` documenta `VITE_API_BASE_URL` como alternativa.

**Regla:** No uses `depends_on` como comprobacion de disponibilidad; incorpora healthcheck o reintento cuando un cliente dependa de que la API ya responda al arrancar.

**Hecho del repo:** `docker-compose.yml` declara `depends_on` sin healthcheck y `frontend/src/App.tsx` hace una sola carga inicial sin reintento.

## Pruebas y determinismo

**Regla:** Nombra cada prueba por el invariante que verifica y no por una propiedad mas fuerte que la implementacion garantiza.

**Hecho del repo:** `test_generate_mock_movements_returns_full_year_sorted_data` en `backend/tests/test_routes.py` verifica 360 movimientos ordenados, pero la regla de fechas de `backend/app/routes.py` puede distribuirlos en dos anos calendario.

**Regla:** Usa un generador aleatorio local para datos mock; evita cambiar el estado aleatorio global del proceso.

**Hecho del repo:** `generate_mock_movements` llama a `random.seed(seed)` en `backend/app/routes.py`, que reinicia el generador global.

**Regla:** Mantén pruebas de logica pura en Vitest y pruebas de rutas en pytest; agrega pruebas de componente o integracion al cambiar la carga de datos o el manejo de errores de la interfaz.

**Hecho del repo:** `frontend/src/lib/financial-utils.test.ts` cubre utilidades; `backend/tests/test_routes.py` usa `TestClient` para rutas; no hay una prueba de `App` para su solicitud HTTP.

## Interfaz y formatos

**Regla:** Centraliza idioma y moneda de visualizacion y mantenlos coherentes con el idioma y moneda elegidos para la interfaz.

**Hecho del repo:** `frontend/src/lib/financial-utils.ts` fija `en-US` y `USD`; `frontend/src/components/dashboard/dashboard-header.tsx` usa textos en ingles y `frontend/src/App.tsx` muestra un error en espanol.

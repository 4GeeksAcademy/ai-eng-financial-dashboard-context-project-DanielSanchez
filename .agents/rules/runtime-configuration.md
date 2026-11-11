# Configuracion y disponibilidad

**Nombre:** Configuracion por entorno y disponibilidad de servicios

**Alcance:** CORS de FastAPI, proxy de Vite, variables de entorno y orden de arranque de Docker Compose.

**Justificacion:** `backend/app/main.py` permite cualquier origen, metodo y header, con credenciales habilitadas. `frontend/vite.config.ts` apunta a `http://backend:8000`, nombre DNS del servicio Compose; `README.es.md` documenta `VITE_API_BASE_URL` como alternativa. `docker-compose.yml` usa `depends_on` sin healthcheck y `frontend/src/App.tsx` no reintenta una carga fallida.

**Guia especifica del proyecto:**
- Limita CORS a los origenes requeridos por el entorno desplegado; no extiendas la configuracion permisiva de desarrollo a produccion.
- Documenta por separado el proxy dentro de Compose y la conexion desde el host. Usa `VITE_API_BASE_URL` cuando el frontend no pueda resolver el hostname `backend`.
- No trates `depends_on` como garantia de que la API ya responde. Si el cliente necesita disponibilidad al arrancar, agrega healthcheck y/o una politica de reintento y prueba ese comportamiento.
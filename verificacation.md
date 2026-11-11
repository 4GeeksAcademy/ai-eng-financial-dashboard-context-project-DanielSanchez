devuelve un mapeo de la estructura del proyecto, que servicios tiene y que entry points tiene.

20:59
Voy a revisar primero las reglas y la memoria del proyecto que indica AGENTS.md, y después contrastaré el árbol con los archivos de arranque y configuración para mapear servicios y entry points.

Read memory





Las rutas de reglas, skills y memory-bank indicadas en AGENTS.md no existen en este workspace, así que no hay instrucciones adicionales que incorporar. Ahora estoy siguiendo el cableado real desde Compose y los comandos de arranque hasta el backend y la app React.







El Compose define exactamente dos servicios: frontend y backend; la entrada de React consulta /api/metrics, y FastAPI monta ese router. Voy a revisar ahora los Dockerfiles, configuraciones y rutas restantes para precisar comandos, puertos y endpoints sin inferir de nombres.









La API tiene además de /health un conjunto de endpoints de métricas (facetas, agregados, comparación, alertas y filtros B2B/B2C). La configuración confirma proxy de Vite hacia backend:8000 y arranque con debugpy en 5678; cierro el mapa comprobando la documentación y los tests presentes.







Mapa del proyecto

Servicios
La configuración de docker-compose.yml levanta dos servicios:

frontend: React 19, TypeScript y Vite. Publica el puerto 5173; Vite reenvía las peticiones /api al backend.
backend: FastAPI y Uvicorn. Publica 8000; expone también 5678 para depuración con debugpy.
No hay servicio de base de datos configurado. El backend genera movimientos financieros mock con semilla fija (42) en routes.py.

Entry points
Ejecución conjunta: docker compose up --build, documentado en README.es.md.
Backend ASGI: app.main:app, configurado en Dockerfile. main.py crea la app FastAPI, configura CORS y registra el router.
Frontend web: index.html monta src/main.tsx; main.tsx renderiza App.tsx. App obtiene /api/metrics y prepara los datos del dashboard.
Tests: backend con pytest en test_routes.py; frontend con npm test (Vitest), según los scripts de package.json.
API disponible
En routes.py están definidos:

GET /health
GET /api/metrics y los filtros B2B/B2C
GET /api/metrics/facets
GET /api/metrics/summary
GET /api/metrics/categories/top
GET /api/metrics/comparison
GET /api/metrics/alerts
La documentación interactiva de FastAPI queda disponible en http://localhost:8000/docs.

Se han creado 2 tareas pendientes

20:59
42s
•
GPT-6 Luna • 0.5 credits
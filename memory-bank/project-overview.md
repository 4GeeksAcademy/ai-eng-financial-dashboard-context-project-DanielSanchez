# Project Overview

Ultima revision de este resumen: 2026-11-11.

Este documento registra hechos visibles en el codigo y configuracion actuales. Las propuestas de trabajo se identifican como recomendaciones tecnicas, no como roadmap aprobado.

## Producto

### Hechos verificados

- El repositorio implementa un dashboard de metricas financieras con frontend React/TypeScript y backend FastAPI. Evidencia: `README.es.md`, `frontend/src/App.tsx`, `backend/app/main.py`.
- La pantalla principal presenta KPI de ingresos, gastos, beneficio y porcentaje de beneficio, ademas de graficos de ingresos/gastos y porcentaje de beneficio. Evidencia: `frontend/src/App.tsx`, `frontend/src/components/dashboard/kpi-row.tsx`, `frontend/src/components/dashboard/income-outcome-chart.tsx`, `frontend/src/components/dashboard/profit-percent-chart.tsx`.
- La pantalla incluye una lista de ingresos con fecha e importe. Evidencia: `frontend/src/App.tsx`, `frontend/src/components/dashboard/income-list.tsx`.
- El backend genera movimientos simulados en memoria, con tipos de operacion, categoria, cliente B2B/B2C y fecha. Las rutas usan `seed=42`; no se configura persistencia ni servicio de base de datos. Evidencia: `backend/app/routes.py`, `docker-compose.yml`.
- Las fechas de los datos se asignan con una regla dependiente de `date.today()`. Por ello, no se debe asumir que la etiqueta de periodo mostrada representa el rango real. Evidencia: `backend/app/routes.py`, `frontend/src/App.tsx`.

No se infieren usuarios objetivo, procesos contables soportados, alertas operativas ni promesas de negocio mas alla de lo que muestra la interfaz y exponen las rutas.

## Stack tecnologico

| Area | Tecnologia | Evidencia |
| --- | --- | --- |
| Backend | Python 3.13 (imagen `python:3.13-slim`), FastAPI, Uvicorn, debugpy | `backend/Dockerfile`, `backend/requirements.txt`, `backend/app/main.py` |
| Validacion backend | Pydantic models, pytest, pytest-cov, httpx | `backend/app/routes.py`, `backend/requirements.txt`, `backend/tests/test_routes.py` |
| Frontend | React 19, TypeScript ~6, Vite 8 | `frontend/package.json`, `frontend/src/main.tsx` |
| UI y graficos | Tailwind CSS 4, Recharts 3, lucide-react | `frontend/package.json`, `frontend/src/index.css`, `frontend/src/components/dashboard/` |
| Utilidades UI | class-variance-authority, clsx, tailwind-merge | `frontend/package.json`, `frontend/src/lib/utils.ts` |
| Calidad frontend | ESLint 9, Vitest 4 | `frontend/package.json`, `frontend/eslint.config.js`, `frontend/src/lib/financial-utils.test.ts` |
| Infraestructura local | Docker Compose; frontend en 5173, API en 8000, debugpy en 5678 | `docker-compose.yml`, `frontend/Dockerfile`, `backend/Dockerfile` |

Las dependencias Python no estan fijadas a versiones en `backend/requirements.txt`; las dependencias frontend usan los rangos que declara `frontend/package.json`.

Comando documentado: `docker compose up --build`. El frontend usa el proxy de Vite hacia `http://backend:8000` en `frontend/vite.config.ts`; `README.es.md` documenta `VITE_API_BASE_URL` para otro backend.

## Estado actual

### Implementado en codigo

- La API ofrece `GET /health`, `/api/metrics`, `/api/metrics/incomes`, `/api/metrics/facets`, `/api/metrics/summary`, `/api/metrics/categories/top`, `/api/metrics/comparison`, `/api/metrics/alerts`, `/api/metrics/b2b` y `/api/metrics/b2c`. Evidencia: decoradores de ruta en `backend/app/routes.py`.
- El dashboard consulta `/api/metrics` para calcular KPI y graficos, y `/api/metrics/incomes` para la lista de ingresos. Evidencia: `frontend/src/App.tsx`.
- Hay pruebas de rutas backend en `backend/tests/test_routes.py` y pruebas de utilidades financieras frontend en `frontend/src/lib/financial-utils.test.ts`.

### Gaps conocidos en el codigo

- La cabecera muestra el periodo fijo `2024 - Full Year`, aunque el ano de los movimientos se calcula dinamicamente. Evidencia: `frontend/src/App.tsx`, `backend/app/routes.py`.
- CORS permite cualquier origen, metodo y header, con credenciales habilitadas. Evidencia: `backend/app/main.py`. Revisar antes de desplegar con usuarios reales.
- La UI actual consume `/api/metrics` y `/api/metrics/incomes`; las demas rutas existen pero no se conectan desde `App`. Evidencia: `frontend/src/App.tsx`, `backend/app/routes.py`.
- Compose declara `depends_on`, pero no healthcheck. La carga inicial de cada recurso en `App` no tiene reintento. Evidencia: `docker-compose.yml`, `frontend/src/App.tsx`.
- La fecha ISO se convierte a `Date` y se agrupa usando getters locales, lo que puede producir diferencias cerca de medianoche segun la zona horaria. Evidencia: `frontend/src/lib/financial-utils.ts`.
- No hay una prueba de `App` para las llamadas a la API; el endpoint de ingresos no estaba cubierto por las pruebas existentes al revisar este resumen. Evidencia: `frontend/src/lib/financial-utils.test.ts`, `backend/tests/test_routes.py`.

### Validacion registrada

En el entorno de desarrollo inspeccionado el 2026-11-11:

- `python -m py_compile app/routes.py` finalizo correctamente.
- El smoke test HTTP no pudo ejecutarse porque el Python del entorno reporto `ModuleNotFoundError: No module named 'fastapi'`.
- `npm run build` no pudo ejecutarse porque el entorno reporto `tsc: not found`.
- El analisis de errores del editor no reporto errores en los archivos modificados.

Por tanto, el endpoint y la interfaz estan implementados en el codigo, pero su ejecucion integrada no quedo verificada en ese entorno.

## Siguientes prioridades tecnicas sugeridas

Estas prioridades derivan de gaps observables; no implican una hoja de ruta de producto aprobada.

1. Instalar las dependencias del proyecto en el entorno de desarrollo y ejecutar el smoke test del endpoint, las pruebas backend y el build frontend.
2. Alinear el periodo de la cabecera con las fechas devueltas por la API y verificar agrupaciones en limites de mes y de ano.
3. Restringir CORS a los origenes requeridos antes de un despliegue no local.
4. Decidir, segun requisitos de producto aun no documentados, si las rutas existentes de resumen, alertas, facetas y comparacion deben conectarse a la UI. No asumir que forman parte de un flujo acordado solo por estar implementadas.

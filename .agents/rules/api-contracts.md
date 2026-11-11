# Contratos e integracion de API

**Nombre:** Cambios sincronizados de contratos y consumo de API

**Alcance:** Esquemas de FastAPI, tipos TypeScript y llamadas de la interfaz a los endpoints financieros.

**Justificacion:** `backend/app/routes.py` define modelos Pydantic y valores `Literal`; `frontend/src/lib/financial-types.ts` mantiene tipos equivalentes. El backend declara endpoints de facetas, resumen, alertas y comparacion, mientras que `frontend/src/App.tsx` solo solicita `/api/metrics`.

**Guia especifica del proyecto:**
- Si cambias campos, categorias o tipos de operacion, actualiza el modelo del backend, los tipos del frontend y sus pruebas en el mismo cambio.
- Al agregar un endpoint, especifica si es parte del flujo actual del dashboard. Si debe aparecer en la UI, conecta el cliente y valida el recorrido completo.
- Mantén pruebas de ruta en `backend/tests/test_routes.py`; agrega cobertura del consumo frontend cuando cambie la solicitud, respuesta o estado de error de `App`.
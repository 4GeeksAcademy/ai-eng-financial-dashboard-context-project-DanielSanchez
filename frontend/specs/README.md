# 📋 Especificaciones - Financial Dashboard

Carpeta centralizada con documentación de todos los endpoints y especificaciones técnicas de la API del Financial Dashboard.

## 📁 Contenido

### 1. [API_ENDPOINTS_MAPPING.md](./API_ENDPOINTS_MAPPING.md)
**Documentación completa de los 3 endpoints principales**

- 📊 **Resumen de Métricas** (`GET /api/metrics/summary`)
  - Parámetros de query disponibles
  - Estructura de respuesta detallada
  - Ejemplo de uso

- 📈 **Comparación de Métricas** (`GET /api/metrics/comparison`)
  - Parámetros obligatorios y opcionales
  - Cálculo de deltas (absoluto y porcentual)
  - Casos de uso

- 🚨 **Alertas de Métricas** (`GET /api/metrics/alerts`)
  - Detección de anomalías
  - Interpretación de ratios
  - Filtrado por threshold

### 2. [API_EXAMPLES.md](./API_EXAMPLES.md)
**Ejemplos prácticos y casos de uso**

- Ejemplos de llamadas con `curl`
- Respuestas esperadas con interpretación
- Casos de decrecimiento y anomalías
- Flujos de uso típicos
- Integración con React/Frontend
- Manejo de errores

### 3. [RESPONSE_SCHEMAS.json](./RESPONSE_SCHEMAS.json)
**Esquemas JSON de respuesta**

- MetricsSummaryItem
- MetricsComparison
- MetricsAlert

Útil para:
- Validación en frontend
- Tipado TypeScript
- Generación de tipos

---

## 🚀 Inicio Rápido

### Ver documentación interactiva
```bash
curl http://localhost:8000/docs
```

### Probar endpoint de resumen
```bash
curl http://localhost:8000/api/metrics/summary
```

### Comparación con fechas obligatorias
```bash
curl "http://localhost:8000/api/metrics/comparison?start_date=2026-11-01&end_date=2026-11-30"
```

### Alertas con threshold
```bash
curl "http://localhost:8000/api/metrics/alerts?threshold=1.5"
```

---

## 🔗 Endpoints Principales

| Endpoint | Método | Propósito | Parámetros Requeridos |
|----------|--------|-----------|----------------------|
| `/api/metrics/summary` | GET | Resumen por período | Ninguno |
| `/api/metrics/comparison` | GET | Comparar períodos | start_date, end_date |
| `/api/metrics/alerts` | GET | Detectar anomalías | Ninguno |

---

## 📝 Guía por rol

### 👨‍💻 Frontend Developer
1. Lee [API_ENDPOINTS_MAPPING.md](./API_ENDPOINTS_MAPPING.md) - Estructura de datos
2. Revisa [API_EXAMPLES.md](./API_EXAMPLES.md) - Cómo llamar endpoints
3. Usa [RESPONSE_SCHEMAS.json](./RESPONSE_SCHEMAS.json) - Para tipado

### 🧪 QA/Tester
1. Consulta [API_EXAMPLES.md](./API_EXAMPLES.md) - Casos de prueba
2. Verifica [API_ENDPOINTS_MAPPING.md](./API_ENDPOINTS_MAPPING.md) - Validación de parámetros

### 📊 Product/Analyst
1. Entiende casos de uso en [API_EXAMPLES.md](./API_EXAMPLES.md)
2. Consulta propósito en [API_ENDPOINTS_MAPPING.md](./API_ENDPOINTS_MAPPING.md)

---

## 🛠️ Stack Técnico

- **Backend**: FastAPI + Uvicorn
- **Documentación**: OpenAPI/Swagger (Swagger UI en `/docs`)
- **Respuestas**: JSON
- **Formato de fechas**: YYYY-MM-DD

---

## ✅ Checklist Implementación Frontend

- [ ] Conectar endpoint de Summary
- [ ] Conectar endpoint de Comparison
- [ ] Conectar endpoint de Alerts
- [ ] Mapear respuestas a componentes
- [ ] Validar tipos con RESPONSE_SCHEMAS.json
- [ ] Implementar manejo de errores 422
- [ ] Agregar loading states
- [ ] Agregar retry logic

---

## 📞 Backend Status

El backend está corriendo en:
- **URL Base**: http://localhost:8000
- **Docs (Swagger)**: http://localhost:8000/docs
- **OpenAPI Spec**: http://localhost:8000/openapi.json

Para obtener la especificación completa en JSON:
```bash
curl http://localhost:8000/openapi.json | jq
```

---

**Última actualización**: 2026-11-13  
**Versión API**: 0.1.0  
**Extraído de**: OpenAPI/Swagger `/docs`

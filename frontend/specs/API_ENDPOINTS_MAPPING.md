# API Endpoints Mapping - Financial Dashboard

**Fecha de extracción**: 2026-11-13  
**Base URL**: `http://localhost:8000`  
**Documentación interactiva**: `/docs`

---

## 📊 Funcionalidad 1: Resumen de Métricas

### Endpoint
```
GET /api/metrics/summary
```

### Descripción
Obtiene un resumen de métricas financieras (ingresos, egresos y neto) agrupadas por período.

### Parámetros de Query

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| `group_by` | string | No | Criterio de agrupación (ej: "month", "week", "day") |
| `start_date` | date | No | Fecha inicial del período |
| `end_date` | date | No | Fecha final del período |
| `category` | string | No | Filtrar por categoría específica |
| `operation_type` | string | No | Tipo de operación (income/outcome) |
| `business_type` | string | No | Tipo de negocio (B2B/B2C) |

### Respuesta (Status 200)

**Tipo**: Array de objetos

```json
[
  {
    "period": "2026-11",
    "income": 15000.50,
    "outcome": 8234.75,
    "net": 6765.75
  },
  {
    "period": "2026-10",
    "income": 12000.00,
    "outcome": 7500.00,
    "net": 4500.00
  }
]
```

**Estructura de cada item**:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `period` | string | Período (formato: YYYY-MM o similar) |
| `income` | number | Ingresos totales |
| `outcome` | number | Egresos totales |
| `net` | number | Neto (ingresos - egresos) |

### Errores
- **Status 422**: Validation Error - Parámetros inválidos

---

## 📈 Funcionalidad 2: Comparación de Métricas

### Endpoint
```
GET /api/metrics/comparison
```

### Descripción
Compara métricas financieras entre dos períodos, mostrando deltas absolutos y porcentuales.

### Parámetros de Query

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| `start_date` | string | **Sí** | Fecha inicial del período actual (YYYY-MM-DD) |
| `end_date` | string | **Sí** | Fecha final del período actual (YYYY-MM-DD) |
| `business_type` | string | No | Tipo de negocio para filtrar (B2B/B2C) |

### Respuesta (Status 200)

**Tipo**: Objeto de comparación

```json
{
  "current_period": 15000.50,
  "previous_period": 12000.00,
  "delta_abs": 3000.50,
  "delta_pct": 25.00
}
```

**Estructura**:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `current_period` | number | Métrica del período actual |
| `previous_period` | number | Métrica del período anterior |
| `delta_abs` | number | Diferencia absoluta (current - previous) |
| `delta_pct` | number \| null | Diferencia porcentual. Null si previous_period es 0 |

### Ejemplos de uso

```
GET /api/metrics/comparison?start_date=2026-11-01&end_date=2026-11-30
GET /api/metrics/comparison?start_date=2026-11-01&end_date=2026-11-30&business_type=B2B
```

### Errores
- **Status 422**: Validation Error - Parámetros inválidos o faltantes

---

## 🚨 Funcionalidad 3: Alertas de Métricas

### Endpoint
```
GET /api/metrics/alerts
```

### Descripción
Obtiene alertas basadas en anomalías detectadas en los gastos (cuando superan el baseline promedio).

### Parámetros de Query

| Parámetro | Tipo | Requerido | Descripción |
|-----------|------|-----------|-------------|
| `threshold` | number | No | Umbral de aumento (ej: 1.5 = 50% encima del baseline) |
| `group_by` | string | No | Criterio de agrupación |
| `start_date` | date | No | Fecha inicial del período |
| `end_date` | date | No | Fecha final del período |
| `business_type` | string | No | Tipo de negocio (B2B/B2C) |

### Respuesta (Status 200)

**Tipo**: Array de objetos

```json
[
  {
    "period": "2026-11",
    "outcome_total": 9500.00,
    "baseline_average": 7200.00,
    "increase_ratio": 1.32
  },
  {
    "period": "2026-10",
    "outcome_total": 8234.75,
    "baseline_average": 7200.00,
    "increase_ratio": 1.14
  }
]
```

**Estructura de cada alert**:

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `period` | string | Período de la alerta (YYYY-MM) |
| `outcome_total` | number | Total de gastos en el período |
| `baseline_average` | number | Promedio histórico base de gastos |
| `increase_ratio` | number | Ratio de aumento (outcome / baseline) |

### Interpretación
- **increase_ratio > 1.0**: Gastos superiores al baseline
- **increase_ratio > threshold**: Genera alerta (si threshold está configurado)
- Útil para detectar anomalías y picos de gasto inusual

### Ejemplos de uso

```
GET /api/metrics/alerts
GET /api/metrics/alerts?threshold=1.5
GET /api/metrics/alerts?threshold=1.5&business_type=B2C&start_date=2026-01-01&end_date=2026-11-30
```

### Errores
- **Status 422**: Validation Error - Parámetros inválidos

---

## 📋 Resumen Comparativo

| Aspecto | Summary | Comparison | Alerts |
|---------|---------|-----------|--------|
| **Propósito** | Vista general periódica | Análisis período a período | Detección de anomalías |
| **Parámetros requeridos** | Ninguno | start_date, end_date | Ninguno |
| **Tipo de respuesta** | Array | Objeto único | Array |
| **Items por respuesta** | Múltiples períodos | Un período vs anterior | Múltiples períodos con anomalías |
| **Campos principales** | income, outcome, net | current, previous, delta | outcome_total, baseline, ratio |

---

## 🔌 Otros Endpoints Disponibles

- `GET /health` - Verifica el estado del servidor
- `GET /api/metrics` - Endpoint genérico de métricas
- `GET /api/metrics/incomes` - Detalle de ingresos
- `GET /api/metrics/facets` - Facetas de datos
- `GET /api/metrics/categories/top` - Categorías principales
- `GET /api/metrics/b2b` - Métricas B2B
- `GET /api/metrics/b2c` - Métricas B2C

---

## 🛠️ Notas Técnicas

- Todos los endpoints son **GET**
- Las fechas pueden ser strings (YYYY-MM-DD) o dates
- Las respuestas usan `application/json`
- Error de validación devuelve schema HTTPValidationError con detalles
- El backend está configurado con auto-reload para desarrollo

# 📝 Ejemplos de Uso - API Financial Dashboard

## 1️⃣ Resumen de Métricas - `/api/metrics/summary`

### Ejemplo 1: Obtener resumen sin filtros
```bash
curl -X GET "http://localhost:8000/api/metrics/summary"
```

**Respuesta esperada:**
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

---

### Ejemplo 2: Resumen agrupado por mes
```bash
curl -X GET "http://localhost:8000/api/metrics/summary?group_by=month"
```

---

### Ejemplo 3: Resumen con rango de fechas
```bash
curl -X GET "http://localhost:8000/api/metrics/summary?start_date=2026-09-01&end_date=2026-11-30"
```

---

### Ejemplo 4: Resumen filtrado por tipo de negocio
```bash
curl -X GET "http://localhost:8000/api/metrics/summary?business_type=B2B"
```

---

### Ejemplo 5: Resumen solo de ingresos
```bash
curl -X GET "http://localhost:8000/api/metrics/summary?operation_type=income&category=sales"
```

---

## 2️⃣ Comparación de Métricas - `/api/metrics/comparison`

### Ejemplo 1: Comparar noviembre vs octubre (período anterior automático)
```bash
curl -X GET "http://localhost:8000/api/metrics/comparison?start_date=2026-11-01&end_date=2026-11-30"
```

**Respuesta esperada:**
```json
{
  "current_period": 15000.50,
  "previous_period": 12000.00,
  "delta_abs": 3000.50,
  "delta_pct": 25.00
}
```

**Interpretación:**
- El período actual (nov) tuvo 15,000.50 en métricas
- El período anterior (oct) tuvo 12,000.00
- Crecimiento absoluto: 3,000.50
- Crecimiento porcentual: 25%

---

### Ejemplo 2: Comparación solo para B2B
```bash
curl -X GET "http://localhost:8000/api/metrics/comparison?start_date=2026-11-01&end_date=2026-11-30&business_type=B2B"
```

---

### Ejemplo 3: Comparar período completo (3 meses)
```bash
curl -X GET "http://localhost:8000/api/metrics/comparison?start_date=2026-09-01&end_date=2026-11-30"
```

---

### Ejemplo 4: Caso con decrecimiento
```bash
curl -X GET "http://localhost:8000/api/metrics/comparison?start_date=2026-11-01&end_date=2026-11-30"
```

Si el resultado fuera:
```json
{
  "current_period": 10000.00,
  "previous_period": 15000.00,
  "delta_abs": -5000.00,
  "delta_pct": -33.33
}
```

**Interpretación:**
- Decrecimiento de 33.33%
- Reducción absoluta de 5,000.00

---

## 3️⃣ Alertas de Métricas - `/api/metrics/alerts`

### Ejemplo 1: Obtener todas las alertas
```bash
curl -X GET "http://localhost:8000/api/metrics/alerts"
```

**Respuesta esperada:**
```json
[
  {
    "period": "2026-11",
    "outcome_total": 9500.00,
    "baseline_average": 7200.00,
    "increase_ratio": 1.32
  },
  {
    "period": "2026-09",
    "outcome_total": 8100.00,
    "baseline_average": 7200.00,
    "increase_ratio": 1.125
  }
]
```

**Interpretación:**
- Nov: Gastos un 32% encima del baseline
- Sep: Gastos un 12.5% encima del baseline

---

### Ejemplo 2: Alertas con threshold (solo mostrar si están encima del 50%)
```bash
curl -X GET "http://localhost:8000/api/metrics/alerts?threshold=1.5"
```

Solo retorna períodos donde `increase_ratio >= 1.5`

---

### Ejemplo 3: Alertas agrupadas por mes
```bash
curl -X GET "http://localhost:8000/api/metrics/alerts?group_by=month"
```

---

### Ejemplo 4: Alertas de gastos B2C
```bash
curl -X GET "http://localhost:8000/api/metrics/alerts?business_type=B2C"
```

---

### Ejemplo 5: Alertas en un rango específico con threshold
```bash
curl -X GET "http://localhost:8000/api/metrics/alerts?start_date=2026-01-01&end_date=2026-11-30&threshold=1.3&business_type=B2B"
```

Solo retorna alertas:
- Entre enero y noviembre
- Donde los gastos están 30%+ encima del baseline
- Solo para operaciones B2B

---

## 🔄 Flujo de Uso Típico

### 1. Dashboard Home
```bash
# 1. Obtener resumen actual
curl -X GET "http://localhost:8000/api/metrics/summary?group_by=month"

# 2. Obtener comparación mes actual vs anterior
curl -X GET "http://localhost:8000/api/metrics/comparison?start_date=2026-11-01&end_date=2026-11-30"

# 3. Obtener alertas activas
curl -X GET "http://localhost:8000/api/metrics/alerts?threshold=1.2"
```

### 2. Análisis de Período
```bash
# 1. Resumen con fechas específicas
curl -X GET "http://localhost:8000/api/metrics/summary?start_date=2026-09-01&end_date=2026-11-30&group_by=month"

# 2. Comparar trimestre
curl -X GET "http://localhost:8000/api/metrics/comparison?start_date=2026-09-01&end_date=2026-11-30"
```

### 3. Monitoreo de Alertas
```bash
# 1. Buscar anomalías recientes
curl -X GET "http://localhost:8000/api/metrics/alerts?threshold=1.5&start_date=2026-10-01"

# 2. Filtrar por tipo de negocio
curl -X GET "http://localhost:8000/api/metrics/alerts?business_type=B2C&threshold=1.3"
```

---

## ⚠️ Códigos de Error

### Error 422: Validation Error
```bash
curl -X GET "http://localhost:8000/api/metrics/comparison"
```

**Respuesta:**
```json
{
  "detail": [
    {
      "type": "missing",
      "loc": ["query", "start_date"],
      "msg": "Field required",
      "input": null
    },
    {
      "type": "missing",
      "loc": ["query", "end_date"],
      "msg": "Field required",
      "input": null
    }
  ]
}
```

**Causa:** Faltan parámetros requeridos `start_date` y `end_date`

---

## 📊 Integración en Frontend

### React Hook Example
```typescript
// Fetch summary
const fetchSummary = async () => {
  const response = await fetch('/api/metrics/summary?group_by=month');
  return response.json();
};

// Fetch comparison
const fetchComparison = async (startDate: string, endDate: string) => {
  const response = await fetch(
    `/api/metrics/comparison?start_date=${startDate}&end_date=${endDate}`
  );
  return response.json();
};

// Fetch alerts
const fetchAlerts = async (threshold: number = 1.2) => {
  const response = await fetch(`/api/metrics/alerts?threshold=${threshold}`);
  return response.json();
};
```

---

## 🎯 Resumen de Query Parameters

### Summary
- `group_by`: month | week | day
- `start_date`: YYYY-MM-DD
- `end_date`: YYYY-MM-DD
- `category`: string
- `operation_type`: income | outcome
- `business_type`: B2B | B2C

### Comparison (Required: start_date, end_date)
- `start_date`: YYYY-MM-DD ✅ **Obligatorio**
- `end_date`: YYYY-MM-DD ✅ **Obligatorio**
- `business_type`: B2B | B2C

### Alerts
- `threshold`: number (ej: 1.5)
- `group_by`: month | week | day
- `start_date`: YYYY-MM-DD
- `end_date`: YYYY-MM-DD
- `business_type`: B2B | B2C

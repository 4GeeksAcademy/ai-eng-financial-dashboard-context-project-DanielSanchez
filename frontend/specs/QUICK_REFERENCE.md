# ⚡ Quick Reference - API Financial Dashboard

## 3 Funcionalidades Principales

### 1. 📊 SUMMARY - Resumen de Métricas
```
GET /api/metrics/summary
├─ Parámetros (todos opcionales)
│  ├─ group_by: "month" | "week" | "day"
│  ├─ start_date: "YYYY-MM-DD"
│  ├─ end_date: "YYYY-MM-DD"
│  ├─ category: string
│  ├─ operation_type: "income" | "outcome"
│  └─ business_type: "B2B" | "B2C"
└─ Respuesta: Array[{period, income, outcome, net}]

EJEMPLO:
GET /api/metrics/summary?group_by=month

RESPUESTA:
[{
  "period": "2026-11",
  "income": 15000.50,
  "outcome": 8234.75,
  "net": 6765.75
}]
```

---

### 2. 📈 COMPARISON - Comparación de Períodos
```
GET /api/metrics/comparison
├─ Parámetros
│  ├─ start_date: "YYYY-MM-DD" ✅ OBLIGATORIO
│  ├─ end_date: "YYYY-MM-DD" ✅ OBLIGATORIO
│  └─ business_type: "B2B" | "B2C" (opcional)
└─ Respuesta: {current_period, previous_period, delta_abs, delta_pct}

EJEMPLO:
GET /api/metrics/comparison?start_date=2026-11-01&end_date=2026-11-30

RESPUESTA:
{
  "current_period": 15000.50,      ← Valor actual
  "previous_period": 12000.00,     ← Valor período anterior
  "delta_abs": 3000.50,            ← Diferencia absoluta
  "delta_pct": 25.00               ← Porcentaje de cambio
}
```

---

### 3. 🚨 ALERTS - Alertas de Anomalías
```
GET /api/metrics/alerts
├─ Parámetros (todos opcionales)
│  ├─ threshold: number (ej: 1.5)
│  ├─ group_by: "month" | "week" | "day"
│  ├─ start_date: "YYYY-MM-DD"
│  ├─ end_date: "YYYY-MM-DD"
│  └─ business_type: "B2B" | "B2C"
└─ Respuesta: Array[{period, outcome_total, baseline_average, increase_ratio}]

EJEMPLO:
GET /api/metrics/alerts?threshold=1.5

RESPUESTA:
[{
  "period": "2026-11",
  "outcome_total": 9500.00,        ← Gastos en período
  "baseline_average": 7200.00,     ← Promedio histórico
  "increase_ratio": 1.32           ← 32% encima del baseline
}]

⚠️ INTERPRETACIÓN:
- increase_ratio > 1.0  → Gastos encima del baseline
- increase_ratio = 1.5  → 50% encima del baseline
- increase_ratio = 2.0  → 100% encima del baseline (DOBLE)
```

---

## 🎯 Tabla Comparativa

```
┌─────────────┬────────────────┬───────────────┬──────────────┐
│  ENDPOINT   │   PROPÓSITO    │  PARÁMETROS   │  RESPUESTA   │
├─────────────┼────────────────┼───────────────┼──────────────┤
│  Summary    │ Ver ingresos   │  Opcionales   │  Array de    │
│             │ y gastos       │               │  períodos    │
├─────────────┼────────────────┼───────────────┼──────────────┤
│ Comparison  │ Comparar 2     │  Obligatorios │  1 objeto    │
│             │ períodos       │ start/end date│ con deltas   │
├─────────────┼────────────────┼───────────────┼──────────────┤
│  Alerts     │ Detectar       │  Opcionales   │  Array de    │
│             │ anomalías      │               │  alertas     │
└─────────────┴────────────────┴───────────────┴──────────────┘
```

---

## 🔧 Uso Práctico

### Setup Desarrollo Frontend
```typescript
// types.ts
import schemas from './RESPONSE_SCHEMAS.json';

type SummaryItem = typeof schemas.MetricsSummaryItem;
type Comparison = typeof schemas.MetricsComparison;
type Alert = typeof schemas.MetricsAlert;

// api.ts
const BASE_URL = 'http://localhost:8000';

export const metrics = {
  summary: async (params?: object) => {
    const q = new URLSearchParams(params);
    return fetch(`${BASE_URL}/api/metrics/summary?${q}`).then(r => r.json());
  },
  
  comparison: async (startDate: string, endDate: string, params?: object) => {
    const q = new URLSearchParams({startDate, endDate, ...params});
    return fetch(`${BASE_URL}/api/metrics/comparison?${q}`).then(r => r.json());
  },
  
  alerts: async (params?: object) => {
    const q = new URLSearchParams(params);
    return fetch(`${BASE_URL}/api/metrics/alerts?${q}`).then(r => r.json());
  }
};

// Component.tsx
import { metrics } from './api';

function Dashboard() {
  const [summary, setSummary] = useState<SummaryItem[]>([]);
  const [comparison, setComparison] = useState<Comparison | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    Promise.all([
      metrics.summary({group_by: 'month'}),
      metrics.comparison('2026-11-01', '2026-11-30'),
      metrics.alerts({threshold: 1.2})
    ]).then(([s, c, a]) => {
      setSummary(s);
      setComparison(c);
      setAlerts(a);
    });
  }, []);

  return (
    <>
      <SummaryChart data={summary} />
      <ComparisonCard data={comparison} />
      <AlertsList data={alerts} />
    </>
  );
}
```

---

## 📊 Casos de Uso

### Dashboard Principal
```
1. Cargar Summary → Mostrar gráfico de ingresos/gastos
2. Cargar Comparison → Mostrar KPI de crecimiento
3. Cargar Alerts (threshold=1.3) → Mostrar alertas activas
```

### Análisis de Período
```
1. Usuario selecciona rango de fechas
2. Llamar Summary con start_date/end_date
3. Llamar Comparison con start_date/end_date
4. Comparar trend
```

### Monitoreo de Alertas
```
1. Cada 5 minutos → GET /api/metrics/alerts
2. Si alertas nuevas → Notificar usuario
3. Filtrar por threshold según nivel de riesgo
```

---

## ❌ Errores Comunes

### Error 1: Olvidar parámetros en Comparison
```
❌ GET /api/metrics/comparison
→ HTTP 422: start_date y end_date son obligatorios

✅ GET /api/metrics/comparison?start_date=2026-11-01&end_date=2026-11-30
```

### Error 2: Formato de fecha incorrecto
```
❌ GET /api/metrics/summary?start_date=11/01/2026
→ HTTP 422: Formato inválido

✅ GET /api/metrics/summary?start_date=2026-11-01
```

### Error 3: Threshold inválido
```
❌ GET /api/metrics/alerts?threshold=50%
→ HTTP 422: Debe ser número

✅ GET /api/metrics/alerts?threshold=1.5
```

---

## 📌 Notas Importantes

1. **Todos son GET**: No hay POST, PUT, DELETE
2. **Sin autenticación**: Por ahora no hay headers de auth
3. **Respuestas en JSON**: `Content-Type: application/json`
4. **Validación 422**: FastAPI valida parámetros automáticamente
5. **Auto-reload**: Backend se reinicia si cambias archivos

---

## 🧪 Testing Rápido

```bash
# Test 1: Summary
curl http://localhost:8000/api/metrics/summary

# Test 2: Comparison (params obligatorios)
curl "http://localhost:8000/api/metrics/comparison?start_date=2026-11-01&end_date=2026-11-30"

# Test 3: Alerts con threshold
curl "http://localhost:8000/api/metrics/alerts?threshold=1.5"

# Test 4: Error de validación (faltan params)
curl http://localhost:8000/api/metrics/comparison
```

---

**Status**: ✅ Backend Running  
**Docs**: http://localhost:8000/docs  
**Last Updated**: 2026-11-13

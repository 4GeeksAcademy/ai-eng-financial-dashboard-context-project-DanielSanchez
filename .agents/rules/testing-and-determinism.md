# Pruebas y determinismo

**Nombre:** Pruebas alineadas con invariantes y datos reproducibles

**Alcance:** Pruebas de backend y frontend, nombres de pruebas y generacion de datos mock.

**Justificacion:** `backend/tests/test_routes.py` contiene una prueba llamada `test_generate_mock_movements_returns_full_year_sorted_data`, que comprueba 360 movimientos ordenados aunque `backend/app/routes.py` puede asignarlos a dos anos calendario. Ese modulo tambien llama a `random.seed(seed)`, que cambia el estado aleatorio global. En frontend hay pruebas Vitest para utilidades, pero no una prueba de la carga HTTP de `App`.

**Guia especifica del proyecto:**
- Nombra las pruebas por la propiedad que verifican; no uses "full year" si solo se asegura una cantidad de movimientos y orden cronologico.
- Usa un generador aleatorio local para datos mock, en vez de reiniciar el generador global del proceso.
- Conserva las pruebas de logica pura en Vitest y las pruebas HTTP en pytest con `TestClient`. Cuando cambies la carga de datos de `App`, cubre la respuesta y el fallo de la solicitud.
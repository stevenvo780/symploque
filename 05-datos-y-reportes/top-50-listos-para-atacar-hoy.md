# Top 50 listos para atacar hoy

Fecha de corte: 2026-04-12

## Archivo operativo

- CSV de trabajo inmediato: [leads-agora-top-50-hoy.csv](../03-datos/leads-agora-top-50-hoy.csv)
- Base completa de referencia: [leads-agora-maestro.csv](../03-datos/leads-agora-maestro.csv)

## Que contiene este corte

- 50 leads con `priority_rank` `1-50`
- 15 leads `A1`
- 20 leads `A2`
- 15 leads `B1`
- 50 registros en `estado = pendiente`
- 50 registros con `proxima_accion = contactar`

## Lectura rapida

El lote ya esta ordenado para ejecucion inmediata. No requiere triage previo adicional para empezar outreach.

Las instituciones con mas peso en este corte son:

- `Uniandes`: 15
- `UPB`: 11
- `Javeriana`: 7
- `UdeA`: 5
- `EAFIT`: 4
- `Univalle`: 3
- `UNAL Medellin`: 3
- `UIS`: 2

Los segmentos mas cargados en este lote son:

- `docencia`: 17
- `escuela`: 5
- `programa`: 4
- `semillero`: 3
- `red academica`: 3
- `centro de escritura`: 3

## Primer bloque sugerido

Si solo se va a trabajar una primera tanda hoy, conviene empezar por:

1. `1-15`
2. `16-30`
3. `31-50`

Esto permite tocar primero el tramo `A1`, luego el `A2` y dejar el `B1` como cola de la misma jornada o del siguiente bloque.

## Recomendacion operativa

Secuencia minima:

1. abrir [leads-agora-top-50-hoy.csv](../03-datos/leads-agora-top-50-hoy.csv)
2. usar [mensajes-y-copy.md](../02-mensajeria/mensajes-y-copy.md)
3. registrar en el mismo CSV `estado`, `fecha_ultimo_contacto`, `respuesta` y `proxima_accion`
4. si aparece interes real, completar `owner`, `plan_objetivo` y `probabilidad_cierre`

## Nota metodologica

Este corte no cambia el ranking del maestro. Solo separa la primera oleada operativa para evitar trabajar los 300 leads al tiempo.

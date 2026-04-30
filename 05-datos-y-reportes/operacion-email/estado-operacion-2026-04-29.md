# Estado de operacion email / ERP

Fecha de corte: 2026-04-29

## Resumen

- Leads creados en ERPNext: 296
- Envios aceptados por SMTP: 296
- Rebotes confirmados acumulados: 15
- Pendientes de respuesta: 281
- Prospectos sin email valido preparados por canal alterno: 4
- Respuestas humanas nuevas detectadas desde el 2026-04-28: 0
- Rebote acumulado: 5.07%

## Estado de bases

| Archivo | Estado |
|---|---|
| `leads-agora-maestro.csv` | 281 contactados, 15 rebotados, 4 pendientes por canal alterno |
| `leads-agora-top-50-hoy.csv` | 45 contactados, 1 rebotado, 4 pendientes sin email |
| `contactos-maestro-operativo.csv` | 281 pendientes de respuesta, 15 rebotados, 4 preparados por canal alterno |
| `correos-enviados-importar.csv` | 296 aceptados por SMTP, 281 pendientes, 15 rebotados |
| `primer-contacto-wave-1.csv` | 45 pendientes, 1 rebote |
| `primer-contacto-wave-2.csv` | 62 pendientes, 8 rebotes |
| `primer-contacto-wave-3.csv` | 174 pendientes, 6 rebotes |
| `declaracion-pendientes.csv` | 0 filas |
| `disculpa-error-pendientes.csv` | 0 filas |

## Cambios desde el corte anterior

El monitoreo IMAP del 2026-04-29 consolido 15 rebotes asociados a envios registrados. Frente al corte inicial de 8 rebotes, se marcaron 7 rebotes adicionales:

- `agora-legacy-057` / `investigacioncisc@javeriana.edu.co`
- `agora-legacy-076` / `semillerol.n.a@javeriana.edu.co`
- `agora-legacy-111` / `patrujillomo@unal.edu.co`
- `agora-legacy-131` / `fariverab@unal.edu.co`
- `agora-legacy-148` / `melopezhu@unal.edu.co`
- `agora-legacy-170` / `sgallini@unal.edu.co`
- `agora-legacy-243` / `jumdiazme@unal.edu.co`

## Archivos operativos actualizados

- `05-datos-y-reportes/operacion-email/rebotes-detectados-2026-04-27.csv`
- `05-datos-y-reportes/operacion-email/rebotes-detectados-2026-04-27.md`
- `05-datos-y-reportes/operacion-email/rebotes-recuperacion-2026-04-29.csv`
- `05-datos-y-reportes/operacion-email/revision-correos-alternativos-rebotes-2026-04-29.md`
- `04-mensajeria-email/preview-recuperacion-rebotes-2026-04-29.md`
- `05-datos-y-reportes/operacion-email/plan-seguimiento-281-2026-05-04.md`
- `04-mensajeria-email/preview-seguimiento-281-2026-05-04.md`

## Siguientes acciones reales

1. No enviar seguimiento masivo antes del 2026-05-04.
2. Ejecutar contacto manual de los 4 prospectos sin email si el operador confirma que ya puede hacerlo.
3. Revisar manualmente los 3 correos corregidos de rebotes recuperables antes de cualquier reenvio.
4. Mantener en espera los 6 casos Javeriana mientras persista el `mail loop`.
5. El 2026-05-04, revisar INBOX/rebotes y generar lote final solo con elegibles.

# Operacion email y ERP

Fecha operativa: 2026-04-27

## Estado actual

- `wave_1`, `wave_2` y `wave_3` ya fueron contactadas por primer correo corporativo el 2026-04-27.
- `leads-agora-maestro.csv` registra 291 filas en `estado=contactado`, 5 en `estado=rebotado` y 4 pendientes sin email.
- `leads-agora-top-50-hoy.csv` registra 45 filas en `estado=contactado`, 1 en `estado=rebotado` y 4 pendientes sin email.
- `contactos-maestro-operativo.csv` tiene 300 prospectos.
- Hay 296 contactos con email valido.
- La primera ola (`wave_1`) tiene 50 contactos, de los cuales 46 tienen email.
- La segunda ola (`wave_2`) tiene 70 contactos, todos con email.
- `correos-enviados-importar.csv` registra 296 envios aceptados por SMTP.
- Rebotes confirmados: 5; pendientes de respuesta: 291.
- `declaracion-pendientes.csv` y `disculpa-error-pendientes.csv` estan vacios porque este fue primer contacto real.
- Los lotes ERP quedaron exportados en `erp-leads-wave-1.csv`, `erp-leads-wave-2.csv` y `erp-leads-wave-3.csv`.
- Los lotes de correo quedaron enviados y marcados como `send_status=sent` o `send_status=bounced` en `primer-contacto-wave-1.csv`, `primer-contacto-wave-2.csv` y `primer-contacto-wave-3.csv`.
- Los reportes de `wave_2` y `wave_3` quedaron en `reporte-wave-2-2026-04-27.md` y `reporte-wave-3-2026-04-27.md`.
- El reporte de rebotes quedo en `rebotes-detectados-2026-04-27.md`.
- El plan siguiente quedo en `plan-siguiente-etapa-2026-04-27.md`.
- La carpeta IMAP `Sent` tiene 296 copias visibles de campana (`wave_1`, `wave_2`, `wave_3`) mas 1 prueba interna.
- El remitente oficial de la operacion es `ventas@elenxos.com`.
- Los 296 Leads de `wave_1`, `wave_2` y `wave_3` ya estan creados en ERPNext y sincronizados localmente.

## Regla de operacion

Primero se guardan Leads efectivos en ERPNext. Despues se prepara el primer contacto. Para envio real, el contacto debe estar en `erp_sync_status=synced` o `synced_existing`.

## Comandos canonicos

Auditoria sin modificar datos:

```bash
python3 scripts/auditar_operacion_email.py --fail-on-blockers
```

Reinicio seguro cuando se confirma que nadie ha sido contactado:

```bash
python3 scripts/reiniciar_operacion_email.py
```

Generar el lote manual para ERPNext Data Import:

```bash
python3 scripts/erpnext_importar_contactos.py \
  --export-csv 05-datos-y-reportes/operacion-email/erp-leads-wave-1.csv \
  --mark-ready
```

Crear Leads reales via API, cuando existan credenciales:

```bash
ERPNEXT_BASE_URL="https://crm.proxy.humanizar-dev.cloud" \
ERPNEXT_API_KEY="..." \
ERPNEXT_API_SECRET="..." \
python3 scripts/erpnext_importar_contactos.py --push --yes
```

El `--push` es idempotente por email: si el Lead ya existe en ERPNext, no lo duplica y marca la fila local como `synced_existing`.

Preparar el lote de primer contacto sin enviar:

```bash
python3 scripts/preparar_lote_primer_contacto.py
```

Salidas:

- `05-datos-y-reportes/operacion-email/primer-contacto-wave-1.csv`
- `04-mensajeria-email/lote-primer-contacto-wave-1-revision.md`

Preview o envio controlado del lote:

```bash
python3 scripts/enviar_lote_primer_contacto.py --limit 3
```

El envio real usa `--send`, pide confirmacion interactiva y por defecto exige `erp_sync_status=synced` o `synced_existing`.

## Variables ERPNext

El script acepta estas variables, o sus equivalentes `FRAPPE_*`:

- `ERPNEXT_BASE_URL`
- `ERPNEXT_USERNAME`
- `ERPNEXT_PASSWORD`
- `ERPNEXT_API_KEY`
- `ERPNEXT_API_SECRET`

No se versionan secretos reales.

## Flujo recomendado

1. Correr auditoria.
2. Importar `erp-leads-wave-1.csv` como `Lead` en ERPNext, o ejecutar `--push`.
3. Confirmar que los Leads quedaron en el CRM.
4. Si la importacion fue manual, correr luego `--push --yes` con credenciales para reconciliar IDs sin duplicar Leads.
5. Revisar el primer lote de correo con plantillas de primer contacto, no con declaracion/disculpa.
6. Registrar cada envio real en `correos-enviados-importar.csv` y actualizar el maestro operativo.
7. Monitorear respuestas y rebotes antes de abrir nuevas olas o seguimientos.

## Ejecucion 2026-04-27

- Auditoria local: OK, sin bloqueadores.
- CRM/Frappe: `{"message":"pong"}`.
- Mail API health: `{"status":"ok"}`.
- Prueba interna de correo corporativo: OK (`Email sent`), enviada desde y hacia la cuenta configurada en `.env`.
- ERP auth por usuario/password: OK.
- ERP push `wave_1`: OK, 46 Leads creados (`CRM-LEAD-2026-00001` a `CRM-LEAD-2026-00046`).
- ERP push `wave_2`: OK, 70 Leads creados (`CRM-LEAD-2026-00047` a `CRM-LEAD-2026-00116`).
- ERP push `wave_3`: OK, 180 Leads creados (`CRM-LEAD-2026-00117` a `CRM-LEAD-2026-00296`).
- Mail API probado con `ventas@elenxos.com`: OK (`Email sent`) en envio interno seguro.
- Limpieza de correo: OK, sin redes sociales; solo sitios oficiales `www.elenxos.com` y `agora.elenxos.com`.
- Auditoria de mensajeria: OK, confirma procedencia UdeA/Universidad de Antioquia, ausencia de redes sociales y ausencia de CTA duplicado.
- Envio real `wave_1`: OK SMTP, 46 aceptados, 1 rebote confirmado.
- Envio real `wave_2`: OK SMTP, 70 aceptados, 3 rebotes confirmados.
- Envio real `wave_3`: OK SMTP, 180 aceptados, 1 rebote confirmado.
- Envio acumulado: 296 aceptados por SMTP, 5 rebotes, 291 pendientes de respuesta.
- Correccion IMAP: 296 copias de campana visibles en `Sent`; el problema original era que la API SMTP no guardaba copia en Enviados.
- Seguimiento recomendado: revisar respuestas y rebotes; si no hay respuesta, siguiente accion el 2026-05-04.

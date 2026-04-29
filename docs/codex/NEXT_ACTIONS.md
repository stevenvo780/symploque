# Next Actions

## Now

- [x] Reiniciar la operacion email como `fresh launch`: cero enviados, cero declaracion, cero disculpa.
- [x] Corregir `leads-agora-maestro.csv` y `leads-agora-top-50-hoy.csv` a `estado=pendiente`.
- [x] Regenerar `contactos-maestro-operativo.csv` con campos de sincronizacion ERP.
- [x] Generar `erp-leads-wave-1.csv` con 46 Leads de `wave_1`.
- [x] Marcar la primera ola como `erp_sync_status=ready_for_import`.
- [x] Actualizar la primera ola a `erp_sync_status=synced` despues del push real.
- [x] Auditar la operacion email sin bloqueadores.
- [x] Preparar `primer-contacto-wave-1.csv` y su revision Markdown sin enviar a leads.
- [x] Probar Mail API con envio interno seguro a la cuenta remitente.
- [x] Definir remitente operativo: `ventas@elenxos.com`.
- [x] Probar Mail API con `ventas@elenxos.com` como remitente oficial.
- [x] Crear `scripts/enviar_lote_primer_contacto.py` con preview, gating ERP y logging post-envio.
- [x] Registrar usuario ERP operativo: `admin@elenxos.com` sin versionar contrasena.
- [x] Autenticar ERP por usuario/password.
- [x] Crear 46 Leads de `wave_1` en ERPNext y sincronizar IDs locales.
- [x] Quitar enlaces/redes sociales de los correos y dejar solo sitios oficiales Elenxos/Agora.
- [x] Agregar gate de auditoria que confirma procedencia UdeA/Universidad de Antioquia.
- [x] Ejecutar envio real de `wave_1`: 46 enviados, 0 fallidos.
- [x] Reconciliar `leads-agora-maestro.csv`, `leads-agora-top-50-hoy.csv`, maestro operativo y log de enviados.
- [x] Corregir redundancia de links en plantillas y lote historico.
- [x] Crear preview de tipos de correo en `04-mensajeria-email/preview-tipos-correos-wave-1.md`.
- [x] Parametrizar envio por campana para no mezclar `wave_1` y `wave_2`.
- [x] Crear 70 Leads de `wave_2` en ERPNext y sincronizar IDs locales.
- [x] Ejecutar envio real de `wave_2`: 70 enviados, 0 fallidos.
- [x] Reconciliar historico y maestro operativo con 296 envios reales acumulados.
- [x] Verificar INBOX de `ventas@elenxos.com` por rebotes.
- [x] Marcar 8 rebotes confirmados y sacar reporte.
- [x] Reconstruir/anexar 296 copias de campana en la carpeta IMAP `Sent`.
- [x] Actualizar envio futuro para anexar copia en `Sent` automaticamente.
- [x] Crear 180 Leads de `wave_3` en ERPNext y sincronizar IDs locales.
- [x] Ajustar clasificacion de plantillas para docentes de departamento.
- [x] Ejecutar envio real de `wave_3`: 180 aceptados por SMTP, 0 fallidos API.
- [x] Reconciliar legacy, maestro operativo, enviados e IMAP con `wave_3`.
- [x] Monitorear INBOX el 2026-04-27: 0 respuestas humanas, 8 rebotes, 2 pruebas internas.
- [x] Preparar cola de 4 contactos por canal alterno.
- [x] Crear preview operativo de canal alterno con links prellenados y guion de llamada.
- [x] Verificar correos alternativos para los 8 rebotados y preparar preview de recuperacion.
- [x] Preparar plan y preview segmentado para seguimiento de 288 pendientes el 2026-05-04.

## Next

- [ ] Monitorear respuestas nuevas de `wave_1`, `wave_2` y `wave_3`.
- [ ] Ejecutar envio manual revisado a 2 correos corregidos de rebotes recuperables.
- [ ] Reintentar Javeriana solo si cesa el `mail loop` o usar backup con redireccion manual.
- [ ] Ejecutar contacto manual/canal alterno para 4 prospectos sin email el 2026-04-28.
- [ ] El 2026-05-04, revisar INBOX/rebotes y generar lote final de seguimiento a elegibles.
- [ ] Hacer seguimiento a los contactos sin respuesta el 2026-05-04 solo despues de preview aprobado.
- [ ] Preparar la siguiente etapa solo despues de revisar respuestas, rebotes y senales de interes de los 296 envios.
- [ ] **REDES — Crear la pagina de empresa de LinkedIn o documentar la URL correcta** (la actual retorna 404).
- [ ] **REDES — Definir y documentar el handle de X/Twitter** (actualmente TBD, bloquea publicacion en X).
- [x] **REDES — Verificar acceso a `media@elenxos.com`** para recibir codigos de verificacion de plataformas. (resuelto 2026-04-24, correo de prueba admin→ventas exitoso)
- [ ] **REDES — Configurar LinkedIn e Instagram** (foto, banner, bio, enlace, perfil profesional).

## Later

- [x] Automatizar logging post-envio para que cada email exitoso actualice `correos-enviados-importar.csv` y `contactos-maestro-operativo.csv`.
- [ ] Crear plantillas finales por segmento y por etapa de seguimiento.
- [ ] Regenerar el lote visual completo del repo hermano `creador-imagenes-de-marca` con la paleta ya canonizada.
- [ ] **REDES — Agregar OG tags a `agora.elenxos.com`** para que las preview cards funcionen al compartir.
- [ ] **REDES — Agregar perfiles sociales al campo `sameAs` del schema.org de `elenxos.com`**.
- [ ] **REDES — Capturar screenshots reales del producto** para completar LinkedIn Pub 3 y media kit.
- [ ] **REDES — Diseñar plantilla de `Caso Verificado`** para testimonios y pilotos.
- [ ] **REDES — Tomar foto profesional de fundador** para la seccion Human Assets del media kit.

## Open Questions

- [x] Credencial ERP operativa: usuario `admin@elenxos.com`; contrasena como secreto local no versionado.
- [x] El primer correo entra por canal corporativo `ventas@elenxos.com` y CTA de producto `https://agora.elenxos.com/`.
- [x] En `wave_1`, el CTA operativo va directo a `Agora` y la firma deja ambos sitios oficiales.
- [x] En `wave_2`, se mantiene CTA sin redundancia y campana separada `primer_contacto_wave_2`.
- [x] En `wave_3`, docentes de departamento usan plantilla estandar y campana separada `primer_contacto_wave_3`.
- [ ] **REDES — La URL correcta de LinkedIn es `/company/elenxos` u otra?** Confirmar si la pagina existe.
- [ ] **REDES — Con que handle se creo la cuenta de X/Twitter?** Documentar en `directorio-cuentas-y-estado.md`.

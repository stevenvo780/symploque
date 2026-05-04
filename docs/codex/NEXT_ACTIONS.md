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
- [x] Crear preview de tipos de correo en `04-mensajeria-email/previews/preview-tipos-correos-wave-1.md`.
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
- [x] Monitorear INBOX el 2026-04-29: 0 respuestas humanas, 15 rebotes acumulados.
- [x] Sincronizar 15 rebotes confirmados y actualizar pendientes a 281.
- [x] Preparar recuperacion de 15 rebotes y seguimiento actualizado de 281 pendientes.
- [x] **REDES — Re-verificar LinkedIn/X el 2026-04-29**: LinkedIn `/company/elenxos` sigue 404; X requiere confirmacion manual autenticada.
- [x] Monitorear INBOX el 2026-04-30: 0 respuestas humanas, 0 rebotes nuevos.
- [x] Preparar protocolo transparente WhatsApp/bots para canal alterno y registro operativo.
- [x] Crear script local para registrar resultados manuales de canal alterno en CSVs.
- [x] Ejecutar envio manual revisado a 3 correos corregidos de rebotes recuperables: 3 enviados, 0 fallidos, copias en `Sent`.
- [x] Monitorear INBOX el 2026-05-01: 0 respuestas humanas, 0 rebotes nuevos.
- [x] Iniciar operacion WhatsApp/canal alterno 2026-05-01 con documento operativo y registro listo.
- [x] Abrir en Firefox los 3 chats WhatsApp prellenados para canal alterno; envio final no verificable desde shell.
- [x] Aplicar resultados manuales de 3 WhatsApp con `scripts/registrar_canal_alterno.py --apply`.
- [x] Ajustar auditoria para aceptar contactos por canal alterno sin fila SMTP.
- [x] Generar lote seguro de seguimiento 2026-05-04: 281 elegibles y preview de 10 mensajes.
- [x] Agregar ejecutor seguro de seguimiento 2026-05-04 con preview default, validacion contra maestro y bloqueo por fecha.
- [x] Prospectar 15 nuevos leads publicos para posible `wave_4_candidate`.
- [x] Convertir la prospeccion publica en artefactos revisables de `wave_4_candidate`: CSV operativo candidato, export ERPNext y lote email borrador.
- [x] Preparar guion de reintento WhatsApp en dia habil para EAFIT/UPB.
- [x] **WAVE 4** — Buscar 21 leads nuevos en Anillo 1 (EAFIT, UPB, UNAL Medellín, U. de Medellín): semilleros, centros de escritura, revistas y grupos de investigación.
- [x] **WAVE 4** — Crear CSV de leads: `leads-wave-4-anillo-1-2026-05-01.csv` con correos institucionales verificados.
- [x] **WAVE 4** — Preparar preview de correos personalizados: `04-mensajeria-email/previews/preview-wave-4-anillo-1-2026-05-01.md`.
- [x] **REDES — Contenido generado**: 3 posts Instagram + 3 posts LinkedIn + 5 posts X + 1 hilo. Guardado en `contenido-listo-para-publicar-2026-05-01.md`.
- [x] **REDES — 4 imágenes generadas** para posts (dolor semillero, antes/después, manifiesto, carrusel LinkedIn).
- [x] **REDES — Instagram confirmada como configurada** por operador.
- [x] Crear monitor IMAP readonly con reporte diario: `scripts/monitorear_inbox_operacion.py`.
- [x] Hacer idempotente `scripts/registrar_canal_alterno.py`: los 3 WhatsApp ya aplicados no vuelven a aparecer como aplicables.
- [x] Preparar runbook 2026-05-04 para seguimiento, rebotes, WhatsApp y llamada Javeriana.
- [x] Preparar mini-lote separado de seguimiento para 3 recuperaciones: `seguimiento-recuperacion-2026-05-07.csv`.
- [x] Agregar `scripts/promover_wave4_candidatos.py` y `body_text` en lote wave 4 para usar copy personalizado tras aprobacion.
- [x] Corregir rutas de assets de redes a `assets/brand/logos/kit_completo` y agregar `scripts/publicar_redes.py --preflight`.

## Next

- [ ] Monitorear respuestas nuevas de `wave_1`, `wave_2` y `wave_3`.
- [ ] Monitorear rebotes/respuestas de la recuperacion `recuperacion_rebote_2026_04_30`.
- [ ] Reintentar Javeriana solo si cesa el `mail loop` o usar backup con redireccion manual.
- [x] Confirmar visualmente si los 3 WhatsApp abiertos quedaron enviados y registrar resultado real. **CONFIRMADO 2026-05-01**: 3 enviados, 3 bots respondieron, asesores no disponibles por festivo.
- [ ] Ejecutar llamada/canal alterno para `agora-legacy-033` (Javeriana) en dia habil.
- [x] Registrar resultados reales del canal alterno en `registro-canal-alterno-2026-04-30.csv`. **HECHO 2026-05-01**.
- [ ] Reintentar EAFIT Pregrados, EAFIT Artes y UPB en dia habil usando `04-mensajeria-email/canal-alterno/reintento-whatsapp-dia-habil-2026-05-04.md`.
- [ ] El 2026-05-04, revisar INBOX/rebotes y regenerar/confirmar lote final de seguimiento a elegibles.
- [ ] Hacer seguimiento a los contactos sin respuesta el 2026-05-04 solo despues de revisar INBOX/rebotes y aprobar `scripts/enviar_lote_seguimiento.py --send`.
- [ ] Ejecutar `05-datos-y-reportes/operacion-email/runbooks/runbook-seguimiento-2026-05-04.md` completo antes de cualquier envio de seguimiento.
- [ ] El 2026-05-07, ejecutar `05-datos-y-reportes/operacion-email/runbooks/runbook-seguimiento-recuperacion-2026-05-07.md` para los 3 correos recuperados.
- [ ] Revisar y aprobar `04-mensajeria-email/previews/preview-wave-4-anillo-1-2026-05-01.md` para envio de wave 4 (21 leads Anillo 1).
- [ ] Crear leads wave 4 en ERPNext y sincronizar IDs.
- [ ] Ejecutar envío wave 4 después de aprobación.
- [ ] Preparar la siguiente etapa solo despues de revisar respuestas, rebotes y senales de interes de los 296 envios iniciales y 3 recuperaciones.
- [ ] **REDES — Crear la pagina de empresa de LinkedIn o documentar la URL correcta** (la actual retorna 404).
- [ ] **REDES — Definir y documentar el handle de X/Twitter** (actualmente TBD, bloquea publicacion en X).
- [ ] **REDES — Resolver bloqueos de `python3 scripts/publicar_redes.py --preflight` antes de publicar por API**.
- [x] **REDES — Verificar acceso a `media@elenxos.com`** para recibir codigos de verificacion de plataformas. (resuelto 2026-04-24, correo de prueba admin→ventas exitoso)
- [x] **REDES — Configurar Instagram** (configurada por operador 2026-05-01).
- [ ] **REDES — Configurar LinkedIn** (foto, banner, bio, enlace, perfil profesional).
- [ ] **REDES — Publicar contenido generado en Instagram** (3 posts listos en `contenido-listo-para-publicar-2026-05-01.md`).

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

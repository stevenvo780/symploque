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
- [x] Reconciliar historico y maestro operativo con 116 envios reales acumulados.

## Next

- [ ] Monitorear respuestas y rebotes de `wave_1` y `wave_2`.
- [ ] Hacer seguimiento a los 116 contactos sin respuesta el 2026-05-04.
- [ ] Preparar `wave_3` solo despues de revisar aprendizajes de las dos primeras olas.
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
- [ ] **REDES — La URL correcta de LinkedIn es `/company/elenxos` u otra?** Confirmar si la pagina existe.
- [ ] **REDES — Con que handle se creo la cuenta de X/Twitter?** Documentar en `directorio-cuentas-y-estado.md`.

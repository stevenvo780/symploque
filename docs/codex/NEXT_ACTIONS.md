# Next Actions

## Now

- [x] Correr `python3 scripts/bootstrap_operacion_email.py` para materializar la base nueva desde el historico.
- [x] Contrastar `03-datos/operacion-email/correos-enviados-importar.csv` contra la bandeja real de `stevenvallejo780@gmail.com`.
- [x] Revisar `03-datos/operacion-email/contactos-maestro-operativo.csv` y corregir falsos positivos o canales no-email.
- [x] Validar `03-datos/operacion-email/declaracion-pendientes.csv` antes de marcar cualquier fila como lista para enviar.
- [x] Elegir el CTA por campaña: `https://agora.elenxos.com/` para producto.
- [x] Corregir la metadata publica pendiente: `sameAs` viejo en `elenxos.com` removido.

## Next

- [x] Definir la version final del correo de `declaracion`: correccion de remitente, presentacion de marca o ambas.
- [ ] Probar el flujo de envio corporativo usando `email.md` con variables de entorno, nunca con secretos versionados.
- [ ] Preparar el primer lote corporativo sobre URLs ya publicas y despues de pasar el checklist de deduplicacion y CTA.
- [ ] Definir si el remitente principal sera `ventas@elenxos.com`, `media@elenxos.com` o `admin@elenxos.com`.
- [ ] Consolidar el media kit real: logo oficial, screenshot de producto, plantilla de caso verificado y foto de fundador.
- [ ] **REDES — Crear la pagina de empresa de LinkedIn o documentar la URL correcta** (la actual retorna 404).
- [ ] **REDES — Definir y documentar el handle de X/Twitter** (actualmente TBD, bloquea publicacion en X).
- [x] **REDES — Verificar acceso a `media@elenxos.com`** para recibir codigos de verificacion de plataformas. (resuelto 2026-04-24, correo de prueba admin→ventas exitoso)
- [ ] **REDES — Configurar LinkedIn e Instagram** (foto, banner, bio, enlace, perfil profesional).

## Later

- [ ] Unificar el historico de `Agora` y la nueva operacion email en una sola base si el usuario confirma esa migracion.
- [ ] Crear plantillas finales por tipo de declaracion y por segmento de contacto.
- [ ] Automatizar importacion, deduplicacion y logging de envios sobre la base maestra nueva.
- [ ] Regenerar el lote visual completo del repo hermano `creador-imagenes-de-marca` con la paleta ya canonizada.
- [ ] **REDES — Agregar OG tags a `agora.elenxos.com`** para que las preview cards funcionen al compartir.
- [ ] **REDES — Agregar perfiles sociales al campo `sameAs` del schema.org de `elenxos.com`**.
- [ ] **REDES — Capturar screenshots reales del producto** para completar LinkedIn Pub 3 y media kit.
- [ ] **REDES — Diseñar plantilla de `Caso Verificado`** para testimonios y pilotos.
- [ ] **REDES — Tomar foto profesional de fundador** para la seccion Human Assets del media kit.

## Open Questions

- [ ] Que contactos ya impactados no deben recibir `declaracion` por riesgo de sobrecontacto?
- [ ] En que casos conviene mandar al sitio corporativo y en cuales directo a `Agora`?
- [ ] La narrativa comercial va a entrar primero por `Elenxos` o por `Agora` segun segmento?
- [ ] **REDES — La URL correcta de LinkedIn es `/company/elenxos` u otra?** Confirmar si la pagina existe.
- [ ] **REDES — Con que handle se creo la cuenta de X/Twitter?** Documentar en `directorio-cuentas-y-estado.md`.
- [ ] **REDES — Las cadencias semanales (20+ piezas) son viables para el equipo actual?** Ajustar si el equipo es de 1 persona.

# Next Actions

## Now

- [ ] Correr `python3 scripts/bootstrap_operacion_email.py` para materializar la base nueva desde el historico.
- [ ] Contrastar `03-datos/operacion-email/correos-enviados-importar.csv` contra la bandeja real de `stevenvallejo780@gmail.com`.
- [ ] Revisar `03-datos/operacion-email/contactos-maestro-operativo.csv` y corregir falsos positivos o canales no-email.
- [ ] Validar `03-datos/operacion-email/declaracion-pendientes.csv` antes de marcar cualquier fila como lista para enviar.
- [ ] Elegir el CTA por campaña: `https://www.elenxos.com/` para empresa o `https://agora.elenxos.com/` para producto.
- [ ] Corregir la metadata publica pendiente: `sameAs` viejo en `elenxos.com` y metadata generica en `agora.elenxos.com`.

## Next

- [ ] Definir la version final del correo de `declaracion`: correccion de remitente, presentacion de marca o ambas.
- [ ] Probar el flujo de envio corporativo usando `email.md` con variables de entorno, nunca con secretos versionados.
- [ ] Preparar el primer lote corporativo sobre URLs ya publicas y despues de pasar el checklist de deduplicacion y CTA.
- [ ] Definir si el remitente principal sera `ventas@elenxos.com`, `media@elenxos.com` o `admin@elenxos.com`.
- [ ] Consolidar el media kit real: logo oficial, screenshot de producto, plantilla de caso verificado y foto de fundador.

## Later

- [ ] Unificar el historico de `Agora` y la nueva operacion email en una sola base si el usuario confirma esa migracion.
- [ ] Crear plantillas finales por tipo de declaracion y por segmento de contacto.
- [ ] Automatizar importacion, deduplicacion y logging de envios sobre la base maestra nueva.
- [ ] Regenerar el lote visual completo del repo hermano `creador-imagenes-de-marca` con la paleta ya canonizada.

## Open Questions

- [ ] Que contactos ya impactados no deben recibir `declaracion` por riesgo de sobrecontacto?
- [ ] En que casos conviene mandar al sitio corporativo y en cuales directo a `Agora`?
- [ ] La narrativa comercial va a entrar primero por `Elenxos` o por `Agora` segun segmento?

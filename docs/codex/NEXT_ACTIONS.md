# Next Actions

## Now

- [ ] Recibir la lista de correos ya enviados desde `stevenvallejo780@gmail.com`.
- [ ] Importar esa lista en `03-datos/operacion-email/correos-enviados-importar.csv`.
- [ ] Poblar `03-datos/operacion-email/contactos-maestro-operativo.csv` con los contactos ya impactados.
- [ ] Clasificar quienes requieren correo de `declaracion` y poblar `03-datos/operacion-email/declaracion-pendientes.csv`.
- [ ] Elegir el CTA por campaña: `https://www.elenxos.com/` para empresa o `https://agora.elenxos.com/` para producto.

## Next

- [ ] Definir la version final del correo de `declaracion`: correccion de remitente, presentacion de marca o ambas.
- [ ] Probar el flujo de envio corporativo usando `email.md` con variables de entorno, nunca con secretos versionados.
- [ ] Preparar el primer lote corporativo sobre URLs ya publicas y despues de pasar el checklist de deduplicacion y CTA.
- [ ] Definir si el remitente principal sera `ventas@elenxos.com`, `media@elenxos.com` o `admin@elenxos.com`.
- [ ] Corregir en la web publica de `https://www.elenxos.com/` la referencia `sameAs` que todavia apunta al dominio antiguo de Agora.

## Later

- [ ] Unificar el historico de `Agora` y la nueva operacion email en una sola base si el usuario confirma esa migracion.
- [ ] Crear plantillas finales por tipo de declaracion y por segmento de contacto.
- [ ] Automatizar importacion, deduplicacion y logging de envios sobre la base maestra nueva.

## Open Questions

- [ ] Que contactos ya impactados no deben recibir `declaracion` por riesgo de sobrecontacto?
- [ ] En que casos conviene mandar al sitio corporativo y en cuales directo a `Agora`?
- [ ] La narrativa comercial va a entrar primero por `Elenxos` o por `Agora` segun segmento?

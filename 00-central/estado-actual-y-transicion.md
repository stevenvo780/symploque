# Estado actual y transicion operativa

Fecha de actualizacion: 2026-04-27

## Lectura corta

Este repo conserva el historico comercial y narrativo de `Agora`, pero la fase activa cambio.

La prioridad ya no es reconciliar una supuesta ola previa. La operacion fue reiniciada como lanzamiento fresco y `wave_1`/`wave_2`/`wave_3` ya quedaron ejecutadas con trazabilidad:

1. guardar primero los contactos efectivos en ERPNext como Leads
2. enviar primer contacto desde remitente corporativo
3. registrar cada envio despues de que el contacto exista en ERP/CRM
4. monitorear respuestas y rebotes antes de abrir nuevas etapas

## Estado publico verificado

Se verifico el 2026-04-20 que ya existen estos puntos publicos:

- sitio corporativo: `https://www.elenxos.com/`
- producto: `https://agora.elenxos.com/`
- manifest publico de Agora: `https://agora.elenxos.com/manifest.json`
- documentacion publica de Agora: `https://agora.elenxos.com/docs`
- ERP (Contabilidad, Facturación, Inventario): `https://erp.proxy.humanizar-dev.cloud`
- CRM (Leads, Oportunidades, Clientes): `https://crm.proxy.humanizar-dev.cloud`

Documentacion de infraestructura ERP/CRM: [docs/erpnext-erp-crm.md](../docs/erpnext-erp-crm.md)

La documentacion del repo ya no debe tratar esos dominios como hipoteticos.

## Lectura estrategica

La capa publica ahora queda partida en dos niveles:

- `Elenxos` como marca corporativa e intelectual
- `Agora` como producto operativo y plataforma concreta

Eso obliga a que el repo haga la misma separacion:

- narrativa de empresa en clave `Elenxos`
- oferta, demos, docs y outreach del producto en clave `Agora`

1. [00-central/plan-transicion-remitente-y-sitios-publicos.md](./plan-transicion-remitente-y-sitios-publicos.md)
2. [email.md](../04-mensajeria-email/email.md)
3. [05-datos-y-reportes/operacion-email](../05-datos-y-reportes/operacion-email)
4. [03-operacion-redes/estrategia-redes-sociales.md](../03-operacion-redes/estrategia-redes-sociales.md)
5. [assets/README.md](../assets/README.md)
6. [docs/codex/NEXT_ACTIONS.md](../docs/codex/NEXT_ACTIONS.md)

## Que documentos siguen vigentes

- `05-datos-y-reportes/leads-agora-maestro.csv`: base historica principal
- `05-datos-y-reportes/leads-agora-top-50-hoy.csv`: corte historico de ejecucion
- `02-mensajeria/mensajes-y-copy.md`: sistema reutilizable de copy
- `04-reportes/`: historial de lotes y ejecucion
- `06-redes-sociales/`: historial de narrativa y marca de Agora

## Que cambia desde hoy

- la nueva verdad operativa para correo sale desde `04-mensajeria-email/`
- la nueva organizacion de datos sale desde `05-datos-y-reportes/operacion-email/`
- el bootstrap inicial de la base nueva ya sale desde `scripts/bootstrap_operacion_email.py`
- el reinicio de lanzamiento fresco ya sale desde `scripts/reiniciar_operacion_email.py`
- la exportacion/importacion a ERPNext ya sale desde `scripts/erpnext_importar_contactos.py`
- no se deben guardar secretos reales en markdown ni CSV

## Insumos que faltan del usuario

- usuario ERP operativo: `admin@elenxos.com`; contrasena como secreto local no versionado
- remitente principal de primer contacto: `ventas@elenxos.com`
- criterio aplicado en `wave_1`, `wave_2` y `wave_3`: CTA directo a `agora.elenxos.com`, sin redundancia de links y firma con ambos sitios oficiales

## Regla operativa

Para nuevas olas, el trabajo correcto es repetir la secuencia:

- auditoria sin bloqueadores
- Leads guardados o sincronizados en ERPNext
- plantillas sin redes sociales y con mencion UdeA/Universidad de Antioquia cuando aplique
- envio controlado desde `ventas@elenxos.com`
- registro en maestro operativo y `correos-enviados-importar.csv`

## Estado fresh launch 2026-04-27

- 300 prospectos operativos.
- 296 contactos con email.
- 296 contactos de `wave_1`, `wave_2` y `wave_3` creados como Leads en ERPNext.
- 296 correos enviados registrados desde `ventas@elenxos.com`.
- 0 filas de declaracion.
- 0 filas de disculpa.
- Archivos ERP generados: [erp-leads-wave-1.csv](../05-datos-y-reportes/operacion-email/erp-leads-wave-1.csv), [erp-leads-wave-2.csv](../05-datos-y-reportes/operacion-email/erp-leads-wave-2.csv), [erp-leads-wave-3.csv](../05-datos-y-reportes/operacion-email/erp-leads-wave-3.csv)
- Siguiente accion: seguimiento a no respondidos el 2026-05-04.

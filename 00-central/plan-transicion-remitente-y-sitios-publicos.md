# Plan de transicion: remitente personal, remitente corporativo y sitios publicos

Fecha de actualizacion: 2026-04-27

> Actualizacion operativa: se confirmo que no habia contactos previos, se reinicio como `fresh launch`, se crearon 116 Leads de `wave_1`/`wave_2` en ERPNext y se envio el primer contacto corporativo desde `ventas@elenxos.com`.

## Objetivo

Pasar de una base local de prospectos a una operacion ordenada desde ERP/CRM y correo corporativo, con sitios publicos ya publicados y trazabilidad completa.

## Contexto que cambia el plan

- no habia correos previos confirmados antes de `wave_1`
- `wave_1` y `wave_2` ya registran 116 envios reales, 0 fallidos
- no hay cola activa de `declaracion`
- la automatizacion de envio corporativo esta documentada en `email.md`
- ya existen sitios publicos vivos para `Elenxos` y `Agora`

## Estado publico verificado

- `https://www.elenxos.com/`
- `https://agora.elenxos.com/`
- `https://agora.elenxos.com/manifest.json`
- `https://agora.elenxos.com/docs`

La ola nueva ya no esta bloqueada por ausencia de landing. Para cada nueva tanda depende de:

1. guardar Leads efectivos en ERPNext
2. fijar CTA correcto por tipo de mensaje
3. fijar remitente correcto por campana
4. deduplicar y registrar todo en CSV

## Fase 0. ERP primero

Objetivo:
- guardar los contactos efectivos en CRM/ERP antes de iniciar outreach

Entradas:
- `05-datos-y-reportes/operacion-email/contactos-maestro-operativo.csv`
- `05-datos-y-reportes/operacion-email/erp-leads-wave-1.csv`
- credenciales ERPNext si se usara importacion por API

Salida:
- Leads creados en ERPNext/CRM
- `erp_sync_status` actualizado como `synced` o `synced_existing`

Regla:
- no enviar correo a contactos que no esten listos o sincronizados con ERP

Estado `wave_1` y `wave_2`:
- completado, 116 Leads sincronizados

## Fase 1. Primer contacto corporativo

Objetivo:
- iniciar outreach desde remitente corporativo con trazabilidad limpia

Quienes entran:
- contactos de `wave_1` con email valido
- contactos ya guardados o listos para guardar en ERPNext

Quienes no entran:
- contactos sin email
- contactos sin registro ERP/CRM
- contactos que respondieron negativamente o pidieron no volver a ser contactados

Salida:
- filas de envio registradas en `correos-enviados-importar.csv`
- maestro operativo actualizado con ultimo remitente, asunto, fecha y siguiente accion

Campos clave a decidir por contacto:
- remitente corporativo correcto
- link final a usar como CTA
- plantilla segun segmento

Estado `wave_1` y `wave_2`:
- completado, 116 enviados desde `ventas@elenxos.com`
- CTA operativo: `https://agora.elenxos.com/`
- firma y cuerpo: solo sitios oficiales Elenxos/Agora, sin redes sociales
- auditoria: confirma mencion UdeA/Universidad de Antioquia

## Fase 2. Checklist de salida de campana

La nueva ola comercial no debe salir hasta confirmar:

- sitios publicados y navegables
- CTA funcionando
- identidad de marca consistente
- copy base revisado contra los sitios reales
- firmas y remitentes corporativos listos

## Fase 3. Lanzamiento desde remitente corporativo

Orden recomendado:

1. importar o sincronizar Leads de `wave_1`
2. enviar primer contacto por segmento
3. monitorear rebotes y respuestas
4. abrir `wave_3` solo despues de registrar aprendizajes de `wave_1` y `wave_2`

Canales previstos:

1. email corporativo automatizado
2. seguimiento manual cuando haya respuesta
3. LinkedIn solo como refuerzo, no como sustituto de trazabilidad

## Fase 4. Registro y seguimiento

Cada contacto debe terminar en `contactos-maestro-operativo.csv` con:

- `erp_sync_status`
- `erp_lead_id` cuando exista
- ultimo remitente usado
- ultimo asunto
- estado actual
- si requiere seguimiento o no contacto futuro
- siguiente accion

## Cola inmediata

1. monitorear rebotes y respuestas de `wave_1`
2. hacer seguimiento a no respondidos el 2026-05-04
3. registrar aprendizajes antes de abrir `wave_3`
4. preparar `wave_3` solo con Leads guardados o sincronizados en ERPNext
5. mantener la auditoria sin redes sociales, con sitios oficiales y mencion UdeA cuando aplique

## Riesgos principales

### 1. Inconsistencia de marca o dominio

Si un correo corporativo manda al sitio equivocado, o si mezcla mal `Elenxos` y `Agora`, el contacto puede percibir ruido o phishing.

### 2. Duplicacion

Si no se cruza el ERP y el CSV maestro antes de cada lote, se puede duplicar un Lead o repetir un contacto.

### 3. Automatizacion sin gating

Tener API no significa estar listo para mandar volumen. El CTA, el copy y la deduplicacion deben estar cerrados primero.

### 4. Falta de trazabilidad

Si los envios no aterrizan en el CSV maestro nuevo, la siguiente iteracion vuelve a empezar a ciegas.

## Regla final

La primera victoria de esta fase ya no es `enviar mas`.

La primera victoria ya quedo cerrada: infraestructura minima de confianza y primer envio trazable.

- identidad
- dominio
- sitios publicos
- remitente
- datos
- historial de contactos en ERP/CRM

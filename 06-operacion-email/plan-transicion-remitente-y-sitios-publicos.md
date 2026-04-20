# Plan de transicion: remitente personal, remitente corporativo y sitios publicos

Fecha de actualizacion: 2026-04-20

## Objetivo

Pasar de una operacion artesanal con correos enviados desde cuenta personal a una operacion ordenada desde correo corporativo, con sitios publicos ya publicados y trazabilidad completa.

## Contexto que cambia el plan

- ya existen correos enviados desde `stevenvallejo780@gmail.com`
- ahora habra que enviar correos de `declaracion`
- la automatizacion de envio corporativo esta documentada en `email.md`
- ya existen sitios publicos vivos para `Elenxos` y `Agora`

## Estado publico verificado

- `https://www.elenxos.com/`
- `https://agora.elenxos.com/`
- `https://agora.elenxos.com/manifest.json`
- `https://agora.elenxos.com/docs`

La ola nueva ya no esta bloqueada por ausencia de landing. Ahora depende de:

1. reconciliar historico de correos
2. fijar CTA correcto por tipo de mensaje
3. fijar remitente correcto por campana
4. deduplicar y registrar todo en CSV

## Fase 0. Reconciliacion del historico

Objetivo:
- saber exactamente a quien ya se escribio, cuando y desde que remitente

Entradas:
- lista de correos ya enviados por el usuario
- historico de `03-datos/leads-agora-maestro.csv`
- historico de `03-datos/leads-agora-top-50-hoy.csv`

Salida:
- `03-datos/operacion-email/correos-enviados-importar.csv` completo
- primeras filas pobladas en `03-datos/operacion-email/contactos-maestro-operativo.csv`

Regla:
- no mezclar la lista enviada con nuevos prospectos sin marcar procedencia

## Fase 1. Cola de declaracion

Objetivo:
- contactar de nuevo a las personas que ya recibieron un correo desde remitente personal, explicando el canal corporativo correcto

Quienes entran:
- contactos ya impactados desde correo personal
- contactos para los que conviene normalizar identidad antes del nuevo lanzamiento

Quienes no entran:
- contactos que nunca recibieron correo
- contactos que respondieron negativamente o pidieron no volver a ser contactados

Salida:
- `03-datos/operacion-email/declaracion-pendientes.csv`

Campos clave a decidir por contacto:
- razon de declaracion
- prioridad
- remitente corporativo correcto
- link final a usar como CTA

## Fase 2. Checklist de salida de campaña

La nueva ola comercial no debe salir hasta confirmar:

- sitios publicados y navegables
- CTA funcionando
- identidad de marca consistente
- copy base revisado contra los sitios reales
- firmas y remitentes corporativos listos

## Fase 3. Lanzamiento desde remitente corporativo

Orden recomendado:

1. enviar primero `declaracion`
2. monitorear rebotes y respuestas
3. solo despues abrir la ola principal a contactos nuevos o recontactos

Canales previstos:

1. email corporativo automatizado
2. seguimiento manual cuando haya respuesta
3. LinkedIn solo como refuerzo, no como sustituto de trazabilidad

## Fase 4. Registro y seguimiento

Cada contacto debe terminar en `contactos-maestro-operativo.csv` con:

- ultimo remitente usado
- ultimo asunto
- estado actual
- si requiere declaracion
- si ya recibio declaracion
- siguiente accion

## Cola inmediata

1. recibir la lista de correos ya enviados
2. importar esa lista al CSV de reconciliacion
3. clasificar quienes requieren declaracion
4. elegir CTA por tipo de campana
5. validar remitente y firma
6. ejecutar el primer lote corporativo

## Riesgos principales

### 1. Inconsistencia de marca o dominio

Si un correo corporativo manda al sitio equivocado, o si mezcla mal `Elenxos` y `Agora`, el contacto puede percibir ruido o phishing.

### 2. Duplicacion

Si no se cruza la lista real de enviados, se puede reenviar por error un primer contacto como si fuera nuevo.

### 3. Automatizacion sin gating

Tener API no significa estar listo para mandar volumen. El CTA, el copy y la deduplicacion deben estar cerrados primero.

### 4. Falta de trazabilidad

Si los envios no aterrizan en el CSV maestro nuevo, la siguiente iteracion vuelve a empezar a ciegas.

## Regla final

La primera victoria de esta fase no es `enviar mas`.

La primera victoria es dejar cerrada la infraestructura minima de confianza:

- identidad
- dominio
- sitios publicos
- remitente
- datos
- historial de contactos

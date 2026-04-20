# Operacion Email

Esta carpeta concentra la fase nueva del repo:

- migracion desde remitente personal a remitente corporativo
- ola de declaracion
- alineacion con sitios publicos ya publicados
- lanzamiento posterior con automatizacion y trazabilidad

## Documentos clave

- `plan-transicion-remitente-y-sitios-publicos.md`: secuencia operativa completa
- `lote-disculpa-error-2026-04-20.md`: copy y reglas del lote de disculpa
- `enviar_lote_disculpa.py`: script de preview y envio para la cola de disculpa

## Regla

El envio automatizado no se considera listo solo porque exista una API.

Se considera listo cuando existen al mismo tiempo:

- remitente corporativo confirmado
- CTA correcto confirmado
- sitios publicos y mensaje aprobados
- lote deduplicado
- cola de declaracion preparada
- trazabilidad en CSV

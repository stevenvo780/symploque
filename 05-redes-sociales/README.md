# Redes Sociales — Sistema estratégico

Este directorio no manda la operacion diaria.

Conserva el arco narrativo largo, el sistema semanal y los prompts conceptuales para redes.

## Que vive aqui

- [sistema-publicaciones-semanales.md](./sistema-publicaciones-semanales.md)
  Roadmap de 8 semanas con temas, copies y prompts por fase.

## Que manda la ejecucion real

- `../02-identidad-y-marca/`
  criterio visual, media kit y automatizacion visual.
- `../03-operacion-redes/`
  copy semanal, calendario y operacion diaria.
- `../assets/README.md`
  inventario de marca, prompts y entregables.
- `../elenxos_design_system/`
  renderer React → PNG / MP4.
- `../scripts/iniciar_automatizacion_redes.sh`
  comando rapido de arranque.

## Regla de IDs

- `s1_*`, `s2_*`, ...
  IDs narrativos o conceptuales del plan semanal.
- `n1_l1_*`, `n1_l2_*`, `n2_l3_*`, ...
  IDs ejecutables del renderer en `../elenxos_design_system/src/templates/registry.ts`.
- `s1_post1`, `s2_post1`, ...
  IDs de exportacion del script legacy `../assets/scripts/generate_hybrid.py`.

Hasta unificar el mapping, no mezclar estos tres niveles en el mismo flujo sin documentar el puente.
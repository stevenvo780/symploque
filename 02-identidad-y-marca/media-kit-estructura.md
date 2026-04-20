# Estructura de Media Kit Agora / Elenxos

Este documento ya no es solo una lista aspiracional. Desde ahora funciona como checklist operativo del media kit.

Referencia complementaria:

- inventario actual: [../assets/README.md](../assets/README.md)
- criterio visual canonico: [../assets/elenxos_social_media/manual_de_marca.md](../assets/elenxos_social_media/manual_de_marca.md)
- tokens oficiales: [../assets/elenxos_design_system/src/tokens/_colors.scss](../assets/elenxos_design_system/src/tokens/_colors.scss)

## 1. Identidad Visual (Brand Assets)
- [ ] **Logos:** Version principal, horizontal, vertical e isotipo en `SVG`, `PNG transparente` y `JPG`.
- [ ] **Variantes de Color:** Version luz y version oscuridad del logo oficial.
- [x] **Paleta de Colores:** Ya existe una paleta canonica en el manual de marca y en el design system.
- [x] **Tipografías:** Ya existe criterio claro: `Playfair Display` + `Inter`.

## 2. Capturas de Pantalla (Product Shots)
- `[x]` **Hero Shot:** Captura limpia del dashboard de Agora en alta resolución.
- `[x]` **Módulo de Editor Semántico:** Zoom en el editor con un texto en Markdown y lógica ST visible.
- `[ ]` **Módulo de Terminal:** Captura de la terminal multi-sesión con una ejecución real.
- `[ ]` **Módulo de Colaboración:** Vista de tableros Kanban o lista de miembros del equipo.
- [ ] **Dispositivos:** Mockups de Agora funcionando en un MacBook, un iPad y un iPhone (para denotar PWA & Offline).

## 3. Gráficos de Redes Sociales (Social Media Templates)
- [x] **Banners exploratorios:** Ya existen banners y perfiles base en `assets/elenxos_social_media/`.
- [x] **Renders multi-plataforma:** Ya existe un paquete utilizable en `../creador-imagenes-de-marca/output/`.
- `[x]` **Plantilla para Carruseles:** Generada en React y exportada como PNG con Playwright.
- `[ ]` **Plantilla para "Caso Verificado":** Falta el diseño estandar para testimonios o pilotos.
- [ ] **Fondo de Videollamada:** Un fondo profesional con el logo de Agora/Elenxos para demos y reuniones.

## 4. Fotos de Equipo (Human Assets)
- [ ] **Retrato de Fundador:** Foto profesional en alta resolución.
- [ ] **Workspace:** Foto del equipo trabajando o de un escritorio con Agora abierto (para "humanizar" la marca).

## 5. Especificaciones Técnicas de Entrega
- **Imágenes:** Formato PNG para capturas de pantalla, JPG para fotos de equipo y SVG para logos.
- **Videos/Reels:** Formato MP4, 1080x1920 (9:16), máximo 60 segundos.
- **Compresión:** Todas las imágenes para web deben estar optimizadas (usar TinyPNG o similar antes de subir al repo).

## 6. Regla de cierre

El media kit no se considera cerrado hasta que existan simultaneamente:

- identidad visual exportable
- screenshots reales del producto
- assets sociales publicables
- al menos una pieza humana del fundador o workspace

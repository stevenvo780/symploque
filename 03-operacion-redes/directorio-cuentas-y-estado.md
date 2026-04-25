# Directorio de Cuentas y Estado de Redes Sociales

Este documento registra las cuentas creadas bajo el correo `media@elenxos.com` y su estado de configuración actual.

## 1. Registro de Cuentas

| Plataforma | Usuario / Handle | Estado | Propósito |
| :--- | :--- | :--- | :--- |
| **LinkedIn** | Elenxos | [x] Creada / [ ] Configurada | Autoridad Corporativa |
| **Instagram** | @agora.elenxos | [x] Creada / [ ] Configurada | Producto y Comunidad |
| **X (Twitter)** | PENDIENTE — definir handle | [x] Creada / [ ] Configurada | Pensamiento e Hilos |
| **YouTube** | Elenxos / Agora | [x] Creada / [ ] Configurada | Demos y Tutoriales |
| **GitHub** | elenxos | [x] Creada / [ ] Configurada | Credibilidad Técnica |

## 2. Checklist de Configuración (Post-Creación)

Para cada cuenta, marcar una vez completado:
- [ ] Foto de Perfil (Logo oficial del Media Kit).
- [ ] Banner / Portada (Alineado a la Capa A o B).
- [ ] Bio optimizada con keywords (Rigor, Investigación, Agora).
- [ ] Enlace verificado a `elenxos.com` o `agora.elenxos.com`.
- [ ] Cuenta convertida a "Perfil Profesional/Empresa" (para métricas).

## 3. Acceso Centralizado (Seguridad)

- **Correo Maestro:** `media@elenxos.com`
- **Recuperación:** [Configurar teléfono o correo alternativo seguro]
- **2FA:** [Se recomienda activar autenticación de dos factores en todas las cuentas]

## 4. Notas de la Auditoría 2026-04-20

- ~~Se requiere verificar que `media@elenxos.com` tiene acceso al panel de control para recibir códigos de verificación.~~ **RESUELTO 2026-04-24**: acceso confirmado.
- Prioridad 1: Configurar LinkedIn para empezar el outreach a docentes.
- Prioridad 2: Instagram para documentar el "Build in Public" de los servidores y la infraestructura.

## 5. Hallazgos de la Auditoría 2026-04-24

### URLs verificadas

| URL | Estado |
|---|---|
| `https://www.linkedin.com/company/elenxos` | **404 — no existe o URL incorrecta** |
| `https://www.instagram.com/agora.elenxos` | Responde (perfil existe) |
| `https://www.elenxos.com/` | En línea |
| `https://agora.elenxos.com/` | En línea |
| `https://mailapi.proxy.humanizar-dev.cloud/health` | ✅ `{"status":"ok"}` (verificado 2026-04-24) |
| `https://erp.proxy.humanizar-dev.cloud` | ✅ Frappe login activo (verificado 2026-04-24) |
| `https://crm.proxy.humanizar-dev.cloud` | ✅ Frappe login activo (verificado 2026-04-24) |

### Hallazgos criticos

1. **LinkedIn URL rota**: la firma de correo en `../04-mensajeria-email/email.md` usa `https://www.linkedin.com/company/elenxos` que retorna 404. No enviar correos con esa firma hasta corregir la URL.
2. **Handle de X/Twitter sin definir**: la cuenta se reporta como creada, pero no hay handle documentado. Esto bloquea la publicación del Lote 1 en X.
3. ~~**Ninguna cuenta configurada**~~: las 5 cuentas tienen el checklist de configuración en cero.
4. ~~**Acceso a `media@elenxos.com`**~~: **RESUELTO 2026-04-24**. Acceso confirmado, correo de prueba enviado exitosamente (`admin@elenxos.com` → `ventas@elenxos.com`).
5. **Mail API verificada**: `{"success":true,"message":"Email sent"}`. Credenciales en `.env` (no versionado). API key funcional.

## 6. Dependencias externas para operar redes

Estas acciones **no se pueden resolver desde el repo** y requieren acción manual del operador:

### Bloqueos inmediatos (sin esto no se puede publicar)

| # | Acción | Responsable | Bloquea |
|---|---|---|---|
| 1 | ~~Verificar acceso a `media@elenxos.com`~~ | ✅ Resuelto 2026-04-24 | ~~Toda la configuración de cuentas~~ |
| 2 | Crear la página de empresa de LinkedIn o documentar la URL correcta | Operador | Firma de correo, outreach LinkedIn, Pub 1-3 del Lote 1 |
| 3 | Definir y documentar el handle de X/Twitter | Operador | Posts 1-5 y Hilo 1 del Lote 1, protocolo de interacción |
| 4 | Ejecutar el checklist de configuración (§2) en LinkedIn e Instagram | Operador | Publicación del Lote 1 |

### Necesarios para el media kit completo

| # | Acción | Responsable | Bloquea |
|---|---|---|---|
| 5 | Capturar screenshots reales del producto (dashboard, editor, terminal, colaboración) | Operador / Dev | LinkedIn Pub 3 (madurez), media kit, carruseles con demos |
| 6 | Tomar foto profesional de fundador o workspace | Operador | Sección "Human Assets" del media kit |
| 7 | Diseñar fondo de videollamada con marca | Diseñador | Demos y reuniones profesionales |

### Mejoras técnicas en los sitios (requieren deploy)

| # | Acción | Responsable | Bloquea |
|---|---|---|---|
| 8 | Agregar OG tags (`og:title`, `og:description`, `og:image`) a `agora.elenxos.com` | Dev | Preview cards al compartir en redes sociales |
| 9 | Agregar perfiles sociales al campo `sameAs` del schema.org en `elenxos.com` | Dev | Autoridad SEO de perfiles sociales |
| 10 | Verificar y corregir la URL de LinkedIn en la firma de correo HTML | Operador | Cada correo corporativo enviado |
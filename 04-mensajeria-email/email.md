# Mail API - elenxos.com

API REST para envio de correos via SMTP.

Este documento queda como referencia operativa. No guardar `api_key`, contrasenas ni tokens reales en el repo. Usar `.env` no versionado o un gestor seguro.

## Endpoint base

```text
https://mailapi.proxy.humanizar-dev.cloud
```

## Variables recomendadas

```bash
export MAIL_API_BASE_URL="https://mailapi.proxy.humanizar-dev.cloud"
export MAIL_API_KEY="REEMPLAZAR_EN_LOCAL"
export MAIL_FROM_EMAIL="ventas@elenxos.com"
export MAIL_FROM_PASSWORD="REEMPLAZAR_EN_LOCAL"
```

## Cuentas habilitadas

- `ventas@elenxos.com`
- `media@elenxos.com`
- `admin@elenxos.com`

El remitente oficial de la operacion de correos comerciales es `ventas@elenxos.com`.

La contrasena de esas cuentas vive en `.env` (no versionado). Todas comparten la misma contrasena.
No guardar credenciales directamente en archivos `.md` ni en commits.

## Endpoints

### Health check

```text
GET /health
```

Respuesta:

```json
{"status": "ok"}
```

### Enviar correo

```text
POST /send?api_key=<MAIL_API_KEY>
Content-Type: application/json
```

#### Body

| Campo | Tipo | Requerido | Descripcion |
|---|---|---|---|
| `from_email` | string | si | Cuenta remitente habilitada |
| `from_password` | string | si | Contrasena real de la cuenta remitente |
| `to` | string | si | Correo destinatario |
| `subject` | string | si | Asunto |
| `body` | string | si | Texto plano |
| `html` | string | no | HTML opcional |

#### Respuesta exitosa

```json
{"success": true, "message": "Email sent"}
```

#### Respuesta de error

```json
{"detail": "Invalid API key"}
{"detail": "SMTP error: ..."}
```

## Uso recomendado para esta fase

1. La operacion activa ya tiene `wave_1`, `wave_2` y `wave_3` enviadas con trazabilidad.
2. Guardar primero los leads efectivos en ERPNext antes de preparar nuevas olas o seguimientos.
3. Usar `https://www.elenxos.com/` cuando el CTA sea institucional o corporativo.
4. Usar `https://agora.elenxos.com/` cuando el CTA sea de producto, demo o validacion directa de Agora.
5. Registrar cada envio en `05-datos-y-reportes/operacion-email/contactos-maestro-operativo.csv` y `correos-enviados-importar.csv`; el script tambien anexa copia en IMAP `Sent`.
6. Mantener `declaracion-pendientes.csv` y `disculpa-error-pendientes.csv` vacios salvo que aparezca evidencia real de contacto previo.

## Checklist previo a cualquier envio

- `MAIL_API_KEY` cargada desde `.env` o secret manager
- `MAIL_FROM_EMAIL` definido para la campana
- `MAIL_FROM_PASSWORD` cargada fuera del repo
- asunto y cuerpo revisados
- sitios y CTA validados
- contacto guardado o listo para guardar en ERPNext
- lote deduplicado contra `correos-enviados-importar.csv`
- decision tomada sobre si el contacto requiere primer contacto estandar, semillero o directores/coordinadores
- reintentos y pausa configurados si se envia volumen contra un mismo dominio

## Ejemplos

### curl

```bash
curl -X POST "${MAIL_API_BASE_URL}/send?api_key=${MAIL_API_KEY}" \
  -H 'Content-Type: application/json' \
  -d "{
    \"from_email\": \"${MAIL_FROM_EMAIL}\",
    \"from_password\": \"${MAIL_FROM_PASSWORD}\",
    \"to\": \"destinatario@ejemplo.com\",
    \"subject\": \"Asunto de prueba\",
    \"body\": \"Texto plano de prueba.\"
  }"
```

### Python

```python
import os
import requests

resp = requests.post(
    f"{os.environ['MAIL_API_BASE_URL']}/send",
    params={"api_key": os.environ["MAIL_API_KEY"]},
    json={
        "from_email": os.environ["MAIL_FROM_EMAIL"],
        "from_password": os.environ["MAIL_FROM_PASSWORD"],
        "to": "destinatario@ejemplo.com",
        "subject": "Asunto de prueba",
        "body": "Texto plano de prueba.",
    },
    timeout=30,
)
print(resp.json())
```

### JavaScript

```javascript
const resp = await fetch(
  `${process.env.MAIL_API_BASE_URL}/send?api_key=${process.env.MAIL_API_KEY}`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      from_email: process.env.MAIL_FROM_EMAIL,
      from_password: process.env.MAIL_FROM_PASSWORD,
      to: "destinatario@ejemplo.com",
      subject: "Asunto de prueba",
      body: "Texto plano de prueba.",
    }),
  }
);

const data = await resp.json();
console.log(data);
```

## Recomendación Narrativa y Firma

Para que el primer contacto corporativo sea creible, cada correo enviado debe reforzar la autoridad de **Elenxos** y la utilidad de **Agora**.

### Firma Corporativa Recomendada (HTML)

Se recomienda incluir esta firma en el campo `html` de la API para construir credibilidad en cada contacto:

```html
<div style="font-family: sans-serif; color: #333; line-height: 1.5;">
  <p>Saludos,</p>
  <p><strong>Equipo Elenxos</strong></p>
  <hr style="border: 0; border-top: 1px solid #eee; margin: 10px 0;" />
  <p style="font-size: 14px; margin: 0;">
    <strong>Elenxos</strong> | <em>Software Académico Avanzado</em>
  </p>
  <p style="font-size: 12px; margin: 5px 0;">
    <a href="https://www.elenxos.com/" style="color: #007bff; text-decoration: none;">www.elenxos.com</a> | 
    <a href="https://agora.elenxos.com/" style="color: #007bff; text-decoration: none;">agora.elenxos.com</a>
  </p>
  <p style="font-size: 12px; color: #777;">
    Agora: Escribe con libertad, verifica con rigor.
  </p>
</div>
```

### Transición de Remitente

Hoy no hay contactos previos confirmados. Si en el futuro aparece evidencia de que algun contacto ya recibio correo desde una cuenta personal, se puede incluir esta nota al inicio o final del cuerpo:

> "Estamos profesionalizando nuestras comunicaciones. A partir de ahora, este será el canal oficial de **Elenxos** para coordinar demos y pilotos de **Agora**."

## Notas operativas

- SMTP relay: `148.230.88.162:587` con `STARTTLS`
- `html` es opcional en la API, pero el script operativo de primer contacto ahora envia siempre dos partes: `text/plain` limpio y `text/html` renderizado desde Markdown.
- Las plantillas se mantienen en Markdown para edicion humana; antes de enviar, el script elimina `**...**` y `[texto](url)` del texto plano y genera enlaces/negritas reales en HTML.
- Prueba interna 2026-04-27: la Mail API acepto un mensaje HTML a `ventas@elenxos.com` y el mensaje recibido por IMAP tuvo una parte `text/plain` y una parte `text/html`.
- La auditoria local valida que las 6 plantillas activas rendericen sin Markdown crudo en texto plano ni HTML.
- webmail: `https://mail.proxy.humanizar-dev.cloud`
- IMAP: `mail.proxy.humanizar-dev.cloud:993`
- La API SMTP no guarda copia automaticamente en `Sent`; el script operativo anexa copia IMAP despues de cada envio exitoso.
- La respuesta `Email sent` significa aceptado por SMTP, no entrega final; revisar INBOX por rebotes y actualizar `reply_status`.
- no hay `rate limiting` documentado; enviar por lotes pequenos y registrar respuesta

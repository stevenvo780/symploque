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

La contrasena de esas cuentas no debe quedar escrita aqui.

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

1. No enviar nuevas olas masivas hasta reconciliar los correos ya enviados desde `stevenvallejo780@gmail.com`.
2. Preparar primero la ola de `declaracion` desde remitente corporativo.
3. Usar `https://www.elenxos.com/` cuando el CTA sea institucional o corporativo.
4. Usar `https://agora.elenxos.com/` cuando el CTA sea de producto, demo o validacion directa de Agora.
5. Registrar cada envio en `03-datos/operacion-email/contactos-maestro-operativo.csv`.

## Checklist previo a cualquier envio

- `MAIL_API_KEY` cargada desde `.env` o secret manager
- `MAIL_FROM_EMAIL` definido para la campana
- `MAIL_FROM_PASSWORD` cargada fuera del repo
- asunto y cuerpo revisados
- sitios y CTA validados
- lote deduplicado contra `correos-enviados-importar.csv`
- decision tomada sobre si el contacto requiere correo de declaracion

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

Para que la transición de remitente personal a corporativo sea exitosa, cada correo enviado debe reforzar la autoridad de **Elenxos** y la utilidad de **Agora**.

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
  <p style="font-size: 12px; margin-top: 10px;">
    Siguenos: 
    <a href="https://www.linkedin.com/company/elenxos" style="color: #007bff;">LinkedIn</a> | 
    <a href="https://www.instagram.com/agora.elenxos" style="color: #007bff;">Instagram</a>
  </p>
</div>
```

### Transición de Remitente

Si el contacto ya ha recibido correos desde la cuenta personal de Steven, se recomienda incluir esta nota al inicio o final del cuerpo:

> "Estamos profesionalizando nuestras comunicaciones. A partir de ahora, este será el canal oficial de **Elenxos** para coordinar demos y pilotos de **Agora**."

## Notas operativas

- SMTP relay: `148.230.88.162:587` con `STARTTLS`
- `html` es opcional; si se omite, sale solo texto plano
- webmail: `https://mail.proxy.humanizar-dev.cloud`
- no hay `rate limiting` documentado; enviar por lotes pequenos y registrar respuesta

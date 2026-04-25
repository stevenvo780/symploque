# Guía de Developer Apps para Automatización de Redes Sociales

Cada plataforma exige crear una "app de desarrollador" para obtener tokens de API que permitan publicar contenido desde código.

Una vez obtenidos los tokens, se agregan al `.env` y el script `scripts/publicar_redes.py` los usa automáticamente.

---

## 1. LinkedIn — Community Management API

### Costo
Gratis para publicar desde tu propia página de empresa.

### Pasos

1. **Ir al portal de desarrolladores**
   ```
   https://www.linkedin.com/developers/
   ```

2. **Crear una app**
   - Click en "Create App"
   - Nombre: `Elenxos Social Publisher`
   - Asociar a la **LinkedIn Page**: Elenxos (la que ya creaste)
   - Logo: usar `logo_kodama_512.png`
   - Aceptar términos

3. **Solicitar acceso a la Community Management API**
   - En el dashboard de la app, ir a pestaña **Products**
   - Buscar "Community Management API" y hacer click en "Request Access"
   - Explicar el caso de uso:
     ```
     We are a small academic software startup (Elenxos) and need to publish
     product updates to our own company page programmatically.
     ```
   - LinkedIn revisa en 1–7 días

4. **Verificar la Company Page**
   - En la pestaña **Settings** de la app, sección "Verify"
   - La persona que administra la Company Page debe aprobar la vinculación
   - Esto desbloquea el scope `w_organization_social`

5. **Obtener el Access Token**
   - Ir a pestaña **Auth**
   - Copiar Client ID y Client Secret
   - Usar el OAuth 2.0 3-legged flow o la herramienta de LinkedIn:
     ```
     https://www.linkedin.com/developers/tools/oauth
     ```
   - Scopes necesarios: `w_organization_social`, `r_organization_social`
   - El token que recibes dura **60 días** — hay que renovarlo

6. **Obtener el Organization ID**
   - Ir a tu Company Page como admin
   - En la URL verás algo como `linkedin.com/company/12345678/admin/`
   - Ese número es el Organization ID
   - Alternativa: usar la API con `GET /v2/organizationAcls?q=roleAssignee`

7. **Agregar al .env**
   ```bash
   LINKEDIN_ACCESS_TOKEN=tu_token_aqui
   LINKEDIN_ORG_ID=12345678
   ```

8. **Verificar**
   ```bash
   python3 scripts/publicar_redes.py --post 1 --plataforma linkedin --dry-run
   python3 scripts/publicar_redes.py --post 1 --plataforma linkedin
   ```

### Endpoints que usa el script
- `POST /v2/assets?action=registerUpload` — subir imagen
- `POST /v2/ugcPosts` — crear publicación

### Renovación del token
El access token de LinkedIn expira cada 60 días.
Configurar un cron o recordatorio para regenerar.

---

## 2. X (Twitter) — API v2

### Costo
> **⚠️ IMPORTANTE**: X eliminó el tier gratuito en febrero 2026.
> El modelo actual es **pay-per-use**:
> - Crear un tweet: ~$0.01 USD por request
> - Leer un tweet: ~$0.005 USD por request
>
> Para el volumen de Elenxos (~5-10 posts/semana), el costo sería < $1 USD/mes.

### Pasos

1. **Ir al portal de desarrolladores**
   ```
   https://developer.x.com/
   ```

2. **Crear cuenta de desarrollador**
   - Click en "Sign up"
   - Iniciar sesión con la cuenta de X/Twitter de Elenxos
   - Describir el caso de uso:
     ```
     Automated posting of product updates for our academic software
     startup Elenxos. Publishing 5-10 posts per week to our own account.
     ```

3. **Crear un Project y App**
   - En el dashboard: "Projects & Apps" → "Add Project"
   - Nombre del proyecto: `Elenxos Publisher`
   - Nombre de la app: `elenxos-social-bot`

4. **Generar las credenciales**
   - En la app, ir a "Keys and Tokens"
   - **Consumer Keys**: API Key + API Secret → copiar
   - **Authentication Tokens**: Access Token + Secret → generar y copiar

   ⚠️ Los tokens se muestran UNA SOLA VEZ. Copiarlos inmediatamente.

5. **Configurar permisos**
   - En "App Settings" → "User authentication settings"
   - Activar OAuth 1.0a
   - Tipo: Read and Write
   - Callback URL: `https://elenxos.com/callback` (no se usa pero es obligatorio)

6. **Agregar al .env**
   ```bash
   TWITTER_API_KEY=tu_api_key
   TWITTER_API_SECRET=tu_api_secret
   TWITTER_ACCESS_TOKEN=tu_access_token
   TWITTER_ACCESS_TOKEN_SECRET=tu_access_token_secret
   ```

7. **Instalar dependencia**
   ```bash
   pip install tweepy
   ```

8. **Verificar**
   ```bash
   python3 scripts/publicar_redes.py --post 1 --plataforma x --dry-run
   python3 scripts/publicar_redes.py --post 1 --plataforma x
   ```

### Endpoints que usa el script
- `POST /2/tweets` — crear tweet (via tweepy)
- `POST /1.1/media/upload.json` — subir imagen (via tweepy)

---

## 3. Instagram — Graph API (via Meta / Facebook)

### Costo
Gratis.

### Requisitos previos
- La cuenta @agora.elenxos debe ser **Business** o **Creator** (no personal)
- Debe estar conectada a una **Facebook Page**
- Las imágenes a publicar deben estar en una **URL pública** (no se sube archivo local)

### Pasos

1. **Convertir a cuenta profesional** (si no lo está)
   - En la app de Instagram: Configuración → Cuenta → Cambiar a cuenta profesional → Business
   - Categoría: Software

2. **Crear una Facebook Page** (si no existe)
   - Ir a https://www.facebook.com/pages/create
   - Nombre: `Elenxos`
   - Categoría: Software
   - Vincular la cuenta de Instagram en Settings de la Page

3. **Ir al portal de desarrolladores de Meta**
   ```
   https://developers.facebook.com/
   ```

4. **Crear una app**
   - Click en "Create App"
   - Tipo: **Business**
   - Nombre: `Elenxos Social Publisher`
   - Agregar el producto "Instagram Graph API"

5. **Configurar permisos**
   - En App Dashboard → App Review → Permissions and Features
   - Solicitar:
     - `instagram_business_basic`
     - `instagram_business_content_publish`
     - `pages_read_engagement`

6. **Obtener Access Token**
   - Ir a "Tools" → "Graph API Explorer"
   - Seleccionar tu app
   - Generar User Token con los permisos mencionados
   - Extender el token a **long-lived** (60 días):
     ```
     GET /oauth/access_token?grant_type=fb_exchange_token&client_id={app-id}&client_secret={app-secret}&fb_exchange_token={short-lived-token}
     ```

7. **Obtener Instagram Business Account ID**
   - En Graph API Explorer:
     ```
     GET /me/accounts?fields=instagram_business_account
     ```
   - El `id` dentro de `instagram_business_account` es lo que necesitas

8. **Agregar al .env**
   ```bash
   INSTAGRAM_ACCESS_TOKEN=tu_token_largo
   INSTAGRAM_BUSINESS_ACCOUNT_ID=17841400000000
   ```

9. **Nota sobre imágenes**
   La Graph API de Instagram **no acepta archivos locales**. La imagen debe estar en una URL pública.
   Opciones:
   - Subir a un CDN o bucket S3
   - Usar GitHub raw URLs (si el repo es público)
   - Servir temporalmente con `python3 -m http.server`

### Endpoints que usa el script
- `POST /{ig-user-id}/media` — crear container de imagen
- `POST /{ig-user-id}/media_publish` — publicar el container
- Límite: 100 publicaciones vía API por período de 24 horas

---

## 4. YouTube — Data API v3

### Costo
Gratis hasta 10,000 unidades de quota/día (~6 uploads).

### Pasos

1. **Ir a Google Cloud Console**
   ```
   https://console.cloud.google.com/
   ```
   - Iniciar sesión con la cuenta de Google asociada a `media@elenxos.com`

2. **Crear un proyecto**
   - Click en el selector de proyecto → "New Project"
   - Nombre: `Elenxos Social Publisher`

3. **Habilitar la YouTube Data API v3**
   - Ir a "APIs & Services" → "Library"
   - Buscar "YouTube Data API v3"
   - Click en "Enable"

4. **Configurar la pantalla de consentimiento OAuth**
   - Ir a "APIs & Services" → "OAuth consent screen"
   - Tipo: External
   - Nombre de la app: `Elenxos Publisher`
   - Email de soporte: `media@elenxos.com`
   - Agregar scope: `https://www.googleapis.com/auth/youtube.upload`
   - Agregar `media@elenxos.com` como **Test User**

5. **Crear credenciales OAuth**
   - Ir a "APIs & Services" → "Credentials"
   - "Create Credentials" → "OAuth client ID"
   - Tipo: Desktop application
   - Nombre: `elenxos-publisher`
   - Descargar el archivo JSON → guardarlo como:
     ```
     scripts/client_secrets_youtube.json
     ```
   - ⚠️ Agregar a `.gitignore`:
     ```
     scripts/client_secrets_youtube.json
     ```

6. **Primera autenticación** (requiere navegador, una sola vez)
   ```python
   # Script de autenticación inicial — ejecutar una vez
   from google_auth_oauthlib.flow import InstalledAppFlow

   flow = InstalledAppFlow.from_client_secrets_file(
       "scripts/client_secrets_youtube.json",
       scopes=["https://www.googleapis.com/auth/youtube.upload"]
   )
   credentials = flow.run_local_server(port=8080)
   print(f"Access Token: {credentials.token}")
   print(f"Refresh Token: {credentials.refresh_token}")
   ```
   - Copiar el Refresh Token — es permanente y permite renovar el Access Token sin navegador

7. **Agregar al .env**
   ```bash
   YOUTUBE_CLIENT_ID=tu_client_id
   YOUTUBE_CLIENT_SECRET=tu_client_secret
   YOUTUBE_REFRESH_TOKEN=tu_refresh_token
   ```

8. **Instalar dependencias**
   ```bash
   pip install google-api-python-client google-auth-oauthlib
   ```

### Quota de YouTube
| Operación | Costo en unidades |
|---|---|
| `videos.insert` (upload) | 1,600 |
| `channels.list` | 1 |
| **Cuota diaria total** | **10,000** |
| Uploads posibles/día | ~6 |

---

## Resumen de tokens a configurar

Después de crear las 4 apps, tu `.env` tendrá:

```bash
# LinkedIn
LINKEDIN_ACCESS_TOKEN=ey...
LINKEDIN_ORG_ID=12345678

# X / Twitter
TWITTER_API_KEY=abc123
TWITTER_API_SECRET=def456
TWITTER_ACCESS_TOKEN=ghi789
TWITTER_ACCESS_TOKEN_SECRET=jkl012

# Instagram
INSTAGRAM_ACCESS_TOKEN=EAA...
INSTAGRAM_BUSINESS_ACCOUNT_ID=17841400000000

# YouTube
YOUTUBE_CLIENT_ID=xxx.apps.googleusercontent.com
YOUTUBE_CLIENT_SECRET=GOCSPX-xxx
YOUTUBE_REFRESH_TOKEN=1//0xxx
```

## Orden recomendado de creación

| # | Plataforma | Dificultad | Tiempo estimado | Prioridad |
|---|---|---|---|---|
| 1 | **X/Twitter** | ⭐ Baja | 15 min | Alta (primer post es texto puro) |
| 2 | **LinkedIn** | ⭐⭐ Media | 30 min + espera de aprobación | Alta |
| 3 | **YouTube** | ⭐⭐ Media | 20 min | Media (no hay video aún) |
| 4 | **Instagram** | ⭐⭐⭐ Alta | 45 min + necesita Facebook Page | Media |

## Archivos a agregar al .gitignore

```
scripts/client_secrets_youtube.json
```

Los demás tokens van solo en `.env` que ya está en `.gitignore`.

#!/usr/bin/env python3
"""
Publicador automático de redes sociales para Elenxos / Agora.

Uso:
  python3 scripts/publicar_redes.py --plataforma linkedin --post 1
  python3 scripts/publicar_redes.py --plataforma x --post 1
  python3 scripts/publicar_redes.py --plataforma instagram --post 1
  python3 scripts/publicar_redes.py --todas --post 1
  python3 scripts/publicar_redes.py --listar

Requisitos:
  pip install requests python-dotenv

Configuración:
  Las credenciales de APIs van en .env (no versionado):

  # LinkedIn (OAuth 2.0 — requiere app registrada)
  LINKEDIN_ACCESS_TOKEN=
  LINKEDIN_ORG_ID=

  # X / Twitter (OAuth 1.0a — requiere developer app)
  TWITTER_API_KEY=
  TWITTER_API_SECRET=
  TWITTER_ACCESS_TOKEN=
  TWITTER_ACCESS_TOKEN_SECRET=

  # Instagram (Graph API via Facebook — requiere Business account + Page)
  INSTAGRAM_ACCESS_TOKEN=
  INSTAGRAM_BUSINESS_ACCOUNT_ID=

  # YouTube (OAuth 2.0 — requiere Google Cloud project)
  YOUTUBE_ACCESS_TOKEN=
  YOUTUBE_CHANNEL_ID=

Estado actual de APIs:
  - LinkedIn: requiere crear app en https://developer.linkedin.com/
  - X/Twitter: requiere crear app en https://developer.x.com/
  - Instagram: requiere Facebook Business Suite + Graph API
  - YouTube: requiere Google Cloud Console + YouTube Data API v3
"""

import os
import sys
import json
import argparse
from pathlib import Path

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

# --- Constantes del repo ---
REPO_ROOT = Path(__file__).resolve().parent.parent
ASSETS_DIR = REPO_ROOT / "assets"
BRAND_LOGOS = ASSETS_DIR / "brand" / "mto" / "kit_logos"
CAMPANAS = ASSETS_DIR / "entregables" / "campanas"

# --- Catálogo de posts ---
POSTS = {
    1: {
        "nombre": "Tesis de marca",
        "imagen": str(CAMPANAS / "campana_1_solucion/sin_ia/publicaciones/publicacion__lote1_estandar__sin_ia_01.png"),
        "linkedin": {
            "texto": """Durante mucho tiempo, la investigación académica ha trabajado con una fractura silenciosa:

— el argumento en un documento,
— la lógica en otra parte,
— los archivos en carpetas dispersas,
— la colaboración en chats,
— y la infraestructura en herramientas separadas.

Agora nace justo para cerrar esa fractura.

Es una plataforma de investigación cooperativa donde Markdown académico, lógica formal ejecutable, terminales cloud, IA y trabajo colaborativo pertenecen al mismo flujo.

La tesis es simple:

escribe con libertad, verifica con rigor.

Si una disciplina exige precisión, sus herramientas también deberían hacerlo.

https://agora.elenxos.com/

#SoftwareAcadémico #InvestigaciónCooperativa #Agora #Elenxos #LogicaFormal #Semilleros #TrabajoDeGrado"""
        },
        "instagram": {
            "texto": """Durante mucho tiempo, la investigación académica ha trabajado con una fractura silenciosa:

— el argumento en un documento,
— la lógica en otra parte,
— los archivos en carpetas dispersas,
— la colaboración en chats.

Agora nace para cerrar esa fractura.

Markdown académico + lógica formal ejecutable + terminales cloud + IA + colaboración. Todo en un flujo.

La tesis es simple: escribe con libertad, verifica con rigor.

🔗 Link en bio → agora.elenxos.com

#InvestigaciónAcadémica #SoftwareAcadémico #Agora #Elenxos #TrabajoCooperativo #LogicaFormal #Markdown #AcademiaLatina #Semilleros #TesisDoctoral"""
        },
        "x": {
            "texto": """Agora no quiere ser otro editor con IA.
Quiere ser un mejor entorno para investigación rigurosa:

— Markdown académico
— lógica formal ejecutable
— terminales cloud
— colaboración en tiempo real

https://agora.elenxos.com/"""
        },
    },
    2: {
        "nombre": "Diferenciador real",
        "imagen": str(CAMPANAS / "campana_0_dolor/sin_ia/publicaciones/publicacion__post_geek_logo_hero__sin_ia_01.png"),
        "linkedin": {
            "texto": """Lo interesante de Agora no es solo que tenga IA o colaboración.

Lo interesante es esta combinación:

1. Un editor de Markdown académico con soporte para LaTeX, BibTeX y bloques de código.
2. Un lenguaje de lógica formal (ST) ejecutable dentro del mismo editor.
3. Terminales cloud con Python, R o lo que el proyecto necesite.
4. Agentes de IA que operan sobre el contexto real del workspace.
5. Colaboración donde cada cambio tiene autoría y trazabilidad.

No se trata de reemplazar el trabajo con automatización.
Se trata de darle infraestructura al pensamiento riguroso.

https://agora.elenxos.com/

#InvestigaciónCooperativa #SoftwareAcadémico #Agora #Elenxos"""
        },
        "instagram": {
            "texto": """Lo interesante de Agora no es solo la IA o la colaboración.

Es esta combinación:

1️⃣ Markdown académico + LaTeX + BibTeX
2️⃣ Lógica formal ejecutable (ST)
3️⃣ Terminales cloud
4️⃣ IA sobre tu contexto real
5️⃣ Colaboración con trazabilidad

No se trata de reemplazar el trabajo con automatización.
Se trata de darle infraestructura al pensamiento riguroso.

🔗 Link en bio

#SoftwareAcadémico #Agora #Elenxos #LogicaFormal #InvestigaciónAcadémica #Semilleros"""
        },
        "x": {
            "texto": """Si una disciplina exige precisión, sus herramientas también deberían hacerlo."""
        },
    },
    3: {
        "nombre": "Prueba de madurez",
        "imagen": None,  # Requiere screenshots reales del producto
        "linkedin": {
            "texto": """No es un demo. Es una plataforma en producción.

En Agora hoy puedes:

— Escribir en Markdown con soporte para LaTeX y BibTeX
— Formalizar argumentos con lógica formal ejecutable
— Verificar derivaciones, tablas de verdad y contramodelos
— Ejecutar código en terminales cloud
— Colaborar con tu equipo en tiempo real

No vendemos una visión. Vendemos un flujo.

La versión 3.1.1 del Manual Maestro está publicada.
Los docs y la plataforma están en línea.

https://agora.elenxos.com/

#Agora #Elenxos #SoftwareAcadémico #InvestigaciónRigurosa"""
        },
        "instagram": {
            "texto": """No es un demo. Es una plataforma en producción. 🚀

En Agora HOY puedes:

✍️ Escribir en Markdown con LaTeX
🔬 Formalizar argumentos con lógica formal
✅ Verificar derivaciones y tablas de verdad
💻 Ejecutar código en terminales cloud
👥 Colaborar en tiempo real

No vendemos una visión. Vendemos un flujo.

v3.1.1 en línea.

🔗 Link en bio

#Agora #Elenxos #SoftwareAcadémico #AcademiaLatina"""
        },
        "x": {
            "texto": """La tesis de Agora:

escribe con libertad,
verifica con rigor."""
        },
    },
}

# --- Funciones de publicación por plataforma ---

def publicar_linkedin(post_data, imagen_path):
    """Publica en LinkedIn usando la API de Marketing."""
    access_token = os.getenv("LINKEDIN_ACCESS_TOKEN")
    org_id = os.getenv("LINKEDIN_ORG_ID")

    if not access_token or not org_id:
        print("⚠️  LinkedIn: LINKEDIN_ACCESS_TOKEN y LINKEDIN_ORG_ID no configurados en .env")
        print("   Para configurar:")
        print("   1. Crear app en https://developer.linkedin.com/")
        print("   2. Solicitar scope: w_organization_social")
        print("   3. Obtener access token OAuth 2.0")
        print("   4. Obtener el Organization ID de la página de empresa")
        print("   5. Agregar a .env:")
        print("      LINKEDIN_ACCESS_TOKEN=tu_token")
        print("      LINKEDIN_ORG_ID=tu_org_id")
        return False

    import requests

    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0",
    }

    # Si hay imagen, primero subirla
    media_urn = None
    if imagen_path and os.path.exists(imagen_path):
        # Paso 1: Registrar upload
        register_data = {
            "registerUploadRequest": {
                "recipes": ["urn:li:digitalmediaRecipe:feedshare-image"],
                "owner": f"urn:li:organization:{org_id}",
                "serviceRelationships": [{
                    "relationshipType": "OWNER",
                    "identifier": "urn:li:userGeneratedContent"
                }]
            }
        }
        r = requests.post(
            "https://api.linkedin.com/v2/assets?action=registerUpload",
            headers=headers,
            json=register_data
        )
        if r.status_code == 200:
            upload_url = r.json()["value"]["uploadMechanism"]["com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"]["uploadUrl"]
            media_urn = r.json()["value"]["asset"]

            # Paso 2: Subir imagen
            with open(imagen_path, "rb") as f:
                requests.put(upload_url, data=f, headers={
                    "Authorization": f"Bearer {access_token}",
                    "Content-Type": "application/octet-stream"
                })

    # Paso 3: Crear post
    post_body = {
        "author": f"urn:li:organization:{org_id}",
        "lifecycleState": "PUBLISHED",
        "specificContent": {
            "com.linkedin.ugc.ShareContent": {
                "shareCommentary": {"text": post_data["texto"]},
                "shareMediaCategory": "IMAGE" if media_urn else "NONE",
            }
        },
        "visibility": {"com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"},
    }

    if media_urn:
        post_body["specificContent"]["com.linkedin.ugc.ShareContent"]["media"] = [{
            "status": "READY",
            "media": media_urn,
        }]

    r = requests.post("https://api.linkedin.com/v2/ugcPosts", headers=headers, json=post_body)
    if r.status_code in (200, 201):
        print(f"✅ LinkedIn: publicado exitosamente")
        return True
    else:
        print(f"❌ LinkedIn: error {r.status_code} — {r.text}")
        return False


def publicar_x(post_data, imagen_path):
    """Publica en X/Twitter usando la API v2."""
    api_key = os.getenv("TWITTER_API_KEY")
    api_secret = os.getenv("TWITTER_API_SECRET")
    access_token = os.getenv("TWITTER_ACCESS_TOKEN")
    access_secret = os.getenv("TWITTER_ACCESS_TOKEN_SECRET")

    if not all([api_key, api_secret, access_token, access_secret]):
        print("⚠️  X/Twitter: credenciales no configuradas en .env")
        print("   Para configurar:")
        print("   1. Crear app en https://developer.x.com/")
        print("   2. Obtener API Key, API Secret, Access Token, Access Token Secret")
        print("   3. Agregar a .env:")
        print("      TWITTER_API_KEY=tu_api_key")
        print("      TWITTER_API_SECRET=tu_api_secret")
        print("      TWITTER_ACCESS_TOKEN=tu_access_token")
        print("      TWITTER_ACCESS_TOKEN_SECRET=tu_access_token_secret")
        return False

    try:
        import tweepy
    except ImportError:
        print("⚠️  X/Twitter: instalar tweepy — pip install tweepy")
        return False

    client = tweepy.Client(
        consumer_key=api_key,
        consumer_secret=api_secret,
        access_token=access_token,
        access_token_secret=access_secret,
    )

    # Subir imagen si existe
    media_id = None
    if imagen_path and os.path.exists(imagen_path):
        auth = tweepy.OAuth1UserHandler(api_key, api_secret, access_token, access_secret)
        api_v1 = tweepy.API(auth)
        media = api_v1.media_upload(imagen_path)
        media_id = media.media_id

    response = client.create_tweet(
        text=post_data["texto"],
        media_ids=[media_id] if media_id else None,
    )

    if response.data:
        tweet_id = response.data["id"]
        print(f"✅ X/Twitter: publicado — https://x.com/i/status/{tweet_id}")
        return True
    else:
        print(f"❌ X/Twitter: error — {response}")
        return False


def publicar_instagram(post_data, imagen_path):
    """Publica en Instagram via Graph API (requiere Business Account)."""
    access_token = os.getenv("INSTAGRAM_ACCESS_TOKEN")
    account_id = os.getenv("INSTAGRAM_BUSINESS_ACCOUNT_ID")

    if not access_token or not account_id:
        print("⚠️  Instagram: credenciales no configuradas en .env")
        print("   Para configurar:")
        print("   1. Conectar Instagram a una Facebook Page")
        print("   2. Crear app en https://developers.facebook.com/")
        print("   3. Obtener token con permisos: instagram_basic, instagram_content_publish")
        print("   4. Obtener el Instagram Business Account ID")
        print("   5. Agregar a .env:")
        print("      INSTAGRAM_ACCESS_TOKEN=tu_token")
        print("      INSTAGRAM_BUSINESS_ACCOUNT_ID=tu_account_id")
        print("   NOTA: La imagen debe estar accesible vía URL pública.")
        print("         Subir primero a un hosting o usar la app manualmente.")
        return False

    import requests

    # Instagram Graph API requiere URL pública de la imagen
    print("⚠️  Instagram Graph API requiere que la imagen esté en una URL pública.")
    print(f"   Imagen local: {imagen_path}")
    print("   Para automatizar: subir la imagen a un CDN y usar la URL resultante.")
    return False


def listar_posts():
    """Muestra el catálogo de posts disponibles."""
    print("\n📋 Posts disponibles:\n")
    for num, post in POSTS.items():
        img_status = "✅" if post["imagen"] and os.path.exists(post["imagen"]) else "❌ (sin imagen)"
        plataformas = ", ".join(post.keys() - {"nombre", "imagen"})
        print(f"  Post {num}: {post['nombre']} {img_status}")
        print(f"           Plataformas: {plataformas}")
        if post["imagen"]:
            print(f"           Imagen: {os.path.basename(post['imagen'])}")
        print()


# --- Main ---

def main():
    parser = argparse.ArgumentParser(description="Publicador de redes sociales Elenxos / Agora")
    parser.add_argument("--plataforma", choices=["linkedin", "x", "instagram"], help="Plataforma destino")
    parser.add_argument("--todas", action="store_true", help="Publicar en todas las plataformas")
    parser.add_argument("--post", type=int, help="Número de post a publicar (1, 2, 3)")
    parser.add_argument("--listar", action="store_true", help="Listar posts disponibles")
    parser.add_argument("--dry-run", action="store_true", help="Mostrar qué se publicaría sin publicar")

    args = parser.parse_args()

    if args.listar:
        listar_posts()
        return

    if not args.post:
        print("❌ Falta --post <número>. Usa --listar para ver opciones.")
        return

    if args.post not in POSTS:
        print(f"❌ Post {args.post} no existe. Usa --listar para ver opciones.")
        return

    post = POSTS[args.post]
    imagen = post["imagen"]

    if args.dry_run:
        print(f"\n🔍 DRY RUN — Post {args.post}: {post['nombre']}\n")
        if imagen:
            print(f"📷 Imagen: {imagen}")
            print(f"   Existe: {'✅' if os.path.exists(imagen) else '❌'}\n")

        plataformas = args.plataforma and [args.plataforma] or ["linkedin", "x", "instagram"]
        for p in plataformas:
            if p in post:
                print(f"--- {p.upper()} ---")
                print(post[p]["texto"])
                print()
        return

    plataformas = []
    if args.todas:
        plataformas = ["linkedin", "x", "instagram"]
    elif args.plataforma:
        plataformas = [args.plataforma]
    else:
        print("❌ Especifica --plataforma o --todas")
        return

    for p in plataformas:
        if p not in post:
            print(f"⚠️  Post {args.post} no tiene copy para {p}")
            continue

        print(f"\n📤 Publicando en {p.upper()}...")
        if p == "linkedin":
            publicar_linkedin(post[p], imagen)
        elif p == "x":
            publicar_x(post[p], imagen)
        elif p == "instagram":
            publicar_instagram(post[p], imagen)


if __name__ == "__main__":
    main()

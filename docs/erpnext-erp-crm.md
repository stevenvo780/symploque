# ERPNext Elenxos — ERP + CRM

> **Host**: humanizar2 (`100.98.5.11`)
> **Stack**: ERPNext v15 · Docker (9 containers) · MariaDB 10.11
> **Site**: `elenxos.local`
> **Config**: `/home/humanizar/elenxos-erp/docker-compose.yml`

---

## 1) Accesos

| URL | Función |
|-----|---------|
| `https://erp.proxy.humanizar-dev.cloud` | ERP — Contabilidad, Facturación, Inventario |
| `https://crm.proxy.humanizar-dev.cloud` | CRM — Leads, Oportunidades, Clientes |

Ambas URL apuntan al mismo backend ERPNext v15. El módulo CRM viene integrado.

- **Usuario operativo ERP/CRM**: `admin@elenxos.com`
- **Contraseña**: secreto local / gestor seguro. No versionar en markdown.
- **Usuario admin legacy**: `Administrator` (conservar solo para administracion de bajo nivel si aplica)

---

## 2) Arquitectura

```
Internet → VPS Nginx (:443 SNI) → nginx_pp_relay (:8444→:8443)
    ├── erp.proxy.humanizar-dev.cloud ─┐
    └── crm.proxy.humanizar-dev.cloud ─┤
                                        ▼
                    humanizar2 (100.98.5.11:8090)
                    ┌─────────────────────────────┐
                    │  elenxos-nginx (:8090→:80)   │
                    │  elenxos-app (:8000)         │
                    │  elenxos-socketio (:9000)    │
                    │  elenxos-mariadb (:3306)     │
                    │  elenxos-redis-cache (:6379) │
                    │  elenxos-redis-queue (:6379) │
                    │  elenxos-worker-short        │
                    │  elenxos-worker-long         │
                    │  elenxos-scheduler           │
                    └─────────────────────────────┘
```

### Containers (9)

| Container | Rol |
|-----------|-----|
| `elenxos-nginx` | Reverse proxy interno (80→8090 externo) |
| `elenxos-app` | Frappe/ERPNext (Gunicorn :8000) |
| `elenxos-socketio` | Realtime (Socket.IO :9000) |
| `elenxos-mariadb` | Base de datos MariaDB 10.11 |
| `elenxos-redis-cache` | Cache Redis |
| `elenxos-redis-queue` | Queue Redis (RQ) |
| `elenxos-worker-short` | Worker tareas cortas |
| `elenxos-worker-long` | Worker tareas largas |
| `elenxos-scheduler` | Cron/scheduler de ERPNext |

---

## 3) Credenciales (Vault)

| Entrada | Carpeta Vault | Items |
|---------|---------------|-------|
| Usuario operativo ERP/CRM | `Trabajo/Humanizar/Accesos` | `admin@elenxos.com` |
| Admin ERP/CRM legacy | `Trabajo/Humanizar/Accesos` | `ERPNext Elenxos - Administrator` |
| DB Root | `Trabajo/Humanizar/Accesos` | `ERPNext Elenxos - DB Root` |
| DB App User | `Trabajo/Humanizar/Accesos` | `ERPNext Elenxos - DB App User` |

---

## 4) SSL

- **Certificado**: `/etc/letsencrypt/live/erp.proxy.humanizar-dev.cloud/` (cubre `erp.proxy` + `crm.proxy`)
- **Expira**: 2026-07-19
- **Renovación**: certbot timer (automática)

---

## 5) Operaciones comunes

### Estado de los containers

```bash
docker ps --filter name=elenxos --format "table {{.Names}}\t{{.Status}}"
```

### Reiniciar stack completo

```bash
cd /home/humanizar/elenxos-erp && docker compose restart
```

### Logs

```bash
# App (Gunicorn)
docker logs elenxos-app --tail 50

# Worker
docker logs elenxos-worker-short --tail 30

# MariaDB
docker logs elenxos-mariadb --tail 30
```

### Backup

```bash
# Backup completo (DB + archivos)
docker exec elenxos-app bench --site elenxos.local backup --with-files

# Los backups quedan en el volume de sites:
docker exec elenxos-app ls sites/elenxos.local/private/backups/
```

### Restaurar backup

```bash
docker exec elenxos-app bench --site elenxos.local restore <sql-file>
```

### Actualizar ERPNext

```bash
cd /home/humanizar/elenxos-erp
docker compose pull
docker compose up -d
docker exec elenxos-app bench --site elenxos.local migrate
```

### Consola interactiva (debug)

```bash
docker exec -it elenxos-app bench --site elenxos.local console
```

---

## 6) Base de datos

| Parámetro | Valor |
|-----------|-------|
| Motor | MariaDB 10.11 |
| Container | `elenxos-mariadb` |
| Config tuning | `/home/humanizar/elenxos-erp/mariadb-conf/erpnext.cnf` |
| Credenciales | Vault (ver sección 3) |

### Acceso directo a DB

```bash
docker exec -it elenxos-mariadb mariadb -u root -p
```

---

## 7) Proxy (VPS)

El tráfico llega por el VPS (`148.230.88.162`) vía SNI routing:

- `erp.proxy.humanizar-dev.cloud` → `nginx_pp_relay` → `humanizar2:8090`
- `crm.proxy.humanizar-dev.cloud` → misma ruta (mismo backend)

DNS: ambos registros apuntan al VPS. El proxy relay reenvía por NetBird a `100.98.5.11`.

---

## 8) Troubleshooting

| Síntoma | Causa probable | Acción |
|---------|----------------|--------|
| 502 en erp/crm.proxy | `elenxos-app` caído o reiniciando | `docker compose restart` en humanizar2 |
| Login loop | Redis cache corrupto | `docker restart elenxos-redis-cache` |
| Scheduler no ejecuta | Container scheduler caído | `docker restart elenxos-scheduler` |
| DB slow | Falta tuning MariaDB | Revisar `erpnext.cnf`, aumentar `innodb_buffer_pool_size` |
| Cert expirado | Certbot falló | `certbot renew --force-renewal` en VPS |

# Integraciones — Dashboard Aprobación de Créditos

## Resumen

Este documento describe el estado de las integraciones del MVP **dashboard-aprobacion-creditos** con los servicios reales de Konfío.

---

## Integraciones conectadas

### 1. auth-service (Autenticación)

| Campo | Valor |
|---|---|
| **Servicio** | auth-service |
| **Base URL** | `https://auth.konfio.mx/api/v1` |
| **Estado** | ✅ Disponible — Integración recomendada |
| **Uso en el MVP** | Proteger el acceso al dashboard. Solo analistas de crédito autenticados deben poder ver y gestionar solicitudes. |

#### Endpoints utilizados

| Método | Path | Descripción | Uso en el MVP |
|---|---|---|---|
| `POST` | `/auth/login` | Login con email y password | Página de login para analistas |
| `POST` | `/auth/refresh` | Renovar access token | Renovación automática de sesión |
| `POST` | `/auth/logout` | Invalidar tokens | Cerrar sesión del analista |
| `GET` | `/auth/me` | Obtener usuario autenticado | Obtener datos del analista logueado para header y auditoría |

#### Variables de entorno requeridas

```env
AUTH_SERVICE_URL=https://auth.konfio.mx/api/v1
AUTH_SERVICE_API_KEY=<api-key-proporcionada>
```

#### Patrón de integración

```typescript
// src/lib/auth-service.ts
const response = await fetch(`${process.env.AUTH_SERVICE_URL}/auth/me`, {
  headers: {
    Authorization: `Bearer ${token}`,
    'x-api-key': process.env.AUTH_SERVICE_API_KEY!,
  },
});
```

> **Nota:** Actualmente el MVP no implementa una página de login ni middleware de autenticación. Se recomienda agregar un middleware de Next.js que valide el JWT en cada request y redirija a `/login` si no hay sesión válida.

---

### 2. notification-service (Notificaciones)

| Campo | Valor |
|---|---|
| **Servicio** | notification-service |
| **Base URL** | `https://notifications.konfio.mx/api/v1` |
| **Estado** | ✅ Disponible — Integración recomendada |
| **Uso en el MVP** | Enviar notificaciones por email cuando una solicitud es aprobada o rechazada. |

#### Endpoints utilizados

| Método | Path | Descripción | Uso en el MVP |
|---|---|---|---|
| `POST` | `/notifications/email` | Enviar email transaccional | Notificar al solicitante sobre aprobación/rechazo |

#### Variables de entorno requeridas

```env
NOTIFICATIONS_URL=https://notifications.konfio.mx/api/v1
NOTIFICATIONS_API_KEY=<api-key-proporcionada>
```

#### Patrón de integración

```typescript
// src/lib/notification-service.ts
const response = await fetch(`${process.env.NOTIFICATIONS_URL}/notifications/email`, {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${token}`,
    'x-api-key': process.env.NOTIFICATIONS_API_KEY!,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    to: solicitante.email,
    subject: `Solicitud ${solicitud.id} — ${nuevoEstado}`,
    template: 'credit-decision',
    data: {
      empresa: solicitud.empresa,
      estado: nuevoEstado,
      justificacion: nota,
    },
  }),
});
```

> **Nota:** La integración con notificaciones se dispararía desde la acción de aprobar/rechazar en `detail-panel.tsx`. Actualmente esas acciones solo actualizan estado local.

---

## Gaps identificados (Servicios NO disponibles)

### GAP 1: Servicio de Solicitudes de Crédito (CRUD)

| Campo | Detalle |
|---|---|
| **Funcionalidad requerida** | API REST para consultar, filtrar, paginar y actualizar solicitudes de crédito |
| **Archivos afectados** | `src/lib/mock-data.ts`, `src/components/dashboard.tsx` |
| **Estado actual** | 🟡 Mock — Datos hardcodeados en `mock-data.ts` con 10 solicitudes de ejemplo |
| **Impacto** | Sin este servicio, el dashboard opera 100% con datos ficticios en memoria del cliente |

#### Endpoints esperados

| Método | Path | Descripción |
|---|---|---|
| `GET` | `/solicitudes` | Listar solicitudes con filtros (estado, búsqueda, ordenamiento) y paginación cursor-based |
| `GET` | `/solicitudes/:id` | Obtener detalle completo de una solicitud |
| `PATCH` | `/solicitudes/:id/estado` | Actualizar estado (aprobar/rechazar) con justificación |
| `POST` | `/solicitudes/:id/notas` | Agregar nota de analista |
| `GET` | `/solicitudes/stats` | Obtener KPIs agregados (total, pendientes, aprobados, tasa, etc.) |

#### Query params esperados para listado

```
GET /solicitudes?estado=pendiente&q=distribuidora&sort=score&order=desc&cursor=SOL-2026-0041&limit=20
```

#### Response esperado (patrón Konfío de paginación)

```json
{
  "data": [{ "id": "SOL-2026-0041", "empresa": "...", ... }],
  "nextCursor": "SOL-2026-0035",
  "total": 142
}
```

#### Variables de entorno necesarias (cuando exista)

```env
CREDIT_SOLICITUDES_URL=https://creditos.konfio.mx/api/v1
CREDIT_SOLICITUDES_API_KEY=<api-key>
```

---

### GAP 2: Servicio de Score Crediticio

| Campo | Detalle |
|---|---|
| **Funcionalidad requerida** | Consultar el score crediticio actualizado de un solicitante/empresa |
| **Archivos afectados** | `src/lib/mock-data.ts` (campo `score` hardcodeado) |
| **Estado actual** | 🟡 Mock — Score fijo por solicitud |
| **Impacto** | El score se muestra pero no se actualiza en tiempo real |

#### Endpoints esperados

| Método | Path | Descripción |
|---|---|---|
| `GET` | `/scoring/:rfc` | Obtener score crediticio por RFC |

---

### GAP 3: Servicio de Información Financiera de Empresa

| Campo | Detalle |
|---|---|
| **Funcionalidad requerida** | Consultar datos financieros de la empresa (ingreso mensual, antigüedad, sector, etc.) |
| **Archivos afectados** | `src/lib/mock-data.ts`, `src/components/detail-panel.tsx` |
| **Estado actual** | 🟡 Mock — Datos financieros hardcodeados |
| **Impacto** | El panel de detalle muestra información financiera ficticia |

---

## Arquitectura de integración recomendada

```
┌─────────────────────────────────┐
│       Next.js Frontend          │
│   (dashboard-aprobacion)        │
├─────────────────────────────────┤
│  Next.js API Routes (BFF)       │
│  /api/auth/*    → auth-service  │
│  /api/solicitudes/* → [GAP]     │
│  /api/notify/*  → notif-service │
└───────┬──────────┬──────────┬───┘
        │          │          │
   auth-service  [GAP:       notif-service
   (real ✅)    solicitudes]   (real ✅)
                  [GAP:
                 scoring]
```

### Recomendaciones

1. **Agregar Next.js API Routes como BFF** — Para no exponer API keys ni URLs de servicios internos al cliente.
2. **Implementar middleware de autenticación** — Usar `middleware.ts` de Next.js para validar JWT contra auth-service en cada request.
3. **Cuando el servicio de solicitudes exista** — Reemplazar `MOCK_DATA` en `dashboard.tsx` con llamadas a la API vía `fetch` en Server Components o API Routes.
4. **Disparar notificaciones en acciones** — Al aprobar/rechazar, llamar al notification-service desde una API Route del BFF.

---

## Matriz resumen

| Integración | Servicio | Estado | Prioridad |
|---|---|---|---|
| Autenticación de analistas | auth-service | ✅ Disponible | Alta |
| Notificación de decisiones | notification-service | ✅ Disponible | Media |
| CRUD de solicitudes de crédito | — | 🟡 Gap (Mock) | **Crítica** |
| Score crediticio en tiempo real | — | 🟡 Gap (Mock) | Alta |
| Información financiera de empresa | — | 🟡 Gap (Mock) | Alta |

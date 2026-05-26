/**
 * Datos mock para el dashboard de aprobación de créditos.
 *
 * ⚠️ GAP IDENTIFICADO: No existe un servicio real de Konfío para solicitudes de crédito.
 * Cuando esté disponible (ej: https://creditos.konfio.mx/api/v1), reemplazar este
 * archivo con llamadas al servicio real usando el patrón de integración estándar:
 *
 * ```typescript
 * const response = await fetch(`${process.env.CREDIT_SOLICITUDES_URL}/solicitudes?estado=pendiente&limit=20`, {
 *   headers: {
 *     Authorization: `Bearer ${token}`,
 *     'x-api-key': process.env.CREDIT_SOLICITUDES_API_KEY!,
 *   },
 * });
 * const { data, nextCursor, total } = await response.json();
 * ```
 *
 * Endpoints esperados:
 * - GET  /solicitudes          — Listar con filtros y paginación cursor-based
 * - GET  /solicitudes/:id      — Detalle completo
 * - PATCH /solicitudes/:id/estado — Cambiar estado con justificación
 * - POST /solicitudes/:id/notas  — Agregar nota de analista
 * - GET  /solicitudes/stats     — KPIs agregados
 *
 * @see INTEGRATIONS.md para más detalles sobre este gap.
 */

import type { Solicitud } from './types';

export const MOCK_DATA: Solicitud[] = [
  {
    id: 'SOL-2026-0041',
    empresa: 'Distribuidora León SA de CV',
    rfc: 'DLE150312AB1',
    montoSolicitado: 2500000,
    plazo: 24,
    tasaPropuesta: 18.5,
    score: 782,
    ingresoMensual: 890000,
    antiguedad: 8,
    sector: 'Comercio',
    analista: null,
    estado: 'pendiente',
    fechaSolicitud: '2026-05-24T10:30:00',
    notas: [],
    historial: [
      { fecha: '2026-05-24T10:30:00', accion: 'Solicitud recibida', usuario: 'Sistema' },
    ],
  },
  {
    id: 'SOL-2026-0040',
    empresa: 'Tech Solutions MX SA de CV',
    rfc: 'TSM180501CD2',
    montoSolicitado: 1800000,
    plazo: 18,
    tasaPropuesta: 16.0,
    score: 815,
    ingresoMensual: 1200000,
    antiguedad: 5,
    sector: 'Tecnología',
    analista: 'María González',
    estado: 'en_revision',
    fechaSolicitud: '2026-05-23T14:15:00',
    notas: [
      { texto: 'Empresa con buen historial crediticio', fecha: '2026-05-23T16:00:00', autor: 'María González' },
    ],
    historial: [
      { fecha: '2026-05-23T14:15:00', accion: 'Solicitud recibida', usuario: 'Sistema' },
      { fecha: '2026-05-23T15:00:00', accion: 'Asignada a analista', usuario: 'Sistema' },
      { fecha: '2026-05-23T16:00:00', accion: 'En revisión', usuario: 'María González' },
    ],
  },
  {
    id: 'SOL-2026-0039',
    empresa: 'Constructora del Norte SA de CV',
    rfc: 'CDN120815EF3',
    montoSolicitado: 5000000,
    plazo: 36,
    tasaPropuesta: 20.0,
    score: 695,
    ingresoMensual: 2300000,
    antiguedad: 12,
    sector: 'Construcción',
    analista: 'Carlos Ruiz',
    estado: 'aprobado',
    fechaSolicitud: '2026-05-22T09:00:00',
    notas: [
      { texto: 'Empresa sólida, 12 años en el mercado', fecha: '2026-05-22T11:00:00', autor: 'Carlos Ruiz' },
      { texto: 'Aprobado — flujo de caja suficiente', fecha: '2026-05-22T15:30:00', autor: 'Carlos Ruiz' },
    ],
    historial: [
      { fecha: '2026-05-22T09:00:00', accion: 'Solicitud recibida', usuario: 'Sistema' },
      { fecha: '2026-05-22T10:00:00', accion: 'Asignada a analista', usuario: 'Sistema' },
      { fecha: '2026-05-22T11:00:00', accion: 'En revisión', usuario: 'Carlos Ruiz' },
      { fecha: '2026-05-22T15:30:00', accion: 'Aprobada', usuario: 'Carlos Ruiz' },
    ],
  },
  {
    id: 'SOL-2026-0038',
    empresa: 'Alimentos Frescos del Bajío SA de CV',
    rfc: 'AFB170220GH4',
    montoSolicitado: 800000,
    plazo: 12,
    tasaPropuesta: 22.0,
    score: 580,
    ingresoMensual: 450000,
    antiguedad: 3,
    sector: 'Alimentos',
    analista: 'Ana López',
    estado: 'rechazado',
    fechaSolicitud: '2026-05-21T11:45:00',
    notas: [
      { texto: 'Score bajo, empresa con poca antigüedad', fecha: '2026-05-21T14:00:00', autor: 'Ana López' },
      { texto: 'Rechazado — riesgo alto por falta de historial', fecha: '2026-05-21T16:00:00', autor: 'Ana López' },
    ],
    historial: [
      { fecha: '2026-05-21T11:45:00', accion: 'Solicitud recibida', usuario: 'Sistema' },
      { fecha: '2026-05-21T12:30:00', accion: 'Asignada a analista', usuario: 'Sistema' },
      { fecha: '2026-05-21T14:00:00', accion: 'En revisión', usuario: 'Ana López' },
      { fecha: '2026-05-21T16:00:00', accion: 'Rechazada', usuario: 'Ana López' },
    ],
  },
  {
    id: 'SOL-2026-0037',
    empresa: 'Logística Express SA de CV',
    rfc: 'LEX190630IJ5',
    montoSolicitado: 3200000,
    plazo: 24,
    tasaPropuesta: 17.5,
    score: 740,
    ingresoMensual: 1500000,
    antiguedad: 6,
    sector: 'Logística',
    analista: null,
    estado: 'pendiente',
    fechaSolicitud: '2026-05-24T08:20:00',
    notas: [],
    historial: [
      { fecha: '2026-05-24T08:20:00', accion: 'Solicitud recibida', usuario: 'Sistema' },
    ],
  },
  {
    id: 'SOL-2026-0036',
    empresa: 'Farmacia Popular del Centro SA de CV',
    rfc: 'FPC140110KL6',
    montoSolicitado: 1200000,
    plazo: 18,
    tasaPropuesta: 19.0,
    score: 710,
    ingresoMensual: 680000,
    antiguedad: 10,
    sector: 'Salud',
    analista: 'María González',
    estado: 'en_revision',
    fechaSolicitud: '2026-05-23T16:00:00',
    notas: [
      { texto: 'Verificando estados financieros recientes', fecha: '2026-05-24T09:00:00', autor: 'María González' },
    ],
    historial: [
      { fecha: '2026-05-23T16:00:00', accion: 'Solicitud recibida', usuario: 'Sistema' },
      { fecha: '2026-05-23T17:00:00', accion: 'Asignada a analista', usuario: 'Sistema' },
      { fecha: '2026-05-24T09:00:00', accion: 'En revisión', usuario: 'María González' },
    ],
  },
  {
    id: 'SOL-2026-0035',
    empresa: 'Textiles Modernos SA de CV',
    rfc: 'TMO160825MN7',
    montoSolicitado: 950000,
    plazo: 12,
    tasaPropuesta: 21.0,
    score: 620,
    ingresoMensual: 520000,
    antiguedad: 4,
    sector: 'Manufactura',
    analista: null,
    estado: 'pendiente',
    fechaSolicitud: '2026-05-24T07:00:00',
    notas: [],
    historial: [
      { fecha: '2026-05-24T07:00:00', accion: 'Solicitud recibida', usuario: 'Sistema' },
    ],
  },
  {
    id: 'SOL-2026-0034',
    empresa: 'Consultores Estratégicos SA de CV',
    rfc: 'CES200415OP8',
    montoSolicitado: 600000,
    plazo: 12,
    tasaPropuesta: 15.0,
    score: 850,
    ingresoMensual: 950000,
    antiguedad: 4,
    sector: 'Consultoría',
    analista: 'Carlos Ruiz',
    estado: 'aprobado',
    fechaSolicitud: '2026-05-20T13:00:00',
    notas: [
      { texto: 'Excelente score, bajo riesgo', fecha: '2026-05-20T15:00:00', autor: 'Carlos Ruiz' },
      { texto: 'Aprobado rápidamente', fecha: '2026-05-20T16:00:00', autor: 'Carlos Ruiz' },
    ],
    historial: [
      { fecha: '2026-05-20T13:00:00', accion: 'Solicitud recibida', usuario: 'Sistema' },
      { fecha: '2026-05-20T14:00:00', accion: 'Asignada a analista', usuario: 'Sistema' },
      { fecha: '2026-05-20T15:00:00', accion: 'En revisión', usuario: 'Carlos Ruiz' },
      { fecha: '2026-05-20T16:00:00', accion: 'Aprobada', usuario: 'Carlos Ruiz' },
    ],
  },
  {
    id: 'SOL-2026-0033',
    empresa: 'Servicios Automotrices del Pacífico SA de CV',
    rfc: 'SAP130710QR9',
    montoSolicitado: 4100000,
    plazo: 36,
    tasaPropuesta: 19.5,
    score: 730,
    ingresoMensual: 1800000,
    antiguedad: 11,
    sector: 'Automotriz',
    analista: 'Ana López',
    estado: 'en_revision',
    fechaSolicitud: '2026-05-22T10:30:00',
    notas: [
      { texto: 'Monto alto, requiere revisión exhaustiva', fecha: '2026-05-22T14:00:00', autor: 'Ana López' },
    ],
    historial: [
      { fecha: '2026-05-22T10:30:00', accion: 'Solicitud recibida', usuario: 'Sistema' },
      { fecha: '2026-05-22T12:00:00', accion: 'Asignada a analista', usuario: 'Sistema' },
      { fecha: '2026-05-22T14:00:00', accion: 'En revisión', usuario: 'Ana López' },
    ],
  },
  {
    id: 'SOL-2026-0032',
    empresa: 'Energía Verde MX SA de CV',
    rfc: 'EVM210305ST0',
    montoSolicitado: 7500000,
    plazo: 48,
    tasaPropuesta: 16.5,
    score: 790,
    ingresoMensual: 3200000,
    antiguedad: 3,
    sector: 'Energía',
    analista: 'Carlos Ruiz',
    estado: 'rechazado',
    fechaSolicitud: '2026-05-19T09:15:00',
    notas: [
      { texto: 'Monto solicitado demasiado alto para antigüedad de la empresa', fecha: '2026-05-19T12:00:00', autor: 'Carlos Ruiz' },
      { texto: 'Rechazado — ratio monto/antigüedad fuera de política', fecha: '2026-05-19T15:00:00', autor: 'Carlos Ruiz' },
    ],
    historial: [
      { fecha: '2026-05-19T09:15:00', accion: 'Solicitud recibida', usuario: 'Sistema' },
      { fecha: '2026-05-19T10:00:00', accion: 'Asignada a analista', usuario: 'Sistema' },
      { fecha: '2026-05-19T12:00:00', accion: 'En revisión', usuario: 'Carlos Ruiz' },
      { fecha: '2026-05-19T15:00:00', accion: 'Rechazada', usuario: 'Carlos Ruiz' },
    ],
  },
];

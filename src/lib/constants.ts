import type { EstadoConfig, EstadoSolicitud } from './types';

export const ESTADOS: Record<EstadoSolicitud, EstadoConfig> = {
  pendiente: { label: 'Pendiente', color: '#F59E0B', bg: '#FEF3C7' },
  en_revision: { label: 'En revisión', color: '#3B82F6', bg: '#DBEAFE' },
  aprobado: { label: 'Aprobado', color: '#10B981', bg: '#D1FAE5' },
  rechazado: { label: 'Rechazado', color: '#EF4444', bg: '#FEE2E2' },
};

export const FILTRO_OPTIONS: { value: string; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'pendiente', label: 'Pendientes' },
  { value: 'en_revision', label: 'En revisión' },
  { value: 'aprobado', label: 'Aprobados' },
  { value: 'rechazado', label: 'Rechazados' },
];

export const ORDEN_OPTIONS: { value: string; label: string }[] = [
  { value: 'fecha_desc', label: 'Más recientes' },
  { value: 'fecha_asc', label: 'Más antiguas' },
  { value: 'monto_desc', label: 'Mayor monto' },
  { value: 'score_desc', label: 'Mayor score' },
];

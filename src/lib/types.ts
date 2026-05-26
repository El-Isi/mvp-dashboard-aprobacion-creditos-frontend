export interface Nota {
  texto: string;
  fecha: string;
  autor: string;
}

export interface HistorialEntry {
  fecha: string;
  accion: string;
  usuario: string;
}

export interface Solicitud {
  id: string;
  empresa: string;
  rfc: string;
  montoSolicitado: number;
  plazo: number;
  tasaPropuesta: number;
  score: number;
  ingresoMensual: number;
  antiguedad: number;
  sector: string;
  analista: string | null;
  estado: EstadoSolicitud;
  fechaSolicitud: string;
  notas: Nota[];
  historial: HistorialEntry[];
}

export type EstadoSolicitud = 'pendiente' | 'en_revision' | 'aprobado' | 'rechazado';

export interface EstadoConfig {
  label: string;
  color: string;
  bg: string;
}

export interface ToastState {
  msg: string;
  type: 'success' | 'error';
}

export interface DashboardStats {
  total: number;
  pendientes: number;
  revision: number;
  aprobados: number;
  rechazados: number;
  montoTotal: number;
}

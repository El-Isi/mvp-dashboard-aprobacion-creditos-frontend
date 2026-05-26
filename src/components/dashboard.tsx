'use client';

import { useState, useMemo, useCallback } from 'react';
import type { Solicitud, EstadoSolicitud, ToastState, DashboardStats } from '@/lib/types';
import { MOCK_DATA } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/formatters';
import DashboardHeader from './dashboard-header';
import StatCard from './stat-card';
import FiltersBar from './filters-bar';
import SolicitudesTable from './solicitudes-table';
import DetailPanel from './detail-panel';
import ToastNotification from './toast-notification';

export default function Dashboard() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>(MOCK_DATA);
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [ordenar, setOrdenar] = useState('fecha_desc');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);

  const showToast = useCallback((msg: string, type: 'success' | 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const handleAction = useCallback(
    (id: string, nuevoEstado: EstadoSolicitud, nota: string) => {
      setSolicitudes((prev) =>
        prev.map((s) => {
          if (s.id !== id) return s;
          const now = new Date().toISOString();
          const accion = nuevoEstado === 'aprobado' ? 'Aprobado' : 'Rechazado';
          const newHistorial = [
            ...s.historial,
            {
              fecha: now,
              accion: `${accion}${nota ? ` — ${nota}` : ''}`,
              usuario: 'Tú (Analista)',
            },
          ];
          const newNotas = nota
            ? [
                ...s.notas,
                { texto: nota, fecha: now, autor: 'Tú (Analista)' },
              ]
            : s.notas;
          return {
            ...s,
            estado: nuevoEstado,
            historial: newHistorial,
            notas: newNotas,
            analista: s.analista || 'Tú (Analista)',
          };
        })
      );
      showToast(
        `${id} ${nuevoEstado === 'aprobado' ? 'aprobada' : 'rechazada'} correctamente`,
        nuevoEstado === 'aprobado' ? 'success' : 'error'
      );
    },
    [showToast]
  );

  const filtered = useMemo(() => {
    let data = [...solicitudes];
    if (filtroEstado !== 'todos') {
      data = data.filter((s) => s.estado === filtroEstado);
    }
    if (busqueda.trim()) {
      const q = busqueda.toLowerCase();
      data = data.filter(
        (s) =>
          s.empresa.toLowerCase().includes(q) ||
          s.id.toLowerCase().includes(q) ||
          s.rfc.toLowerCase().includes(q)
      );
    }
    data.sort((a, b) => {
      switch (ordenar) {
        case 'fecha_asc':
          return (
            new Date(a.fechaSolicitud).getTime() -
            new Date(b.fechaSolicitud).getTime()
          );
        case 'monto_desc':
          return b.montoSolicitado - a.montoSolicitado;
        case 'score_desc':
          return b.score - a.score;
        case 'fecha_desc':
        default:
          return (
            new Date(b.fechaSolicitud).getTime() -
            new Date(a.fechaSolicitud).getTime()
          );
      }
    });
    return data;
  }, [solicitudes, filtroEstado, busqueda, ordenar]);

  const stats: DashboardStats = useMemo(() => {
    const total = solicitudes.length;
    const pendientes = solicitudes.filter((s) => s.estado === 'pendiente').length;
    const revision = solicitudes.filter((s) => s.estado === 'en_revision').length;
    const aprobados = solicitudes.filter((s) => s.estado === 'aprobado').length;
    const rechazados = solicitudes.filter((s) => s.estado === 'rechazado').length;
    const montoTotal = solicitudes.reduce(
      (acc, s) => acc + s.montoSolicitado,
      0
    );
    return { total, pendientes, revision, aprobados, rechazados, montoTotal };
  }, [solicitudes]);

  const selectedSol = selectedId
    ? solicitudes.find((s) => s.id === selectedId) || null
    : null;

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text font-sans">
      {/* Toast */}
      {toast && <ToastNotification toast={toast} />}

      {/* Header */}
      <DashboardHeader pendingCount={stats.pendientes + stats.revision} />

      {/* Main Content */}
      <div className="px-7 py-5 flex flex-col gap-[18px]">
        {/* KPIs */}
        <div className="flex gap-2.5 flex-wrap">
          <StatCard
            label="Total solicitudes"
            value={stats.total}
            sub={`Monto total: ${formatCurrency(stats.montoTotal)}`}
          />
          <StatCard
            label="Pendientes"
            value={stats.pendientes}
            accent="#F59E0B"
          />
          <StatCard
            label="En revisión"
            value={stats.revision}
            accent="#3B82F6"
          />
          <StatCard
            label="Aprobados"
            value={stats.aprobados}
            accent="#10B981"
            sub={`${stats.total > 0 ? ((stats.aprobados / stats.total) * 100).toFixed(0) : 0}% tasa aprobación`}
          />
          <StatCard
            label="Rechazados"
            value={stats.rechazados}
            accent="#EF4444"
          />
        </div>

        {/* Filters */}
        <FiltersBar
          busqueda={busqueda}
          onBusquedaChange={setBusqueda}
          filtroEstado={filtroEstado}
          onFiltroChange={setFiltroEstado}
          ordenar={ordenar}
          onOrdenarChange={setOrdenar}
        />

        {/* Table */}
        <SolicitudesTable
          filtered={filtered}
          total={solicitudes.length}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </div>

      {/* Detail Panel Overlay */}
      {selectedSol && (
        <>
          <div
            onClick={() => setSelectedId(null)}
            className="fixed inset-0 bg-black/40 z-[999]"
          />
          <DetailPanel
            sol={selectedSol}
            onClose={() => setSelectedId(null)}
            onAction={handleAction}
          />
        </>
      )}
    </div>
  );
}

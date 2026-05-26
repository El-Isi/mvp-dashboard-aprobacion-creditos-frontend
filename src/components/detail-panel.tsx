'use client';

import { useState, useEffect, useRef } from 'react';
import type { Solicitud, EstadoSolicitud } from '@/lib/types';
import { formatCurrency, formatDate, getScoreColor } from '@/lib/formatters';
import EstadoBadge from './estado-badge';
import ScoreBadge from './score-badge';
import HistorialTimeline from './historial-timeline';

interface DetailPanelProps {
  sol: Solicitud;
  onClose: () => void;
  onAction: (id: string, nuevoEstado: EstadoSolicitud, nota: string) => void;
}

export default function DetailPanel({ sol, onClose, onAction }: DetailPanelProps) {
  const [nota, setNota] = useState('');
  const [confirmAction, setConfirmAction] = useState<EstadoSolicitud | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNota('');
    setConfirmAction(null);
  }, [sol?.id]);

  const ratio = ((sol.montoSolicitado / sol.plazo) / sol.ingresoMensual * 100).toFixed(1);

  const detailFields: [string, string][] = [
    ['Monto', formatCurrency(sol.montoSolicitado)],
    ['Plazo', `${sol.plazo} meses`],
    ['Tasa', `${sol.tasaPropuesta}%`],
    ['Sector', sol.sector],
    ['RFC', sol.rfc],
    ['Antigüedad', `${sol.antiguedad} años`],
    ['Ingreso mensual', formatCurrency(sol.ingresoMensual)],
    ['Ratio pago/ingreso', `${ratio}%`],
  ];

  return (
    <div
      ref={panelRef}
      className="fixed top-0 right-0 bottom-0 w-[min(480px,95vw)] bg-dark-panel border-l border-dark-border z-[1000] flex flex-col shadow-[-8px_0_32px_rgba(0,0,0,0.15)] animate-slideIn"
    >
      {/* Header */}
      <div className="px-5 py-4 border-b border-dark-border flex items-center justify-between flex-shrink-0">
        <div>
          <div className="text-[11px] text-dark-muted font-semibold tracking-[0.8px]">
            {sol.id}
          </div>
          <div className="text-base font-bold text-dark-text mt-0.5">
            {sol.empresa}
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 border border-dark-border rounded-md bg-dark-card cursor-pointer flex items-center justify-center text-base text-dark-muted hover:text-dark-text transition-colors"
        >
          ✕
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-5 flex flex-col gap-5">
        {/* Estado + Fecha */}
        <div className="flex gap-2 flex-wrap items-center">
          <EstadoBadge estado={sol.estado} />
          <span className="text-[11px] text-dark-muted">
            Recibida {formatDate(sol.fechaSolicitud)}
          </span>
        </div>

        {/* Detail Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {detailFields.map(([label, value]) => (
            <div
              key={label}
              className="px-3 py-2 bg-dark-row-hover rounded-md"
            >
              <div className="text-[10px] text-dark-muted font-semibold uppercase tracking-[0.5px]">
                {label}
              </div>
              <div className="text-[13px] font-semibold text-dark-text mt-0.5">
                {value}
              </div>
            </div>
          ))}
        </div>

        {/* Score */}
        <div>
          <div className="text-[11px] font-semibold text-dark-muted uppercase tracking-[0.8px] mb-1">
            Score crediticio
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex-1 h-1.5 bg-dark-border rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-[width] duration-500 ease-out"
                style={{
                  width: `${(sol.score / 850) * 100}%`,
                  background: getScoreColor(sol.score),
                }}
              />
            </div>
            <ScoreBadge score={sol.score} />
          </div>
        </div>

        {/* Notas */}
        {sol.notas.length > 0 && (
          <div>
            <div className="text-[11px] font-semibold text-dark-muted uppercase tracking-[0.8px] mb-2">
              Notas
            </div>
            {sol.notas.map((n, i) => (
              <div
                key={i}
                className="px-3 py-2.5 bg-dark-row-hover rounded-md mb-1.5 border-l-[3px] border-accent-indigo"
              >
                <div className="text-[12.5px] text-dark-text leading-[1.4]">
                  {n.texto}
                </div>
                <div className="text-[10px] text-dark-muted mt-1">
                  {n.autor} · {formatDate(n.fecha)}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Historial */}
        <div>
          <div className="text-[11px] font-semibold text-dark-muted uppercase tracking-[0.8px] mb-2">
            Historial
          </div>
          <HistorialTimeline historial={sol.historial} />
        </div>
      </div>

      {/* Actions */}
      {(sol.estado === 'pendiente' || sol.estado === 'en_revision') && (
        <div className="px-5 py-4 border-t border-dark-border flex-shrink-0 flex flex-col gap-2.5">
          <textarea
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            placeholder="Agregar nota o justificación..."
            rows={2}
            className="w-full px-2.5 py-2 rounded-md border border-dark-border bg-dark-card text-dark-text text-[12.5px] resize-none font-sans outline-none focus:border-accent-indigo transition-colors"
          />
          {!confirmAction ? (
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmAction('aprobado')}
                className="flex-1 py-2.5 rounded-md border-none bg-status-green text-white font-bold text-[13px] cursor-pointer tracking-[0.3px] hover:brightness-110 transition-all"
              >
                ✓ Aprobar
              </button>
              <button
                onClick={() => setConfirmAction('rechazado')}
                className="flex-1 py-2.5 rounded-md border-none bg-status-red text-white font-bold text-[13px] cursor-pointer tracking-[0.3px] hover:brightness-110 transition-all"
              >
                ✗ Rechazar
              </button>
            </div>
          ) : (
            <div
              className="flex flex-col gap-2 p-3 rounded-lg border"
              style={{
                background: confirmAction === 'aprobado' ? '#D1FAE5' : '#FEE2E2',
                borderColor: confirmAction === 'aprobado' ? '#10B981' : '#EF4444',
              }}
            >
              <span
                className="text-[12.5px] font-semibold"
                style={{
                  color: confirmAction === 'aprobado' ? '#065F46' : '#991B1B',
                }}
              >
                ¿Confirmar{' '}
                {confirmAction === 'aprobado' ? 'aprobación' : 'rechazo'} de{' '}
                {sol.id}?
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    onAction(sol.id, confirmAction, nota);
                    setConfirmAction(null);
                    setNota('');
                  }}
                  className="flex-1 py-2 rounded-md border-none text-white font-bold text-xs cursor-pointer hover:brightness-110 transition-all"
                  style={{
                    background:
                      confirmAction === 'aprobado' ? '#10B981' : '#EF4444',
                  }}
                >
                  Confirmar
                </button>
                <button
                  onClick={() => setConfirmAction(null)}
                  className="flex-1 py-2 rounded-md border border-dark-border bg-dark-card text-dark-text font-semibold text-xs cursor-pointer hover:bg-dark-row-hover transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

'use client';

import type { Solicitud } from '@/lib/types';
import { formatCurrency, formatShortDate } from '@/lib/formatters';
import ScoreBadge from './score-badge';
import EstadoBadge from './estado-badge';

interface SolicitudesTableProps {
  filtered: Solicitud[];
  total: number;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const TABLE_HEADERS = ['ID', 'Empresa', 'Monto', 'Plazo', 'Score', 'Sector', 'Estado', 'Fecha', ''];

export default function SolicitudesTable({
  filtered,
  total,
  selectedId,
  onSelect,
}: SolicitudesTableProps) {
  return (
    <div className="bg-dark-card rounded-[10px] border border-dark-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[900px]">
          <thead>
            <tr className="border-b border-dark-border">
              {TABLE_HEADERS.map((h) => (
                <th
                  key={h}
                  className="px-3.5 py-2.5 text-left text-[10px] font-bold text-dark-muted uppercase tracking-[1px] whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={9}
                  className="px-10 py-10 text-center text-dark-muted text-[13px]"
                >
                  No se encontraron solicitudes con estos filtros
                </td>
              </tr>
            )}
            {filtered.map((s) => (
              <tr
                key={s.id}
                onClick={() => onSelect(s.id)}
                className={`border-b border-dark-border cursor-pointer transition-colors duration-[120ms] ${
                  selectedId === s.id
                    ? 'bg-accent-glow'
                    : 'hover:bg-dark-row-hover'
                }`}
              >
                <td className="px-3.5 py-2.5 text-xs font-mono text-accent-indigo font-medium">
                  {s.id}
                </td>
                <td className="px-3.5 py-2.5">
                  <div className="text-[13px] font-semibold text-dark-text">
                    {s.empresa}
                  </div>
                  <div className="text-[11px] text-dark-muted">{s.rfc}</div>
                </td>
                <td className="px-3.5 py-2.5 text-[13px] font-semibold tabular-nums text-dark-text">
                  {formatCurrency(s.montoSolicitado)}
                </td>
                <td className="px-3.5 py-2.5 text-xs text-dark-muted">
                  {s.plazo}m
                </td>
                <td className="px-3.5 py-2.5">
                  <ScoreBadge score={s.score} />
                </td>
                <td className="px-3.5 py-2.5 text-xs text-dark-muted">
                  {s.sector}
                </td>
                <td className="px-3.5 py-2.5">
                  <EstadoBadge estado={s.estado} />
                </td>
                <td className="px-3.5 py-2.5 text-xs text-dark-muted whitespace-nowrap">
                  {formatShortDate(s.fechaSolicitud)}
                </td>
                <td className="px-3.5 py-2.5">
                  <span className="text-base text-dark-muted">›</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-3.5 py-2.5 border-t border-dark-border text-[11px] text-dark-muted">
        Mostrando {filtered.length} de {total} solicitudes
      </div>
    </div>
  );
}

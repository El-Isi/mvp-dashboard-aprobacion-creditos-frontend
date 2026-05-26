'use client';

import { FILTRO_OPTIONS, ORDEN_OPTIONS } from '@/lib/constants';

interface FiltersBarProps {
  busqueda: string;
  onBusquedaChange: (value: string) => void;
  filtroEstado: string;
  onFiltroChange: (value: string) => void;
  ordenar: string;
  onOrdenarChange: (value: string) => void;
}

export default function FiltersBar({
  busqueda,
  onBusquedaChange,
  filtroEstado,
  onFiltroChange,
  ordenar,
  onOrdenarChange,
}: FiltersBarProps) {
  return (
    <div className="flex gap-2.5 flex-wrap items-center">
      <input
        value={busqueda}
        onChange={(e) => onBusquedaChange(e.target.value)}
        placeholder="Buscar empresa, ID o RFC..."
        className="flex-[1_1_220px] px-3.5 py-[9px] rounded-lg border border-dark-border bg-dark-card text-dark-text text-[13px] outline-none font-sans focus:border-accent-indigo transition-colors"
      />
      <div className="flex gap-1 flex-wrap">
        {FILTRO_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onFiltroChange(opt.value)}
            className={`px-3.5 py-[7px] rounded-md border text-xs font-semibold cursor-pointer font-sans transition-all duration-150 ${
              filtroEstado === opt.value
                ? 'border-accent-indigo bg-accent-glow text-accent-indigo'
                : 'border-dark-border bg-transparent text-dark-muted hover:text-dark-text hover:border-dark-muted'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <select
        value={ordenar}
        onChange={(e) => onOrdenarChange(e.target.value)}
        className="px-3 py-2 rounded-lg border border-dark-border bg-dark-card text-dark-text text-xs font-sans cursor-pointer outline-none focus:border-accent-indigo transition-colors"
      >
        {ORDEN_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

import { ESTADOS } from '@/lib/constants';
import type { EstadoSolicitud } from '@/lib/types';

interface EstadoBadgeProps {
  estado: EstadoSolicitud;
}

export default function EstadoBadge({ estado }: EstadoBadgeProps) {
  const config = ESTADOS[estado];

  return (
    <span
      className="inline-flex items-center gap-[5px] px-2.5 py-[3px] rounded-full text-[11px] font-semibold uppercase tracking-wide"
      style={{ color: config.color, background: config.bg }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: config.color }}
      />
      {config.label}
    </span>
  );
}

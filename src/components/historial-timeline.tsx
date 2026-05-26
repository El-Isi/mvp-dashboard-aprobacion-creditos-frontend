import { formatDate } from '@/lib/formatters';
import type { HistorialEntry } from '@/lib/types';

interface HistorialTimelineProps {
  historial: HistorialEntry[];
}

export default function HistorialTimeline({ historial }: HistorialTimelineProps) {
  return (
    <div className="flex flex-col">
      {historial.map((h, i) => (
        <div
          key={i}
          className="flex gap-3 relative"
          style={{ paddingBottom: i < historial.length - 1 ? 16 : 0 }}
        >
          <div className="flex flex-col items-center w-4 flex-shrink-0">
            <div
              className="w-2.5 h-2.5 rounded-full border-2 border-accent-indigo flex-shrink-0 mt-[3px]"
              style={{
                background:
                  i === historial.length - 1 ? '#6366F1' : '#181B25',
              }}
            />
            {i < historial.length - 1 && (
              <div className="w-[1.5px] flex-1 bg-dark-border mt-0.5" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12.5px] font-medium text-dark-text leading-[1.3]">
              {h.accion}
            </div>
            <div className="text-[11px] text-dark-muted mt-0.5">
              {h.usuario} · {formatDate(h.fecha)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

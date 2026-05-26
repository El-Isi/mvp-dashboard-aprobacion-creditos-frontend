interface DashboardHeaderProps {
  pendingCount: number;
}

export default function DashboardHeader({ pendingCount }: DashboardHeaderProps) {
  return (
    <header className="px-7 py-4 border-b border-dark-border flex items-center justify-between bg-dark-card">
      <div className="flex items-center gap-3">
        <div className="w-[34px] h-[34px] rounded-lg bg-gradient-to-br from-accent-indigo to-purple-500 flex items-center justify-center text-base font-bold text-white">
          K
        </div>
        <div>
          <div className="text-[15px] font-bold text-dark-text leading-[1.2]">
            Dashboard de Aprobación
          </div>
          <div className="text-[11px] text-dark-muted">
            Créditos · Konfío TSO
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-status-green shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
        <span className="text-[11px] text-dark-muted">
          {pendingCount} por resolver
        </span>
      </div>
    </header>
  );
}

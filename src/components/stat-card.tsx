interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
}

export default function StatCard({ label, value, sub, accent }: StatCardProps) {
  return (
    <div className="flex-1 min-w-[150px] bg-dark-card rounded-[10px] px-5 py-4 border border-dark-border flex flex-col gap-1">
      <span className="text-[11px] font-semibold text-dark-muted uppercase tracking-[1px]">
        {label}
      </span>
      <span
        className="text-[28px] font-bold tabular-nums leading-[1.1]"
        style={{ color: accent || '#E8E9ED' }}
      >
        {value}
      </span>
      {sub && (
        <span className="text-[11px] text-dark-muted">{sub}</span>
      )}
    </div>
  );
}

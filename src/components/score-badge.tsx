import { getScoreColor, getScoreLabel } from '@/lib/formatters';

interface ScoreBadgeProps {
  score: number;
}

export default function ScoreBadge({ score }: ScoreBadgeProps) {
  const color = getScoreColor(score);
  const label = getScoreLabel(score);

  return (
    <div className="flex items-center gap-1.5">
      <div
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ background: color }}
      />
      <span className="tabular-nums font-semibold text-dark-text text-[13px]">
        {score}
      </span>
      <span
        className="text-[11px] font-medium"
        style={{ color }}
      >
        {label}
      </span>
    </div>
  );
}

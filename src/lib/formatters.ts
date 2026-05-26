export function formatCurrency(n: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatDate(d: string): string {
  return new Date(d).toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatShortDate(d: string): string {
  return new Date(d).toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'short',
  });
}

export function getScoreColor(score: number): string {
  if (score >= 750) return '#10B981';
  if (score >= 650) return '#F59E0B';
  return '#EF4444';
}

export function getScoreLabel(score: number): string {
  if (score >= 750) return 'Excelente';
  if (score >= 650) return 'Regular';
  return 'Bajo';
}

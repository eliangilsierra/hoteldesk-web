// Currency formatting utilities for COP (Colombian Peso)

export function formatCOP(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function parseCOP(formatted: string): number {
  // Remove currency symbols and parse
  const cleaned = formatted.replace(/[^\d]/g, '');
  return parseInt(cleaned, 10) || 0;
}

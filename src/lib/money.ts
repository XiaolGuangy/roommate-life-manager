export function splitExpense(amountCents: number, participantIds: string[]): Record<string, number> {
  if (!participantIds.length) return {};
  const base = Math.floor(amountCents / participantIds.length);
  const remainder = amountCents % participantIds.length;
  return Object.fromEntries(participantIds.map((id, index) => [id, base + (index < remainder ? 1 : 0)]));
}

export function formatCents(cents: number) {
  return new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY', minimumFractionDigits: 2 }).format(cents / 100);
}

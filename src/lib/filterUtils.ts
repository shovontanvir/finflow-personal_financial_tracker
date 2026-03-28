import type { Transaction } from "@/types/transaction";

/**
 * Filters transactions by description (case-insensitive).
 * If query is empty, returns original list.
 */
export const searchByDescription = (
  transactions: Transaction[],
  query: string,
): Transaction[] => {
  const q = query.trim().toLowerCase();
  if (!q) return transactions;

  return transactions.filter((tx) => tx.description.toLowerCase().includes(q));
};

export const filterByCategory = (
  transactions: Transaction[],
  category: string,
): Transaction[] => {
  if (!category) return transactions;
  return transactions.filter((tx) => tx.category === category);
};

export const filterByStatus = (
  transactions: Transaction[],
  status: string,
): Transaction[] => {
  if (!status) return transactions;
  return transactions.filter((tx) => tx.status === status);
};

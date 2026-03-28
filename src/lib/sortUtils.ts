import type { Transaction } from "@/types/transaction";

export const sortByDateAsc = (transactions: Transaction[]) => {
  return transactions.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
};

export const sortByAmountAsc = (transactions: Transaction[]) => {
  return transactions.sort((a, b) => a.amount - b.amount);
};

import type { Transaction } from "@/types/transaction";

export const calculateTotals = (transactions: Transaction[]) => {
  return transactions.reduce(
    (acc, tx) => {
      if (tx.type === "income") {
        acc.income += tx.amount;
        acc.balance += tx.amount;
      } else {
        acc.expenses += tx.amount;
        acc.balance -= tx.amount;
      }
      return acc;
    },
    { balance: 0, income: 0, expenses: 0 },
  );
};

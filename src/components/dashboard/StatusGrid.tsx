import { Wallet, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { StatCardItem } from "./StatCardItem";

interface StatsGridProps {
  totals: {
    balance: number;
    income: number;
    expenses: number;
  };
}

export const StatsGrid = ({ totals }: StatsGridProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-3 my-5">
      <StatCardItem
        title="Total Balance"
        amount={totals.balance}
        icon={Wallet}
        colorClass="text-slate-900 dark:text-slate-100"
      />
      <StatCardItem
        title="Total Income"
        amount={totals.income}
        icon={ArrowUpCircle}
        colorClass="text-emerald-600 dark:text-emerald-400"
      />
      <StatCardItem
        title="Total Expenses"
        amount={totals.expenses}
        icon={ArrowDownCircle}
        colorClass="text-rose-600 dark:text-rose-400"
      />
    </div>
  );
};

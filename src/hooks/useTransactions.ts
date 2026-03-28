import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiMethods } from "@/services/api";
import { calculateTotals } from "@/lib/transactionUtils";

export const useTransactions = () => {
  // 1. Fetch data from our "Server" (LocalStorage)
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => apiMethods.get(),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // 2. Compute Totals (balance, income, expenses) for dashboard (Derived State)
  const { totals } = useMemo(() => {
    const transactions = data?.data || [];

    // Calculate Dashboard Totals
    const totals = calculateTotals(transactions);

    return { totals };
  }, [data]);

  // 3. calculate category based expense for dashboard (Derived State)
  const categoryData = useMemo(() => {
    const transactions = data?.data || [];

    const categoryMap = transactions.reduce(
      (acc, tx) => {
        // Filter and accumulate in one go
        if (tx.type === "expense") {
          acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
        }
        return acc;
      },
      {} as Record<string, number>,
    );

    return Object.entries(categoryMap).map(([name, value]) => ({
      name,
      value,
    }));
  }, [data]);

  return {
    transactions: data?.data || [],
    totals,
    isLoading,
    isError,
    refetch,
    categoryData,
  };
};

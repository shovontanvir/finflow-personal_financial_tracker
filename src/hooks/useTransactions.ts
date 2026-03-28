import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiMethods } from "@/services/api";
import { calculateTotals } from "@/lib/transactionUtils";
import { useFilterAndPaginationStore } from "@/store/useFilterAndPaginationStore";
import { sortByAmountAsc, sortByDateAsc } from "@/lib/sortUtils";
import {
  filterByCategory,
  filterByStatus,
  searchByDescription,
} from "@/lib/filterUtils";

export const useTransactions = () => {
  const {
    page,
    pageSize,
    setIsPaginated,
    setLastPage,
    sortBy,
    sortOrder,
    searchString,
    filterCategory,
    filterStatus,
  } = useFilterAndPaginationStore();
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

  // 4. Return monthwise transactions for dashboard (Derived State)
  const monthlyData = useMemo(() => {
    const transactions = data?.data || [];
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      return d.toLocaleString("en-US", { month: "short" });
    }).reverse(); // ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"]

    // Initialize the map with 0s so every month exists
    const stats = last6Months.reduce(
      (acc, month) => {
        acc[month] = { month, income: 0, expense: 0 };
        return acc;
      },
      {} as Record<string, { month: string; income: number; expense: number }>,
    );

    // Single-pass reduction
    transactions.forEach((tx) => {
      const month = new Date(tx.date).toLocaleString("en-US", {
        month: "short",
      });
      if (stats[month]) {
        if (tx.type === "income") stats[month].income += tx.amount;
        else stats[month].expense += tx.amount;
      }
    });

    return Object.values(stats);
  }, [data]);

  //   5. Sort transactions based on sortBy and sortOrder (Derived State)
  const sortedTransactions = useMemo(() => {
    const transactions = [...(data?.data || [])];
    if (!sortBy) return transactions;

    switch (sortBy) {
      case "date":
        return sortOrder === "asc"
          ? sortByDateAsc(transactions)
          : sortByDateAsc(transactions).reverse();
      case "amount":
        return sortOrder === "asc"
          ? sortByAmountAsc(transactions)
          : sortByAmountAsc(transactions).reverse();
      default:
        return transactions;
    }
  }, [data, sortBy, sortOrder]);

  //   7. filtered transactions based on search and filters (Derived State)
  const filteredTransactions = useMemo(() => {
    const transactions = sortedTransactions;
    // Apply search by description
    const searchedByDescriptionList = searchByDescription(
      transactions,
      searchString,
    );

    // apply filter by categrory
    const filteredByCategoryList = filterByCategory(
      searchedByDescriptionList,
      filterCategory,
    );

    // apply filter by status
    const filteredByStatusList = filterByStatus(
      filteredByCategoryList,
      filterStatus,
    );

    // Finally return the sorted and filtered list
    return filteredByStatusList;
  }, [sortedTransactions, searchString, filterCategory, filterStatus]);

  // 7. paginated transactions (Derived State)
  const paginatedTransactions = useMemo(() => {
    const transactions = filteredTransactions;
    const startIndex = (page - 1) * pageSize;

    setLastPage(Math.ceil((transactions.length || 0) / pageSize));
    setIsPaginated((transactions.length || 0) > pageSize);

    return transactions.slice(startIndex, startIndex + pageSize);
  }, [filteredTransactions, page, pageSize, setIsPaginated, setLastPage]);

  return {
    transactions: paginatedTransactions,
    totals,
    isLoading,
    isError,
    refetch,
    categoryData,
    monthlyData,
  };
};

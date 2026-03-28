import Header from "./components/Header";
import { useTransactions } from "./hooks/useTransactions";
import { StatsGrid } from "./components/dashboard/StatusGrid";
import { CategoryChart } from "./components/dashboard/CategoryChart";
import { MonthlyComparisonChart } from "./components/dashboard/MonthlyComparisonChart";
import { TransactionTable } from "./components/dashboard/TransactionTable";

const App = () => {
  const {
    transactions,
    totals,
    isLoading,
    isError,
    categoryData,
    monthlyData,
  } = useTransactions();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading transactions.</div>;
  }

  console.log({ transactions, monthlyData });

  return (
    <main>
      <Header />
      <div className="container">
        {/* Dashboard Stats */}
        <StatsGrid totals={totals} />

        <div className="grid gap-4 md:grid-cols-2 my-5">
          {/* Category Chart */}
          <CategoryChart categoryData={categoryData} />

          {/* Monthly Comparison Chart */}
          <MonthlyComparisonChart monthlyData={monthlyData} />
        </div>

        <div className="my-5">
          <h1 className="text-sm font-medium text-muted-foreground mb-4">
            Transaction Lists
          </h1>
          <TransactionTable transactions={transactions} />
        </div>
      </div>
    </main>
  );
};

export default App;

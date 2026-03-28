import Header from "./components/Header";
import { useTransactions } from "./hooks/useTransactions";
import { StatsGrid } from "./components/dashboard/StatusGrid";
import { CategoryChart } from "./components/dashboard/CategoryChart";
import { MonthlyComparisonChart } from "./components/dashboard/MonthlyComparisonChart";
import { TransactionTable } from "./components/dashboard/TransactionTable";
import PageSizeSelector from "./components/dashboard/PageSizeSelector";
import FilterAndSearchComponent from "./components/dashboard/FilterAndSearchComponent";

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
          <div className="w-full flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">
              Transaction Lists
            </h3>

            <div className="flex items-center gap-4">
              <PageSizeSelector />
            </div>
          </div>
          <div className="my-5">
            <FilterAndSearchComponent />
          </div>
          <TransactionTable transactions={transactions} />
        </div>
      </div>
    </main>
  );
};

export default App;

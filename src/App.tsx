import Header from "./components/Header";
import { useTransactions } from "./hooks/useTransactions";
import { StatsGrid } from "./components/dashboard/StatusGrid";
import { CategoryChart } from "./components/dashboard/CategoryChart";

const App = () => {
  const { transactions, totals, isLoading, isError, categoryData } =
    useTransactions();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading transactions.</div>;
  }

  console.log({ transactions, categoryData });

  return (
    <main>
      <Header />
      <div className="container">
        {/* Dashboard Stats */}
        <StatsGrid totals={totals} />

        <div className="grid gap-4 md:grid-cols-2">
          {/* Category Chart */}
          <CategoryChart categoryData={categoryData} />
        </div>
      </div>
    </main>
  );
};

export default App;

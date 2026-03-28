import { Button } from "./components/ui/button";
import Header from "./components/Header";
import { useTransactions } from "./hooks/useTransactions";

const App = () => {
  const { transactions, totals, isLoading, isError } = useTransactions();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading transactions.</div>;
  }

  console.log({ transactions, totals });

  return (
    <main>
      <Header />
      <h1 className="text-5xl">
        Finflow - your personal financial tracking application
      </h1>
      <Button className="mt-4" variant="outline">
        Get Started
      </Button>
    </main>
  );
};

export default App;

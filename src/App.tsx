import { useQuery } from "@tanstack/react-query";
import { Button } from "./components/ui/button";
import { apiMethods } from "./services/api";
import Header from "./components/Header";

const App = () => {
  const { data } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => apiMethods.get(),
  });

  console.log(data);

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

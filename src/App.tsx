import { Button } from "./components/ui/button";

const App = () => {
  return (
    <main>
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

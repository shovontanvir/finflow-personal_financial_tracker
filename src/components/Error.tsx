import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";

const Error = () => {
  const queryClient = useQueryClient();

  const handleRetry = () => {
    queryClient.invalidateQueries({ queryKey: ["transactions"] });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center gap-4 text-center">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Oops! Something went wrong
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            There was an error loading the data. Please try again.
          </p>
        </div>
        <Button onClick={handleRetry} variant="default">
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default Error;

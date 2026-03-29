import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Moon, SquarePlus, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { TransactionFormWrapper } from "./TransactionFormWrapper";
import { useAddTransaction } from "@/hooks/useAddTransaction";
import { useCallback, useState } from "react";
import type { TransactionFormValues } from "@/lib/validations/transactions";

export default function Header() {
  const { setTheme, theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [shouldReset, setShouldReset] = useState(false);

  const toggleTheme = () =>
    theme === "dark" ? setTheme("light") : setTheme("dark");

  // Pass the close/reset function (captured from wrapper) to the hook
  const { mutate } = useAddTransaction(() => {
    setOpen(false);
    setShouldReset(true);
  });

  const handleSubmit = useCallback(
    (data: TransactionFormValues & { id?: string }) => {
      mutate(data);
    },
    [mutate],
  );

  return (
    <header className="border-b bg-white dark:bg-gray-900 sticky top-0 z-50">
      <div className="container h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
          <Logo className="w-8 h-8" />
          <span className="text-xl font-bold">
            Fin<span className="text-emerald-600">Flow</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>

          <TransactionFormWrapper
            onSubmit={handleSubmit}
            shouldReset={shouldReset}
            open={open}
            onOpenChange={() => setOpen(!open)}
            onResetComplete={() => setShouldReset(false)}
          >
            <Button variant="outline">
              <SquarePlus />{" "}
              <span className="hidden md:inline-block">Add Transaction</span>
            </Button>
          </TransactionFormWrapper>
        </div>
      </div>
    </header>
  );
}

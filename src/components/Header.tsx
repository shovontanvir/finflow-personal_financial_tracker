import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { AddTransactionForm } from "./AddTransactionForm";

export default function Header() {
  const { setTheme, theme } = useTheme();
  const toggleTheme = () =>
    theme === "dark" ? setTheme("light") : setTheme("dark");

  return (
    <header className="border-b bg-white dark:bg-gray-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
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

          <AddTransactionForm />
        </div>
      </div>
    </header>
  );
}

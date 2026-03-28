import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="border-b bg-white dark:bg-gray-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-900">
          <Logo className="w-8 h-8" />
          <span className="text-xl font-bold">
            Fin<span className="text-emerald-600">Flow</span>
          </span>
        </div>

        <Button>+ Add Transaction</Button>
      </div>
    </header>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  amount: number;
  icon: LucideIcon;
  // Use a string for custom tailwind classes (e.g., "text-green-600")
  colorClass?: string;
  // Optional: show trend or percentage if you expand later
  description?: string;
}

export const StatCardItem = ({
  title,
  amount,
  icon: Icon,
  colorClass,
  description,
}: StatCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={cn("h-4 w-4", colorClass)} />
      </CardHeader>
      <CardContent>
        <div className={cn("text-2xl font-bold", colorClass)}>
          {/* Formats number to currency style (e.g., BDT 1,200.00) */}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "BDT",
          }).format(amount)}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

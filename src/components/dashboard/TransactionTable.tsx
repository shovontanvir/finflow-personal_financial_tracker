import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import type { Transaction } from "@/types/transaction";
import { formatCurrency } from "@/lib/formatters";
import { PaginationComponent } from "./PaginationComponent";

export function TransactionTable({
  transactions,
}: {
  transactions: Transaction[];
}) {
  return (
    <>
      <div className="rounded-md border bg-card px-5">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-30">Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length > 0 ? (
              transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="text-muted-foreground">
                    {format(new Date(tx.date), "MMM dd, yyyy")}
                  </TableCell>
                  <TableCell className="font-medium">
                    {tx.description}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="capitalize font-normal"
                    >
                      {tx.category}
                    </Badge>
                  </TableCell>
                  <TableCell
                    className={`text-right font-semibold ${
                      tx.type === "income"
                        ? "text-emerald-600"
                        : "text-rose-600"
                    }`}
                  >
                    {tx.type === "income" ? "+" : "-"}{" "}
                    {formatCurrency(tx.amount)}
                  </TableCell>
                  <TableCell className="text-right">
                    <StatusBadge status={tx.status} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-muted-foreground"
                >
                  No matching transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* pagination */}
      <PaginationComponent />
    </>
  );
}

// Internal helper for status colors
function StatusBadge({ status }: { status: string }) {
  const variants: Record<string, string> = {
    completed: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    pending: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    failed: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  };

  return (
    <Badge variant="outline" className={`capitalize ${variants[status]}`}>
      {status}
    </Badge>
  );
}

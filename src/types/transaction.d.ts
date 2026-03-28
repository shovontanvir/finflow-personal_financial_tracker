/**
 * Strict union types for Category and Status as per the Technical Brief.
 * Using unions ensures we get autocomplete and error highlighting
 * throughout the app.
 */
export type TransactionCategory =
  | "Food"
  | "Transport"
  | "Utilities"
  | "Entertainment"
  | "Health"
  | "Shopping"
  | "Income"
  | "Other";

export type TransactionStatus = "completed" | "pending" | "failed";

export type TransactionType = "income" | "expense";

/**
 * The core Transaction interface.
 * Matches the provided Mock Data Schema exactly.
 */
export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  date: string; // ISO string format (YYYY-MM-DD)
  status: TransactionStatus;
}

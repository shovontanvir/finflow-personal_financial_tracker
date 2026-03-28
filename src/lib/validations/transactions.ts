import { z } from "zod";

export const transactionSchema = z.object({
  description: z
    .string()
    .min(1, "Description is required")
    .min(3, "Too short")
    .max(50, "Too long"),

  // Use coerce to handle the string-to-number conversion from inputs
  amount: z.number().min(1, "Amount must be greater than 0"),

  // For Dates, just use z.coerce.date() and let the form handle the empty state
  date: z.date(),

  category: z.enum([
    "Food",
    "Transport",
    "Utilities",
    "Entertainment",
    "Health",
    "Shopping",
    "Income",
    "Other",
  ]),

  type: z.enum(["income", "expense"]),

  status: z.enum(["completed", "pending", "failed"]),
});

export type TransactionFormValues = z.infer<typeof transactionSchema>;

import { z } from "zod";

export const transactionSchema = z.object({
  description: z
    .string()
    .min(1, "Description is required")
    .min(3, "Too short")
    .max(50, "Too long"),

  // Use coerce to handle the string-to-number conversion from inputs
  amount: z.number().min(1, "Amount must be greater than 0"),

  // For Dates, accept string in yyyy-mm-dd format
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in yyyy-mm-dd format")
    .refine((dateString) => {
      const date = new Date(dateString);
      const today = new Date(new Date().toISOString().split("T")[0]);
      return date <= today;
    }, "Date cannot be in the future"),

  category: z.enum([
    "Food",
    "Transport",
    "Utilities",
    "Entertainment",
    "Health",
    "Shopping",
    "Income",
    "Other",
    "",
  ]),

  type: z.enum(["income", "expense", ""]),

  status: z.enum(["completed", "pending", "failed", ""]),
});

export type TransactionFormValues = z.infer<typeof transactionSchema>;

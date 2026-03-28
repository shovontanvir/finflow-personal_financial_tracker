/**
 * Formats a numeric value into Bangladeshi Taka (৳)
 * using the proper locale for the symbol.
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Formats a date string into a readable format (e.g., Mar 28, 2026)
 * Useful for keeping table dates consistent.
 */
export const formatDate = (date: string | Date): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(d);
};

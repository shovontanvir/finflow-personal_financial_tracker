import type { ApiResponse } from "./../types/api.d";
import type { TransactionFormValues } from "@/lib/validations/transactions";
import { apiMethods } from "@/services/api";
import type { Transaction } from "@/types/transaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddTransaction = (onSuccess: () => void) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (transaction: TransactionFormValues) =>
      apiMethods.post(transaction),
    onSuccess: (data: ApiResponse<Transaction>) => {
      toast.success(data?.message, {
        style: {
          background: "#10b981",
          color: "#ffffff",
          border: "1px solid #059669",
        },
      });
      onSuccess();
      // Invalidate and refetch transactions after adding a new one
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (err: ApiResponse<Transaction>) => {
      toast.error(err.message, {
        style: {
          background: "#ef4444",
          color: "#ffffff",
          border: "1px solid #dc2626",
        },
      });
    },
  });

  return { mutate };
};

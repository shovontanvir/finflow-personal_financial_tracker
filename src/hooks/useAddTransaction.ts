import type { ApiResponse } from "./../types/api.d";
import type { TransactionFormValues } from "@/lib/validations/transactions";
import { apiMethods } from "@/services/api";
import type { Transaction } from "@/types/transaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddTransaction = (
  onSuccess: (data: ApiResponse<Transaction>) => void,
  onError: (err: ApiResponse<Transaction>) => void,
) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (transaction: TransactionFormValues) =>
      apiMethods.post(transaction),
    onSuccess: (data: ApiResponse<Transaction>) => {
      // Invalidate and refetch transactions after adding a new one
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      console.log(data);

      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (err: ApiResponse<Transaction>) => {
      console.log(err);

      if (onError) {
        onError(err);
      }
    },
  });

  return { mutate };
};

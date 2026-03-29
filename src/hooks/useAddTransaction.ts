import type { TransactionFormValues } from "@/lib/validations/transactions";
import { apiMethods } from "@/services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddTransaction = (
  onSuccess: (data: unknown) => void,
  onError: (err: unknown) => void,
) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (transaction: TransactionFormValues) =>
      apiMethods.post(transaction),
    onSuccess: (data: unknown) => {
      // Invalidate and refetch transactions after adding a new one
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      console.log(data);

      if (onSuccess) {
        onSuccess(data);
      }
    },
    onError: (err: unknown) => {
      console.log(err);

      if (onError) {
        onError(err);
      }
    },
  });

  return { mutate };
};

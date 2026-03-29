import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  transactionSchema,
  type TransactionFormValues,
} from "@/lib/validations/transactions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectComponent } from "./SelectComponent";
import { useAddTransaction } from "@/hooks/useAddTransaction";
import type { Transaction } from "@/types/transaction";
import type { ApiResponse } from "@/types/api";

const typeOptions = [
  { label: "Income", value: "income" },
  { label: "Expense", value: "expense" },
];

const categoryOptions = [
  { label: "Food", value: "Food" },
  { label: "Transport", value: "Transport" },
  { label: "Utilities", value: "Utilities" },
  { label: "Entertainment", value: "Entertainment" },
  { label: "Health", value: "Health" },
  { label: "Shopping", value: "Shopping" },
  { label: "Income", value: "Income" },
  { label: "Other", value: "Other" },
];

const statusOptions = [
  { label: "Completed", value: "completed" },
  { label: "Pending", value: "pending" },
  { label: "Failed", value: "failed" },
];

export const TransactionForm = ({
  onSuccess: onSuccessCallback,
}: {
  onSuccess: () => void;
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      description: "",
      amount: 0,
      type: "",
      category: "",
      status: "",
      date: new Date().toISOString().slice(0, 10),
    },
  });

  const successHandler = (data: ApiResponse<Transaction>) => {
    reset();
    toast.success(data?.message, {
      style: {
        background: "#10b981",
        color: "#ffffff",
        border: "1px solid #059669",
      },
    });
    onSuccessCallback();
  };

  const errorHandler = (err: ApiResponse<Transaction>) => {
    console.log(err);
    toast.error("There was an error adding the transaction", {
      style: {
        background: "#ef4444",
        color: "#ffffff",
        border: "1px solid #dc2626",
      },
    });
  };

  const { mutate } = useAddTransaction(successHandler, errorHandler);

  const onSubmit = (data: TransactionFormValues) => {
    console.log(data);
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <Input
          id="description"
          placeholder="e.g. Monthly Rent"
          className="text-xs"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-sm font-medium text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="amount" className="text-sm font-medium">
          Amount (Tk)
        </label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          className="text-xs"
          onFocus={(e) => {
            if (e.currentTarget.value === "0") {
              e.currentTarget.value = "";
            }
          }}
          {...register("amount", {
            setValueAs: (value) => (value === "" ? 0 : Number(value)),
          })}
        />
        {errors.amount && (
          <p className="text-sm font-medium text-destructive">
            {errors.amount.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="date" className="text-sm font-medium">
          Date
        </label>
        <Input
          id="date"
          type="date"
          className="text-xs"
          max={new Date().toISOString().slice(0, 10)}
          defaultValue={new Date().toISOString().slice(0, 10)}
          {...register("date", {
            setValueAs: (value) => value,
          })}
        />
        {errors.date && (
          <p className="text-sm font-medium text-destructive">
            {errors.date.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Type</label>
        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <SelectComponent
              options={typeOptions}
              placeholder="Select type"
              onValueChange={field.onChange}
              value={field.value ?? ""}
              classNames="text-xs"
            />
          )}
        />
        {errors.type && (
          <p className="text-sm font-medium text-destructive">
            {errors.type.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Category</label>
        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <SelectComponent
              options={categoryOptions}
              placeholder="Choose category"
              onValueChange={field.onChange}
              value={field.value ?? ""}
              classNames="text-xs"
            />
          )}
        />
        {errors.category && (
          <p className="text-sm font-medium text-destructive">
            {errors.category.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Status</label>
        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <SelectComponent
              options={statusOptions}
              placeholder="Choose status"
              onValueChange={field.onChange}
              value={field.value ?? ""}
              classNames="text-xs"
            />
          )}
        />
        {errors.status && (
          <p className="text-sm font-medium text-destructive">
            {errors.status.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full text-xs" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Add Transaction"}
      </Button>
    </form>
  );
};

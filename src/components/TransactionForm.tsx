import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  transactionSchema,
  type TransactionFormValues,
} from "@/lib/validations/transactions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SelectComponent } from "./SelectComponent";
import { useEffect, useMemo } from "react";

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
  initialValues,
  onSubmit,
  shouldReset,
  onResetComplete,
}: {
  initialValues?: (TransactionFormValues & { id?: string }) | null;
  onSubmit: (data: TransactionFormValues & { id?: string }) => void;
  shouldReset?: boolean;
  onResetComplete?: () => void;
}) => {
  const defaultValues: TransactionFormValues & { id?: string } = useMemo(() => {
    return (
      initialValues || {
        description: "",
        amount: 0,
        type: "",
        category: "",
        status: "",
        date: new Date().toISOString().slice(0, 10),
      }
    );
  }, [initialValues]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormValues & { id?: string }>({
    resolver: zodResolver(transactionSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: defaultValues,
  });

  // Reset form when initialValues change
  useEffect(() => {
    console.log("Selected entry:", initialValues);
    reset(defaultValues);
  }, [initialValues, defaultValues, reset]);

  useEffect(() => {
    if (shouldReset) {
      reset();
      onResetComplete?.();
    }
  }, [shouldReset, onResetComplete, reset]);

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
          className="text-xs pointer-events-auto"
          max={new Date().toISOString().slice(0, 10)}
          defaultValue={new Date().toISOString().slice(0, 10)}
          onClick={(e) => {
            const input = e.currentTarget as HTMLInputElement;
            if (input.showPicker) {
              input.showPicker();
            }
          }}
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

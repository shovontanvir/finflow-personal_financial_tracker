import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  transactionSchema,
  type TransactionFormValues,
} from "@/lib/validations/transactions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SelectComponent } from "@/components/SelectComponent";
// import { useTransactions } from "@/hooks/useTransactions"; // To trigger a refetch after adding

const typeOptions = [
  { label: "Income", value: "income" },
  { label: "Expense", value: "expense" },
];

const categoryOptions = [
  { label: "Food & Dining", value: "food" },
  { label: "Rent/Housing", value: "rent" },
  { label: "Salary", value: "salary" },
  { label: "Shopping", value: "shopping" },
];

export const TransactionForm = ({ onSuccess }: { onSuccess: () => void }) => {
  //   const { addTransaction } = useTransactions(); // Assuming your hook has a mutation

  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      description: "",
      amount: 0,
      type: "expense",
      category: "Food",
      status: "completed",
      date: new Date(),
    },
  });

  const onSubmit = async (data: TransactionFormValues) => {
    try {
      // 1. Add to your local storage / API
      await console.log(data);

      // 2. Reset form and close modal
      form.reset();
      onSuccess();
    } catch (error) {
      console.error("Failed to add transaction", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Monthly Rent" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4">
          {/* Amount */}
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount (৳)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    value={field.value ?? 0}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value === "" ? 0 : Number(e.target.value),
                      )
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Type */}
          <Controller
            control={form.control}
            name="type"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <SelectComponent
                    value={field.value ?? ""}
                    onValueChange={(selectedValue) => {
                      field.onChange(selectedValue);
                      form.setValue(
                        "type",
                        selectedValue as TransactionFormValues["type"],
                        {
                          shouldDirty: true,
                          shouldTouch: true,
                          shouldValidate: true,
                        },
                      );
                    }}
                    options={typeOptions}
                    placeholder="Select type"
                  />
                </FormControl>
                {fieldState.error && (
                  <p className="text-sm font-medium text-destructive">
                    {fieldState.error.message}
                  </p>
                )}
              </FormItem>
            )}
          />
        </div>

        {/* Category */}
        <Controller
          control={form.control}
          name="category"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <SelectComponent
                  value={field.value ?? ""}
                  onValueChange={(selectedValue) => {
                    field.onChange(selectedValue);
                    form.setValue(
                      "category",
                      selectedValue as TransactionFormValues["category"],
                      {
                        shouldDirty: true,
                        shouldTouch: true,
                        shouldValidate: true,
                      },
                    );
                  }}
                  options={categoryOptions}
                  placeholder="Choose category"
                />
              </FormControl>
              {fieldState.error && (
                <p className="text-sm font-medium text-destructive">
                  {fieldState.error.message}
                </p>
              )}
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Saving..." : "Add Transaction"}
        </Button>
      </form>
    </Form>
  );
};

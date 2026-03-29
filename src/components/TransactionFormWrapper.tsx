import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { TransactionForm } from "./TransactionForm";
import type { TransactionFormValues } from "@/lib/validations/transactions";

export const TransactionFormWrapper = ({
  children,
  onSubmit,
  shouldReset,
  open,
  onResetComplete,
  onOpenChange,
  initialValues,
}: {
  children?: React.ReactNode;
  onSubmit: (data: TransactionFormValues & { id?: string }) => void;
  shouldReset?: boolean;
  open?: boolean;
  onResetComplete?: () => void;
  onOpenChange?: (open: boolean) => void;
  initialValues?: (TransactionFormValues & { id?: string }) | null;
}) => {
  const handleSubmit = useCallback(
    (data: TransactionFormValues & { id?: string }) => {
      onSubmit(data);
    },
    [onSubmit],
  );

  return (
    <Drawer
      direction="right"
      open={open}
      onOpenChange={onOpenChange}
      shouldScaleBackground={false}
    >
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add New Transaction</DrawerTitle>
          <DrawerDescription>
            Enter the details of your new transaction
          </DrawerDescription>
        </DrawerHeader>
        <div className="w-full p-5 min-h-0 flex-1 overflow-visible flex flex-col justify-center">
          <TransactionForm
            onSubmit={handleSubmit}
            shouldReset={shouldReset}
            onResetComplete={onResetComplete}
            initialValues={initialValues}
          />
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="destructive">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

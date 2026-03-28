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
import { SquarePlus } from "lucide-react";
import { TransactionForm } from "./TransactionForm";

export const AddTransactionForm = () => {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline">
          <SquarePlus />{" "}
          <span className="hidden md:inline-block">Add Transaction</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add New Transaction</DrawerTitle>
          <DrawerDescription>
            Enter the details of your new transaction
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-5">
          <TransactionForm onSuccess={() => {}} />
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

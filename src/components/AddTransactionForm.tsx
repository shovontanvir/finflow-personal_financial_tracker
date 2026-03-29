import { useState } from "react";
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
  const [open, setOpen] = useState(false);

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
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
        <div className="flex flex-1 items-center justify-center p-5">
          <TransactionForm onSuccess={() => setOpen(false)} />
        </div>
        <DrawerFooter>
          {/* <Button>Submit</Button> */}
          <DrawerClose asChild>
            <Button variant="destructive">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

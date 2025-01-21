"use client";

import { PawPrint } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import AddEditFoodForm from "../forms/add-edit-food";

/**
 * AddFoodDialog component renders a button that opens a dialog for adding food information.
 *
 * When the button is clicked, the dialog opens, allowing the user to fill out a form to add feeding information.
 * Upon saving the form, the dialog closes and the page is refreshed.
 *
 * @component
 * @example
 * return (
 *   <AddFoodDialog />
 * )
 *
 * @returns {JSX.Element} The rendered AddFoodDialog component.
 */
const AddFoodDialog = () => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(false);

  const handleDialogClose = () => {
    setOpen(false);
    router.refresh();
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="primary"
        className="flex text-lg lg:w-2/5 w-4/5 lg:m-3 m-1 lg:text-2xl lg:h-[60px]"
      >
        <PawPrint size={24} />
        Add
        <PawPrint size={24} />
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex flex-1 text-orange-700">
              <PawPrint className="text-sm" />
              Add Food!
            </DialogTitle>
            <DialogDescription>
              Add feeding information of Daisy, praise the Dais!
            </DialogDescription>
          </DialogHeader>
          <AddEditFoodForm onSave={handleDialogClose} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddFoodDialog;

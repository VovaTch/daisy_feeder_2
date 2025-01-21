"use client";

import { PawPrint } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import AddEditFoodForm from "../forms/add-edit-food";
import { FeedingItem } from "../types/food-item";

type EditFoodDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleDialogClose: () => void;
  item: FeedingItem;
};

/**
 * EditFoodDialog component renders a dialog for editing food item information.
 *
 * @param {boolean} open - A boolean indicating whether the dialog is open.
 * @param {function} setOpen - A function to set the open state of the dialog.
 * @param {function} handleDialogClose - A function to handle the dialog close event.
 * @param {object} item - The food item to be edited.
 *
 * @returns {JSX.Element} The rendered EditFoodDialog component.
 */
const EditFoodDialog = ({
  open,
  setOpen,
  handleDialogClose,
  item,
}: EditFoodDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex flex-1 text-orange-700">
            <PawPrint className="text-sm" />
            Edit Food Info...
          </DialogTitle>
          <DialogDescription>
            Possible mistake? Correct it here!
          </DialogDescription>
        </DialogHeader>
        <AddEditFoodForm onSave={handleDialogClose} item={item} />
      </DialogContent>
    </Dialog>
  );
};

export default EditFoodDialog;

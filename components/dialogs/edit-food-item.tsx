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

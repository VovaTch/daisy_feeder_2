"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FeedingItem } from "../types/food-item";
import EditFoodDialog from "./edit-food-item";

type CardEditLargeProps = {
  item: FeedingItem;
};

const CardEditLarge = ({ item }: CardEditLargeProps) => {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(true);

  const handleDialogClose = () => {
    setOpen(false);
    router.refresh();
  };
  // TODO: remove duplication of component
  return (
    <EditFoodDialog
      item={item}
      open={open}
      setOpen={setOpen}
      handleDialogClose={handleDialogClose}
    />
  );
};

export default CardEditLarge;

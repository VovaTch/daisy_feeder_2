"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { FeedingItem } from "../types/food-item";
import EditFoodDialog from "./edit-food-item";

type CardEditLargeProps = {
  item: FeedingItem;
};

/**
 * Component for editing a large card.
 *
 * @component
 * @param {CardEditLargeProps} props - The properties for the component.
 * @param {Object} props.item - The item to be edited.
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * <CardEditLarge item={item} />
 */
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

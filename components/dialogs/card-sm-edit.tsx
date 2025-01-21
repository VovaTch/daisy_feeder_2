"use client";

import { PawPrint } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "../ui/button";
import { FeedingItem } from "../types/food-item";
import EditFoodDialog from "./edit-food-item";

type CardEditMobileProps = {
  item: FeedingItem;
};

/**
 * CardEditMobile component renders a button that opens a dialog for editing a card item.
 *
 * @component
 *
 * @param {CardEditMobileProps} props - The properties for the CardEditMobile component.
 * @param {object} props.item - The item to be edited.
 *
 * @returns {JSX.Element} The rendered CardEditMobile component.
 *
 * @example
 * <CardEditMobile item={item} />
 *
 * @remarks
 * This component uses the `useRouter` hook from Next.js to refresh the page when the dialog is closed.
 * It also maintains an internal state `open` to control the visibility of the dialog.
 */
const CardEditMobile = ({ item }: CardEditMobileProps) => {
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
        className="flex text-xl w px-10 lg:w-2/5 w-4/5 m-3 lg:text-2xl h-[60px]"
      >
        Edit
        <PawPrint size={24} />
      </Button>
      <EditFoodDialog
        open={open}
        setOpen={setOpen}
        handleDialogClose={handleDialogClose}
        item={item}
      />
    </>
  );
};

export default CardEditMobile;

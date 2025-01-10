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

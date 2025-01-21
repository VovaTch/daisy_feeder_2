"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FeedingItem } from "@/components/types/food-item";
import EditFoodDialog from "@/components/dialogs/edit-food-item";

type Props = {
  feedingItem: FeedingItem;
  className?: string;
};

/**
 * Component representing a large feeding card.
 *
 * @param {Object} props - The properties object.
 * @param {Object} props.feedingItem - The feeding item data.
 * @param {string} props.feedingItem.id - The unique identifier for the feeding item.
 * @param {string} props.feedingItem.foodType - The type of food (e.g., "dry" or "wet").
 * @param {string} props.feedingItem.amount - The amount of food.
 * @param {string} props.feedingItem.datetime - The date and time of the feeding.
 * @param {string} props.feedingItem.feeder - The name of the person who fed.
 * @param {string} props.feedingItem.feederAvatarUrl - The URL of the feeder's avatar image.
 * @param {string} [props.className] - Additional class names for styling.
 *
 * @returns {JSX.Element} The rendered large feeding card component.
 */
const LargeFeedingCard = ({ feedingItem, className }: Props) => {
  const router = useRouter();
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const handleDialogClose = () => {
    setOpenEdit(false);
    router.refresh();
  };

  return (
    <>
      <div
        key={feedingItem.id}
        className={cn(
          "m-4 mx-10 bg-slate-200 w-full relative hover:bg-slate-100 bg-cover bg-center bg-blend-overlay\
        hover:scale-105 transition z-5 rounded-sm border-b-2 border-white flex flex-row hover:cursor-pointer",
          feedingItem.foodType === "dry"
            ? "bg-[url('/images/dry-food.jpg')]"
            : "bg-[url('/images/wet-food.jpg')]",
          className
        )}
        onClick={() => setOpenEdit(true)}
      >
        {/* <h1>{JSON.stringify(feedingItem)} Large Card Data</h1> */}
        <Button
          variant={feedingItem.foodType === "dry" ? "dry" : "wet"}
          className="h-[80px] w-[80px] m-[20px] hover:scale-100 rounded-sm relative text-4xl"
        >
          {feedingItem.amount}
        </Button>
        <p className="text-orange-500 text-6xl absolute right-7 top-7 items-center">
          {new Date(feedingItem.datetime).toTimeString().slice(0, 8)}
        </p>
        <div>
          <p className="items-center justify-center absolute bottom-0 left-[150px] top-[10px] p-4 text-xl text-slate-600">
            {new Date(feedingItem.datetime).toDateString()}
          </p>
        </div>

        <div
          className={cn(
            "items-center justify-center absolute bottom-0 left-[150px] top-[60px] p-4 text-lg flex flex-row",
            feedingItem.foodType === "dry" ? "text-red-800" : "text-blue-800"
          )}
        >
          <Image
            src={feedingItem.feederAvatarUrl}
            alt={feedingItem.feeder}
            height={40}
            width={40}
            className="rounded-full mr-4"
          />
          <p>
            {feedingItem.feeder} fed Daisy {feedingItem.amount}g of{" "}
            {feedingItem.foodType} food.
          </p>
        </div>
      </div>
      <EditFoodDialog
        key={`edit-${feedingItem.id}`}
        item={feedingItem}
        open={openEdit}
        setOpen={setOpenEdit}
        handleDialogClose={handleDialogClose}
      />
    </>
  );
};

export default LargeFeedingCard;

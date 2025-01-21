"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import CardEditMobile from "@/components/dialogs/card-sm-edit";
import { FeedingItem } from "@/components/types/food-item";

type Props = {
  feedingItem: FeedingItem;
  className?: string;
};

/**
 * MobileFeedingCard component displays a feeding item with details in a mobile-friendly card format.
 * It includes a button that triggers a drawer containing detailed information about the feeding event.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.feedingItem - The feeding item data.
 * @param {string} props.feedingItem.foodType - The type of food (either "dry" or "wet").
 * @param {string} props.feedingItem.amount - The amount of food fed.
 * @param {string} props.feedingItem.datetime - The date and time of the feeding event.
 * @param {string} props.feedingItem.feeder - The name of the person who fed the pet.
 * @param {string} props.feedingItem.feederAvatarUrl - The URL of the feeder's avatar image.
 * @param {string} [props.className] - Additional class names to apply to the component.
 *
 * @returns {JSX.Element} The rendered MobileFeedingCard component.
 */
const MobileFeedingCard = ({ feedingItem, className }: Props) => {
  return (
    <div className={cn("m-[2.5vw]", className)}>
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant={feedingItem.foodType === "dry" ? "dry" : "wet"}
            className="h-[20vw] w-[20vw] font-bold tracking-wider text-5xl rounded-md"
          >
            {feedingItem.amount}
          </Button>
        </DrawerTrigger>
        <DrawerContent
          className={cn(
            "bg-slate-200 bg-blend-overlay bg-cover bg-center",
            feedingItem.foodType === "dry"
              ? "bg-[url('/images/dry-food.jpg')]"
              : "bg-[url('/images/wet-food.jpg')]"
          )}
        >
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle className="text-2xl text-orange-800 tracking-wider">
                Feeding Info
              </DrawerTitle>
              <Separator />
            </DrawerHeader>
            <div className="p-4 pb-8">
              <div className="flex flex-1 item-center justify-center">
                <p className="text-6xl font-semibold text-orange-500">
                  {new Date(feedingItem.datetime).toTimeString().slice(0, 8)}
                </p>
                <p className="px-4">
                  {new Date(feedingItem.datetime).toDateString()}
                </p>
              </div>
              <div
                className={cn(
                  "pt-5 flex flex-row items-center justify-center",
                  feedingItem.foodType === "dry"
                    ? "text-red-800"
                    : "text-blue-800"
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
            <CardEditMobile item={feedingItem} />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobileFeedingCard;

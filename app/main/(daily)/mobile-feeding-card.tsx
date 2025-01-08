import { cn } from "@/lib/utils";
import { FeedingItem } from "./types";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";

type Props = {
  feedingItem: FeedingItem;
  className?: string;
};

// TODO: make a dialog for edits, add delete and edit buttons
const MobileFeedingCard = ({ feedingItem, className }: Props) => {
  return (
    <div className={cn("m-[2.5vw]", className)}>
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant={feedingItem.foodChoice === "dry" ? "dry" : "wet"}
            className="h-[20vw] w-[20vw] font-bold tracking-wider text-5xl rounded-md"
          >
            {feedingItem.amount}
          </Button>
        </DrawerTrigger>
        <DrawerContent
          className={cn(
            "bg-slate-200 bg-blend-overlay bg-cover bg-center",
            feedingItem.foodChoice === "dry"
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
                  "pt-5",
                  feedingItem.foodChoice === "dry"
                    ? "text-red-800"
                    : "text-blue-800"
                )}
              >
                <p>
                  {feedingItem.feeder} fed Daisy {feedingItem.amount}g of{" "}
                  {feedingItem.foodChoice} food.
                </p>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobileFeedingCard;

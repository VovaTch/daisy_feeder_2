import { cn } from "@/lib/utils";
import { FeedingItem } from "./types";
import { Button } from "@/components/ui/button";

type Props = {
  feedingItem: FeedingItem;
  className?: string;
};

const LargeFeedingCard = ({ feedingItem, className }: Props) => {
  return (
    <div
      className={cn(
        "m-4 mx-10 bg-slate-200 w-full relative hover:bg-slate-100 bg-cover bg-center bg-blend-overlay\
        hover:scale-105 transition z-5 rounded-sm border-b-2 border-white flex flex-row",
        feedingItem.foodChoice === "dry"
          ? "bg-[url('/images/dry-food.jpg')]"
          : "bg-[url('/images/wet-food.jpg')]",
        className
      )}
    >
      {/* <h1>{JSON.stringify(feedingItem)} Large Card Data</h1> */}
      <Button
        variant={feedingItem.foodChoice === "dry" ? "dry" : "wet"}
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
          "items-center justify-center absolute bottom-0 left-[150px] top-[60px] p-4 text-lg",
          feedingItem.foodChoice === "dry" ? "text-red-800" : "text-blue-800"
        )}
      >
        <p>
          {feedingItem.feeder} fed Daisy {feedingItem.amount}g of{" "}
          {feedingItem.foodChoice} food.
        </p>
      </div>
    </div>
  );
};

export default LargeFeedingCard;

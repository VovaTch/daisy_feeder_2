import { cn } from "@/lib/utils";
import { FeedingItem } from "./types";
import { Button } from "@/components/ui/button";

type Props = {
  feedingItem: FeedingItem;
  className?: string;
};

const MobileFeedingCard = ({ feedingItem, className }: Props) => {
  return (
    <div className={cn("m-[2.5vw]", className)}>
      {/* <h1>{JSON.stringify(feedingItem)} Mobile Card Data</h1> */}
      <Button
        variant={feedingItem.foodChoice === "dry" ? "dry" : "wet"}
        className="h-[20vw] w-[20vw] font-bold tracking-wider text-5xl rounded-md"
      >
        {feedingItem.amount}
      </Button>
    </div>
  );
};

export default MobileFeedingCard;

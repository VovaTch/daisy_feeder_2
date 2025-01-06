import { cn } from "@/lib/utils";
import { FeedingItem } from "./types";

type Props = {
  feedingItem: FeedingItem;
  className?: string;
};

const LargeFeedingCard = ({ feedingItem, className }: Props) => {
  return (
    <div className={cn("", className)}>
      <h1>{JSON.stringify(feedingItem)} Large Card Data</h1>
    </div>
  );
};

export default LargeFeedingCard;

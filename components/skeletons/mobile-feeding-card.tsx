import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

type Props = {
  className?: string;
};

const SkeletonMobileFeedingCard = ({ className }: Props) => {
  return (
    <div className={cn("m-[2.5vw]", className)}>
      <Skeleton className="h-[20vw] w-[20vw] font-bold tracking-wider text-5xl rounded-md" />
    </div>
  );
};

export default SkeletonMobileFeedingCard;

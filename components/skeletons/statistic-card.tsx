import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

type Props = {
  className?: string;
};

const SkeletonStatisticCard = ({ className }: Props) => {
  return (
    <div className={cn(className)}>
      <Skeleton className="lg:h-[28vw] lg:w-[28vw] h-[100vw] w-[100vw] m-2 rounded-sm" />
    </div>
  );
};

export default SkeletonStatisticCard;

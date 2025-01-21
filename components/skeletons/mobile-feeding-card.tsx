import { cn } from "@/lib/utils";

import { Skeleton } from "../ui/skeleton";

type Props = {
  className?: string;
};

/**
 * SkeletonMobileFeedingCard component renders a skeleton placeholder for a mobile feeding card.
 *
 * @param {Object} props - The component props.
 * @param {string} props.className - Additional class names to apply to the component.
 * @returns {JSX.Element} The rendered skeleton mobile feeding card component.
 */
const SkeletonMobileFeedingCard = ({ className }: Props) => {
  return (
    <div className={cn("m-[2.5vw]", className)}>
      <Skeleton className="h-[20vw] w-[20vw] font-bold tracking-wider text-5xl rounded-md" />
    </div>
  );
};

export default SkeletonMobileFeedingCard;

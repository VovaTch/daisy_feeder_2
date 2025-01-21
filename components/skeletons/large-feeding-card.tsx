import { cn } from "@/lib/utils";

import { Skeleton } from "../ui/skeleton";

type Props = {
  className?: string;
};

/**
 * SkeletonLargeFeedingCard is a functional component that renders a skeleton
 * placeholder for a large feeding card. It is used to indicate loading state
 * while the actual content is being fetched or processed.
 *
 * @param {Props} props - The properties object.
 * @param {string} props.className - Additional class names to apply to the root div element.
 *
 * @returns {JSX.Element} A JSX element representing the skeleton placeholder.
 */
const SkeletonLargeFeedingCard = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "relative m-4 mx-10 w-full rounded-sm flex flex-row",
        className
      )}
    >
      <Skeleton className="h-[80px] w-[80px] m-[20px] hover:scale-100 rounded-sm relative text-4xl" />
      <Skeleton className="items-center justify-center absolute bottom-[15px] left-[150px] top-[15px] p-4 w-3/5" />
      <Skeleton className="items-center justify-center absolute bottom-[15px] left-[78vw] top-[15px] p-4 w-1/5" />
    </div>
  );
};

export default SkeletonLargeFeedingCard;

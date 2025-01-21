import { cn } from "@/lib/utils";

import { Skeleton } from "../ui/skeleton";

type Props = {
  className?: string;
};

/**
 * SkeletonStatisticCard is a functional component that renders a skeleton loader
 * for a statistic card. It accepts a className prop to allow custom styling.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.className - Additional class names for custom styling.
 *
 * @returns {JSX.Element} A div containing a skeleton loader with responsive dimensions.
 */
const SkeletonStatisticCard = ({ className }: Props) => {
  return (
    <div className={cn(className)}>
      <Skeleton className="lg:h-[28vw] lg:w-[28vw] h-[100vw] w-[100vw] m-5 rounded-sm" />
    </div>
  );
};

export default SkeletonStatisticCard;

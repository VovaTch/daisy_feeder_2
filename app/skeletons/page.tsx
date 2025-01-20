import SkeletonLargeFeedingCard from "@/components/skeletons/large-feeding-card";
import SkeletonMobileFeedingCard from "@/components/skeletons/mobile-feeding-card";
import SkeletonStatisticCard from "@/components/skeletons/statistic-card";

/**
 * Test component renders a skeleton loading state.
 *
 * This component displays different skeleton cards based on the screen size:
 * - Two `SkeletonMobileFeedingCard` components are shown on small screens (hidden on large screens).
 * - Two `SkeletonLargeFeedingCard` components are shown on large screens (hidden on small screens).
 * - A `SkeletonStatisticCard` component is always displayed.
 *
 * @returns {JSX.Element} The rendered skeleton loading state for the test page.
 */
const SkeletonTestPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-orange-500">
      <SkeletonMobileFeedingCard className="lg:hidden block" />
      <SkeletonMobileFeedingCard className="lg:hidden block" />
      <SkeletonLargeFeedingCard className="hidden lg:block" />
      <SkeletonLargeFeedingCard className="hidden lg:block" />
      <SkeletonStatisticCard />
    </div>
  );
};

export default SkeletonTestPage;

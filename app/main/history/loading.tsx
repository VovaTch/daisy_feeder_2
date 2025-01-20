import SkeletonLargeFeedingCard from "@/components/skeletons/large-feeding-card";
import SkeletonMobileFeedingCard from "@/components/skeletons/mobile-feeding-card";

const mobileIndexSkeletonArray = Array.from({ length: 12 }, (_, i) => i);
const desktopIndexSkeletonArray = Array.from({ length: 3 }, (_, i) => i);

/**
 * HistoryLoadingPage component renders a loading skeleton for the history page.
 * It displays different skeleton components based on the screen size.
 *
 * - For large screens (lg), it renders `SkeletonLargeFeedingCard` components.
 * - For smaller screens, it renders `SkeletonMobileFeedingCard` components.
 *
 * @returns {JSX.Element} The loading skeleton for the history page.
 */
const HistoryLoadingPage = () => {
  return (
    <div
      className="absolute flex flex-row flex-wrap w-full lg:h-[calc(100vh-190px)] h-[calc(100vh-240px)]
        content-start overflow-y-auto justify-start items-start py-0 top-20 left-0"
    >
      {desktopIndexSkeletonArray.map((_, idx) => {
        return (
          <SkeletonLargeFeedingCard key={idx} className="lg:block hidden" />
        );
      })}
      {mobileIndexSkeletonArray.map((_, idx) => {
        return (
          <SkeletonMobileFeedingCard key={idx} className="lg:hidden block" />
        );
      })}
    </div>
  );
};

export default HistoryLoadingPage;

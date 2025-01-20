import SkeletonLargeFeedingCard from "@/components/skeletons/large-feeding-card";
import SkeletonMobileFeedingCard from "@/components/skeletons/mobile-feeding-card";

const mobileIndexSkeletonArray = Array.from({ length: 12 }, (_, i) => i);
const desktopIndexSkeletonArray = Array.from({ length: 3 }, (_, i) => i);

/**
 * HistoryLoadingPage component renders a loading skeleton for the history page.
 * It displays a set of skeleton cards for both desktop and mobile views to indicate
 * loading state while the actual content is being fetched.
 *
 * @component
 * @example
 * return (
 *   <HistoryLoadingPage />
 * )
 *
 * @returns {JSX.Element} A JSX element containing the loading skeletons for the history page.
 */
const HistoryLoadingPage = () => {
  return (
    <>
      <div
        key={"feeding-cards"}
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
      <div
        key={"overall-dry-wet-food"}
        className="absolute left-0 bottom-[30px] items-center justify-center w-full h-20 bg-gradient-to-b
      from-white/50 to-transparent border-l-2 border-r-2 border-white rounded-md"
      ></div>
    </>
  );
};

export default HistoryLoadingPage;

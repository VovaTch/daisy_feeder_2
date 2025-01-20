import SkeletonStatisticCard from "@/components/skeletons/statistic-card";

const mobileIndexSkeletonArray = Array.from({ length: 3 }, (_, i) => i);
const desktopIndexSkeletonArray = Array.from({ length: 4 }, (_, i) => i);

/**
 * StatisticsLoadingPage component renders a loading skeleton for the statistics page.
 * It displays different skeleton cards for desktop and mobile views.
 *
 * @returns {JSX.Element} The JSX code for the loading skeleton page.
 *
 * The component maps over two arrays, `desktopIndexSkeletonArray` and `mobileIndexSkeletonArray`,
 * to render `SkeletonStatisticCard` components with appropriate classes for desktop and mobile views.
 *
 * @component
 */
const StatisticsLoadingPage = () => {
  return (
    <div
      className="flex flex-wrap flex-row absolute w-full lg:h-[calc(100vh-160px)] h-[calc(100vh-210px)] overflow-y-auto content-start
    items-start justify-start"
    >
      {desktopIndexSkeletonArray.map((_, idx) => {
        return <SkeletonStatisticCard key={idx} className="lg:block hidden" />;
      })}
      {mobileIndexSkeletonArray.map((_, idx) => {
        return <SkeletonStatisticCard key={idx} className="lg:hidden block" />;
      })}
    </div>
  );
};

export default StatisticsLoadingPage;

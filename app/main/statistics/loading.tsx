import SkeletonStatisticCard from "@/components/skeletons/statistic-card";

const mobileIndexSkeletonArray = Array.from({ length: 4 }, (_, i) => i);
const desktopIndexSkeletonArray = Array.from({ length: 3 }, (_, i) => i);

const StatisticsLoadingPage = () => {
  return (
    <div
      className="lex flex-wrap flex-row absolute w-full lg:h-[calc(100vh-80px)] h-[calc(100vh-130px)] overflow-y-auto content-start
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

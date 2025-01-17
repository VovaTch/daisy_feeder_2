import SkeletonLargeFeedingCard from "@/components/skeletons/large-feeding-card";
import SkeletonMobileFeedingCard from "@/components/skeletons/mobile-feeding-card";

const mobileIndexSkeletonArray = Array.from({ length: 12 }, (_, i) => i);
const desktopIndexSkeletonArray = Array.from({ length: 3 }, (_, i) => i);

const MainLoadingPage = () => {
  return (
    <>
      <div
        key={"feeding-cards"}
        className="absolute w-full h-[calc(100vh-210px)] lg:h-[calc(100vh-250px)] 
      flex flex-row content-start flex-wrap top-20 left-0 overflow-y-auto justify-start items-start py-0"
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
        className="absolute left-0 bottom-[90px] items-center justify-center w-full h-20 bg-gradient-to-b
      from-white/50 to-transparent border-l-2 border-r-2 border-white rounded-md"
      ></div>
    </>
  );
};

export default MainLoadingPage;

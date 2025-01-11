import SkeletonLargeFeedingCard from "@/components/skeletons/large-feeding-card";
import SkeletonMobileFeedingCard from "@/components/skeletons/mobile-feeding-card";

const SkeletonTestPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-orange-500">
      <SkeletonMobileFeedingCard className="lg:hidden block" />
      <SkeletonMobileFeedingCard className="lg:hidden block" />
      <SkeletonLargeFeedingCard className="hidden lg:block" />
      <SkeletonLargeFeedingCard className="hidden lg:block" />
    </div>
  );
};

export default SkeletonTestPage;

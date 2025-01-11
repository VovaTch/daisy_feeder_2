import { Separator } from "@/components/ui/separator";
import { DummyData } from "../../../api/dummy-data";
import LargeFeedingCard from "../../../components/custom/large-feeding-card";
import MobileFeedingCard from "../../../components/custom/mobile-feeding-card";
import { FeedingItem } from "@/components/types/food-item";
import OverallDryWetFood from "@/components/custom/overall-food-sum";

const MainPage = () => {
  const feedingData: FeedingItem[] = DummyData; // TODO: make it not dummy data

  return (
    <>
      <div
        className="absolute w-full h-[calc(100vh-210px)] lg:h-[calc(100vh-250px)] 
      flex flex-row content-start flex-wrap top-20 left-0 overflow-y-auto justify-start items-start py-0"
      >
        {feedingData.map((item, idx) => {
          return (
            <>
              <LargeFeedingCard
                key={idx}
                feedingItem={item}
                className="lg:block hidden"
              />
            </>
          );
        })}
        {feedingData.map((item, idx) => {
          return (
            <>
              <MobileFeedingCard
                key={idx}
                feedingItem={item}
                className="lg:hidden items-center justify-center sticky"
              />
            </>
          );
        })}
      </div>
      <div
        className="absolute left-0 bottom-[90px] items-center justify-center w-full h-20 bg-gradient-to-b
      from-white/50 to-transparent border-l-2 border-r-2 border-white rounded-md"
      >
        <Separator orientation="horizontal" className="w-full" />
        {feedingData.length > 0 ? (
          <OverallDryWetFood feedingData={feedingData} />
        ) : (
          <div className="items-center justify-center flex flex-col ">
            <h1 className="text-xl font-bold text-orange-500 tracking-widest text-center pt-5">
              Daisy hasn&apos;t been fed today...
            </h1>
          </div>
        )}
      </div>
    </>
  );
};

export default MainPage;

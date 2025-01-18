import { Separator } from "@/components/ui/separator";
import LargeFeedingCard from "../../../components/custom/large-feeding-card";
import MobileFeedingCard from "../../../components/custom/mobile-feeding-card";
import { FeedingItem } from "@/components/types/food-item";
import OverallDryWetFood from "@/components/custom/overall-food-sum";
import { getFeedingItems } from "@/db/queries";
import { auth } from "@clerk/nextjs/server";

const MainPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }
  const feedingData: FeedingItem[] = await getFeedingItems(userId);

  const todayFeedingData = feedingData.filter(
    (item) =>
      item.datetime.toISOString().slice(0, 10) ===
      new Date().toISOString().slice(0, 10)
  );

  return (
    <div key="main-page">
      <div
        key={"feeding-cards"}
        className="absolute w-full h-[calc(100vh-210px)] lg:h-[calc(100vh-250px)] 
      flex flex-row content-start flex-wrap top-20 left-0 overflow-y-auto justify-start items-start py-0"
      >
        {todayFeedingData.map((item, idx) => {
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
        {todayFeedingData.map((item, idx) => {
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
        key={"overall-dry-wet-food"}
        className="absolute left-0 bottom-[90px] items-center justify-center w-full h-20 bg-gradient-to-b
      from-white/50 to-transparent border-l-2 border-r-2 border-white rounded-md"
      >
        <Separator orientation="horizontal" className="w-full" />
        {todayFeedingData.length > 0 ? (
          <OverallDryWetFood feedingData={todayFeedingData} />
        ) : (
          <div className="items-center justify-center flex flex-col ">
            <h1 className="text-xl font-bold text-orange-500 tracking-widest text-center pt-5">
              Daisy hasn&apos;t been fed today...
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;

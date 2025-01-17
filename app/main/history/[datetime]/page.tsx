import LargeFeedingCard from "@/components/custom/large-feeding-card";
import MobileFeedingCard from "@/components/custom/mobile-feeding-card";
import OverallDryWetFood from "@/components/custom/overall-food-sum";
import { Separator } from "@/components/ui/separator";
import { getFeedingItems } from "@/db/queries";
import { auth } from "@clerk/nextjs/server";

type HistoryPageProps = {
  params: {
    datetime: string;
  };
};

const HistoryPage = async ({ params }: HistoryPageProps) => {
  const { datetime } = await params;
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const feedingData = await getFeedingItems(userId);

  const dateFilteredFeedingData = feedingData.filter(
    (item) => item.datetime.toISOString().slice(0, 10) === datetime
  );

  return (
    <>
      <div
        key={"feeding-cards"}
        className="absolute flex flex-row flex-wrap w-full lg:h-[calc(100vh-190px)] h-[calc(100vh-240px)]
        content-start overflow-y-auto justify-start items-start py-0 top-20 left-0"
      >
        {dateFilteredFeedingData.map((item, idx) => {
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
        {dateFilteredFeedingData.map((item, idx) => {
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
        className="absolute left-0 bottom-[30px] items-center justify-center w-full h-20 bg-gradient-to-b
      from-white/50 to-transparent border-l-2 border-r-2 border-white rounded-md"
      >
        <Separator orientation="horizontal" className="w-full" />
        {dateFilteredFeedingData.length > 0 ? (
          <OverallDryWetFood feedingData={dateFilteredFeedingData} />
        ) : (
          <div className="items-center justify-center flex flex-col ">
            <h1 className="text-xl font-bold text-orange-500 tracking-widest text-center pt-5">
              No food was logged at {datetime.slice(8, 10)}.
              {datetime.slice(5, 7)}.{datetime.slice(0, 4)}...
            </h1>
          </div>
        )}
      </div>
    </>
  );
};

export default HistoryPage;

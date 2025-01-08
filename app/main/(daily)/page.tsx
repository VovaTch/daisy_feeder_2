import { Separator } from "@/components/ui/separator";
import { DummyData } from "./dummy-data";
import LargeFeedingCard from "./large-feeding-card";
import MobileFeedingCard from "./mobile-feeding-card";
import { FeedingItem } from "./types";

const MainPage = () => {
  const feedingData: FeedingItem[] = DummyData; // TODO: make it not dummy data

  const totalDryFood = feedingData.reduce((total, curr) => {
    if (curr.foodChoice === "dry") {
      return total + curr.amount;
    }
    return total;
  }, 0);

  const totalWetFood = feedingData.reduce((total, curr) => {
    if (curr.foodChoice === "wet") {
      return total + curr.amount;
    }
    return total;
  }, 0);

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
          <div className="items-center justify-center flex flex-col ">
            <h1 className="text-xl font-bold text-orange-500 tracking-widest">
              Overall:
            </h1>
            <div className="flex flex-1 items-center justify-between">
              <h2
                className="lg:px-20 lg:mx-10 py-3 px-10 mx-5 bg-slate-100 bg-[url('/images/dry-food.jpg')] bg-blend-overlay bg-cover
              rounded-sm lg:text-xl text-blue-600"
              >
                {totalDryFood} dry food
              </h2>
              <h2
                className="lg:px-20 lg:mx-10 py-3 px-10 mx-5 bg-slate-100 bg-[url('/images/wet-food.jpg')] bg-blend-overlay bg-cover
              rounded-sm lg:text-xl text-red-500"
              >
                {totalWetFood} wet food
              </h2>
            </div>
          </div>
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

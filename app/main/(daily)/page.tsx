import { DummyData } from "./dummy-data";
import LargeFeedingCard from "./large-feeding-card";
import MobileFeedingCard from "./mobile-feeding-card";
import { FeedingItem } from "./types";

const MainPage = () => {
  const feedingData: FeedingItem[] = DummyData;

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
      <div className="absolute left-0 bottom-20 items-center justify-center w-full bg-red-500/50 h-20">
        {feedingData.length > 0 ? (
          <>
            <h1>Overall:</h1>
            <h2>{totalDryFood} dry food</h2>
            <h2>{totalWetFood} wet food</h2>
          </>
        ) : (
          <>
            <h1>Daisy hasn&apos;t been fed today...</h1>
          </>
        )}
      </div>
    </>
  );
};

export default MainPage;

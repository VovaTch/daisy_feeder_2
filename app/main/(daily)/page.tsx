import LargeFeedingCard from "./large-feeding-card";
import MobileFeedingCard from "./mobile-feeding-card";
import { FeedingItem } from "./types";

const DummyData = [
  {
    id: 1,
    feeder: "Dvovivov",
    amount: 10,
    datetime: Date.now(),
    foodChoice: "dry" as const,
  },
  {
    id: 2,
    feeder: "Dvovivov",
    amount: 15,
    datetime: Date.now(),
    foodChoice: "wet" as const,
  },
  {
    id: 3,
    feeder: "Dvovivov",
    amount: 20,
    datetime: Date.now(),
    foodChoice: "dry" as const,
  },
  {
    id: 4,
    feeder: "Dvovivov",
    amount: 35,
    datetime: Date.now(),
    foodChoice: "wet" as const,
  },
  {
    id: 5,
    feeder: "Dvovivov",
    amount: 20,
    datetime: Date.now(),
    foodChoice: "dry" as const,
  },
  {
    id: 6,
    feeder: "Dvovivov",
    amount: 35,
    datetime: Date.now(),
    foodChoice: "wet" as const,
  },
  {
    id: 7,
    feeder: "Dvovivov",
    amount: 20,
    datetime: Date.now(),
    foodChoice: "dry" as const,
  },
  {
    id: 8,
    feeder: "Dvovivov",
    amount: 35,
    datetime: Date.now(),
    foodChoice: "wet" as const,
  },
];

const MainPage = () => {
  const feedingData: FeedingItem[] = DummyData;
  return (
    <div
      className="absolute w-full h-[calc(100vh-210px)] lg:h-[calc(100vh-160px)]\
      flex content-start flex-wrap top-20 left-0 bg-red-500/50 overflow-y-auto justify-start items-start py-0"
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
  );
};

export default MainPage;

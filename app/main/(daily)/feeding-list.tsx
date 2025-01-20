"use client";

import LargeFeedingCard from "@/components/custom/large-feeding-card";
import MobileFeedingCard from "@/components/custom/mobile-feeding-card";
import { useDaisyFeederContext } from "@/providers/context";

export const FeedingList = () => {
  const { optimisticFeedingItems } = useDaisyFeederContext();
  const todayFeedingData = optimisticFeedingItems.filter(
    (item) =>
      item.datetime.toISOString().slice(0, 10) ===
      new Date().toISOString().slice(0, 10)
  );

  return (
    <>
      {todayFeedingData.map((item, idx) => {
        return (
          <LargeFeedingCard
            key={idx}
            feedingItem={item}
            className="lg:block hidden"
          />
        );
      })}
      {todayFeedingData.map((item, idx) => {
        return (
          <MobileFeedingCard
            key={idx}
            feedingItem={item}
            className="lg:hidden items-center justify-center sticky"
          />
        );
      })}
    </>
  );
};

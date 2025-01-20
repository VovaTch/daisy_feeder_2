"use client";

import LargeFeedingCard from "@/components/custom/large-feeding-card";
import MobileFeedingCard from "@/components/custom/mobile-feeding-card";
import { useDaisyFeederContext } from "@/providers/context";

/**
 * FeedingList component that displays a list of feeding items for the current day.
 *
 * This component retrieves feeding items from the DaisyFeederContext and filters them
 * to include only those that match the current date. It then renders these items using
 * two different card components: LargeFeedingCard for larger screens and MobileFeedingCard
 * for smaller screens.
 *
 * @returns {JSX.Element} A JSX element containing the list of feeding items for the current day.
 */
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

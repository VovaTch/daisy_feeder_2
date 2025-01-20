"use client";

import LargeFeedingCard from "@/components/custom/large-feeding-card";
import MobileFeedingCard from "@/components/custom/mobile-feeding-card";
import { useDaisyFeederContext } from "@/providers/context";

type Props = {
  datetime: string;
};

const HistoryFeedingList = ({ datetime }: Props) => {
  const { optimisticFeedingItems } = useDaisyFeederContext();
  const dateFilteredFeedingData = optimisticFeedingItems.filter(
    (item) => item.datetime.toISOString().slice(0, 10) === datetime
  );
  return (
    <>
      {dateFilteredFeedingData.map((item, idx) => {
        return (
          <LargeFeedingCard
            key={idx}
            feedingItem={item}
            className="lg:block hidden"
          />
        );
      })}
      {dateFilteredFeedingData.map((item, idx) => {
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

export default HistoryFeedingList;

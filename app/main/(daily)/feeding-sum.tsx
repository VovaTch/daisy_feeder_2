"use client";

import OverallDryWetFood from "@/components/custom/overall-food-sum";
import { Separator } from "@/components/ui/separator";
import { useDaisyFeederContext } from "@/providers/context";

export const FeedingSum = () => {
  const { optimisticFeedingItems } = useDaisyFeederContext();
  const todayFeedingData = optimisticFeedingItems.filter(
    (item) =>
      item.datetime.toISOString().slice(0, 10) ===
      new Date().toISOString().slice(0, 10)
  );

  return (
    <>
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
    </>
  );
};

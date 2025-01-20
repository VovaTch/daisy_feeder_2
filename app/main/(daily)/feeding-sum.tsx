"use client";

import OverallDryWetFood from "@/components/custom/overall-food-sum";
import { Separator } from "@/components/ui/separator";
import { useDaisyFeederContext } from "@/providers/context";

/**
 * FeedingSum component displays the summary of feeding activities for the current day.
 * It retrieves the feeding items from the DaisyFeederContext and filters them to show only today's feeding data.
 * If there are feeding records for today, it renders the OverallDryWetFood component with the feeding data.
 * Otherwise, it displays a message indicating that Daisy hasn't been fed today.
 *
 * @returns {JSX.Element} The JSX element representing the feeding summary.
 */
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

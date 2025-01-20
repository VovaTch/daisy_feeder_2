"use client";

import OverallDryWetFood from "@/components/custom/overall-food-sum";
import { Separator } from "@/components/ui/separator";
import { useDaisyFeederContext } from "@/providers/context";

type Props = {
  datetime: string;
};

/**
 * Component that displays the summary of feeding data for a specific date.
 *
 * @param {Props} props - The properties object.
 * @param {string} props.datetime - The date for which the feeding summary is displayed, in the format 'YYYY-MM-DD'.
 * @returns {JSX.Element} The rendered component.
 *
 * This component filters the feeding data based on the provided date and displays the overall dry and wet food summary.
 * If no feeding data is found for the specified date, it shows a message indicating that no food was logged.
 */
const HistoryFeedingSum = ({ datetime }: Props) => {
  const { optimisticFeedingItems } = useDaisyFeederContext();
  const dateFilteredFeedingData = optimisticFeedingItems.filter(
    (item) => item.datetime.toISOString().slice(0, 10) === datetime
  );
  return (
    <>
      <Separator orientation="horizontal" className="w-full" />
      {dateFilteredFeedingData.length > 0 ? (
        <OverallDryWetFood feedingData={dateFilteredFeedingData} />
      ) : (
        <div className="items-center justify-center flex flex-col ">
          <h1 className="text-xl font-bold text-orange-500 tracking-widest text-center pt-5">
            No food was logged at {datetime.slice(8, 10)}.{datetime.slice(5, 7)}
            .{datetime.slice(0, 4)}...
          </h1>
        </div>
      )}
    </>
  );
};

export default HistoryFeedingSum;

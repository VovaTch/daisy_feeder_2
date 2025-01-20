"use client";

import LargeFeedingCard from "@/components/custom/large-feeding-card";
import MobileFeedingCard from "@/components/custom/mobile-feeding-card";
import { useDaisyFeederContext } from "@/providers/context";

type Props = {
  datetime: string;
};

/**
 * Component that renders a list of feeding items filtered by a specific datetime.
 *
 * @component
 * @param {Props} props - The props object.
 * @param {string} props.datetime - The datetime string to filter feeding items.
 * @returns {JSX.Element} A JSX element containing the filtered feeding items.
 *
 * @example
 * // Usage example:
 * <HistoryFeedingList datetime="2023-10-01" />
 *
 * @remarks
 * This component uses the `useDaisyFeederContext` hook to retrieve the feeding items
 * and filters them based on the provided datetime. It renders two sets of feeding cards:
 * one for large screens and one for mobile screens.
 */
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

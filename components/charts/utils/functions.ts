import { PerBatchSumFood } from "@/components/custom/overall-food-sum";
import { FeedingItem } from "@/components/types/food-item";
import { DayRange, dayRangeMap } from "./types";

/**
 * Calculates the accumulated feeding data per day.
 *
 * @param feedingData - An array of FeedingItem objects containing feeding data.
 * @returns An array of objects, each containing the date, total amount of food, total dry food, and total wet food for that date.
 */
export const getAccumulatedPerDay = (feedingData: FeedingItem[]) => {
  const dates = feedingData.map((item) =>
    item.datetime.toISOString().slice(0, 10)
  );
  const uniqueDates = [...new Set(dates)];

  return uniqueDates.map((date) => {
    const totalDry = PerBatchSumFood({ feedingData, foodType: "dry", date });
    const totalWet = PerBatchSumFood({ feedingData, foodType: "wet", date });

    return {
      date,
      total: totalDry + totalWet,
      totalDry: totalDry,
      totalWet: totalWet,
    };
  });
};

/**
 * Filters the accumulated feeding data to include only the items within the specified day range.
 *
 * @param feedingData - An array of FeedingItem objects representing the feeding data.
 * @param dayRange - A DayRange enum value representing the range of days to filter the data.
 * @returns An array of accumulated feeding data items that fall within the specified day range.
 */
export const getAccumulatedPerDayRange = (
  feedingData: FeedingItem[],
  dayRange: DayRange
) => {
  const accumulatedPerDay = getAccumulatedPerDay(feedingData);
  return accumulatedPerDay.filter((item) => {
    const itemDate = new Date(item.date);
    const itemStartDate = new Date();
    itemStartDate.setDate(itemStartDate.getDate() - dayRangeMap[dayRange]);
    return itemDate >= itemStartDate && itemDate <= new Date();
  });
};

/**
 * Calculates the cumulative feeding data for each day within a specified range.
 *
 * @param feedingData - An array of feeding data items.
 * @param dayRange - The range of days to calculate the cumulative data for.
 * @returns An array of objects containing the cumulative feeding data for each day within the specified range.
 *
 */
export const getCumulatedPerDayRange = (
  feedingData: FeedingItem[],
  dayRange: DayRange
) => {
  const accumulatedPerDayRange = getAccumulatedPerDayRange(
    feedingData,
    dayRange
  );
  return accumulatedPerDayRange.map((item, index) => {
    const slicedChartData = accumulatedPerDayRange.slice(0, index + 1);
    return {
      date: item.date,
      total: slicedChartData.reduce((acc, curr) => acc + curr.total, 0),
      totalDry: slicedChartData.reduce((acc, curr) => acc + curr.totalDry, 0),
      totalWet: slicedChartData.reduce((acc, curr) => acc + curr.totalWet, 0),
    };
  });
};

/**
 * Calculates the total feeding amounts over a specified range of days.
 *
 * @param feedingData - An array of FeedingItem objects representing the feeding data.
 * @param dayRange - An object representing the range of days to calculate totals for.
 * @returns An object containing the total feeding amounts:
 *   - `total`: The total amount of feeding over the specified range.
 *   - `totalDry`: The total amount of dry feeding over the specified range.
 *   - `totalWet`: The total amount of wet feeding over the specified range.
 */
export const getTotalRange = (
  feedingData: FeedingItem[],
  dayRange: DayRange
) => {
  const accumulatedPerDayRange = getAccumulatedPerDayRange(
    feedingData,
    dayRange
  );
  return {
    total: accumulatedPerDayRange.reduce((acc, curr) => acc + curr.total, 0),
    totalDry: accumulatedPerDayRange.reduce(
      (acc, curr) => acc + curr.totalDry,
      0
    ),
    totalWet: accumulatedPerDayRange.reduce(
      (acc, curr) => acc + curr.totalWet,
      0
    ),
  };
};

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
 * Filters the feeding data to include only the items within the specified day range.
 *
 * @param feedingData - An array of FeedingItem objects to be filtered.
 * @param dayRange - The range of days to filter the feeding data by.
 * @returns An array of FeedingItem objects that fall within the specified day range.
 */
export const filterPerDayRange = (
  feedingData: FeedingItem[],
  dayRange: DayRange
) => {
  return feedingData.filter((item) => {
    const itemDate = new Date(item.datetime);
    const itemStartDate = new Date();
    itemStartDate.setDate(itemStartDate.getDate() - dayRangeMap[dayRange]);
    return itemDate >= itemStartDate && itemDate <= new Date();
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

/**
 * Generates a pseudo-random number generator function seeded with the given value.
 *
 * The returned function, when called, will produce a pseudo-random number between 0 (inclusive) and 1 (exclusive),
 * based on the initial seed. The sequence of numbers generated will be deterministic and repeatable for the same seed.
 *
 * @param seed - The initial seed value used to generate the pseudo-random number sequence.
 * @returns A function that generates a pseudo-random number between 0 (inclusive) and 1 (exclusive) each time it is called.
 */
function seededRandom(seed: number): () => number {
  let value = seed % 2147483647;
  if (value <= 0) value += 2147483646;

  return function () {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

/**
 * Generates a random RGB color string based on a seeded random number generator.
 *
 * @param index - The seed index used to generate the random color.
 * @returns A string representing the RGB color in the format `rgb(r, g, b)`.
 */
const getRandomRgb = (index: number) => {
  const randomSeed = seededRandom(index);
  const r = Math.floor(randomSeed() * 128);
  const g = Math.floor(randomSeed() * 128);
  const b = Math.floor(randomSeed() * 128);
  return `rgb(${r}, ${g}, ${b})`;
};

/**
 * Calculates the total amount of feed per feeder and assigns a random color to each feeder.
 *
 * @param feedingData - An array of FeedingItem objects containing feeding data.
 * @param feeders - An array of feeder names to calculate totals for.
 * @returns An array of objects, each containing the feeder name, total amount of feed, and a random fill color.
 */
export const getTotalPerFeeder = (
  feedingData: FeedingItem[],
  feeders: string[]
) => {
  return feeders.map((feeder, index) => {
    const total = feedingData
      .filter((item) => item.feeder === feeder)
      .reduce((acc, item) => acc + item.amount, 0);
    const color = getRandomRgb(index);
    return { feeder, total, fill: color };
  });
};

/**
 * Generates a histogram of feeding data by hour.
 *
 * @param filteredFeedingData - An array of feeding data items that have been filtered.
 * @param timeArray - An array of strings representing the hours to be included in the histogram.
 * @returns An array of objects, each containing the hour, total dry food amount, and total wet food amount.
 *
 * @example
 * const feedingData = [
 *   { datetime: new Date('2023-10-01T08:00:00'), foodType: 'dry', amount: 50 },
 *   { datetime: new Date('2023-10-01T08:30:00'), foodType: 'wet', amount: 30 },
 *   { datetime: new Date('2023-10-01T09:00:00'), foodType: 'dry', amount: 20 },
 * ];
 * const hours = ['08', '09', '10'];
 * const histogram = getHoursHistogram(feedingData, hours);
 * // histogram will be:
 * // [
 * //   { hour: '08', totalDry: 50, totalWet: 30 },
 * //   { hour: '09', totalDry: 20, totalWet: 0 },
 * //   { hour: '10', totalDry: 0, totalWet: 0 }
 * // ]
 */
export const getHoursHistogram = (
  filteredFeedingData: FeedingItem[],
  timeArray: string[]
) => {
  return timeArray.map((hour) => {
    const totalDry = filteredFeedingData
      .filter(
        (item) =>
          item.datetime.getHours().toString() === hour.slice(0, 2) &&
          item.foodType === "dry"
      )
      .reduce((acc, item) => acc + item.amount, 0);
    const totalWet = filteredFeedingData
      .filter(
        (item) =>
          item.datetime.getHours().toString() === hour.slice(0, 2) &&
          item.foodType === "wet"
      )
      .reduce((acc, item) => acc + item.amount, 0);
    return {
      hour,
      totalDry,
      totalWet,
    };
  });
};

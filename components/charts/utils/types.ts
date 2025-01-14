import { FeedingItem } from "@/components/types/food-item";

export type DayRange = "007" | "030" | "090" | "365" | "999";

export const dayRangeMap = {
  "007": 7,
  "030": 30,
  "090": 90,
  "365": 365,
  "999": Infinity,
} as const;

export type ChartProps = {
  feedingData: FeedingItem[];
  dayRange: "007" | "030" | "090" | "365" | "999";
};

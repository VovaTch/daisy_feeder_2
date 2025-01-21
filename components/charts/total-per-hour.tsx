"use client";

import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { FeedingItem } from "../types/food-item";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { filterPerDayRange, getHoursHistogram } from "./utils/functions";

const chartConfig = {
  totalDry: {
    label: "Dry Food",
    color: "red",
  },
  totalWet: {
    label: "Wet Food",
    color: "blue",
  },
} satisfies ChartConfig;

type DailyFoodLineChartProps = {
  feedingData: FeedingItem[];
  dayRange: "007" | "030" | "090" | "365" | "999";
};

/**
 * Generates an array of time strings representing each hour of the day in "HH:00" format.
 *
 * @returns {string[]} An array of 24 time strings, each representing an hour of the day.
 */
const generateTimeArray = () => {
  const timeArray = [];
  for (let idx = 0; idx < 24; idx++) {
    timeArray.push(`${idx.toString().padStart(2, "0")}:00`);
  }
  return timeArray;
};

const dayRangeMap = {
  "007": 7,
  "030": 30,
  "090": 90,
  "365": 365,
  "999": Infinity,
} as const; // TODO: remove duplications

/**
 * Component for rendering a daily stacked bar chart that visualizes feeding data per hour.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.feedingData - The array of feeding data objects.
 * @param {string} props.dayRange - The range of days to filter the feeding data.
 *
 * @returns {JSX.Element} The rendered DailyStackBarChart component.
 *
 * @example
 * <DailyStackBarChart feedingData={feedingData} dayRange="7" />
 */
const DailyStackBarChart = ({
  feedingData,
  dayRange,
}: DailyFoodLineChartProps) => {
  const timeArray = useMemo(generateTimeArray, []);
  const chartData = useMemo(
    () => filterPerDayRange(feedingData, dayRange),
    [feedingData, dayRange]
  );
  const hourHistogram = useMemo(
    () => getHoursHistogram(chartData, timeArray),
    [chartData, timeArray]
  );

  return (
    <Card className="m-5 bg-white">
      <CardHeader>
        <CardTitle className="lg:text-2xl text-base">
          Per Hour Feeding
        </CardTitle>
        <CardDescription>
          Per hour feeding
          {dayRange !== "999"
            ? ` for the last ${dayRangeMap[dayRange]} days`
            : ""}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={hourHistogram}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="hour"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="totalDry" stackId="a" fill="var(--color-totalDry)" />
            <Bar dataKey="totalWet" stackId="a" fill="var(--color-totalWet)" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default DailyStackBarChart;

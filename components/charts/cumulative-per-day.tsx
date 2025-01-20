"use client";

import { useMemo, useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { getCumulatedPerDayRange, getTotalRange } from "./utils/functions";
import { ChartProps, dayRangeMap } from "./utils/types";

const chartConfig = {
  total: {
    label: "Total amount",
    color: "green",
  },
  totalDry: {
    label: "Total dry food",
    color: "red",
  },
  totalWet: {
    label: "Total wet food",
    color: "blue",
  },
} satisfies ChartConfig;

/**
 * Component for rendering a daily cumulative food line chart.
 *
 * @param {ChartProps} props - The properties for the chart component.
 * @param {Array} props.feedingData - The feeding data to be displayed in the chart.
 * @param {string} props.dayRange - The range of days for which the data is displayed.
 *
 * @returns {JSX.Element} The rendered DailyCumulativeFoodLineChart component.
 *
 * @component
 * @example
 * const feedingData = [
 *   { date: '2023-01-01', total: 100, totalDry: 50, totalWet: 50 },
 *   { date: '2023-01-02', total: 150, totalDry: 75, totalWet: 75 },
 *   // more data
 * ];
 * const dayRange = '30';
 * return <DailyCumulativeFoodLineChart feedingData={feedingData} dayRange={dayRange} />;
 */
const DailyCumulativeFoodLineChart = ({
  feedingData,
  dayRange,
}: ChartProps) => {
  const [activeChart, setActiveChart] =
    useState<keyof typeof chartConfig>("total");
  const cumulativeData = useMemo(
    () => getCumulatedPerDayRange(feedingData, dayRange),
    [feedingData, dayRange]
  );
  const total = useMemo(
    () => getTotalRange(feedingData, dayRange),
    [feedingData, dayRange]
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle className="flex flex-row">Cumulative Feeding</CardTitle>
          <CardDescription>
            Total food
            {dayRange === "999"
              ? ""
              : ` for the last ${dayRangeMap[dayRange]} days`}
          </CardDescription>
        </div>
        <div className="flex justify-evenly">
          {["total", "totalDry", "totalWet"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <Button
                variant={activeChart === chart ? "sidebarOutline" : "sidebar"}
                className="text-xs h-full w-full hover:scale-110 transition flex flex-col"
                key={chart}
                data-active={activeChart === chart}
                onClick={() => setActiveChart(chart)}
              >
                <h4>{chartConfig[chart].label}</h4>
                <h1 className="text-slate-700 text-lg">{total[chart]}</h1>
              </Button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={cumulativeData}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={true} horizontal={true} />
            <XAxis
              dataKey={"date"}
              tickLine={false}
              axisLine={false}
              tickMargin={8} // TODO: make it dynamic depending on the amounts of days to count back
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="amount"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default DailyCumulativeFoodLineChart;

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
import { ChartProps, dayRangeMap } from "./utils/types";
import { getAccumulatedPerDayRange, getTotalRange } from "./utils/functions";

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
 * DailyFoodLineChart component renders a line chart displaying the total amount of food consumed per day
 * over a specified range of days. It allows toggling between different types of food totals (total, totalDry, totalWet).
 *
 * @param {ChartProps} props - The properties object.
 * @param {Array} props.feedingData - The data representing the feeding records.
 * @param {string} props.dayRange - The range of days to display in the chart.
 *
 * @returns {JSX.Element} The rendered DailyFoodLineChart component.
 */
const DailyFoodLineChart = ({ feedingData, dayRange }: ChartProps) => {
  const [activeChart, setActiveChart] =
    useState<keyof typeof chartConfig>("total");
  const chartData = useMemo(
    () => getAccumulatedPerDayRange(feedingData, dayRange),
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
          <CardTitle className="flex flex-row">Feeding Chart</CardTitle>
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
            data={chartData}
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

export default DailyFoodLineChart;

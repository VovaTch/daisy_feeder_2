"use client";

import { useState } from "react";
import { PerBatchSumFood } from "../custom/overall-food-sum";
import { FeedingItem } from "../types/food-item";
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
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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

const dayRangeMap = {
  "007": 7,
  "030": 30,
  "090": 90,
  "365": 365,
  "999": Infinity,
} as const;

type DailyCumulativeFoodLineChartProps = {
  feedingData: FeedingItem[];
  dayRange: "007" | "030" | "090" | "365" | "999";
};

// TODO: use useMemo?
// TODO: remove duplications
const DailyCumulativeFoodLineChart = ({
  feedingData,
  dayRange,
}: DailyCumulativeFoodLineChartProps) => {
  const dates = feedingData.map((item) =>
    item.datetime.toISOString().slice(0, 10)
  );
  const uniqueDates = [...new Set(dates)];
  const [activeChart, setActiveChart] =
    useState<keyof typeof chartConfig>("total");

  const chartDataAll = uniqueDates.map((date) => {
    const totalDry = PerBatchSumFood({ feedingData, foodType: "dry", date });
    const totalWet = PerBatchSumFood({ feedingData, foodType: "wet", date });

    return {
      date,
      total: totalDry + totalWet,
      totalDry: totalDry,
      totalWet: totalWet,
    };
  });

  const chartData = chartDataAll.filter((item) => {
    const itemDate = new Date(item.date);
    const itemStartDate = new Date();
    itemStartDate.setDate(itemStartDate.getDate() - dayRangeMap[dayRange]);
    return itemDate >= itemStartDate && itemDate <= new Date();
  });

  const cumulativeData = chartData.map((item, index) => {
    const slicedChartData = chartData.slice(0, index + 1);
    return {
      date: item.date,
      total: slicedChartData.reduce((acc, curr) => acc + curr.total, 0),
      totalDry: slicedChartData.reduce((acc, curr) => acc + curr.totalDry, 0),
      totalWet: slicedChartData.reduce((acc, curr) => acc + curr.totalWet, 0),
    };
  });

  const total = {
    total: chartData.reduce((acc, curr) => acc + curr.total, 0),
    totalDry: chartData.reduce((acc, curr) => acc + curr.totalDry, 0),
    totalWet: chartData.reduce((acc, curr) => acc + curr.totalWet, 0),
  };

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

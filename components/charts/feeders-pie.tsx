"use client";

import { useState } from "react";
import { FeedingItem } from "../types/food-item";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

const dayRangeMap = {
  "007": 7,
  "030": 30,
  "090": 90,
  "365": 365,
  "999": Infinity,
} as const; // TODO: remove duplications

const getRandomRgb = (index: number) => {
  const randomSeed = seededRandom(index);
  const r = Math.floor(randomSeed() * 128);
  const g = Math.floor(randomSeed() * 128);
  const b = Math.floor(randomSeed() * 128);
  return `rgb(${r}, ${g}, ${b})`;
};

function seededRandom(seed: number): () => number {
  let value = seed % 2147483647;
  if (value <= 0) value += 2147483646;

  return function () {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

type FeedersPieChartProps = {
  feedingData: FeedingItem[];
  dayRange: "007" | "030" | "090" | "365" | "999";
};

// TODO: use useMemo?
const FeedersPieChart = ({ feedingData, dayRange }: FeedersPieChartProps) => {
  const [selectedFeeder, setSelectedFeeder] = useState<string>(
    feedingData.length > 0 ? feedingData[0].feeder : ""
  );

  const chartData = feedingData.filter((item) => {
    const itemDate = new Date(item.datetime);
    const itemStartDate = new Date();
    itemStartDate.setDate(itemStartDate.getDate() - dayRangeMap[dayRange]);
    return itemDate >= itemStartDate && itemDate <= new Date();
  });

  const feeders = chartData.map((item) => item.feeder);
  const uniqueFeeders = [...new Set(feeders)];

  const selectedIndex = uniqueFeeders.indexOf(selectedFeeder);

  const totals = uniqueFeeders.map((feeder, index) => {
    const total = chartData
      .filter((item) => item.feeder === feeder)
      .reduce((acc, item) => acc + item.amount, 0);
    const color = getRandomRgb(index);
    return { feeder, total, fill: color };
  });

  const chartConfig = {
    total: {
      label: "Total",
    },
    ...totals.reduce(
      (acc, { feeder, fill }) => {
        acc[feeder.toLowerCase()] = { label: feeder, color: fill };
        return acc;
      },
      {} as Record<string, { label: string; color: string }>
    ),
  };

  return (
    <Card data-chart={"feeders-pie-chart"} className="flex flex-col">
      <ChartStyle id={"feeders-pie-chart"} config={chartConfig} />
      <CardHeader className="flex-row item-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>Feeders Distribution</CardTitle>
          <CardDescription>
            Total food per feeder
            {dayRange === "999"
              ? ""
              : ` for the last ${dayRangeMap[dayRange]} days`}
          </CardDescription>
        </div>
        <Select value={selectedFeeder} onValueChange={setSelectedFeeder}>
          <SelectTrigger
            className="ml-auto h-7 w-[200px] rounded-lg pl-2.5"
            aria-label="Select a feeder"
          >
            <SelectValue placeholder="Select a feeder" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {uniqueFeeders.map((feeder) => {
              const config =
                chartConfig[feeder.toLowerCase() as keyof typeof chartConfig];

              if (!config) {
                return null;
              }

              const color = totals.find((item) => item.feeder === feeder)?.fill;
              return (
                <SelectItem
                  key={feeder}
                  value={feeder}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-sm"
                      style={{ backgroundColor: color }}
                    />
                    {config?.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer
          id={"feeders-pie-chart"}
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[300px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={totals}
              dataKey="total"
              nameKey="feeder"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={selectedIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totals[selectedIndex].total.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Food Amount
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default FeedersPieChart;

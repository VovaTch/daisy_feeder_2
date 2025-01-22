"use client";

import { useMemo, useState } from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

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
import { filterPerDayRange, getTotalPerFeeder } from "./utils/functions";
import { ChartProps, DayRange, dayRangeMap } from "./utils/types";

/**
 * Processes feeding data to generate chart data for a specific feeder within a given day range.
 *
 * @param {FeedingItem[]} feedingData - The array of feeding data items.
 * @param {DayRange} dayRange - The range of days to filter the feeding data.
 * @param {string} selectedFeeder - The feeder to be highlighted in the chart data.
 * @returns {Object} An object containing:
 *   - uniqueFeeders: An array of unique feeder names.
 *   - selectedIndex: The index of the selected feeder in the uniqueFeeders array.
 *   - totals: An array of total feeding amounts per feeder.
 */
const getPerFeederData = (
  feedingData: FeedingItem[],
  dayRange: DayRange,
  selectedFeeder: string
) => {
  const chartData = filterPerDayRange(feedingData, dayRange);
  const feeders = chartData.map((item) => item.feeder);
  const uniqueFeeders = [...new Set(feeders)];
  const selectedIndex = uniqueFeeders.indexOf(selectedFeeder);
  const totals = getTotalPerFeeder(chartData, uniqueFeeders);
  return { uniqueFeeders, selectedIndex, totals };
};

/**
 * Reduces an array of totals into an object where the keys are the feeder names in lowercase,
 * and the values are objects containing the label (original feeder name) and color (fill).
 *
 * @param totals - An array of objects, each containing:
 *   - `feeder`: The name of the feeder.
 *   - `total`: The total value associated with the feeder (not used in this function).
 *   - `fill`: The color associated with the feeder.
 * @returns An object where each key is a feeder name in lowercase, and each value is an object
 * containing the original feeder name as `label` and the associated color as `color`.
 */
const reduceTotals = (
  totals: { feeder: string; total: number; fill: string }[]
) => {
  return totals.reduce(
    (acc, { feeder, fill }) => {
      acc[feeder.toLowerCase()] = { label: feeder, color: fill };
      return acc;
    },
    {} as Record<string, { label: string; color: string }>
  );
};

/**
 * FeedersPieChart component renders a pie chart displaying the distribution of food per feeder.
 *
 * @param {ChartProps} props - The properties for the FeedersPieChart component.
 * @param {Array} props.feedingData - An array of feeding data objects.
 * @param {string} props.dayRange - The range of days for which the data is displayed.
 *
 * @returns {JSX.Element} The rendered FeedersPieChart component.
 *
 * @component
 * @example
 * const feedingData = [
 *   { feeder: 'Feeder1', total: 100 },
 *   { feeder: 'Feeder2', total: 150 },
 * ];
 * const dayRange = '30';
 *
 * <FeedersPieChart feedingData={feedingData} dayRange={dayRange} />
 */
const FeedersPieChart = ({ feedingData, dayRange }: ChartProps) => {
  const [selectedFeeder, setSelectedFeeder] = useState<string>(
    feedingData.length > 0 ? feedingData[0].feeder : ""
  );

  const { uniqueFeeders, selectedIndex, totals } = useMemo(
    () => getPerFeederData(feedingData, dayRange, selectedFeeder),
    [feedingData, dayRange, selectedFeeder]
  );

  const reducedTotals = useMemo(() => reduceTotals(totals), [totals]);

  const chartConfig = {
    total: {
      label: "Total",
    },
    ...reducedTotals,
  };

  return (
    <Card data-chart={"feeders-pie-chart"} className="m-5 bg-white">
      <ChartStyle id={"feeders-pie-chart"} config={chartConfig} />
      <CardHeader className="flex-row item-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle className="lg:text-2xl text-base">
            Feeders Distribution
          </CardTitle>
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
      <CardContent className="h-[250px] sm:p-6 rounded-sm">
        <ChartContainer
          id={"feeders-pie-chart"}
          config={chartConfig}
          className="aspect-square h-full w-full"
        >
          <PieChart className="h-full w-full">
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

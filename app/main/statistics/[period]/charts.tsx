"use client";

import DaisyChartContainer from "@/components/charts/chart-container";
import DailyCumulativeFoodLineChart from "@/components/charts/cumulative-per-day";
import FeedersPieChart from "@/components/charts/feeders-pie";
import DailyFoodLineChart from "@/components/charts/total-per-day";
import DailyStackBarChart from "@/components/charts/total-per-hour";
import { useDaisyFeederContext } from "@/providers/context";

type Props = {
  period: "007" | "030" | "090" | "365" | "999";
};

const StatisticsCharts = ({ period }: Props) => {
  const { optimisticFeedingItems } = useDaisyFeederContext();

  return (
    <>
      <DaisyChartContainer>
        <DailyFoodLineChart
          feedingData={optimisticFeedingItems}
          dayRange={period}
        />
      </DaisyChartContainer>
      <DaisyChartContainer>
        <DailyCumulativeFoodLineChart
          feedingData={optimisticFeedingItems}
          dayRange={period}
        />
      </DaisyChartContainer>
      <DaisyChartContainer>
        <FeedersPieChart
          feedingData={optimisticFeedingItems}
          dayRange={period}
        />
      </DaisyChartContainer>
      <DaisyChartContainer>
        <DailyStackBarChart
          feedingData={optimisticFeedingItems}
          dayRange={period}
        />
      </DaisyChartContainer>
    </>
  );
};

export default StatisticsCharts;

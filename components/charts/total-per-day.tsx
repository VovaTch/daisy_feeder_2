import { PerBatchSumFood } from "../custom/overall-food-sum";
import { FeedingItem } from "../types/food-item";
import { ChartConfig } from "../ui/chart";

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

type DailyFoodLineChartProps = {
  feedingData: FeedingItem[];
};

const DailyFoodLineChart = ({ feedingData }: DailyFoodLineChartProps) => {
  const dates = feedingData.map((item) =>
    item.datetime.toISOString().slice(0, 10)
  );
  const uniqueDates = [...new Set(dates)];

  const chartData = uniqueDates.map((date) => {
    const totalDry = PerBatchSumFood({ feedingData, foodType: "dry", date });
    const totalWet = PerBatchSumFood({ feedingData, foodType: "wet", date });

    return {
      date,
      total: totalDry + totalWet,
      totalDry: totalDry,
      totalWet: totalWet,
    };
  });

  // TODO: continue
};

export default DailyFoodLineChart;

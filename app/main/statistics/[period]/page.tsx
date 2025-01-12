import { DummyData } from "@/api/dummy-data";
import DaisyChartContainer from "@/components/charts/chart-container";
import { ChartBarExample } from "@/components/charts/bar-example";
import { FeedingItem } from "@/components/types/food-item";
import { ChartLineExample } from "@/components/charts/line-example";
import DailyFoodLineChart from "@/components/charts/total-per-day";

type StatisticsPageProps = {
  params: {
    period: "007" | "030" | "090" | "365" | "999";
  };
};

const StatisticsPage = async ({ params }: StatisticsPageProps) => {
  const { period } = await params;
  const feedingData: FeedingItem[] = DummyData; // TODO: set real data when ready
  return (
    <div
      className="flex flex-wrap flex-row absolute w-full lg:h-[calc(100vh-160px)] h-[calc(100vh-210px)] overflow-y-auto content-start
    items-start justify-start"
    >
      <DaisyChartContainer>
        <ChartBarExample />
      </DaisyChartContainer>
      <DaisyChartContainer>
        <ChartLineExample />
      </DaisyChartContainer>
      <DaisyChartContainer>
        <DailyFoodLineChart feedingData={feedingData} dayRange={period} />
      </DaisyChartContainer>
      <div className="lg:h-[28vw] lg:w-[28vw] h-[100vw] w-[100vw] m-5 bg-white rounded-sm"></div>
    </div>
  );
};

export default StatisticsPage;

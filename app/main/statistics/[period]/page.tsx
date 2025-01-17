import DaisyChartContainer from "@/components/charts/chart-container";
import { FeedingItem } from "@/components/types/food-item";
import DailyFoodLineChart from "@/components/charts/total-per-day";
import FeedersPieChart from "@/components/charts/feeders-pie";
import DailyStackBarChart from "@/components/charts/total-per-hour";
import DailyCumulativeFoodLineChart from "@/components/charts/cumulative-per-day";
import { auth } from "@clerk/nextjs/server";
import { getFeedingItems } from "@/db/queries";

type StatisticsPageProps = {
  params: {
    period: "007" | "030" | "090" | "365" | "999";
  };
};

const StatisticsPage = async ({ params }: StatisticsPageProps) => {
  const { period } = await params;
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  const feedingData: FeedingItem[] = await getFeedingItems(userId);

  return (
    <div
      className="flex flex-wrap flex-row absolute w-full lg:h-[calc(100vh-160px)] h-[calc(100vh-210px)] overflow-y-auto content-start
    items-start justify-start"
    >
      <DaisyChartContainer>
        <DailyFoodLineChart feedingData={feedingData} dayRange={period} />
      </DaisyChartContainer>
      <DaisyChartContainer>
        <DailyCumulativeFoodLineChart
          feedingData={feedingData}
          dayRange={period}
        />
      </DaisyChartContainer>
      <DaisyChartContainer>
        <FeedersPieChart feedingData={feedingData} dayRange={period} />
      </DaisyChartContainer>
      <DaisyChartContainer>
        <DailyStackBarChart feedingData={feedingData} dayRange={period} />
      </DaisyChartContainer>
    </div>
  );
};

export default StatisticsPage;

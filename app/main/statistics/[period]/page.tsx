import StatisticsCharts from "./charts";

type StatisticsPageProps = {
  params: {
    period: "007" | "030" | "090" | "365" | "999";
  };
};

const StatisticsPage = ({ params }: StatisticsPageProps) => {
  const { period } = params;

  return (
    <div
      className="flex flex-wrap flex-row absolute w-full lg:h-[calc(100vh-160px)] h-[calc(100vh-210px)] overflow-y-auto content-start
    items-start justify-start"
    >
      <StatisticsCharts period={period} />
    </div>
  );
};

export default StatisticsPage;

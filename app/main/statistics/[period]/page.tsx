import StatisticsCharts from "./charts";

type PeriodEnum = "007" | "030" | "090" | "365" | "999";
type StatisticsPageProps = {
  params: Promise<{ period: PeriodEnum }> & {
    period: PeriodEnum;
  };
};

/**
 * A React component that renders the statistics page for a given period.
 *
 * @param {StatisticsPageProps} props - The props for the StatisticsPage component.
 * @param {Object} props.params - The parameters passed to the page.
 * @param {string} props.params.period - The period for which the statistics are displayed.
 *
 * @returns {JSX.Element} The rendered statistics page component.
 */
const StatisticsPage = async ({ params }: StatisticsPageProps) => {
  const resolveParams = await params;
  const { period } = resolveParams;

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

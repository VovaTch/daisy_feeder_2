import { Loader } from "lucide-react";

/**
 * PeriodStatsLoadingPage component renders a centered loading spinner.
 *
 * This component uses Tailwind CSS classes to center a spinning loader
 * both vertically and horizontally within a flex container.
 *
 * @returns {JSX.Element} A div containing a spinning loader.
 */
const PeriodStatsLoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Loader className="lg:h-[260px] lg:w-[260px] h-[120px] w-[120px] text-orange-500 bg-white rounded-full p-5 animate-spin" />
    </div>
  );
};

export default PeriodStatsLoadingPage;

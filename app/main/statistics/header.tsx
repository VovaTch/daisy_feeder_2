import { ChartNoAxesCombined } from "lucide-react";
import PeriodPicker from "./period-picker";

/**
 * StatisticsHeader component renders the header section for the statistics page.
 * It includes a title, an icon, and a period picker.
 *
 * @returns {JSX.Element} The rendered header component.
 */
const StatisticsHeader = () => {
  return (
    <div
      className="relative flex flex-col top-0 left-0 w-full  items-center text-center h-[160px]
    text-white bg-orange-500/80 justify-evenly"
    >
      <div className="h-[100px] flex flex-row items-center justify-center w-full">
        <ChartNoAxesCombined className="h-[40px] w-[40px]" />
        <h1 className="lg:text-4xl text-2xl">Statistics</h1>
      </div>
      <PeriodPicker />
    </div>
  );
};

export default StatisticsHeader;

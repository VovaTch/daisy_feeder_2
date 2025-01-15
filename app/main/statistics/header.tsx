import { ChartNoAxesCombined } from "lucide-react";
import PeriodPicker from "./period-picker";

const StatisticsHeader = () => {
  return (
    <div
      className="relative flex flex-col top-0 left-0 w-full  items-center text-center h-[160px]
    text-white bg-orange-500/80 justify-evenly"
    >
      <div className="h-[100px] flex flex-row items-center justify-center w-full">
        <ChartNoAxesCombined className="h-[40px] w-[40px]" />
        <h1 className="text-4xl">Statistics</h1>
      </div>
      <PeriodPicker />
    </div>
  );
};

export default StatisticsHeader;

import { History } from "lucide-react";
import { DatePicker } from "./date-picker";

/**
 * HistoryHeader component renders the header section for the feeding history page.
 * It includes a title and a date picker.
 *
 * @returns {JSX.Element} The rendered header component.
 */
const HistoryHeader = () => {
  return (
    <div
      className="relative flex flex-row top-0 left-0 w-full  items-center text-center h-20
    text-white bg-orange-500/80 justify-evenly"
    >
      <div className="flex flex-row">
        <History className="h-[40px] w-[40px]" />
        <h1 className="lg:text-4xl text-2xl">Feeding History</h1>
      </div>
      <DatePicker />
    </div>
  );
};

export default HistoryHeader;

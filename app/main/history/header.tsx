import { DatePicker } from "./date-picker";

const HistoryHeader = () => {
  return (
    <div
      className="relative flex flex-row top-0 left-0 w-full  items-center text-center h-20
    text-white bg-orange-500/80 justify-evenly"
    >
      <h1 className="lg:text-4xl text-2xl">Feeding History</h1>
      <DatePicker />
    </div>
  );
};

export default HistoryHeader;

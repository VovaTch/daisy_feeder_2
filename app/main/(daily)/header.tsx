import { Beef } from "lucide-react";

const DailyHeader = () => {
  return (
    <header
      className="flex flex-row absolute top-0 left-0 w-full  items-center justify-center text-center h-20 text-4xl
    text-white bg-orange-500/80"
    >
      <Beef className="h-[40px] w-[40px]" />
      <h1> Today&apos;s Feeding</h1>
    </header>
  );
};

export default DailyHeader;

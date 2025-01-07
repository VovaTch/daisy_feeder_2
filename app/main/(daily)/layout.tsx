import { Separator } from "@/components/ui/separator";
import DailyFooter from "./footer";
import DailyHeader from "./header";

type Props = {
  children: React.ReactNode;
};

const DailyLayout = ({ children }: Props) => {
  return (
    <div className="items-center justify-center">
      <DailyHeader />
      {/* <Separator orientation="horizontal" className="absolute w-full top-20" /> */}
      {children}
      <Separator
        orientation="horizontal"
        className="absolute w-full bottom-20"
      />
      <DailyFooter />
    </div>
  );
};

export default DailyLayout;

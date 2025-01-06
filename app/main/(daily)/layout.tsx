import DailyFooter from "./footer";
import DailyHeader from "./header";

type Props = {
  children: React.ReactNode;
};

const DailyLayout = ({ children }: Props) => {
  return (
    <div className="items-center justify-center">
      <DailyHeader />
      {children}
      <DailyFooter />
    </div>
  );
};

export default DailyLayout;

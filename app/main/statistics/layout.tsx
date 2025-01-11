import StatisticsHeader from "./header";

type StatisticsProps = {
  children: React.ReactNode;
};

const StatisticsLayout = ({ children }: StatisticsProps) => {
  return (
    <div className="items-center justify-center">
      <StatisticsHeader />
      {children}
    </div>
  );
};

export default StatisticsLayout;

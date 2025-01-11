import HistoryHeader from "./header";

type HistoryProps = {
  children: React.ReactNode;
};

const HistoryLayout = ({ children }: HistoryProps) => {
  return (
    <div className="items-center justify-center bg-green-500/50">
      <HistoryHeader />
      {children}
    </div>
  );
};

export default HistoryLayout;

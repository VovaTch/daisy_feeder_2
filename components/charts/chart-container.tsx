type Props = {
  children: React.ReactNode;
};

const DaisyChartContainer = ({ children }: Props) => {
  return (
    <div className="lg:h-[28vw] lg:w-[28vw] h-[100vw] w-[100vw] m-5 bg-white rounded-sm">
      {children}
    </div>
  );
};

export default DaisyChartContainer;

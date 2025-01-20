import StatisticsHeader from "./header";

type StatisticsProps = {
  children: React.ReactNode;
};

/**
 * A layout component for the statistics page.
 *
 * @param {StatisticsProps} props - The properties for the StatisticsLayout component.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 *
 * @returns {JSX.Element} The rendered layout component with a header and children.
 */
const StatisticsLayout = ({ children }: StatisticsProps) => {
  return (
    <div className="items-center justify-center">
      <StatisticsHeader />
      {children}
    </div>
  );
};

export default StatisticsLayout;

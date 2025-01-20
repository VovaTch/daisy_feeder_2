import HistoryHeader from "./header";

type HistoryProps = {
  children: React.ReactNode;
};

/**
 * HistoryLayout component
 *
 * This component serves as a layout wrapper for the history section of the application.
 * It centers its children both vertically and horizontally and includes a HistoryHeader component.
 *
 * @param {HistoryProps} props - The properties passed to the HistoryLayout component.
 * @param {React.ReactNode} props.children - The child elements to be rendered within the layout.
 *
 * @returns {JSX.Element} The rendered HistoryLayout component.
 */
const HistoryLayout = ({ children }: HistoryProps) => {
  return (
    <div className="items-center justify-center">
      <HistoryHeader />
      {children}
    </div>
  );
};

export default HistoryLayout;

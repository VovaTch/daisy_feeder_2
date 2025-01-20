import DailyFooter from "./footer";
import DailyHeader from "./header";

type Props = {
  children: React.ReactNode;
};

/**
 * DailyLayout component that provides a layout structure for daily pages.
 * It includes a header, footer, and renders the children components in between.
 *
 * @param {Props} props - The props object containing children components.
 * @param {React.ReactNode} props.children - The children components to be rendered within the layout.
 * @returns {JSX.Element} The rendered layout with header, children, and footer.
 */
const DailyLayout = ({ children }: Props) => {
  return (
    <div className="items-center justify-center">
      <DailyHeader key={"header"} />
      {children}
      <DailyFooter key={"footer"} />
    </div>
  );
};

export default DailyLayout;

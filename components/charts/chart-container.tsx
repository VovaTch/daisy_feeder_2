type Props = {
  children: React.ReactNode;
};

/**
 * DaisyChartContainer is a functional component that serves as a container for chart components.
 * It provides a responsive design with specific height and width settings for different screen sizes.
 *
 * @param {Props} props - The properties object.
 * @param {React.ReactNode} props.children - The child components to be rendered within the container.
 *
 * @returns {JSX.Element} A div element with responsive height and width, margin, background color, and rounded corners.
 */
const DaisyChartContainer = ({ children }: Props) => {
  return (
    <div className="lg:h-[28vw] lg:w-[28vw] h-[100vw] w-[100vw] m-5 bg-white rounded-sm">
      {children}
    </div>
  );
};

export default DaisyChartContainer;

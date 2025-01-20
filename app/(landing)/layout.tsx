import { Footer } from "./footer";
import { Header } from "./header";

type Props = {
  children: React.ReactNode;
};

/**
 * LandingLayout component that provides a layout structure for the landing page.
 * It includes a header, a main content area, and a footer.
 * The background image is set to a specific URL and the main content area has a semi-transparent orange background.
 *
 * @param {Props} props - The properties object.
 * @param {React.ReactNode} props.children - The child components to be rendered within the main content area.
 * @returns {JSX.Element} The rendered LandingLayout component.
 */
const LandingLayout = ({ children }: Props) => {
  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/daisy_splash_2.jpg')",
      }}
    >
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center bg-orange-400/50">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default LandingLayout;

import { Footer } from "./footer";
import { Header } from "./header";

type Props = {
  children: React.ReactNode;
};

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

import { MobileHeader } from "@/components/custom/mobile-header";
import { Sidebar } from "@/components/custom/sidebar";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <div>
      <MobileHeader />
      <Sidebar className="hidden lg:flex bg-orange-200/90 bg-blend-overlay bg-[url('/images/daisy-drawer.jpg')]" />
      {children}
    </div>
  );
};

export default MainLayout;

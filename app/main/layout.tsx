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
      <main className="lg:pl-[350px] lg:pt-0 pt-[50px]">
        <div className="bg-cover bg-center lg:h-screen h-[calc(100vh-50px)] bg-orange-100/50 bg-blend-overlay bg-[url('/images/daisy-main.jpg')]">
          <div className="max-w-[1200px] mx-auto relative h-full justify-between my-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainLayout;

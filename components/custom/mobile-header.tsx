import { cn } from "@/lib/utils";

import { MobileSidebar } from "./mobile-sidebar";

type props = {
  className?: string;
};

/**
 * MobileHeader component renders a navigation bar for mobile devices.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.className - Additional class names to apply to the navigation bar.
 *
 * @returns {JSX.Element} The rendered navigation bar component.
 */
export const MobileHeader = ({ className }: props) => {
  return (
    <nav
      className={cn(
        "lg:hidden px-4 h-[50px] flex-center bg-orange-500 fixed top-0 w-full z-50 text-white flex",
        className
      )}
    >
      <MobileSidebar />
    </nav>
  );
};

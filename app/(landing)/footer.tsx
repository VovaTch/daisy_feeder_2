import { Beef, ChartNoAxesCombined, History, Share2 } from "lucide-react";

import { Separator } from "@/components/ui/separator";

/**
 * Footer component that displays various sections with icons and text.
 *
 * The footer is hidden on small screens and displayed on large screens.
 * It contains four sections:
 * - Daily Intakes: Displays an icon and text for daily intakes.
 * - Statistics: Displays an icon and text for statistics.
 * - Feeding History: Displays an icon and text for feeding history.
 * - Share Feeding Info With Friends!: Displays an icon and text for sharing feeding information.
 *
 * Each section is separated by a vertical separator.
 *
 * @returns {JSX.Element} The rendered footer component.
 */
export const Footer = () => {
  return (
    <footer
      className="hidden lg:flex h-20 max-h-20 w-full border-t-2 border-orange-100 p-2 bg-orange-400/80 text-white text-xl\
    items-center justify-evenly lg:flex-1 text-xl "
    >
      <div className="flex flex-1 items-center justify-center gap-x-5">
        <Beef />
        <p>Daily Intakes</p>
      </div>
      <Separator orientation="vertical" className="h-10" />
      <div className="flex flex-1 items-center justify-center gap-x-5">
        <ChartNoAxesCombined />
        <p>Statistics</p>
      </div>
      <Separator orientation="vertical" className="h-10" />
      <div className="flex flex-1 items-center justify-center gap-x-5">
        <History />
        <p>Feeding History</p>
      </div>
      <Separator orientation="vertical" className="h-10" />
      <div className="flex flex-1 items-center justify-center gap-x-5">
        <Share2 />
        <p>Share Feeding Info With Friends!</p>
      </div>
    </footer>
  );
};

"use client";

import { Menu } from "lucide-react";
import { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Sidebar } from "./sidebar";

/**
 * MobileSidebar component renders a sidebar that can be toggled open or closed.
 *
 * @returns {JSX.Element} The rendered mobile sidebar component.
 *
 * @component
 *
 * @example
 * // Usage example:
 * <MobileSidebar />
 *
 * @remarks
 * This component uses the `Sheet`, `SheetTrigger`, `SheetContent`, and `SheetTitle` components
 * to create a sidebar that slides in from the left. The sidebar contains a title and a `Sidebar` component.
 * The `open` state is used to control the visibility of the sidebar.
 *
 * @see {@link https://example.com/docs/sheet} for more information on the `Sheet` component.
 */
export const MobileSidebar = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Menu className="text-white" />
      </SheetTrigger>
      <SheetContent className="p-0 z-[100] w-[256px] bg-orange-300" side="left">
        <SheetTitle className="px-5 py-5 text-white text-2xl font-bold tracking-wider pt-[50px]">
          Daisy Feeder 2
        </SheetTitle>
        <Sidebar onPress={setOpen} />
      </SheetContent>
    </Sheet>
  );
};

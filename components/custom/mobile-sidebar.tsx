"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Sidebar } from "./sidebar";

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

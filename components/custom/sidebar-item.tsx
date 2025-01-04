"use client";

import Link from "next/link";
import { Button } from "../ui/button";

type SidebarItemProps = {
  icon: React.ReactNode;
  text: string;
  href: string;
  onPress: (open: boolean) => void;
};

export const SidebarItem = ({
  icon,
  text,
  href,
  onPress,
}: SidebarItemProps) => {
  return (
    <Link href={href}>
      <div className="flex items-center gap-x-4 cursor-pointer text-xl transition hover:scale-110">
        <Button
          variant="sidebar"
          size={"lg"}
          className="w-full flex flex-1 justify-start py-12 active:bg-amber-300 active:transition-colors"
          onClick={() => onPress(false)}
        >
          {icon}
          {text}
        </Button>
      </div>
    </Link>
  );
};

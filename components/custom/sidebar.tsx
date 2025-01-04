"use client";

import { cn } from "@/lib/utils";
import { Beef, ChartNoAxesCombined, History, Settings } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import Image from "next/image";
import Link from "next/link";
import { ClerkLoading, ClerkLoaded, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";

type SidebarProps = {
  className?: string;
  onPress?: (open: boolean) => void;
};

export const Sidebar = ({ className, onPress }: SidebarProps) => {
  return (
    <div
      className={cn(
        "h-full lg:w-[350px] lg:fixed flex flex-col lg:pt-10 pt-0 left-0 top-0 bg-cover bg-center ",
        className
      )}
    >
      <Link href="/main">
        <div className="flex items-center gap-x-3 px-10 lg:px-0 pb-10">
          <Image
            src="/images/daisy-hexagon.png"
            alt="Daisy Feeder 2"
            width={100}
            height={100}
          />
          <h1 className="text-white lg:text-2xl tracking-wider lg:block hidden">
            Daisy Feeder 2
          </h1>
        </div>
      </Link>

      <SidebarItem
        icon={<Beef className="h-8 w-8 text-orange-500" />}
        text="Home"
        href="/main"
        onPress={() => onPress?.(false)}
      />
      <SidebarItem
        icon={<History className="h-8 w-8 text-orange-500" />}
        text="History"
        href="/history"
        onPress={() => onPress?.(false)}
      />
      <SidebarItem
        icon={<ChartNoAxesCombined className="h-8 w-8 text-orange-500" />}
        text="Statistics"
        href="/statistics"
        onPress={() => onPress?.(false)}
      />
      <SidebarItem
        icon={<Settings className="h-8 w-8 text-orange-500" />}
        text="Settings"
        href="/settings"
        onPress={() => onPress?.(false)}
      />

      <div className="lg:items-end flex flex-1 justify-start pb-10 pl-10">
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton />
        </ClerkLoaded>
      </div>
    </div>
  );
};

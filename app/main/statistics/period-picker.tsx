"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PeriodPicker = () => {
  const classNameAdd =
    "flex text-xl w-full lg:text-lg text-sm h-[60px] transition hover:scale-110\
      active:bg-ember-300 active:transition-colors";
  const currentPath = usePathname();
  return (
    <div className="h-[60px] flex flex-row items-center justify-evenly w-full bg-red-500/50">
      <Link href={"/main/statistics/007"} className="w-full">
        <Button
          variant={
            currentPath === "/main/statistics/007"
              ? "sidebarOutline"
              : "sidebar"
          }
          className={cn(classNameAdd)}
        >
          7 Days
        </Button>
      </Link>
      <Link href={"/main/statistics/030"} className="w-full">
        <Button
          variant={
            currentPath === "/main/statistics/030"
              ? "sidebarOutline"
              : "sidebar"
          }
          className={cn(classNameAdd)}
        >
          30 Days
        </Button>
      </Link>
      <Link href={"/main/statistics/090"} className="w-full">
        <Button
          variant={
            currentPath === "/main/statistics/090"
              ? "sidebarOutline"
              : "sidebar"
          }
          className={cn(classNameAdd)}
        >
          90 Days
        </Button>
      </Link>
      <Link href={"/main/statistics/365"} className="w-full">
        <Button
          variant={
            currentPath === "/main/statistics/365"
              ? "sidebarOutline"
              : "sidebar"
          }
          className={cn(classNameAdd)}
        >
          365 Days
        </Button>
      </Link>
      <Link href={"/main/statistics/999"} className="w-full">
        <Button
          variant={
            currentPath === "/main/statistics/999"
              ? "sidebarOutline"
              : "sidebar"
          }
          className={cn(classNameAdd)}
        >
          All Time
        </Button>
      </Link>
    </div>
  );
};

export default PeriodPicker;

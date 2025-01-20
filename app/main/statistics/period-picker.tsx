"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

/**
 * PeriodPicker component renders a set of buttons that allow the user to select a time period for statistics.
 * Each button navigates to a different path and highlights the selected period.
 *
 * @returns {JSX.Element} The PeriodPicker component.
 *
 * @remarks
 * - The component uses the `usePathname` hook to determine the current path and apply the appropriate styles to the selected button.
 * - The `classNameAdd` variable defines common styles for all buttons.
 * - Each button is wrapped in a `Link` component to handle navigation.
 * - The `Button` component's `variant` prop changes based on whether the button's path matches the current path.
 */
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

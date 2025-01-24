"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "../ui/button";

type SidebarItemProps = {
  icon: React.ReactNode;
  text: string;
  href: string;
  activeExact?: boolean;
  onPress: (open: boolean) => void;
};

/**
 * SidebarItem component renders a navigational item for a sidebar.
 * It highlights the item if the current pathname matches the href.
 *
 * @param {object} props - The properties object.
 * @param {React.ReactNode} props.icon - The icon to display in the sidebar item.
 * @param {string} props.text - The text to display in the sidebar item.
 * @param {string} props.href - The URL path that the sidebar item links to.
 * @param {boolean} props.activeExact - If true, the item is active only if the pathname exactly matches the href.
 * @param {function} props.onPress - The function to call when the item is clicked.
 *
 * @returns {JSX.Element} The rendered sidebar item component.
 */
export const SidebarItem = ({
  icon,
  text,
  href,
  activeExact,
  onPress,
}: SidebarItemProps) => {
  const pathname = usePathname();
  const active = activeExact ? pathname === href : pathname?.startsWith(href);
  return (
    <Link href={href}>
      <div className="flex items-center gap-x-4 cursor-pointer text-xl transition hover:scale-110">
        <Button
          variant={active ? "sidebarOutline" : "sidebar"}
          size={"lg"}
          className="w-full flex flex-1 justify-start lg:py-12 py-8 active:bg-amber-300 active:transition-colors hover:z-50"
          onClick={() => onPress(false)}
        >
          {icon}
          {text}
        </Button>
      </div>
    </Link>
  );
};

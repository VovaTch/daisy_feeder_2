import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-l font-medium ring-offset-background\
  transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2\
  disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 uppercase\
  tracking-wide ",
  {
    variants: {
      variant: {
        default:
          "bg-white text-black border-violet-200 border-2 border-b-4 active:border-b-2 hover:bg-indigo-100 text-indigo-500\
          border-r-4 active:border-r-2 ",
        primary:
          "bg-violet-600 text-primary-foreground border-0 border-indigo-800 border border-b-4 active:border-b-2 hover:bg-violet-500\
          border-r-4 active:border-r-2",
        primaryOutline: "bg-white text-indigo-500 hover:bg-violet-100",
        secondary:
          "bg-indigo-600 text-primary-foreground border-0 border-blue-800 border border-b-4 active:border-b-2 hover:bg-indigo-500\
          border-r-4 active:border-r-2",
        secondaryOutline: "bg-white text-blue-500 hover:bg-indigo-100",
        danger:
          "bg-purple-600 text-primary-foreground border-0 border-violet-800 border border-b-4 active:border-b-2 hover:bg-purple-500\
          border-r-4 active:border-r-2",
        dangerOutline: "bg-white text-violet-500 hover:bg-purple-100",
        flag: "border-0 border-violet-300 hover:bg-gradient-to-b from-violet-300 to-transparent border border-b-4 active:border-b-2\
        border-r-4 active:border-r-2 hover:opacity-75",
        flagOutline: "border-4 border-violet-800",
        ghost:
          "bg-transparent text-violet-300 border-transparent border-0 hover:bg-violet-100",
        sidebar:
          "bg-transparent text-indigo-300 border-2 border-transparent hover:bg-violet-100 transition-none",
        sidebarOutline:
          "bg-indigo-500/15 text-indigo-500 border-indigo-300 border-2 hover:bg-indigo-500/20 transition-none",
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-8",
        icon: "h-10 w-10",
        rounded: "rounded-full",
        flag: "bg-no-repeat bg-center bg-cover h-[150px] w-[200px] rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

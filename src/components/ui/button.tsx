import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-sky text-primary-foreground hover:shadow-button transform hover:scale-105 active:scale-95",
        secondary: "bg-surface text-surface-foreground border border-border hover:bg-secondary hover:shadow-gentle",
        accent: "bg-gradient-warm text-accent-foreground hover:shadow-button transform hover:scale-105 active:scale-95",
        outline: "border-2 border-primary text-primary bg-background hover:bg-primary hover:text-primary-foreground hover:shadow-button",
        ghost: "hover:bg-surface hover:text-surface-foreground",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-button",
        hero: "bg-gradient-hero text-white font-semibold shadow-floating hover:shadow-button transform hover:scale-105 active:scale-95",
        fab: "rounded-full bg-gradient-sky text-primary-foreground shadow-floating hover:shadow-button transform hover:scale-110 active:scale-95",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary-light",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-14 rounded-xl px-8 text-base font-semibold",
        xl: "h-16 rounded-xl px-12 text-lg font-semibold",
        icon: "h-12 w-12",
        fab: "h-16 w-16",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

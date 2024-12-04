import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
<input
  type={type}
  className={cn(
    "flex h-9 w-full bg-input rounded-none border border-border md:h-14 md:text-xl lg:h-10 lg:text-lg min-md:rounded-md  xl:h-12 xl:text-lg 2xl:h-16 2xl:text-xl max-sm:h-14 max-sm:text-lg max-md:p-3 max-md:m-0 max-md:text-md px-5 py-2 text-card shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:italic placeholder:text-muted-foreground/45 placeholder:text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ",
    className
  )}
  ref={ref}
  {...props}
/>
    )
  }
)
Input.displayName = "Input"

export { Input }

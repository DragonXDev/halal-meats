import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "primary" | "outline"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const baseClass = "badge"
  const variantClass = variant === "default" ? "badge-primary" : `badge-${variant}`
  
  return (
    <div className={cn(baseClass, variantClass, className)} {...props} />
  )
}

export { Badge }

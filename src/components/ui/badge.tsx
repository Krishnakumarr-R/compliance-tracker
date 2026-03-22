import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground",
        pending: "border-transparent bg-amber-100 text-amber-800",
        inprogress: "border-transparent bg-blue-100 text-blue-800",
        completed: "border-transparent bg-emerald-100 text-emerald-800",
        overdue: "border-transparent bg-red-100 text-red-800",
        high: "border-transparent bg-red-50 text-red-700",
        medium: "border-transparent bg-yellow-50 text-yellow-700",
        low: "border-transparent bg-green-50 text-green-700",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
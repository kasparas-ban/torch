import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Loader2, Check, X } from "lucide-react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  isSuccess?: boolean
  isError?: boolean
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
  },
)
Button.displayName = "Button"

const ButtonSubmit = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      isLoading,
      isSuccess,
      isError,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="h-10">
        <AnimatePresence initial={false} mode="popLayout">
          {isLoading ? (
            <motion.div
              key="button_loading"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <motion.button
                layout
                className="flex items-center px-3 py-1 text-xl font-medium text-gray-400"
                disabled
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving
              </motion.button>
            </motion.div>
          ) : isSuccess ? (
            <motion.div
              key="button_done"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <Button asChild ref={ref} disabled>
                <motion.button
                  layout
                  className="px-3 py-1 text-xl font-medium"
                  whileTap={{ scale: 0.95 }}
                >
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  Saved
                </motion.button>
              </Button>
            </motion.div>
          ) : isError ? (
            <motion.div
              key="button_fail"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <motion.button
                layout
                className="flex items-center px-3 py-1 text-xl font-medium text-red-500"
                disabled
              >
                <X className="relative top-0.5 mr-1 h-4 w-4" />
                Failed
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="button_ready"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
            >
              <motion.button
                layout
                className="px-3 py-1 text-xl font-medium"
                whileTap={{ scale: 0.95 }}
                type="submit"
              >
                Save
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  },
)

export { Button, ButtonSubmit, buttonVariants }

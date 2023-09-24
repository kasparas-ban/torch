import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X, ArrowLeft } from "lucide-react"

import { cn } from "@/lib/utils"
import useModal from "@/components/Modals/useModal"
import { LayoutGroup, motion } from "framer-motion"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = ({
  className,
  ...props
}: DialogPrimitive.DialogPortalProps) => (
  <DialogPrimitive.Portal className={cn(className)} {...props} />
)
DialogPortal.displayName = DialogPrimitive.Portal.displayName

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "bg-background/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50",
      className,
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const LayoutGroupWrapper = React.forwardRef<HTMLButtonElement, any>(
  (props, forwardedRef) => (
    <LayoutGroup>
      <motion.div layout {...props} ref={forwardedRef}></motion.div>
    </LayoutGroup>
  ),
)

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const { goBack, showBackButton } = useModal()

  return (
    <DialogPortal>
      <DialogOverlay />
      <LayoutGroupWrapper>
        <DialogPrimitive.Content
          ref={ref}
          className={cn(
            "fixed inset-0 z-50 m-auto mx-auto w-full overflow-auto border border-gray-200 bg-white p-5 [scrollbar-gutter:stable_both-edges] sm:h-fit sm:max-h-[80vh] sm:max-w-xl sm:rounded-lg sm:border",
            className,
          )}
          {...props}
          asChild
        >
          <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {children}
            {showBackButton && (
              <motion.button
                layout
                className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute left-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none"
                onClick={goBack}
                whileTap={{ scale: 0.9 }}
              >
                <ArrowLeft className="h-6 w-6" />
                <span className="sr-only">Back</span>
              </motion.button>
            )}
            <DialogPrimitive.Close
              className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none"
              asChild
            >
              <motion.button layout whileTap={{ scale: 0.9 }}>
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
              </motion.button>
            </DialogPrimitive.Close>
          </motion.div>
        </DialogPrimitive.Content>
      </LayoutGroupWrapper>
    </DialogPortal>
  )
})
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className,
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("my-5 text-center text-5xl font-semibold", className)}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-muted-foreground text-sm", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}

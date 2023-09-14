import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useMediaQuery } from "react-responsive"
import { useToast } from "@/components/ui/use-toast"
import { AnimatePresence, motion } from "framer-motion"

export function Toaster() {
  const { toasts } = useToast()
  const isDesktop = useMediaQuery({
    query: "(min-width: 600px)",
  })

  const isToastShown = toasts.find(toast => toast.open)

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            key={id}
            {...props}
            {...(isDesktop && { onSwipeMove: e => e.preventDefault() })}
            {...(isDesktop && { onSwipeEnd: e => e.preventDefault() })}
            className="rounded-2xl border-none bg-gray-800 py-4 text-white"
          >
            <div className="grid gap-1 pr-5">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className="text-white hover:text-white focus:text-white focus:ring-gray-500" />
          </Toast>
        )
      })}
      <ToastViewport />
      <AnimatePresence>
        {isToastShown && (
          <motion.img
            src="src/assets/background.png"
            className="fixed bottom-0 left-1/2 z-[-1] flex max-h-screen w-[500px] max-w-[1200px] translate-x-[-50%] translate-y-[5%] flex-col-reverse p-4 sm:top-auto sm:w-full sm:translate-y-[50%] sm:flex-col md:max-w-[1200px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </ToastProvider>
  )
}

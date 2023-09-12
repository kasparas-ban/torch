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

export function Toaster() {
  const { toasts } = useToast()
  const isDesktop = useMediaQuery({
    query: "(min-width: 600px)",
  })

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            key={id}
            {...props}
            {...(isDesktop && { onSwipeMove: e => e.preventDefault() })}
            {...(isDesktop && { onSwipeEnd: e => e.preventDefault() })}
            className="rounded-2xl border-none bg-gray-800 text-white"
          >
            <div className="grid gap-1">
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
    </ToastProvider>
  )
}

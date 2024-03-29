import { ReactNode } from "react"
import { motion } from "framer-motion"
import clsx from "clsx"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import useModal from "../useModal"

function GeneralModal({ children }: { children?: ReactNode }) {
  const { isOpen, modalContent, modalTitle, closeModal, modalKey } = useModal()

  return (
    <div className="absolute">
      <Dialog open={isOpen} onOpenChange={isOpen => !isOpen && closeModal()}>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent
          id={modalKey}
          className={clsx(
            "flex flex-col",
            modalKey === "general_modal" && "overflow-y-hidden",
          )}
        >
          <DialogHeader>
            <DialogTitle asChild>
              <motion.h1 layout>{modalTitle}</motion.h1>
            </DialogTitle>
          </DialogHeader>
          {modalContent}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export { GeneralModal }

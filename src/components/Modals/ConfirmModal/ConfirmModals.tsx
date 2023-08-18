import { ReactNode, useState } from "react"
import { motion } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import useConfirmModal from "./useConfirmModal"

function MarkItemDoneModal({
  children: triggerElement,
}: {
  children: ReactNode
}) {
  const { isOpen: isModalOpen, handleSubmit, closeModal } = useConfirmModal()
  const [isOpen, setIsOpen] = useState(isModalOpen)

  const close = () => {
    closeModal()
    setIsOpen(false)
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={isOpen => (isOpen ? setIsOpen(true) : close())}
    >
      <DialogTrigger>{triggerElement}</DialogTrigger>
      <DialogContent className="h-fit sm:max-w-fit">
        <div className="px-8">
          <DialogHeader>
            <DialogTitle asChild>
              <motion.h1 layout>Mark as complete?</motion.h1>
            </DialogTitle>
          </DialogHeader>
          <div className="mt-2 flex justify-center space-x-2">
            <motion.button
              className="text-md h-7 w-24 rounded-lg bg-gray-200 hover:bg-gray-300"
              onClick={() => handleSubmit && handleSubmit().then(() => close())}
              whileTap={{ scale: 0.96 }}
            >
              Yes
            </motion.button>
            <motion.button
              className="text-md h-7 w-24 rounded-lg bg-gray-200 hover:bg-gray-300"
              onClick={() => close()}
              whileTap={{ scale: 0.96 }}
            >
              No
            </motion.button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function RemoveItemModal({
  children: triggerElement,
}: {
  children: ReactNode
}) {
  const { isOpen: isModalOpen, handleSubmit, closeModal } = useConfirmModal()
  const [isOpen, setIsOpen] = useState(isModalOpen)

  const close = () => {
    closeModal()
    setIsOpen(false)
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={isOpen => (isOpen ? setIsOpen(true) : close())}
    >
      <DialogTrigger>{triggerElement}</DialogTrigger>
      <DialogContent className="h-fit sm:max-w-fit">
        <div className="px-8">
          <DialogHeader>
            <DialogTitle asChild>
              <motion.h1 layout>Remove item?</motion.h1>
            </DialogTitle>
          </DialogHeader>
          <div className="mt-2 flex justify-center space-x-2">
            <motion.button
              className="text-md h-7 w-24 rounded-lg bg-gray-200 hover:bg-gray-300"
              onClick={() => handleSubmit && handleSubmit().then(() => close())}
              whileTap={{ scale: 0.96 }}
            >
              Yes
            </motion.button>
            <motion.button
              className="text-md h-7 w-24 rounded-lg bg-gray-200 hover:bg-gray-300"
              onClick={() => close()}
              whileTap={{ scale: 0.96 }}
            >
              No
            </motion.button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { RemoveItemModal, MarkItemDoneModal }

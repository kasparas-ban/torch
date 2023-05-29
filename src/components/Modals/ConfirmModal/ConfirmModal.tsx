import { motion } from "framer-motion"
import "../inputStyles.css"

interface IConfirmModal {
  modalTitle?: string
  handleBack: () => void
  handleConfirm?: () => Promise<void>
}

const modalVariants = {
  default: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  initial: { opacity: 0, scale: 0.95 },
  close: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
}

function ConfirmModal({
  modalTitle,
  handleBack,
  handleConfirm,
}: IConfirmModal) {
  return (
    <motion.div
      layout
      key="add_task_modal"
      className="absolute inset-0 z-20 m-auto mx-auto flex h-fit w-full max-w-fit justify-center overflow-auto rounded-lg border border border-gray-200 bg-white p-5 [scrollbar-gutter:stable_both-edges]"
      variants={modalVariants}
      initial="initial"
      animate="default"
      exit="close"
    >
      <div className="my-auto">
        <motion.div
          layout
          className="text-center text-4xl font-semibold text-gray-700"
        >
          {modalTitle}
        </motion.div>
        <div className="mt-5 flex justify-center space-x-2">
          <motion.button
            className="text-md h-7 w-24 rounded-lg bg-gray-200 hover:bg-gray-300"
            onClick={() =>
              handleConfirm && handleConfirm().then(() => handleBack())
            }
            whileTap={{ scale: 0.96 }}
          >
            Yes
          </motion.button>
          <motion.button
            className="text-md h-7 w-24 rounded-lg bg-gray-200 hover:bg-gray-300"
            onClick={handleBack}
            whileTap={{ scale: 0.96 }}
          >
            No
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default ConfirmModal

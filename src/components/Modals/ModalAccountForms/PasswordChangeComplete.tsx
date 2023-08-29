import { motion } from "framer-motion"
import useModal from "../useModal"

function PasswordChangeComplete() {
  const { closeModal } = useModal()

  return (
    <motion.div
      layout
      className="mt-4 flex h-full flex-col px-0 pb-2 sm:mt-0 sm:px-10"
    >
      <p className="text-center text-gray-700">
        A confirmation link was sent to your email.
      </p>
      <p className="mb-4 text-center text-gray-700">
        Click it to complete the change.
      </p>

      <div className="relative mt-auto flex justify-center">
        <motion.button
          layout
          className="px-3 py-1 text-xl font-medium"
          whileTap={{ scale: 0.95 }}
          onClick={closeModal}
        >
          Ok
        </motion.button>
      </div>
    </motion.div>
  )
}

export default PasswordChangeComplete

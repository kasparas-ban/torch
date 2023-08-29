import { motion } from "framer-motion"
import useModal from "../useModal"

function EmailChangeComplete() {
  const { closeModal } = useModal()

  return (
    <motion.div layout className="px-0 pb-2 sm:px-10">
      <p className="text-center text-gray-700">
        A confirmation link was sent to your new email address.
      </p>
      <p className="mb-4 text-center text-gray-700">
        Click it to complete the change.
      </p>

      <div className="relative flex justify-center">
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

export default EmailChangeComplete

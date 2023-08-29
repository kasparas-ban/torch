import { motion } from "framer-motion"
import useModal from "../useModal"
import "../inputStyles.css"

function EmailChangeComplete() {
  const { closeModal } = useModal()

  return (
    <div className="px-0 pb-2 sm:px-10">
      <p className="text-gray-700 text-center">
        A confirmation link was sent to your new email address.
      </p>
      <p className="mb-4 text-gray-700 text-center">
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
    </div>
  )
}

export default EmailChangeComplete

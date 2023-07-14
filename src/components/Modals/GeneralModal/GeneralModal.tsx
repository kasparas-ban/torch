import React from "react"
import { AnimatePresence, motion } from "framer-motion"
import useModal from "../useModal"
import ModalBackground from "./ModalBackground"
import { ReactComponent as BackIcon } from "../../../assets/back.svg"
import "../inputStyles.css"

const modalVariants = {
  default: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  initial: { opacity: 0, scale: 0.95 },
  close: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
}

function GeneralModal() {
  const { isOpen, modalContent, modalTitle, modalKey, closeModal, goBack } =
    useModal()

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <React.Fragment key="general_modal">
            <motion.div
              layout
              key={modalKey}
              className="absolute inset-0 z-20 m-auto mx-auto w-full overflow-auto border border-gray-200 bg-white p-5 [scrollbar-gutter:stable_both-edges] sm:h-fit sm:max-h-[80vh] sm:max-w-xl sm:rounded-lg sm:border"
              variants={modalVariants}
              initial="initial"
              animate="default"
              exit="close"
            >
              <motion.button layout onClick={goBack} whileTap={{ scale: 0.95 }}>
                <BackIcon />
              </motion.button>
              <motion.div
                layout
                className="mb-4 text-center text-5xl font-semibold"
              >
                {modalTitle}
              </motion.div>
              <div className="mx-auto">{modalContent}</div>
            </motion.div>
            <ModalBackground closeModal={closeModal} />
          </React.Fragment>
        )}
      </AnimatePresence>
    </>
  )
}

export default GeneralModal

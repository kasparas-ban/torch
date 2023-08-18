import { motion } from "framer-motion"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import useModal from "../useModal"
import "../inputStyles.css"

const modalVariants = {
  default: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  initial: { opacity: 0, scale: 0.9 },
  close: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.1 },
  },
}

function GeneralModal() {
  const { modalContent, modalTitle } = useModal()

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle asChild>
          <motion.h1 layout>{modalTitle}</motion.h1>
        </DialogTitle>
      </DialogHeader>
      {modalContent}
    </DialogContent>
  )

  // return ReactDOM.createPortal(
  //   <LayoutGroup>
  //     <AnimatePresence>
  //       {isOpen && (
  //         <React.Fragment key="general_modal">
  //           <motion.div
  //             layout
  //             id={modalKey}
  //             key={modalKey}
  //             className="absolute inset-0 z-20 m-auto mx-auto w-full overflow-auto border border-gray-200 bg-white p-5 [scrollbar-gutter:stable_both-edges] sm:h-fit sm:max-h-[80vh] sm:max-w-xl sm:rounded-lg sm:border"
  //             variants={modalVariants}
  //             initial="initial"
  //             animate="default"
  //             exit="close"
  //           >
  //             <motion.button layout onClick={goBack} whileTap={{ scale: 0.95 }}>
  //               <BackIcon />
  //             </motion.button>
  //             <motion.div
  //               layout
  //               className="mb-4 text-center text-5xl font-semibold"
  //             >
  //               {modalTitle}
  //             </motion.div>
  //             <div className="mx-auto">{modalContent}</div>
  //           </motion.div>
  //           <ModalBackground closeModal={closeModal} />
  //         </React.Fragment>
  //       )}
  //     </AnimatePresence>
  //   </LayoutGroup>,
  //   document.getElementById("root") as HTMLElement,
  // )
}

export default GeneralModal

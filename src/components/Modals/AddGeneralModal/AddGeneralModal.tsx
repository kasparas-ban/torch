import { AnimatePresence, motion } from "framer-motion"
import { ReactComponent as BackIcon } from "../../../assets/back.svg"

interface IAddGeneralModal {
  showModal: boolean
  openAddTaskModal: () => void
  openAddGoalModal: () => void
  openAddDreamModal: () => void
  closeModal: () => void
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

function AddGeneralModal({
  showModal,
  openAddTaskModal,
  openAddGoalModal,
  openAddDreamModal,
  closeModal,
}: IAddGeneralModal) {
  return (
    <AnimatePresence>
      {showModal && (
        <>
          <motion.div
            layout
            variants={modalVariants}
            initial="initial"
            animate="default"
            exit="close"
            key="add_modal"
            className="absolute inset-0 z-20 m-auto mx-auto w-full overflow-auto border border-gray-200 bg-white p-5 [scrollbar-gutter:stable_both-edges] sm:h-fit sm:max-h-[80vh] sm:max-w-xl sm:rounded-lg sm:border"
          >
            <motion.button
              layout
              onClick={closeModal}
              whileTap={{ scale: 0.95 }}
            >
              <BackIcon />
            </motion.button>
            <motion.div
              layout
              className="mb-6 text-center text-5xl font-semibold"
            >
              Choose type
            </motion.div>
            <div className="mx-auto">
              <div className="flex flex-col gap-3 px-0 pt-4 pb-2 sm:px-10">
                <motion.button
                  layout
                  className="w-full rounded-xl bg-gray-200 py-4 px-6 drop-shadow-lg hover:bg-gray-300"
                  onClick={openAddTaskModal}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-left">
                    <div className="text-2xl font-semibold">Add task</div>
                    <div className="my-1">One time or recurring short task</div>
                    <div className="text-sm text-gray-500">
                      Read 20 pages, run 3 km, study for 2 h...
                    </div>
                  </div>
                </motion.button>
                <motion.button
                  layout
                  className="w-full rounded-xl bg-gray-200 py-4 px-6 drop-shadow-lg hover:bg-gray-300"
                  onClick={openAddGoalModal}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-left">
                    <div className="text-2xl font-semibold">Add goal</div>
                    <div className="my-1">
                      Larger objective composed of smaller tasks
                    </div>
                    <div className="text-sm text-gray-500">
                      Finish a book, run a marathon, pass the exam...
                    </div>
                  </div>
                </motion.button>
                <motion.button
                  layout
                  className="w-full rounded-xl bg-gray-200 py-4 px-6 drop-shadow-lg hover:bg-gray-300"
                  onClick={openAddDreamModal}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-left">
                    <div className="text-2xl font-semibold">Add dream</div>
                    <div className="my-1">
                      General aspiration to work towards
                    </div>
                    <div className="text-sm text-gray-500">
                      Become a novelist, finish university...
                    </div>
                  </div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default AddGeneralModal

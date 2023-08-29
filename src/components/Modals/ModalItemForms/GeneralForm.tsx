import { motion } from "framer-motion"
import useModal from "../useModal"

function GeneralForm() {
  const { openTaskModal, openGoalModal, openDreamModal } = useModal()

  return (
    <div className="mx-auto">
      <div className="flex flex-col gap-3 px-0 pt-4 pb-2 sm:px-10">
        <motion.button
          layout
          className="w-full rounded-xl bg-gray-200 py-4 px-6 drop-shadow-lg hover:bg-gray-300"
          onClick={() => openTaskModal(undefined, true)}
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-left">
            <div className="text-2xl font-semibold">Add task</div>
            <div className="my-1">One time or recurring short task</div>
            <div className="text-sm text-gray-500">
              Read 20 pages, run 3km, study for 2h...
            </div>
          </div>
        </motion.button>
        <motion.button
          layout
          className="w-full rounded-xl bg-gray-200 py-4 px-6 drop-shadow-lg hover:bg-gray-300"
          onClick={() => openGoalModal(undefined, true)}
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
          onClick={() => openDreamModal(undefined, true)}
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-left">
            <div className="text-2xl font-semibold">Add dream</div>
            <div className="my-1">General aspiration to work towards</div>
            <div className="text-sm text-gray-500">
              Become a novelist, finish university...
            </div>
          </div>
        </motion.button>
      </div>
    </div>
  )
}

export default GeneralForm

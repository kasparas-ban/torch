import { motion } from "framer-motion"
import useConfirmModal from "../../../components/Modals/ConfirmModal/useConfirmModal"
import useModal from "../../../components/Modals/useModal"
import { GeneralItem } from "../../../types"
import { ReactComponent as EditIcon } from "../../../assets/edit_pen.svg"
import { ReactComponent as TickIcon } from "../../../assets/tick.svg"
import { ReactComponent as AddItemIcon } from "../../../assets/add_item.svg"
import { ReactComponent as StatsIcon } from "../../../assets/stats.svg"
import { ReactComponent as DeleteIcon } from "../../../assets/delete.svg"

export default function ItemEditPanel<T extends GeneralItem>({
  item,
  sublistVisible,
  showBulletLine,
}: {
  item: T
  sublistVisible?: boolean
  showBulletLine?: boolean
}) {
  const { openTaskModal, openGoalModal, openDreamModal } = useModal()
  const { openModal: openConfirmModal } = useConfirmModal()

  const doneFn = async () => console.log("Marking this item as done")
  const removeFn = async () => console.log("Removing this item")

  const openEditItemModal = (item: T, createTaskOnOpen = false) =>
    item.type === "TASK"
      ? openTaskModal(item)
      : item.type === "GOAL"
      ? openGoalModal(item, undefined, createTaskOnOpen)
      : openDreamModal(item)

  return (
    <motion.div
      layout
      className="flex relative"
      initial={{ marginTop: 0, marginBottom: 0 }}
      animate={{
        marginTop: 12,
        marginBottom: sublistVisible ? 12 : 0,
      }}
      exit={{ marginTop: 0, marginBottom: 0 }}
    >
      {showBulletLine && (
        <div className="bg-gray-300 w-1 absolute h-[140%] left-[6px]" />
      )}
      <motion.div
        layout
        className={`mx-auto flex ${
          item.type === "GOAL" || item.type === "DREAM"
            ? "w-[400px] max-[500px]:w-full"
            : "w-[320px] max-[400px]:w-full max-[400px]:px-6"
        } justify-between`}
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: "auto",
          opacity: 1,
        }}
        exit={{ height: 0, opacity: 0 }}
      >
        <motion.div
          className="flex shrink-0 cursor-pointer select-none flex-col text-sm"
          whileHover={{ scale: 1.1 }}
          onClick={() => openConfirmModal(doneFn, "Mark as done?")}
        >
          <TickIcon className="mx-auto h-5" />
          Done
        </motion.div>
        {item.type === "GOAL" && (
          <motion.div
            className="flex shrink-0 cursor-pointer select-none flex-col text-sm"
            whileHover={{ scale: 1.1 }}
            onClick={() => openEditItemModal(item, true)}
          >
            <AddItemIcon className="mx-auto h-5" />
            Add task
          </motion.div>
        )}
        <motion.div
          className="flex shrink-0 cursor-pointer select-none flex-col text-sm"
          whileHover={{ scale: 1.1 }}
        >
          <StatsIcon className="mx-auto h-5" />
          Stats
        </motion.div>
        <motion.div
          className="flex shrink-0 cursor-pointer select-none flex-col text-sm"
          whileHover={{ scale: 1.1 }}
          onClick={() => openEditItemModal(item)}
        >
          <EditIcon className="mx-auto h-5" />
          Edit
        </motion.div>
        <motion.div
          className="flex shrink-0 cursor-pointer select-none flex-col text-sm"
          whileHover={{ scale: 1.1 }}
          onClick={() => openConfirmModal(removeFn, "Remove item?")}
        >
          <DeleteIcon className="mx-auto h-5" />
          Remove
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

import clsx from "clsx"
import { useNavigate } from "react-router-dom"
import { useMediaQuery } from "react-responsive"
import { AnimatePresence, motion } from "framer-motion"
import { GeneralItem, Goal, ItemType, Task } from "@/types"
import useTimerForm from "@/components/Timer/useTimerForm"
import { ROUTES } from "@/routes"
import ItemProgress from "./ProgressBar"
import useEditItem from "../useEditItem"
import { ReactComponent as DotsIcon } from "../../../assets/dots.svg"
import { ReactComponent as TimerStartIcon } from "../../../assets/timer_start.svg"

function ItemStrip<T extends GeneralItem>({
  item,
  itemType,
  toggleSublist,
  itemSublist,
  showEditPanel,
  toggleEditClick,
}: {
  item: T
  itemType: ItemType
  toggleSublist?: () => void
  itemSublist?: Goal[] | Task[]
  showEditPanel: boolean
  toggleEditClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}) {
  const { editItem, setEditItem } = useEditItem()
  const navigate = useNavigate()
  const { setFocusOn, setFocusType } = useTimerForm()

  const containsSublist = !!itemSublist?.length

  const handleTimerClick = () => {
    navigate(ROUTES.index.path)
    setFocusOn({ value: item.id, label: item.title, progress: item.progress })
    setFocusType(
      itemType === "TASK"
        ? "TASKS"
        : itemType === "GOAL"
        ? "GOALS"
        : itemType === "DREAM"
        ? "DREAMS"
        : "ALL",
    )
    setEditItem(undefined)
  }

  const handleStripClick = () => {
    const itemInEdit = item.id === editItem?.id && item.type === editItem?.type
    if (itemInEdit) {
      setEditItem(undefined)
    } else if (!editItem && toggleSublist) {
      toggleSublist()
    }
  }

  return (
    <motion.div
      layout
      onClick={handleStripClick}
      className={clsx(
        "relative flex w-full min-w-0",
        containsSublist && "mb-3",
      )}
      style={{ zIndex: itemSublist?.length }}
      whileTap={{ scale: itemSublist ? (showEditPanel ? 1 : 0.98) : 1 }}
    >
      <motion.div
        layout
        className={clsx(
          "relative border border-gray-700 flex w-full cursor-pointer items-center overflow-hidden rounded-2xl pl-6 pr-1 md:rounded-3xl",
          editItem
            ? showEditPanel
              ? "bg-red-300"
              : "bg-gray-300"
            : "bg-red-300",
        )}
      >
        <ItemProgress
          progress={item.progress || 0}
          showEditPanel={showEditPanel}
        />
        <motion.div className="z-10 select-none py-3 truncate text-gray-800">
          {item.title}
        </motion.div>
        <div
          className={clsx(
            "rounded-full z-0 ml-auto h-10 w-10 flex shrink-0 items-center justify-center group",
            !editItem
              ? "hover:bg-red-200"
              : showEditPanel
              ? "hover:bg-red-200"
              : "hover:bg-gray-100",
          )}
          onClick={toggleEditClick}
        >
          <motion.div
            layout
            className="text-gray-600 group-hover:text-gray-800"
          >
            <DotsIcon />
          </motion.div>
        </div>
      </motion.div>
      <AnimatePresence>
        {showEditPanel && (
          <motion.div
            className="my-auto aspect-square w-12 ml-3 cursor-pointer rounded-full bg-red-400"
            whileHover={{ scale: 1.1 }}
            onClick={handleTimerClick}
            initial={{ width: 0, opacity: 0, marginLeft: 0 }}
            animate={{ width: 48, opacity: 1, marginLeft: 12 }}
            exit={{ width: 0, opacity: 0, marginLeft: 0 }}
          >
            <TimerStartIcon className="m-auto h-full" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function RecurringItemStrip({
  item,
  showEditPanel,
  toggleEditClick,
}: {
  item: Task
  showEditPanel: boolean
  toggleEditClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}) {
  const { editItem } = useEditItem()

  const isDesktop = useMediaQuery({
    query: "(min-width: 600px)",
  })

  const itemProgress = item.recurring
    ? (item.recurring?.progress || 0) / item.recurring?.times
    : 0

  return (
    <motion.div layout className="flex w-full min-w-0">
      <motion.div
        layout
        className={clsx(
          "relative border border-gray-700 flex w-full cursor-pointer items-center overflow-hidden rounded-2xl pl-6 pr-1 md:rounded-3xl",
          editItem
            ? showEditPanel
              ? "bg-amber-300"
              : "bg-gray-300"
            : "bg-amber-300",
        )}
      >
        <ItemProgress
          progress={itemProgress}
          showEditPanel={showEditPanel}
          isRecurring
        />
        <motion.div className="py-1 z-10 flex flex-col min-w-0">
          <div className="select-none truncate">{item.title}</div>
          <div className="text-xs text-gray-700 truncate">Resets tomorrow</div>
        </motion.div>
        <div
          className={clsx(
            "z-0 ml-auto flex shrink-0 items-center justify-center pl-2",
          )}
          onClick={toggleEditClick}
        >
          <motion.div
            layout
            className={clsx(
              "relative top-[-2px] font-bold text-2xl shrink-0 tracking-wider sm:tracking-widest text-gray-600",
            )}
          >
            {item.recurring?.progress || 0}/{item.recurring?.times}
          </motion.div>
        </div>
        <div
          className={clsx(
            "rounded-full z-0 h-10 w-10 flex shrink-0 items-center justify-center group",
            !editItem
              ? "hover:bg-amber-200"
              : showEditPanel
              ? "hover:bg-amber-200"
              : "hover:bg-gray-100",
          )}
          onClick={toggleEditClick}
        >
          <motion.div
            layout
            className="text-gray-600 group-hover:text-gray-800"
          >
            <DotsIcon />
          </motion.div>
        </div>
      </motion.div>
      <AnimatePresence>
        {showEditPanel && (
          <motion.div
            key="add_recurring"
            className="flex font-bold justify-center items-center text-xl text-gray-700 my-auto aspect-square cursor-pointer rounded-full bg-amber-400"
            whileHover={{ scale: 1.1 }}
            // onClick={handleTimerClick}
            initial={{ width: 0, opacity: 0, marginLeft: 0 }}
            animate={{
              width: isDesktop ? 48 : 64,
              opacity: 1,
              marginLeft: isDesktop ? 12 : 6,
            }}
            exit={{ width: 0, opacity: 0, marginLeft: 0 }}
          >
            +1
          </motion.div>
        )}
        {showEditPanel && (
          <motion.div
            key="subtract_recurring"
            className="flex font-bold justify-center items-center text-xl text-gray-700 my-auto aspect-square cursor-pointer rounded-full bg-amber-400"
            whileHover={{ scale: 1.1 }}
            // onClick={handleTimerClick}
            initial={{ width: 0, opacity: 0, marginLeft: 0 }}
            animate={{
              width: isDesktop ? 48 : 64,
              opacity: 1,
              marginLeft: isDesktop ? 12 : 6,
            }}
            exit={{ width: 0, opacity: 0, marginLeft: 0 }}
          >
            -1
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export { ItemStrip, RecurringItemStrip }

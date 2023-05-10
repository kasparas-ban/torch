import { useEffect, useState } from "react"
import { AnimatePresence, motion, stagger, useAnimate } from "framer-motion"
import { Goal, ItemType, Task } from "../../types"
import { ReactComponent as TimerStartIcon } from "../../assets/timer_start.svg"
import { ReactComponent as PlusSmallIcon } from "../../assets/plus_small.svg"
import { ReactComponent as EditIcon } from "../../assets/edit_pen.svg"
import { ReactComponent as ArrowIcon } from "../../assets/arrow.svg"
import { ReactComponent as TickIcon } from "../../assets/tick.svg"
import { ReactComponent as AddItemIcon } from "../../assets/add_item.svg"
import { ReactComponent as StatsIcon } from "../../assets/stats.svg"
import { ReactComponent as DeleteIcon } from "../../assets/delete.svg"

const sublistVariant = {
  initial: { opacity: 0, height: 0, marginTop: 0 },
  animate: {
    opacity: 1,
    height: "auto",
    marginTop: 12,
    transition: { staggerChildren: 0.1 },
  },
  exit: { opacity: 0, height: 0, marginTop: 0 },
}

const subitemVariant = {
  initial: {
    opacity: 0,
    y: -30,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.01,
      type: "spring",
      bounce: 0.4,
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: { duration: 0.4 },
  },
}

export default function ItemsList({
  items,
  itemType,
  editMode,
  editItem,
  setEditItem,
}: {
  items: Goal[]
  itemType: ItemType
  editMode: boolean
  editItem: Goal | Task | undefined
  setEditItem: React.Dispatch<React.SetStateAction<Goal | Task | undefined>>
}) {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    if (!scope.current) return
    animate(
      "li",
      { y: [-40, 0], opacity: [0, 1] },
      {
        duration: 0.3,
        type: "spring",
        bounce: 0.4,
        delay: stagger(0.025),
      }
    )
  }, [itemType])

  return (
    <>
      {editMode && (
        <motion.div layout className="mb-6 flex justify-center font-bold">
          {`Select a goal/task to edit`}
        </motion.div>
      )}
      {items.length ? (
        <motion.ul className="space-y-3" ref={scope}>
          {items.map((item, idx) => (
            <Item
              item={item}
              key={idx}
              editMode={editMode}
              editItem={editItem}
              setEditItem={setEditItem}
            />
          ))}
        </motion.ul>
      ) : (
        <div className="mt-6 text-center">
          <div>No {itemType.toLowerCase()} have been added.</div>
          <button className="mt-8 font-bold">
            <motion.div className="flex" whileHover={{ scale: 1.05 }}>
              <PlusSmallIcon />
              Add new{" "}
              {itemType === "TASKS"
                ? "task"
                : itemType === "GOALS"
                ? "goal"
                : "dream"}
            </motion.div>
          </button>
        </div>
      )}
    </>
  )
}

function Item({
  item,
  editMode,
  editItem,
  setEditItem,
}: {
  item: Goal
  editMode: boolean
  editItem: Goal | Task | undefined
  setEditItem: React.Dispatch<React.SetStateAction<Goal | Task | undefined>>
}) {
  const [showSublist, setShowSublist] = useState(true)
  const containsSublist = !!item.tasks.length
  const showEditPanel = editMode && item.goalId === (editItem as Goal)?.goalId

  const toggleEditClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    setEditItem(showEditPanel ? undefined : item)
  }

  return (
    <motion.li layout>
      <motion.div
        layout
        onClick={() => setShowSublist(prev => !prev)}
        className="flex space-x-3"
      >
        {editMode && (
          <motion.div
            className={`group my-auto aspect-square w-12 cursor-pointer rounded-full border-2 ${
              showEditPanel
                ? "selected border-red-400 bg-red-400"
                : "border-gray-400"
            } hover:border-red-500 hover:bg-red-500`}
            whileHover={{ scale: 1.1 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={toggleEditClick}
          >
            <EditIcon className="m-auto h-full text-gray-500 group-hover:text-gray-700 group-[.selected]:text-gray-700" />
          </motion.div>
        )}
        <motion.div
          layout
          className={`flex w-full cursor-pointer rounded-full py-3 px-6 ${
            editMode && !showEditPanel ? "bg-gray-300" : "bg-red-400"
          }`}
          whileHover={{
            scale: 1.02,
          }}
        >
          <motion.div className="select-none">{item.title}</motion.div>
          {containsSublist && (
            <motion.div
              layout
              animate={{
                rotate: showSublist ? 180 : 0,
                transition: { type: "tween" },
              }}
              className={`ml-auto`}
            >
              <ArrowIcon />
            </motion.div>
          )}
        </motion.div>
        {!containsSublist && !editMode && (
          <motion.div
            className="my-auto aspect-square w-12 cursor-pointer rounded-full bg-red-400"
            whileHover={{ scale: 1.1 }}
          >
            <TimerStartIcon className="m-auto h-full" />
          </motion.div>
        )}
      </motion.div>
      <AnimatePresence initial={false}>
        {showEditPanel && (
          <ItemEditPanel key={`goal_${item.goalId}_edit_panel`} item={item} />
        )}
      </AnimatePresence>
      <AnimatePresence initial={false}>
        {showSublist && (
          <ItemSublist
            key={`${item.goalId}_sublist`}
            tasks={item.tasks}
            editMode={editMode}
            editItem={editItem}
            setEditItem={setEditItem}
          />
        )}
      </AnimatePresence>
    </motion.li>
  )
}

function ItemEditPanel({ item }: { item: Goal | Task }) {
  const isGoal = !!(item as Goal)?.goalId
  return (
    <motion.div
      layout
      className={`mx-auto flex ${
        isGoal
          ? "w-[400px] max-[500px]:w-full"
          : "w-[320px] max-[400px]:w-full max-[400px]:px-6"
      } justify-between`}
      initial={{ height: 0, opacity: 0, marginTop: 0 }}
      animate={{ height: "auto", opacity: 1, marginTop: 12 }}
      exit={{ height: 0, opacity: 0, marginTop: 0 }}
    >
      <motion.div
        className="flex shrink-0 cursor-pointer select-none flex-col"
        whileHover={{ scale: 1.1 }}
      >
        <TickIcon className="mx-auto" />
        Done
      </motion.div>
      {isGoal && (
        <motion.div
          className="flex shrink-0 cursor-pointer select-none flex-col"
          whileHover={{ scale: 1.1 }}
        >
          <AddItemIcon className="mx-auto" />
          Add task
        </motion.div>
      )}
      <motion.div
        className="flex shrink-0 cursor-pointer select-none flex-col"
        whileHover={{ scale: 1.1 }}
      >
        <StatsIcon className="mx-auto" />
        Stats
      </motion.div>
      <motion.div
        className="flex shrink-0 cursor-pointer select-none flex-col"
        whileHover={{ scale: 1.1 }}
      >
        <EditIcon className="mx-auto" />
        Edit
      </motion.div>
      <motion.div
        className="flex shrink-0 cursor-pointer select-none flex-col"
        whileHover={{ scale: 1.1 }}
      >
        <DeleteIcon className="mx-auto" />
        Remove
      </motion.div>
    </motion.div>
  )
}

function ItemSublist({
  tasks,
  editMode,
  editItem,
  setEditItem,
}: {
  tasks: Task[]
  editMode: boolean
  editItem: Goal | Task | undefined
  setEditItem: React.Dispatch<React.SetStateAction<Goal | Task | undefined>>
}) {
  const showEditPanel = (task: Task) =>
    editMode && task.taskId === (editItem as Task)?.taskId

  const toggleEditClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    task: Task
  ) => {
    e.stopPropagation()
    setEditItem(showEditPanel(task) ? undefined : task)
  }

  return (
    <motion.div
      layout
      variants={sublistVariant}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.ul layout className="space-y-3">
        {tasks.map((task, idx) => (
          <>
            <motion.li
              layout
              key={idx}
              className={`flex space-x-3 ${editMode ? "" : "ml-6"}`}
              variants={subitemVariant}
            >
              {editMode && (
                <motion.div
                  className={`group my-auto aspect-square w-12 cursor-pointer rounded-full border-2 ${
                    showEditPanel(task)
                      ? "selected border-red-400 bg-red-400"
                      : "border-gray-400"
                  } hover:border-red-500 hover:bg-red-500`}
                  whileHover={{ scale: 1.1 }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0, transition: { duration: 0.1 } }}
                  onClick={e => toggleEditClick(e, task)}
                >
                  <EditIcon className="m-auto h-full text-gray-500 group-hover:text-gray-700 group-[.selected]:text-gray-700" />
                </motion.div>
              )}
              <div className="my-auto aspect-square w-4 rounded-full bg-gray-400"></div>
              <motion.div
                className={`flex w-full cursor-pointer rounded-full py-3 px-6 ${
                  editMode && !showEditPanel(task)
                    ? "bg-gray-300"
                    : "bg-red-400"
                }`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="select-none">{task.title}</div>
              </motion.div>
              {!editMode && (
                <motion.div
                  className="my-auto aspect-square w-12 cursor-pointer rounded-full bg-red-400"
                  whileHover={{ scale: 1.1 }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <TimerStartIcon className="m-auto h-full" />
                </motion.div>
              )}
            </motion.li>
            <AnimatePresence initial={false}>
              {showEditPanel(task) && (
                <ItemEditPanel
                  key={`task_${task.taskId}_edit_panel`}
                  item={task}
                />
              )}
            </AnimatePresence>
          </>
        ))}
      </motion.ul>
    </motion.div>
  )
}
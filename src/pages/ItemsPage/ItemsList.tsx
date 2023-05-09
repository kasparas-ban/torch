import { useEffect, useState } from "react"
import { AnimatePresence, motion, stagger, useAnimate } from "framer-motion"
import { Goal, ItemType, Task } from "../../types"
import { ReactComponent as TimerStartIcon } from "../../assets/timer_start.svg"
import { ReactComponent as PlusSmallIcon } from "../../assets/plus_small.svg"
import { ReactComponent as EditIcon } from "../../assets/edit_pen.svg"
import { ReactComponent as ArrowIcon } from "../../assets/arrow.svg"

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
}: {
  items: Goal[]
  itemType: ItemType
  editMode: boolean
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
            <Item item={item} key={idx} editMode={editMode} />
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

function Item({ item, editMode }: { item: Goal; editMode: boolean }) {
  const [showSublist, setShowSublist] = useState(true)
  const [showEditPanel, setShowEditPanel] = useState(false)
  const containsSublist = !!item.tasks.length

  const toggleEditClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    setShowEditPanel(prev => !prev)
  }

  return (
    <motion.li layout>
      <motion.div
        layout
        onClick={() => setShowSublist(prev => !prev)}
        className="flex space-x-3"
      >
        <AnimatePresence initial={false} mode="popLayout">
          {editMode && (
            <motion.div
              className={`group my-auto aspect-square w-12 cursor-pointer rounded-full border-2 ${
                false ? "bg-red-400" : "border-gray-400"
              } hover:border-red-500 hover:bg-red-500`}
              whileHover={{ scale: 1.1 }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0, transition: { duration: 0.1 } }}
              onClick={toggleEditClick}
            >
              <EditIcon className="m-auto h-full text-gray-500 group-hover:text-gray-700" />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          layout
          className={`flex w-full cursor-pointer rounded-full py-3 px-6 ${
            editMode ? "bg-gray-300" : "bg-red-400"
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
      {showEditPanel && <ItemEditPanel />}
      <AnimatePresence initial={false}>
        {showSublist && (
          <ItemSublist
            key={`${item.id}_sublist`}
            tasks={item.tasks}
            editMode={editMode}
          />
        )}
      </AnimatePresence>
    </motion.li>
  )
}

function ItemEditPanel() {
  return <motion.div layout></motion.div>
}

function ItemSublist({
  tasks,
  editMode,
}: {
  tasks: Task[]
  editMode: boolean
}) {
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
          <motion.li
            layout
            key={idx}
            className={`flex space-x-3 ${editMode ? "" : "ml-6"}`}
            variants={subitemVariant}
          >
            {editMode && (
              <motion.div
                className={`group my-auto aspect-square w-12 cursor-pointer rounded-full border-2 ${
                  false ? "bg-red-400" : "border-gray-400"
                } hover:border-red-500 hover:bg-red-500`}
                whileHover={{ scale: 1.1 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <EditIcon className="m-auto h-full text-gray-500 group-hover:text-gray-700" />
              </motion.div>
            )}
            <div className="my-auto aspect-square w-4 rounded-full bg-gray-400"></div>
            <motion.div
              className={`flex w-full cursor-pointer rounded-full py-3 px-6 ${
                editMode ? "bg-gray-300" : "bg-red-400"
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
        ))}
      </motion.ul>
    </motion.div>
  )
}

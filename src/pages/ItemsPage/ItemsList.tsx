import { Fragment, useEffect, useState } from "react"
import { AnimatePresence, motion, stagger, useAnimate } from "framer-motion"
import useConfirmModal from "../../components/Modals/ConfirmModal/useConfirmModal"
import useModal from "../../components/Modals/useModal"
import { GeneralItem, Goal, ItemType, Task } from "../../types"
import { ReactComponent as TimerStartIcon } from "../../assets/timer_start.svg"
import { ReactComponent as PlusSmallIcon } from "../../assets/plus_small.svg"
import { ReactComponent as EditIcon } from "../../assets/edit_pen.svg"
import { ReactComponent as ArrowIcon } from "../../assets/arrow.svg"
import { ReactComponent as TickIcon } from "../../assets/tick.svg"
import { ReactComponent as AddItemIcon } from "../../assets/add_item.svg"
import { ReactComponent as StatsIcon } from "../../assets/stats.svg"
import { ReactComponent as DeleteIcon } from "../../assets/delete.svg"
import ItemProgress from "./ProgressBar"
import useEditItem from "./useEditItem"

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

export default function ItemsList<T extends GeneralItem>({
  items,
  itemType,
  editMode,
}: {
  items: T[] | undefined
  itemType: ItemType
  editMode: boolean
}) {
  const { openTaskModal, openGoalModal, openDreamModal } = useModal()
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

  const handleAddItem = () =>
    itemType === "TASK"
      ? openTaskModal()
      : itemType === "GOAL"
      ? openGoalModal()
      : openDreamModal()

  return (
    <>
      <AnimatePresence mode="popLayout">
        {editMode && (
          <motion.div
            layout
            className="mb-6 flex justify-center font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {`Select a goal/task to edit`}
          </motion.div>
        )}
      </AnimatePresence>
      {items?.length ? (
        <motion.ul className="space-y-3" ref={scope}>
          {items.map(item => (
            <Item<T> item={item} key={item.id} editMode={editMode} />
          ))}
        </motion.ul>
      ) : (
        <motion.div layout className="mt-6 text-center">
          <div>No {itemType.toLowerCase()}s have been added.</div>
          <button className="mt-8 font-bold" onClick={handleAddItem}>
            <motion.div className="flex" whileHover={{ scale: 1.05 }}>
              <PlusSmallIcon />
              Add new{" "}
              {itemType === "TASK"
                ? "task"
                : itemType === "GOAL"
                ? "goal"
                : "dream"}
            </motion.div>
          </button>
        </motion.div>
      )}
    </>
  )
}

function Item<T extends GeneralItem>({
  item,
  editMode,
}: {
  item: T
  editMode: boolean
}) {
  const { editItem, setEditItem } = useEditItem()
  const [showSublist, setShowSublist] = useState(true)

  const itemSublist =
    item.type === "GOAL"
      ? item.tasks
      : item.type === "DREAM"
      ? item.goals
      : undefined
  const containsSublist = !!itemSublist?.length

  const showEditPanel = editMode && editItem?.id === item.id

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
            } hover:border-red-400 hover:bg-red-400`}
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
          className={`relative flex w-full cursor-pointer overflow-hidden rounded-full py-3 px-6 ${
            editMode && !showEditPanel ? "bg-gray-300" : "bg-red-300"
          }`}
          whileHover={{
            scale: 1.02,
          }}
        >
          <ItemProgress
            progress={item.progress}
            inEditMode={editMode && !showEditPanel}
          />
          <motion.div className="z-10 select-none">{item.title}</motion.div>
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
          <ItemEditPanel<T> key={`goal_${item.id}_edit_panel`} item={item} />
        )}
      </AnimatePresence>
      <AnimatePresence initial={false}>
        {containsSublist && showSublist && (
          <ItemSublist<(typeof itemSublist)[number]>
            key={`${item.id}_sublist`}
            subitems={itemSublist || []}
            editMode={editMode}
            editItem={editItem as (typeof itemSublist)[number] | undefined}
            setEditItem={
              setEditItem as React.Dispatch<
                React.SetStateAction<(typeof itemSublist)[number] | undefined>
              >
            }
          />
        )}
      </AnimatePresence>
    </motion.li>
  )
}

function ItemEditPanel<T extends GeneralItem>({ item }: { item: T }) {
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
      className={`mx-auto flex ${
        item.type === "GOAL" || item.type === "DREAM"
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
        onClick={() => openConfirmModal(doneFn, "Mark as done?")}
      >
        <TickIcon className="mx-auto" />
        Done
      </motion.div>
      {item.type === "GOAL" && (
        <motion.div
          className="flex shrink-0 cursor-pointer select-none flex-col"
          whileHover={{ scale: 1.1 }}
          onClick={() => openEditItemModal(item, true)}
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
        onClick={() => openEditItemModal(item)}
      >
        <EditIcon className="mx-auto" />
        Edit
      </motion.div>
      <motion.div
        className="flex shrink-0 cursor-pointer select-none flex-col"
        whileHover={{ scale: 1.1 }}
        onClick={() => openConfirmModal(removeFn, "Remove item?")}
      >
        <DeleteIcon className="mx-auto" />
        Remove
      </motion.div>
    </motion.div>
  )
}

function ItemSublist<T extends Task | Goal>({
  subitems,
  editMode,
  editItem,
  setEditItem,
}: {
  subitems: T[]
  editMode: boolean
  editItem?: T
  setEditItem: React.Dispatch<React.SetStateAction<T | undefined>>
}) {
  const showEditPanel = (subitem: T) => editMode && subitem.id === editItem?.id

  const toggleEditClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    subitem: T
  ) => {
    e.stopPropagation()
    setEditItem(showEditPanel(subitem) ? undefined : subitem)
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
        {subitems.map(subitem => (
          <Fragment key={subitem.id}>
            <motion.li
              layout
              className={`flex space-x-3 ${editMode ? "" : "ml-6"}`}
              variants={subitemVariant}
            >
              {editMode && (
                <motion.div
                  className={`group my-auto aspect-square w-12 cursor-pointer rounded-full border-2 ${
                    showEditPanel(subitem)
                      ? "selected border-red-400 bg-red-400"
                      : "border-gray-400"
                  } hover:border-red-400 hover:bg-red-400`}
                  whileHover={{ scale: 1.1 }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0, transition: { duration: 0.1 } }}
                  onClick={e => toggleEditClick(e, subitem)}
                >
                  <EditIcon className="m-auto h-full text-gray-500 group-hover:text-gray-700 group-[.selected]:text-gray-700" />
                </motion.div>
              )}
              <div className="my-auto aspect-square w-4 rounded-full bg-gray-400"></div>
              <motion.div
                className={`relative flex w-full cursor-pointer overflow-hidden rounded-full py-3 px-6 ${
                  editMode && !showEditPanel(subitem)
                    ? "bg-gray-300"
                    : "bg-red-300"
                }`}
                whileHover={{ scale: 1.02 }}
              >
                <ItemProgress
                  progress={subitem.progress}
                  inEditMode={editMode && !showEditPanel(subitem)}
                />
                <div className="z-10 select-none">{subitem.title}</div>
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
              {showEditPanel(subitem) && (
                <ItemEditPanel<T>
                  key={`task_${subitem.id}_edit_panel`}
                  item={subitem}
                />
              )}
            </AnimatePresence>
          </Fragment>
        ))}
      </motion.ul>
    </motion.div>
  )
}

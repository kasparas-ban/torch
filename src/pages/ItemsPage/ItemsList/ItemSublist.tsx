import React, { Fragment } from "react"
import { useNavigate } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { ROUTES } from "../../../routes"
import ItemProgress from "./ProgressBar"
import ItemEditPanel from "./ItemEditPanel"
import { Goal, Task } from "../../../types"
import useTimerForm from "../../../components/Timer/useTimerForm"
import { ReactComponent as EditIcon } from "../../../assets/edit_pen.svg"
import { ReactComponent as DotsIcon } from "../../../assets/dots.svg"

export default function ItemSublist<T extends Task | Goal>({
  subitems,
  subitemType,
  editMode,
  editItem,
  setEditItem,
  showSublist,
}: {
  subitems: T[]
  subitemType: "TASK" | "GOAL"
  editMode: boolean
  editItem?: T
  setEditItem: React.Dispatch<React.SetStateAction<T | undefined>>
  showSublist: boolean
}) {
  const navigate = useNavigate()
  const { setFocusOn, setFocusType } = useTimerForm()

  const showEditPanel = (subitem: T) =>
    editMode && subitem.type === editItem?.type && subitem.id === editItem?.id

  const toggleEditClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    subitem: T,
  ) => {
    e.stopPropagation()
    setEditItem(showEditPanel(subitem) ? undefined : subitem)
  }
  const getSubitemKey = (subitem: Task | Goal) =>
    `${
      (subitem as Task).goal
        ? (subitem as Task).goal?.id
        : (subitem as Goal).dream?.id
    }_${subitem.id}`

  const handleTimerClick = (item: Task | Goal) => {
    navigate(ROUTES.index.path)
    setFocusOn({ value: item.id, label: item.title, progress: item.progress })
    setFocusType(
      subitemType === "TASK"
        ? "TASKS"
        : subitemType === "GOAL"
        ? "GOALS"
        : "ALL",
    )
  }

  return (
    <motion.div layout>
      <motion.ul
        layout
        className="space-y-3"
        animate={{ height: showSublist ? "auto" : 0 }}
      >
        {subitems.map((subitem, idx) => (
          <Fragment key={getSubitemKey(subitem)}>
            <motion.li
              layout
              className="relative flex space-x-3"
              animate={{
                scale: showSublist ? 1 : 0.98 - 0.03 * idx,
                y: showSublist ? 0 : -(50 + 50 * idx + 6 * idx),
                zIndex: showSublist ? 0 : subitems.length - 1 - idx,
                opacity: showSublist ? 1 : idx > 1 ? 0 : 1,
              }}
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
              <motion.div
                className="relative flex"
                animate={{
                  width: showSublist ? "auto" : 0,
                  opacity: showSublist ? 1 : 0,
                }}
                transition={{ duration: 0.1 }}
              >
                <div className="my-auto aspect-square w-4 rounded-full bg-gray-300"></div>
                {/* Upper line */}
                {idx !== 0 && (
                  <div className="h0 absolute left-[6px] h-1/2 w-1 bg-gray-300"></div>
                )}
                {/* Lower line */}
                {idx !== subitems.length - 1 && (
                  <div className="h0 absolute left-[6px] h-3/4 w-1 translate-y-3/4 bg-gray-300"></div>
                )}
              </motion.div>
              <motion.div
                className={`relative items-center flex w-full cursor-pointer overflow-hidden rounded-2xl border border-gray-700 h-12 pl-6 pr-1 md:rounded-3xl ${
                  editMode && !showEditPanel(subitem)
                    ? "bg-gray-300"
                    : "bg-red-300"
                }`}
              >
                {showSublist && (
                  <ItemProgress
                    progress={subitem.progress || 0}
                    inEditMode={editMode && !showEditPanel(subitem)}
                  />
                )}
                <motion.div
                  className="z-10 select-none"
                  animate={{ opacity: showSublist ? 1 : 0 }}
                >
                  {subitem.title}
                </motion.div>
                <div className="group hover:bg-red-200 rounded-full ml-auto h-10 w-10 flex items-center justify-center">
                  <motion.div
                    layout
                    className="text-gray-600 group-hover:text-gray-800"
                  >
                    <DotsIcon />
                  </motion.div>
                </div>
              </motion.div>
              {/* {!editMode && (
                <motion.div
                  className="my-auto aspect-square w-12 cursor-pointer rounded-full bg-red-400"
                  whileHover={{ scale: 1.1 }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={() => handleTimerClick(subitem)}
                >
                  <TimerStartIcon className="m-auto h-full" />
                </motion.div>
              )} */}
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

import React, { Fragment } from "react"
import { useNavigate } from "react-router-dom"
import { useMediaQuery } from "react-responsive"
import { AnimatePresence, motion } from "framer-motion"
import clsx from "clsx"
import { ROUTES } from "../../../routes"
import ItemProgress from "./ProgressBar"
import useEditItem from "../useEditItem"
import ItemEditPanel from "./ItemEditPanel"
import { Goal, Task } from "../../../types"
import useTimerForm from "../../../components/Timer/useTimerForm"
import { ReactComponent as DotsIcon } from "../../../assets/dots.svg"
import { ReactComponent as TimerStartIcon } from "../../../assets/timer_start.svg"

export default function ItemSublist<T extends Task | Goal>({
  subitems,
  subitemType,
  showSublist,
  isParentEditActive,
}: {
  subitems: T[]
  subitemType: "TASK" | "GOAL"
  showSublist: boolean
  isParentEditActive: boolean
}) {
  const isDesktop = useMediaQuery({
    query: "(min-width: 600px)",
  })

  const navigate = useNavigate()
  const { editItem, setEditItem } = useEditItem()
  const { setFocusOn, setFocusType } = useTimerForm()

  const showEditPanel = (subitem: T) =>
    subitem.type === editItem?.type && subitem.id === editItem?.id

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
    setEditItem(undefined)
  }

  const scaledWidth = isDesktop ? "90%" : "82%"

  return (
    <motion.div layout>
      <motion.ul
        layout
        className="space-y-3"
        animate={{
          height: showSublist ? "auto" : 0,
        }}
      >
        {subitems.map((subitem, idx) => (
          <Fragment key={getSubitemKey(subitem)}>
            <motion.li
              layout
              className="relative flex"
              animate={{
                scale: showSublist ? 1 : 0.98 - 0.03 * idx,
                width:
                  !showSublist && isParentEditActive ? scaledWidth : "100%",
                y: showSublist ? 0 : -(54 + 50 * idx + 6 * idx),
                zIndex: showSublist ? 0 : subitems.length - 1 - idx,
                opacity: showSublist ? 1 : idx > 1 ? 0 : 1,
              }}
            >
              <BulletPoint
                idx={idx}
                showSublist={showSublist}
                showEditPanel={showEditPanel}
                subitems={subitems}
              />
              <motion.div
                className={clsx(
                  "relative items-center ml-3 h-12 flex w-full cursor-pointer overflow-hidden rounded-2xl border border-gray-700 pl-6 pr-1 md:rounded-3xl",
                  editItem
                    ? showEditPanel(subitem)
                      ? "bg-red-300"
                      : "bg-gray-300"
                    : "bg-red-300",
                )}
              >
                {showSublist && (
                  <ItemProgress
                    progress={subitem.progress || 0}
                    showEditPanel={showEditPanel(subitem)}
                  />
                )}
                <motion.div
                  className="z-10 select-none truncate"
                  animate={{ opacity: showSublist ? 1 : 0 }}
                >
                  {subitem.title}
                </motion.div>
                <div
                  className={clsx(
                    "rounded-full shrink-0 z-0 ml-auto h-10 w-10 flex items-center justify-center group",
                    !editItem
                      ? "hover:bg-red-200"
                      : showEditPanel(subitem)
                      ? "hover:bg-red-200"
                      : "hover:bg-gray-100",
                  )}
                  onClick={e => toggleEditClick(e, subitem)}
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
                {showEditPanel(subitem) && (
                  <motion.div
                    className="my-auto aspect-square w-12 ml-3 cursor-pointer rounded-full bg-red-400"
                    whileHover={{ scale: 1.1 }}
                    onClick={() => handleTimerClick(subitem)}
                    initial={{ width: 0, opacity: 0, marginLeft: 0 }}
                    animate={{ width: 48, opacity: 1, marginLeft: 12 }}
                    exit={{ width: 0, opacity: 0, marginLeft: 0 }}
                  >
                    <TimerStartIcon className="m-auto h-full" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
            <AnimatePresence initial={false}>
              {showEditPanel(subitem) && (
                <ItemEditPanel<T>
                  key={`task_${subitem.id}_edit_panel`}
                  item={subitem}
                  showBulletLine={idx !== subitems.length - 1}
                />
              )}
            </AnimatePresence>
          </Fragment>
        ))}
      </motion.ul>
    </motion.div>
  )
}

function BulletPoint<T>({
  idx,
  showSublist,
  subitems,
}: {
  idx: number
  showSublist: boolean
  showEditPanel: (subitem: T) => boolean
  subitems: T[]
}) {
  return (
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
        <motion.div className="h0 absolute left-[6px] h-1/2 w-1 bg-gray-300" />
      )}
      {/* Lower line */}
      {idx !== subitems.length - 1 && (
        <motion.div className="h0 absolute left-[6px] h-3/4 w-1 translate-y-3/4 bg-gray-300" />
      )}
    </motion.div>
  )
}
